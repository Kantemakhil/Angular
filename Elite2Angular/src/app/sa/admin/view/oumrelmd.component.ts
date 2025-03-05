import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OmsModules } from '@sa/usersystemsecurity/beans/OmsModules';
import { OmsModulesCommitBean } from '../beans/OmsModulesCommitBean';
import { OumrelmdService } from '../service/oumrelmd.service';

@Component({
    selector: 'app-oumrelmd',
    templateUrl: './oumrelmd.component.html'
})

export class OumrelmdComponent implements OnInit {
    msgs: any[] = [];
    message = ' Invalid.';
    type = 'error';
    gridOneRowData: OmsModules[] = [];
    gridOneColData: any[] = [];
    moduletablesIndex: number = -1;
    relatedModuleIndex: number = -1;
    gridTwoRowData: OmsModules[] = [];
    gridTwoColData: any[] = [];
    parentModuleName: string;
    relatedModulesLovData: string;
    buttonEnable: boolean = false;
    insertModulesList: OmsModules[] = [];
    updateModulesList: OmsModules[] = [];
    deleteModulesList: OmsModules[] = [];
    lovList: OmsModules[] = [];
    commitBean: OmsModulesCommitBean = new OmsModulesCommitBean();
    duplicateFlag: boolean;
    descriptionTemp: string;

    @ViewChild('gridTwo') gridTwo: any;
    titles = {
        'code': this.translateService.translate('common.modulename'),
        'moduleName': this.translateService.translate('common.description')
    };
    omsModules: OmsModules = new OmsModules();

    constructor(public translateService: TranslateService, private oumrelmdService: OumrelmdService,
        public sessionManager: UserSessionManager) {
    }

    ngOnInit() {
        this.gridOneColData = [
            {
                fieldName: this.translateService.translate('oumrelmd.moduleName'), field: 'moduleName', datatype: 'text',
                editable: false, width: 150,
            },
            {
                fieldName: this.translateService.translate('oumrelmd.description'), field: 'description', datatype: 'text',
                editable: false, width: 300
            }
        ];
        this.gridTwoColData = [
            {
                fieldName: this.translateService.translate('oumrelmd.accessModuleName'), field: 'accessModuleName', datatype: 'lov',
                editable: true, width: 150, required: true, link: 'oumrelmd/rgMenuSecDescRecordGroup', titles: this.titles
            },
            {
                fieldName: this.translateService.translate('oumrelmd.description'), field: 'description', datatype: 'text',
                editable: false, width: 300, required: true
            },
            {
                fieldName: this.translateService.translate('oumrelmd.listSeq'), field: 'listSeq', datatype: 'number',
                editable: true, width: 300, required: true, whole: true
            }
        ];
        this.firstGridExecuteQuery();
        this.getLovList();

    }
    getLovList() {
        const serviceObj = this.oumrelmdService.getLovList();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.lovList = [];
            } else {
                this.lovList = data;
            }
        });
    }

    firstGridExecuteQuery() {
        const serviceObj = this.oumrelmdService.rleInarcExecuteQuery(this.omsModules);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.gridOneRowData = [];
            } else {
                this.gridOneRowData = data;
                this.moduletablesIndex = 0;
                this.buttonEnable = true;
            }
        });
    }

    gridOneRowClick(event) {
        this.parentModuleName = event.moduleName;
        this.getRelatedModulesByModuleName();
    }
    getRelatedModulesByModuleName() {
        const serviceObj = this.oumrelmdService.getRelatedModulesByModuleName(this.parentModuleName);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.gridTwoRowData = [];
            } else {
                this.gridTwoRowData = data;
                this.relatedModuleIndex = 0;
            }
        });
    }

    saveRelatedModules(event) {
        this.duplicateFlag = true;
        for (let i = 0; i < this.gridTwoRowData.length; i++) {
            for (let j = i + 1; j < this.gridTwoRowData.length; j++) {
                if (this.gridTwoRowData[i].accessModuleName === this.gridTwoRowData[j].accessModuleName) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumrelmd.accessModuleNameDuplicate');
                    this.show();
                    this.duplicateFlag = false;
                    return;
                }
                if (this.gridTwoRowData[i].listSeq == this.gridTwoRowData[j].listSeq) {
                    this.duplicateFlag = false;
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumrelmd.listSeqDuplicate');
                    this.show();
                    return;
                }
            }
        }
        if (this.duplicateFlag) {
            this.insertModulesList = [];
            this.updateModulesList = [];
            this.deleteModulesList = [];

            this.insertModulesList = event.added;
            this.updateModulesList = event.updated;
            this.deleteModulesList = event.removed;

            this.commitBean.insertList = [];
            this.commitBean.updateList = [];
            this.commitBean.deleteList = [];


            // insertList
            if (this.insertModulesList.length > 0) {
                for (let i = 0; i < this.insertModulesList.length; i++) {
                    if (!this.insertModulesList[i].accessModuleName) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.accessModuleNameMand');
                        this.show();
                        return;
                    }
                    if (!this.insertModulesList[i].listSeq) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.listSeqMand');
                        this.show();
                        return;
                    }
                    if (this.insertModulesList[i].accessModuleName === this.parentModuleName) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.accessModuleNameAndModuleName');
                        this.show();
                        return;
                    }
                }
                this.insertModulesList.forEach(ele => {
                    ele.moduleName = this.parentModuleName;
                });
                this.commitBean.insertList = this.insertModulesList;
            }

            // updateList

            if (this.updateModulesList.length > 0) {
                for (let i = 0; i < this.updateModulesList.length; i++) {
                    if (!this.updateModulesList[i].accessModuleName) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.accessModuleNameMand');
                        this.show();
                        return;
                    }
                    if (!this.updateModulesList[i].listSeq) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.listSeqMand');
                        this.show();
                        return;
                    }
                    if (this.updateModulesList[i].accessModuleName === this.parentModuleName) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumrelmd.accessModuleNameAndModuleName');
                        this.show();
                        return;
                    }

                }
                this.commitBean.updateList = this.updateModulesList;
            }

            if (this.deleteModulesList.length > 0) {
                this.commitBean.deleteList = this.deleteModulesList;
            }


            const serviceObj = this.oumrelmdService.insertUpdateDelete(this.commitBean);
            serviceObj.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.getRelatedModulesByModuleName();
                    return;
                }
                else {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.getRelatedModulesByModuleName();
                    return;
                }
            });
        }


    }
    show() {
        this.msgs = [];
        this.msgs.push({ message: this.message, type: this.type });
        this.msgs = [...this.msgs];
    }
    secondGridRowClick(event) {


    }

    validateRowData = (event) => {
        const rowIndex = this.gridTwoRowData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'accessModuleName') {

            for (let i = 0; i < this.lovList.length; i++) {
                if (this.lovList[i].code === event.data.accessModuleName) {
                    this.descriptionTemp = this.lovList[i].moduleName;
                    break;
                }
            }

            this.gridTwo.setColumnData('description', rowIndex, this.descriptionTemp);
        }
        return rowdata;
    }
}


