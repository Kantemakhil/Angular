import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OidarfplService } from '@inst/demographics-biometrics/service/oidarfpl.service';
import { OmuavbedLivUnitsQuery } from '@instdemographicsbeans/OmuavbedLivUnitsQuery';
import { OidpinfoService } from '@inst/demographics-biometrics/service/oidpinfo.service';
import { OffenderProfileDetails } from '@commonbeans/OffenderProfileDetails';
import { CourtCase } from '@inst/legal/beans/CourtCase';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OffenderExternalMovementsCommitBean } from '@commonbeans/OffenderExternalMovementsCommitBean';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { OidtrwjuService } from '@inst/movement-external/service/oidtrwju.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { OffenderAttributes } from '@inst/demographics-biometrics/beans/OffenderAttributes';
import { FindFacilityExecuteQueryBean } from '@inst/demographics-biometrics/beans/FindFacilityExecuteQueryBean';


@Component({
    selector: 'app-oidarfpl',
    templateUrl: './oidarfpl.component.html',
    styleUrls: ['./oidarfpl.component.scss']
})
export class OidarfplComponent implements OnInit {
    disabled: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    pesonalInfoColumnDefs:any[];
    findFacilictyColumnDefs:any[];
    courtCasesData : CourtCase[] = [];
    offenderAttributes :OffenderAttributes[] = [];
    offpdData: OffenderProfileDetails[] = [];
    livingunitsData: OmuavbedLivUnitsQuery[] = [];
    personalDetails: OffenderExternalMovements[] = [];
    offemData: OffenderExternalMovements[] = [];
    offpdModel: OffenderProfileDetails = new OffenderProfileDetails();
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
    offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
    caseType:string;
    reportingDate:Date;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdatetList: OffenderExternalMovements[] = [];
    offbkgsData: OffenderBookings[] = [];
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    sentenceCalcType:any;
    sentenceType:string;
    SentencesTypelink:string;
    offenderAttributesList:OffenderAttributes[]=[];
    offenderAttributesTempList:OffenderAttributes[]=[];
    offenderPersonalTmpList:OffenderAttributes[]=[];
    offenderAttributeLabel:string;
    offSentDetails:OffenderAttributes[] = [];
    isSelectenable:boolean;
    offenderPerAttList:OffenderAttributes[]=[];
    offAttList:OffenderAttributes[]=[];
    constructor( public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private offenderSearchService: OffenderSearchService,private oidtrwjuFactory: OidtrwjuService,
            private oidarfplFactory: OidarfplService,private oidpinfoFactory: OidpinfoService,
            private oidreleaFactory: OidreleaService,private osiosearFactory: OsiosearService,
            private router: Router){}

    ngOnInit() {
        this.isSelectenable=true;
        this.pesonalInfoColumnDefs =[
                                     {fieldName: this.translateService.translate('oidarfpl.description'), field: 'personalAttributes', datatype: 'text',
                                        editable: false, width: 220},
                                     {fieldName:'Required',field: 'required',datatype: 'text',editable: false, width: 220
                                     }
                                     ]

        this.findFacilictyColumnDefs =[
                                     {
                                         fieldName:  this.translateService.translate('oidarfpl.facility'), field: 'description', datatype: 'text',
                                         editable: false, width: 220
                                     },
                                     {
                                         fieldName:this.translateService.translate('oidarfpl.currentVac'), field: 'noOfAvailable', datatype: 'text',
                                         editable: false, width: 220        //currentOccupancy
                                     }

                                     ]

  }


    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.caseType='';
            this.sentenceType='';
            this.offenderAttributes=[];
            this.personalDetails = [];
            this.livingunitsData = [];
            this.offpdData = [];
            this.offAttList=[];
            this.offenderAttributesTempList=[];
            this.offenderAttributesList=[];
            this.offenderPersonalTmpList=[];
            this.offenderPerAttList=[];
            this.getOffenderCasesDetails();
            this.offenderAttributeExecuteQuery();
            this.getOffenderSentenceDetails()
            this.offemData = [];
        } else {
            this.caseType='';
            this.sentenceType='';
            this.offAttList=[];
            this.offenderAttributes=[];
            this.personalDetails = [];
            this.livingunitsData = [];
            this.offpdData = [];
            this.offenderAttributesTempList=[];
            this.offenderAttributesList=[];
            this.offenderPerAttList=[];
            this.offenderPersonalTmpList=[];

        }
    }

    getOffenderCasesDetails(){
        const caseResult = this.oidarfplFactory.caseDetailsExecuteQuery(this.vHeaderBlockModel.offenderBookId);
        caseResult.subscribe(casesDetails => {
            if(casesDetails.length==0){
                this.offenderAttributes=[];
                this.caseType='';
            }else{
                this.offenderAttributes=casesDetails;
                for(let i = 0; i< this.offenderAttributes.length;i++){
                    if(this.offenderAttributes[i].caseType=='A'){
                        this.caseType = 'Adult';
                        break;
                    }else{
                        this.caseType = 'Youth';
                    }
                }

            }
        });
    }
    getOffenderSentenceDetails(){
        const sentenceResult = this.oidarfplFactory.getoffendersentDetails( this.vHeaderBlockModel.offenderBookId );
        sentenceResult.subscribe( data => {
            if ( data.length == 0 ) {
                this.sentenceType='';
            } else {
                this.offSentDetails = data
                for ( let i = 0; i <= this.offSentDetails.length; i++ ) {
                    if ( this.offSentDetails[i].category == 'SENT' ) {
                        this.SentencesTypelink = 'ocdccase/populateSentencesType?category=' + this.offSentDetails[i].category;
                        this.sentenceType = this.offSentDetails[0].sentenceCalcType;
                        return;
                    } else {
                        this.SentencesTypelink = 'ocdccase/populateSentencesType?category=' + this.offSentDetails[i].category;
                        this.sentenceType = this.offSentDetails[0].sentenceCalcType;
                    }
                }

            }
        } );
    }

     offenderAttributeExecuteQuery(){
        this.offenderAttributesList=[];
        this.offenderPerAttList=[];
        this.offenderAttributesTempList=[];
        this.offenderPersonalTmpList=[];
        const offenderAttributes = this.oidarfplFactory.offenderAttributeExecuteQuery(this.vHeaderBlockModel);
        offenderAttributes.subscribe(offenderAttributesList => {
            if(offenderAttributesList.length==0){
                this.offenderAttributesList=[];
                this.offenderPerAttList=[];
            }else{
               this.offenderAttributesList=offenderAttributesList;
                for(let i=0;i<offenderAttributesList.length;i++){
                    if(offenderAttributesList[i].attDescription != null){
                        this.offenderAttributesTempList.push(offenderAttributesList[i]);
                    }
                    if(offenderAttributesList[i].personalAttributes!=null && offenderAttributesList[i].personalAttributes!=''){
                        this.offenderPersonalTmpList.push(offenderAttributesList[i]);
                    }
                }
                this.offenderPerAttList=this.offenderPersonalTmpList;
                this.offAttList = this.removeDuplicates(this.offenderAttributesTempList,'attDescription');
            }
        });
        this.offemModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offemModel = new OffenderExternalMovements();
        this.offemExecuteQuery();
    }

     removeDuplicates( originalArray, prop ) {
         var newArray = [];
         var lookupObject = {};
         for ( var i in originalArray ) {
             lookupObject[originalArray[i][prop]] = originalArray[i];
         }
         for ( i in lookupObject ) {
             newArray.push( lookupObject[i] );
         }
         return newArray;
     }


        findFacilityExecutequery(){
            let pLivingUnitType = this.vHeaderBlockModel.agyLocType;
            let findFacilityExecuteQueryBean:FindFacilityExecuteQueryBean = new FindFacilityExecuteQueryBean();
            findFacilityExecuteQueryBean.personalAttributeSet = this.offenderAttributesList;
            findFacilityExecuteQueryBean.caseType = this.caseType === 'Adult' ? 'A':'Y';
            findFacilityExecuteQueryBean.sentenceType = this.sentenceType;
            findFacilityExecuteQueryBean.pLivingUnitType = pLivingUnitType;

            const facilityResult = this.oidarfplFactory.findFacilityExecuteQuery(findFacilityExecuteQueryBean);
            facilityResult.subscribe(facilityResultList => {
                if (facilityResultList.length === 0) {
                    this.livingunitsData = [];
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                    return;
            }else {
                this.livingunitsData = facilityResultList;
            }
            });
        }

    onRowClickFacility(event){
        this.offemModel.toAgyLocId=event.pAgyLocId;
    }


    clickTime(event) {
        if (!this.disabled) {
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' || this.vHeaderBlockModel.inOutStatus === 'Historic') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidtrwju.cannottransferinactiveofndr');
                this.show();
                return;
            }
            this.offemModel.movementTime = DateFormat.getDate();
            this.offemModel.movementDate =  DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
            this.offemModel.reportingDate = DateFormat.getDate();
            if(this.offemModel.reportingDate!=null){
                this.isSelectenable= false;
            }else{
                this.isSelectenable= true;
            }

        }
    }

    offemExecuteQuery() {
        const offemResult = this.oidtrwjuFactory.offEmExecuteQuery(this.offemModelTemp);
        offemResult.subscribe(data => {
            if (data.length === 0) {
                this.offemData = [];
            } else {
                this.offemData = data;
                this.offemModelTemp = data[0];
            }
        });
        const movmentReason = this.oidarfplFactory.getMovementReasonCode();
        movmentReason.subscribe(reasonCode =>{
            if (reasonCode.length === 0) {
            } else {
                this.offemModel.movementReasonCode = reasonCode[0].profileCode;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired on select button
    */
    oidtrwjuSaveoffemForm() {
        if (!this.offemModel.reportingDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidarfpl.reportingdate');
            this.show();
            return;
        }
         if (!this.offemModel.toAgyLocId )  {
            this.type = 'warn';
            this.message = this.translateService.translate('oidtrwju.facilityentered');
            this.show();
            return;
         }
         if (DateFormat.compareDate(DateFormat.getDate(this.offemModel.movementDate),
                 DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidtrwju.datelessthanorequalcrntdate');
                this.show();
                return;
                 }
         if ( DateFormat.compareDate( DateFormat.getDate( this.offemModel.movementDate ),
                 DateFormat.getDate( DateFormat.getDate().setHours( 0, 0, 0, 0 ) ) ) === -1 ) {
                 this.type = 'warn';
                 this.message = this.translateService.translate( 'oidtrwju.dategreaterthanorlstmvmntdatetime' );
                 this.show();
                 return;
             }
        this.offemInsertList = [];
        this.offemUpdatetList = [];
        this.offemCommitModel.insertList = [];
        this.offemCommitModel.updateList = [];
        if (this.offemModelTemp.offenderBookId && this.offemModelTemp.movementSeq) {
            this.offemModelTemp.activeFlag = 'N';
            this.offemModelTemp.modifyDatetime = this.offemModel.modifyDatetime;
            this.offemModel.movementDate=this.offemModel.reportingDate;
            this.offemModelTemp.movementDate = DateFormat.getDate(this.offemModel.movementDate.setHours(12, 0, 0));
            this.offemModelTemp.modifyUserId = this.offemModel.modifyUserId;
            this.offemInsertList.push(this.offemModel);
            this.offemInsertList[0].activeFlag = 'Y';
            this.offemInsertList[0].movementSeq = undefined;
            this.offemInsertList[0].offenderBookId = this.offemModelTemp.offenderBookId;
            this.offemInsertList[0].fromAgyLocId = this.offemModelTemp.toAgyLocId;
            this.offemInsertList[0].movementType = 'TRN';
            this.offemInsertList[0].directionCode = 'OUT';
            this.offemModel.modifyDatetime = DateFormat.getDate();
            this.offemUpdatetList.push(this.offemModelTemp);
        }
        this.offemCommitModel.insertList = this.offemInsertList;
        this.offemCommitModel.updateList = this.offemUpdatetList;
        const offemSaveData = this.oidtrwjuFactory.offEmCommit(this.offemCommitModel);
        offemSaveData.subscribe(data => {
            if (data === 1) {
                if (this.offemModel) {
                    this.vHeaderBlockModel.statusDisplay = 'Inactive';
                    this.vHeaderBlockModel.activeFlag = 'N';
                    this.vHeaderBlockModel.statusReason = this.offemModel.movementReasonCode;
                    this.vHeaderBlockModel.agyLocId = 'TRN';
                    this.vHeaderBlockModel.inOutStatus = 'In Tran';
                    this.vHeaderBlockModel.prisonLocation = 'Transfer';
                    const offData = this.oidreleaFactory.offBookingCommit(this.vHeaderBlockModel);
                    offData.subscribe(offResult => {
                        if (offResult === 0) {
                        } else {
                            this.vHeaderBlockModelTemp = new VHeaderBlock();
                            this.vHeaderBlockModelTemp.offenderBookId = this.offemModelTemp.offenderBookId;
                            this.vHeaderBlockModelTemp.agyLocId = this.sessionManager.currentCaseLoad;
                            const offbkgsResult = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                            offbkgsResult.subscribe(offbkgsResultList => {
                                if (offbkgsResultList.length === 0) {
                                    this.offbkgsData = [];
                                    this.type = 'error';
                                    this.message = this.translateService.translate('common.querycaused');
                                    this.show();
                                    this.vHeaderBlockModel = undefined;
                                } else {
                                    this.offbkgsData = offbkgsResultList;
                                    this.offenderSearchService.selectedOffender = offbkgsResultList[0];
                                    this.router.navigate(['/OIDITRAN']);
                                }
                            });
                            this.offemModel.movementDate = undefined;
                            this.offemModel.movementTime = undefined;
                            this.offemModel.toAgyLocId = undefined;
                            this.offemModel.movementReasonCode = undefined;
                            this.offemModel.commentText = undefined;
                            this.offemModel.reportingDate = undefined;
                            this.offemModel.reportingTime = undefined;
                        }
                    });

                }
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();

            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

        show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
        }

}