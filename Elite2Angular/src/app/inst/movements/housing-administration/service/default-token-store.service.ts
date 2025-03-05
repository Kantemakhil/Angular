import { Injectable } from '@angular/core';
import { TokenStore } from './token-store.service';

@Injectable()
export class DefaultTokenStore extends TokenStore
{
  get accessToken(): string {
    return sessionStorage.getItem('accessToken') || undefined;
  }

  set accessToken(value: string) {
    sessionStorage.setItem('accessToken', value);
  }

  get refreshToken(): string {
    return sessionStorage.getItem('refreshToken') || undefined;
  }

  set refreshToken(value: string) {
    sessionStorage.setItem('refreshToken', value);
  }

  clear(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }


}
