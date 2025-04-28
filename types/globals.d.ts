export {};

export type Roles = 'marketing_admin' | 'member';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
