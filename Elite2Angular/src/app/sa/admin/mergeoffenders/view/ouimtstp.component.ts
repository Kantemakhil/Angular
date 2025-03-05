import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuimtstpService } from '../service/ouimtstp.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VMergeTransactionProcesses } from '../beans/VMergeTransactionProcesses';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OuimergeService } from '../service/ouimerge.service';
// import required bean declarations

@Component({
    selector: 'app-ouimtstp',
    templateUrl: './ouimtstp.component.html'
})

export class OuimtstpComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    mergtxnprocData: VMergeTransactionProcesses[] = [];
    mergtxnprocDataTemp: VMergeTransactionProcesses[] = [];
    // TODO angular.copy(this.mergtxnprocData, thismergtxnprocDataTemp);
    mergtxnprocModel: VMergeTransactionProcesses = new VMergeTransactionProcesses();
    mergtxnprocIndex: Number = 0;
    mergtxnprocInsertList: VMergeTransactionProcesses[] = [];
    mergtxnprocUpdatetList: VMergeTransactionProcesses[] = [];
    mergtxnprocDeleteList: VMergeTransactionProcesses[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    mergTxnProcColumnDef: any[];
    mergTxnProcReadOnly: Boolean = false;
    tableIndex: number;
    constructor(private ouimtstpFactory: OuimtstpService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private ouimergeFactory: OuimergeService) {
        // TODO initilize data members here..!
        this.mergTxnProcColumnDef = [];
    }
    ngOnInit() {
        this.mergTxnProcColumnDef = [
            { fieldName: this.translateService.translate('ouimtstp.module'), field: 'processName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouimtstp.description'), field: 'processDescription',
             editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ouimtstp.transfer'), field: 'transferFlag',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ouimtstp.timerequired'), field: 'timeframeFlag',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ouimtstp.leftlimitdate'), field: 'beginDate',
                editable: false, width: 150, datatype: 'date'
            },
            { fieldName: this.translateService.translate('ouimtstp.time'), field: 'beginTime',
             editable: false, width: 150, datatype: 'time' },
            {
                fieldName: this.translateService.translate('ouimtstp.rightlimitdate'), field: 'endDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ouimtstp.time'), field: 'endTime',
                editable: false, width: 150, datatype: 'time'
            },
        ];
        this.mergtxnprocExecuteQuery();
        // TODO all initializations here
    }
/**
  * This function displays the messages
  */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
      * event is fired when click on Exit button.
      */
    onButExitclick() {
        this.dialog.close(null);
    }
/**
     * This function is used to retrive the information of Region grid
     */
    mergtxnprocExecuteQuery() {
        this.mergtxnprocModel = new VMergeTransactionProcesses();
        this.mergtxnprocModel.mergeTransactionId = this.dialog.data.mergeTransactionId;
        const mergtxnprocResult = this.ouimergeFactory.mergTxnProcExecuteQuery(this.mergtxnprocModel);
        mergtxnprocResult.subscribe(mergtxnprocResultList => {
            if (mergtxnprocResultList.length === 0) {
                this.mergtxnprocData = [];
                this.show('common.querycaused');
            } else {
                mergtxnprocResultList.forEach(element => {
                    element.transferFlag = element.transferFlag === 'Y' ? true : false;
                    element.timeframeFlag = element.timeframeFlag === 'Y' ? true : false;
                });
                this.tableIndex = 0;
                this.mergtxnprocData = mergtxnprocResultList;
                this.mergtxnprocModel = mergtxnprocResultList[0];
            }
        });
    }



}
