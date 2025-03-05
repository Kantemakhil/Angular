import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSentences } from '@inst/legal/beans/OffenderSentences';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffendersShiftLog } from '../beans/OffendersShiftLog';
import { OffendersShiftLogCommitBean } from '@instshiftlogsbeans/OffenderShiftLogCommitBean';
import { OidshlogService } from '../service/oidshlog.service';

@Component({
    selector: 'app-oidshlogDialog',
    templateUrl: './oidshlogDialog.component.html'
})


export class OidshlogDialogComponent implements OnInit {
    selectDisBtn = true;
    lovModel: any[];
    msgs: any[] = [];
    minDate: any;
    display: boolean;
    @ViewChild('grid', { static: true }) grid: any;
    agyshilCommitModel: OffendersShiftLogCommitBean = new OffendersShiftLogCommitBean();

    relatedoffColumnDef: any[];
    relatedoffData: VHeaderBlock[] = [];
    tableIndex = 0;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    offSentmodel: VHeaderBlock = new VHeaderBlock();
    relatedOffInsertList: VHeaderBlock[] = [];
    offenderShiftLogInsertList: OffendersShiftLog[] = [];
    offShiftLogInsertList: OffendersShiftLog[] = [];
    voffdetModel: OffendersShiftLog = new OffendersShiftLog();

    internalLocationId: number;
    shiftLogSeq: number;
    offShiftLogCommitBean: OffendersShiftLogCommitBean = new OffendersShiftLogCommitBean();
    offenderShiftLogUpdateList: OffendersShiftLog[] = [];
    offShiftLogUpdateList: OffendersShiftLog[] = [];
    launchBtndisable: any;
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService, private oidshlogFactory: OidshlogService,) {
        // TODO initilize data members here..!
        this.relatedoffColumnDef = [];
    }
    ngOnInit() {
        this.shiftLogSeq = this.dialog.data.shiftLogSeq;
        this.internalLocationId = this.dialog.data.internalLocationId;
        this.launchBtndisable =  this.dialog.data.amendedFlag;

        this.relatedoffColumnDef = [
            {
                fieldName: this.translateService.translate('oidshlog.livingUnitDescription'), field: 'livingUnitDescription', editable: false, width: 150, datatype: 'text'
            },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, },

            { fieldName: this.translateService.translate('oidshlog.offenderFullName'), field: 'offenderFullName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oidshlog.reason'), field: 'reason', width: 150, datatype: 'lov', domain: 'ACT_OFFREA',
                cellEditable: this.canCellEdit
            },
            { fieldName: '', field: 'offenderBookId', hide: true },


        ];
        this.offShiftLogExecuteQuery();
    }
    onRowSentence(event) {
        if (event) {
            this.offSentmodel = event;
        }
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
    * This function loads the data into the Master Record and its child records
    */


    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        }
        return true;

    }
    cancel() {
        this.dialog.close(null);
    }

    genData() {
        this.offenderShiftLogInsertList = [];
        this.offenderShiftLogUpdateList = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.offenderShiftLogInsertList.push(v);

            }
        );

        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.offenderShiftLogUpdateList.push(v);

            }
        );
    }


    onSave() {
        this.genData();
        this.agyshilCommitModel.insertList = [];
        this.agyshilCommitModel.updateList = [];
        this.offShiftLogInsertList = this.offenderShiftLogInsertList;
        this.offShiftLogUpdateList= this.offenderShiftLogUpdateList;
        if (this.offShiftLogInsertList.length > 0) {
            for (let i = 0; i < this.offShiftLogInsertList.length; i++) {
                if (!this.offShiftLogInsertList[i]['reason']) {
                    this.show(this.translateService.translate('oidshlog.reasonvalidation'));
                    return false;
                }
                this.offShiftLogInsertList[i].shiftLogSeq = this.shiftLogSeq;
            }
            this.agyshilCommitModel.insertList = this.offShiftLogInsertList;
        }


        if (this.offShiftLogUpdateList.length > 0) {
            for (let i = 0; i < this.offShiftLogUpdateList.length; i++) {
                if (!this.offShiftLogUpdateList[i]['reason']) {
                    this.show(this.translateService.translate('oidshlog.reasonvalidation'));
                    return false;
                }
                this.offShiftLogUpdateList[i].shiftLogSeq = this.shiftLogSeq;
            }
            this.agyshilCommitModel.updateList = this.offShiftLogUpdateList;
        }

            const offshilSaveData = this.oidshlogFactory.offShilShilCommit(this.agyshilCommitModel);
            offshilSaveData.subscribe(data => {
                if (data[0] && data[0].listSeq === 1) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                     this.offShiftLogExecuteQuery();
                    return;
                } else if (data[0] && data[0].listSeq === 2) {
                    this.show(this.translateService.translate('oidshlog.rowalreadyexistwithsamedate'), 'warn');
                     this.offShiftLogExecuteQuery();
                    return;
                } else {
                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                    this.offShiftLogExecuteQuery();
                    return;
                }
            });


    }
    onRowClick(event) {
        if (event) {
            this.grid.requiredOn('reason');

        }
    }
    onButAddQueryclick(event) {
        this.grid.requiredOff('reason');
        const dialogData = { internalLocationId: this.dialog.data.internalLocationId };
        let index = 0;
        this.dialogService.openLinkDialog('/ADDOFFENDER', dialogData, 80).subscribe(result => {
            if (this.relatedoffData && this.relatedoffData.length > 0) {
                index = this.relatedoffData.length;
            }
            if (result) {
                result.forEach(e => {
                    this.grid.addRecord();
                    this.grid.setColumnData('offenderIdDisplay', index, e.offenderIdDisplay);
                    this.grid.setColumnData('offenderFullName', index, e.offenderFullName);
                    this.grid.setColumnData('livingUnitDescription', index, e.livingUnitDescription);
                    this.grid.setColumnData('offenderBookId', index, e.offenderBookId);

                    index++;
                });
                this.grid.requiredOn('reason');

            } else {

            }

        });

    }
    offShiftLogExecuteQuery() {
        this.voffdetModel.shiftLogSeq = this.shiftLogSeq;

        const saveObj = this.oidshlogFactory.offenderShiftLogExcuteQuery(this.shiftLogSeq, this.internalLocationId);
        saveObj.subscribe(data => {
            if (data.length === 0) {
                this.relatedoffData = [];
                if (this.relatedoffData.length == 0 && this.relatedoffData.length == 0) {
                    // this.show(this.translateService.translate('common.querycaused'));

                }
            } else {

                this.relatedoffData = data;
                this.tableIndex = 0;
                this.relatedoffData.forEach(element => {

                });
            }
        });
    }

    get singleSaveDisable(){
        if(this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0){
            return false;
        } else {
            return true;
        }
    } 
}

