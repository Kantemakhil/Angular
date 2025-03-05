import {
    Component,
    OnInit,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { OffenderExternalMovements } from '@instmovementexternalbeans/OffenderExternalMovements';
import { OffenderExternalMovementsCommitBean } from '@instmovementexternalbeans/OffenderExternalMovementsCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { OidrelscService } from '@inst/schedules/service/oidrelsc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderReleaseDetails } from '@inst/schedules/beans/OffenderReleaseDetails';

@Component({
    selector: 'app-oidrelea',
    templateUrl: './oidrelea.component.html'
})

export class OidreleaComponent implements OnInit {
    myResetVar = true;
    namesearch: any;
    movementTime: any;
    actionName: string;
    translateLabel: any;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offemData: OffenderExternalMovements[] = [];
    offemDataTemp: OffenderExternalMovements[] = [];
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockBean: VHeaderBlock = new VHeaderBlock();
    offemIndex: number;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdatetList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    offEmCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    minTime: string;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    cgfkOffemmovementreasoncoRg: any[] = [];
    rgmovementreasoncodeRg: any[] = [];
    movementCode: any;
    time: Date;
    date: Date;
    timeflag: Boolean;
    dateFlag: Boolean;
    movementReasonCodeFlag: Boolean;
    commentTextFlag: Boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    saveflag: boolean;
    clearflag: boolean;
    warningFlag: boolean;
    statusReason: string;
    movementDate: Date;
    offenderBookId: any;
    lastMovementTime: any;
    offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
    codedesformat = { code: 'Reason', description: 'Description' };
    cameraButton: boolean;
    exitLaunchBtn: boolean;
    profileValue: boolean;
    reasonCodeValid: boolean;
    commentDisable: boolean = true;
    offreldetModel: OffenderReleaseDetails = new OffenderReleaseDetails();
    constructor(private oidreleaFactory: OidreleaService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        public dialogService: DialogService,
        private osiosearFactory: OsiosearService,
        private oidrelscFactory: OidrelscService,
        private router: Router, private activatedRoute: ActivatedRoute, private sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.disabled = true;
        this.saveflag = true;
        this.clearflag = true;
        this.exitLaunchBtn = false;
        this.cameraButton = true;
        this.warningFlag = false;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.nbtNonAssVProceed && this.offenderSearchService.selectedOffender.nbtNonAssVProceed === 'Y') {
            localStorage.setItem('selectedOffender', JSON.stringify(this.offenderSearchService.selectedOffender));
            localStorage.getItem('offreldetModel');
            this.exitLaunchBtn = true;
            this.namesearch = this.offenderSearchService.selectedOffender;
            this.movementReasonCodeKeyNextItemTrigger();
       }
        const serviceObj1 = this.oidreleaFactory.cgfkOffemmovementreasoncoRecordGroup();
        serviceObj1.subscribe(list1 => {
            if (list1.length === 0) {
                return;
            } else {
                for (let i = 0; i < list1.length; i++) {
                    this.cgfkOffemmovementreasoncoRg.push({
                        'id': list1[i].code + ' - ' + list1[i].description,
                        'text': list1[i].description
                    });
                }
            }
        });
        const serviceObj2 = this.oidreleaFactory.rgMovementReasonCodeRecordGroup();
        serviceObj2.subscribe(list2 => {
            if (list2.length === 0) {
                return;
            } else {
                for (let i = 0; i < list2.length; i++) {
                    this.rgmovementreasoncodeRg.push({ 'id': list2[i].code, 'text': list2[i].description });
                }
            }
        });
        const profileValueData = this.oidreleaFactory.gettingProfileValue();
        profileValueData.subscribe(profileValue => {
            if (profileValue === 'Y') {
                this.profileValue = true;
            } else {
                this.profileValue = false;
            }
        });
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === undefined ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === 'Historic') {
            this.movementReasonCodeFlag = true;
            this.commentTextFlag = true;
            this.commentDisable = true;
            this.timeflag = true;
            this.dateFlag = true;
            this.saveflag = true;
            this.clearflag = true;
        }
        if(this.vHeaderBlockModel !== null) {
            if(this.vHeaderBlockModel.releaseConfirmFlag == true) {
                this.offemModel.verifiedFlag = 'Y';
            } else {
                this.offemModel.verifiedFlag = 'N';
            }
        }
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.disabled = false;
            this.saveflag = false;
            this.cameraButton = false;
            this.offemModel = new OffenderExternalMovements();
            if(offender['statusDisplay'] && offender['statusDisplay'] !== 'Inactive'){
                this.getOffenderReleaseSchedule(offender);
            }
            if (this.vHeaderBlockModel.offenderBookId) {
                this.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.getMovementDate();
            }
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
                this.vHeaderBlockModel.statusDisplay === 'Historic') {
                this.offemModel = new OffenderExternalMovements();
                this.offemModelTemp = new OffenderExternalMovements();
                this.movementReasonCodeFlag = true;
                this.commentTextFlag = true;
                this.commentDisable = true;
                this.timeflag = true;
                this.dateFlag = true;
                this.saveflag = true;
                this.clearflag = true;
                this.movementTime = '';
            } else {

                this.offemModelTemp = new OffenderExternalMovements();
                this.movementReasonCodeFlag = false;
                this.commentTextFlag = false;
                this.timeflag = false;
                this.dateFlag = false;
                this.saveflag = false;
                this.movementTime = '';
                this.getOffenderCommentText()
            }
        } else {
            this.offemModel = new OffenderExternalMovements();
            this.offemModelTemp = new OffenderExternalMovements();
            this.movementReasonCodeFlag = true;
            this.commentTextFlag = true;
            this.commentDisable = true;
            this.timeflag = true;
            this.dateFlag = true;
            this.saveflag = true;
            this.movementTime = '';
            this.clearflag = true;
            this.cameraButton = true;
            this.reasonCodeValid = false;
            this.disabled = true;
        }
    }
    getMovementDate() {
        const movementDate = this.oidreleaFactory.movementDateComparison(this.offenderBookId);
        movementDate.subscribe(lastMovementDate => {
            if (lastMovementDate) {
                this.movementDate = lastMovementDate[0].movementDate;
                this.lastMovementTime = lastMovementDate[0].movementTime;
            }
        });
    }
    onMovementReasonCodeLovclick(event) {
    }
    reasonCode() {
    }
    releaseOffender() {
        if (this.namesearch && this.namesearch.nbtNonAssVProceed === 'Y') {
                //this.offemModel.movementDate = this.namesearch.currDate;
                this.movementTime = DateFormat.getDate();
                this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(this.namesearch.currDate).setHours(this.movementTime.getHours(),this.movementTime.getMinutes(),0,0));
                this.offemModel.movementReasonCode = this.namesearch.errorMessage;
                this.offemModel.commentText =this.offemModel.commentText?this.offemModel.commentText:null;

                
        } else {
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (this.vHeaderBlockModel.statusDisplay) {
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' || this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
                this.vHeaderBlockModel.statusDisplay === 'Historic') {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrelea.releaseoffender');
                this.show();
                return;
            }
        }
        if (this.vHeaderBlockModel.offenderBookId) {
            if (this.vHeaderBlockModel.statusDisplay === 'ACTIVE' || this.vHeaderBlockModel.statusDisplay === 'Active'
                || this.vHeaderBlockModel.statusDisplay === '' || this.vHeaderBlockModel.statusDisplay === undefined) {
                if (!this.offemModel.movementDate || !this.offemModel.movementTime) {
                    if(this.offemModel.movementDate){
                        this.movementTime = DateFormat.getDate();
                        this.offemModel.movementTime = this.movementTime;
                        this.clearflag = false;
                    }
                    else{
                        this.movementTime = DateFormat.getDate();
                        this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate().setHours(this.movementTime.getHours(),this.movementTime.getMinutes(),0,0));
                        const cDate = DateFormat.getDate(this.offemModel.movementDate);
                        //cDate.setHours(0, 0, 0, 0);
                        this.offemModel.movementDate = cDate;
                        this.offemModel.movementTime = this.movementTime;
                        this.clearflag = false;
                    }
                }
            }
        }
    }
    }
    allowNumbers(event) {
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onCameraPcclick() {
        this.cameraButton = true;
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' || this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.releaseoffender');
            this.show();
            this.cameraButton = false;
            return;
        }
        if (this.offenderBookId) {
            const captureImageData = this.osiosearFactory.captureImageProcedure();
            captureImageData.subscribe(captureImage => {
              if (captureImage === 'OIUIMAGE') {
                this.oidreleaFactory.imagesDataTemp.imageObjectId = this.offenderBookId;
                this.oidreleaFactory.imagesDataTemp.imageObjectType = 'OFF_BKG';
                this.oidreleaFactory.imagesDataTemp.imageViewType = 'FACE';
                this.dialogService.openLinkDialog('/oiuimagedialog', this.oidreleaFactory.imagesDataTemp, 80).subscribe(result => {
                    this.movementReasonCodeKeyNextItemTrigger();
                    this.cameraButton = false;
                });
              } else {
                return;
              }
            });
          }
    }
    onFingerPrintclick() {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' || this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.releaseoffender');
            this.show();
            return;
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
        const reason = this.offemModel.movementReasonCode === undefined ? '' : undefined;
        this.offemModel = new OffenderExternalMovements();
        this.offemModel.movementReasonCode = reason;
        this.offemModelTemp = new OffenderExternalMovements();
        this.offemModel.commentText = '';
        this.movementTime = '';
        this.offemModel.movementDate = null;
        this.clearflag = true;
        this.reasonCodeValid = false;
    }
    executeQuery() {
        const offemResult = this.oidreleaFactory.offEmExecuteQuery(this.offemModel);
        offemResult.subscribe(offemResultList => {
            if (offemResultList.length === 0) {
                this.offemData = [];
            } else {
                this.offemData = offemResultList;
                this.offemModel = offemResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidreleaCommitForm() {
        if (this.offemModel.movementDate === undefined ||
            this.offemModel.movementDate == null) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.movementdate');
            this.show();
            return;
        }
        if (this.movementTime === undefined ||
            this.movementTime == null || this.movementTime === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.movementtime');
            this.show();
            return;
        }

        if (this.offemModel.movementReasonCode === undefined ||
            this.offemModel.movementReasonCode == null || this.offemModel.movementReasonCode === '') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.movementreasoncode');
            this.show();
            return;
        }
        if (this.offemModel.movementDate) {
            this.movementDate = DateFormat.getDate(this.movementDate);
            if (DateFormat.compareDate(this.movementDate, DateFormat.getDate(this.offemModel.movementDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrelea.lastmovementdate');
                this.show();
                return;
            }
            if (DateFormat.compareDate(DateFormat.getDate(this.offemModel.movementDate), DateFormat.getDate()) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrelea.laterthancurrentdate');
                this.show();
                return;
            }
        }
        if (this.movementTime) {
            const lMovementTime = this.movementTime.getHours() + ':' + this.movementTime.getMinutes();
            this.movementDate = DateFormat.getDate(this.movementDate.setHours(this.movementTime.getHours(),this.movementTime.getMinutes()));
            this.offemModel.movementTime = TimeFormat.parse(lMovementTime, this.offemModel.movementDate);
            if (DateFormat.compareDateTime(this.offemModel.movementTime, DateFormat.getDate()) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrelea.laterthancurrentdatetime');
                this.show();
                return;
            }
            if (DateFormat.compareDateTime(DateFormat.getDate(this.lastMovementTime), this.offemModel.movementTime) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrelea.lastmovementdatetime');
                this.show();
                return;
            }
        }
        if (!this.commentTextFlag && this.offemModel.commentText!=null) { 
            const userSession = this.sessionManager.userSessionDetails();
            const resData = " [" + userSession.staff.firstName + " " + userSession.staff.lastName + " " + DateFormat.updateServerDate() + "] ";
            this.offemModel.commentText = resData + this.offemModel.commentText;
        }  
        if (this.offemModel.commentText && this.offemModel.commentText.length > 240) { 
            this.type = 'warn';
            this.message = this.translateService.translate('oidrelea.commenttextmustbelessthan240char');
            this.show();
            return;
        }
        this.offemInsertList = [];
        this.offemUpdatetList = [];
        this.offEmCommitModel.insertList = [];
        this.offEmCommitModel.updateList = [];
        
        this.offemModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offemModel.movementDate = this.offemModel.movementDate;
        this.offemModel.movementTime = this.offemModel.movementTime;
        this.offemModel.movementReasonCode = this.offemModel.movementReasonCode;
        this.offemModel.fromAgyLocId = this.vHeaderBlockModel.agyLocId;
        this.offemModel.commentText = this.offemModel.commentText;
        if (this.vHeaderBlockModel.statusDisplay === 'ACTIVE' || this.vHeaderBlockModel.statusDisplay === 'Active') {
            this.offemModel.activeFlag = 'Y';
        }
        this.offemModel.releaseConfNotification='N'
        this.offemInsertList.push(this.offemModel);
        this.offemUpdatetList.push(this.offemModel);
        this.offEmCommitModel.insertList = this.offemInsertList;
        // this.offEmCommitModel.updateList = this.offemUpdatetList;
        
            if ((this.vHeaderBlockModel.currDate  && this.offemModel.verifiedFlag === 'N')) {
                this.message = this.translateService.translate('oidrelea.Youarereleasinganoffenderwhodoesnothaveaverifiedconfirmedreleasedate');
                const data = {
                    label: this.message,
                    yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok') , cancelBtn : true
                };
                this.validationSetUp(data);
                
            } else if ((!this.vHeaderBlockModel.currDate)) {
                this.message = this.translateService.translate('oidrelea.Youarereleasinganoffenderwhodoesnothaveaconfirmedreleasedate');
                const data = {
                    label: this.message,
                    yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok') , cancelBtn : true
                };
                this.validationSetUp(data);
            }  else if (DateFormat.compareDate(DateFormat.getDate(this.offemModel.movementDate),
                        DateFormat.getDate(this.vHeaderBlockModel.currDate)) !== 0) {
                this.message = this.translateService.translate('oidrelea.Youarereleasinganoffenderonadifferentdatethantheirconfirmedreleasedate');
                const data = {
                    label: this.message,
                    yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok') , cancelBtn : true
                };
                this.validationSetUp(data);
                
            }  else {

        if (this.reasonCodeValid && this.profileValue) {
            this.message = this.translateService.translate('oidrelea.activeprogramsandservicesreferrals');
            const date = DateFormat.format(this.offemModel.movementDate);
            this.message = String(this.message).replace('&DATE&', date);
            const data = {
                label: this.message,
                yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok') , cancelBtn : true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.offEmCommitModel.insertList[0].reasonCodeValid = 'TRUE';
                    this.commitMethod(this.offEmCommitModel);
                } else {
                }
            });
        } else {
            if (this.reasonCodeValid) {
                this.offEmCommitModel.insertList[0].reasonCodeValid = 'TRUE';
            } else {
                this.offEmCommitModel.insertList[0].reasonCodeValid = 'FALSE';
            }
            
            this.commitMethod(this.offEmCommitModel);
        }
    }
    }
    commitMethod(event) {
        const offemSaveData = this.oidreleaFactory.offEmCommit(event);
        offemSaveData.subscribe(offemSaveResult => {
            if (offemSaveResult[0] === 0) {
            } else {
                this.offemModel.commentText = undefined;
                this.vHeaderBlockModel.statusDisplay = 'Inactive';
                this.vHeaderBlockModel.prisonLocation = 'Outside';
                this.vHeaderBlockModel.statusReason = 'REL' + '-' + this.offemModel.movementReasonCode;
                this.vHeaderBlockModel.headerStatus = 'Y';
                if(this.namesearch && this.namesearch.nbtNonAssVProceed === 'Y'){
                    this.vHeaderBlockModel.nbtNonAssVProceed =  true;
                } else {
                    this.vHeaderBlockModel.nbtNonAssVProceed =  false;
                }
               
                const offData = this.oidreleaFactory.offBkgCommit(this.vHeaderBlockModel);
                offData.subscribe(offResult => {
                    if (offResult[0] === 0) {
                    } else {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.myResetVar = false;
                        this.reasonCodeValid = false;
                        this.vHeaderBlockBean = new VHeaderBlock();
                        this.vHeaderBlockBean.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                        this.vHeaderBlockBean.agyLocId = this.sessionManager.currentCaseLoad;
                        setTimeout(() => {
                            this.myResetVar = true;
                          },0);
                        const offbkGlobal = this.osiosearFactory.offbkgExecuteQuery(this.vHeaderBlockBean);
                        offbkGlobal.subscribe(list => {
                            if (list.length > 0) {
                                this.vHeaderBlockModel = list[0];
                                this.offenderSearchService.selectedOffender = list[0];
                            }
                        });
                        this.offemModel.movementDate = undefined;
                        this.offemModel.movementReasonCode = undefined;
                        this.offemModel.commentText = undefined;
                        this.movementTime = undefined;
                        this.movementReasonCodeFlag = true;
                        this.commentTextFlag = true;
                        this.timeflag = true;
                        this.dateFlag = true;
                        this.saveflag = true;
                        return;
                    }
                });

            }
        });
    }

    oidreleaExecuteQuery() {
        const syspflResult = this.oidreleaFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    movementReasonCodeKeyNextItemTrigger() {
        this.clearflag = false;
        this.offemModelTemp = new OffenderExternalMovements();
        if (this.namesearch && this.namesearch.offenderBookId) {
            this.offemModelTemp.offenderBookId = this.namesearch.offenderBookId;
        } else {
            this.offemModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        }
        if (!this.warningFlag) {
            const checkActiveData = this.oidreleaFactory.omsMovementsCheckActiveCases(this.offemModelTemp);
            checkActiveData.subscribe(checkActiveResult => {
                this.warningFlag = false;
                if (checkActiveResult === 'Y') {
                    this.warningFlag = false;
                    this.dialogService.openLinkDialog('/ocurwarn', this.vHeaderBlockModel).subscribe(result => {
                        if (result) {
                            this.warningFlag = true;
                            this.releaseOffender();
                        } else {

                        }
                    });
                } else {
                    this.releaseOffender();
                }
            });
        } else {
            this.releaseOffender();
        }
    }
    onExitBtnClick = () => {
        if (this.namesearch) {
            localStorage.removeItem('selectedOffender');
           this.oidrelscFactory.isRedirect = true;

            this.router.navigate(['/OIDRELSC']);
        }
        return true;
    }
    movementReasonCodeChangeEvent(event) {
        if (event && event.code) {
            const checkActiveData = this.oidreleaFactory.getClosedFlag(event.code);
            checkActiveData.subscribe(checkActiveResult => {
                if (checkActiveResult === 'Y') {
                    this.reasonCodeValid = true;
                } else {
                    this.reasonCodeValid = false;
                }
            });
        }
    }
    getOffenderCommentText() { 
        const commentText = this.oidreleaFactory.getOffenderCommentText(this.offenderBookId);
             commentText.subscribe(comment => {
                 this.offemModel.commentText = comment;
                 this.commentTextFlag = (this.offemModel.commentText && this.offemModel.commentText.length > 0) ? true : false;
                 this.commentDisable = (this.offemModel.commentText && this.offemModel.commentText.length > 0) ? false : true;
            });
    }
    appendReportDialog() {
        this.offreldetModel['screenId'] = 'OIDRELEA';
        this.offreldetModel.offenderBookId = this.offenderBookId;
        const userSession = this.sessionManager.userSessionDetails();
        const resData = " [" + userSession.staff.firstName + " " + userSession.staff.lastName + " " + DateFormat.updateServerDate() + "] ";
        this.offreldetModel.commentText = (this.offemModel.commentText != null) ? this.offemModel.commentText + resData : resData;
    this.dialogService.openLinkDialog( '/OIUIRAME', this.offreldetModel, 60 ).subscribe( result => {
       this.getOffenderCommentText()
    } );
}   
    getOffenderReleaseSchedule(offender) {
        let offenderBookId = offender.offenderBookId;
        const releaseSchedule = this.oidreleaFactory.getOffreleaseSchedule(offenderBookId);
        releaseSchedule.subscribe(data => {
            this.movementTime = DateFormat.getDate();
            this.offemModel.movementDate = DateFormat.getDate(DateFormat.getDate(data[0].releaseDate).setHours(this.movementTime.getHours(),this.movementTime.getMinutes(),0,0));
            this.offemModel.movementReasonCode = data[0].movementReasonCode;
            this.offemModel.commentText = data[0].commentText;
            this.offemModel.verifiedFlag = data[0].verifiedFlag
            this.vHeaderBlockModel.currDate = (DateFormat.getDate(DateFormat.getDate(data[0].releaseDate).setHours(this.movementTime.getHours(),this.movementTime.getMinutes(),0,0))).toString();
        })

    }

    validationSetUp(data){
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
                if (this.reasonCodeValid && this.profileValue) {
                    this.message = this.translateService.translate('oidrelea.activeprogramsandservicesreferrals');
                    const date = DateFormat.format(this.offemModel.movementDate);
                    this.message = String(this.message).replace('&DATE&', date);
                    const data = {
                        label: this.message,
                        yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('common.ok') , cancelBtn : true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                        if (result) {
                            this.offEmCommitModel.insertList[0].reasonCodeValid = 'TRUE';
                            this.offEmCommitModel.insertList[0].releaseConfNotification='Y';
                            this.commitMethod(this.offEmCommitModel);
                        } else {
                        }
                    });
                } else {
                    if (this.reasonCodeValid) {
                        this.offEmCommitModel.insertList[0].reasonCodeValid = 'TRUE';
                    } else {
                        this.offEmCommitModel.insertList[0].reasonCodeValid = 'FALSE';
                    }
                    this.offEmCommitModel.insertList[0].releaseConfNotification='Y';
                    this.commitMethod(this.offEmCommitModel);
                }
            } else {
            }
        });
    }
}
