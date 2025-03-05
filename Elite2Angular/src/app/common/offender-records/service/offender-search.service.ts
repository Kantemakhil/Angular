import { Injectable , EventEmitter} from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Images } from '@commonbeans/Images';
import { OsiosearService } from '../service/osiosear.service';
import { Observable, Subject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class OffenderSearchService {

    private innerSearchParams: any;

    private innerSelectedOffender: any;

    private innerCurrentCaseLoad: string;

    private innerRecordsRetrieved: any[];

    private searchParamSubject = new Subject<any>();

    private offenderSubject = new Subject<any>();

    private recordsSubject = new Subject<any>();
    
    private recentOffenderUpdate = new Subject<any>();
    
    private updateIntake = new Subject<any>();
    private imageModel: Images = new Images();

    isProperty: boolean;

    isTrust: boolean;

    offenderSelected: any;
    isRecentOffernderUpdated$ = new Subject<any>();
    // logic added for recentoffenders
     private recentOffStatus = new Subject<any>();
     invokeFirstComponentFunction = new EventEmitter();    
    //  subsVar: Subscription; 
    
    allowAgencies: any[] = [];
       

    constructor(private http: HttpService,private osiosearService:OsiosearService) { }

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
        // If SAME offender is already selected..then no need to select it Again
        // if (offender && offender['offenderIdDisplay'] &&
        //     this.innerSelectedOffender && this.innerSelectedOffender['offenderIdDisplay'] &&
        //     offender['offenderIdDisplay'] == this.innerSelectedOffender['offenderIdDisplay']) {
        //     return;
        // }
        this.innerSelectedOffender = offender;
        this.offenderSubject.next(this.innerSelectedOffender);
        if(this.innerSelectedOffender!=null){
        this.imageSearch(this.innerSelectedOffender.imageId)
        }
        if (offender && offender.offenderIdDisplay && offender.bookingNo) {
            this.offenderSelected = {'offenderIdDisplay': offender.offenderIdDisplay, 'bookingNo': offender.bookingNo, 'form': 'OFFDASH'};
            // Update recent offender list.
            this.updateRecentOffenderList(this.innerSelectedOffender);
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
        if (obj.global == true ) {
            obj.agyLocId = undefined;
        }
        else{
            obj.agyLocId = this.innerCurrentCaseLoad;
        }
        this.setSearchParams(obj);
        this.selectedOffender = undefined;
        this.http.post('osiosear/offbkgExecuteQuery', obj).subscribe(result => {
            this.recordsRetrieved = result;
        });
    }
    
    clearParams() {
        this.setSearchParams(undefined);
    }

    clear() {
        this.setSearchParams(undefined);
        this.selectedOffender = undefined;
        this.recordsRetrieved = undefined;
        this.offenderSelected = null;
    }


    imageSearch(imageId) {


        if (imageId != null ) {
                               this.imageModel.imageId = imageId;
                               this.osiosearService.imageExecuteQuery( this.imageModel ).subscribe( imageData => {
                               this.selectedOffender.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                               this.innerSelectedOffender.image='data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                 });
                }

    }
    updateRecentOffenderList(VHeaderBlock) {
        VHeaderBlock.caseLoadId = this.innerCurrentCaseLoad;
        const updateRecentOffender = this.callPostAPI(VHeaderBlock);
        updateRecentOffender.subscribe(result => {
            this.isRecentOffernderUpdated$.next(VHeaderBlock);
        });
    }

    callPostAPI(VHeaderBlock: any ) {
        return this.http.post( 'omss40/updateRecentOffenderList', VHeaderBlock );
    }


    get recentOffenderUpdateObservable(): Observable<any> {
        return this.recentOffenderUpdate.asObservable();
    }

    set showRecentOffenders(updates: any) {
        this.recentOffenderUpdate.next(updates);
    }
    
    get getUpdateInatkeData(): Observable<any> {
        return this.updateIntake.asObservable();
    }

    set updateInatkeData(updates: any) {
        this.updateIntake.next(updates);
    }
    setOffenderStatus(staus1) {
        this.recentOffStatus.next(staus1);
    }
    getOffenderStatus(): Observable<any> {
        return this.recentOffStatus.asObservable();
    }
      
      
    onFirstComponentButtonClick() {    
      this.invokeFirstComponentFunction.emit();    
    }  

    compare( a, b ) {
        if ( a.modifyDatetime < b.modifyDatetime ){
          return 1;
        }
        if ( a.modifyDatetime > b.modifyDatetime ){
          return -1;
        }
        return 0;
      }


    
      
}
