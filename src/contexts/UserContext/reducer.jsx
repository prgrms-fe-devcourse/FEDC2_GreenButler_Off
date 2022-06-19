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
  CHANGE_FULLNAME,
  CHANGE_PROFILE,
  LIKE,
  DISLIKE,
} from './types';

export const initialUserData = {
  currentUser: {
    role: 'SuperAdmin',
    emailVerified: true,
    banned: false,
    isOnline: false,
    posts: [],
    likes: [
      {
        _id: '62a76437b1b90b0c812c9b8c',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a75497b1b90b0c812c9b1f',
        createdAt: '2022-06-13T16:22:15.565Z',
        updatedAt: '2022-06-13T16:22:15.565Z',
        __v: 0,
      },
      {
        _id: '62a7673cb1b90b0c812c9bab',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a75372b1b90b0c812c9b0f',
        createdAt: '2022-06-13T16:35:08.751Z',
        updatedAt: '2022-06-13T16:35:08.751Z',
        __v: 0,
      },
      {
        _id: '62a7674ab1b90b0c812c9bb0',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a751dab1b90b0c812c9b01',
        createdAt: '2022-06-13T16:35:22.910Z',
        updatedAt: '2022-06-13T16:35:22.910Z',
        __v: 0,
      },
      {
        _id: '62a76755b1b90b0c812c9bb5',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a748dec09ca5760d4252ef',
        createdAt: '2022-06-13T16:35:33.134Z',
        updatedAt: '2022-06-13T16:35:33.134Z',
        __v: 0,
      },
      {
        _id: '62a76d42f64ce90f92df52f3',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a751dab1b90b0c812c9b01',
        createdAt: '2022-06-13T17:00:50.943Z',
        updatedAt: '2022-06-13T17:00:50.943Z',
        __v: 0,
      },
      {
        _id: '62a7739fd8f3c4100eacb50c',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a75497b1b90b0c812c9b1f',
        createdAt: '2022-06-13T17:27:59.717Z',
        updatedAt: '2022-06-13T17:27:59.717Z',
        __v: 0,
      },
      {
        _id: '62ab52c369759b044429f963',
        user: '629e29bd6d18b41c5b238ba2',
        post: '629e29bd6d18b41c5b238ba2',
        createdAt: '2022-06-16T15:56:51.767Z',
        updatedAt: '2022-06-16T15:56:51.767Z',
        __v: 0,
      },
      {
        _id: '62ab52e869759b044429f96d',
        user: '629e29bd6d18b41c5b238ba2',
        post: '629e29bd6d18b41c5b238ba2',
        createdAt: '2022-06-16T15:57:28.457Z',
        updatedAt: '2022-06-16T15:57:28.457Z',
        __v: 0,
      },
      {
        _id: '62ab530369759b044429f972',
        user: '629e29bd6d18b41c5b238ba2',
        post: '629e29bd6d18b41c5b238ba2',
        createdAt: '2022-06-16T15:57:55.748Z',
        updatedAt: '2022-06-16T15:57:55.748Z',
        __v: 0,
      },
      {
        _id: '62ac0f692c8a6e19733607bd',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a8a3cfd8f3c4100eacd598',
        createdAt: '2022-06-17T05:21:45.737Z',
        updatedAt: '2022-06-17T05:21:45.737Z',
        __v: 0,
      },
      {
        _id: '62ac22562c8a6e19733608ef',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a8a92dd8f3c4100eacd87b',
        createdAt: '2022-06-17T06:42:30.161Z',
        updatedAt: '2022-06-17T06:42:30.161Z',
        __v: 0,
      },
      {
        _id: '62ac23d82c8a6e1973360909',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a8a89ad8f3c4100eacd7de',
        createdAt: '2022-06-17T06:48:56.646Z',
        updatedAt: '2022-06-17T06:48:56.646Z',
        __v: 0,
      },
      {
        _id: '62ac24fe2c8a6e1973360922',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62a8a429d8f3c4100eacd5d1',
        createdAt: '2022-06-17T06:53:50.134Z',
        updatedAt: '2022-06-17T06:53:50.134Z',
        __v: 0,
      },
      {
        _id: '62ac36bfec2cd91e67329336',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62ac0f4d2c8a6e19733607ab',
        createdAt: '2022-06-17T08:09:35.960Z',
        updatedAt: '2022-06-17T08:09:35.960Z',
        __v: 0,
      },
      {
        _id: '62ac3954ec2cd91e673293b5',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62aa1bac1207305a0202e828',
        createdAt: '2022-06-17T08:20:36.232Z',
        updatedAt: '2022-06-17T08:20:36.232Z',
        __v: 0,
      },
      {
        _id: '62ac3fd7ec2cd91e67329431',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62aa192d1207305a0202e7ef',
        createdAt: '2022-06-17T08:48:23.105Z',
        updatedAt: '2022-06-17T08:48:23.105Z',
        __v: 0,
      },
      {
        _id: '62ac4500bfd57c2143a30074',
        user: '629e29bd6d18b41c5b238ba2',
        post: '62aa1fd91207305a0202e98f',
        createdAt: '2022-06-17T09:10:24.978Z',
        updatedAt: '2022-06-17T09:10:24.978Z',
        __v: 0,
      },
    ],
    comments: ['62a8d2784c93de3355a58acc'],
    followers: [
      {
        _id: '62ac4c6bbfd57c2143a300de',
        user: '629e29bd6d18b41c5b238ba2',
        follower: '62aa18041207305a0202e7bd',
        createdAt: '2022-06-17T09:42:03.411Z',
        updatedAt: '2022-06-17T09:42:03.411Z',
        __v: 0,
      },
    ],
    following: [
      {
        _id: '62a8ae23d8f3c4100eacdd46',
        user: '62a0a5ac703fdd3a82b4e6f8',
        follower: '629e29bd6d18b41c5b238ba2',
        createdAt: '2022-06-14T15:49:55.153Z',
        updatedAt: '2022-06-14T15:49:55.153Z',
        __v: 0,
      },
      {
        _id: '62a8b375d8f3c4100eace125',
        user: '62a0ab92703fdd3a82b4e73f',
        follower: '629e29bd6d18b41c5b238ba2',
        createdAt: '2022-06-14T16:12:37.590Z',
        updatedAt: '2022-06-14T16:12:37.590Z',
        __v: 0,
      },
    ],
    notifications: [],
    messages: [],
    id: '62aa18041207305a0202e7bd',
    fullName: '변경',
    email: 'admin@programmers.co.kr',
    createdAt: '2022-06-06T16:22:21.092Z',
    updatedAt: '2022-06-18T08:13:25.296Z',
    username: '{ "title": "해양식물", "contents": "제일좋아","tags":["#맑", "#무럭", "#자란다"] }',
  },
  /* {
    id: '',
    email: '',
    fullName: '',
    image: '',
    posts: [],
    likes: [],
    followers: [],
    following: [],
    notifications: [],
  }, */

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
