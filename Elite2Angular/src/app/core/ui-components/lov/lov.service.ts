import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '@core/service/http.service';
import { Observable ,  Observer } from 'rxjs';


@Injectable()
export class LovService {


    // TODO: Create a class to store the results (instead of any)
    // - create cache service to be used by all services
    // - it will limit the number of entries stored (dropping ones that have  not been used recently)
    // - move services to separate module
    private data: Map<String, any>;
    private isLiveMode : boolean = false;
    private listenersMap: Map<String, Observer<any>[]>;
    private requestsMap: Map<String, Observable<any>>;

    constructor(private http: HttpService) {
        // should use session store / local store to avoid on refresh load
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

    getOptions(url: string): Observable<any[]> {

        if (!url) {
            return new Observable((observer) => {
                observer.next([]);
                observer.complete();
            });
        }

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
                if(!this.isLiveMode || (response && response.length > 0)) {
                    this.data.set(url, response);
                }
            },
            (err: HttpErrorResponse) => {
                if (err.error && err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    
                }
                this.processResponse(url, []);
            });
        }
        return result;
    }

    clear(link: string) {
        if (link) {
            this.data.delete(link);
        }
    }

    clearStartWith(link: string) {
        if (link) {
            const keys = Array.from(this.data.keys());
            keys.forEach(element => {
                if (element.startsWith(link)) {
                    this.data.delete(element);
                }
            });
        }
    }

    get fontDetails(): string {
        return '16px InterUI-Regular,"Helvetica Neue",sans-serif';
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
