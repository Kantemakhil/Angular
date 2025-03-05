import { Component,OnInit,ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmschprService } from '../service/ocmschpr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { CourseScheduleRulesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseScheduleRulesCommitBean';

import { DialogService } from '@core/ui-components/dialog/dialog.service';

import { CourseScheduleRules } from '@inst/institutional-activities/maintenance/beans/CourseScheduleRules';
import { VAcpSchedules } from '@iwp/beans/VAcpSchedules';
import { VAcpSchedulesCommitBean } from '@iwp/beans/VAcpSchedulesCommitBean';
import { OcmschprCommitBean } from '@iwp/beans/OcmschprCommitBean';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';



@Component({
	selector: 'app-ocmschpr',
	templateUrl: './ocmschpr.component.html',
	
})

export class OcmschprComponent implements OnInit {
	@ViewChild('ocmschprDialog', { static: true }) ocmschprDialog: DialogComponent;
	@ViewChild('vacpschedulesGrid', { static: true}) vacpschedulesGrid: any;
	@ViewChild('crsschedulerulGrid', { static: true}) crsschedulerulGrid: any;
	
	// Variable declaration
	actionName : string;
	lovModel : any[];
	msgs: any[] = [];
	nameOfLovPage : string;
	listToCompare : any[] = [];
	crsActModelTempVACP : CourseActivities = new CourseActivities();
	crsActModelTemp : CourseActivities = new CourseActivities();
	crsActModel : CourseActivities ;
	crsactData : CourseActivities [] = [];
	crsactDataTemp : CourseActivities[] = [];
	crsActCommitBean : CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
	crsactModel : CourseActivities = new CourseActivities();
	crsActUpdatetList : CourseActivities[] = [];
	vAcpSchedulesData : VAcpSchedules [] = [];
	vAcpSchedulesDataTemp : VAcpSchedules[] = [];
	vacpschedulesModel : VAcpSchedules = new VAcpSchedules();
	selectedVacpschedulesModel : VAcpSchedules = new VAcpSchedules();
	selectedVacpschedulesModelTemp : VAcpSchedules = new VAcpSchedules();
	vacpschedulesInsertList : VAcpSchedules[] = [];
	vacpschedulesUpdatetList : VAcpSchedules[] = [];
	vacpschedulesDeleteList : VAcpSchedules[] = [];
	vacpsheduleCommitBean: VAcpSchedulesCommitBean = new VAcpSchedulesCommitBean();
	crsschedulerulData : CourseScheduleRules [] = [];
	 crsschedulerulDataTemp : CourseScheduleRules[] = [];
	 crsschedulerulModel : CourseScheduleRules = new CourseScheduleRules();
	 crsschedulerulInsertList : CourseScheduleRules[] = [];
	 crsschedulerulUpdatetList : CourseScheduleRules[] = [];
	 crsschedulerulDeleteList : CourseScheduleRules[] = [];
	 crsschedulerulCommitBean: CourseScheduleRulesCommitBean = new CourseScheduleRulesCommitBean();
	 ocsmchprCommitBean: OcmschprCommitBean = new OcmschprCommitBean();
	display : boolean; 
	errorMessage : string;
	headerMessage : string;
	disabled : boolean;
	editable : boolean = true;
	vAcpSchedulesColumnDef : any[];
	crsScheduleRulColumnDef : any[];
	crsActReadOnly : boolean = false;
	vAcpSchedulesReadOnly : boolean = false;
	buttonBlockReadOnly : boolean = false;
	crsScheduleRulReadOnly : boolean = false;
	buildBlockReadOnly : boolean = false;
	rescheduleBlockReadOnly : boolean = false;
	rgremainingRg : any[] = [];
	message: any;
	type: any;
	tableIndex: number;
	addSessionDisable: boolean;
	clearSessionDisable: boolean;
	flag: boolean;
	startDate:Date;
	nbtWarning: string='N';
	uptoDescriptionLink:string;
	buildScheduleBtnDisable: boolean;
	rescheduleBtnDisable: boolean;
	lastDescription:string;
	uptoDescription:string;
	crsschedulerulInsert: boolean;
	crsschedulerulDelete: boolean;
	selectedTabIndex: number;
	builderDisable: boolean;
	readOnlyStartDate: boolean;
	readOnlyresheduleDate: boolean;
	screenName: string;
	sequence: number;
	count=0;
	constructor(private ocmschprFactory: OcmschprService , public translateService: TranslateService, private router: Router,
		public dialogService: DialogService,
		private sessionManager: UserSessionManager) {
		
	}
	ngOnInit() {
		this.crsScheduleRulColumnDef =[];
		this.screenName = this.router.url.replace('/','');
		this.readOnlyStartDate = true;
		this.readOnlyresheduleDate = true;
		this.crsschedulerulInsert = false;
		this.crsschedulerulDelete = false;
		this.clearSessionDisable = true;
		this.addSessionDisable = true;
		this.buildScheduleBtnDisable = true;
		this.rescheduleBtnDisable= true;
		this.count=0;

		if (this.ocmschprDialog && this.ocmschprDialog.data && this.ocmschprDialog.data.crsActyId) {
			this.crsActModelTemp.crsActyId = this.ocmschprDialog.data.crsActyId;
		} else
			if (this.ocmschprDialog && this.ocmschprDialog.data && this.ocmschprDialog.data.coursePhaseId){
				this.crsActModelTemp.crsActyId = this.ocmschprDialog.data.coursePhaseId;
			}
		/*else {
			this.crsActModelTemp.crsActyId = this.ocmschprDialog.data.crsActyId;
		}

		if(this.ocmschprDialog && this.ocmschprDialog.data && (this.ocmschprDialog.data.programCategory !== 'UW' || this.ocmschprDialog.data.programCategory !=='DRR')){
			this.ocmschprDialog.data.pQueryOnly = 'Y';
		} else{
			this.ocmschprDialog.data.pQueryOnly = 'N';
		} */

		if(this.ocmschprDialog && this.ocmschprDialog.data && this.ocmschprDialog.data.pQueryOnly &&this.ocmschprDialog.data.pQueryOnly === 'Y' ){
			this.builderDisable = true;
		}
		

		 if (this.crsActModelTemp && this.crsActModelTemp.crsActyId) {
		   this.crsActExecuteQuery();
        } else{
			this.show(this.translateService.translate('ocmschpr.crsActyValidation'), 'warn');
			this.onButExitclick();
		} 
	this.vAcpSchedulesColumnDef = [
		{ fieldName: this.translateService.translate('common.date'), field: 'scheduleDate', datatype : 'date', required : true ,cellEditable: this.canEdit, width: 150},
		{ fieldName: this.translateService.translate('ocmschpr.weekDay'), field: 'weekDay',  editable: false, width: 150},
		{ fieldName:  this.translateService.translate('common.startTime'), field: 'startTime', datatype : 'time',required : true, cellEditable: this.canEdit, width: 150},
		{ fieldName:  this.translateService.translate('common.endTime'), field: 'endTime', datatype : 'time', required : true,cellEditable: this.canEdit, width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.catchup'), field: 'catchUpSessionFlag', datatype : 'checkbox' ,
		editable: false, width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.phase'), field: 'phaseInstanceDesc', editable: false, width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.module'), field: 'moduleInstanceDesc', editable: false, width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.sessionNo'), field: 'sessionNo',
		datatype : 'number', editable: false, width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.sessioncancelled'), field: 'scheduleStatusFlag', width: 150,datatype : 'checkbox',cellEditable: this.scheduleStatusFlagTemp},
		{ fieldName: '', field: 'programInstanceId', hide: true },
		{ fieldName: '', field: 'phaseInstanceId', hide: true },
		{ fieldName: '', field: 'phaseListSeq', hide: true },
		{ fieldName: '', field: 'phaseSessionLength', hide: true },
		{ fieldName: '', field: 'moduleInstanceId', hide: true },
		
	];
	this.crsScheduleRulColumnDef = [
		{ fieldName:  this.translateService.translate('ocmschpr.week '), field: 'weekNo',required : true , editable: true, maxValue: 9999, whole : true ,
		datatype: 'number', width: 150},
		{ fieldName:  this.translateService.translate('ocmschpr.monday'), field: 'monday',datatype: 'checkbox', editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.tuesday'), field: 'tuesday', 
		editable: true, datatype: 'checkbox', width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.wednesday'), field: 'wednesday', datatype: 'checkbox' ,
		 editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.thursday'), field: 'thursday', datatype: 'checkbox' ,
		editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.friday'), field: 'friday', datatype: 'checkbox' ,
		editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.saturday'), field: 'saturday', datatype: 'checkbox' ,
		editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('ocmschpr.sunday'), field: 'sunday', datatype: 'checkbox' ,
		editable: true, width: 150}, 
		{ fieldName:  this.translateService.translate('common.startTime'), field: 'startTime', datatype: 'time' ,
		editable: true, width: 150,required : true}, 
		{ fieldName:  this.translateService.translate('common.endTime'), field: 'endTime', editable: true, datatype: 'time' ,
		width: 150,required : true},
	];
		
	}

	scheduleStatusFlagTemp = (data: any, index: number, field: string): boolean => {
		if (data.endTime && ((DateFormat.compareDateTime(DateFormat.getDate(data.endTime), DateFormat.getDate()) === -1)
			|| (DateFormat.compareDateTime(DateFormat.getDate(data.endTime), DateFormat.getDate()) === 0)
		)) {
			if (data.scheduleStatusFlag) {
				return false;
			} else {
				return true;
			}

		}
		return false;
	}

	scheduleStatusFlag = (data: any, index: number, field: string): boolean => {
		if((this.screenName === 'OCMSVACP' && !this.ocmschprDialog.data.activeFlag && this.ocmschprDialog.data.expiryDate) || this.screenName === 'OCISCATA'){
			return false;
		}
        if (this.selectedVacpschedulesModel && this.selectedVacpschedulesModel.scheduleStatus === 'SCH' && this.selectedVacpschedulesModel.scheduleDate && (((DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === 0)) || this.selectedVacpschedulesModel.catchUpSessionFlag )) {
            return true;
        }else if(this.selectedVacpschedulesModel && !this.selectedVacpschedulesModel.scheduleStatus){
			return false;
		} 
		else {
            return false;
        }
    }

	canEdit= (data: any, index: number, field: string): boolean => {
		if((this.screenName === 'OCMSVACP' && !this.ocmschprDialog.data.activeFlag && this.ocmschprDialog.data.expiryDate) || this.screenName === 'OCISCATA'){
			return false;
		}
		if(this.selectedVacpschedulesModel && !this.selectedVacpschedulesModel.scheduleStatus){
			return true;
		}

        if (this.selectedVacpschedulesModel && this.selectedVacpschedulesModel.scheduleDate && ((DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === 0)) && this.flag ) {
            return false;
        }else {
            return true;
        }
    }

	uptoDescriptionTitles = {
		code: this.translateService.translate('ocmschpr.sequence'),
        description: this.translateService.translate('common.description')
    };

	onButExitclick() {
        this.ocmschprDialog.close(null);
    }

	onRowClickcrsschedulerul  = (event) => {
		if(event && event.courseScheduleRuleId){
			this.crsschedulerulDelete = true;
		} else{
			this.crsschedulerulDelete = false;
		}
		if (event.monday || event.tuesday || event.wednesday || event.thursday ||
			event.friday || event.saturday || event.sunday) {
				this.crsschedulerulGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['startTime'].includes(obj.colId) ) {
						this.crsScheduleRulColumnDef[8].required = true;
						obj.colDef.headerClass = 'header-col';
						this.crsschedulerulGrid.gridApi.refreshHeader();
					}
					if ( ['endTime'].includes(obj.colId) ) {
						this.crsScheduleRulColumnDef[9].required = true;
						obj.colDef.headerClass = 'header-col';
						this.crsschedulerulGrid.gridApi.refreshHeader();
					}
				});
		} else {
			this.crsschedulerulGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
				if ( ['startTime'].includes(obj.colId) ) {
					this.crsScheduleRulColumnDef[8].required = true;
					obj.colDef.headerClass = '';
					this.crsschedulerulGrid.gridApi.refreshHeader();
				}
				if ( ['endTime'].includes(obj.colId) ) {
					this.crsScheduleRulColumnDef[9].required = true;
					obj.colDef.headerClass = '';
					this.crsschedulerulGrid.gridApi.refreshHeader();
				}
			});
		}
	}

	oncrsschedulerulInsert = () => {
		if(!this.crsschedulerulValidations(this.crsschedulerulData)){
			return;
		}
		return {};
	}

	whenTabChangedTrigger(event) {
		if(event.index === 1 && (this.vacpschedulesGrid && (this.vacpschedulesGrid.addedMap.size > 0 ||
			this.vacpschedulesGrid.updatedMap.size > 0 ))){
				this.show(this.translateService.translate('ocmschpr.ontabchangeValidation'), 'warn');
				setTimeout(() => {
					this.selectedTabIndex = 0;
                }, 10);
				return;
			}
		else if(event.index === 0 && (this.crsschedulerulGrid && (this.crsschedulerulGrid.addedMap.size > 0 ||
			this.crsschedulerulGrid.updatedMap.size > 0 || this.crsschedulerulGrid.removedMap.size > 0))){
				this.show(this.translateService.translate('ocmschpr.ontabchangeValidation'), 'warn');
				setTimeout(() => {
					this.selectedTabIndex = 1;
                }, 10);
				return;
				}

	}

	validateVacpshedulesRowData  = (event) => {
		const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;

        if (event.field === 'scheduleDate') {
            if (event.data.scheduleDate) {
				let weekDay;
					switch (DateFormat.getDate(event.data.scheduleDate).getDay(

					)) {
						case 0:
							weekDay= 'Sunday';
							break;
						case 1:
							weekDay= 'Monday';
							break;
						case 2:
							weekDay='Tuesday';
							break;
						case 3:
							weekDay= 'Wednesday';
							break;
						case 4:
							weekDay='Thursday';
							break;
						case 5:
							weekDay = 'Friday';
							break;
						case 6:
							weekDay ='Saturday';
							break;
					}
					this.vacpschedulesGrid.setColumnData('weekDay', rowIndex,  weekDay );

				if (DateFormat.compareDate(DateFormat.getDate(event.data.scheduleDate),
				DateFormat.getDate(this.crsActModel.offeringStartDate)) === -1) {
					this.show(this.translateService.translate('The Schedule date cannot be earlier than the start date of the occurence ('+
					DateFormat.format(new Date(this.crsActModel.offeringStartDate))+')'), 'warn');
					rowdata.validated = true;
					return rowdata;
				}
	
                
            } 
        }

        if (event.field === 'startTime') {
            if (event.data.startTime && !event.data.endTime) {
				let endTime :number;
				if (event.data.phaseSessionLength) {
					endTime = DateFormat.getDate(event.data.startTime).getHours() + (event.data.phaseSessionLength / 1440);
				} else {
					endTime =DateFormat.getDate(event.data.startTime).getHours() + (0 / 1440);
					
				}
				if(endTime < 60){
					endTime=DateFormat.getDate(event.data.startTime).getHours()+1;
				} else{
					endTime=DateFormat.getDate(event.data.startTime).getHours();
				}
				let date=DateFormat.getDate(event.data.endTime).setHours(endTime);
                this.vacpschedulesGrid.setColumnData('endTime', rowIndex, DateFormat.getDate(date).setMinutes(0));
			}

			
        }


		if (event.data.scheduleStatus === 'SCH' && event.data.startTime && event.data.endTime) {
			if (DateFormat.compareTime(DateFormat.getDate(event.data.startTime) , DateFormat.getDate(event.data.endTime)) === 1 ) {
				this.show(this.translateService.translate('ocmschpr.timevalidation'), 'warn');
				rowdata.validated = true;
				return rowdata;
			}

		}

		

		if (event.field === 'scheduleStatusFlag') {
			if (event.data.scheduleStatusFlag) {
				if (this.nbtWarning === 'N' && this.flag) {
					const data1 = {
						label: this.translateService.translate('ocmschpr.nbtWarning'),
						yesBtn: true, noBtn: true
					};
					this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
						if (result) {
							this.nbtWarning = 'Y';
							const data1 = {
								label: this.translateService.translate('ocmschpr.scheduleStatusFlagValidation'),
								yesBtn: true, noBtn: true
							};
							this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
								if (result) {
									this.vacpschedulesGrid.setColumnData('scheduleStatusFlag', rowIndex, true);
								} else {
									this.vacpschedulesGrid.setColumnData('scheduleStatusFlag', rowIndex, false);
			
								}
							});

						} else {
							this.vacpschedulesGrid.setColumnData('scheduleStatusFlag', rowIndex, false);
							// rowdata.validated = true;
							// return rowdata;
						}
					});
				} else {
					const data1 = {
						label: this.translateService.translate('ocmschpr.scheduleStatusFlagValidation'),
						yesBtn: true, noBtn: true
					};
					this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
						if (result) {
							this.vacpschedulesGrid.setColumnData('scheduleStatusFlag', rowIndex, true);
						} else {
							this.vacpschedulesGrid.setColumnData('scheduleStatusFlag', rowIndex, false);

						}
					});
				}
			}
		}

        rowdata.validated = true;
        return rowdata;
	}

	show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

	validateCrsScheduleRulRowData  = (event) => {
		const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
		if (event.data.monday || event.data.tuesday || event.data.wednesday || event.data.thursday ||
			event.data.friday || event.data.saturday || event.data.sunday) {
				this.crsschedulerulGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['startTime'].includes(obj.colId) ) {
						this.crsScheduleRulColumnDef[8].required = true;
						obj.colDef.headerClass = 'header-col';
						this.crsschedulerulGrid.gridApi.refreshHeader();
					}
					if ( ['endTime'].includes(obj.colId) ) {
						this.crsScheduleRulColumnDef[9].required = true;
						obj.colDef.headerClass = 'header-col';
						this.crsschedulerulGrid.gridApi.refreshHeader();
					}
				});
		} else {
			this.crsschedulerulGrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
				if ( ['startTime'].includes(obj.colId) ) {
					this.crsScheduleRulColumnDef[8].required = true;
					obj.colDef.headerClass = '';
					this.crsschedulerulGrid.gridApi.refreshHeader();
				}
				if ( ['endTime'].includes(obj.colId) ) {
					this.crsScheduleRulColumnDef[9].required = true;
					obj.colDef.headerClass = '';
					this.crsschedulerulGrid.gridApi.refreshHeader();
				}
			});
		}
        if (event.field === 'startTime') {
            if (this.crsActModel.courseClass === 'CRS_PH' && event.data.startTime && !event.data.endTime) {
				let endTime = event.data.startTime;
				if (this.crsActModel.sessionLength) {
					endTime = DateFormat.getDate(endTime).getHours() + (this.crsActModel.sessionLength / 1440);
				} else {
					endTime =  DateFormat.getDate(endTime).getHours() + (0 / 1440);
				}
				if(endTime < 60){
					endTime=DateFormat.getDate(event.data.startTime).getHours()+1;
				} else{
					endTime=DateFormat.getDate(event.data.startTime).getHours();
				}
				let date=DateFormat.getDate(event.data.endTime).setHours(endTime);
                this.crsschedulerulGrid.setColumnData('endTime', rowIndex, DateFormat.getDate(date).setMinutes(0));
			}
                
        }
		rowdata.validated = true;
        return rowdata;
	}

	onRowClickVacpSchedules = (event) => {
		this.selectedVacpschedulesModel = event;
		// if((this.ocmschprDialog.data && (!this.ocmschprDialog.data.pQueryOnly || this.ocmschprDialog.data.pQueryOnly === 'N')) &&
		// (this.selectedVacpschedulesModel && this.selectedVacpschedulesModel.scheduleStatus && this.selectedVacpschedulesModel.scheduleDate) && (!this.flag ||
		// 	(DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === 1)) &&
		// 	!this.selectedVacpschedulesModel.catchUpSessionFlag ){
		// 	this.clearSessionDisable = false;
		// } else{
		// 	this.clearSessionDisable = true;
		// } 
		this.clearSessionDisable = ((DateFormat.compareDateTime(DateFormat.getDate(event.endTime), DateFormat.getDate()) === 0) ||
			(DateFormat.compareDateTime(DateFormat.getDate(event.endTime), DateFormat.getDate()) === -1)) ? true : false;

		if(this.selectedVacpschedulesModel && (DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === 1) && 
		this.selectedVacpschedulesModel.scheduleStatus === 'SCH' && !this.selectedVacpschedulesModel.catchUpSessionFlag){
			this.crsActModel.nbtPhaseDescription=this.selectedVacpschedulesModel.phaseInstanceDesc;
			this.crsActModel.nbtSessionNo=this.selectedVacpschedulesModel.sessionNo;
			this.crsActModel.nbtCrsSchId=this.selectedVacpschedulesModel.crsSchId;
			this.rescheduleBtnDisable=false;
			this.readOnlyresheduleDate = false;
		} else{
			this.crsActModel.nbtPhaseDescription=null;
			this.crsActModel.nbtSessionNo=null;
			this.crsActModel.nbtCrsSchId=null;
			this.crsActModel.nbtreScheduleDate=null;
			this.rescheduleBtnDisable=true;
			this.readOnlyresheduleDate = true;
		}
		//this.clearSessionDisable = false;
	}

	onButAddclick() {
		if(this.screenName === 'OCMSVACP' && !this.ocmschprDialog.data.activeFlag && this.ocmschprDialog.data.expiryDate){
			this.addSessionDisable = true;
			return ;
		}
		this.ocmschprFactory.vAcpSchedulesInsertChecking(this.crsActModel.crsActyId).subscribe(data =>{
			if (data) {
				this.vacpschedulesGrid.addRecord();
				this.vacpschedulesGrid.setColumnData('programInstanceId', this.vAcpSchedulesData.length - 1, this.crsActModel.programIstanceId);
				this.vacpschedulesGrid.setColumnData('phaseInstanceId', this.vAcpSchedulesData.length - 1, data.phaseInstanceId);
				this.vacpschedulesGrid.setColumnData('phaseInstanceDesc', this.vAcpSchedulesData.length - 1, data.phaseInstanceDesc);
				this.vacpschedulesGrid.setColumnData('phaseListSeq', this.vAcpSchedulesData.length - 1, data.phaseListSeq);
				this.vacpschedulesGrid.setColumnData('phaseSessionLength', this.vAcpSchedulesData.length - 1, data.phaseSessionLength);
				this.vacpschedulesGrid.setColumnData('moduleInstanceId', this.vAcpSchedulesData.length - 1, data.moduleInstanceId);
				this.vacpschedulesGrid.setColumnData('moduleInstanceDesc', this.vAcpSchedulesData.length - 1, data.moduleInstanceDesc);
				this.vacpschedulesGrid.setColumnData('sessionNo', this.vAcpSchedulesData.length - 1, data.sessionNo);
				this.addSessionDisable = true;
			}
		});
        return;
	}

	onButClearSessionsclick() {
		if ((this.vacpschedulesGrid && (this.vacpschedulesGrid.addedMap.size > 0 ||
			this.vacpschedulesGrid.updatedMap.size > 0))) {
			this.show(this.translateService.translate('ocmschpr.clearBefore'), 'warn');
			return;
		}
		const data = {
			label: this.translateService.translate('Are you sure you want to remove session ' + this.selectedVacpschedulesModel.sessionNo + ' of phase ' + this.selectedVacpschedulesModel.phaseInstanceDesc + ' on the ' + DateFormat.format(new Date(this.selectedVacpschedulesModel.scheduleDate)) + ' and all subsequent ones ?'),
			yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data, 50).subscribe(result => {
			if (result) {
				if (this.nbtWarning === 'N' && this.flag) {
					const data1 = {
						label: this.translateService.translate('ocmschpr.nbtWarning'),
						yesBtn: true, noBtn: true
					};
					this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
						if (result) {
							this.nbtWarning = 'Y';
							this.onButClearSessionsclickAction();
						} else {
							return;
						}
					});
				} else{
					this.onButClearSessionsclickAction();
				}
			} else {
				return;
			}
		});


	}

	onButClearSessionsclickAction() {
		if (((DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === -1) ||
			(DateFormat.compareDate(DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate), DateFormat.getDate()) === 0)) && this.flag) {
			this.show(this.translateService.translate('ocmschpr.clearValidation'), 'warn');
			return;
		}
		if (this.ocmschprDialog && this.ocmschprDialog.data && this.ocmschprDialog.data.crsActyId) {
			this.selectedVacpschedulesModel.phaseInstanceId = undefined;
		}
		this.ocmschprFactory.vAcpSchedulesDelete(this.selectedVacpschedulesModel).subscribe(data => {
			if (data === 1) {
				this.show(this.translateService.translate(this.selectedVacpschedulesModel.sessionNo + ' of phase ' + this.selectedVacpschedulesModel.phaseInstanceDesc + ' and all subsequent ones have been cleared. '), 'success');
				this.crsActExecuteQuery();
				this.vAcpSchedulesExecuteQuery();
				this.defaultBuildParameters();
				return;
			} else {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.vAcpSchedulesExecuteQuery();
				return;
			}
		});

	}

	startDateChange(event){
		if(this.crsActModel && this.crsActModel.startDate && ((DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === 0)) && this.flag){
			this.show(this.translateService.translate('ocmschpr.validateValidation'), 'warn');
			//this.crsActModel.startDate= null;
			return;
		}  if(this.crsActModel && this.crsActModel.startDate && (DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate(this.crsActModel.offeringStartDate)) === -1) ){
			this.show(this.translateService.translate('ocmschpr.startDatelessthanoccuranceValidation'), 'warn');
			return;
		}
	}

	reScheduleDateChange(event){
		if(this.crsActModel && this.crsActModel.nbtreScheduleDate && ((DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate()) === 0))){
			this.show(this.translateService.translate('ocmschpr.rescheduleValidation'), 'warn');
			return;
		}  
		
		if(this.crsActModel && this.crsActModel.nbtreScheduleDate && (DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate(this.crsActModel.offeringStartDate)) === -1) ){
			this.show(this.translateService.translate('ocmschpr.rescheduleValidationoccurance'), 'warn');
			return;
		}
	}

	onBuildScheduleClick(){
		if(!this.crsschedulerulValidations(this.crsschedulerulData)){
			return;
		}
		if(!this.crsActModel.startDate){
			this.show(this.translateService.translate('ocmschpr.startDateValidation'), 'warn');
			return;

		}
		if(this.crsActModel && this.crsActModel.startDate && ((DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === 0)) && this.flag){
			this.show(this.translateService.translate('ocmschpr.validateValidation'), 'warn');
			this.crsActModel.startDate= null;
			return;
		}  if(this.crsActModel && this.crsActModel.startDate && (DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate(this.crsActModel.offeringStartDate)) === -1) ){
			this.show(this.translateService.translate('ocmschpr.startDatelessthanoccuranceValidation'), 'warn');
			return;
		}

		if(this.nbtWarning === 'N' && this.flag) {
			const data1 = {
				label: this.translateService.translate('ocmschpr.nbtWarning'),
				yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
				if (result) {
					this.nbtWarning='Y';
					this.onBuildScheduleClickAction();
				} else {
					return;
				}
			});
		} else{
			this.onBuildScheduleClickAction();
		}

	}

	

	onBuildScheduleClickAction(){
		if (((DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === -1) ||
			(DateFormat.compareDate(DateFormat.getDate(this.crsActModel.startDate), DateFormat.getDate()) === 0)) && this.flag) {
			this.show(this.translateService.translate('ocmschpr.clearValidation'), 'warn');
			return;
		}
		this.crsActModel.uptoListSeq=this.sequence
		this.crsActModel.uptoDescription = this.uptoDescription;
		this.ocmschprFactory.buildSchedule(this.crsActModel).subscribe(data => {
			if (data && data.code && data.description) {
				this.addSessionDisable = true;
				this.show(data.description, data.code);
				this.vAcpSchedulesExecuteQuery();
				if(data.code === 'info' || data.code==='success'){
					this.crsActExecuteQuery();
					this.defaultBuildParameters();
				}
				return;
			} else {
				this.show('ocmschpr.exception', 'info');
				//this.vAcpSchedulesExecuteQuery();
			}
		});
	}

	onResheduleClick() {
		if (!this.crsActModel.nbtreScheduleDate) {
			this.show(this.translateService.translate('ocmschpr.rescheduleValidation'), 'warn');
			return;
		}

		if(this.crsActModel && this.crsActModel.nbtreScheduleDate && ((DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate()) === -1) ||
		(DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate()) === 0))){
			this.show(this.translateService.translate('ocmschpr.rescheduleValidationoccurance'), 'warn');
			return;
		} 
		
		if(this.crsActModel && this.crsActModel.nbtreScheduleDate && (DateFormat.compareDate(DateFormat.getDate(this.crsActModel.nbtreScheduleDate), DateFormat.getDate(this.selectedVacpschedulesModel.scheduleDate)) === -1) ){
			this.show(this.translateService.translate('the reschedule date ' +this.crsActModel.nbtreScheduleDate + 'must be future date comparing with selected date '+ this.selectedVacpschedulesModel.scheduleDate +' in schedules tab' ), 'warn');
			//this.show(this.translateService.translate('ocmschpr.rescheduleDateValidation'), 'warn');
			return;
		}else{
		if(this.nbtWarning === 'N' && this.flag) {
			const data1 = {
				label: this.translateService.translate('ocmschpr.nbtWarning'),
				yesBtn: true, noBtn: true
			};
			this.dialogService.openLinkDialog('/OCMSCHPRFORMBOX', data1, 50).subscribe(result => {
				if (result) {
					this.nbtWarning = 'Y';
					this.onResheduleClickAction();
				} else {
					return;
				}
			});
		} else {
			this.onResheduleClickAction();
		 }
		}
	}

	onResheduleClickAction(){
		this.crsActModelTempVACP = this.crsActModel;
		this.crsActModelTempVACP.programId = this.selectedVacpschedulesModel.phaseListSeq;
		this.crsActModelTempVACP.noOfSessions = this.selectedVacpschedulesModel.sessionNo;
		this.ocmschprFactory.reSchedule(this.crsActModelTempVACP).subscribe(data => {
			if (data && data.code && data.description) {
				this.show(data.description, data.code);
				this.vAcpSchedulesExecuteQuery();
				this.crsActModel.nbtreScheduleDate=null;
				this.selectedTabIndex=0;
				return;
			} else {
				this.show('ocmschpr.exception', 'info');
				return;
			}
		});

	}

	onClear = () => {
		if((!this.ocmschprDialog.data.pQueryOnly || this.ocmschprDialog.data.pQueryOnly === 'N') && this.crsActModel.actualSessions !== this.crsActModel.totalSessions){
			this.addSessionDisable = false;
		}
		this.vAcpSchedulesExecuteQuery();
        return true;
    }

	defaultBuildParameters(){
		this.ocmschprFactory.defaultBuildParameters(this.crsActModel).subscribe(data => {
			if (data && data.activeFlag === 'Y') {
				this.buildScheduleBtnDisable = false;
				this.readOnlyStartDate = false;
				
			} else {
				this.buildScheduleBtnDisable = true;
				this.readOnlyStartDate = true;
				this.crsActModel.lastListSeq=data.lastListSeq;
			}
			this.crsActModel.lastDescription = data.lastDescription;
			this.crsActModel.lastListSeq=data.lastListSeq;
			this.uptoDescriptionLink='ocmschpr/rgRemainingRecordGroup?link='+this.crsActModel.crsActyId+'-'+this.crsActModel.lastListSeq;
		});
		this.crsActModel.uptoDescription = null;
		this.crsActModel.uptoListSeq = null;
		this.crsActModel.startDate = null;
		this.crsActModel.weeks = 0;

	}

	crsActExecuteQuery() {
		if (this.crsActModelTemp && this.crsActModelTemp.crsActyId) {
			const serviceObj = this.ocmschprFactory.crsActExecuteQuery(this.crsActModelTemp);
			serviceObj.subscribe(data => {
				if (data.length == 0) {
					this.crsactData = [];
					this.crsschedulerulInsert = false;
				}
				else {
					data.forEach(element => {
						element.moduleFlag = element.moduleFlag === 'Y' ? true : false;
						element.holidayFlagTemp = element.holidayFlag === 'Y' ? true : false;
						element.holidayFlagTempVal=element.holidayFlagTemp;
					});
					this.crsactData = data;
					this.crsActModel = this.crsactData[0];
					this.crsschedulerulInsert = true;
					//this.uptoDescriptionLink='ocmschpr/rgRemainingRecordGroup?link='+this.crsActModel.crsActyId+'-'+this.crsActModel.lastListSeq;
					if((!this.ocmschprDialog.data.pQueryOnly || this.ocmschprDialog.data.pQueryOnly === 'N') && this.crsActModel.totalSessions && this.crsActModel.actualSessions !== this.crsActModel.totalSessions){
						this.addSessionDisable = false;
					}
					if(this.screenName === 'OCMSVACP' && !this.ocmschprDialog.data.activeFlag && this.ocmschprDialog.data.expiryDate){
						this.addSessionDisable = true;
					}
					if(this.crsActModel.courseClass === 'COURSE'){
						this.lastDescription=this.translateService.translate('ocmschpr.lastphasebuilt');
						this.uptoDescription=this.translateService.translate('ocmschpr.uptophase');
					} else{
						this.lastDescription=this.translateService.translate('ocmschpr.lastModuleBuilt');
						this.uptoDescription=this.translateService.translate('ocmschpr.uptoModule');
					}
					this.defaultBuildParameters();
					this.ocmschprFactory.chkAllocationExists(this.crsActModel).subscribe(data => {
						this.flag = data;
					});
					this.vAcpSchedulesExecuteQuery();
					this.crsschedulerulExecuteQuery();
				}
			});
		}
	}

	vAcpSchedulesExecuteQuery() {
		if (this.crsActModel && this.crsActModel.crsActyId) {
			if(this.crsActModel.courseClass === 'CRS_PH'){
				this.vacpschedulesModel.phaseInstanceId = this.crsActModel.crsActyId;
			} else {
				this.vacpschedulesModel.programInstanceId = this.crsActModel.programIstanceId;
			}
			
			const vacpschedulesResult = this.ocmschprFactory.vAcpSchedulesExecuteQuery(this.vacpschedulesModel);
			vacpschedulesResult.subscribe(data => {
				if (data.length === 0) {
					this.vAcpSchedulesData = [];
					this.addSessionDisable = false;
					this.clearSessionDisable = true;

					//this.show(this.translateService.translate('common.querycaused'),'warn');
				} else {
					data.forEach(element => {
						element.scheduleStatusTemp = element.scheduleStatus;
						element.catchUpSessionFlag = element.catchUpSessionFlag === 'Y' ? true : false;
						element.scheduleStatusFlag = (element.scheduleStatus === 'CANC') ? true : false;
					});
					this.vAcpSchedulesData = data;
					this.tableIndex = 0;


				}
			});
		}
		
		//Wthis.addSessionDisable = false;
	}

	vacpschedulesValidations(obj) {
		const is = { valid: true }
		if (obj) {
			obj.forEach(element => {
				if (!element.scheduleDate) {
					this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
					is.valid = false;
					return is.valid;
				} else {
					if (DateFormat.compareDate(DateFormat.getDate(element.scheduleDate),
						DateFormat.getDate(this.crsActModel.offeringStartDate)) === -1) {
						this.show(this.translateService.translate('The Schedule date cannot be earlier than the start date of the occurence ('+
						DateFormat.format(new Date(this.crsActModel.offeringStartDate))+')'), 'warn');
						is.valid = false;
						return is.valid;
					}
				}

				if (!element.startTime) {
					this.show(this.translateService.translate('common.startdatemustbeentered'), 'warn');
					is.valid = false;
					return is.valid;
				}
				if (!element.endTime) {
					this.show(this.translateService.translate('ocmschpr.endTimeValidation'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if ((element.startTime && element.endTime) &&
					(DateFormat.compareTime(DateFormat.getDate(element.startTime), DateFormat.getDate(element.endTime)) === 1)) {
					this.show(this.translateService.translate('ocmschpr.timevalidation'), 'warn');
					is.valid = false;
					return is.valid;
				}
			});
		}
		return is.valid;

	}

	
	crsschedulerulValidations(obj){
		const is = { valid : true }
		if (obj) {
			obj.forEach(element => {
				if (!element.weekNo) {
					this.show(this.translateService.translate('ocmschpr.weekvalidation'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if ((element.monday || element.tuesday|| element.wednesday || element.thursday ||
					element.friday || element.saturday || element.sunday) && (!element.startTime || !element.endTime) ) {
					this.show(this.translateService.translate('ocmschpr.startandEndTimeValidation'), 'warn');
					is.valid = false;
					return is.valid;
				}

				if ( (element.startTime && element.endTime) && (DateFormat.compareTime(DateFormat.getDate(element.startTime) , DateFormat.getDate(element.endTime)) === 1 )) {
					this.show(this.translateService.translate('ocmschpr.endTimeValidationRul'), 'warn');
					is.valid = false;
					return is.valid;
				}
			});
		}
		return is.valid;
	}

	crsschedulerulExecuteQuery() {
		if (this.crsActModel && this.crsActModel.crsActyId) {
			this.crsschedulerulModel.crsActyId = this.crsActModel.crsActyId;
			const crsschedulerulResult = this.ocmschprFactory.crsScheduleRulExecuteQuery(this.crsschedulerulModel);
			crsschedulerulResult.subscribe(data => {
				if (data.length === 0) {
					this.crsschedulerulData = [];
				} else {
					data.forEach(element => {
						element.monday = element.mondayFlag === 'Y' ? true : false;
						element.tuesday= element.tuesdayFlag === 'Y' ? true : false;
						element.wednesday = element.wednesdayFlag === 'Y' ? true : false;
						element.thursday = element.thursdayFlag === 'Y' ? true : false;
						element.friday = element.fridayFlag === 'Y' ? true : false;
						element.saturday = element.saturdayFlag === 'Y' ? true : false;
						element.sunday = element.sundayFlag === 'Y' ? true : false;
					});
					this.crsschedulerulData = data;
					this.tableIndex = 0;
				}
			});
		}
	}

	holidayFlagChange(event){
		if(this.crsActModel && this.crsActModel.holidayFlag){

		}

	}

	get saveDisable() {
        if ((this.vacpschedulesGrid && (this.vacpschedulesGrid.addedMap.size > 0 ||
             this.vacpschedulesGrid.updatedMap.size > 0 )) ||
        (this.crsschedulerulGrid && (this.crsschedulerulGrid.addedMap.size > 0 ||
             this.crsschedulerulGrid.updatedMap.size > 0 || this.crsschedulerulGrid.removedMap.size > 0) || (this.crsActModel && this.crsActModel.holidayFlagTemp !== this.crsActModel.holidayFlagTempVal ))
        ) {
            return false;
        } else {
            return true;
        }
    }


	save() {
        this.crsschedulerulCommitBean = new CourseScheduleRulesCommitBean();
        this.vacpsheduleCommitBean = new VAcpSchedulesCommitBean();
		this.crsActCommitBean= new CourseActivitiesCommitBean();

		this.crsActUpdatetList=[];
        this.vacpschedulesInsertList = [];
        this.vacpschedulesUpdatetList = [];
        this.crsschedulerulInsertList = [];
        this.crsschedulerulUpdatetList = [];
        this.crsschedulerulDeleteList = [];

		if(this.crsActModel.holidayFlagTemp !== this.crsActModel.holidayFlagTempVal){
			this.crsActUpdatetList.push(this.crsActModel);
		}

		if(this.crsActUpdatetList.length>0){
			this.crsActUpdatetList.forEach(data =>{
				data.holidayFlag=data.holidayFlagTemp?'Y':'N';
			})
			this.crsActCommitBean.updateList=this.crsActUpdatetList;
		}

        this.vacpschedulesGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.vacpschedulesInsertList.push(v);
            }
        );

        this.vacpschedulesGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.vacpschedulesUpdatetList.push(v);
            }
        );


        if (this.vacpschedulesInsertList.length > 0 ) {
             if (!this.vacpschedulesValidations(this.vacpschedulesInsertList)) {
                return;
             }
			this.vacpschedulesInsertList.forEach(data =>{
				let startTime = DateFormat.getDate(data.scheduleDate);
				startTime.setHours(DateFormat.getDate(data.startTime).getHours());
				startTime.setMinutes(DateFormat.getDate(data.startTime).getMinutes());

				let endTime = DateFormat.getDate(data.scheduleDate);
				endTime.setHours(DateFormat.getDate(data.endTime).getHours());
				endTime.setMinutes(DateFormat.getDate(data.endTime).getMinutes());

				data.startTime=startTime;
				data.endTime=endTime;
				data.scheduleStatus=data.scheduleStatusFlag ? 'CANC' :'SCH';
			});
			this.vacpsheduleCommitBean.insertList = this.vacpschedulesInsertList;

        }

        if (this.vacpschedulesUpdatetList.length > 0) {
			if (!this.vacpschedulesValidations(this.vacpschedulesUpdatetList)) {
                return;
             }
			this.vacpschedulesUpdatetList.forEach(data =>{
				let startTime = DateFormat.getDate(data.scheduleDate);
				startTime.setHours(DateFormat.getDate(data.startTime).getHours());
				startTime.setMinutes(DateFormat.getDate(data.startTime).getMinutes());

				let endTime = DateFormat.getDate(data.scheduleDate);
				endTime.setHours(DateFormat.getDate(data.endTime).getHours());
				endTime.setMinutes(DateFormat.getDate(data.endTime).getMinutes());

				data.startTime=startTime;
				data.endTime=endTime;
				data.scheduleStatus=data.scheduleStatusFlag ? 'CANC' :data.scheduleStatus;
			});
			this.vacpsheduleCommitBean.updateList = this.vacpschedulesUpdatetList;
        }


        this.crsschedulerulGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.crsschedulerulInsertList.push(v);
            }
        );

        this.crsschedulerulGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.crsschedulerulUpdatetList.push(v);
            }
        );

        this.crsschedulerulGrid.removedMap.forEach(
            (v: any, k: number) => {
                this.crsschedulerulDeleteList.push(v);
            }
        );

        if (this.crsschedulerulInsertList.length > 0 ) {
             if (!this.crsschedulerulValidations(this.crsschedulerulInsertList)) {
                 return;
             }

			this.crsschedulerulInsertList.forEach(data =>{
				data.crsActyId = this.crsActModel.crsActyId;
				data.mondayFlag = data.monday ? 'Y' : 'N';
				data.tuesdayFlag = data.tuesday ? 'Y' : 'N';
				data.wednesdayFlag = data.wednesday ? 'Y' : 'N';
				data.thursdayFlag = data.thursday ? 'Y' : 'N';
				data.fridayFlag = data.friday ? 'Y' : 'N';
				data.saturdayFlag = data.saturday ? 'Y' : 'N';
				data.sundayFlag = data.sunday ? 'Y' : 'N';
			});
			this.crsschedulerulCommitBean.insertList = this.crsschedulerulInsertList;
        }

        if (this.crsschedulerulUpdatetList.length > 0) {
			if (!this.crsschedulerulValidations(this.crsschedulerulUpdatetList)) {
				return;
			}
			this.crsschedulerulUpdatetList.forEach(data =>{
				data.mondayFlag = data.monday ? 'Y' : 'N';
				data.tuesdayFlag = data.tuesday ? 'Y' : 'N';
				data.wednesdayFlag = data.wednesday ? 'Y' : 'N';
				data.thursdayFlag = data.thursday ? 'Y' : 'N';
				data.fridayFlag = data.friday ? 'Y' : 'N';
				data.saturdayFlag = data.saturday ? 'Y' : 'N';
				data.sundayFlag = data.sunday ? 'Y' : 'N';
			});
            this.crsschedulerulCommitBean.updateList = this.crsschedulerulUpdatetList;
        }

        if (this.crsschedulerulDeleteList.length > 0) {
            this.crsschedulerulCommitBean.deleteList = this.crsschedulerulDeleteList;
        }
		this.ocsmchprCommitBean.crsActCommitBean=this.crsActCommitBean;
        this.ocsmchprCommitBean.vacpscheduleCommitBean = this.vacpsheduleCommitBean;
        this.ocsmchprCommitBean.crsschedulerulCommitBean = this.crsschedulerulCommitBean;
        const result = this.ocmschprFactory.ocsmchprCommit(this.ocsmchprCommitBean);
        result.subscribe(data => {
			if(data && data.scheduleNotes){
				this.show(this.translateService.translate(data.scheduleNotes), 'warn');
				return;
			}
            else if (data && data.capacity > 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.crsActExecuteQuery();
                this.vAcpSchedulesExecuteQuery();
                this.crsschedulerulExecuteQuery();
				if (this.vacpsheduleCommitBean.insertList.length > 0 || this.vacpsheduleCommitBean.updateList.length > 0) {
					this.defaultBuildParameters();
				}
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.crsActExecuteQuery();
                this.vAcpSchedulesExecuteQuery();
                this.crsschedulerulExecuteQuery();
                return;
            }
        });

    }

	modelChange(event) {
		if (event.code) {
			this.sequence = Number(event.code);
		}else{
			this.sequence = 0;
		}
	}

}

	 


				/* if (element.scheduleStatus === 'SCH' && !element.catchUpSessionFlag ) {
					this.ocmschprFactory.vAcpSchedulesValidate(this.selectedVacpschedulesModel).subscribe(data => {
						if (data && data.offeringStartDate && DateFormat.compareDate(DateFormat.getDate(data.offeringStartDate),
						DateFormat.getDate(element.startTime)) === 1 ) {
							this.show(this.translateService.translate('The date and start time of this schedule must be after the prior ('+ DateFormat.format(new Date(data.offeringStartDate))+' '+DateFormat.getDate(data.offeringStartDate).getHours()+':'+DateFormat.getDate(data.offeringStartDate).getMinutes()+') session for this occurrence'), 'warn');
							is.valid = false;
							return is.valid;
						}
		
						if (data && data.phaseStartDate && DateFormat.compareDate(DateFormat.getDate(data.phaseStartDate),
						DateFormat.getDate(element.startTime)) === -1 ) {
							this.show(this.translateService.translate('The date and start time of this schedule must be before the next ('+ DateFormat.format(new Date(data.phaseStartDate))+' '+DateFormat.getDate(data.phaseStartDate).getHours()+':'+DateFormat.getDate(data.phaseStartDate).getMinutes()+') session for this occurrence'), 'warn');
							is.valid = false;
							return is.valid;
						}
					});
		

				} */
	
		
