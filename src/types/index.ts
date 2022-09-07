export type UserInfo = {
  email: string | null;
  uid: string;
  name: string | null;
};

export interface BOARD {
  body: string;
  createdAt: number;
  title: string;
  uid: string | null;
  email: string | null;
}
