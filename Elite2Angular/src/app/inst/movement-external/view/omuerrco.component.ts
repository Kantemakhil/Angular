import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmuerrcoService } from '@inst/movement-external/service/omuerrco.service';
import { OidescapService } from '@inst/movement-external/service/oidescap.service';
import { OffenderEscapes } from '@instmovementexternalbeans/OffenderEscapes';
import { OffenderEscapesCommitBean } from '@instmovementexternalbeans/OffenderEscapesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
// import required bean declarations

@Component({
    selector: 'app-omuerrco',
    templateUrl: './omuerrco.component.html'
})

export class OmuerrcoComponent implements OnInit, OnDestroy {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offescData: OffenderEscapes[] = [];
    offescDataTemp: OffenderEscapes[] = [];
    offescModel: OffenderEscapes = new OffenderEscapes();
    offescIndex = 0;
    offescInsertList: OffenderEscapes[] = [];
    offescUpdateList: OffenderEscapes[] = [];
    offescDeleteList: OffenderEscapes[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    offRelDetailsReadOnly = false;
    queryCtrlReadOnly = false;
    batchAddReadOnly = false;
    offAllSchReadOnly = false;
    cancelReadOnly = false;
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    sysPflReadOnly = false;
    movementReadOnly = false;
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    offSchedulesReadOnly = false;
    agyAdrReadOnly = false;
    agyPhonesReadOnly = false;
    busAdrReadOnly = false;
    busPhonesReadOnly = false;
    othAdrReadOnly = false;
    othPhonesReadOnly = false;
    offSwlReadOnly = false;
    titleBlockReadOnly = false;
    crtEventsReadOnly = false;
    offEmReadOnly = false;
    btnCtrl1ReadOnly = false;
    mymenuReadOnly = false;
    offEm1ReadOnly = false;
    btnCtrl2ReadOnly = false;
    cntrlBlkReadOnly = false;
    vOffenderAllSchedulesReadOnly = false;
    vTwlReadOnly = false;
    offSchReadOnly = false;
    offEscReadOnly = false;
    cgfkOffescsecuritybreachcRg: any[] = [];
    cgfkOffescarrestagycodeRg: any[] = [];
    offescCommitModel: OffenderEscapesCommitBean = new OffenderEscapesCommitBean();
    verifyFlag = false;
    securityBreachFlag = false;
    arrestAgyFlag = false;
    recordCompletionFlag = false;
    securityTitle = { code: '[Security Level Breached:]', description: 'Description' };
    arrestTitle = { code: 'Recaptured By   :', description: 'Description' };
    constructor(private omuerrcoFactory: OmuerrcoService, public translateService: TranslateService,
        private oidescapFactory: OidescapService, public dialogService: DialogService, private router: Router,
        private sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
    }
    ngOnInit() {
        // TODO all initializations here
        const cgfkOffescsecuritybreachcServiceObj = this.omuerrcoFactory.cgfkOffEscSecurityBreachCRecordGroup();
        cgfkOffescsecuritybreachcServiceObj.subscribe(cgfkOffescsecuritybreachcList => {
            if (cgfkOffescsecuritybreachcList.length === 0) {
                this.cgfkOffescsecuritybreachcRg = [];
            } else {
                for (let i = 0; i < cgfkOffescsecuritybreachcList.length; i++) {
                    this.cgfkOffescsecuritybreachcRg.push({
                        'text':
                        cgfkOffescsecuritybreachcList[i].description, 'id': cgfkOffescsecuritybreachcList[i].code
                    });
                }
            }
        });
        const cgfkOffescarrestagycodeServiceObj = this.omuerrcoFactory.cgfkOffEscArrestAgyCodeRecordGroup();
        cgfkOffescarrestagycodeServiceObj.subscribe(cgfkOffescarrestagycodeList => {
            if (cgfkOffescarrestagycodeList.length === 0) {
                this.cgfkOffescarrestagycodeRg = [];
            } else {
                for (let i = 0; i < cgfkOffescarrestagycodeList.length; i++) {
                    this.cgfkOffescarrestagycodeRg.push({
                        'text':
                        cgfkOffescarrestagycodeList[i].description, 'id': cgfkOffescarrestagycodeList[i].code
                    });
                }
            }
        });
        if (this.omuerrcoFactory.data) {
            this.offescModel = this.omuerrcoFactory.data;

            if (this.omuerrcoFactory.data.securityBreachCode) {
                this.offescModel.securityBreachCode = this.omuerrcoFactory.data.securityBreachCode;
            } else {
                this.securityBreachFlag = true;
            }
            if (this.omuerrcoFactory.data.arrestAgyCode) {
                this.offescModel.arrestAgyCode = this.omuerrcoFactory.data.arrestAgyCode;
            } else {
                this.arrestAgyFlag = true;
            }
            if (this.omuerrcoFactory.data.recaptureDate) {
                this.offescModel.recaptureDate = this.omuerrcoFactory.data.recaptureDate;
            }
            if (this.omuerrcoFactory.data.recpatureTime) {
                this.offescModel.recpatureTime = this.omuerrcoFactory.data.recpatureTime;
            }
            this.omuerrcoFactory.data = undefined;
        }
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

     /*
     *  This event is used to set the security value in Escape/Recapture Block.
     */
     onSecurityChange() {
         this.offescModel.securityBreachCode = this.offescModel.securityBreachCode === undefined ? '' : undefined;
     }
     /*
      *  This event is used to set the arrest value in Escape/Recapture Block.
      */
     onArrestChange() {
         this.offescModel.arrestAgyCode = this.offescModel.arrestAgyCode === undefined ? '' : undefined;
     }
    offescExecuteQuery() {
        const offescResult = this.omuerrcoFactory.offEscExecuteQuery(this.offescModel);
        offescResult.subscribe(offescResultList => {
            if (offescResultList.length === 0) {
                this.offescData = [];
            } else {
                this.offescData = offescResultList;
                this.offescModel = offescResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    omuerrcoSaveoffescForm(event?) {
        // TODO declare commit bean and add insert list to that object.
        this.offescInsertList = [];
        this.offescUpdateList = [];
        this.offescDeleteList = [];
        this.offescCommitModel.insertList = [];
        this.offescCommitModel.updateList = [];
        this.offescCommitModel.deleteList = [];

        if (!this.offescModel.escapeId) {
            this.offescInsertList.push(this.offescModel);
        } else {
            this.offescUpdateList.push(this.offescModel);
        }

        if (this.offescInsertList.length > 0) {
            for (let i = 0; i < this.offescInsertList.length; i++) {
                if (event) {
                    if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                        this.show(this.translateService.translate('omuerrco.datemustbeentervalidformat'), 'warn');
                        return;
                    }
                }

                if (this.offescInsertList[i].recaptureDate) {
                    this.offescInsertList[i].recaptureDate = DateFormat.getDate(this.offescInsertList[i].recaptureDate);
                    if (DateFormat.compareDate(this.offescInsertList[i].recaptureDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('omuerrco.recaptureddatevalidation'), 'warn');
                        return false;
                    }
                    this.offescInsertList[i].escapeDate = DateFormat.getDate(this.offescInsertList[i].escapeDate);
                    if (DateFormat.compareDate(this.offescInsertList[i].recaptureDate, this.offescInsertList[i].escapeDate) < 1) {
                        this.show(this.translateService.translate('omuerrco.recadatelessthanescapedate'), 'info');
                        return false;
                    }
                    if (this.offescInsertList[i].recpatureTime) {
                        if (DateFormat.compareDate(this.offescInsertList[i].recaptureDate, DateFormat.getDate()) === 0) {
                            if (DateFormat.compareTime(this.offescInsertList[i].recpatureTime, DateFormat.getDate()) === 1) {
                                this.show(this.translateService.translate('omuerrco.recaptureddateandtime'), 'error');
                                return false;
                            }
                            if (DateFormat.compareDate(this.offescInsertList[i].recaptureDate, this.offescInsertList[i].escapeDate) === 0) {
                                if (DateFormat.compareTime(this.offescInsertList[i].recpatureTime,
                                             this.offescInsertList[i].escapeTime) < 0) {
                                    this.show(this.translateService.translate('omuerrco.recadatelessthanescapedate'), 'error');
                                    return false;
                                }
                            }
                        }
                    }

                    if (this.offescInsertList[i].createUserId === undefined) {
                        this.offescInsertList[i].createUserId = this.sessionManager.getId();
                    }

                    this.offescInsertList[i].modifyUserId = this.sessionManager.getId();

                }
                if (this.offescInsertList[i].recaptureDate) {
                    this.offescInsertList[i].recpatureTime = TimeFormat.parse(TimeFormat.format(this.offescInsertList[i].recpatureTime),
                        this.offescInsertList[i].recaptureDate);
                }
            }
        }
        if (this.offescUpdateList.length > 0) {
            if (event) {
                if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                    this.show(this.translateService.translate('omuerrco.datemustbeentervalidformat'), 'warn');
                    return;
                }
            }
            for (let i = 0; i < this.offescUpdateList.length; i++) {

                if (this.offescUpdateList[i].recaptureDate) {
                    this.offescUpdateList[i].recaptureDate = DateFormat.getDate(this.offescUpdateList[i].recaptureDate);
                    if (DateFormat.compareDate(this.offescUpdateList[i].recaptureDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('omuerrco.recaptureddatevalidation'), 'warn');
                        return false;
                    }
                    this.offescUpdateList[i].escapeDate = DateFormat.getDate(this.offescUpdateList[i].escapeDate);
                    if (DateFormat.compareDate(this.offescUpdateList[i].recaptureDate, this.offescUpdateList[i].escapeDate) < 0) {
                        this.show(this.translateService.translate('omuerrco.recadatelessthanescapedate'), 'info');
                        return false;
                    }
                    if (this.offescUpdateList[i].recpatureTime) {
                        if (DateFormat.compareDate(this.offescUpdateList[i].recaptureDate, DateFormat.getDate()) === 0) {
                            if (DateFormat.compareTime(this.offescUpdateList[i].recpatureTime, DateFormat.getDate()) === 1) {
                                this.show(this.translateService.translate('omuerrco.recaptureddateandtime'), 'error');
                                return false;
                            }
                        }
                        if (DateFormat.compareDate(this.offescUpdateList[i].recaptureDate, this.offescUpdateList[i].escapeDate) === 0) {
                            if (DateFormat.compareTime(this.offescUpdateList[i].recpatureTime, this.offescUpdateList[i].escapeTime) < 0) {
                                this.show(this.translateService.translate('omuerrco.recadatelessthanescapedate'), 'error');
                                return false;
                            }
                        }
                    }
                }

                if (this.offescUpdateList[i].recaptureDate) {
                    this.offescUpdateList[i].recpatureTime = TimeFormat.parse(TimeFormat.format(this.offescUpdateList[i].recpatureTime),
                        this.offescUpdateList[i].recaptureDate);
                }

                if (this.offescUpdateList[i].createUserId === undefined) {
                    this.offescUpdateList[i].createUserId = this.sessionManager.getId();
                }
                this.offescUpdateList[i].modifyUserId = this.sessionManager.getId();

            }
        }
        this.offescCommitModel.insertList = this.offescInsertList;
        this.offescCommitModel.updateList = this.offescUpdateList;

        const offescSaveData = this.omuerrcoFactory.offEscCommit(this.offescCommitModel);
        offescSaveData.subscribe(data => {
            if (data === 1) {
                if (this.recordCompletionFlag) {
                    const dataConfirm = {
                        label: this.translateService.translate('common.addupdateremoverecordsuccess'), yesBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidstwjudelnotifipopup', dataConfirm, 30).subscribe(result => {
                        if (result) {
                            this.verifyFlag = false;
                            this.recordCompletionFlag = false;
                            this.oidescapFactory.data = this.offescModel;
                            this.omuerrcoFactory.data = undefined;
                            this.router.navigate(['/OIDESCAP']);
                        }
                    });
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.verifyFlag = false;
                    this.recordCompletionFlag = false;
                }
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.recordCompletionFlag = false;
                this.verifyFlag = false;
            }
        });
    }

    isDateChanged(event) {
        if (event) {
            if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                this.show(this.translateService.translate('omuerrco.datemustbeentervalidformat'), 'warn');
                this.verifyFlag = false;
                return;
            }
            if (DateFormat.getDate(this.offescModel.recaptureDate) > DateFormat.getDate()) {
                this.show(this.translateService.translate('omuerrco.recaptureddatevalidation'), 'warn');
                this.verifyFlag = false;
                return;
            }
            this.verifyFlag = true;
        }
    }
    isTimeChanged() {
        this.verifyFlag = true;
    }

    securityBreachCodeWhenValidateItemTrigger() {
        if (this.offescModel.securityBreachCode || this.offescModel.securityBreachCode === undefined) {
            if (this.securityBreachFlag) {
                this.verifyFlag = true;
            } else {
                this.securityBreachFlag = true;
            }

        }

    }

    arrestAgyCodeWhenValidateItemTrigger() {

        if (this.offescModel.arrestAgyCode || this.offescModel.arrestAgyCode === undefined) {
            if (this.arrestAgyFlag) {
                this.verifyFlag = true;
            } else {
                this.arrestAgyFlag = true;
            }

        }
    }
    onExitOmuerrco(event?) {
        if (this.verifyFlag) {
            const data = {
                label: this.translateService.translate('oidstwju.savethechanges'), yesBtn: true, noBtn: true, canBtn: true
            };
            this.dialogService.openLinkDialog('/omuerrcoconfirmationpopup', data, 50).subscribe(result => {
                if (result) {
                    this.recordCompletionFlag = true;
                    this.omuerrcoSaveoffescForm(event);
                } else {
                    if (result !== null) {
                        this.router.navigate(['/OIDESCAP']);
                    }
                }

            });
        } else {
            this.router.navigate(['/OIDESCAP']);
        }
    }
    onSecBlur() {
        if (!this.offescModel.securityBreachCode) {
            this.offescModel.securityBreachCode = this.offescModel.securityBreachCode === '' ? undefined : '';
        }
    }
    onRecBlur() {
        if (!this.offescModel.arrestAgyCode) {
            this.offescModel.arrestAgyCode = this.offescModel.arrestAgyCode === '' ? undefined : '';
        }
    }
    saveFlag() {
        if (this.offescModel.securityBreachCode || this.offescModel.arrestAgyCode ||
            this.offescModel.recaptureDate || this.offescModel.recpatureTime) {
            return false;
        } else {
            return true;
        }
    }
    ngOnDestroy(): void {
        this.oidescapFactory.data = this.offescModel;
        this.omuerrcoFactory.data = undefined;
    }
}
