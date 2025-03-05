import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { AgyIntLocProfiles } from '@inst/movements/maintenance/beans/AgyIntLocProfiles';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { AgyIntLocProfilesCommitBean } from '@inst/movements/maintenance/beans/AgyIntLocProfilesCommitBean';
import { OiunonasService } from '@inst/movements/maintenance/service/oiunonas.service';

@Component({
    selector: 'app-oiunonas',
    templateUrl: './oiunonas.component.html'
})

export class OiunonasComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    intlocprofData: AgyIntLocProfiles[] = [];
    intlocprofRowData: AgyIntLocProfiles[] = [];
    intlocprofModel: AgyIntLocProfiles = new AgyIntLocProfiles();
    intlocprofInsertList: AgyIntLocProfiles[] = [];
    intlocprofUpdateList: AgyIntLocProfiles[] = [];
    intlocprofDeleteList: AgyIntLocProfiles[] = [];
    intLocProfColumnDef: any[];
    intlocprofCommitModel: AgyIntLocProfilesCommitBean = new AgyIntLocProfilesCommitBean();
    rowIndex: number;
    editFlag = true;
    constructor(private oiunonasFactory: OiunonasService, public translateService: TranslateService) {
        this.intLocProfColumnDef = [];
    }
    ngOnInit() {
        this.rowIndex = -1;
        const data = this.dialog;
        if (this.dialog.data.modulename === 'OIMULOCA') {
            this.editFlag = false;
        } else {
            this.editFlag = true;
        }
        if (this.dialog.data.internalLocationId) {
            this.intlocprofExecuteQuery();
        }
        this.intLocProfColumnDef = [
            {
                fieldName: this.translateService.translate('oiunonas.nonassosiationtype') + '*', field: 'intLocProfileCode',
                editable: this.editFlag, width: 100, datatype: 'lov', domain:'NON_ASSO_TYP',
                titles: { code: this.translateService.translate('common.code')
                    , description: this.translateService.translate('common.description')
                  }
            },
            { fieldName: '', field: 'test', editable: true, width: 10, hide: true },
        ];
    }
    onRowClickEvent (event) {
        if (event) {
            this.intlocprofModel = event;
        }
    }
    /**
  *  This function is used to enable/disable grid insert button
  */
    get insertBtn() {
        if (this.dialog.data.modulename === 'OIMULOCA'  || this.dialog.data.unitType) {
            return false;
        } else {
            return true;
        }
    }
    /**
  *  This function is used to enable/disable grid delete button
  */
    get deleteBtn() {
        if (this.dialog.data.modulename === 'OIMULOCA' || this.dialog.data.unitType ) {
            return false;
        } else if ( !this.intlocprofModel.internalLocationId) {
            return false;
        } else {
            return true;
        }
    }
    get gridUpdBtn() {
        if (this.dialog.data.modulename === 'OIMULOCA' || this.dialog.data.unitType) {
            return false;
        } else {
            return true;
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
    onButExitclick() {
        this.dialog.close(null);
    }
    /**
     *  This function will be executed when we click on non assosiation buttonin parent screen
    *
    */
    intlocprofExecuteQuery() {
        this.intlocprofModel = new AgyIntLocProfiles();
        this.intlocprofModel.internalLocationId = this.dialog.data.internalLocationId;
        const intlocprofResult = this.oiunonasFactory.
            intLocProfExecuteQuery(this.intlocprofModel);
        intlocprofResult.subscribe(intlocprofResultList => {
            if (intlocprofResultList.length === 0) {
                this.intlocprofData = [];
                this.rowIndex = -1;
            } else {
                this.intlocprofData = intlocprofResultList;
                this.intlocprofModel = intlocprofResultList[0];
                this.rowIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiunonasSaveintlocprofForm(event) {
        this.intlocprofInsertList = [];
        this.intlocprofUpdateList = [];
        this.intlocprofDeleteList = [];
        this.intlocprofInsertList = event.added;
        this.intlocprofUpdateList = event.updated;
        this.intlocprofDeleteList = event.removed;
        this.intlocprofCommitModel.insertList = [];
        this.intlocprofCommitModel.updateList = [];
        this.intlocprofCommitModel.deleteList = [];
        if (this.intlocprofInsertList.length > 0 || this.intlocprofUpdateList.length > 0) {
            for (let i = 0; i < this.intlocprofInsertList.length; i++) {
                if (!this.intlocprofInsertList[i].intLocProfileCode) {
                    this.show(this.translateService.translate('oiunonas.nonassosiationtypemustbe'), 'warn');
                    return;
                }
                this.intlocprofInsertList[i].intLocProfileType = 'NON_ASSO_TYP';
                this.intlocprofInsertList[i].internalLocationId = this.dialog.data.internalLocationId;
            }
            for (let i = 0; i < this.intlocprofUpdateList.length; i++) {
                if (!this.intlocprofUpdateList[i].intLocProfileCode) {
                    this.show(this.translateService.translate('oiunonas.nonassosiationtypemustbe'), 'warn');
                    return;
                }
            }
            this.intlocprofCommitModel.insertList = this.intlocprofInsertList;
            this.intlocprofCommitModel.updateList = this.intlocprofUpdateList;
        }
        if (this.intlocprofDeleteList.length > 0) {
            this.intlocprofCommitModel.deleteList = this.intlocprofDeleteList;
        }
        const intlocprofSaveData = this.oiunonasFactory.intLocProfCommit(this.intlocprofCommitModel);
        intlocprofSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.intlocprofExecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('oiunonas.rowexistsalready'), 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    /*
    *  This event is used to insert the data in HousingLocations Block.
    */
    onGridInsert = () => {
        this.intlocprofRowData = [];
        this.grid.addedMap.forEach(
            (v: any, k: number) => {
                this.intlocprofRowData.push(v);
            }
        );
        this.grid.updatedMap.forEach(
            (v: any, k: number) => {
                this.intlocprofRowData.push(v);
            }
        );
        for (let i = 0; i < this.intlocprofRowData.length; i++) {
            if (!this.intlocprofRowData[i].intLocProfileCode) {
                this.show(this.translateService.translate('oiunonas.nonassosiationtypemustbe'), 'warn');
                return;
            }
        }
        return { intLocProfileCode: '' };
    }
}
