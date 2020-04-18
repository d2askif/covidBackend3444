export type SignInInput = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SingUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
