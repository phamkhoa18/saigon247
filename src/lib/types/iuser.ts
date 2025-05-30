
export interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}