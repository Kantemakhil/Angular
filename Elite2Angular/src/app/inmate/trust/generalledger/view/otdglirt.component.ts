import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdglirtService } from '../service/otdglirt.service';
import { SystemProfiles } from '@instdemographicsbeans/SystemProfiles';
import { GlTransactions } from '@inmate/trust/trustaccounts/beans/GlTransactions';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-otdglirt',
    templateUrl: './otdglirt.component.html'
})

export class OtdglirtComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    gltxnData: GlTransactions[] = [];
    gltxnDataTemp: GlTransactions[] = [];
    gltxnModel: GlTransactions = new GlTransactions();
    gltxnModelTemp: GlTransactions = new GlTransactions();
    gltxnIndex: number;
    gltxnInsertList: GlTransactions[] = [];
    gltxnUpdatetList: GlTransactions[] = [];
    gltxnDeleteList: GlTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    glTxn2ColumnDef: any[];
    offDrColumnDef: any[];
    offDedColumnDef: any[];
    omsModulesColumnDef: any[];
    glTxnColumnDef: any[];
    offBncColumnDef: any[];
    offDedReadOnly: boolean;
    offBncReadOnly: boolean;
    offDrReadOnly: boolean;
    sysPflReadOnly: boolean;
    offDed1ReadOnly: boolean;
    cg$ctrlReadOnly: boolean;
    omsModulesReadOnly: boolean;
    glTxnReadOnly: boolean;
    glTxn1ReadOnly: boolean;
    glTxn2ReadOnly: boolean;
    glTxn3ReadOnly: boolean;
    cgfkGltxn3reversalreasonRg: any[] = [];
    nbtOffenderId: any;
    nbtAccountCode: any;
    nbtAccountCode2: any;
    txnEntryDesc: any;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    tableIndex = -1;
    desciptionTemp: string;
    namesReadOnly: boolean;
    nextReadOnly: boolean;
    retriveDisable: boolean;
    clearDisable: boolean;
    txnReversedFlag: String;
    buttonTextValidate: number;
    infoNumber: any;
    receiptNumber: any;
    nextBtnDisable: boolean;
    constructor(private otdglirtFactory: OtdglirtService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        this.glTxn2ColumnDef = [];
        this.offDrColumnDef = [];
        this.offDedColumnDef = [];
        this.omsModulesColumnDef = [];
        this.glTxnColumnDef = [];
        this.offBncColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.nextReadOnly = true;
        this.namesReadOnly = false;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.nextBtnDisable = true;
        this.glTxnColumnDef = [
            { fieldName: this.translateService.translate('otdglirt.r'), field: 'txnReversedFlagOne', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('otdglirt.transdate'), field: 'txnEntryDate',
                datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.transdatetime'), field: 'txnEntryTime',
                datatype: 'time', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.glno'), field: 'txnId',
                datatype: 'number', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.sq'), field: 'txnEntrySeq',
                datatype: 'number', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.dr'), field: 'accountCodeTwo',
                datatype: 'number', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.cr'), field: 'accountCodeOne',
                datatype: 'number', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otdglirt.docket'), field: 'infoNumber',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.receipt'), field: 'receiptNumber',
                datatype: 'text', editable: false, width: 150
            },
        ];
        //this.gltxnExecuteQuery();
    }
    onRowClickgltxn(event) {
        if (event) {
            this.nextBtnDisable = false;
            this.gltxnModelTemp = event;
            this.gltxnModelTemp.offenderBookId = event.offenderBookId;
            if (this.gltxnModelTemp.txnId && this.gltxnModelTemp.txnEntrySeq) {
                this.buttonTextValidate = null;
                this.gltxnModelTemp.nextButton = 'N';
                this.onButNextPageclick();
            }
        } else {
            this.nextBtnDisable = true;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    setTxnReversedFalg = () => {
        if (this.buttonTextValidate === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.thistransactioninvolves');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 2) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.thisiscash');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 3) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.reversalofhold');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 4) {
            const data = {
                label: this.translateService.translate('otdglirt.theoffenderclosed'),
                yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.gltxnModelTemp.nextButton = 'Y';
                    this.onButNextPageclick();
                } else {
                    this.gltxnModelTemp.nextButton = 'N';
                }
            });
        } else if (this.buttonTextValidate === 5) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.nodatafoundinoffenderdeductions');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 6) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.theamountpaid');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 7) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.cannotreverseahold');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 8) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.transactionisalreadyreversed');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 9) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.thegltransaction');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 10) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.cannotreverseacheque');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 11) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.cannotreverseacheque');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 12) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.youarereversing');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 13) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.cannotreverseacleared');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 14) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.offendertrustaccountisclosed');
            this.show();
            return false;
        } else if (this.buttonTextValidate === 15) {
            this.type = 'warn';
            this.message = this.translateService.translate('otdglirt.cannotreverseawithholding');
            this.message = String(this.message).replace('%txnType%', this.gltxnModelTemp.txnType);
            this.message = String(this.message).replace('%infoNumber%', this.gltxnModelTemp.infoNumber);
            this.show();
            return false;
        } else if (this.buttonTextValidate === 16) {
            return true;
        }
    }

    allowNumbers(event) {
    }
    onButNextPageclick() {
        if (this.gltxnModelTemp.txnEntryDate) {
            const whenNextbutton = this.otdglirtFactory.whenNextbuttonClick(this.gltxnModelTemp);
            whenNextbutton.subscribe(buttonNext => {
                if (buttonNext === 1) {
                    this.buttonTextValidate = 1;
                } else if (buttonNext === 2) {
                    this.buttonTextValidate = 2;
                } else if (buttonNext === 3) {
                    this.buttonTextValidate = 3;
                } else if (buttonNext === 4) {
                    this.buttonTextValidate = 4;
                } else if (buttonNext === 5) {
                    this.buttonTextValidate = 5;
                } else if (buttonNext === 6) {
                    this.buttonTextValidate = 6;
                } else if (buttonNext === 7) {
                    this.buttonTextValidate = 7;
                } else if (buttonNext === 8) {
                    this.buttonTextValidate = 8;
                } else if (buttonNext === 9) {
                    this.buttonTextValidate = 9;
                } else if (buttonNext === 10) {
                    this.buttonTextValidate = 10;
                } else if (buttonNext === 11) {
                    this.buttonTextValidate = 11;
                } else if (buttonNext === 12) {
                    this.buttonTextValidate = 12;
                } else if (buttonNext === 13) {
                    this.buttonTextValidate = 13;
                } else if (buttonNext === 14) {
                    this.buttonTextValidate = 14;
                } else if (buttonNext === 15) {
                    this.buttonTextValidate = 15;
                } else {
                    this.buttonTextValidate = 16;
                }
            });
        }
    }
    onButPreviousPageclick() {
    }
    onRowClickgltxn2(event) {
    }
    onPartialButtonclick() {
    }
    ok(event?) {
        this.gltxnExecuteQuery();
    }
    no() {
    }
    cancel() {
        this.gltxnData = [];
        this.gltxnModelTemp = new GlTransactions();
        this.gltxnModel = new GlTransactions();
        this.namesReadOnly = false;
        this.clearDisable = true;
        this.retriveDisable = false;
        this.nextReadOnly = true;
        this.receiptNumber = null;
        this.infoNumber = null;
        this.nextBtnDisable = true;
    }
    onOffenderChange(offender) {
    }
    gltxnExecuteQuery() {
        if (this.infoNumber) {
            this.gltxnModel.infoNumber = this.infoNumber;
        }
        if (this.receiptNumber) {
            this.gltxnModel.receiptNumber = this.receiptNumber;
        }
        const gltxnResult = this.otdglirtFactory.glTxnExecuteQuery(this.gltxnModel);
        gltxnResult.subscribe(gltxnResultList => {
            if (gltxnResultList.length === 0 || (gltxnResultList[0].errorMessage)) {
                this.clearDisable = false;
                this.gltxnModel = new GlTransactions();
                this.gltxnData = [];
                this.clearDisable = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                gltxnResultList.forEach(element => {
                    if (element.txnEntryAmount !== null) {
                        element.txnEntryAmount = (element.txnEntryAmount).toFixed(2);
                    }
                    if(element.txnPostUsage === 'DR'){
                        element.accountCodeTwo = element.accountCode;
                    } else{
                        element.accountCodeOne = element.accountCode;
                    }
                });
                this.gltxnData = gltxnResultList;
                this.gltxnModelTemp = gltxnResultList[0];
                this.namesReadOnly = true;
                this.nextReadOnly = false;
                this.clearDisable = false;
                this.retriveDisable = true;
                this.tableIndex = 0;
            }
        });
    }
    isInsertable() {
        if (this.gltxnModel.txnEntryDate || this.gltxnModel.txnEntryTime || this.gltxnModel.txnId
            || this.gltxnModel.txnEntrySeq || this.gltxnModel.nbtOffenderIdDisplay || this.gltxnModel.txnEntryAmount
            || this.infoNumber || this.receiptNumber) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    setDescription() {
        this.gltxnExecuteQuery();
    }

    clearDisableBtn() {
        if ((this.gltxnData && this.gltxnData.length > 0) || this.gltxnModel.txnEntryDate || 
        this.gltxnModel.txnId || this.gltxnModel.txnEntrySeq || this.gltxnModel.nbtOffenderIdDisplay || 
        this.gltxnModel.txnEntryAmount || this.infoNumber || this.receiptNumber) {
            return false;
        } else {
            return true;
        }
    }
}
