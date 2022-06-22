import {
  LOGIN,
  SIGNUP,
  KEEP_LOGIN,
  LOGOUT,
  FOLLOW,
  UNFOLLOW,
  LOADING_ON,
  LOADING_OFF,
  SET_NOTIFICATIONS,
  CHANGE_FULLNAME,
  CHANGE_PROFILE,
  LIKE,
  DISLIKE,
} from './types';

export const initialUserData = {
  currentUser: {
    id: '',
    email: '',
    fullName: '',
    image: '',
    posts: [],
    likes: [],
    followers: [],
    following: [],
    notifications: [],
  },
  isLoading: false,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: payload._id,
          email: payload.email,
          fullName: payload.fullName,
          image: payload.image,
          posts: payload.posts,
          followers: payload.followers,
          following: payload.following,
          notifications: payload.notifications,
          likes: payload.likes,
        },
      };
    }
    case KEEP_LOGIN:
    case SIGNUP: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: payload._id,
          email: payload.email,
          fullName: payload.fullName,
          image: payload.image,
          posts: payload.posts,
          followers: payload.followers,
          following: payload.following,
          notifications: payload.notifications,
          likes: payload.likes,
        },
      };
    }
    case LOGOUT: {
      console.log('로그아웃 REDUCER', { ...initialUserData });
      return {
        ...state,
        currentUser: { ...initialUserData },
      };
    }
    case FOLLOW: {
      console.log('REDUCER_FOLLOW', payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          following: [
            ...state.currentUser.following,
            {
              _id: payload._id,
              follower: payload.follower,
              user: payload.user,
            },
          ],
        },
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          following: [
            ...state.currentUser.following.filter(({ _id }) => _id !== payload.unfollowId),
          ],
        },
      };
    }
    case SET_NOTIFICATIONS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifications: payload || [],
        },
      };
    }
    case LOADING_ON: {
      return { ...state, isLoading: true };
    }
    case LOADING_OFF: {
      return { ...state, isLoading: false };
    }
    case CHANGE_FULLNAME: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          fullName: payload.fullName,
        },
      };
    }

    case CHANGE_PROFILE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          image: payload.image,
        },
      };
    }
    default: {
      return state;
    }
    case LIKE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          likes: [
            ...state.currentUser.likes,
            {
              _id: payload._id,
              user: payload.user,
              post: payload.post,
              createdAt: payload.createdAt,
              updatedAt: payload.updatedAt,
              __v: payload.__v,
            },
          ],
        },
      };
    }
    case DISLIKE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          likes: state.currentUser.likes.filter(({ _id }) => _id !== payload._id),
        },
      };
    }
  }
};
