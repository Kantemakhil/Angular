import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ProgramServices } from '../beans/ProgramServices';
import { ProgramServicesCommitBean } from '../beans/ProgramServicesCommitBean';
import { OcmphblkService } from '../service/ocmphblk.service';
// import required bean declarations

@Component({
    selector: 'app-ocmphblk',
    templateUrl: './ocmphblk.component.html'
})

export class OcmphblkComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    // Variable declaration
    msgs: any[] = [];
    prgsrvData: ProgramServices[] = [];
    prgsrvDataTemp: ProgramServices[] = [];
    prgsrvModel: ProgramServices = new ProgramServices();
    prgsrvCommitModel: ProgramServicesCommitBean = new ProgramServicesCommitBean();
    prgsrvIndex: number;
    prgsrvInsertList: ProgramServices[] = [];
    prgsrvUpdateList: ProgramServices[] = [];
    prgsrvDeleteList: ProgramServices[] = [];
    prgsrvModelTemp: ProgramServices = new ProgramServices();
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    prgSrvColumnDef: any[];
    tableIndex = -1;
    nbtDescription: string;
    seqId: any;
    listSeqFlag: boolean;
    constructor(private ocmphblkFactory: OcmphblkService, public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        this.prgSrvColumnDef = [];
    }
    ngOnInit() {
        this.nbtDescription = this.dialog && this.dialog.data && this.dialog.data.nbtDescription;
        this.prgSrvColumnDef = [
            { fieldName: this.translateService.translate('ocmphblk.sequence') + '*', field: 'listSeq', datatype: 'number',whole: true, 
               editable: true, width: 150, maxValue: 999999 },
            { fieldName: this.translateService.translate('common.description') + '*', field: 'description',datatype: 'text' ,editable: true, width: 150,maxlength: 40 ,uppercase: 'false',},
        ];
        this.prgsrvExecuteQuery();
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
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    onRowClickprgsrv(event) {
        if (event) {
            this.prgsrvModel = event;
        }
    }
    cancel() {
        this.dialog.close(null);
    }
    /**
 *  This function will be executed when onInsert/commit event is
* fired
*/
    onGridInsertSeq = () => {

        if (!this.ocmphblkformValidations()) {
            return null;
        }
        if (this.prgsrvData.length > 0) {
            for (let i = 0; i < this.prgsrvData.length; i++) {
                if (!this.prgsrvData[i].listSeq) {
                    this.show('ocmphblk.sequencemustbeentered');
                    return;
                }
                if (!this.prgsrvData[i].description) {
                    this.show('ocmphblk.descriptionmustbeentered');
                    return;
                }
            }
        }
        if (this.prgsrvData.length > 0) {
            this.prgsrvModelTemp = this.prgsrvData[this.prgsrvData.length - 1];
        } else {
            this.prgsrvModelTemp = new ProgramServices();
        }
        return { listSeq: this.prgsrvModelTemp && this.prgsrvModelTemp.listSeq ? Number(this.prgsrvModelTemp.listSeq) + 1 : 1 };
    }
    ocmphblkformValidations() {
        const is = { valid: true };
        if (this.listSeqFlag) {
            this.show('ocmphblk.uniquesequence', 'warn');
            is.valid = false;
            return;
        }
        this.prgsrvData.forEach(data => {
            if (is.valid) {
                if (!data.listSeq && data.listSeq === 0) {
                    this.show(this.translateService.translate('ocmsvmod.mustbeinrangeonetonine'), 'warn');
                    is.valid = false;
                    return;
                }
                if (!data.listSeq) {
                    this.show('ocmphblk.sequencemustbeentered');
                    is.valid = false;
                    return;
                }
            }
            if (!data.description) {
                this.show('ocmphblk.descriptionmustbeentered');
                is.valid = false;
                return;
            }
        });
        return is.valid;
    }

    prgsrvExecuteQuery() {
        this.prgsrvModel.parentProgramId = this.dialog.data.programPhaseId;
        const prgsrvResult = this.ocmphblkFactory.prgSrvExecuteQuery(this.prgsrvModel);
        prgsrvResult.subscribe(prgsrvResultList => {
            if (prgsrvResultList.length === 0) {
                this.prgsrvData = [];
            } else {
                this.prgsrvData = prgsrvResultList;
                this.prgsrvModel = prgsrvResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmphblkSaveprgsrvForm(event) {
        if (!this.ocmphblkformValidations()) {
            return;
        }
        //this.prgsrvModel.phasedescription = this.dialog.data.nbtDescription;
        //this.prgsrvModel.parentProgramId = this.dialog.data.programPhaseId;
        this.prgsrvInsertList = event.added;
        this.prgsrvUpdateList = event.updated;
        this.prgsrvDeleteList = event.removed;
        this.prgsrvCommitModel.insertList = [];
        this.prgsrvCommitModel.updateList = [];
        this.prgsrvCommitModel.deleteList = [];
        if (this.prgsrvInsertList.length > 0) {
            this.prgsrvInsertList.forEach(element => {
                if(element){
                    element.activeFlag = this.dialog.data.activeFlag;
                    element.phasedescription = this.dialog.data.nbtDescription;
                    element.parentProgramId = this.dialog.data.programPhaseId;
                    element.programClass ='PRG_BLK';
                }
            });
            this.prgsrvCommitModel.insertList = this.prgsrvInsertList;
        }
        if (this.prgsrvUpdateList.length > 0) {
            this.prgsrvCommitModel.updateList = this.prgsrvUpdateList;
        }
        if (this.prgsrvDeleteList.length > 0) {
            this.prgsrvCommitModel.deleteList = this.prgsrvDeleteList;
        }
        const prgsrvSaveData = this.ocmphblkFactory.prgSrvCommit(this.prgsrvCommitModel);
        prgsrvSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.prgsrvExecuteQuery();
                return;
            } else if (data === 7) {
                this.show('ocmphblk.uniquesequence', 'warn');
                this.prgsrvExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.prgsrvExecuteQuery();
                return;
            }
        });
    }
    onGridClear = () => {
        this.prgsrvExecuteQuery();
        return true;
    }
    onGridDelete = () => {
        return true;
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.listSeqFlag = false;
        if (event.field === 'listSeq') {
            if (this.prgsrvData.length > 0) {
                this.prgsrvData.forEach((element, index) => {
                    if (event.data.listSeq == element.listSeq && rowIndex != index) {
                        this.listSeqFlag = true;
                    }
                });
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
}
