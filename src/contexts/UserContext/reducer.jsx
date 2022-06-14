import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  GET_CURRENT_USER,
  FOLLOW,
  UNFOLLOW,
  LOADING_ON,
  LOADING_OFF,
  SET_NOTIFICATIONS,
  EDIT_FULLNAME,
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
    case LOGIN:
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
      return {
        ...state,
        currentUser: { ...initialUserData },
      };
    }
    case GET_CURRENT_USER: {
      return {
        ...state,
        currentUser: {
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
    case FOLLOW: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          following: [
            ...state.currentUser.following,
            {
              _id: payload.followId,
              follower: state.currentUser.id,
              user: payload.userId,
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
          following: state.currentUser.following.filter(({ _id }) => _id !== payload.unfollowId),
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
    case EDIT_FULLNAME: {
      console.log(payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          fullName: payload.fullName,
        },
      };
    }
    default: {
      return state;
    }
  }
};
