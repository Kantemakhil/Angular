import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OffenderCaseNotes } from '@instCaseManagementbeans/OffenderCaseNotes';
import { OffenderCaseNotesCommitBean } from '@instCaseManagementbeans/OffenderCaseNotesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Renderer2, OnDestroy } from '@angular/core';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CaseLoads } from '@commonbeans/CaseLoads';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { OcdiplanService } from '../service/ocdiplan.service';
import { Location } from '@angular/common';
import { OcdvteamService } from '@inst/workflow/managingteams/service/ocdvteam.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OcdclogsService } from '@iwp/service/ocdclogs.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
    selector: 'app-oidcnote',
    templateUrl: './oidcnote.component.html'
})

export class OidcnoteComponent implements OnInit, OnDestroy {
    // Variable declaration
    @ViewChild('grid', { static: true }) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offnotesData: OffenderCaseNotes[] = [];
    offnotesDataTemp: OffenderCaseNotes[] = [];
    offnotesModel: OffenderCaseNotes = new OffenderCaseNotes();
    offnotesModelBean: OffenderCaseNotes = new OffenderCaseNotes();
    offnotesIndex: number;
    offnotesInsertList: OffenderCaseNotes[] = [];
    offnotesUpdatetList: OffenderCaseNotes[] = [];
    offnotesDeleteList: OffenderCaseNotes[] = [];
    offnotesCommitModel: OffenderCaseNotesCommitBean = new OffenderCaseNotesCommitBean();
    VHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    caseloadsmodel: CaseLoads = new CaseLoads();
    minDate: Date;
    screenId = 'OIDCNOTE';
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    caseloadType: string;
    caseNoteType1: string;
    disabled: boolean;
    editable: boolean;
    offNotesColumnDef: any[];
    offNotesReadOnly: boolean;
    cntlReadOnly: boolean;
    rgnotesourceRg: any[] = [];
    rgcasenotetypeRg: any[] = [];
    rgcasenotesubtypeRg: any[] = [];
    rgstaffnameRg: any[] = [];
    rgstaffnameRgTemp: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    buttonsenable: boolean;
    staffId: number;
    staffName: string;
    insertFlag: boolean;
    selected = -1;
    caseNoteTypelink: string;
    mandatoryField: boolean;
    buttonsdisabled: boolean;
    rowIndex: number;
    contactDate: Date;
    databaseDate: Date;
    offNotesDateReadOnly: boolean;
    buttondisabled: boolean;
    isSearchDisabled: boolean;
    clrbuttondisabled: boolean;
    selectedRowIndex: number;
    exitLaunchBtn = false;
    modulename: string;
    casePlanDisable = true;
    checkBoxDisable:Boolean;
    backBtn = false;
    checkFlag:boolean;
    routerChild: any[] = [];
    routerpath: string[] = [];
    checkBox1 : boolean;
    checkBox2 : boolean;
    checkBox3 : boolean;
    checkBox4 : boolean;
    checkBox5 : boolean;
    lovcount: number;
    noteSourceCode:string;
    currentDate: Date;
    constructor(private oidcnoteFactory: OidcnoteService, public translateService: TranslateService,
        private renderer: Renderer2, public sessionManager: UserSessionManager, private offenderSearchService: OffenderSearchService,
        private router: Router, private ocdmworkFactory: OcdmworkService, private ocdiplanFactory: OcdiplanService,
        private location: Location, private ocdvteamFactory: OcdvteamService, private dialogService: DialogService, 
        private ocdclogsFactory: OcdclogsService) {
        this.offNotesColumnDef = [];
    }
    ngOnInit() {
        this.checkBox1 = false;
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.checkBox4 = false;
        this.checkBox5 = false;
        if (this.ocdmworkFactory.exitFlag) {
            this.offenderSearchService.selectedOffender = this.ocdmworkFactory.vHeaderBlockServiceObj;
            this.ocdmworkFactory.vHeaderBlockServiceObj = new VHeaderBlock();
            this.exitLaunchBtn = true;
        }
        if (this.ocdiplanFactory.oidcnoteExitFlag) {
            this.exitLaunchBtn = true;
            this.casePlanDisable = true;
        }
        if (this.oidcnoteFactory.tempFlag) {
            this.exitLaunchBtn = this.oidcnoteFactory.previousExitFlag ? this.oidcnoteFactory.previousExitFlag : false;
            this.casePlanDisable = this.oidcnoteFactory.butExitFlag ? this.oidcnoteFactory.butExitFlag : true;
        }
        if (this.oidcnoteFactory.tempFlag && !this.offenderSearchService.selectedOffender) {
            this.casePlanDisable = true;
            this.exitLaunchBtn = false;
            this.oidcnoteFactory.tempFlag = false;

        }
        if (this.ocdvteamFactory.exitFlag) {
            this.backBtn = true;
        }
        this.databaseDate = DateFormat.getDate();
        this.contactDate = DateFormat.getDate(DateFormat.getDate().setMonth(this.databaseDate.getMonth() - 3));
        this.offnotesModelBean = new OffenderCaseNotes();
        this.offNotesReadOnly = true;
        // this.offNotesDateReadOnly = false;
        this.insertFlag = false;
        this.mandatoryField = true;
        this.buttonsdisabled = true;
        this.buttondisabled = true;
        this.clrbuttondisabled = true;
        this.caseNoteType1 = this.caseNoteType1 ? this.caseNoteType1 : '';
        this.VHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.isSearchDisabled = true;
        this.offNotesDateReadOnly = true;
        this.ocdclogsFactory.rgCasenoteTypeRecordGroup(this.caseloadType).subscribe(data=>{
            if(data.length===0){
                this.lovcount=0;
            }
        })
        this.offNotesColumnDef = [
            {
                fieldName: this.translateService.translate('oidcnote.date') + '*', field: 'contactDate', datatype: 'date',
                editable: false, width: 150 ,cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oidcnote.time') + '*', field: 'contactTime', datatype: 'time',
                editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('oidcnote.source'), field: 'noteSourceCode', datatype: 'lov',
                domain: 'NOTE_SOURCE', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidcnote.noteType') + '*', field: 'caseNoteType', datatype: 'lov',
                link: 'oidcnote/rgCasenoteTypeRecordGroup?caseloadType=' + this.caseloadType, optionWidth: 300,
                editable: true, width: 210, cellEditable: this.canCellEdit, source: 'OCMWORKS'
            },
            {
                fieldName: this.translateService.translate('oidcnote.notesubtype') + '*', field: 'caseNoteSubType', datatype: 'lov',
                link:'oidcnote/rgCasenoteSubtypeRecordGroup?caseloadType='+this.caseloadType+'&caseNoteType=',
                parentField: 'caseNoteType', optionWidth: 300, source: 'OCMWORKS',
                editable: true, width: 210, cellEditable: this.canCellEdit
            },
            {
				fieldName: this.translateService.translate('ocdclogs.casenotes'), field: 'caseNoteText', editable: false, datatype: 'text',
                wrapText: true, maxWidth: 500
			},
            {
                fieldName: this.translateService.translate('oidcnote.staffname') + '*', field: 'staffName', datatype: 'text',
                optionWidth: 300, editable: false, width: 210
            },
            {
                fieldName: this.translateService.translate('oidcnote.d'),
                field: 'dButton', datatype: 'hyperlink', displayas: 'href', linkField: 'navEoffender',
                data: 'row', editable: false, modal: false, typeValue: 'actionProperty', width: 150, queryparam: 'SCREEN', styleClass: 'file_copy'

            },
            {
                fieldName:this.translateService.translate('oidcnote.go'), field: 'goButton', datatype: 'hyperlink', link: '/OCDALERT', displayas: 'href',
                editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%',
                styleClass: 'launch', onLaunchClick: this.asnLaunchClick, type: ''
            },
            // {
            //     fieldName: '', field: 'rButton', datatype: 'hyperlink', link: '/OCUNOTCM', displayas: 'href',
            //     editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: '60%',
            //     onLaunchClick: this.rLaunchClick, styleClass: 'email', type: '',
            // },
            {
                fieldName: this.translateService.translate('oidcnote.a') , field: 'aButton', datatype: 'hyperlink', displayas: 'href',
                width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: 75,
                onLaunchClick: this.aLaunchClick, styleClass: 'edit', type: '',
            },
            {
                fieldName: this.translateService.translate('oidcnote.amended'), field: 'amendmentFlag',
                datatype: 'checkbox', editable: false, width: 150,
            },
            { fieldName: '', field: 'commentText', hide: true } ,
            { fieldName: '', field: 'caseNoteTextTemp', hide: true },
            { fieldName: '', field: 'createFlag', hide: true },
            
        ];

        const rgstaffnameServiceObj = this.oidcnoteFactory.
            rgStaffnameRecordGroup();
        rgstaffnameServiceObj.subscribe(rgstaffnameList => {
            if (rgstaffnameList.length === 0) {
                this.rgstaffnameRg = [];
                this.rgstaffnameRgTemp = [];
            } else {
                for (let i = 0; i < rgstaffnameList.length; i++) {
                    this.staffId = rgstaffnameList[i].staffId;
                    this.staffName = rgstaffnameList[i].staffName;
                    this.offnotesModel.staffName = this.staffName;
                }
            }
        });
        if (!this.VHeaderBlockModel || this.VHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        this.selected = -1;
        const rgnotesourceServiceObj = this.oidcnoteFactory.rgnoteSourceRecordGroup();
        rgnotesourceServiceObj.subscribe(rgnotesourceList => {
            if (rgnotesourceList.length === 0) {
                this.rgnotesourceRg = [];
            } else {
                for (let i = 0; i < rgnotesourceList.length; i++) {
                    this.rgnotesourceRg.push({
                        'text': rgnotesourceList[i].code + ' - ' +
                            rgnotesourceList[i].description, 'id': rgnotesourceList[i].code
                    });
                }
            }
        });
        const rgcasenotetypeServiceObj = this.oidcnoteFactory.rgCasenoteTypeRecordGroup(this.caseloadType);
        rgcasenotetypeServiceObj.subscribe(rgcasenotetypeList => {
            if (rgcasenotetypeList.length === 0) {
                this.rgcasenotetypeRg = [];
            } else {
                for (let i = 0; i < rgcasenotetypeList.length; i++) {
                    this.rgcasenotetypeRg.push({
                        'text': rgcasenotetypeList[i].description, 'id': rgcasenotetypeList[i].code
                    });
                }
            }
        });
        const routerComponets = this.router.config;
        this.routerpath = routerComponets.map(ele => ele.path);
        routerComponets.filter(ele => {
            if (ele.children && Array.isArray(ele.children)) {
                return true;
            } else {
                return false;
            }
        }).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
        this.routerpath.push(...this.routerChild);
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickoffnotes(event) {
        if (event) {
            this.offnotesModel = new OffenderCaseNotes();
            this.offnotesModel = event;
            if (this.offnotesModel.createDatetime) {
                this.offNotesReadOnly = true;
                this.checkBox1 = this.offnotesModel.checkBox1 === 'Y' ? true : false;
                this.checkBox4 = this.offnotesModel.checkBox2 === 'Y' ? true : false;
                this.checkBox2 = this.offnotesModel.checkBox3 === 'Y' ? true : false;
                this.checkBox5 = this.offnotesModel.checkBox4 === 'Y' ? true : false;
                this.checkBox3 = this.offnotesModel.checkBox5 === 'Y' ? true : false;
            } else {
                this.checkBox1 = false;
                this.checkBox2 = false;
                this.checkBox3 = false;
                this.checkBox4 = false;
                this.checkBox5 = false;
                this.offNotesReadOnly = false;
            }
            if (this.offnotesModel.caseNoteTextTemp) {
                if (this.offnotesModel.caseNoteTextTemp.includes('Check Box1')) {
                    this.offnotesModel.caseNoteTextTemp = this.offnotesModel.caseNoteTextTemp.replace('Check Box1',
                        this.translateService.translate('oidcnote.casenoteflga'));
                }
                if (this.offnotesModel.caseNoteTextTemp.includes('Check Box2')) {
                    this.offnotesModel.caseNoteTextTemp = this.offnotesModel.caseNoteTextTemp.replace('Check Box2',
                        this.translateService.translate('oidcnote.casenoteflgc'));
                }
                if (this.offnotesModel.caseNoteTextTemp.includes('Check Box3')) {
                    this.offnotesModel.caseNoteTextTemp = this.offnotesModel.caseNoteTextTemp.replace('Check Box3',
                        this.translateService.translate('oidcnote.casenoteflgb'));
                }
                if (this.offnotesModel.caseNoteTextTemp.includes('Check Box4')) {
                    this.offnotesModel.caseNoteTextTemp = this.offnotesModel.caseNoteTextTemp.replace('Check Box4',
                        this.translateService.translate('oidcnote.casenoteflgd'));
                }
                if (this.offnotesModel.caseNoteTextTemp.includes('Check Box5')) {
                    this.offnotesModel.caseNoteTextTemp = this.offnotesModel.caseNoteTextTemp.replace('Check Box5',
                        this.translateService.translate('oidcnote.casenoteflge'));
                }
            }
            if (this.offnotesModel.timeCreation) {
                this.offnotesModel.timeCreation = DateFormat.getDate(this.offnotesModel.timeCreation);
            }
        }
    }

    offNotesClear = () => {
        this.offnotesModel = new OffenderCaseNotes();
        if (this.offnotesData.length === (this.grid.addedMap ? this.grid.addedMap.size : -1)) {
            this.offnotesExecuteQueryForSearch();
        } else {
            this.offnotesExecuteQuery();
        }
        return true;
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'contactDate') {
            if (!data.createDatetime) {
                return true;
            } 
        }
        if(this.lovcount===0){
            this.type = 'warn';
            this.message = this.translateService.translate('User group is not configured for case note');
            this.show();
            return false;
        }
        if (data.caseNoteId) {
            return false;
        } else {
            return true;
        }
       

    }
    changelovvalues = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.oldValue !== event.newValue) {
            this.caseNoteType1 = event.data.caseNoteType;
           // this.caseNoteTypelink = 'oidcnote/rgCasenoteSubtypeRecordGroup?caseNoteType=' + this.caseNoteType1;
            //this.offNotesColumnDef[0].link = this.caseNoteTypelink;
            this.grid.prepareAgColumnDef();
            rowdata.validated = true;
        }
        return rowdata;
    }
    aLaunchClick = (event) => {
        this.selectedRowIndex = 0;
        if (event) {
            if(event.createFlag === 'N'){
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.youdonothavepermissionstoamendthiscasenote');
                this.show();
                return false;
            }

            if (!event.caseNoteId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleasesavethecasenotebefore');
                this.show();
                return false;
            } else {
                this.selectedRowIndex = this.offnotesData.indexOf(event);
                const modelData = event;
                modelData['checkBox1'] = 'oidcnote.casenoteflga';
                modelData['checkBox2'] = 'oidcnote.casenoteflgc';
                modelData['checkBox3'] = 'oidcnote.casenoteflge';
                modelData['checkBox4'] = 'oidcnote.casenoteflgb';
                modelData['checkBox5'] = 'oidcnote.casenoteflgd';
                this.dialogService.openLinkDialog('ocucname', modelData).subscribe(resData => {
                    if (resData) {
                        this.offnotesExecuteQuery();
                    }
                });
                return true;
            }

        }
    }
    rLaunchClick = (event) => {
        this.selectedRowIndex = 0;
        if (event) {
            if (!event.caseNoteId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleasesavethechanges');
                this.show();
                return false;
            } else {
                return true;
            }

        }
    }

    asnLaunchClick = (event) => {
        this.selectedRowIndex = 0;
        if (event) {
            if (!event.caseNoteId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleasesavethecasenote');
                this.show();
                return false;
            }
            if (event.moduleName) {
                const childScreen = this.routerChild.includes(event.moduleName) ? true : false;
                const parentScreen = this.routerpath.includes(event.moduleName) ? true : false;
                const suffix = this.routerChild.includes(event.moduleName) ? 'DIALOG' : '';
                if (!childScreen && !parentScreen) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.cannotreadform');
                    this.message = String(this.message).replace('@MODNAME@', event.moduleName);
                    this.show();
                    return;
                } else if (suffix !== 'DIALOG') {
                    this.dialogService.openLinkDialog(event.moduleName, event, 80).subscribe(result => {
                    });
                } else {
                    this.router.navigate(['/' + event.moduleName]);
                }
                // if (event.moduleName === 'OMUABAIL') {
                //     this.type = 'warn';
                //     this.message = this.translateService.translate('Cannot read form OMUABAIL.');
                //     this.show();
                // } else {
                //  this.oidcnoteFactory.launchFlag = true;
                // this.modulename = '/' + event.moduleName;
                // this.router.navigate([this.modulename]);
                // }
                // if ((event.noteSourceCode === 'AUTO') && (event.caseNoteType === 'ALERT')) {
                //     this.oidcnoteFactory.launchFlag = true;
                //     this.router.navigate(['/OCDALERT']);
                //     return false;
                // }
                // if ((event.noteSourceCode === 'INST') && (event.caseNoteType === 'ALERT')) {
                //     this.oidcnoteFactory.launchFlag = true;
                //     this.router.navigate(['/OCDALERT']);
                //     return false;
                // }
                // if ((event.caseNoteType === 'MOVEMENT') && (event.caseNoteSubType === 'TRN')) {
                //     this.oidcnoteFactory.launchFlag = true;
                //     this.router.navigate(['/OIIEMOVE']);
                //     return false;
                // }
                // if ((event.noteSourceCode === 'INST') && (event.caseNoteType === 'APP')) {
                //     this.type = 'warn';
                //     this.message = this.translateService.translate('oidcnote.noscreenassociated');
                //     this.show();
                // }
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.noscreenassociated');
                this.show();
                return false;
            }
        } else {
            return true;
        }
    }

    clear() {
        this.clrbuttondisabled = true;
        // this.buttondisabled = true;
        this.isSearchDisabled = true;
        this.offNotesDateReadOnly = false;
        this.offNotesReadOnly = true;
        this.mandatoryField = true;
        this.offnotesData = [];
        this.offnotesModel = new OffenderCaseNotes();
        this.offnotesModelBean = new OffenderCaseNotes();
        this.selectedRowIndex = 0;
        this.offnotesModelBean.fromDate = undefined;
        this.offnotesModelBean.toDate = undefined;
        this.checkBox1 = false;
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.checkBox4 = false;
        this.checkBox5 = false;
    }

    isSelectDisabled() {
        if (this.offnotesModelBean.toDate ||
            this.offnotesModelBean.fromDate ||
            !this.buttondisabled) {
            return false;
        }
        return true;
    }
    fromDateBlur(){
      //  this.isSearchDisabled = false;
      
    }
    toDateBlur(){
       // this.isSearchDisabled = false;
      
    }

    onOffenderChange(offender) {
        this.offnotesModelBean = new OffenderCaseNotes();
        this.VHeaderBlockModel = offender;
        if (offender) {
            this.currentDate = DateFormat.getDate();
            this.offnotesModelBean.fromDate=DateFormat.getDate(DateFormat.getDate().setMonth(this.currentDate.getMonth() - 1))
            this.offnotesModelBean.toDate=DateFormat.getDate();
            this.offnotesData = [];
           this.isSearchDisabled = false;
            this.buttonsdisabled = true;
            this.buttondisabled = false;
            this.clrbuttondisabled = false;
            this.mandatoryField = true;
            this.offNotesDateReadOnly=false;
            this.offnotesModel = new OffenderCaseNotes();
            this.selectedRowIndex = 0;
            if (this.ocdiplanFactory.oidcnoteExitFlag) {
                this.exitLaunchBtn = true;
                this.casePlanDisable = true;
            } else if (this.oidcnoteFactory.tempFlag) {
                this.exitLaunchBtn = this.oidcnoteFactory.previousExitFlag;
                this.casePlanDisable = this.oidcnoteFactory.butExitFlag;
                this.oidcnoteFactory.tempFlag = false;
            } else {
                this.casePlanDisable = false;
            }
            this.offnotesExecuteQueryForSearch(this.offnotesModelBean.fromDate,this.offnotesModelBean.toDate, false);
        } else {
            this.offnotesData = [];
            this.buttonsdisabled = true;
            this.buttondisabled = true;
            this.clrbuttondisabled = true;
            this.mandatoryField = false;
            this.insertFlag = false;
            this.offnotesModel = new OffenderCaseNotes();
            this.selectedRowIndex = 0;
            this.casePlanDisable = true;
            this.oidcnoteFactory.tempFlag = false;
            this.isSearchDisabled = true;
            this.offNotesDateReadOnly=true;
        }
    }
    fromDateButton(){
     this.isSearchDisabled=(this.offnotesModelBean.fromDate || this.offnotesModelBean.toDate)?false:true;
    }
    offnotesExecuteQueryForSearch(fromDate?, toDate?, showValidtion?) {
        if (fromDate) {
            if (fromDate.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.offnotesModelBean.fromDate = undefined;
                return;
            }
            if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                this.offnotesModelBean.fromDate = undefined;
                return;
            }
            if (!this.offnotesModelBean.fromDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.formdatevalidation');
                this.show();
                return;
            }
        }
        if (toDate) {
            if (toDate.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.offnotesModelBean.toDate = undefined;
                return;
            }
            if (String(toDate.lastValue).indexOf('_') >= 0 && toDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                this.offnotesModelBean.toDate = undefined;
                return;
            }
        }
        if (this.offnotesModelBean.fromDate && this.offnotesModelBean.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.offnotesModelBean.fromDate),
                DateFormat.getDate(this.offnotesModelBean.toDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.fromdatecannotbelater');
                this.show();
                return;
            }
        }

        this.offnotesModelBean.offenderBookId = this.VHeaderBlockModel.offenderBookId;
        const offnotesResult = this.oidcnoteFactory.offNotesExecuteQuery(this.offnotesModelBean);
        offnotesResult.subscribe(data => {
            if (data.length === 0) {
                this.offnotesData = [];
                this.offNotesReadOnly = true;
                this.offnotesModel = new OffenderCaseNotes();
                this.insertFlag = true;
                if(showValidtion !== false){
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                }
                return;
            } else {
                this.offnotesData = data;
                this.isSearchDisabled = true;
                this.insertFlag = true;
                this.mandatoryField = true;
                this.offNotesDateReadOnly = true;
                for (let i = 0; i < this.offnotesData.length; i++) {
                    //
                    this.offnotesData[i].caseNoteTextTemp = this.offnotesData[i].caseNoteText;
                    this.offnotesData[i].dButton = '';
                    this.offnotesData[i].goButton = '';
                    this.offnotesData[i].rButton = '';
                    this.offnotesData[i].aButton = '';
                    this.offnotesData[i].navEoffender = '/EOFFENDER';
                    this.offnotesData[i].SCREEN = this.screenId + "~" + "true" + "~" + this.offnotesData[i].caseNoteId;
                    this.offnotesData[i].amendmentFlag = this.offnotesData[i].amendmentFlag === 'Y' ?
                    this.offnotesData[i].amendmentFlag : undefined;
                    this.offnotesData[i].pObjectType = 'CNOTE';
                    this.offnotesData[i].pModuleName = 'OIDCNOTE';
                    this.selected = 0;
                    this.offnotesModel = data;
                    //this.offNotesReadOnly = true;
                    // this.buttondisabled = false;
                    this.clrbuttondisabled = false;
                    this.offnotesModel = new OffenderCaseNotes();
                }
                this.offnotesData.sort(this.offenderSearchService.compare);
            }
        });

    }


    offnotesExecuteQuery() {
        this.offnotesModel = new OffenderCaseNotes();
        this.offnotesModel.fromDate=this.offnotesModelBean.fromDate;
        this.offnotesModel.toDate=this.offnotesModelBean.toDate;
        this.offnotesModel.offenderBookId = this.VHeaderBlockModel.offenderBookId;
        const offnotesResult = this.oidcnoteFactory.offNotesExecuteQuery(this.offnotesModel);
        offnotesResult.subscribe(data => {
            if (data.length === 0) {
                this.offnotesData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                this.insertFlag = true;
                this.offNotesReadOnly = true;
            } else {
                this.offnotesData = data;
                this.buttonsdisabled = true;
                this.insertFlag = true;
                for (let i = 0; i < this.offnotesData.length; i++) {
                    //
                    this.offnotesData[i].caseNoteTextTemp = this.offnotesData[i].caseNoteText;
                    this.offnotesData[i].dButton = '';
                    this.offnotesData[i].navEoffender = '/EOFFENDER';
                    this.offnotesData[i].SCREEN = this.screenId + "~" + "true" + "~" + this.offnotesData[i].caseNoteId;
                    this.offnotesData[i].goButton = '';
                    this.offnotesData[i].rButton = '';
                    this.offnotesData[i].aButton = '';
                    this.offnotesData[i].pObjectType = 'CNOTE';
                    this.offnotesData[i].pModuleName = 'OIDCNOTE';
                    this.offnotesData[i].amendmentFlag = this.offnotesData[i].amendmentFlag === 'Y' ?
                        this.offnotesData[i].amendmentFlag : undefined;
                    this.selected = 0;
                    if (this.selectedRowIndex !== 0) {
                        this.selected = this.selectedRowIndex;
                    }
                    this.offnotesModel = data;
                    //this.offNotesReadOnly = true;
                    this.offNotesDateReadOnly = true;
                    this.mandatoryField = true;
                    // this.buttondisabled = false;
                    this.clrbuttondisabled = false;
                    this.isSearchDisabled = true;
                }
                this.offnotesData.sort(this.offenderSearchService.compare);
            }
        });
    }
    
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidcnoteSaveoffnotesForm(event) {
        this.offnotesInsertList = event.added;
        this.offnotesUpdatetList = event.updated;
        this.offnotesDeleteList = event.removed;
        this.offnotesCommitModel.insertList = [];
        this.offnotesCommitModel.updateList = [];
        this.offnotesCommitModel.deleteList = [];
        if (this.offnotesInsertList.length > 0) {
            for (let i = 0; i < this.offnotesInsertList.length; i++) {
                if (!this.offnotesInsertList[i].contactDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercontactdate');
                    this.show();
                    return;
                }
                if (!this.offnotesInsertList[i].contactTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercontacttime');
                    this.show();
                    return;
                }
                if (!this.offnotesInsertList[i].caseNoteType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotetype');
                    this.show();
                    return;
                }
                if (!this.offnotesInsertList[i].caseNoteSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotesubtype');
                    this.show();
                    return;
                }
                if (!this.offnotesInsertList[i].caseNoteTextTemp) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotetext');
                    this.show();
                    return;
                }
               
                if (DateFormat.compareDate(DateFormat.getDate(this.VHeaderBlockModel.bookingBeginDate),
                    DateFormat.getDate(this.offnotesInsertList[i].contactDate)) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbebeforetheoffenderbookingbegindate');
                    this.show();
                    return;
                }

                if (DateFormat.compareDate(DateFormat.getDate(this.offnotesInsertList[i].contactDate),
                    DateFormat.getDate()) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbefuture');
                    this.show();
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.offnotesInsertList[i].contactDate),
                    DateFormat.getDate(this.contactDate)) === -1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbe3months');
                    this.show();
                    return;
                }
                this.offnotesInsertList[i].offenderBookId = this.VHeaderBlockModel.offenderBookId;
                this.offnotesInsertList[i].staffId = Number(this.offnotesModel.staffIdTemp);
                this.offnotesInsertList[i].timeCreation = DateFormat.getDate();
                this.offnotesInsertList[i].caseNoteText = this.offnotesInsertList[i].caseNoteTextTemp;
                if (this.offnotesInsertList[i].amendmentFlag) {
                    this.offnotesInsertList[i].amendmentFlag = 'Y';
                } else {
                    this.offnotesInsertList[i].amendmentFlag = 'N';
                }
                if (this.offnotesInsertList[i].iwpFlag) {
                    this.offnotesInsertList[i].iwpFlag = 'Y';
                } else {
                    this.offnotesInsertList[i].iwpFlag = 'N';
                }
                if (this.offnotesInsertList[i].checkBox1) {
                    this.offnotesInsertList[i].checkBox1 = 'Y';
                } else {
                    this.offnotesInsertList[i].checkBox1 = 'N';
                }
                if (this.offnotesInsertList[i].checkBox2) {
                    this.offnotesInsertList[i].checkBox2 = 'Y';
                } else {
                    this.offnotesInsertList[i].checkBox2 = 'N';
                }
                if (this.offnotesInsertList[i].checkBox3) {
                    this.offnotesInsertList[i].checkBox3 = 'Y';
                } else {
                    this.offnotesInsertList[i].checkBox3 = 'N';
                }
                if (this.offnotesInsertList[i].checkBox4) {
                    this.offnotesInsertList[i].checkBox4 = 'Y';
                } else {
                    this.offnotesInsertList[i].checkBox4 = 'N';
                }
                if (this.offnotesInsertList[i].checkBox5) {
                    this.offnotesInsertList[i].checkBox5 = 'Y';
                } else {
                    this.offnotesInsertList[i].checkBox5 = 'N';
                }
            }

        }
        if (this.offnotesUpdatetList.length > 0) {
            for (let i = 0; i < this.offnotesUpdatetList.length; i++) {
                if (this.offnotesUpdatetList[i].amendmentFlag) {
                    this.offnotesUpdatetList[i].amendmentFlag = 'Y';
                } else {
                    this.offnotesUpdatetList[i].amendmentFlag = 'N';
                }

                if (!this.offnotesUpdatetList[i].contactDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercontactdate');
                    this.show();
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.VHeaderBlockModel.bookingBeginDate),
                    DateFormat.getDate(this.offnotesUpdatetList[i].contactDate)) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbebeforetheoffenderbookingbegindate');
                    this.show();
                    return;
                }
                if (DateFormat.compareDate(DateFormat.getDate(this.offnotesUpdatetList[i].contactDate),
                    DateFormat.getDate()) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbefuture');
                    this.show();
                    return;
                }

                if (DateFormat.compareDate(DateFormat.getDate(this.offnotesUpdatetList[i].contactDate),
                    DateFormat.getDate(this.contactDate)) === -1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.datecannotbe3months');
                    this.show();
                    return;
                }
                if (!this.offnotesUpdatetList[i].contactTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercontacttime');
                    this.show();
                    return;
                }
                if (!this.offnotesUpdatetList[i].caseNoteType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotetype');
                    this.show();
                    return;
                }
                if (!this.offnotesUpdatetList[i].caseNoteSubType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotesubtype');
                    this.show();
                    return;
                }
                if (!this.offnotesUpdatetList[i].caseNoteTextTemp) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidcnote.pleaseentercasenotetext');
                    this.show();
                    return;
                }
                this.offnotesUpdatetList[i].caseNoteText = this.offnotesUpdatetList[i].caseNoteTextTemp;
                this.offnotesCommitModel.updateList = this.offnotesUpdatetList;
            }
        }
        this.offnotesCommitModel.insertList = this.offnotesInsertList;
        const offnotesSaveData = this.oidcnoteFactory.offNotesCommit(this.offnotesCommitModel);
        offnotesSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offnotesExecuteQuery();
                this.offNotesClear();
                // if (this.offnotesInsertList.length > 0){ 
                //     this.offnotesExecuteQuery();
                // } 
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });

    }
    onCasenotesInsert = () => {
        this.offNotesReadOnly = false;
        this.mandatoryField = true;
        this.noteSourceCode = undefined;
		const sourceCode = undefined;;
		if (this.sessionManager.currentCaseLoadType === 'INST') {
			this.noteSourceCode = 'INST';
		} else {
			this.noteSourceCode = 'COMM';
		}
        if (this.offnotesData.length > 0) {
            if (!this.offnotesData[this.offnotesData.length - 1].contactDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleaseentercontactdate');
                this.show();
                return false;
            }
            if (!this.offnotesData[this.offnotesData.length - 1].contactTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleaseentercontacttime');
                this.show();
                return;
            }
            if (!this.offnotesData[this.offnotesData.length - 1].caseNoteType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleaseentercasenotetype');
                this.show();
                return;
            }
            if (!this.offnotesData[this.offnotesData.length - 1].caseNoteSubType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleaseentercasenotesubtype');
                this.show();
                return;
            }
            //            if (!this.offnotesData[this.offnotesData.length - 1].caseNoteText) {
            //                this.type = 'warn';
            //                this.message = this.translateService.translate('oidcnote.pleaseentercasenotetext');
            //                this.show();
            //                return;
            //            }
        }
        return {
            noteSourceCode: this.noteSourceCode, 
            nbtCaseNoteType: '', nbtNoteSubType: '', staffIdTemp: this.staffId,
            dButton: '', goButton: '', staffName: this.staffName,
            rButton: '', aButton: '', contactDate: DateFormat.getDate(), contactTime: DateFormat.getDate(),
            dateCreation: DateFormat.getDate(), timeCreation: DateFormat.getDate().getTime(),
            pObjectType: 'CNOTE', pModuleName: 'OIDCNOTE', offenderBookId: this.VHeaderBlockModel.offenderBookId
        };
    }
    dateChangeEvent = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
       
        if (event.field === 'caseNoteSubType' && event.data.caseNoteSubType && (event.newValue !== event.oldValue)) {
            const serviceObj = this.oidcnoteFactory.checkCasenoteSubType(event.data.caseNoteType, event.data.caseNoteSubType);
            serviceObj.subscribe(data => {
                if(data === 'N'){
                    this.grid.setColumnData('createFlag', event.rowIndex, false);
                }else{
                    this.grid.setColumnData('createFlag', event.rowIndex, true);
                }
            })
        }
        if (event.field === 'contactDate' && !event.data.contactDate && (event.newValue !== event.oldValue) && event.newValue) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidcnote.pleaseentercontactdate');
            this.show();
            // event.data.contactDate = event.oldValue;
            // this.offnotesExecuteQuery();
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.contactDate) {
            if (DateFormat.compareDate(DateFormat.getDate(event.data.contactDate),
                DateFormat.getDate(this.contactDate)) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.datecannotbe3months');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.data.contactDate) {
            if (DateFormat.compareDate(DateFormat.getDate(event.data.contactDate),
                DateFormat.getDate()) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.datecannotbefuture');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event) {
            if (!event.data.contactTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidcnote.pleaseentercontacttime');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'caseNoteType') {
            this.grid.setColumnData('caseNoteSubType', event.rowIndex, undefined);
            this.grid.setColumnData('caseNoteText', rowIndex,undefined);
			this.offnotesModel.caseNoteTextTemp = undefined;
            rowdata.validated = true;
            return rowdata;
        }

        if(event.field=='caseNoteSubType'){
            this.grid.setColumnData('caseNoteText', rowIndex,undefined);
			this.offnotesModel.caseNoteTextTemp = undefined;
			const serviceObj = this.ocdclogsFactory.caseNoteTextData(event.data);
			serviceObj.subscribe(data => {
				if (data) {
                    this.grid.setColumnData('caseNoteText', rowIndex,data);
                    this.offnotesModel.caseNoteTextTemp = data;
			        rowdata.validated = true;
			        return rowdata;
				} else {
					this.offnotesModel.caseNoteText = undefined;
				}
			})
			rowdata.validated = true;
			return rowdata;
			
		}

        rowdata.validated = true;
        return rowdata;
    }
    onExitBtnClick = () => {
        if (this.ocdmworkFactory.exitFlag) {
            this.ocdmworkFactory.exitFlag = false;
            this.router.navigate(['/OCDMWORK']);
        }
        if (this.ocdiplanFactory.butExitCasePlanFlag) {
            this.oidcnoteFactory.butExitCasePlanFlag = true;
            this.ocdiplanFactory.routeUrl = this.router.url;
            this.location.back();
            return true;
        } else {
            this.ocdiplanFactory.oidcnoteExitFlag = undefined;
            this.ocdiplanFactory.routeUrl = undefined;
            this.location.back();
            return true;
        }
    }
    onbackBtnClick = () => {
        if (this.ocdvteamFactory.exitFlag) {
            this.ocdvteamFactory.exitFlag = false;
            this.backBtn = false;
            this.router.navigate(['/OCDVTEAM']);
        }
    }
    ngOnDestroy(): void {
        this.ocdmworkFactory.exitFlag = false;
        this.ocdiplanFactory.oidcnoteExitFlag = undefined;
        this.ocdiplanFactory.routeUrl = undefined;
        // this.ocdvteamFactory.exitFlag = false;
        this.backBtn = false;
    }
    onButLaunchClick = () => {
        this.oidcnoteFactory.exitFlag = true;
        this.oidcnoteFactory.previousExitFlag = this.exitLaunchBtn;
        this.oidcnoteFactory.butExitFlag = this.casePlanDisable;
        this.oidcnoteFactory.tempFlag = false;
        this.oidcnoteFactory.backButton=true;
        return true;
    }
    onCasePlanClick = () => {
        this.oidcnoteFactory.exitCaseNoteFlag = true;
        this.ocdiplanFactory.routeUrl = this.router.url;
        return true;
    }
    isInsertable(event) {
        const index = this.offnotesData.indexOf(this.offnotesModel);
        this.offnotesModel.caseNoteTextTemp = event;
        this.grid.setColumnData('commentText', index, event);
    }
    get clearBtnDisable() {
        if (this.offnotesData.length > 0 || this.offnotesModelBean.fromDate || this.offnotesModelBean.toDate) {
            return false
        }
        return true;
    }
}
