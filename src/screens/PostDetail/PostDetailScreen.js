import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { createPostDetailStyles } from './styles';
import { usePostDetailLogic } from './postDetail.logic';
import { useTheme } from '../../theme/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';

export function PostDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createPostDetailStyles(colors), [colors]);
  const postId = route?.params?.postId;

  const { state, actions } = usePostDetailLogic(postId);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack?.()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Detail Post
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            ID: {String(postId)}
          </Text>
        </View>
        <ThemeToggle variant="icon" />
      </View>

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
              <Text style={styles.title}>{state.post?.title}</Text>
              <Text style={styles.body}>{state.post?.body}</Text>
            </View>
          }
          ListHeaderComponentStyle={{ marginBottom: 8 }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.headerSubtitle}>Tidak ada komentar.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.commentEmail}>{item.email}</Text>
              <Text style={styles.commentName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.commentBody}>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

