import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmsaljntService } from '../service/omsaljnt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { JournalTableView } from '../beans/JournalTableView';
import { JournalTableViewCommitModel } from '../beans/JournalTableViewCommitModel';

@Component({
    selector: 'app-omsaljnt',
    templateUrl: './omsaljnt.component.html'
})

export class OmsaljntComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    journaltableviewData: JournalTableView[] = [];
    journaltableviewDataTemp: JournalTableView[] = [];
    journaltableviewModel: JournalTableView = new JournalTableView();
    journaltableviewCommitModel: JournalTableViewCommitModel = new JournalTableViewCommitModel();
    journaltableviewInsertList: JournalTableView[] = [];
    journaltableviewUpdateList: JournalTableView[] = [];
    journaltableviewDeleteList: JournalTableView[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    journalTableViewColumnDef: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    retriveDisable: boolean;
    clearDisable: boolean;
    namesReadOnly: boolean;
    tableIndex = -1;
    constructor(private omsaljntFactory: OmsaljntService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.journalTableViewColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
        this.journalTableViewColumnDef = [
            { fieldName: this.translateService.translate('omsaljnt.tablename'), field: 'tableName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('omsaljnt.triggerstatus'), field: 'status', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('omsaljnt.changestatus'), field: 'chkBox', datatype: 'checkbox',
                editable: true, width: 150
            },
        ];
    }
    /**
      * This function displays the messages
      */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    cancel() {
        this.journaltableviewData = [];
        this.journaltableviewModel = new JournalTableView();
        this.retriveDisable = false;
        this.clearDisable = true;
        this.namesReadOnly = false;
    }
    isInsertable() {
        if (this.journaltableviewModel.tableName || this.journaltableviewModel.status) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    onGridClear = () => {
        this.journaltableviewExecuteQuery();
        return true;
    }
    journaltableviewExecuteQuery() {
        const journaltableviewResult = this.omsaljntFactory.
            journalTableViewExecuteQuery(this.journaltableviewModel);
        journaltableviewResult.subscribe(journaltableviewResultList => {
            if (journaltableviewResultList.length === 0) {
                this.journaltableviewData = [];
                this.journaltableviewModel = new JournalTableView();
                this.retriveDisable = false;
                this.clearDisable = true;
                this.namesReadOnly = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                journaltableviewResultList.forEach(element => {
                    if (element.status === 'ENABLED') {
                        element['chkBox'] = true;
                    } else if (element.status === 'DISABLED') {
                        element['chkBox'] = false;
                    }
                });
                this.journaltableviewData = journaltableviewResultList;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.namesReadOnly = true;
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    omsaljntSavejournaltableviewForm(event) {
        this.journaltableviewInsertList = event.added;
        this.journaltableviewUpdateList = event.updated;
        this.journaltableviewDeleteList = event.removed;
        this.journaltableviewCommitModel.insertList = [];
        this.journaltableviewCommitModel.updateList = [];
        this.journaltableviewCommitModel.deleteList = [];
        if (this.journaltableviewUpdateList.length > 0) {
            for (let i = 0; i < this.journaltableviewUpdateList.length; i++) {
                if (this.journaltableviewUpdateList[i]['chkBox'] === true) {
                    this.journaltableviewUpdateList[i].status = this.journaltableviewUpdateList[i].tableName + '_TJN ENABLE';
                } else {
                    this.journaltableviewUpdateList[i].status = this.journaltableviewUpdateList[i].tableName + '_TJN DISABLE';
                }
                this.journaltableviewCommitModel.updateList = this.journaltableviewUpdateList;
            }
        }
        const journaltableviewSaveData = this.omsaljntFactory.journalTableViewCommit(this.journaltableviewCommitModel);
        journaltableviewSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.journaltableviewExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.journaltableviewExecuteQuery();
            }
        });
    }
}
