const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
      break;
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
      break;
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: true,
        error: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default AuthReducer;
