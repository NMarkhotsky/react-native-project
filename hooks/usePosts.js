import { useSelector } from 'react-redux';
import { selectPostsState } from '../redux/post/postSelectors';

export const usePosts = () => {
  const postState = useSelector(selectPostsState);

  return { postState };
};
