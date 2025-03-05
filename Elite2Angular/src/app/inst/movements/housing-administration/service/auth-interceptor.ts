import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStore } from './token-store.service';
import { TokenResponse } from './default-backend.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LoaderService } from '@core/loader/loader.service';
import { DocumentService } from '@core/ui-components/document-editor/document.service';

const BASIC_AUTH_TOKEN = 'Basic ZWxpdGUyLXRydXN0ZWQtY2xpZW50OlNleWxzaWN0b2Vu';

@Injectable()
export class AuthInterceptor  {


  constructor(private store: TokenStore, private loaderService: LoaderService,private http: HttpClient, private readonly router: Router, public sessionManager: UserSessionManager,
    private documentService: DocumentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/oauth/token')) {
      return this.handleLoginRequest(req, next);
    }

    if (this.hasAccessToken()) {
      return this.handleApiRequest(req, next);
    } else {
      this.sessionManager.removeUserSession();
      this.router.navigate(['/login']);
    }

    return next.handle(req);
  }

  private handleLoginRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        Authorization: BASIC_AUTH_TOKEN
      }
    });

    return next.handle(request);
  }

  private hasAccessToken(): boolean {
    return !!this.sessionManager.getAccessToken();
  }
/**
     * Request interceptor.
     */
    public requestInterceptor(loaderType = LoaderService.FULL_LOADER): void {
      this.loaderService.showLoader(loaderType);
  }

  /**
   * Response interceptor.
   */
  public responseInterceptor(loaderType = LoaderService.FULL_LOADER): void {
      this.loaderService.hideLoader(loaderType);
  }
  private handleApiRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    let headers = req.headers;
    if (headers) {
      headers = headers.append('Authorization', 'bearer ' + this.sessionManager.getAccessToken());
      if(!this.documentService.isSyncDocument) {
      if (headers.has('Content-Type')) {
        if (headers.get('Content-Type') === '') {
          headers = headers.delete('Content-Type');
        }
      } else {
        headers = headers.append('Content-Type', 'application/json');
        }
      } else{
        this.documentService.isSyncDocument = false;
      }
      request = req.clone({ headers });
    } else {
      request = req.clone({
        setHeaders: {
          Authorization: 'bearer ' + this.sessionManager.getAccessToken(),
          'Content-Type': 'application/json'
        }
      });
    }
    //this.requestInterceptor(LoaderService.FULL_LOADER);
    if(this.loaderService.loaderDisplay){
      this.requestInterceptor(LoaderService.FULL_LOADER);
    }
    //this.requestInterceptor(LoaderService.FULL_LOADER);
    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          const resp = err as HttpErrorResponse;
          switch (resp.status) {
            case 401: return this.handleAccessTokenExpired(req, next);
          }
        }
        return throwError(err);
      }),
      finalize(() => {
        this.responseInterceptor(LoaderService.FULL_LOADER);
    }),
    )
  }

  private handleAccessTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.http.post<TokenResponse>('/Elite2Web/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: this.store.refreshToken
    }).pipe(
      tap(resp => {
        this.store.accessToken = resp.access_token;
        this.store.refreshToken = resp.refresh_token;
      }),
      switchMap(() => this.handleApiRequest(req, next)),
      catchError(err => {
        this.store.clear();
        this.sessionManager.removeUserSession();
        this.router.navigate(['/login']);
        return throwError(err);
      })
    );
  }
}
