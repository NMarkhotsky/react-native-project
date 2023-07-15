import { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { commentDate } from '../../utils/commentDate';

export const CommentsScreen = ({ route, navigation, setTabBarStyle }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, photo } = route.params;

  const {
    authState: { login, photoURL, userId },
  } = useAuth();

  useEffect(() => {
    getCommentToPost(setAllComments);
  }, []);

  useLayoutEffect(() => {
    setTabBarStyle('none');

    return () => {
      setTabBarStyle('flex');
    };
  }, []);

  const addCommentToPost = async (postId, commentData) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const commentsCollectionRef = collection(postRef, 'comments');

      const commentRef = await addDoc(commentsCollectionRef, {
        ...commentData,
      });

      return commentRef;
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentToPost = async (setAllComments) => {
    const postRef = doc(db, 'posts', postId);

    onSnapshot(
      query(collection(postRef, 'comments'), orderBy('commentDate')),
      (snapshot) =>
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />

      <KeyboardAvoidingView
        style={styles.subContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
      >
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={
                userId === item.userId
                  ? styles.infoUserCommentThumb
                  : styles.infoCommentThumb
              }
            >
              <Image
                source={{ uri: item.photoURL }}
                style={{ width: 28, height: 28, borderRadius: 28 }}
              />
              <View
                style={[
                  styles.infoComment,
                  userId === item.userId
                    ? { borderTopRightRadius: 0 }
                    : { borderTopLeftRadius: 0 },
                ]}
              >
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text
                  style={[
                    styles.commentDate,
                    userId === item.userId
                      ? { textAlign: 'left' }
                      : { textAlign: 'right' },
                  ]}
                >
                  {item.commentDate}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputComment}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            style={styles.sendComment}
            onPress={() => {
              if (comment !== '') {
                addCommentToPost(postId, {
                  userId,
                  login,
                  photoURL,
                  comment,
                  commentDate: commentDate(Date.now()),
                });
                setComment('');
                Keyboard.dismiss();
              }
            }}
          >
            <AntDesign
              name="arrowup"
              size={26}
              color="#FFFFFF"
              backgroundColor="#FF6C00"
              style={{ padding: 4 }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  listContainer: {},
  inputWrapper: {
    position: 'relative',
  },
  infoUserCommentThumb: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: 24,
  },
  infoCommentThumb: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoComment: {
    width: '85%',
    height: 'auto',
    padding: 16,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentText: {
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  commentDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
    textAlign: 'right',
  },
  inputComment: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingLeft: 16,
    paddingRight: 50,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 50,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sendComment: {
    position: 'absolute',
    top: 8,
    right: 8,

    borderRadius: 50,
    overflow: 'hidden',
  },
});
