export const initialValue = null;
export const reducerFunction = (state, action) => {
  if (action.type === "login") {
    console.log(action.payload);
    return action.payload;
  } else if (action.type === "logout") {
    console.log(action.payload);
    return action.payload;
  }
  return state;
};
