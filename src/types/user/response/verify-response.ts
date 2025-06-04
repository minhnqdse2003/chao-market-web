export type VerifyResponse =
    | {
          email: string;
          emailVerified: boolean;
          phoneVerified: boolean;
      }
    | {
          error: string;
      };
