import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '@core/service/http.service';
import { Observable ,  Observer } from 'rxjs';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';

@Injectable()
export class ReferenceDomainService {

    // TODO: Create a class to store the results (instead of any)
    // - create cache service to be used by all services
    // - it will limit the number of entries stored (dropping ones that have  not been used recently)
    // - move services to separate module
    private data: Map<String, any>;
    private isLiveMode : boolean = false;

    private listenersMap: Map<String, Observer<any>[]>;
    private requestsMap: Map<String, Observable<any>>;

    // TODO update with production Url later
    private domainUrl = 'getReferenceDomainCodes';  // URL to web api

    constructor(private http: HttpService,public sessionManager: UserSessionManager,private router: Router,private dialogService: DialogService ) {
        this.data = new Map<String, any>();
        this.listenersMap = new Map<String, Observer<any>[]>();
        this.requestsMap = new Map<String, Observable<any>>();
    }


    private processResponse(url: string, response: any[]) {
        const listeners: Observer<any>[] = this.listenersMap.get(url);
        if (listeners) {
            while (listeners.length > 0) {
                const observer = listeners.shift();
                if (observer) {
                    observer.next(response);
                    observer.complete();
                }
            }
        }
        this.requestsMap.delete(url);
        this.listenersMap.delete(url);
    }


    getRefCodes(domain: string, parent: string): Observable<any[]> {
        const userId = this.sessionManager.getId();
        const moduleName  = (this.dialogService.screenId && this.dialogService.screenId.length > 0) ? this.dialogService.screenId[this.dialogService.screenId.length-1] : this.router.url?.replace('/','');
        const url = this.composeLink(domain, parent) + '&moduleName='+moduleName;
        /*if(this.isLiveMode) {
            let responseObservable = this.http.get(url);
            return responseObservable;
        } else {*/
            if (this.data.get(url)) {
                // the codes have already been retrieved so just return it as `Observable`
                return new Observable((observer) => {
                    observer.next(this.data.get(url));
                    observer.complete();
                });
            }
            const result: any = new Observable((observer) => {
                let listeners: Observer<any>[] = this.listenersMap.get(url);
                if (!listeners) {
                    listeners = [];
                    this.listenersMap.set(url, listeners);
                }
                listeners.push(observer);
            });

            if (!this.data.get(url)) {
                const request = this.http.get(url);
                if(!this.isLiveMode) {
                    this.requestsMap.set(url, request);
                }
                request.subscribe((response: any[]) => {
                    this.processResponse(url, response);
                    if (response && response.length > 0) {
                        if(!this.isLiveMode) {
                            this.data.set(url, response);
                        }
                        
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err) {
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        
                    }
                }
                    this.requestsMap.delete(url);
                    this.processResponse(url, []);
                });
            }
            return result;
       /* }*/
           
       }

    private composeLink(domain: string, parent: string): string {
        let query = '';
        if (domain) {
            query = query + '&domain=' + domain;
        }
        if (parent) {
            query = query + '&parent=' + parent;
        }

        if (query !== '') {
            query = '?' + query.slice(1);
        }

        return this.domainUrl + query;
    }
    
    clearCache() {
        this.data = new Map<String, any>();
        this.listenersMap = new Map<String, Observer<any>[]>();
        this.requestsMap = new Map<String, Observable<any>>(); 
    }
    
    setLiveMode(isOption : boolean) {
        this.isLiveMode = isOption;
    }
}

