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
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
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
    comments: [],
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
          comments: payload.comments,
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
          comments: payload.comments,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        currentUser: { ...initialUserData },
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
    case ADD_POST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          posts: [payload, ...state.currentUser.posts],
        },
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          posts: payload,
        },
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          posts: state.currentUser.posts.filter((post) => post._id !== payload._id),
        },
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          comments: [...state.currentUser.comments, payload],
        },
      };
    }
    case DELETE_COMMENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          comments: state.currentUser.comments.filter((comment) => comment !== payload),
        },
      };
    }
  }
};
