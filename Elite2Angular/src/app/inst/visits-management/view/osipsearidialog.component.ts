import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Offenders } from '@common/beans/Offenders';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { OsipsearidialogService } from '../service/osipsearidialog.service';
import { OffendersCommitBean } from '@inst/demographics-biometrics/beans/OffendersCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 'app-osipsearidialog',
    templateUrl: './osipsearidialog.component.html'
})

export class OsipsearidialogComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    message: string;
    type: string;
    msglist = [];
    msgs: any[] = [];
    personDetailsRowData: Offenders[] = [];
    personsDetailsColumnDef: any[];
    personAddNamesInsertList: Offenders[] = [];
    personAddNamesUpdateList: Offenders[] = [];
    personAddNamesDeleteList: Offenders[] = [];
    personAddNamesCommitModel: OffendersCommitBean = new OffendersCommitBean();


    constructor(public translateService: TranslateService,public osipsearidialogservice : OsipsearidialogService,public sessionManager: UserSessionManager) {
        this.personsDetailsColumnDef = [];
    }

    ngOnInit(): void {
        this.personAddNamesExecutequery();
        this.personsDetailsColumnDef = [
            { fieldName: this.translateService.translate('osipsearidialog.lastname'), field: 'lastName', editable: true, width: 150, required: true, maxlength: 35, datatype: 'text' },
            { fieldName: this.translateService.translate('osipsearidialog.firstname'), field: 'firstName', editable: true, width: 150,maxlength: 35, datatype: 'text' },
            { fieldName: this.translateService.translate('osipsearidialog.middlename'), field: 'middleName', editable: true, width: 150,maxlength: 35, datatype: 'text' },
            { fieldName: this.translateService.translate('osipsearidialog.secondmiddlename'), field: 'middleName2', editable: true, width: 150,maxlength: 35, datatype: 'text' },
            { fieldName: this.translateService.translate('osipsearidialog.nametype'), field: 'nameType', editable: true, width: 150,datatype:'lov' , domain:'NAME_TYPE',required:true },
            { fieldName: '', field: 'persionId', hide:true, editable: true, width: 150 },
         ];

    }

    onRowClickPersonDetails(event){

    }

    onGridInsert = () => {
        return {
            persionId :this.dialog['data'].personId
        };
    }

    personAddNamesExecutequery() {
        const obj = this.osipsearidialogservice.personAddNamesExecutequery(this.dialog['data'].personId);
        obj.subscribe(data => {
            if (data.length>0) {
                this.personDetailsRowData = data;
            } else {
                this.personDetailsRowData = [];
            }
        })

    }

    personAddNamesCommit(event){

        this.personAddNamesInsertList = event.added;
        this.personAddNamesUpdateList = event.updated;
        this.personAddNamesDeleteList = event.removed;

        this.personAddNamesCommitModel.insertList = [];
        this.personAddNamesCommitModel.updateList = [];
        this.personAddNamesCommitModel.deleteList = [];

        if (this.personAddNamesInsertList.length > 0 || this.personAddNamesUpdateList.length > 0 || this.personAddNamesDeleteList.length > 0) {
            for (let i = 0; i < this.personAddNamesInsertList.length; i++) {
                this.personAddNamesInsertList[i].personId = this.dialog['data'].personId;
                this.personAddNamesInsertList[i].createUserId =this.sessionManager.getId() ;

                this.personAddNamesCommitModel.insertList = this.personAddNamesInsertList;
            }
            for (let i = 0; i < this.personAddNamesUpdateList.length; i++) {
                this.personAddNamesUpdateList[i].personId = this.dialog['data'].personId;
                this.personAddNamesUpdateList[i].modifyUserId =this.sessionManager.getId() ;
                this.personAddNamesCommitModel.updateList = this.personAddNamesUpdateList;
            }
            for (let i = 0; i < this.personAddNamesDeleteList.length; i++) {
                this.personAddNamesDeleteList[i].personId = this.dialog['data'].personId;
                this.personAddNamesCommitModel.deleteList = this.personAddNamesDeleteList;
            }
        }

        const assAnsSaveData = this.osipsearidialogservice.personAddNamesCommit(this.personAddNamesCommitModel);
        assAnsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.personAddNamesExecutequery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    cancel() {
        this.dialog.close(null);
    }

}