import React, { useMemo } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
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
        title="Detail Post"
        subtitle={`ID: ${String(postId)}`}
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
            <Text style={styles.retryText}>Coba lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={state.comments}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: 24 + insets.bottom },
          ]}
          ListHeaderComponent={
            <View style={styles.card}>
              <TextBold size={18} style={styles.title}>
                {state.post?.title}
              </TextBold>
              <TextRegular size={14} style={styles.body}>
                {state.post?.body}
              </TextRegular>
            </View>
          }
          ListHeaderComponentStyle={{ marginBottom: 8 }}
          ListEmptyComponent={
            <View style={styles.center}>
              <TextRegular size={13} style={styles.headerSubtitle}>
                Tidak ada komentar.
              </TextRegular>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <TextBold size={12} style={styles.commentEmail}>
                {item.email}
              </TextBold>
              <TextMedium size={13} style={styles.commentName} numberOfLines={1}>
                {item.name}
              </TextMedium>
              <TextRegular size={13} style={styles.commentBody}>
                {item.body}
              </TextRegular>
            </View>
          )}
        />
      )}
    </View>
  );
}

