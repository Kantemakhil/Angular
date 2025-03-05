import {
    Component, OnInit, Renderer2
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidtrwjuService } from '@inst/movement-external/service/oidtrwju.service';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { OffenderExternalMovementsCommitBean } from '@commonbeans/OffenderExternalMovementsCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
    selector: 'app-oidtrwju',
    templateUrl: './oidtrwju.component.html'
    // styleUrls: ['./oidtrwju.component.css']
})

export class OidtrwjuComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offemData: OffenderExternalMovements[] = [];
    offemDataTemp: OffenderExternalMovements[] = [];
    // TODO angular.copy(this.offemData, thisoffemDataTemp);
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    offemBean: OffenderExternalMovements = new OffenderExternalMovements();
    offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
    offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
    offemIndex = 0;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdatetList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    offbkgsData: OffenderBookings[] = [];
    // TODO angular.copy(this.syspflData, thissyspflDataTemp);
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offEmReadOnly = false;
    cgfkOffemmovementreasoncoRg: any[] = [];
    cgfkOffemtoagylocidRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    time: Date;
    date: Date;
    imageUrl:any;
    locationLink: any;
    locationMovmntReason: any;
    VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    VHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    savebtn: boolean;
    movementDateRead: boolean;
    movementTimeRead: boolean;
    toAgyLocIdRead: boolean;
    movementReasonCodeRead: boolean;
    reportingDateRead: boolean;
    reportingTimeRead: boolean;
    clearbtn: boolean;
    constructor(private oidtrwjuFactory: OidtrwjuService, private offenderSearchService: OffenderSearchService,
        private osiosearFactory: OsiosearService,
        public translateService: TranslateService,
        private renderer: Renderer2, private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        // TODO initilize data members here..!
        // onGridReady(event){
        // }
    }
    ngOnInit() {
        this.disabled = true;
        this.clearbtn = true;
        this.savebtn = true;
        this.VHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.locationLink = 'oidtrwju/cgfkOffEmToAgyLocIdRecordGroup?agyLocId=' + this.sessionManager.currentCaseLoad;
        this.locationMovmntReason = 'oidtrwju/cgfkOffEmMovementReasonCoRecordGroup';



        // TODO all initializations here
        //  var serviceObj;
        // const cgfkOffemmovementreasoncoServiceObj = this.oidtrwjuFactory.cgfkOffemmovementreasoncoRecordGroup(this.offemModel);
        // cgfkOffemmovementreasoncoServiceObj.subscribe(cgfkOffemmovementreasoncoList => {
        //     if (cgfkOffemmovementreasoncoList.length === 0) {
        //         this.cgfkOffemmovementreasoncoRg = [];
        //     } else {
        //         for (let i = 0; i < cgfkOffemmovementreasoncoList.length; i++) {
        //             this.cgfkOffemmovementreasoncoRg.push({
        //                 'text': cgfkOffemmovementreasoncoList[i].code + " - " +
        //                     cgfkOffemmovementreasoncoList[i].description, 'id': cgfkOffemmovementreasoncoList[i].code
        //             });
        //         }
        //     }
        // });
        // const cgfkOffemtoagylocidServiceObj = this.oidtrwjuFactory.cgfkOffemtoagylocidRecordGroup(this.offemModel);
        // cgfkOffemtoagylocidServiceObj.subscribe(cgfkOffemtoagylocidList => {
        //     if (cgfkOffemtoagylocidList.length === 0) {
        //         this.cgfkOffemtoagylocidRg = [];
        //     } else {
        //         for (let i = 0; i < cgfkOffemtoagylocidList.length; i++) {
        //             this.cgfkOffemtoagylocidRg.push({
        //                 'text': cgfkOffemtoagylocidList[i].code + " - " +
        //                     cgfkOffemtoagylocidList[i].description, 'id': cgfkOffemtoagylocidList[i].code
        //             });
        //         }
        //     }
        // });
        if (!this.VHeaderBlockModel || this.VHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }

    }
    clickTime() {
        this.savebtn = false;
        this.clearbtn = false;
        if (!this.disabled) {
            if (this.VHeaderBlockModel.statusDisplay === 'Inactive' || this.VHeaderBlockModel.inOutStatus === 'Historic') {
                this.movementDateRead = true;
                this.savebtn = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidtrwju.cannottransferinactiveofndr');
                this.show();
                return;
            }
            this.offemModel.movementTime = DateFormat.getDate();
            this.offemModel.movementDate =  DateFormat.getDate(DateFormat.getDate().setHours(this.offemModel.movementTime.getHours(), this.offemModel.movementTime.getMinutes(), 0, 0));
        }
    }

    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    clear() {
        const clragyLocId = this.offemModel.toAgyLocId === undefined ? '' : undefined;
        const clrmvntReason = this.offemModel.movementReasonCode === undefined ? '' : undefined;
        this.offemModel = new OffenderExternalMovements();
        this.offemModel.toAgyLocId = clragyLocId;
        this.offemModel.movementReasonCode = clrmvntReason;
        //this.clickTime();
        this.offemModel.movementDate = undefined;
        this.offemModel.movementTime = undefined;
        this.clearbtn = true;
    }

    get saveDisable() {
        if (this.offemModel.movementDate || this.offemModel.movementTime || this.offemModel.toAgyLocId ||
            this.offemModel.movementReasonCode || this.offemModel.reportingDate || this.offemModel.reportingTime ||
            this.offemModel.commentText) {
            return false;
        } else {
            return true;
        }

    }

    onOffenderChange(offender) {
        if (offender) {
            this.VHeaderBlockModel = offender;
            this.imageUrl = this.VHeaderBlockModel.image;
            this.offemModelTemp = new OffenderExternalMovements();
            this.offemModelTemp.offenderBookId = this.VHeaderBlockModel.offenderBookId;
            this.offemModel = new OffenderExternalMovements();
            this.offemExecuteQuery();
            this.offemData = [];
            if (this.VHeaderBlockModel.activeFlag === 'N') {
            this.savebtn = true;
            this.disabled = true;
            } else {
                this.savebtn = true;
                this.disabled = false;
            }
        } else {
            this.offemModel = new OffenderExternalMovements();
            this.savebtn = true;
            this.disabled = true;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
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
    }
    save(date?) {
        if (date) {
            if (date.lastValue === '0_/__/____')  {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            }
        }
        if (!this.offemModel.movementDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidtrwju.datemustbeentered');
            this.show();
            return;
        }
        if (!this.offemModel.movementTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidtrwju.timemustbeentered');
            this.show();
            return;
        }
         if (!this.offemModel.toAgyLocId )  {
            this.type = 'warn';
            this.message = this.translateService.translate('oidtrwju.facilityentered');
            const facilityValue = this.translateService.translate('system-profile.inst-agency');
            this.message = String(this.message).replace('%location%', facilityValue);
            this.show();
            return;
         }
            if (!this.offemModel.movementReasonCode)  {
                this.type = 'warn';
                this.message = this.translateService.translate('oidtrwju.reasonentered');
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

                 if (DateFormat.compareDate(DateFormat.getDate(this.offemModel.movementDate),
                    DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === -1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidtrwju.dategreaterthanorlstmvmntdatetime');
                    this.show();
                    return;
                     }
                     if (DateFormat.compareTime(DateFormat.getDate(this.offemModel.movementTime),
                     DateFormat.getDate()) === 1) {
                     this.type = 'warn';
                     this.message = this.translateService.translate('oidtrwju.movementtimemaynotbefuturetime');
                     this.show();
                     return;
                      }
                if(this.offemModel.reportingDate){
                    if(!this.isDateChanged(this.offemModel.reportingDate)){
                        return;
                    }
                }
                if(this.offemModel.reportingTime){
                    if(!this.isTimeChanged()){
                        return;
                    }
                }
                      this.offemBean = new OffenderExternalMovements();
                      const movTime = DateFormat.getDate(this.offemModel.movementTime);
                      this.offemBean.movementDate = DateFormat.getDate(DateFormat.getDate(this.offemModel.movementDate).setHours(movTime.getHours(),movTime.getMinutes(),0,0));
                      this.offemBean.offenderBookId = this.VHeaderBlockModel.offenderBookId;
        const waitresult = this.oidtrwjuFactory.checkWaitListAndLocations(this.offemBean);
        waitresult.subscribe(waitcount => {
            if (waitcount > 0) {
                const dlgdata = {
                    label: this.translateService.translate('oidtrwju.activeprisonactivities'), yesBtn: true, noBtn: true,
                    yesLabel: 'Suspend', noLabel: 'End'
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgdata, 50).subscribe(result => {
                    if (result) {
                        const suspendResult = this.oidtrwjuFactory.suspendAllocations(this.offemBean);
                        suspendResult.subscribe(suspend => {
                           if (suspend === 1) {
                            this.oidtrwjuSaveoffemForm();
                           }
                        });
                    } else {
                        const endResult = this.oidtrwjuFactory.endWaitlistAndAllocations(this.offemBean);
                        endResult.subscribe(end => {
                           if (end === 1) {
                            this.oidtrwjuSaveoffemForm();
                           }
                        });
                    }
                });
            } else {
                this.oidtrwjuSaveoffemForm();
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidtrwjuSaveoffemForm() {
        this.offemInsertList = [];
        this.offemUpdatetList = [];
        this.offemCommitModel.insertList = [];
        this.offemCommitModel.updateList = [];
        this.offemCommitModel.deleteList = [];
        if (this.offemModelTemp.offenderBookId) {
            this.offemModelTemp.activeFlag = 'N';
            this.offemModelTemp.modifyDatetime = this.offemModel.modifyDatetime;
            //this.offemModelTemp.movementDate = DateFormat.getDate(this.offemModel.movementDate.setHours(12, 0, 0));
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
                this.disabled = true;
                if (this.offemModel) {
                    const VHeaderBlockModelBooking =  new VHeaderBlock();
                    VHeaderBlockModelBooking.statusDisplay = 'Inactive';
                    VHeaderBlockModelBooking.activeFlag = 'N';
                    VHeaderBlockModelBooking.statusReason = this.offemModel.movementReasonCode;
                    VHeaderBlockModelBooking.agyLocId = 'TRN';
                    VHeaderBlockModelBooking.inOutStatus = 'TRN';
                    VHeaderBlockModelBooking.livingUnitId = null;
                    VHeaderBlockModelBooking.offenderBookId = this.offemModel.offenderBookId;
                    const offData = this.oidtrwjuFactory.offBookingCommit(VHeaderBlockModelBooking);
                    offData.subscribe(offResult => {
                        if (offResult === 0) {
                        } else {
                            this.VHeaderBlockModelTemp = new VHeaderBlock();
                            this.VHeaderBlockModelTemp.offenderBookId = this.offemModelTemp.offenderBookId;
                            this.VHeaderBlockModelTemp.agyLocId = this.sessionManager.currentCaseLoad;
                            const offbkgsResult = this.osiosearFactory.offbkgGlobalQuery(this.VHeaderBlockModelTemp);
                            offbkgsResult.subscribe(offbkgsResultList => {
                                if (offbkgsResultList.length === 0) {
                                    this.offbkgsData = [];
                                    this.type = 'error';
                                    this.message = this.translateService.translate('common.querycaused');
                                    this.show();
                                    this.VHeaderBlockModel = undefined;
                                } else {
                                    this.offbkgsData = offbkgsResultList;
                                    this.offenderSearchService.selectedOffender = offbkgsResultList[0];
                                    this.offenderSearchService.imageSearch( offbkgsResultList[0].imageId );
                                    this.savebtn = true;
                                    this.disabled = true;
                                }
                            });
                            this.offemModel.movementDate = undefined;
                            this.offemModel.movementTime = undefined;
                            this.offemModel.toAgyLocId = undefined;
                            this.offemModel.movementReasonCode = undefined;
                            this.offemModel.commentText = undefined;
                            this.offemModel.reportingDate = undefined;
                            this.offemModel.reportingTime = undefined;
                            this.savebtn = true;
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
    isDateChanged(event){
        if (event) {
            if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) < 0) {
                this.type = 'warn';
                this.message = (this.translateService.translate('oidtrwju.reportingdatemustnotbepastdate'));
                this.show();
                return false;
            }
         }
         return true;
     }
     isTimeChanged(){
        if(this.offemModel.reportingTime){
            if(DateFormat.compareDate(DateFormat.getDate(this.offemModel.reportingDate), DateFormat.getDate()) === 0) {
                if (DateFormat.compareTime(this.offemModel.reportingTime, DateFormat.getDate()) < 0) {
                    this.type = 'warn';
                    this.message = (this.translateService.translate('oidtrwju.reportingdatemustnotbepastdate'));
                    this.show();
                    return false;
                }
           }
        }
        return true;    
    }
}
        // syspflExecuteQuery() {
        //  const syspflResult = this.oidtrwjuFactory.sysPflExecuteQuery(this.syspflModel);
        //  syspflResult.subscribe(data => {
        //      if (data.length === 0) {
        //          this.syspflData = [];
        //      } else {
        //          this.syspflData = data;
        //          this.syspflModel = data[0];
        //      }
        //  });
        // }

        // cg$ctrlOnErrorTrigger() {
        //  /* Trap errors returning from the server and report in a user
        //       friendly manner*/
        //  const errCode = errorCode;
        //  const errType = errorType;
        //  const serverErr = abs(dbmsErrorCode);
        //  const serverMsg = dbmsErrorText;
        //  const constraintName;
        //  const vAlertNo;

        //  if ((errType === 'frm' && errCode in (40506, 40508, 40509, 40510))) {
        //      /* Remove recursive errors from the top of the stack */
        //      while (server_err = 604) {
        //          //TODO cgte$pop_error_stack (server_err, server_msg);
        //      }
        //      //TODO
        //      /* Check and report the generic constraint violations */
        //      if ((cgte$checkConstraintVio(serverErr, serverMsg))) {
        //          throw new Error('form_trigger_failure');
        //      }
        //      //TODO
        //      /* Check and report the constraint violations specific to this
        //                              block */
        //      //TODO constraint_name = cgte$strip_constraint (server_msg);
        //  }
        //  //TODO
        //  //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
        //  switch () {
        //      case (err_type = 'frm' and err_code = 40202)
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//
        // patrick 20/09/2005.  use replace instead of substr and instr.//
          //   if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
         //     '*' character won't appear along with the prompt when mandatory value is not entered.
         // replace(replace(get_item_property(system.trigger_item, prompt_text),
          // '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
        //          throw new Error('form_trigger_failure');
        //      case (error_code = 40401 or-- no changes to save
            // error_code = 40405 or-- no changes to apply                error_code = 40352 or-- last record of the query retrieved
                //          error_code = 40100 )--at first record
        //          ;

        //      case (error_code = 41361 or-- cannot navigate out of the current form in enter
        // - query mode.error_code = 41351 or-- cannot navigate out of the current form.error_code =
        // 41047 or-- cannot navigate out of the current block in enter - query mode.error_code = 40109 )
        // --cannot navigate out of the current block in enter - query mode.
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
        //          throw new Error('form_trigger_failure');
        //  } else {
        //      if (!(serverErr >= 20000 && serverErr <= 20999)) {
        //          /* If error not found, issue default message */
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
        //      } else {
        //          //-- @@@ GJC 23/05/2006, Added generic lock resource error
        //          if (serverErr === 20951) {
        //              //TODO v_alert_no =
        //              //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
        //          } else {
        //              //TODO  this.showErrorForm();
        //          }
        //          //TODO
        //          throw new Error('form_trigger_failure');
        //      }
        //      //TODO
        //      //TODO  this.checkBlockErrors();
        //      //TODO
        //  }

        //  birthDateKeyListvalTrigger() {
        //      //TODO  this.displayCalendar();
        //  }

        //  offBkgOnErrorTrigger() {
        //      /* Trap errors returning from the server and report in a user
        //           friendly manner*/
        //      const errCode = errorCode;
        //      const errType = errorType;
        //      const serverErr = abs(dbmsErrorCode);
        //      const serverMsg = dbmsErrorText;
        //      const constraintName;
        //      const vAlertNo;
        //      //TODO
        //      if ((errType === 'frm' && errCode in (40506, 40508, 40509, 40510))) {
        //          /* Remove recursive errors from the top of the stack */
        //          while (server_err = 604) {
        //              //TODO cgte$pop_error_stack (server_err, server_msg);
        //          }
        //          //TODO
        //          /* Check and report the generic constraint violations */
        //          if ((cgte$checkConstraintVio(serverErr, serverMsg))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          /* Check and report the constraint violations specific to this
        //                                  block */
        //          //TODO constraint_name = cgte$strip_constraint (server_msg);
        //      }
        //      //TODO
        //      if ((errType === 'frm' && errCode === 40202)) {
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//
        //    if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
        //     '*' character won't appear along with the prompt when mandatory value is not
        //  entered.replace(substr(get_item_property(system.trigger_item, prompt_text), 1,
        //  instr(get_item_property(system.trigger_item, prompt_text), '*') - 1 )||
        // substr(error_text, 6), chr(10), ' '),null,null,null,null);
        //          throw new Error('form_trigger_failure');
        //      }
        //      //TODO
        //      //TODO  this.checkBlockErrors();
        //      //TODO
        //      if (insr(errorText, 'ora') === 0) {
        //          /* If error not found, issue default message */
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
        //      } else {
        //          //TODO
        //          //TODO  this.showErrorForm();
        //          //TODO
        //      }
        //      throw new Error('form_trigger_failure');
        //  }

        //  imageOnErrorTrigger() {
        //      /* Trap errors returning from the server and report in a user
        //           friendly manner*/
        //      const errCode = errorCode;
        //      const errType = errorType;
        //      const serverErr = abs(dbmsErrorCode);
        //      const serverMsg = dbmsErrorText;
        //      const constraintName;
        //      const vAlertNo;
        //      //TODO
        //      if ((errType === 'frm' && errCode in (40506, 40508, 40509, 40510))) {
        //          /* Remove recursive errors from the top of the stack */
        //          while (server_err = 604) {
        //              //TODO cgte$pop_error_stack (server_err, server_msg);
        //          }
        //          //TODO
        //          /* Check and report the generic constraint violations */
        //          if ((cgte$checkConstraintVio(serverErr, serverMsg))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          /* Check and report the constraint violations specific to this
        //                                  block */
        //          //TODO constraint_name = cgte$strip_constraint (server_msg);
        //      }
        //      //TODO
        //      if ((errType === 'frm' && errCode === 40202)) {
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorget_item_property(system.trigger_item, prompt_text)
        // ||substr(error_text, 6),null,null,null,null);
        //          throw new Error('form_trigger_failure');
        //      }
        //      //TODO
        //      //TODO  this.checkBlockErrors();
        //      //TODO
        //      if (instr(errorText, 'ora') === 0) {
        //          /* If error not found, issue default message */
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
        //      } else {
        //          //TODO
        //          //TODO  this.showErrorForm();
        //          //TODO
        //      }
        //      throw new Error('form_trigger_failure');
        //  }

        //  movementDateKeyListvalTrigger() {
        //      //TODO  this.displayCalendar();
        //  }

        //  movementDateWhenValidateItemTrigger() {
        //      /* CGCC$CHK_CONS_ON_VF */
        //      /* Validate item against appropriate check constraints */
        //      const lvAlert;
        //      if (offEmModel.movementDate <= trunc(sysdate)) {
        //          ;
        //      } else {
        //          //TODO
        //          //TODO lv_alert =
        //          //TODO this.displayTheAlert('cfg_error','error date must be less than or equal to current date.',null,null,null,null);
        //          //TODO
        //          throw new Error('form_trigger_failure');
        //      }
        //  }

        //  toAgyLocIdWhenValidateItemTrigger() {
        //      if (nameIn('offEmModel.toAgyLocId') = null) {
        //          //TODO copy(null,'off_em.dsp_description2');
        //      }
        //  }

        //  toAgyLocId2WhenButtonPressedTrigger() {
        //      /* CGLY$WHEN_BUTTON_PRESSED */
        //      /* Replicate default menu functionality */
        //      //TODO go_item('off_em.to_agy_loc_id');
        //      //TODO do_key('list_values');
        //  }

        //  movementReasonCodeWhenValidateItemTrigger() {
        //      if (nameIn('offEmModel.movementReasonCode') = null) {
        //          //TODO copy(null,'off_em.dsp_description');
        //      }
        //  }

        //  movementReasonCode2WhenButtonPressedTrigger() {
        //      /* CGLY$WHEN_BUTTON_PRESSED */
        //      /* Replicate default menu functionality */
        //      //TODO go_item('off_em.movement_reason_code');
        //      //TODO do_key('list_values');
        //  }

        //  reportingDateKeyListvalTrigger() {
        //      //TODO  this.displayCalendar();
        //  }

        //  offEmOnErrorTrigger() {
        //      /* Trap errors returning from the server and report in a user
        //           friendly manner*/
        //      const errCode = errorCode;
        //      const errType = errorType;
        //      const serverErr = abs(dbmsErrorCode);
        //      const serverMsg = dbmsErrorText;
        //      const constraintName;
        //      const vAlertNo;
        //      //TODO
        //      if ((errType === 'frm' && errCode in (40506, 40508, 40509, 40510))) {
        //          /* Remove recursive errors from the top of the stack */
        //          while (server_err = 604) {
        //              //TODO cgte$pop_error_stack (server_err, server_msg);
        //          }
        //          //TODO
        //          /* Check and report the generic constraint violations */
        //          if ((cgte$checkConstraintVio(serverErr, serverMsg))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          /* Check and report the constraint violations specific to this
        //                                  block */
        //          //TODO constraint_name = cgte$strip_constraint (server_msg);
        //      }
        //      //TODO
        //      if ((errType === 'frm' && errCode === 40202)) {
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
        //     patrick 20/09/2005.  use replace instead of substr and instr.
        //     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
        //     '*' character won't appear along with the prompt when mandatory value is not
        // entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||
        //  substr(error_text, 6), chr(10), ' '),null,null,null,null);
        //          //--
        //          //--Rajshree Added to check for the vlaidation before commit,inorder to requery .
        //          //--
        //          //TODO copy ( 'n', 'global.validation_done' );
        //          throw new Error('form_trigger_failure');
        //      } else {
        //          //TODO copy ( 'y', 'global.validation_done' );
        //      }
        //      //TODO
        //      //TODO  this.checkBlockErrors();
        //      //TODO
        //      if (instr(errorText, 'ora') === 0) {
        //          /* If error not found, issue default message */
        //          //TODO v_alert_no =
        //          //TODO this.displayTheAlertCfgErrorerr_type|| '-'|| to_char (err_code)|| ' '|| error_text,null,null,null,null);
        //      } else {
        //          //TODO
        //          //TODO  this.showErrorForm();
        //          //TODO
        //      }
        //      throw new Error('form_trigger_failure');
        //  }

        //  sysPflOnErrorTrigger() {
        //      /* Trap errors returning from the server and report in a user
        //           friendly manner*/
        //      const errCode = errorCode;
        //      const errType = errorType;
        //      const serverErr = abs(dbmsErrorCode);
        //      const serverMsg = dbmsErrorText;
        //      const constraintName;
        //      const vAlertNo;
        //      if ((errType === 'frm' && errCode in (40506, 40508, 40509, 40510))) {
        //          /* Remove recursive errors from the top of the stack */
        //          while (server_err = 604) {
        //              //TODO cgte$pop_error_stack (server_err, server_msg);
        //          }
        //          //TODO
        //          /* Check and report the generic constraint violations */
        //          if ((cgte$checkConstraintVio(serverErr, serverMsg))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          /* Check and report the constraint violations specific to this
        //                                  block */
        //          //TODO constraint_name = cgte$strip_constraint (server_msg);
        //      }
        //      //TODO
        //      //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
        //      switch () {
        //          case (err_type = 'frm' and err_code = 40202)
        //              //TODO v_alert_no =
        //              //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//
        //   patrick 20/09/2005.  use replace instead of substr and instr.//
        //   if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
        //     '*' character won't appear along with the prompt when mandatory
        //  value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')
        // ||substr(error_text, 6), chr(10), ' '),null,null,null,null);
        //              throw new Error('form_trigger_failure');
        //          case (error_code = 40401 or-- no changes to save
        //               error_code = 40405 or-- no changes to apply
        //            error_code = 40352 or-- last record of the query retrieved                error_code = 40100 )--at first record
        //              ;
        //          case (error_code = 41361 or-- cannot navigate out of the current form in enter - query mode.error_code
        // = 41351 or-- cannot navigate out of the current form.error_code =
        //  41047 or-- cannot navigate out of the current block in enter - query mode.error_code = 40109 )
        // --cannot navigate out of the current block in enter - query mode.
        //              //TODO v_alert_no =
        //              //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
        //              throw new Error('form_trigger_failure');
        //      } else {
        //          if (!(serverErr >= 20000 && serverErr <= 20999)) {
        //              /* If error not found, issue default message */
        //              //TODO v_alert_no =
        //              //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
        //          } else {
        //              //-- @@@ GJC 23/05/2006, Added generic lock resource error
        //              if (serverErr === 20951) {
        //                  //TODO v_alert_no =
        //                  //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',
        // null,null,null,null);
        //              } else {
        //                  //TODO  this.showErrorForm();
        //              }
        //              //TODO
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          //TODO  this.checkBlockErrors();
        //          //TODO
        //      }

        //      butOffendersWhenButtonPressedTrigger() {
        //          //TODO
        //      }

        //      butOffendersKeyNextItemTrigger() {
        //          //TODO
        //      }

        //      butOffendersKeyPrevItemTrigger() {
        //          //TODO
        //      }

        //      butWorksWhenButtonPressedTrigger() {
        //          //TODO
        //      }

        //      butWorksKeyNextItemTrigger() {
        //          //TODO
        //      }

        //      butWorksKeyPrevItemTrigger() {
        //          //TODO
        //      }

        //      butCalendarWhenButtonPressedTrigger() {
        //          //TODO
        //      }

        //      butCalendarKeyNextItemTrigger() {
        //          //TODO
        //      }

        //      butCalendarKeyPrevItemTrigger() {
        //          //TODO
        //      }

        //      butOffUpdatesWhenButtonPressedTrigger() {
        //          //TODO
        //      }

        //      butOffUpdatesKeyNextItemTrigger() {
        //          //TODO
        //      }

        //      butOffUpdatesKeyPrevItemTrigger() {
        //          //TODO
        //      }

        //      butDetailWhenButtonPressedTrigger() {
        //          //TODO
        //      }

        //      butDetailKeyNextItemTrigger() {
        //          //TODO
        //      }

        //      butDetailKeyPrevItemTrigger() {
        //          //TODO
        //      }

        //      mymenuOnErrorTrigger() {
        //          //TODO
        //      }

        //      oidtrwjuKeyMenuTrigger() {
        //          /* CGBS$TOGGLE_QUERY_MODE */
        //          /* This changes the mode of block synchronization so that if it is */
        //          /* currently ON, then it is changed to OFF, and vice-versa.        */
        //          /* It also queries the dependent blocks as appropriate for the     */
        //          /* new mode.                                                       */
        //          //TODO cgbs$toggle( global.cg$query_mode );
        //      }

        //      oidtrwjuIKillCreateTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyClrblkTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyClrblk1) {
        //              //TODO applib_kill_create_h.key_clrblk; // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyClrblk2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$KEY_CLRBLK_FRM */
        //          /* Perform checks prior to clearing block */
        //          if ((cgbs2$Model.isRecordDirty(systemModel.triggerBlock))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          if ((systemModel.blockStatus === 'changed' || cgbs2$Model.isCommitNeeded(systemModel.triggerBlock))) {
        //              //TODO  this.cgbs2$.doCommitDialogue();
        //          }
        //          //TODO clear_block( no_validate );
        //      }

        //      oidtrwjuKeyClrfrmTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyClrfrm1) {
        //              //TODO applib_kill_create_h.key_clrfrm; // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyClrfrm2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGGN$KEY_CLRFRM */
        //          /* Perform the key's standard functionality */
        //          //TODO  this.clearForm();
        //          if (systemModel.formStatus === 'changed') {
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO
        //          /* CGCF$PERFORM_STARTUP */
        //          /* Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
        //          /*   Generator                                                       */
        //          //TODO  this.cg$whenNewFormInstance();
        //      }

        //      oidtrwjuKeyClrrecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyClrrec1) {
        //              //TODO applib_kill_create_h.key_clrrec; // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyClrrec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyCrerecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyCrerec1) {
        //              //TODO applib_kill_create_h.key_crerec; // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyCrerec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyDuprecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyDuprec1) {
        //              //TODO applib_kill_create_h.key_duprec; // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyDuprec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyDupItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.keyDupItem1) {
        //              //TODO applib_kill_create_h.key_dup_item;   // application hook
        //          }
        //          if (!modlibKillCreateHModel.keyDupItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenClearBlockTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.whenClearBlock1) {
        //              //TODO applib_kill_create_h.when_clear_block;   // application hook
        //          }
        //          if (!modlibKillCreateHModel.whenClearBlock2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenCreateRecordTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.whenCreateRecord1) {
        //              //TODO applib_kill_create_h.when_create_record; // application hook
        //          }
        //          if (!modlibKillCreateHModel.whenCreateRecord2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenRemoveRecordTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibKillCreateHModel.whenRemoveRecord1) {
        //              //TODO applib_kill_create_h.when_remove_record; // application hook
        //          }
        //          if (!modlibKillCreateHModel.whenRemoveRecord2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI___itemTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyEditTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.keyEdit1) {
        //              //TODO applib_item_h.key_edit;  // application hook
        //          }
        //          if (!modlibItemHModel.keyEdit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyListvalTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modibItemHModel.keyListval1) {
        //              //TODO applib_item_h.key_listval;   // application hook
        //          }
        //          if (!modlibItemHModel.keyListval2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostChangeTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.postChange1) {
        //              //TODO applib_item_h.post_change;   // application hook
        //          }
        //          if (!modlibItemHModel.postChange2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenButtonPressedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenButtonPressed1) {
        //              //TODO applib_item_h.when_button_pressed;   // application hook
        //          }
        //          if (!modlibItemHModel.whenButtonPressed2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenCheckboxChangedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenCheckboxChanged1) {
        //              //TODO applib_item_h.when_checkbox_changed; // application hook
        //          }
        //          if (!modlibItemHModel.whenCheckboxChanged2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenCustomItemEventTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.wCustomItemEvent1) {
        //              //TODO applib_item_h.w_custom_item_event;   // application hook
        //          }
        //          if (!modlibItemHModel.wCustomItemEvent2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenImageActivatedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenImageActivated1) {
        //              //TODO applib_item_h.when_image_activated;  // application hook
        //          }
        //          if (!modlibItemHModel.whenImageActivated2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenImagePressedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenImagePressed1) {
        //              //TODO applib_item_h.when_image_pressed;    // application hook
        //          }
        //          if (!modlibItemHModel.whenImagePressed2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenListActivatedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenListActivated1) {
        //              //TODO applib_item_h.when_list_activated;   // application hook
        //          }
        //          if (!modlibItemHModel.whenListActivated2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenListChangedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenListChanged1) {
        //              //TODO applib_item_h.when_list_changed; // application hook
        //          }
        //          if (!modlibItemHModel.whenListChanged2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenRadioChangedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibItemHModel.whenRadioChanged1) {
        //              //TODO applib_item_h.when_radio_changed;    // application hook
        //          }
        //          if (!modlibItemHModel.whenRadioChanged2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI__mouseTrigger() {
        //          ;
        //      }

        //      oidtrwjuWhenMouseClickTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibMouseHModel.whenMouseClick1) {
        //              //TODO applib_mouse_h.when_mouse_click; // application hook
        //          }
        //          if (!modlibMouseHModel.whenMouseClick2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenMouseDoubleclickTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibMouseHModel.whenMouseDoubClick1) {
        //              //TODO applib_mouse_h.when_mouse_doub_click;    // application hook
        //          }
        //          if (!modlibMouseHModel.whenMouseDoubClick2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenMouseEnterTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibMouseHModel.whenMouseEnter1) {
        //              //TODO applib_mouse_h.when_mouse_enter; // application hook
        //          }
        //          if (!modlibMouseHModel.whenMouseEnter2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenMouseLeaveTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibMouseHModel.whenMouseLeave1) {
        //              //TODO applib_mouse_h.when_mouse_leave; // application hook
        //          }
        //          if (!modlibMouseHModel.whenMouseLeave2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI_navigateTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyDownTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyDown1) {
        //              //TODO applib_navigate_h.key_down;  // application hook
        //          }
        //          if (!modlibNavigateHModel.keyDown2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyExitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyExit1) {
        //              //TODO applib_navigate_h.key_exit;  // application hook
        //          }
        //          if (!modlibNavigateHModel.keyExit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          //-- new code from triggeradd --
        //          //--
        //          //-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
        //          //--     in application library to handle coordination of menu and forms
        //          //--
        //          //TODO  this.undoPostFormInit();
        //          //TODO
        //          //-- end new code --
        //      }

        //      oidtrwjuKeyNxtblkTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyNxtblk1) {
        //              //TODO applib_navigate_h.key_nxtblk;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyNxtblk2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyNxtkeyTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyNxtkey1) {
        //              //TODO applib_navigate_h.key_nxtkey;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyNxtkey2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$DISABLE_NXTKEY */
        //          /* Disable KEY-NXTKEY for the whole form */
        //          const lvAlert;
        //          //TODO lv_alert =
        //          //TODO this.displayTheAlert('cfg_error','error key not valid in this context',null,null,null,null);
        //          throw new Error('form_trigger_failure');
        //      }

        //      oidtrwjuKeyNxtrecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyNxtrec1) {
        //              //TODO applib_navigate_h.key_nxtrec;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyNxtrec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyNxtsetTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyNxtset1) {
        //              //TODO applib_navigate_h.key_nxtset;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyNxtset2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyNextItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyNextItem1) {
        //              //TODO applib_navigate_h.key_next_item; // application hook
        //          }
        //          if (!modlibNavigateHModel.keyNextItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyPrvblkTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyPrvblk1) {
        //              //TODO applib_navigate_h.key_prvblk;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyPrvblk2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyPrvrecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyPrvrec1) {
        //              //TODO applib_navigate_h.key_prvrec;    // application hook
        //          }
        //          if (!modlibNavigateHModel.keyPrvrec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyPrevItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modibNavigateHModel.keyPrevItem1) {
        //              //TODO applib_navigate_h.key_prev_item; // application hook
        //          }
        //          if (!modlibNavigateHModel.keyPrevItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyScrdownTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyScrdown1) {
        //              //TODO applib_navigate_h.key_scrdown;   // application hook
        //          }
        //          if (!modlibNavigateHModel.keyScrdown2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyScrupTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyScrdown1) {
        //              //TODO applib_navigate_h.key_scrup; // application hook
        //          }
        //          if (!modlibNavigateHModel.keyScrup2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyUpTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.keyUp1) {
        //              //TODO applib_navigate_h.key_scrup; // application hook
        //          }
        //          if (!modlibNavigateHModel.keyUp2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostBlockTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.postBlock1) {
        //              //TODO applib_navigate_h.post_block;    // application hook
        //          }
        //          if (!modlibNavigateHModel.postBlock2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostFormTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.postForm1) {
        //              //TODO applib_navigate_h.post_form; // application hook
        //          }
        //          if (!modlibNavigateHModel.postForm2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGPR$SAVE_CTX_ON_EXIT */
        //          /* This saves primary keys of current rows into globals upon leaving */
        //          /*   form                                                            */
        //          //TODO global.cg$off_em_offender_book_id = off_em.offender_book_id;
        //          //TODO global.cg$off_em_movement_seq = off_em.movement_seq;
        //      }

        //      oidtrwjuPostRecordTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.postRecord1) {
        //              //TODO applib_navigate_h.post_record;   // application hook
        //          }
        //          if (!modlibNavigateHModel.postRecord2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostTextItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.postTextItem1) {
        //              //TODO applib_navigate_h.post_text_item;    // application hook
        //          }
        //          if (!modlibNavigateHModel.postTextItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreBlockTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.preBlock1) {
        //              //TODO applib_navigate_h.pre_block; // application hook
        //          }
        //          if (!modlibNavigateHModel.preBlock2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreFormTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //-- set_window_property(FORMS_MDI_WINDOW,TITLE,
        //          //--      get_item_property('CG$CTRL.CG$AT',HINT_TEXT));
        //          if (modlibNavigateHModel.preForm1) {
        //              //TODO applib_navigate_h.pre_form;  // application hook
        //          }
        //          if (!modlibNavigateHModel.preForm2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreRecordTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.preRecord1) {
        //              //TODO applib_navigate_h.pre_record;    // application hook
        //          }
        //          if (!modlibNavigateHModel.preRecord2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreTextItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.preTextItem1) {
        //              //TODO applib_navigate_h.pre_text_item; // application hook
        //          }
        //          if (!modlibNavigateHModel.preTextItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenNewRecordInstanceTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.whenNewRecInstance1) {
        //              //TODO applib_navigate_h.when_new_rec_instance; // application hook
        //          }
        //          if (!modlibNavigateHModel.whenNewRecInstance2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          //--^_^ PETER 08-NOV-2000
        //          if (nameIn('systemModel.triggerBlock') === 'offBkg') {
        //              if (nameIn('offBkgModel.rootOffenderId') !== null) {
        //                  //TODO copy (name_in ('off_bkg.root_offender_id'), 'global.root_offender_id') ;
        //                  //TODO go_block ('image') ;
        //                  //TODO copy ('10', 'system.message_level') ;
        //                  //TODO execute_query ;
        //                  //TODO copy ('0', 'system.message_level') ;
        //                  //TODO go_block ('off_bkg') ;
        //              }
        //          }
        //      }

        //      oidtrwjuWhenNewFormInstanceTrigger() {
        //          //TODO  this.createFormGlobals();
        //          //TODO
        //          //TODO set_item_property('off_em.to_agy_loc_id', prompt_text, get_profile_value('label','inst_agency') || '*');
        //          //TODO
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.wNewFormInstance1) {
        //              //TODO applib_navigate_h.w_new_form_instance;   // application hook
        //          }
        //          if (!modlibNavigateHModel.wNewFormInstance2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGGNCALL_GENERATOR_CODE */
        //          /* Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
        //          /*   Generator                                                       */
        //          //TODO cgbs2$.set_coord_style( 'p' );
        //          //TODO cgbs2$.set_qry_on_entry( 'y' );
        //          //TODO  this.cg$whenNewFormInstance();
        //      }

        //      oidtrwjuWhenNewBlockInstanceTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.wNewBlockInstance1) {
        //              //TODO applib_navigate_h.w_new_block_instance;  // application hook
        //          }
        //          if (!modlibNavigateHModel.wNewBlockInstance2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGLY$MANAGE_CANVASES */
        //          /* Call procedure to ensure correct canvases are visible */
        //          //TODO
        //          //TODO
        //          /* CGBS$WHEN_NEW_BLOCK_INSTANCE */
        //          /* ensure the current canvas is correctly coordinated */
        //          //TODO cgbs$.new_block( system.cursor_block, global.cg$query_mode);
        //          //TODO
        //          //--^_^ PETER 08-NOV-2000
        //          if (nameIn('systemModel.triggerBlock') = 'image') {
        //              //TODO  this.nextBlock();
        //          }
        //      }

        //      oidtrwjuWhenNewItemInstanceTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibNavigateHModel.wNewItemInstance1) {
        //              //TODO applib_navigate_h.w_new_item_instance;   // application hook
        //          }
        //          if (!modlibNavigateHModel.wNewItemInstance2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI____queryTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyCqueryTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.keyCquery1) {
        //              //TODO applib_query_h.key_cquery;   // application hook
        //          }
        //          if (!modlibQueryHModel.keyCquery2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$KEY_CQUERY_FRM */
        //          /* Check if query is allowed to avoid unnecessary coordination */
        //          const lvAlert;
        //          if ((getBlockProperty(systemModel.triggerBlock, queryAllowed) === 'false')) {
        //              //TODO lv_alert =
        //              //TODO this.displayTheAlert('cfg_error','error query not allowed in this block',null,null,null,null);
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO cgbs$.do_keyqry( system.trigger_block, 'count_query', system.mode);
        //      }

        //      oidtrwjuKeyEntqryTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.keyEntqry1) {
        //              //TODO applib_query_h.key_entqry;   // application hook
        //          }
        //          if (!modlibQueryHModel.keyEntqry2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$KEY_ENTQRY_FRM */
        //          /* Check if query is allowed to avoid unnecessary coordination */
        //          const lvAlert;
        //          if ((getBlockProperty(systemModel.triggerBlock, queryAllowed) === 'false')) {
        //              //TODO lv_alert =
        //              //TODO this.displayTheAlert('cfg_error','error query not allowed in this block',null,null,null,null);
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO cgbs$.do_keyqry( system.trigger_block, 'enter_query', system.mode);
        //      }

        //      oidtrwjuKeyExeqryTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.keyExeqry1) {
        //              //TODO applib_query_h.key_exeqry;   // application hook
        //          }
        //          if (!modlibQueryHModel.keyExeqry2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$KEY_EXEQRY_FRM */
        //          /* Check if query is allowed to avoid unnecessary coordination */
        //          const lvAlert;
        //          if ((getBlockProperty(systemModel.triggerBlock, queryAllowed) === 'false')) {
        //              //TODO
        //              //TODO lv_alert =
        //              //TODO this.displayTheAlert('cfg_error','error query not allowed in this block',null,null,null,null);
        //              throw new Error('form_trigger_failure');
        //          }
        //          //TODO cgbs$.do_keyqry( system.trigger_block, 'execute_query', system.mode);
        //      }

        //      oidtrwjuOnCountTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.onCount1) {
        //              //TODO applib_query_h.on_count; // application hook
        //          }
        //          if (!modlibQueryHModel.onCount2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostQueryTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.postQuery1) {
        //              //TODO applib_query_h.post_query;   // application hook
        //          }
        //          if (!modlibQueryHModel.postQuery2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreQueryTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibQueryHModel.preQuery1) {
        //              //TODO applib_query_h.pre_query;    // application hook
        //          }
        //          if (!modlibQueryHModel.preQuery2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI__relationTrigger() {
        //          ;
        //      }

        //      oidtrwjuOnCheckDeleteMasterTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibRelationHModel.onCheckDelMaster1) {
        //              //TODO applib_relation_h.on_check_del_master;   // application hook
        //          }
        //          if (!modlibRelationHModel.onCheckDelMaster2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuOnClearDetailsTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibRelationHModel.onClearDetails1) {
        //              //TODO applib_relation_h.on_clear_details;  // application hook
        //          }
        //          if (!modlibRelationHModel.onClearDetails2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$ON_CLEAR_DETAILS */
        //          /* clear all detail blocks for the given master block */
        //          if ((formFailure && systemModel.coordinationOperation in ('mouse', 'duplicateRecord'))) {
        //              throw new Error('form_trigger_failure');
        //          }
        //          if ((systemModel.masterBlock === systemModel.triggerBlock)) {
        //              //TODO cgbs$.clear_master_detail( system.master_block,
        //              //TODO system.coordination_operation );
        //          }
        //          //TODO  this.end();
        //          //-- Begin default relation program section
        //          //--
        //          //TODO  this.clearAllMasterDetails();
        //          //--
        //          //-- End default relation program section
        //          //--
        //      }

        //      oidtrwjuOnPopulateDetailsTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modibRelationHModel.onPopulateDetails1) {
        //              //TODO applib_relation_h.on_populate_details;   // application hook
        //          }
        //          if (!modlibRelationHModel.onPopulateDetails2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGBS$ON_POPULATE_DETAILS */
        //          /* query all detail blocks for the given master block */
        //          //TODO cgbs$.query_details( system.cursor_block, global.cg$query_mode );
        //      }

        //      oidtrwjuITransactionalTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyCommitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.keyCommit1) {
        //              //TODO applib_transactional_h.key_commit;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.keyCommit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyUpdrecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.keyUpdrec1) {
        //              //TODO applib_transactional_h.key_updrec;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.keyUpdrec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyDelrecTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.keyDelrec1) {
        //              //TODO applib_transactional_h.key_delrec;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.keyDelrec2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuOnCommitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.onCommit1) {
        //              //TODO applib_transactional_h.on_commit;    // application hook
        //          }
        //          if (!modlibTransactionalHModel.onCommit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuOnInsertTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.onInsert1) {
        //              //TODO applib_transactional_h.on_insert;    // application hook
        //          }
        //          if (!modlibTransactionalHModel.onInsert2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuOnUpdateTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.onUpdate1) {
        //              //TODO applib_transactional_h.on_update;    // application hook
        //          }
        //          if (!modlibTransactionalHModel.onUpdate2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostDeleteTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.postDelete1) {
        //              //TODO applib_transactional_h.post_delete;  // application hook
        //          }
        //          if (!modlibTransactionalHModel.postDelete2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostInsertTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.postInsert1) {
        //              //TODO applib_transactional_h.post_insert;  // application hook
        //          }
        //          if (!modlibTransactionalHModel.postInsert2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostUpdateTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.postUpdate1) {
        //              //TODO applib_transactional_h.post_update;  // application hook
        //          }
        //          if (!modlibTransactionalHModel.postUpdate2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreCommitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.preCommit1) {
        //              //TODO applib_transactional_h.pre_commit;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.preCommit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreDeleteTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.preDelete1) {
        //              //TODO applib_transactional_h.pre_delete;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.preDelete2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreInsertTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.preInsert1) {
        //              //TODO applib_transactional_h.pre_insert;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.preInsert2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPreUpdateTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.preUpdate1) {
        //              //TODO applib_transactional_h.pre_update;   // application hook
        //          }
        //          if (!modlibTransactionalHModel.preUpdate2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostFormsCommitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.postFormsCommit1) {
        //              //TODO applib_transactional_h.post_forms_commit;    // application hook
        //          }
        //          if (!modlibTransactionalHModel.postFormsCommit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuPostDatabaseCommitTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibTransactionalHModel.postDatabaseCommit1) {
        //              //TODO applib_transactional_h.post_database_commit; // application hook
        //          }
        //          if (!modlibTransactionalHModel.postDatabaseCommit2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuIValidationTrigger() {
        //          ;
        //      }

        //      oidtrwjuOnErrorTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibValidationHModel.onError1) {
        //              //TODO applib_validation_h.on_error;    // application hook
        //          }
        //          if (!modlibValidationHModel.onError2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenValidateItemTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibValidationHModel.whenValidateItem1) {
        //              //TODO applib_validation_h.when_validate_item;  // application hook
        //          }
        //          if (!modlibValidationHModel.whenValidateItem2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenValidateRecordTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Application Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibValidationHModel.whenValidateRecord1) {
        //              //TODO applib_validation_h.when_validate_record;    // application hook
        //          }
        //          if (!modlibValidationHModel.whenValidateRecord2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI__variousTrigger() {
        //          ;
        //      }

        //      oidtrwjuKeyHelpTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibVariousHModel.keyHelp1) {
        //              //TODO applib_various_h.key_help;   // application hook
        //          }
        //          if (!modlibVariousHModel.keyHelp2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //          //TODO
        //          /* CGHP$CALL_HELP_FORM */
        //          /* Call the help system after setting globals with current block and */
        //          /*   item                                                            */
        //          ;
        //      }

        //      oidtrwjuOnMessageTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          if (modlibVariousHModel.onMessage1) {
        //              //TODO applib_various_h.on_message; // application hook
        //          }
        //          if (!modlibVariousHModel.onMessage2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuKeyPrintTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibVariousHModel.keyPrint1) {
        //              //TODO applib_various_h.key_print;  // application hook
        //          }
        //          if (!modlibVariousHModel.keyPrint2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenTimerExpiredTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          if (modlibVariousHModel.whenTimerExpired1) {
        //              //TODO applib_various_h.when_timer_expired; // application hook
        //          }
        //          if (!modlibVariousHModel.whenTimerExpired2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuI__windowTrigger() {
        //          ;
        //      }

        //      oidtrwjuWhenWindowActivatedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibWindowHModel.whenWindowActivated1) {
        //              //TODO applib_window_h.when_window_activated;   // application hook
        //          }
        //          if (!modlibWindowHModel.whenWindowActivated2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenWindowClosedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibWindowHModel.whenWindowClosed1) {
        //              //TODO applib_window_h.when_window_closed;  // application hook
        //          }
        //          if (!modlibWindowHModel.whenWindowClosed2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenWindowResizedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibWindowHModel.whenWindowResized1) {
        //              //TODO applib_window_h.when_window_resized; // application hook
        //          }
        //          if (!modlibWindowHModel.whenWindowResized2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuWhenWindowDeactivatedTrigger() {
        //          //-- ---------------------------------------------
        //          //--        Event Hooks
        //          //-- ---------------------------------------------
        //          //TODO
        //          if (modlibWindowHModel.wWindowDeactivated1) {
        //              //TODO applib_window_h.w_window_deactivated;    // application hook
        //          }
        //          if (!modlibWindowHModel.wWindowDeactivated2) {
        //              //TODO return;     // option to bypass designer/2000 code
        //          }
        //          //-- ---------------------------------------------
        //      }

        //      oidtrwjuTrigger56Trigger() {
        //          //TODO applib_navigate_h.pre_text_item; // application hook
        //      }

        //      oidtrwjuTrigger57Trigger() {
        //          //TODO applib_navigate_h.post_text_item;    // application hook
        //      }
        //  }



