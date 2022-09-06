import { UPDATE_USER, CLEAR_USER } from "./types";
import { UserInfo } from "types";

export const updateUser = (data: UserInfo) => ({
  type: UPDATE_USER,
  payload: { data },
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export type ActionRequest = ReturnType<typeof updateUser>;
