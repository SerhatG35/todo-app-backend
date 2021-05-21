export type Todos = {
  todo: string;
  isCompleted: boolean;
};

export type Card = {
  id: string;
  title: string;
  todos: Todos[];
  category: string;
};

export type ILogin = {
  auth: {
    username: string;
    password: string;
  };
};

export type VerifiedUser =
  | {
      id: string;
      username: string;
      email: string;
    }
  | undefined
  | null;
