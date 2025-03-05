import { RedirectUtil } from './../../../../core/classes/redirectUtil';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { TranslateService } from '@common/translate/translate.service';
import { OumdtempService } from '../service/oumdtemp.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { IwpTemplateModules } from '@inst/casemanagement/beans/IwpTemplateModules';
import { IwpParameterMappings } from '@sa/admin/integratedwordprocessing/beans/IwpParameterMappings';
import { IwpTemplateRoles } from '@sa/admin/integratedwordprocessing/beans/IwpTemplateRoles';
import { IwpTemplates } from '@inst/casemanagement/beans/IwpTemplates';
import { IwpTemplatesCommitBean } from '@sa/admin/integratedwordprocessing/beans/IwpTemplatesCommitBean';
import { IwpTemplateRolesCommitBean } from '@sa/admin/integratedwordprocessing/beans/IwpTemplateRolesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { IwpTemplateModulesCommitBean } from '@sa/admin/integratedwordprocessing/beans/IwpTemplateModulesCommitBean';
import { IwpParameterMappingsCommitBean } from '@sa/admin/integratedwordprocessing/beans/IwpParameterMappingsCommitBean';
import { DocumentService } from '@core/ui-components/document-editor/document.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { UploadtemplateComponent } from '@common/iwp/uploadtemplate.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-oumdtemp',
    templateUrl: './oumdtemp.component.html'
})

export class OumdtempComponent implements OnInit, OnDestroy {
    @ViewChild('dialog') dialog: DialogComponent;
    dialogRef: MatDialogRef<UploadtemplateComponent> | null;
    laucnBtnDisbale: boolean;
    launchBtnFlg: boolean;
    readeOnlyNameFlag: boolean;
    clrBtnFlag: boolean;
    retBtnflag: boolean;
    readeOnlyFields: boolean;
    gridTempDelBtn: boolean;
    relGridDelBtn: boolean;
    roleGridDelBtn: boolean;
    isUploadBtn: boolean = false;
    @ViewChild('rolegrid', {static: true}) rolegrid: any;
    @ViewChild('templategrid', {static: true}) templategrid: any;
    @ViewChild('relgrid', {static: true}) relgrid: any;
    dataModifiedInterval: any;
    msgs: any[] = [];
    selectedTabIndex: number;
    aiwptemplatesData: IwpTemplates[] = [];
    aiwptemplatesDataTemp: IwpTemplates[] = [];
    aiwptemplatesModel: IwpTemplates = new IwpTemplates();
    aiwptemplatesBean: IwpTemplates = new IwpTemplates();
    aiwptemplatesIndex = 0;
    aiwptemplatesInsertData: IwpTemplates[] = [];
    aiwptemplatesInsertList: IwpTemplates[] = [];
    aiwptemplatesUpdateList: IwpTemplates[] = [];
    aiwptemplatesDeleteList: IwpTemplates[] = [];
    aiwptagrelationsData: IwpTemplateModules[] = [];
    msglist = [];
    aiwptagrelationsRowData: IwpTemplateModules[] = [];
    aiwptagrelationsModel: IwpTemplateModules = new IwpTemplateModules();
    aiwptagrelationsBean: IwpTemplateModules = new IwpTemplateModules();
    aiwptagrelationsIndex = 0;
    aiwptagrelationsInsertList: IwpTemplateModules[] = [];
    aiwptagrelationsUpdateList: IwpTemplateModules[] = [];
    aiwptagrelationsDeleteList: IwpTemplateModules[] = [];
    iwpparametermappingsData: IwpParameterMappings[] = [];
    iwpparametermappingsDataTemp: IwpParameterMappings[] = [];
    iwpparametermappingsModel: IwpParameterMappings = new IwpParameterMappings();
    iwpparametermappingsIndex = 0;
    iwpparametermappingsInsertList: IwpParameterMappings[] = [];
    iwpparametermappingsUpdateList: IwpParameterMappings[] = [];
    iwpparametermappingsDeleteList: IwpParameterMappings[] = [];
    templrolesData: IwpTemplateRoles[] = [];
    templrolesDataTemp: IwpTemplateRoles[] = [];
     type = 'error';
    templrolesModel: IwpTemplateRoles = new IwpTemplateRoles();
    templrolesBean: IwpTemplateRoles = new IwpTemplateRoles();
    templrolesIndex = 0;
    templrolesInsertList: IwpTemplateRoles[] = [];
    templrolesUpdateList: IwpTemplateRoles[] = [];
    templrolesDeleteList: IwpTemplateRoles[] = [];
    templrolesInsertData: IwpTemplateRoles[] = [];
    display: boolean;
    wfIwpTemplatesColumnDef: any[];
    recipientStaffColumnDef: any[];
    templRolesColumnDef: any[];
    templateData:any;
    wfWorkTypesColumnDef: any[];
    recipientTeamsColumnDef: any[];
    wfTriggersColumnDef: any[];
    aIwpTagRelationsColumnDef: any[];
    wfEmailRecipientsColumnDef: any[];
    aIwpTemplatesColumnDef: any[];
     message = ' Invalid.';
    iwpParameterMappingsColumnDef: any[];
    wfFunctionsColumnDef: any[];
    wfWorkTypesReadOnly = false;
    wfIwpTemplatesReadOnly = false;
    wfTriggersReadOnly = false;
    wfFunctionsReadOnly = false;
    wfEmailRecipientsReadOnly = false;
    wfEmailReturnReadOnly = false;
    wfWorkEmailReadOnly = false;
    aIwpTemplatesReadOnly = false;
    ctrlReadOnly = false;
    block2ReadOnly = false;
    aIwpTagRelationsReadOnly = false;
    iwpParameterMappingsReadOnly = false;
    templRolesReadOnly = false;
    rgparamdatatypeRg: any[] = [];
    rgrolesRg: any[] = [];
    rgbmlistRg: any[] = [];
    rgomsmoduleRg: any[] = [];
    rgreportnameRg: any[] = [];
    rgstaffRg: any[] = [];
    rgobjecttypeRg: any[] = [];
    aiwptemplatesCommitModel: IwpTemplatesCommitBean = new IwpTemplatesCommitBean();
    templrolesCommitModel: IwpTemplateRolesCommitBean = new IwpTemplateRolesCommitBean();
    aiwptagrelationsCommitModel: IwpTemplateModulesCommitBean = new IwpTemplateModulesCommitBean();
    lovtitles = { description: this.translateService.translate('common.description') };
    iwpparametermappingsCommitModel: IwpParameterMappingsCommitBean = new IwpParameterMappingsCommitBean();
    intLocIdMap: Map<string, string> = new Map<string, string>();
    isshowdoc = true;
    isshowRep = false;
    nametitles = {
        code: this.translateService.translate('oumdtemp.modulename'),
        moduleName: this.translateService.translate('common.description')
    };
    docEditInNewTab:boolean = false; 
    constructor(private oumdtempFactory: OumdtempService, public translateService: TranslateService, private dialogService: DialogService,
        public sessionManager: UserSessionManager,private redirectUtil: RedirectUtil, public oumsysetService: OumsysetService,
        private documentService: DocumentService, private eoffenderService: EoffenderService, public matDialog: MatDialog) {
        this.wfIwpTemplatesColumnDef = [];
        this.recipientStaffColumnDef = [];
        this.templRolesColumnDef = [];
        this.wfWorkTypesColumnDef = [];
        this.recipientTeamsColumnDef = [];
        this.wfTriggersColumnDef = [];
        this.aIwpTagRelationsColumnDef = [];
        this.wfEmailRecipientsColumnDef = [];
        this.aIwpTemplatesColumnDef = [];
        this.iwpParameterMappingsColumnDef = [];
        this.wfFunctionsColumnDef = [];
    }


    ngOnInit() {
        this.getEliteDocInfo();
//        this.downloadTemplate(245);
        this.aiwptemplatesIndex = -1;
        this.aiwptemplatesModel = new IwpTemplates();
        this.oumdtempexecuteQuery();
        this.templRolesColumnDef = [
            {
                fieldName: this.translateService.translate('oumdtemp.rolename'), field: 'roleCode', editable: true, width: 150, datatype: 'lov',
                link: 'oumdtemp/rgRolesRecordGroup', cellEditable: this.canRoleEdit,source:'OUMROLES'
            },
            { fieldName: '', field: 'test', editable: true, width: 10, hide: true },
        ];
        this.aIwpTagRelationsColumnDef = [
            {
                fieldName: this.translateService.translate('oumdtemp.screenshortname'), field: 'moduleName', editable: true,
                width: 150, datatype: 'lov', link: 'oumdtemp/rgOmsModuleRecordGroup',source:'OUMTAGRE'
            },
            {
                fieldName: this.translateService.translate('oumdtemp.blockcontextspecificonly'), field: 'blockName',
                editable: true, width: 150, cellEditable: this.canRelEdit, maxlength: 60
            },
            {
                fieldName: this.translateService.translate('oumdtemp.blockdescription'), field: 'blockDescription',
                editable: true, width: 150, cellEditable: this.canRelEdit, maxlength: 256
            },
            { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.aIwpTemplatesColumnDef = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'objectType',
                editable: true, width: 280, domain: 'OBJECT_TYPE', datatype: 'lov', titles: {
                    description: this.translateService.translate('common.description')
                }
            },
            { fieldName: this.translateService.translate('oumdtemp.signature'), field: 'signatureAccess', editable: true, width: 280, datatype: 'checkbox' },
            
            {
                fieldName: this.translateService.translate('common.templatename'),
                field: 'templateName', editable: true, width: 280, datatype: 'text',required: true, maxlength: 12, uppercase: 'true', hide: false, cellEditable: this.canTemplateEdit
            },
//            {
//                fieldName: this.translateService.translate('common.name') +
//                    this.translateService.translate('common.mandatory'), field: 'templateName', datatype: 'lov', link: 'oumdtemp/rgReportNameRecordGroup',
//                editable: true, width: 280, hide: false, cellEditable: this.canTemplateEdit, titles: {
//                    code: this.translateService.translate('oumdtemp.modulename'),
//                    moduleName: this.translateService.translate('common.description')
//                }
//            },
            {
                fieldName: this.translateService.translate('common.description') + this.translateService.translate('common.mandatory'),
                field: 'description', editable: true, width: 280, datatype: 'text', maxlength: 256, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('common.createdate'),
                field: 'dateCreated', editable: false, width: 280, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oumdtemp.createuser'),
                field: 'userCreated', editable: false, width: 280
            },
            { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 280, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 280, datatype: 'date' },
             {
                fieldName: this.translateService.translate('oumdtemp.import'),
                field: 'importButton', datatype: 'hyperlink',displayas: 'image',
                editable: false, width: 100, modal: true,
                data: 'row',updateField: 'row',imageTitleField:'importBtnTitle', onLaunchClick:this.onImportTemplateClick
            },
            {
            fieldName: this.translateService.translate('oumdtemp.view'),
            field: 'viewButton', datatype: 'hyperlink',displayas: 'image',
            editable: false ,width: 100, modal: true,
            data: 'row',updateField: 'row',imageTitleField:'downloadBtnTitle',onLaunchClick:this.downloadTemplate
            }, 
            {
            fieldName: this.translateService.translate('oumdtemp.managedoc'),
            field: 'manageDocBtn', datatype: 'hyperlink',displayas: 'image',
            editable: false ,width: 100, modal: true,
            data: 'row',updateField: 'row',imageTitleField:'checkoutBtnTitle',onLaunchClick:this.manageDocTemplate
            }
        ];
        this.iwpParameterMappingsColumnDef = [
            { fieldName: this.translateService.translate('oumdtemp.bookmarkname'), field: 'bookmarkName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumdtemp.parametername'), field: 'parameterName', editable: false, width: 150 },
            { fieldName: '', field: 'butPDataType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oumdtemp.datatype'), field: 'dataType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oumdtemp.field') + this.translateService.translate('common.mandatory'), field: 'fieldName',
                editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('oumdtemp.documentcontext'), field: 'documentContextFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
        ];
        const serviceObj = this.oumdtempFactory.
            rgReportNameRecordGroup();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.intLocIdMap.set(ele.code, ele.moduleName);
                });
            }
        });
        this.getSpellCheckLangId();
        // TODO all initializations here
    }

    ngOnDestroy() {
        if (this.dataModifiedInterval) {
            clearInterval(this.dataModifiedInterval);
        }
    }

    isFieldVisiable(field: string) {
        if (field === 'templateName') {
            return true;
        }
        if (field === 'reptemplateName') {
            return false;
        }
        return true;
    }
    onButClear() {
        this.aiwptemplatesModel = new IwpTemplates();
        this.aiwptemplatesBean = new IwpTemplates();
        this.aiwptemplatesData = [];
        this.aiwptagrelationsData = [];
        this.iwpparametermappingsData = [];
        this.templrolesData = [];
    }
    disableLocBtn = (data, index) => {
        if (this.aiwptemplatesModel.createDatetime) {
            return false;
        }
        return true;
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.objectType === 'REPORT' && field === 'templateName') {
            return true;
        }
        return false;
    }
    canRoleEdit = (data: any, index: number, field: string): boolean => {
        if (!data.dateCreated && field === 'roleCode') {
            return false;
        }
        return true;
    }
    canRelEdit = (data: any, index: number, field: string): boolean => {
        if (this.aiwptemplatesModel.contextRuleCount > 0) {
            return true;
        }
        return false;
    }
    onLovChange() {
        if (!this.aiwptemplatesBean.objectType) {
            this.aiwptemplatesBean.objectType = this.aiwptemplatesBean.objectType === '' ? undefined : '';
        }
    }
    onuserLovChange() {
        if (!this.aiwptemplatesBean.userCreated) {
            this.aiwptemplatesBean.userCreated = this.aiwptemplatesBean.userCreated === '' ? undefined : '';
        }
    }
    changeEvent(event) {
        if (event) {
            if (event.code === 'REPORT') {
                this.isshowRep = true;
                this.isshowdoc = false;
            }
            if (event.code === 'IWP') {
                this.isshowdoc = true;
                this.isshowRep = false;
            }
        }
    }
    afterDialogClosed(event) {
        if (event) {
            this.aiwptemplatesBean.description = event.moduleName;
        }
    }
    reportLovEvent() {
        if (!this.aiwptemplatesBean.templateName) {
            this.aiwptemplatesBean.templateName = this.aiwptemplatesBean.templateName === '' ? undefined : '';
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
    get gridInsBtn() {
        if (!this.aiwptemplatesModel.templateId) {
            this.gridTempDelBtn = false;
            this.laucnBtnDisbale = true;
        } else {
            this.laucnBtnDisbale = false;
            this.gridTempDelBtn = true;
        }
        if (this.aiwptemplatesModel.templateId && this.aiwptagrelationsBean.templateModuleId) {
            this.relGridDelBtn = true;
        } else {
            this.relGridDelBtn = false;
        }
        /* if (this.aiwptemplatesModel.templateId && this.templrolesBean.createDatetime) {
            this.roleGridDelBtn = true;
        }  else {
            this.roleGridDelBtn = false;
        } */
        if (this.aiwptemplatesData.length === 0) {
            this.readeOnlyFields = false;
        } else {
            this.readeOnlyFields = true;
        }
        if (this.aiwptemplatesBean.objectType || this.aiwptemplatesBean.templateName ||
            this.aiwptemplatesBean.description ||
            this.aiwptemplatesBean.userCreated) {
            this.retBtnflag = false;
        } else if (this.aiwptemplatesData.length === 0) {
            this.retBtnflag = false;
        } else {
            this.retBtnflag = true;
        }
        if (this.aiwptemplatesData.length > 0 || this.aiwptemplatesBean.objectType ||
            this.aiwptemplatesBean.templateName ||
            this.aiwptemplatesBean.description || this.aiwptemplatesBean.userCreated) {
            this.clrBtnFlag = false;
        } else {
            this.clrBtnFlag = true;
        }
        if (!this.aiwptemplatesBean.objectType || this.aiwptemplatesData.length > 0) {
            this.readeOnlyNameFlag = true;
            this.launchBtnFlg = true;
        } else if (this.aiwptemplatesBean.objectType === 'REPORT') {
            this.readeOnlyNameFlag = true;
            this.launchBtnFlg = false;
        } else {
            this.readeOnlyNameFlag = false;
            this.launchBtnFlg = true;
        }
        if (this.aiwptemplatesModel.templateId) {
            return true;
        }
        return false;
    }
    /*
 *  This event is used to do the validations in the Grid in Schedules Block.
 */
    canTemplateEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'templateName' && data.objectType === 'REPORT' && this.aIwpTemplatesColumnDef[2].hide) {
            // this.aIwpTemplatesColumnDef[2].hide = false;
            // this.aIwpTemplatesColumnDef[1].hide = true;
            this.templategrid.gridApi.getAllDisplayedColumns()[1].cellRendererSelector = {component: 'GridCellRenderLoVComponent'};
            // this.templategrid.prepareAgColumnDef();
        } else if (field === 'templateName' && data.objectType === 'IWP' && this.aIwpTemplatesColumnDef[1].hide) {
            // this.aIwpTemplatesColumnDef[2].hide = true;
            // this.aIwpTemplatesColumnDef[1].hide = false;
            this.templategrid.gridApi.getAllDisplayedColumns()[1].cellRendererSelector = {component: 'text'};
            // this.templategrid.prepareAgColumnDef();
        }
        if (data.templateId && field === 'templateName' && data.objectType === 'REPORT') {
            return true;
        }
        if (!data.templateId && field === 'templateName') {
            return true;
        }
        if (!data.objectType && field === 'templateName') {
            return true;
        }
        return false;
    }

    onRowClickaiwptemplates(event) {
        if (event) {
            this.aiwptemplatesModel = event;
            this.aiwptagrelationsModel = new IwpTemplateModules();
            if (this.aiwptemplatesModel.templateId) {
                this.aiwptagrelationsModel.templateId = this.aiwptemplatesModel.templateId;
                this.oumdtempRelationexecuteQuery();
                this.templrolesExecuteQuery();
                if (this.aiwptemplatesModel.contextRuleCount > 0) {
                    this.relgrid.setColumnHeader('blockName',
                        this.translateService.translate('oumdtemp.blockcontextspecificonlymandatory'));
                    this.relgrid.setColumnHeader('blockDescription', this.translateService.translate('oumdtemp.blockdescription') +
                        this.translateService.translate('common.mandatory'));
                } else {
                    this.relgrid.setColumnHeader('blockName', this.translateService.translate('oumdtemp.blockcontextspecificonly'));
                    this.relgrid.setColumnHeader('blockDescription', this.translateService.translate('oumdtemp.blockdescription'));
                }
            } else {
                this.relgrid.setColumnHeader('blockName', this.translateService.translate('oumdtemp.blockcontextspecificonly'));
                this.relgrid.setColumnHeader('blockDescription', this.translateService.translate('oumdtemp.blockdescription'));
                this.iwpparametermappingsData = [];
                this.aiwptagrelationsData = [];
                this.templrolesData = [];
            }
        }
    }
    onRowClickaiwptagrelations(event) {
        if (event) {
            this.aiwptagrelationsBean = event;
            this.iwpparametermappingsModel = new IwpParameterMappings();
            this.iwpparametermappingsModel.templateModuleId = this.aiwptagrelationsBean.templateModuleId;
            this.iwpparametermappingsExecuteQuery();
        }
    }
    onRowClicktemplroles(event) {
        if (event) {
            this.templrolesBean = event;
        }
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    oumdtempSaveaiwptemplatesForm(event) {
        this.aiwptemplatesInsertList = [];
        this.aiwptemplatesUpdateList = [];
        this.aiwptemplatesDeleteList = [];
        this.aiwptemplatesInsertList = event.added;
        this.aiwptemplatesUpdateList = event.updated;
        this.aiwptemplatesDeleteList = event.removed;
        this.aiwptemplatesCommitModel.insertList = [];
        this.aiwptemplatesCommitModel.updateList = [];
        this.aiwptemplatesCommitModel.deleteList = [];
        if (this.aiwptemplatesInsertList.length > 0 || this.aiwptemplatesUpdateList.length > 0) {
            for (let i = 0; i < this.aiwptemplatesInsertList.length; i++) {
                this.aiwptemplatesInsertList[i].activeFlag = this.aiwptemplatesInsertList[i].activeFlag ? 'Y' : 'N';
                this.aiwptemplatesInsertList[i].signatureAccess = this.aiwptemplatesInsertList[i].signatureAccess ? 'Y' : 'N';
                if (this.templateGridValidations(this.aiwptemplatesInsertList[i])) {
                    return;
                }
            }
            for (let i = 0; i < this.aiwptemplatesUpdateList.length; i++) {
                this.aiwptemplatesUpdateList[i].activeFlag = this.aiwptemplatesUpdateList[i].activeFlag ? 'Y' : 'N';
                this.aiwptemplatesUpdateList[i].signatureAccess = this.aiwptemplatesUpdateList[i].signatureAccess ? 'Y' : 'N';
                if (this.templateGridValidations(this.aiwptemplatesUpdateList[i])) {
                    return;
                }
            }
            this.aiwptemplatesCommitModel.insertList = this.aiwptemplatesInsertList;
            this.aiwptemplatesCommitModel.updateList = this.aiwptemplatesUpdateList;
        }
        /* if (this.aiwptemplatesDeleteList.length > 0) {
            for (let i = 0; i < this.aiwptemplatesDeleteList.length; i++) {
                if (this.aiwptemplatesDeleteList[i].relCount > 0) {
                    this.show(this.translateService.translate('oumdtemp.cannotdeletetemplatesifexistingscreenaccessrecordsexist'));
                    this.templategrid.removedMap.clear();
                    this.oumdtempexecuteQuery();
                    return;
                }
                if (this.aiwptemplatesDeleteList[i].iwpDocCount > 0) {
                    this.show(this.translateService.translate('oumdtemp.thistemplatehasassociateddocumentsandcannotbedeleted'));
                    this.templategrid.removedMap.clear();
                    this.oumdtempexecuteQuery();
                    return;
                }
            }
            this.aiwptemplatesCommitModel.deleteList = this.aiwptemplatesDeleteList;
        } */
        this.aiwptemplatesCommitModel.deleteList = this.aiwptemplatesDeleteList;
        const aiwptemplatesSaveData = this.oumdtempFactory.aIwpTemplatesCommit(this.aiwptemplatesCommitModel);
        aiwptemplatesSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.aiwptemplatesBean = new IwpTemplates();
                this.oumdtempexecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('oumdtemp.templatewiththisnamealreadyexists'));
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    validateRelationRowData = (event) => {
        const index = this.aiwptagrelationsData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag' && event.data.activeFlag) {
            this.relgrid.setColumnData('activeFlag', index, true);
            this.relgrid.setColumnData('expiryDate', index, undefined);
        } else if (event.field === 'activeFlag' && !event.data.activeFlag) {
            this.relgrid.setColumnData('activeFlag', index, false);
            this.relgrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        }
        rowdata.validated = true;
        return rowdata;
    }
    // execute query
    oumdtempexecuteQuery() {
        this.aiwptemplatesModel = new IwpTemplates();
        if (this.aiwptemplatesBean.objectType || this.aiwptemplatesBean.templateName ||
            this.aiwptemplatesBean.description ||
            this.aiwptemplatesBean.userCreated) {
            this.aiwptemplatesModel = this.aiwptemplatesBean;
        }
        const serviceObj = this.oumdtempFactory.
            aIwpTemplatesExecuteQuery(this.aiwptemplatesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.aiwptemplatesData = [];
                this.aiwptemplatesIndex = -1;
                this.show(this.translateService.translate('common.querycaused'));
                this.aiwptemplatesBean = new IwpTemplates();
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.signatureAccess = element.signatureAccess === 'Y' ? true : false;
                    element.button = '..';
                });
                this.aiwptemplatesData = data;
                for (let i = 0; i < this.aiwptemplatesData.length; i++) {
                    if(this.aiwptemplatesData[i].isTemplate == 'FALSE' || this.aiwptemplatesData[i].iwpDocCount == 0 ){
                        this.aiwptemplatesData[i]["importButton"] = 'assets/icons/eoff_icons/upload_24x24.png';
                    }else{
                        this.aiwptemplatesData[i]["importButton"] = '';
                    }
                    
                    this.aiwptemplatesData[i]["manageDocBtn"] = 'assets/icons/eoff_icons/edit_24x24.png';
                    if (this.aiwptemplatesData[i].isTemplate == "TRUE") {
                        this.aiwptemplatesData[i]["viewButton"] = 'assets/icons/eoff_icons/download_24x24.png';
                    } else {
                        this.aiwptemplatesData[i]["viewButton"] = '';
                    }
                    // this.aiwptemplatesData[i]["navImportTemplate"]='/OUMDTEMPDIALOG';
                }
                this.aiwptemplatesIndex = 0;
            }
        });
    }
    validateTemplateRowData = (event) => {
        const index = event.rowIndex; // this.aiwptemplatesData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'templateName' && event.data.objectType === 'REPORT' && event.data.templateName) {
            this.templategrid.setColumnData('description', index, this.intLocIdMap.get(event.data.templateName));
        }
        if (event.field === 'activeFlag' && event.data.activeFlag && event.data.createDatetime) {
            if (event.data.activeCheckFlag === 'context') {
                this.templategrid.setColumnData('activeFlag', index, false);
                this.show(this.translateService.translate('oumdtemp.templaterequirescontextspecificsetupcompletedbeforeitcanbeactive'));
            } else if (event.data.activeCheckFlag === 'Bookmark') {
                this.templategrid.setColumnData('activeFlag', index, false);
                this.show(this.translateService.translate('oumdtemp.templaterequiresbookmarkcontextspecificsetupcompletedbeforeitcanbeactive'));
            } else {
                this.templategrid.setColumnData('activeFlag', index, true);
                this.templategrid.setColumnData('expiryDate', index, undefined);
            }
        } else if (event.field === 'activeFlag' && !event.data.activeFlag) {
            this.templategrid.setColumnData('activeFlag', index, false);
            this.templategrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        }  else if (event.field === 'activeFlag' && event.data.activeFlag) {
            this.templategrid.setColumnData('activeFlag', index, true);
            this.templategrid.setColumnData('expiryDate', index, undefined);
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridInsert = () => {
        this.aiwptemplatesInsertData = [];
        this.templategrid.addedMap.forEach(
            (v: any, k: number) => {
                this.aiwptemplatesInsertData.push(v);
            }
        );
        for (let i = 0; i < this.aiwptemplatesInsertData.length; i++) {
            if (this.templateGridValidations(this.aiwptemplatesInsertData[i])) {
                return;
            }
        }
        return {
            button: '..', dateCreated: DateFormat.getDate(), userCreated: this.sessionManager.getId(),
            activeFlag: true
        };
    }
    templateGridValidations(event) {
        if (!event.objectType) {
            this.show(this.translateService.translate('common.typemustbeentereddot'), 'warn');
            return true;
        }
        if (!event.templateName) {
            this.show(this.translateService.translate('common.namemustbeentered'), 'warn');
            return true;
        }
        if (!event.description) {
            this.show(this.translateService.translate('common.descriptionmustbeentereddot'), 'warn');
            return true;
        }
        if (!event.dateCreated) {
            this.show(this.translateService.translate('oumdtemp.createdatemustbeentered'), 'warn');
            return true;
        }
        if (!event.userCreated) {
            this.show(this.translateService.translate('oumdtemp.createusermustbeentered'), 'warn');
            return true;
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveaiwptagrelationsForm(event) {
        this.aiwptagrelationsInsertList = event.added;
        this.aiwptagrelationsUpdateList = event.updated;
        this.aiwptagrelationsDeleteList = event.removed;
        this.aiwptagrelationsCommitModel.insertList = [];
        this.aiwptagrelationsCommitModel.updateList = [];
        this.aiwptagrelationsCommitModel.deleteList = [];
        if (this.aiwptagrelationsInsertList.length > 0 || this.aiwptagrelationsUpdateList.length > 0) {
            for (let i = 0; i < this.aiwptagrelationsInsertList.length; i++) {
                if (this.docValidations(this.aiwptagrelationsInsertList[i])) {
                    return true;
                }
                this.aiwptagrelationsInsertList[i].templateId = this.aiwptemplatesModel.templateId;
                this.aiwptagrelationsInsertList[i].activeFlag = this.aiwptagrelationsInsertList[i].activeFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.aiwptagrelationsUpdateList.length; i++) {
                if (this.docValidations(this.aiwptagrelationsUpdateList[i])) {
                    return true;
                }
                this.aiwptagrelationsUpdateList[i].activeFlag = this.aiwptagrelationsUpdateList[i].activeFlag ? 'Y' : 'N';
            }
            this.aiwptagrelationsCommitModel.insertList = this.aiwptagrelationsInsertList;
            this.aiwptagrelationsCommitModel.updateList = this.aiwptagrelationsUpdateList;
        }
        if (this.aiwptagrelationsDeleteList.length > 0) {
            for (let i = 0; i < this.aiwptagrelationsDeleteList.length; i++) {
            }
            this.aiwptagrelationsCommitModel.deleteList = this.aiwptagrelationsDeleteList;
        }
        const aiwptagrelationsSaveData = this.oumdtempFactory.aIwpTagRelationsCommit(this.aiwptagrelationsCommitModel);
        aiwptagrelationsSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oumdtempRelationexecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('oumdtemp.screenshortnameandblocknamesexists'), 'warn');
                this.iwpparametermappingsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    docValidations(event) {
        if (!event.moduleName) {
            this.show(this.translateService.translate('oumdtemp.screenshortnamemustbeentered'), 'warn');
            return true;
        }
        if (this.aiwptemplatesModel.contextRuleCount > 0 && !event.blockName) {
            this.show(this.translateService.translate('oumdtemp.blockcontextspecificonlymustbeentered'), 'warn');
            return true;
        }
        if (this.aiwptemplatesModel.contextRuleCount > 0 && !event.blockDescription) {
            this.show(this.translateService.translate('oumdtemp.blockdescriptionmustbeentered'), 'warn');
            return true;
        }
    }
    onGridrelInsert = () => {
        this.aiwptagrelationsRowData = [];
        this.relgrid.addedMap.forEach(
            (v: any, k: number) => {
                this.aiwptagrelationsRowData.push(v);
            }
        );
        this.relgrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.aiwptagrelationsRowData.push(v);
            }
        );
        if (this.aiwptagrelationsRowData.length > 1) {
            for (let i = 0; i < this.aiwptagrelationsRowData.length; i++) {
                if (this.docValidations(this.aiwptagrelationsRowData[i])) {
                    return;
                }
            }
        }
        return { activeFlag: true };
    }
    // execute query
    oumdtempRelationexecuteQuery() {
        const serviceObj = this.oumdtempFactory.
            aIwpTagRelationsExecuteQuery(this.aiwptagrelationsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.aiwptagrelationsData = [];
                this.aiwptagrelationsIndex = -1;
                this.aiwptagrelationsBean = new IwpTemplateModules();
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.aiwptagrelationsData = data;
                this.aiwptagrelationsIndex = 0;
            }
        });
    }
    

    iwpparametermappingsExecuteQuery() {
        const iwpparametermappingsResult = this.oumdtempFactory.
            iwpParameterMappingsExecuteQuery(this.iwpparametermappingsModel);
        iwpparametermappingsResult.subscribe(iwpparametermappingsResultList => {
            if (iwpparametermappingsResultList.length === 0) {
                this.iwpparametermappingsData = [];
                this.iwpparametermappingsIndex = -1;
            } else {
                iwpparametermappingsResultList.forEach(element => {
                    if (element.dataType === 'N') {
                        element.dataType = 'Number';
                    } else if (element.dataType === 'T') {
                        element.dataType = 'Text';
                    } else if (element.dataType === 'D') {
                        element.dataType = 'Date';
                    }
                    element.documentContextFlag = element.documentContextFlag === 'Y' ? true : false;
                });

                this.iwpparametermappingsData = iwpparametermappingsResultList;
                this.iwpparametermappingsModel = iwpparametermappingsResultList[0];
                this.iwpparametermappingsIndex = 0;
            }
        });
    }
    /**
        *  This function will be executed when commit event is
       * fired
       */
    saveiwpparametermappingsForm(event) {
        this.iwpparametermappingsUpdateList = [];
        this.iwpparametermappingsUpdateList = event.updated;
        this.iwpparametermappingsCommitModel.insertList = [];
        this.iwpparametermappingsCommitModel.updateList = [];
        this.iwpparametermappingsCommitModel.deleteList = [];
        if (this.iwpparametermappingsInsertList.length > 0 || this.iwpparametermappingsUpdateList.length > 0) {
            for (let i = 0; i < this.iwpparametermappingsUpdateList.length; i++) {
                this.iwpparametermappingsUpdateList[i].documentContextFlag = this.iwpparametermappingsUpdateList[i].documentContextFlag ? 'Y' : 'N';
            }
            this.iwpparametermappingsCommitModel.updateList = this.iwpparametermappingsUpdateList;
        }
        const iwpparametermappingsSaveData = this.oumdtempFactory.iwpParameterMappingsCommit(this.iwpparametermappingsCommitModel);
        iwpparametermappingsSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.iwpparametermappingsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    templrolesExecuteQuery() {
        const templrolesResult = this.oumdtempFactory.
            templRolesExecuteQuery(this.aiwptemplatesModel);
        templrolesResult.subscribe(templrolesResultList => {
            if (templrolesResultList.length === 0) {
                this.templrolesData = [];
                this.templrolesIndex = -1;
            } else {
                this.templrolesData = templrolesResultList;
                this.templrolesIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    savetemplrolesForm(event) {
        this.templrolesInsertList = [];
        this.templrolesDeleteList = [];
        this.templrolesInsertList = event.added;
        this.templrolesDeleteList = event.removed;
        this.templrolesCommitModel.insertList = [];
        this.templrolesCommitModel.deleteList = [];
        if (this.templrolesInsertList.length > 0 || this.templrolesUpdateList.length > 0) {
            for (let i = 0; i < this.templrolesInsertList.length; i++) {
                this.templrolesInsertList[i].templateId = this.aiwptemplatesModel.templateId;
                if (!this.templrolesInsertList[i].roleCode) {
                    this.show(this.translateService.translate('oumdtemp.rolenamemustbeentered'));
                    return;
                }
            }
            for (let i = 0; i < this.templrolesUpdateList.length; i++) {
            }
            this.templrolesCommitModel.insertList = this.templrolesInsertList;
            this.templrolesCommitModel.updateList = this.templrolesUpdateList;
        }
        if (this.templrolesDeleteList.length > 0) {
            for (let i = 0; i < this.templrolesDeleteList.length; i++) {
                this.templrolesDeleteList[i].templateId =  this.aiwptemplatesModel.templateId;
            }
            this.templrolesCommitModel.deleteList = this.templrolesDeleteList;
        }
        const templrolesSaveData = this.oumdtempFactory.templRolesCommit(this.templrolesCommitModel);
        templrolesSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.templrolesExecuteQuery();
            } else if (data === 2) {
                this.show(this.translateService.translate('oumdtemp.samerolealreadyexistsforthistemplate'));
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    onGridRolesInsert = () => {
        this.templrolesInsertData = [];
        this.rolegrid.addedMap.forEach(
            (v: any, k: number) => {
                this.templrolesInsertData.push(v);
            }
        );
        for (let i = 0; i < this.templrolesInsertData.length; i++) {
            if (!this.templrolesInsertData[i].roleCode) {
                this.show(this.translateService.translate('oumdtemp.rolenamemustbeentered'));
                return;
            }
        }
        return { button: '..', dateCreated: DateFormat.getDate(), userCreated: this.sessionManager.getId() };
    }
    onTempGridClear = () => {
        this.aiwptemplatesBean = new IwpTemplates();
        this.aiwptemplatesData = [];
        this.oumdtempexecuteQuery();
        return true;
    }
    onRelGridClear = () => {
        this.aiwptagrelationsModel.templateId = this.aiwptemplatesModel.templateId;
        this.oumdtempRelationexecuteQuery();
        return true;
    }

     downloadTemplate=(data)=>{
        let templateId;
        localStorage.removeItem('storedInfo');
        if (data.templateId && data.templateId != null) {
            templateId = data.templateId;
        }
        const documentStatus = this.oumdtempFactory.viewTemplate(templateId);
        documentStatus.subscribe(result => {
            // this.saveToFileSystem( result,data.templateName );
            this.documentService.templateDoc = result;
            this.documentService.templateName = data.templateName;
            this.documentService.templateType = data.objectType;
            this.documentService.templateId = templateId;
            this.documentService.docName = data.templateName;
            this.documentService.mode = 'RESTRICT';
            this.documentService.currentScreen = 'OUMDTEMP';
            this.redirectUtil.redirectToEditor();
        }, error => {
            this.documentService.templateName = data.templateName;
            this.documentService.templateId = templateId;
        });
     }


     getEliteDocInfo() {
        let addPayload = {
            settingProviderCode: "ELITE_DOC",
            settingType: "EliteDoc"
        };
        this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
            const rowData = JSON.parse(result.settingValue);
            if (rowData && rowData.length > 0) {
                for (let i = 0; i < rowData.length; i++) {
                    if (rowData[i].KEY_CODE == "ENABLE_NEWTAB" && rowData[i].VALUE == "Y") {
                        this.docEditInNewTab = true;
                    }
                }
            }
        });
    }
    onImportTemplateClick= (data) => {
        if (data && data.templateId) {
            const iwpDocCount = this.oumdtempFactory.getIwpDocCount(data.templateId);
            iwpDocCount.subscribe(count => {
                if ( count === 0) {
                    this.importTemplate(data);
                }else{
                    this.type= 'warn';
                    this.message= this.translateService.translate('oumdtemp.docattached');
                    this.showm();
                    return;
                }
            });
        }
    }

    importTemplate(data) {
        const dialogConfig = {
            disableClose: true,
            hasBackdrop: true,
            data: data,
            minWidth: '900px',
            height: 'auto',
            maxWidth: "85%",
            maxHeight: "100%",
            position: { top: '40px' }
        };
        this.dialogRef = this.matDialog.open(UploadtemplateComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = null;
            if (result) {
                  this.oumdtempexecuteQuery();
            }
        });
    }

    manageDocTemplate = (data) => {
        if (this.docEditInNewTab) {
            this.newTabNext(data)
            return;
        }

        let templateId;
        if (data.templateId && data.templateId != null) {
            templateId = data.templateId;
        }
        const documentStatus = this.oumdtempFactory.viewTemplate(templateId);
        documentStatus.subscribe(result => {
            this.documentService.templateDoc = result;
            this.documentService.templateName = data.templateName;
            this.documentService.templateType = data.objectType;
            this.documentService.templateId = templateId;
            this.documentService.docName = data.templateName;
            this.documentService.mode = 'EDIT';
            this.documentService.currentScreen = 'OUMDTEMP';
            this.redirectUtil.redirectToEditor();

        }, error => {
            this.documentService.templateName = data.templateName;
            this.documentService.templateId = templateId;
        });

    }


    newTabNext(event) {
        let url= window.location.href;
        url=url.split('#')[0];

        let bUrl = url + '#' + '/EDITDOC';
        let eoffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
        let selectedOffender = this.sessionManager.userSessionDetails().selectedOffender;
        let storedInfo = {
            "event": event,
            "eoffenderDetails": eoffenderDetails,
            "selectedOffender": selectedOffender,
            "currentScreen": 'OUMDTEMP',
            "mode": 'EDIT',
            "languageId":this.eoffenderService.languageId
        }
        localStorage.setItem('storedInfo', JSON.stringify(storedInfo))
        window.open(bUrl);
    }

     showm() {
         this.msglist = [];
         this.msglist.push( { message: this.message, type: this.type } );
         this.msgs = [...this.msglist];
     }

    saveToFileSystem( response,templateName ) {
       if(response.status == 204){
            this.type='warn';
            this.message=this.translateService.translate('Unsupported File Type');
            this.showm();
            return;
        }

      if(response.size == 0){
          this.type= 'warn';
          this.message= this.translateService.translate('No response');
          return;
      }
      
      templateName =  templateName + ".docx";

      saveAs( response, templateName);
      this.type= 'warn';
      this.message= this.translateService.translate('oumdtemp.templatesucess');
      this.showm();
    }

     getExtensionFromImage(imageUrl,Type){
        if(imageUrl == 'assets/icons/eoff_icons/word_file_25x25.png'){
            return '.docx';
        }else if(imageUrl == 'assets/icons/eoff_icons/pdf_file_25x25.png'){
            return '.doc';
        }
    }

    // dataModifyWatcher() {
    //     let that = this;
    //     that.dataModifiedInterval = setInterval(function () {
    //         let modify = JSON.parse(localStorage.getItem('modified'))
    //         if (modify && modify === true) {
    //             that.oumdtempexecuteQuery();
    //             localStorage.removeItem('modified');
    //         }
    //     }, 1000);
    // }

    openUploadDocDialog(){
        this.redirectUtil.redirectToUploadDoc('OUMDTEMP');
    }
    onScreenAccessGridDelete = () => {
        if (this.aiwptagrelationsBean && this.aiwptagrelationsBean.iwpDocCount>0) {
            this.show(this.translateService.translate('oumdtemp.screendeletevalidation'));
            return false;
        }
        return true;
    }
    onTemplateDelete = () => {
        if (this.aiwptagrelationsData && this.aiwptagrelationsData.length>0) {
            this.show(this.translateService.translate('oumdtemp.screendatavalidation'));
            return false;
        }
        if (this.templrolesData && this.templrolesData.length>0) {
            this.show(this.translateService.translate('oumdtemp.roledataalidation'));
            return false;
        }

        return true;
    }
    getSpellCheckLangId(){
        this.eoffenderService.getSpellCheckLangId().subscribe(result=>{
            if(result){
                this.eoffenderService.languageId=result;
            }
        });
    }

}
