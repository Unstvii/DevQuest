export interface User {
  email: string;
  username: string;
  passwordHash: string;
  xp: number;
  level: number;
}

export type UserAuthDto = {
  username: string;
  email: string;
  passwordHash: string;
};
