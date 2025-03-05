import { Component, OnInit, ViewChild } from "@angular/core";
import { Offenders } from "@common/beans/Offenders";
import { VHeaderBlock } from "@common/beans/VHeaderBlock";
import { TranslateService } from "@common/translate/translate.service";
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { IEPLevelBean } from "@inst/visits-management/beans/ieplevelbean";
import { IEPLevelCommitBean } from '@inst/visits-management/beans/IepLevelCommitBean';
import { OidieplvService } from '@inst/visits-management/service/oidieplv.service';
import { ValidateRowReturn } from "@core/ui-components/grid/grid.component";
import { UserSessionManager } from "@core/classes/userSessionManager";



@Component({
    selector: 'app-oidieplv',
    templateUrl: './oidieplv.component.html'
})

export class OidieplvComponent implements OnInit {

    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    addFlag: boolean = false;
    iepLevelRowdata: IEPLevelBean[] = [];
    iepLevelColumnDef: any = [];
    msgs: any[] = [];
    reviewDays: number = 10;
    defautOffenderBookId: number;
    tableIndex: number = -1;
    offenderCommitBeanIep: IEPLevelCommitBean = new IEPLevelCommitBean();
    offenderIepBean: IEPLevelBean = new IEPLevelBean();
    offenderBookId: number;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    iepOffenderInsertList: IEPLevelBean[] = [];
    iepOffenderUpdateList: IEPLevelBean[] = [];
    iepOffenderDeleteList: IEPLevelBean[] = [];
    staffName: string;
    staffId: number;
    selectedIepLevelCode: string;
    reviewDaysForIep: number;
    iepCodeRevwDays: Map<string, Number> = new Map<string, Number>();
    duplicateIep:boolean;
    @ViewChild('grid', { static: true }) grid: any;
    staffMailId : string;
    workingCaseloadId: string;
    tempIepLevelCode:string;
    tempIepLevelDate:Date;
    constructor(public translateService: TranslateService, public oidieplvService: OidieplvService, public sessionManager:UserSessionManager) {

    }

    ngOnInit(): void {
        this.getReviewDaysForIep() ;
        this.iepLevelColumnDef = [
            {

                fieldName: this.translateService.translate('oidieplv.iepLevelCode'), field: 'iepLevelCode', editable: true, width: 150,
                datatype: 'lov', link: '/oidieplv/getIEPLOvs', required: true, source: 'OIMIEPLV', cellEditable: this.canDomainCellEdit

            },
            {
                fieldName: this.translateService.translate('oidieplv.dateAsigned'), field: 'dateAsigned', editable: false, width: 150,
                datatype: 'date', required: true
            },
            {
                fieldName: this.translateService.translate('oidieplv.approvedStaff'), field: 'approvedStaff', editable: false, width: 150,
                datatype: 'text', required: true
            },
            {
                fieldName: this.translateService.translate('oidieplv.reviewComment'), field: 'reviewComment', editable: true, width: 320,
                datatype: 'text', uppercase: 'false',cellEditable: this.canCellEdit,maxlength: 250
            },
            {
                fieldName: this.translateService.translate('oidieplv.nextReviewDate'), field: 'nextReviewDate',  width: 150, editable: true, 
                datatype: 'date'
            }
        ]

       
    }

    canDomainCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderBookId = offender.offenderBookId;
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.defautOffenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offenderIepBean.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            this.addFlag = true;
            this.getAllIepLevelcodes();
            this.getStaffName();
            this.getIepCodeAndReviewDays();
        } else {
            this.iepLevelRowdata = [];
            this.addFlag = false;
        }
    }
    validateOffVstPerRowChange = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        rowdata.validated = true;
        if (event.field === 'iepLevelCode' && event.data.iepLevelCode) {
            if(this.iepCodeRevwDays.get(event.data.iepLevelCode) != null){
                this.grid.setColumnData('nextReviewDate', index, DateFormat.getDate(DateFormat.getDate().setDate(DateFormat.getDate().getDate() + Number(this.iepCodeRevwDays.get(event.data.iepLevelCode)))));
            }
            else{
                this.grid.setColumnData('nextReviewDate', index, undefined);
            }
            
        } else if(event.field === 'iepLevelCode' && !event.data.iepLevelCode) {
            this.grid.setColumnData('nextReviewDate', index, undefined);
            this.grid.setColumnData('reviewComment', index, undefined);
        }
        if (event.field ==='nextReviewDate' && event.data.nextReviewDate) {
            const date = DateFormat.getDate().setDate (DateFormat.getDate().getDate()+ 1);                          
            if (DateFormat.compareDate(DateFormat.getDate(event.data.nextReviewDate),DateFormat.getDate(date) ) <  0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidieplv.nextreviewdategreatervalidation');
                this.show();
                return rowdata;
            }                    
        }
        return rowdata;
    }

    getReviewDaysForIep() {
        const obj = this.oidieplvService.getReviewDaysForIepLevelCode();
        obj.subscribe(data => {
            if (data) {
                data.forEach(e => {
                    this.iepCodeRevwDays.set(e.iepLevelCode, e.reviewDays);
                });
            }
        });
    }

    onGridReady = () => {
        this.addFlag=false;
        return {
            dateAsigned: DateFormat.getDate(),
            approvedStaff: this.staffName
        }
    }


    getIepCodeAndReviewDays() {
        const result = this.oidieplvService.getIEPLov();
        result.subscribe(data => {
            if (data) {
                this.offenderIepBean = data[0];
            }
        });
    }
    getStaffName() {
        const name = this.oidieplvService.getStaffId();
        name.subscribe(data => {
            this.staffName = data.staffName;
            this.staffId = data.staffId;
            this.staffMailId = data.mailId; 
            this.workingCaseloadId = this.sessionManager.currentCaseLoadName; 
            })
    }

    OnSaveOffenderIepLevel(event) {
        this.duplicateIep=false;

        this.iepOffenderInsertList = [];
        this.iepOffenderUpdateList = [];

        this.iepOffenderInsertList = event.added;
        this.iepOffenderUpdateList = event.updated;

        if (this.iepOffenderInsertList.length > 0) {
            this.tempIepLevelDate
            if ((this.iepOffenderInsertList[0].iepLevelCode === this.tempIepLevelCode) && (DateFormat.compareDate(DateFormat.getDate(DateFormat.getDate(this.iepOffenderInsertList[0].dateAsigned).setHours(0, 0, 0, 0)),
                DateFormat.getDate(DateFormat.getDate(this.tempIepLevelDate).setHours(0, 0, 0, 0))) == 0)) {
                this.duplicateIep = true;
            }

        
        if(this.iepOffenderInsertList[0].nextReviewDate ){
            const date = DateFormat.getDate().setDate (DateFormat.getDate().getDate()+ 1);                          
            if (DateFormat.compareDate(DateFormat.getDate(this.iepOffenderInsertList[0].nextReviewDate),DateFormat.getDate(date) ) <  0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidieplv.nextreviewdategreatervalidation');
                this.show();
                return;
            }
        }
    }
            
        
        if(this.iepOffenderUpdateList.length > 0){
            for (let i = 0; i < this.iepOffenderUpdateList.length; i++) {
                if(this.iepOffenderUpdateList[i].nextReviewDate ){
                    const date = DateFormat.getDate().setDate (DateFormat.getDate().getDate()+ 1);                          
                    if (DateFormat.compareDate(DateFormat.getDate(this.iepOffenderUpdateList[i].nextReviewDate),DateFormat.getDate(date) ) <  0) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidieplv.nextreviewdategreatervalidation'); 
                        this.show();
                        return;
                    }
                }
            }



        }

        if (this.duplicateIep) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidieplv.duplicateieplevelcode');
            this.show();
            return;
        }


        if (this.iepOffenderInsertList.length > 0 || this.iepOffenderUpdateList.length > 0) {

            for (let i = 0; i < this.iepOffenderInsertList.length; i++) {
                this.iepOffenderInsertList[i].offenderBookId = this.defautOffenderBookId;
                this.iepOffenderInsertList[i].staffId = this.staffId;
                this.iepOffenderInsertList[i].staffMailId = this.staffMailId;
                this.iepOffenderInsertList[i].offenderId = this.vHeaderBlockModel.offenderId;
                this.iepOffenderInsertList[i].offenderName = this.vHeaderBlockModel.lastName+','+ this.vHeaderBlockModel.firstName;
                this.iepOffenderInsertList[i].agyLocId = this.workingCaseloadId;
                this.iepOffenderInsertList[i].offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.iepOffenderInsertList[i].currentDate =DateFormat.getDate();
            }
            this.offenderCommitBeanIep.insertList = this.iepOffenderInsertList;
            for (let i = 0; i < this.iepOffenderUpdateList.length; i++) {
                this.iepOffenderUpdateList[i].offenderBookId = this.defautOffenderBookId;
                this.iepOffenderUpdateList[i].staffId = this.staffId;
                this.iepOffenderUpdateList[i].staffMailId = this.staffMailId;
                this.iepOffenderUpdateList[i].offenderId = this.vHeaderBlockModel.offenderId;
                this.iepOffenderUpdateList[i].offenderName = this.vHeaderBlockModel.lastName;
                this.iepOffenderUpdateList[i].agyLocId = this.workingCaseloadId;
                this.iepOffenderUpdateList[i].offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.iepOffenderUpdateList[i].currentDate =DateFormat.getDate();
            }
            this.offenderCommitBeanIep.updateList = this.iepOffenderUpdateList;
        }


        const obj = this.oidieplvService.insertOffenderIep(this.offenderCommitBeanIep);

        obj.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.addFlag=true;
                this.getAllIepLevelcodes();
                return;
            } else {
                this.type = 'error';
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
    onClearingGrid = () => {
        this.addFlag=true;
        return true;
    }
    getAllIepLevelcodes() {
        const obj = this.oidieplvService.getAllIepRecords(this.offenderBookId);
        obj.subscribe(data => {
            if (data.length == 0) {
                this.iepLevelRowdata = [];
            } else {
                    this.iepLevelRowdata = data;
                    this.tableIndex = 0;
                    this.tempIepLevelCode=this.iepLevelRowdata[0].iepLevelCode;
                    this.tempIepLevelDate=this.iepLevelRowdata[0].dateAsigned;
            }

        });
    }

    canCellEdit = (data: any, index: number, field: string) => {
        if (data.reviewComment==='Initial Intake' || data.reviewComment==='Housing Movement') {
            return false;
        }
        return true;
    }

}
