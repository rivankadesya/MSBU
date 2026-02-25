import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createPostDetailStyles } from './styles';
import { usePostDetailLogic } from './postDetail.logic';
import { useTheme } from '../../theme/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';
import { AppHeader } from '../../components/AppHeader';
import { TextRegular, TextBold, TextMedium } from '../../components/Typography';

export function PostDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createPostDetailStyles(colors), [colors]);
  const postId = route?.params?.postId;

  const { state, actions } = usePostDetailLogic(postId);

  return (
    <View style={styles.container}>
      <AppHeader
        showBack
        onBack={() => navigation?.goBack?.()}
        title="Product Detail"
        subtitle={state.post?.category}
        right={<ThemeToggle variant="icon" />}
      />

      {state.loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : state.error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={actions.retry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={state.comments}
          keyExtractor={(item, index) => `${item.reviewerEmail}-${index}`}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: 24 + insets.bottom },
          ]}
          ListHeaderComponent={
            <View>
              <Image 
                source={{ uri: state.post?.images?.[0] || state.post?.thumbnail }} 
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.metaRow}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaText}>{state.post?.brand}</Text>
                </View>
                <View style={[styles.metaBox, { backgroundColor: '#fbbf2420' }]}>
                  <Text style={[styles.metaText, { color: '#fbbf24' }]}>⭐ {state.post?.rating}</Text>
                </View>
              </View>
              <TextBold style={styles.title}>
                {state.post?.title}
              </TextBold>
              <TextBold style={styles.priceText}>
                ${state.post?.price}
              </TextBold>
              <TextRegular style={styles.body}>
                {state.post?.description}
              </TextRegular>
              
              <Text style={styles.sectionTitle}>Reviews ({state.comments.length})</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <TextRegular size={13} style={styles.headerSubtitle}>
                No reviews yet.
              </TextRegular>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <View style={styles.commentHeader}>
                <TextBold style={styles.commentUser}>
                  {item.reviewerName}
                </TextBold>
                <Text style={styles.commentRating}>
                  {'⭐'.repeat(item.rating)}
                </Text>
              </View>
              <TextRegular style={styles.commentBody}>
                {item.comment}
              </TextRegular>
            </View>
          )}
        />
      )}
    </View>
  );
}

