export interface User {
  id: number;
  email: string;
  role: string;
  permissions: string[];
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User; 
      csrfToken: () => string;
    }
  }
}
