import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable ,  Subject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class OffenderSearchService {

    private innerSearchParams: any;

    private innerSelectedOffender: any;

    private innerCurrentCaseLoad: string;

    private innerRecordsRetrieved: any[];

    private searchParamSubject = new Subject<any>();

    private offenderSubject = new Subject<any>();

    private recordsSubject = new Subject<any>();

    isProperty: boolean;

    isTrust: boolean;
    offenderSelected: any;

    constructor(private http: HttpService) { }

    get searchParams(): any {
        return this.innerSearchParams;
    }

    get searchParamsObservable(): Observable<any> {
        return this.searchParamSubject.asObservable();
    }

    private setSearchParams(searchParams: any) {
        this.innerSearchParams = searchParams;
        this.searchParamSubject.next(this.innerSearchParams);
    }

    get currentCaseLoad(): string {
        return this.innerCurrentCaseLoad;
    }

    set currentCaseLoad(caseload: string) {
        this.innerCurrentCaseLoad = caseload;
        this.setSearchParams(undefined);
        this.selectedOffender = undefined;
    }

    get selectedOffenderObservable(): Observable<any> {
        return this.offenderSubject.asObservable();
    }

    get selectedOffender(): any {
        return this.innerSelectedOffender;
    }

    set selectedOffender(offender: any) {
        this.innerSelectedOffender = offender;
        this.offenderSubject.next(this.innerSelectedOffender);
        if (offender && offender.offenderIdDisplay && offender.bookingNo) {
            this.offenderSelected = {'offenderIdDisplay': offender.offenderIdDisplay, 'bookingNo': offender.bookingNo};

        }
    }

    get recordsRetrieved(): any[] {
        return this.innerRecordsRetrieved;
    }

    set recordsRetrieved(data: any[]) {
        this.innerRecordsRetrieved = data;
        this.recordsSubject.next(this.innerRecordsRetrieved);
    }

    get recordsRetrievedObservable(): Observable<any[]> {
        return this.recordsSubject.asObservable();
    }

    // offenders with case load
    offbkgGlobalQuery(obj: any) {
        obj.agyLocId = this.innerCurrentCaseLoad;
        this.setSearchParams(obj);
        this.selectedOffender = undefined;
        this.http.post('osiosear/offbkgGlobalQuery', obj).subscribe(result => {
            this.recordsRetrieved = result;
        });
    }

    offbkgGlobalPropertyQuery(obj: any) {
        obj.agyLocId = this.innerCurrentCaseLoad;
        this.setSearchParams(obj);
        this.selectedOffender = undefined;
        this.http.post('osiosear/offbkgVPHeadGlobalQuery', obj).subscribe(result => {
            this.recordsRetrieved = result;
        });
    }

    // Trust Header Block Offender Global Query;
    ffbkgGlobalTrustQuery(obj: any) {
        obj.agyLocId = this.innerCurrentCaseLoad;
        this.setSearchParams(obj);
        this.selectedOffender = undefined;
        this.http.post('osiosear/offbkgVTrustHeadGlobalQuery', obj).subscribe(result => {
            this.recordsRetrieved = result;
        });
    }

    // offenders without case load
    offbkgExecuteQuery(obj: any) {
        if (obj.global) {
            obj.agyLocId = this.innerCurrentCaseLoad;
        }
        this.setSearchParams(obj);
        this.selectedOffender = undefined;
        this.http.post('osiosear/offbkgExecuteQuery', obj).subscribe(result => {
            this.recordsRetrieved = result;
        });
    }

    clear() {
        this.setSearchParams(undefined);
        this.selectedOffender = undefined;
        this.recordsRetrieved = undefined;
        this.offenderSelected = null;
    }
}
