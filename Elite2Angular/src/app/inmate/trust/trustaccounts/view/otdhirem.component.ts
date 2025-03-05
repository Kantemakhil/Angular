import {
    Component,
    OnInit,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdhiremService } from '../service/otdhirem.service';
import { OffenderTransactions } from '@inmatetrustaccountsbeans/OffenderTransactions';
import { SystemProfiles } from '@inst/demographics-biometrics/beans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-otdhirem',
    templateUrl: './otdhirem.component.html'
})

export class OtdhiremComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtxnData: OffenderTransactions[] = [];
    offtxnDataTemp: OffenderTransactions[] = [];
    offtxnModel: OffenderTransactions = new OffenderTransactions();
    offtxnIndex: number;
    offtxnInsertList: OffenderTransactions[] = [];
    offtxnUpdatetList: OffenderTransactions[] = [];
    offtxnDeleteList: OffenderTransactions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vTrustBlockModel: VTrustHeader = new VTrustHeader();
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
    offTxnColumnDef: any[];
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
    offTxnReadOnly: boolean;
    tableIndex = -1;
    constructor(private otdhiremFactory: OtdhiremService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService,
        public dialogService: DialogService) {
        this.glTxn2ColumnDef = [];
        this.offDrColumnDef = [];
        this.offDedColumnDef = [];
        this.omsModulesColumnDef = [];
        this.glTxnColumnDef = [];
        this.offTxnColumnDef = [];
        this.offBncColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offTxnColumnDef = [
            { fieldName: this.translateService.translate('common.type'), field: 'subAccountType', editable: false, width: 100 },
            { fieldName: this.translateService.translate(''), field: 'goButton', datatype: 'launchbutton', editable: false, width: 80,
            link: 'OTUHOLDR', modal: true, updateField: 'row', data: 'row', onLaunchClick: this.launchButtonClick},
            { fieldName: this.translateService.translate('otdhirem.refno'), field: 'txnReferenceNumber', editable: false, width: 100 },
            { fieldName: this.translateService.translate('otdhirem.holdno'), field: 'holdNumber', editable: false, width: 100 },
            {
              fieldName: this.translateService.translate('common.untildate'), field: 'holdUntilDate', editable: false,
              datatype: 'date', width: 100
          },
            { fieldName: this.translateService.translate('common.description'), field: 'txnEntryDesc', editable: false, width: 100 },
            { fieldName: this.translateService.translate('common.amount'), field: 'txnEntryAmount', editable: false, width: 100,
            datatype: 'number', format: '1.2-2',rightAlign: true },
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show('common.pleasesearchforvalidoffender');
        }
    }
    onRowClickofftxn(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onOffenderChange(offender) {
        this.offtxnData = [];
        this.offtxnModel = new OffenderTransactions();
        if (offender) {
            this.vTrustBlockModel = offender;
            this.offtxnExecuteQuery();
        } else {
            this.offtxnData = [];
            this.offtxnModel = new OffenderTransactions();
        }
    }
    offtxnExecuteQuery() {
        this.offtxnModel.offenderId = this.vTrustBlockModel.rootOffenderId;
        const offtxnResult = this.otdhiremFactory.offTxnExecuteQuery(this.offtxnModel);
        offtxnResult.subscribe(offtxnResultList => {
            if (offtxnResultList.length === 0) {
                this.offtxnData = [];
            } else {
                offtxnResultList.forEach(element => {
                   element['goButton'] = '...';
                   element.txnEntryAmount = element.txnEntryAmount.toFixed(2);
                });
                this.offtxnData = offtxnResultList;
                this.offtxnModel = offtxnResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    launchButtonClick = (data) => {
        this.dialogService.openLinkDialog('OTUHOLDR', data, 80).subscribe(result => {
            this.offtxnExecuteQuery();
        });
        return false;
    }
}
