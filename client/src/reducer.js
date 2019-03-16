export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: payload
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: null
      };

    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      };

    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload
      };

    default:
      return state;
  }
}