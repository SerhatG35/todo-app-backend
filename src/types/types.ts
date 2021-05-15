export type todos = {
  todo: string;
  isCompleted: boolean;
};

export type card = {
  _id: string;
  title: string;
  todos: todos[];
};

export type ILogin = {
  auth: {
    username: string;
    password: string;
  };
};

export type verifiedUser =
  | {
      id: string;
      username: string;
      email: string;
    }
  | undefined
  | null;
