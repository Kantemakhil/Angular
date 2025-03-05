import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidtrojuService } from '../service/oidtroju.service';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderExternalMovementsCommitBean } from '@commonbeans/OffenderExternalMovementsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
//  import required bean declarations

@Component({
    selector: 'app-oidtroju',
    templateUrl: './oidtroju.component.html'
})

export class OidtrojuComponent implements OnInit {
    //  Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offemData: OffenderExternalMovements[] = [];
    offemDataTemp: OffenderExternalMovements[] = [];
    offemModel: OffenderExternalMovements = new OffenderExternalMovements();
    offemModelTemp: OffenderExternalMovements = new OffenderExternalMovements();
    offemIndex = 0;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdatetList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    movementTime: any;
    minDate: Date;
    min: any;
    hrs: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offEmReadOnly = false;
    cgfkOffemtoprovstatcodeRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    exMovReadonly: boolean;
    exMovDateReadonly: boolean;
    temp: any;
    offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
    msglist: any[] = [];
    savebtn = true;
    checkFlag = true;
    toStateTitles = { code: 'To State:', description: 'Description' };
    clearbtn: boolean;
    constructor(private oidtrojuFactory: OidtrojuService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private oidreleaFactory: OidreleaService,
        private sessionManager: UserSessionManager,
        public osiosearFactory: OsiosearService) {
    }

    ngOnInit() {
        //  TODO all initializations here
        this.clearbtn = true;
        this.exMovReadonly = true;
        this.exMovDateReadonly = true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        const cgfkOffemtoprovstatcodeServiceObj = this.oidtrojuFactory.cgfkOffemtoprovstatcodeRecordGroup();
        cgfkOffemtoprovstatcodeServiceObj.subscribe(cgfkOffemtoprovstatcodeList => {
            if (cgfkOffemtoprovstatcodeList.length === 0) {
                this.cgfkOffemtoprovstatcodeRg = [];
            } else {
                for (let i = 0; i < cgfkOffemtoprovstatcodeList.length; i++) {
                    this.cgfkOffemtoprovstatcodeRg.push({
                        'id': cgfkOffemtoprovstatcodeList[i].dspDescription, 'description': cgfkOffemtoprovstatcodeList[i].code
                    });
                }
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    /**
     *  This function will be executed when we select a row in the SearchBlock.
     */
    onOffenderChange(event) {
        if (event) {
            this.vHeaderBlockModel = event;
            if (event.statusDisplay === 'Active') {
                this.checkFlag = true;
                this.exMovReadonly = false;
                this.exMovDateReadonly = false;
                this.offemModel = new OffenderExternalMovements();
                this.savebtn = true;
            } else {
                this.clearbtn = true;
                this.savebtn = true;
                this.exMovReadonly = true;
                this.exMovDateReadonly = true;
                this.offemModel = new OffenderExternalMovements();
            }
        }else{
            this.clearbtn = true;
            this.savebtn = true;
            this.exMovReadonly = true;
            this.exMovDateReadonly = true;
            this.offemModel = new OffenderExternalMovements();
        }
    }
    /*
     * this event is used to Display the Date,time and do the validations when click on Date/Time component of External Movement Block.
     */
    clickDateTime() {
        if (this.vHeaderBlockModel.statusDisplay === 'Active') {
            this.clearbtn = false;
        } else {
            this.clearbtn = true;
        }
        if (this.vHeaderBlockModel) {
            if (this.vHeaderBlockModel.statusDisplay === 'Active' && this.checkFlag) {
                this.checkFlag = false;
                this.offemModel.movementDate = DateFormat.getDate();
                this.offemModel.movementTime = DateFormat.getDate();
                // if (!this.offemModel.toProvStatCode) {
                //     this.offemModel.toProvStatCode = 'CA';
                // }
                this.savebtn = false;
            } else if (this.vHeaderBlockModel.statusDisplay === 'Active' &&
                ((DateFormat.compareDate(this.offemModel.movementDate, DateFormat.getDate())) === 1)) {
                this.exMovDateReadonly = false;
                this.exMovReadonly = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbemequaltocurrentdate');
                this.show();
                return;
            } else if (!this.offemModel.movementDate) {
                this.type = 'info';
                this.message = 'You cannot create records here';
                this.show();
                this.offemModel.movementDate = DateFormat.getDate();
                this.offemModel.movementTime = DateFormat.getDate();
            } else if (this.offemModel.movementDate && this.vHeaderBlockModel.statusDisplay === 'Active') {
                this.exMovReadonly = false;
            }
        }
    }
    /*
     * this event is used to Display the Date,time and do the validations when click on To  State component of External Movement Block.
     */
    toStateItemEvent() {
        if (this.vHeaderBlockModel.statusDisplay === 'Active') {
            this.clearbtn = false;
        } else {
            this.clearbtn = true;
        }
        if (this.vHeaderBlockModel) {
            if (this.vHeaderBlockModel.statusDisplay === 'Active' && this.checkFlag) {
                this.checkFlag = false;
                this.offemModel.movementDate = DateFormat.getDate();
                this.offemModel.movementTime = DateFormat.getDate();
                if (!this.offemModel.toProvStatCode) {
                    this.offemModel.toProvStatCode = 'CA';
                }
                this.savebtn = false;
            } else if (this.vHeaderBlockModel.statusDisplay === 'Active' &&
                ((DateFormat.compareDate(this.offemModel.movementDate, DateFormat.getDate())) === 1)) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbemequaltocurrentdate');
                this.show();
                return;
            } else if (!this.offemModel.movementDate) {
                this.type = 'info';
                this.message = 'You cannot create records here';
                this.show();
                this.offemModel.movementDate = DateFormat.getDate();
                this.offemModel.movementTime = DateFormat.getDate();
            }
        }
    }

    /*
     * this event is used to do the validations when we enter the value in Date/Time/ToState/Comment fields
     *  for Inactive Offender in External Movement Block.
     */
    onKeyPressEvent() {
        if ((!(this.vHeaderBlockModel.statusDisplay === 'Active')) && (this.offemModel.movementDate)) {
        } else {
            this.clearbtn = false;
        }
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }

    offemExecuteQuery() {
        const offemResult = this.oidtrojuFactory.
            offEmExecuteQuery(this.offemModel);
        offemResult.subscribe(offemResultList => {
            if (offemResultList.length === 0) {
                this.offemData = [];
            } else {
                this.offemData = offemResultList;
            }
        });
    }

    /**
     * this function is used to save the data in OffenderExternalmovements
     * and update the data in OffenderBookings table.
     * This function will be executed when commit event is
     * fired
     */
    oidtrojuSaveoffemForm(movementDate?) {
        if (movementDate) {
            if (movementDate.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(movementDate.lastValue).indexOf('_') >= 0 && movementDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdclogs.dateformate');
                this.show();
                return;
            }
        }
        if (!this.offemModel.movementDate) {
            //this.offemModel.movementDate = DateFormat.getDate();
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentereddate');
            this.show();
            return;
        }
        if (this.offemModel.movementDate) {
            if ((DateFormat.compareDate(this.offemModel.movementDate, DateFormat.getDate())) === 1) {
                this.offemModel.movementDate = DateFormat.getDate();
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbemequaltocurrentdate');
                this.show();
                return;
            }
        }
        if (!this.offemModel.movementTime) {
            //this.offemModel.movementTime = DateFormat.getDate();
            this.type = 'warn';
            this.message = this.translateService.translate('common.timemustbeentered');
            this.show();
            return;
        }
        if (!this.offemModel.toProvStatCode) {
           // this.offemModel.toProvStatCode = 'CA';
            this.type = 'warn';
            this.message = this.translateService.translate('oidtroju.tostatemustbeentered');
            this.show();
            return;
        }

        this.offemInsertList = [];
        this.offemCommitModel.insertList = [];
        this.offemCommitModel.updateList = [];
        this.offemCommitModel.deleteList = [];
        this.offemModelTemp = new OffenderExternalMovements();
        this.offemModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offemModelTemp.movementDate = DateFormat.getDate(this.offemModel.movementDate.setHours(this.offemModel.movementTime.getHours(),this.offemModel.movementTime.getMinutes(),0,0));
        this.offemModelTemp.movementTime = this.offemModel.movementTime;
        this.offemModelTemp.movementType = 'TRN';
        this.offemModelTemp.directionCode = 'OUT';
        this.offemModelTemp.activeFlag = 'Y';
        this.offemModelTemp.toProvStatCode = this.offemModel.toProvStatCode;
        this.offemModelTemp.toAgyLocId = 'OUT';
        this.offemModelTemp.commentText = this.offemModel.commentText;
        this.offemModelTemp.offIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        this.offemModelTemp.caseloadId = this.sessionManager.currentCaseLoad;
        this.offemModelTemp.createDatetime = DateFormat.getDate();
            if (this.vHeaderBlockModel.offenderId && this.vHeaderBlockModel.activeFlag) {
                this.offemModelTemp.fromAgyLocId = this.vHeaderBlockModel.agyLocId;
                if (!this.offemModelTemp.movementReasonCode) {
                    this.offemModelTemp.movementReasonCode = 'OJ';
                }
            } else {
                this.offemModelTemp.movementReasonCode = undefined;
                this.offemModelTemp.fromAgyLocId = undefined;
            }

        this.offemInsertList.push(this.offemModelTemp);
        //  values added to list
        this.offemCommitModel.insertList = this.offemInsertList;

        const offemSaveData = this.oidtrojuFactory.offEmCommit(this.offemCommitModel);
        offemSaveData.subscribe(data => {
            if (data  === 2) {
                this.offemModel.movementDate = DateFormat.getDate();
                this.type = 'warn';
                this.message = this.translateService.translate('oidtroju.offenderhasamovent');
                this.show();
                return;
            }
            if (data  === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.vHeaderBlockModelTemp = new VHeaderBlock();
                this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                const searchResult = this.osiosearFactory.
                    offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                searchResult.subscribe(vhbList => {
                    if (vhbList.length > 0) {
                        this.vHeaderBlockModel = vhbList[0];
                        this.offenderSearchService.selectedOffender = vhbList[0];
                    }
                });
                // this.vHeaderBlockModel.bookingEndDate = DateFormat.getDate();
                // this.vHeaderBlockModel.agyLocId = 'OUT';
                // this.vHeaderBlockModel.inOutStatus = 'OUT';
                // this.vHeaderBlockModel.activeFlag = 'N';
                // this.vHeaderBlockModel.bookingStatus = 'C';
                // const offData = this.oidreleaFactory.offBookingCommit(this.vHeaderBlockModel);
                // offData.subscribe(offResult => {
                //     if (offResult === 1) {
                //         this.exMovReadonly = true;
                //         this.exMovDateReadonly = true;
                //         this.vHeaderBlockModel.statusDisplay = 'In Active';
                //         this.vHeaderBlockModel.movementReason = undefined;
                //         this.vHeaderBlockModel.status1 = 'OUT';
                //         this.vHeaderBlockModel.prisonLocation = 'Outside';
                //         this.savebtn = true;
                //         this.type = 'info';
                //         this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                //         this.show();
                //     } else {
                //         this.type = 'warn';
                //         this.message = this.translateService.translate('common.common.addupdateremoverecordfailed');
                //         this.show();
                //     }
                // });
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.oidtrojuFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    clearbtnDisable() {
        if (this.offemModel.toProvStatCode || this.offemModel.commentText) {
                return false;
        } else {
            return true;
        }
    }

    dateChange(){
        this.clearbtn = false;
        if (this.offemModel.movementDate && (DateFormat.compareDate(this.offemModel.movementDate, DateFormat.getDate())) === 1) {
            this.offemModel.movementDate = DateFormat.getDate();
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbemequaltocurrentdate');
            this.show();
            return;
        }
        else if(this.offemModel.movementDate){
            const data={movementDate: this.offemModel.movementDate,offenderBookId:this.vHeaderBlockModel.offenderBookId}
            this.oidtrojuFactory.checkMovementDate(data).subscribe(data=>{
                if(data && data == 1){
                    this.offemModel.movementDate = DateFormat.getDate();
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidtroju.offenderhasamovent');
                    this.show();
                    return;
                }

            });
        }
    }

    clear() {
     this.clearbtn = true;
     const toProvStatCode = this.offemModel.toProvStatCode === undefined ? '' : undefined;
     this.offemModel = new OffenderExternalMovements();
     this.offemModel.toProvStatCode = '';
     this.offemModel.movementTime = DateFormat.getDate();;
     this.offemModel.movementDate = DateFormat.getDate();;
     this.offemModel.commentText = '';
    }
}
