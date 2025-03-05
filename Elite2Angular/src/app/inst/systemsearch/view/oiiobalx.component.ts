import { Subject } from 'rxjs';
import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Images } from '@common/beans/Images';
import { OffExternalAccountBalances } from '@inst/systemsearch/beans/offExternalAccountBalances';
import { VOffenderVisitVisitors } from '@inst/visits-management/beans/VOffenderVisitVisitors';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderVisitVisitors } from '@inst/visits-management/beans/OffenderVisitVisitors';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VOffenderVisitsCommitBean } from '@inst/visits-management/beans/VOffenderVisitsCommitBean';
import { VOffenderVisitVisitorsCommitBean } from '@inst/visits-management/beans/VOffenderVisitVisitorsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OcuavlocService } from '@inst/visits-management/service/ocuavloc.service';
import { VOcuavlocAvailable } from '@visitsbeans//VOcuavlocAvailable';
import { OffenderVisitVisitorsCommitBean } from '@inst/visits-management/beans/OffenderVisitVisitorsCommitBean';
import { OcuoichnService } from '@inst/incidents-oic/service/ocuoichn.service';
import { OicHearings } from '@instoicbeans/OicHearings';
import { VOcuavlocUnavailable } from '@inst/visits-management/beans/VOcuavlocUnavailable';
import {OiiobalxService} from '@inst/systemsearch/service/oiiobalx.service'
import { OmuaprisService } from '@inst/visits-management/service/omuapris.service';
import { VOffenderAuthorisedVisitors } from '@inst/visits-management/beans/VOffenderAuthorisedVisitors';
import { OcuavisnService } from '@inst/visits-management/service/ocuavisn.service';
import { VOffContactPersons } from '@inst/visits-management/beans/VOffContactPersons';
import { OcuvwarnService } from '@inst/visits-management/service/ocuvwarn.service';
import { ValidateVisitorBean } from '@inst/visits-management/beans/ValidateVisitorBean';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { ManageAppBarService } from '@core/service/manage-app-bar.service';

@Component({
  selector: 'app-oiiobalx',
  templateUrl: './oiiobalx.component.html'
  
})

export class OiiobalxComponent implements OnInit {
  offexternalcolumn:any[];
  offexternalrowmap:OffExternalAccountBalances[]=[];
  offendeExternalCall:any;
  vHeaderBlockModel: VHeaderBlock;
  actionName: boolean;
  lovModel: any[];
  msgs: any[] = [];
  type = 'error';
  msglist = [];
  message = ' Invalid.';
  latestUpdateDate:any;
  cellDate:any;
  date:string;
  time:string;

 

  constructor(private appbarService:ManageAppBarService,private oiiobalxService:OiiobalxService, 
    public translateService: TranslateService,
    public dialogService: DialogService,
    private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
     private osiosearchService: OsiosearService) {
    this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
  }

  ngOnInit() {
    this.offendeExternalCall = new OffExternalAccountBalances();
    if(this.vHeaderBlockModel){
      this.offendeExternalCall.offenderBookId=this.vHeaderBlockModel.offenderBookId;      
      this.offendeExternalCall.rootOffenderId=this.vHeaderBlockModel.rootOffenderId;
    }
    this.offexternalcolumn = [
      
      {
        fieldName: this.translateService.translate('oiiobalx.accountid'), field: 'accountId',
        editable: false, width: 150,datatype:'number', whole: true
      },
      {
        fieldName: this.translateService.translate('oiiobalx.accountType'), field: 'accountType',
        editable: false, width: 150,datatype:'Text'
      },
      {
        fieldName: this.translateService.translate('oiiobalx.balance'), field: 'balance',
        editable: false, width: 150,datatype:'number',format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99
      },
      {
        fieldName: this.translateService.translate('oiiobalx.lastModified'), field: 'lastChanged',
        editable: false, width: 150, datatype:'dateTime'
      },
      {
        fieldName: this.translateService.translate('oiiobalx.accountDetails'), field: 'accountDetails',
        editable: false, width: 150,datatype:'text'
      },
    ];
   
   // this.offenderExternalAccountExecuteQuery();

  }


  

  

  offenderExternalAccountExecuteQuery(){
   const response= this.oiiobalxService.offenderExternalAccount(this.offendeExternalCall);

   response.subscribe(result=>{
    if(result && result.length>0){
      this.getBalanceLastUpdatedDate();
      this.offexternalrowmap=result;

    }else{
      this.offexternalrowmap=[];
      this.latestUpdateDate = '';
      this.time='';
        }
   });


  }

  getBalanceLastUpdatedDate(){
    this.latestUpdateDate = '';
    this.time='';
    const response= this.oiiobalxService.getBalanceLastUpdatedDate();
    response.subscribe(data => {
			if (data!=null) {
        this.latestUpdateDate=DateFormat.getDate(data);
        this.latestUpdateDate= DateFormat.format(this.latestUpdateDate);
        this.time=TimeFormat.format(data);
      }
		});
  }
  onOffenderChange(offender) {
    if (offender) {
      this.vHeaderBlockModel=offender;
      this.offendeExternalCall.rootOffenderId=this.vHeaderBlockModel.rootOffenderId;
      this.offendeExternalCall.offenderBookId=this.vHeaderBlockModel.offenderBookId;
      this.offenderExternalAccountExecuteQuery();
    } else{
      this.offexternalrowmap=[];
      this.latestUpdateDate = '';
      this.time='';
      this.offendeExternalCall.rootOffenderId=null;
      this.offendeExternalCall.offenderBookId=null;
    }
  }

 
  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  
 
}
