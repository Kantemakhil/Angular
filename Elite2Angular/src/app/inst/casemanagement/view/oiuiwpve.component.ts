import {
    Component, ViewChild, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuiwpveService } from '@inst/casemanagement/service/oiuiwpve.service';
import { IwpDocuments } from '@inst/casemanagement/beans/IwpDocuments';
import { IwpTemplates } from '@inst/casemanagement/beans/IwpTemplates';
import { IwpDocumentsCommitBean } from '@inst/casemanagement/beans/IwpDocumentsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
// import required bean declarations

@Component({
    selector: 'app-oiuiwpve',
    templateUrl: './oiuiwpve.component.html'
})

export class OiuiwpveComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    iwpdocData: IwpDocuments[] = [];
    iwpdocDataTemp: IwpDocuments[] = [];
    iwpdocModel: IwpDocuments = new IwpDocuments();
    iwpdocIndex = 0;
    iwpdocInsertList: IwpDocuments[] = [];
    iwpdocUpdateList: IwpDocuments[] = [];
    iwpdocDeleteList: IwpDocuments[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    iwpDocColumnDef: any[];
    paramsColumnDef: any[];
    zipJbeanReadOnly = false;
    templatesReadOnly = false;
    paramsReadOnly = false;
    ctrlBlReadOnly = false;
    iwpDocReadOnly = false;
    buttonReadOnly = false;
    rgstatusRg: any[] = [];
    rgtemplateRg: any[] = [];
    tableIndex: any;
    iwpdocCommitModel: IwpDocumentsCommitBean = new IwpDocumentsCommitBean;
    iwpTemplateModel: IwpTemplates = new IwpTemplates();
    documentLink:  any;
    documentTypeTitle = { code: 'Template Name', description: 'Description' };
    documentType: any;
    moduleName: any;
    pObjectType: any;
    pType: any;
    pSubType: any;
    pObjectId: any;
    offenderBookId: any;
    blockName: any;
    eventCode: any;
    constructor(private oiuiwpveFactory: OiuiwpveService, public translateService: TranslateService, public dialogService: DialogService) {
        // TODO initilize data members here..!
        this.iwpDocColumnDef = [];
        this.paramsColumnDef = [];

    }
    ngOnInit() {
        if (this.dialog.data) {
            if (this.dialog.data.pModuleName && this.dialog.data.pModuleName === 'OIDCNOTE' 
            || this.dialog.data.pModuleName === 'OCDPNOTE') {
                this.blockName = 'NONE';
                this.offenderBookId = String(this.dialog.data.offenderBookId);
                if (this.dialog.data.caseNoteId) {
                this.pObjectId = String(this.dialog.data.caseNoteId);
                    }
                this.documentLink = 'oiuiwpve/rgTemplateRecordGroup?offenderBookId=' + this.offenderBookId +
                 '&moduleName=' + this.dialog.data.pModuleName + '&pObjectType=' + this.dialog.data.pObjectType +
                '&pType=' + this.dialog.data.caseNoteType + '&pSubType=' + this.dialog.data.caseNoteSubType +
                 '&pObjectId=' +  this.pObjectId + '&blockName=' + this.blockName;

                const rgtemplateServiceObj = this.oiuiwpveFactory.
                    rgTemplateRecordGroup(this.offenderBookId, this.dialog.data.pModuleName, this.dialog.data.pObjectType,
                         this.dialog.data.caseNoteType, this.dialog.data.caseNoteSubType,
                    this.pObjectId, this.blockName);
                rgtemplateServiceObj.subscribe(rgtemplateList => {
                    if (rgtemplateList.length === 0) {
                        this.rgtemplateRg = [];
                    } else {
                        for (let i = 0; i < rgtemplateList.length; i++) {
                            this.rgtemplateRg.push({
                                'text': rgtemplateList[i].code + ' - ' +
                                rgtemplateList[i].description, 'id': rgtemplateList[i].code
                            });
                        }
                    }
                });
            }

        }
        this.iwpDocColumnDef = [
            { fieldName: this.translateService.translate('oiuiwpve.id'), field: 'documentId', datatype: 'text',
             editable: false, width: 80, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.documentcontext'), field: 'documentContext', datatype: 'text',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.comment'), field: 'commentText', datatype: 'text',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.createdate'), field: 'dateCreated', datatype: 'date',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.time'), field: 'dateCreated', datatype: 'time',
             editable: false, width: 80, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.author'), field: 'createUserId', datatype: 'text',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.updatedate'), field: 'dateModified', datatype: 'date',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.time'), field: 'dateModified', datatype: 'time',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            { fieldName: this.translateService.translate('oiuiwpve.updateuser'), field: 'modifyUserId', datatype: 'text',
             editable: false, width: 100, cellEditable: this.canPrevDocEdit },
            {
                fieldName: this.translateService.translate('oiuiwpve.status'), field: 'documentStatus', datatype: 'lov',
                domain:'DOCUMENT_STS'/*link: 'oiuiwpve/rgStatusRecordGroup'*/, editable: true, width: 80
            },
        ];

        // TODO all initializations here
        const rgstatusServiceObj = this.oiuiwpveFactory.rgStatusRecordGroup();
        rgstatusServiceObj.subscribe(rgStatusList => {
            if (rgStatusList.length === 0) {
                this.rgstatusRg = [];
            } else {
                for (let i = 0; i < rgStatusList.length; i++) {
                    this.rgstatusRg.push({
                        'text': rgStatusList[i].code + ' - ' +
                        rgStatusList[i].description, 'id': rgStatusList[i].code
                    });
                }
            }
        });
    }
     onDocumentMouseDown() {
         if ( this.rgtemplateRg.length === 0 ) {
            this.show(this.translateService.translate('common.listofvalues'), 'error');
            return false;
             }
    }
    changeTheValueOfDocumentType(event) {
        if (event) {
            if (event.listSeq) {
                this.iwpdocModel = new IwpDocuments();
                this.iwpdocModel.offenderBookId = Number(this.offenderBookId);
                this.iwpdocModel.templateId = event.listSeq;
                this.iwpdocExecuteQuery();
                }
            }
        }
    allowNumbers(event) {
    }
    onRowClickiwpdoc(event) {
    }
    onButViewclick() {
    }
    onButEditclick() {
    }
    onButNewclick() {
    }
    onButSaveclick() {
    }
    onButCloseclick() {
        this.dialog.close(true);
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
     canPrevDocEdit = (data: any, index: number, field: string): boolean => {
        if (field !== 'documentStatus') {
            this.show(this.translateService.translate('common.fieldisprotectedagainstupdated'), 'warn');
            return false;
        }
        return true;
    }

    iwpdocExecuteQuery() {
        const iwpdocResult = this.oiuiwpveFactory.iwpDocExecuteQuery(this.iwpdocModel);
        iwpdocResult.subscribe(iwpdocResultList => {
            if (iwpdocResultList.length === 0) {
                this.iwpdocData = [];
            } else {
                this.iwpdocData = iwpdocResultList;
                this.iwpdocModel = iwpdocResultList[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiuiwpveSaveiwpdocForm(event) {
        this.iwpdocInsertList = event.added;
        this.iwpdocUpdateList = event.updated;
        this.iwpdocDeleteList = event.removed;
        this.iwpdocCommitModel.insertList = [];
        this.iwpdocCommitModel.updateList = [];
        this.iwpdocCommitModel.deleteList = [];
        if (this.iwpdocInsertList.length > 0) {
            for (let i = 0; i < this.iwpdocInsertList.length; i++) {
                if (!this.iwpdocInsertList[i].documentStatus) {
                    this.show(this.translateService.translate('common.statusmustbeentered'), 'warn');
                    return false;
                }
            }
             this.iwpdocCommitModel.insertList = this.iwpdocInsertList;
        }
         if (this.iwpdocUpdateList.length > 0) {
            for (let i = 0; i < this.iwpdocUpdateList.length; i++) {
                if (!this.iwpdocUpdateList[i].documentStatus) {
                    this.show(this.translateService.translate('common.statusmustbeentered'), 'warn');
                    return false;
                }
            }
              this.iwpdocCommitModel.updateList = this.iwpdocUpdateList;
        }

        if (this.iwpdocDeleteList.length > 0) {
            this.iwpdocCommitModel.deleteList = this.iwpdocDeleteList;
        }
        const iwpdocSaveData = this.oiuiwpveFactory.iwpDocCommit(this.iwpdocCommitModel);
        iwpdocSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }


}
