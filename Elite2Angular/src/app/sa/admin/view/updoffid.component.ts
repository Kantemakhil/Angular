import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UpdoffidService } from '../service/updoffid.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-updoffid',
    templateUrl: './updoffid.component.html',
})

export class UpdoffidComponent implements OnInit {
    msgs: any[] = [];
    updReadOnly = false;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    oldOffenderId: string;
    newOffenderId: string;
    msglist = [];
    type = 'error';
    message = ' Invalid.';
    btnDisable: boolean;
    constructor(private updoffidFactory: UpdoffidService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
        public dialogService: DialogService) {
    }
    ngOnInit() {
        this.btnDisable = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    allowNumbers() {
        this.newOffenderId = this.newOffenderId.replace(/[^0-9]*/g, '');
    }
    onUpdButtonclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.offenderIdDisplay) {
                this.oldOffenderId = this.vHeaderBlockModel.offenderIdDisplay;
                this.btnDisable = false;
            }
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.oldOffenderId = undefined;
            this.newOffenderId = undefined;
            this.btnDisable = true;
        }
    }
    updateOffenderId() {
        if (!this.newOffenderId) {
            this.type = 'warn';
            this.message = this.translateService.translate('updoffid.pleaseenternewidfirst');
            this.show();
            return;
        }
        this.btnDisable = true;
        const results = this.updoffidFactory.checkOffenderIdDisplay(this.newOffenderId);
        results.subscribe(data => {
            if (data === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('updoffid.uniqueidentifier').replace('%offenderId%', this.newOffenderId);
                this.show();
                this.btnDisable = false;
                return;
            } else if (data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.btnDisable = false;
                return;
            } else {
                const dlgdata = {
                    label: this.translateService.translate('updoffid.areyousureyouwanttochangethisoldOffenderid').replace('%oldOffenderId%',
                    this.oldOffenderId), yesBtn: true, noBtn: true, cancelBtn: false 
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgdata, 50).subscribe(result => {
                    if (result) {
                        this.vHeaderBlockModel.nbtAssignReason = this.newOffenderId;
                        this.vHeaderBlockModel.createDatetime = DateFormat.getDate();
                        this.vHeaderBlockModel.createuserId = this.sessionManager.getId();
                        this.vHeaderBlockModel.caseLoadId = this.sessionManager.currentCaseLoadType;
                        const resultValue = this.updoffidFactory.updateOffIdDisplay(this.vHeaderBlockModel);
                        resultValue.subscribe(returnValue => {
                            if (returnValue === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('updoffid.successfulupdatecomplete');
                                this.show();
                                this.vHeaderBlockModel.offenderIdDisplay = this.newOffenderId;
                                this.onOffenderChange(this.vHeaderBlockModel);
                                this.newOffenderId = '';
                            } else if (returnValue === 2) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                return;
                            }
                        });
                    } else {
                        this.newOffenderId = undefined;
                        this.btnDisable = false;
                        return false;
                    }
                    this.btnDisable = false;
                });
            }
        });
    }
}
