export abstract class TokenStore
{
  abstract accessToken: string;
  abstract refreshToken: string;
  abstract clear(): void;
}
