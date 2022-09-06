import { IReducer } from "./interfaces";
import {
  legacy_createStore as createStore,
  AnyAction,
  Store,
  applyMiddleware,
} from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState: IReducer = {
  user: null,
};

function reducer(state = initialState, action: AnyAction): IReducer {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.data,
      };

    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

const makeStore = (context: Context) =>
  process.env.NODE_ENV !== "production"
    ? // I require this only in dev environment
      createStore(reducer, composeWithDevTools(applyMiddleware()))
    : createStore(reducer, applyMiddleware());

export const wrapper = createWrapper<Store<IReducer>>(makeStore, {
  debug: true,
});

export default wrapper;
