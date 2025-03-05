
import {mergeMap, map, share, finalize, catchError, timeout, retryWhen} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { Observable, EMPTY, throwError } from 'rxjs';

import { LoaderService } from '@core/loader/loader.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AppConstants } from '@core/classes/appConstants';
import { UserSession } from '@core/domain/userSession';
import { TranslateService } from '@common/translate/translate.service';
import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { SsoService } from '@common/sso-logout/service/sso.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService  {
    
    constructor(private httpClient: HttpClient,
        private loaderService: LoaderService, private router: Router, public redirectUtil: RedirectUtil,
        public sessionManager: UserSessionManager, public translate: TranslateService, private messagesService: MessagesService, public ssoService: SsoService) {
        
    }

    public static service: HttpService;

    public static reauthObservable: Observable<any>;

    static blankHttpHeader = new HttpHeaders();

    /**
     * Build full URL for request.
     * @param str
     * @returns {string}
     */
    static getFullUrl(str, addapi = true): string {
        if (addapi) {
            return AppConstants.WEB_MODULE + AppConstants.APP_URI + str;
        } else {
            return AppConstants.WEB_MODULE + '/' + str;
        }
    }
    
    static getADAuthRequestOptions(token): any {
        let headers: HttpHeaders = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json');
            headers = headers.set('Accept', 'application/json');
            headers = headers.set('adToken', token);
            headers = headers.set('Authorization', 'Basic ZWxpdGUyLXRydXN0ZWQtY2xpZW50OlNleWxzaWN0b2Vu');
            return {'headers': headers};
    }

    static getAuthRequestOptions(): any {
        let headers: HttpHeaders = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json');
            headers = headers.set('Accept', 'application/json');
            headers = headers.set('Authorization', 'Basic ZWxpdGUyLXRydXN0ZWQtY2xpZW50OlNleWxzaWN0b2Vu');
            return {'headers': headers};
    }
    private requestOptions(options?:any) {
        // if (options == null) {
        //     options = new RequestOptions();
        // }
        if (options == null || options == undefined) {
            options = HttpService.blankHttpHeader;
           // 
        }
        if (!(options.headers.has('Content-Type') || options.headers.has('content-type') )) {
             options = options.append('Content-Type', 'application/json');
        }
        if (! (options.headers.has('Accept') || options.headers.has('accept'))) {
            options = options.append('Accept', 'text/plain, */*');
        }
	   
        if (! (options.headers.has('Authorization') || options.headers.has('authorization'))) {
            if (this.sessionManager.getAccessToken() != null && this.sessionManager.getAccessToken().length > 0) {
                if (options.url == null) {
                   options = options.append('Authorization', this.sessionManager.getTokenType()
                        + ' ' + this.sessionManager.getAccessToken());
                }
            }
        } else {
			if (this.sessionManager.getAccessToken() != null && this.sessionManager.getAccessToken().length > 0) {
				let oldToken = options.headers.get('authorization');
				if(oldToken && oldToken.indexOf('Basic') == -1) {
					options.headers.delete('authorization');
					if (options.url == null) {
						options = options.append('Authorization', this.sessionManager.getTokenType()
                        + ' ' + this.sessionManager.getAccessToken());
					}
				} 
            }
		}
        return options;
    }

    /**
     * Performs any type of http request.
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    /*request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }*/

    /**
     * @param url
     * @param options
     * @param loaderType
     * @returns {Observable<>}
     */
    get(url: string, options?:any, displayLoader = true, loaderType?: string, addapi = true, responseType= 'json'): Observable<any> {

        const fullUrl = HttpService.getFullUrl(url, addapi);

        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);
            this.httpClient.get(fullUrl, {'headers':options, 'responseType': responseType== 'json'?'json': 'text' as 'json'}).pipe(
                timeout(150000),
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                
                map(data => {
                    try {
                        if (data['body']) {
                            try {
                                return data.json();
                            } catch (error) {
                                return data;
                            }
                        }
                        else if (data || data === 0 || data === '' || data === false) {
                            return data;
                        }
                    } catch (error) {
                        return data;
                    }
                    return {};
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401 && addapi) {
                        this.reauthenticate().subscribe((result: any) => {
							
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            observer.error();
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(HttpService.getFullUrl(url));
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(HttpService.getFullUrl(url));
                        }
                        observer.complete();
                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        // observer.error();
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                    else {
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    getBlob(url: string, options?:any, displayLoader = true, loaderType?: string, addapi = true, responseType= 'blob'): Observable<any> {

        const fullUrl = HttpService.getFullUrl(url, addapi);

        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);
            this.httpClient.get(fullUrl, {'headers':options, 'responseType': responseType== 'json'?'json': 'blob' as 'json'}).pipe(
                timeout(150000),
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType) ;
                    }
                }),
                
                map(data => {
                   // 
                    if (data['body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['body'];
                        }
                    } else if (data || data === 0 ||data === '' || data === false) {
                        return data;
                    }
                    return {};
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401 && addapi) {
                        this.reauthenticate().subscribe((result: any) => {
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            observer.error();
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(fullUrl);
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(fullUrl);
                        }
                        observer.complete();

                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        // observer.error();
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                     else {
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    postBlob(url: string, body: any, options?:any, displayLoader = true, loaderType?: string, responseType= 'blob'): Observable<any> {
        
        const fullUrl = HttpService.getFullUrl(url, true);

        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);

            this.httpClient.post<any[]>(fullUrl, body, {'headers':options, 'responseType': responseType== 'json'?'json': 'blob' as 'json'}).pipe(
                timeout(150000),
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data || data === 0 ||data === '' || data === false) {
                        return data;
                    }
                    return {};
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401) {
                        this.reauthenticate().subscribe((result: any) => {
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(fullUrl);
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(fullUrl);
                        }
                        observer.complete();

                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        // observer.complete();
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                     else {
                        //
                        observer.next(error);
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    post(url: string, body: any, options?:any, displayLoader = true, loaderType?: string): Observable<any> {
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);
            this.httpClient.post<any[]>(HttpService.getFullUrl(url), body, {'headers':options}).pipe(
                timeout(150000),
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),
                map(data => {
                    if (data['_body']) {
                        try {
                            return data.json();
                        } catch (error) {
                            return data['_body'];
                        }
                    } else if (data || data === 0 ||data === '' || data === false) {
                        return data;
                    }
                    return {};
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401) {
                        this.reauthenticate().subscribe((result: any) => {
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(HttpService.getFullUrl(url));
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(HttpService.getFullUrl(url));
                        }
                        observer.complete();

                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                     else {
                        //
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    put(url: string, body: string, options?:any, displayLoader = true, loaderType?: string): Observable<any> {
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);
            this.httpClient.put(HttpService.getFullUrl(url), body, {'headers':options}).pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401) {
                        this.reauthenticate().subscribe((result: any) => {
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(HttpService.getFullUrl(url));
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(HttpService.getFullUrl(url));
                        }
                        observer.complete();

                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        // observer.complete();
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                     else {
                        
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    delete(url: string, options?:any, displayLoader = true, loaderType?: string): Observable<any> {
        const observable = new Observable((observer) => {
            if (displayLoader) {
                this.requestInterceptor(loaderType);
            }
            options = this.requestOptions(options);
            this.httpClient.delete(HttpService.getFullUrl(url), {'headers':options}).pipe(
                catchError(this.onCatch),
                finalize(() => {
                    if (displayLoader) {
                        this.onFinally(loaderType);
                    }
                }),)
                .subscribe((res: Response) => {
                    observer.next(res);
                    observer.complete();
                    this.onSubscribeSuccess(res);
                }, (error: any) => {
                    if (error.status === 401) {
                       this.reauthenticate().subscribe((result: any) => {
                            observer.error({ status: 'reauth' });
                        }, (err: any) => {
                            
                        });
                    } else if (error.status === 403) {
                        if (this.redirectUtil.currentActivatedRoute.includes('UNAUTHORIZE')){
                            this.redirectUtil.addNewAunthorizeModule(HttpService.getFullUrl(url));
                        }
                        else{
                            this.redirectUtil.redirectToUnauthorized(HttpService.getFullUrl(url));
                        }
                        observer.complete();

                        // this.sessionManager.addMessage({ message: this.translate.loginTranslate('login.unauthorized.access'),
                        // type: 'error' });
                        // this.sessionManager.removeUserSession();
                        // this.redirectUtil.redirectToLogin();
                        // observer.complete();
                    }
                    else if (error.status === 504 || error.status === 502) {
                        this.sessionManager.removeUserSession();
                        this.redirectUtil.redirectToServerError();
                        observer.error();
                    }
                    else {
                        
                        observer.complete();
                    }
                    this.onSubscribeError(error);
                });
        }).pipe(retryWhen(errors => errors.pipe(mergeMap(error => {
            if (error && error.status === 'reauth') {
                return observable;
            } else {
                return throwError(error);
            }
        }))
        ));
        return observable;
    }

    getLocal(url: string, options?): Observable<any> {
        return this.httpClient.get(url, options);
    }

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    
    unauthorised(): Observable<any> {
        this.router.navigate(['/login']);
        // return Observable.empty();
       return EMPTY;
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

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch = (error: any, caught: Observable<any>): Observable<any> => {
        if (error && error.name === 'TimeoutError') {
            this.messagesService.addMessage(this.translate.translate('service.timeout.error'),
            'error');
        }
		if(error && error.status == 200) {
            //caught.
            const observable = new Observable((observer) => {
                observer.next(error.error.text);
                observer.complete();
                this.onSubscribeSuccess(error.error.text);
            });
            return observable;
        }
        // return Observable.throw(error);
        return throwError(error);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: Response): void {
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {
    }

    /**
     * onFinally
     */
    private onFinally(loaderType = LoaderService.FULL_LOADER): void {
        this.responseInterceptor(loaderType);
    }

    oauth(url: string, body: any, options?): Observable<any> {
        this.requestInterceptor(LoaderService.FULL_LOADER);
        return this.httpClient.post(HttpService.getFullUrl(url, false), body, this.requestOptions(options)).pipe(
            catchError(this.onCatch),
            finalize(() => {
                this.responseInterceptor(LoaderService.FULL_LOADER);
            }),
            map(data => {
                if (data && data['_body']) {
                    try {
                        return data.json();
                    } catch (error) {
                        return data['_body'];
                    }
                } else if (data || data === 0 ||data === '' || data === false ) {
                    return data;
                }
                return {};
            }),);
    }
	
	reauthenticate() {
    if (HttpService.reauthObservable) {
        return HttpService.reauthObservable;
    } else {
        this.requestInterceptor(LoaderService.FULL_LOADER);
        const options = HttpService.getAuthRequestOptions();
        const data = { 'grant_type': 'refresh_token', 'refresh_token': this.sessionManager.getRefreshToken() };
        HttpService.reauthObservable = new Observable((observer) => {
            this.oauth('oauth/token', data, options).pipe(
                finalize(() => {
                    this.responseInterceptor(LoaderService.FULL_LOADER);
                }))
                .subscribe((res: any) => {
                    const userSession: UserSession = new UserSession();
                    userSession.accessToken = res.access_token;
                    userSession.tokenType = res.token_type;
                    userSession.refreshToken = res.refresh_token;
                    userSession.isLoggedin = true;
                    this.sessionManager.addUserSession(userSession);
                    HttpService.reauthObservable = undefined;
                    observer.next(200);
                    observer.complete();
                }, (error: any) => {
                    console.log(error)
                    this.sessionManager.addMessage({ message:
                    this.translate.loginTranslate('login.session.expired'), type: 'warn' });
                    this.sessionManager.removeUserSession();
                    this.sessionManager.removeSsoSession();
                    if (this.ssoService && this.ssoService.isSsoEnable) {
                        this.redirectUtil.redirectToSsoLogin();
                    }
                    else {
                        this.redirectUtil.redirectToLogin();
                    }
                    HttpService.reauthObservable = undefined;
                    observer.complete();
                });
        }).pipe(share());
        return HttpService.reauthObservable;
    }
}
	
}

function reauthenticateOld() {
    if (HttpService.reauthObservable) {
        return HttpService.reauthObservable;
    } else {
        HttpService.service.requestInterceptor(LoaderService.FULL_LOADER);
        const options = this.httpOptions;
        const data = { 'grant_type': 'refresh_token', 'refresh_token': HttpService.service.sessionManager.getRefreshToken() };
        HttpService.reauthObservable = new Observable((observer) => {
            HttpService.service.oauth('oauth/token', data, options).pipe(
                finalize(() => {
                    HttpService.service.responseInterceptor(LoaderService.FULL_LOADER);
                }))
                .subscribe((res: any) => {
                    const userSession: UserSession = new UserSession();
                    userSession.accessToken = res.access_token;
                    userSession.tokenType = res.token_type;
                    userSession.refreshToken = res.refresh_token;
                    userSession.isLoggedin = true;
                    HttpService.service.sessionManager.addUserSession(userSession);
                    HttpService.reauthObservable = undefined;
                    observer.next(200);
                    observer.complete();
                }, (error: any) => {
                    HttpService.service.sessionManager.addMessage({ message:
                        HttpService.service.translate.loginTranslate('login.session.expired'), type: 'warn' });
                    HttpService.service.sessionManager.removeUserSession();
                    HttpService.service.redirectUtil.redirectToLogin();
                    HttpService.reauthObservable = undefined;
                    observer.complete();
                });
        }).pipe(share());
        return HttpService.reauthObservable;
    }
}
