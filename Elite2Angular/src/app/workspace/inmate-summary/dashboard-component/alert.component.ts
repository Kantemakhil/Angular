import { Component, OnInit, Injectable, Input } from '@angular/core';
import { OcdalertService } from '@inst/demographics-biometrics/service/ocdalert.service';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderAlerts } from '@instdemographicsbeans/OffenderAlerts';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';


@Component( {
    templateUrl: './alert.component.html',
    providers: [],
    selector: 'alertComponent'
} )
@Injectable({providedIn: 'root'})
export class AlertComponent implements OnInit {
  
    disabledBooking: Boolean = true;
    alertData: OffenderAlerts[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    dateFormat = 'dd/MM/yyyy';//TODO - DateFormat.dateFormat is returning wrong date format;
    link = '/OCDALERT';
    alertTypes : any;
    alertCodes : any;
   
    
    constructor( private ocdalertFactory: OcdalertService,
            public translateService: TranslateService,
            private offenderSearchService: OffenderSearchService,
            private refCodeService: ReferenceDomainService
            ) {
    }
    ngOnInit() {
        this.refCodeService.getRefCodes('ALERT', undefined ).subscribe( alertTypes => {
            this.alertTypes = alertTypes;
        } );
        this.refCodeService.getRefCodes('ALERT_CODE', undefined).subscribe( alertCodes => {
            this.alertCodes = alertCodes;
        } );
    }
    
    getAlertType(code):string {
        let alertType : any;
        if(this.alertTypes) {
            alertType = this.alertTypes.filter(type=> type.code==code);
        }
        return alertType[0].description;
    }
    
    getAlertCode(code, parentCode):string {
        let alertCode :any;
        if(this.alertCodes) {
            alertCode = this.alertCodes.filter(type=> type.code==code && type.parentCode==parentCode);
        }
        return alertCode[0].description;
    }
    
    @Input()
    set selectedOffender(v:any) {
        if (v !== undefined && v !== this.vHeaderBlockModel) {
            this.vHeaderBlockModel = v;
            this.refCodeService.getRefCodes('ALERT', undefined ).subscribe( alertTypes => {
                this.alertTypes = alertTypes;
            } );
            this.refCodeService.getRefCodes('ALERT_CODE', undefined).subscribe( alertCodes => {
                this.alertCodes = alertCodes;
                this.ocdalertExecuteQuery();
            } );
            
        }
    }
    
    ocdalertExecuteQuery() {
         if (this.vHeaderBlockModel.offenderBookId != null) {
             let queryParams = { 
                     offenderBookId: this.vHeaderBlockModel.offenderBookId ,
                     activeFlag:this.vHeaderBlockModel.activeFlag
              }
             const alertResult = this.ocdalertFactory.alertExecuteQuery(queryParams);
             alertResult.subscribe(list => {
              this.alertData = list;
                 this.alertData.forEach(obj=>{
                     if (obj.alertStatus == 'ACTIVE') {
                         obj.alertTypeDes = this.getAlertType(obj.alertType);
                         obj.alertCodeDes = this.getAlertCode(obj.alertCode, obj.alertType);
                         obj.alertDateDisplay = DateFormat.format(obj.alertDate);
                     } 
                 });
             });
         }
     }
       
    ngOnDestroy() {
    }
}
