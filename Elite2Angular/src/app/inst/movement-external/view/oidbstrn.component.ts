import { Component,OnInit,ViewChild, OnDestroy } from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OidbstrnService } from '@inst/movement-external/service/oidbstrn.service';
import { VOffenderAllSchedulesCommitBean } from '@inst/schedules/beans/VOffenderAllSchedulesCommitBean';
import { Router } from '@angular/router';
import { OiinamesService } from '../service/oiinames.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
selector: 'app-oidbstrn',
templateUrl: './oidbstrn.component.html'
})

export class OidbstrnComponent implements OnInit, OnDestroy {

// Variable declaration
actionName : string;
lovModel : any[];
msgs: any[] = [];
nameOfLovPage : string;
listToCompare : any[] = [];
offallschData : VOffenderAllSchedules [] = [];
offallschDataTemp : VOffenderAllSchedules[] = [];
offallschModel : VOffenderAllSchedules = new VOffenderAllSchedules();
batchUpdModel: VOffenderAllSchedules = new VOffenderAllSchedules();
offallschIndex : number = 0;
offallschInsertList : VOffenderAllSchedules[] = [];
offallschUpdatetList : VOffenderAllSchedules[] = [];
offallschDeleteList : VOffenderAllSchedules[] = [];
offallschCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
minDate : Date;
display : boolean;
errorMessage : string;
headerMessage : string;
disabled : boolean;
editable : boolean = true;
offAllSchColumnDef : any[];
queryCtrlReadOnly : boolean = false;
batchAddReadOnly : boolean = false;
offAllSchReadOnly : boolean = false;
cancelReadOnly : boolean = false;
rgreasonRg : any[] = [];
rgagylocRg : any[] = [];
rgallagylocRg : any[] = [];
rgescortRg : any[] = [];
rgcancelreasonRg : any[] = [];
rgAgyLocUrl: string;
offSchRowData: any[] = [];
offSchRowDataTemp: any[] = [];
offSchSelectedRow: any;
routUrl: string;
vNameSearch: VNameSearch = new VNameSearch();
selected = -1
outComeReasonCode: string;
reapeat = -1;
copyFlag = false;
offIDDisList : string[] = [];
@ViewChild('grid') grid: any;
retriveDisabled: boolean;
clearDisabled: boolean;
namesReadOnly: boolean;
displayMsg: number;
frmDate:Date;
tDate:Date;
	agyLocIdLink: string;

constructor(public translateService:TranslateService, 
   private oiinamesFactory: OiinamesService,
   private sessionManager: UserSessionManager,
	private oidbstrnFactory: OidbstrnService,
	private router: Router,
	private dialogService: DialogService) {
this.offAllSchColumnDef = [];
}
ngOnInit() {
   this.displayMsg = 0;
   this.retriveDisabled = false;
   this.clearDisabled = false;
   this.namesReadOnly = false;
this.routUrl = this.router.url;
this.oidbstrnFactory.nameLovData;
this.agyLocIdLink = 'oidbstrn/rgAllAgyLocRecordGroup?agyLocId=';
this.rgAgyLocUrl = 'oidbstrn/rgAgyLocRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
this.offAllSchColumnDef = [
   { fieldName: this.translateService.translate('system-profile.off-id-code') + '*', field: 'offenderIdDisplay', editable: false, width: 130}, 
   { fieldName: '', field: 'lunchbtn', datatype: 'launchbutton', link:'/oiinamesdialog',editable: true, width: 100,
	 data: 'row', updateField: 'row', modal: true}, 
   { fieldName: this.translateService.translate('system-profile.name-last'), field: 'offenderLastName', editable: false, width: 130},
   { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'offenderFirstName', editable: false, width: 130},
   { fieldName: this.translateService.translate('common.from'), field: 'agyLocId', datatype: 'lov', link: this.agyLocIdLink, editable: false, width: 130},
   { fieldName: this.translateService.translate('common.date') + '*', field: 'eventDate', datatype: 'date', editable: true, width: 130},
   { fieldName: this.translateService.translate('common.time') + '*', field: 'startTime', datatype: 'time', editable: true, width: 130}, 
   { fieldName: this.translateService.translate('common.to') , field: 'toAgyLocId', datatype: 'lov', link: this.agyLocIdLink, parentField: 'agyLocId',optionWidth: 350,  editable: true, width: 130,source:'OUMAGLOC'},
   { fieldName: this.translateService.translate('common.reason') + '*', field: 'eventSubType', datatype: 'lov', link: 'oidbstrn/rgReasonRecordGroup', optionWidth: 350, codeTitle : 'Reason Code',  editable: true, width: 130,source:'OUMEMOVE'},
   { fieldName: this.translateService.translate('oidbstrn.escort'), field: 'escortCode', datatype: 'lov', domain: 'ESCORT', descTitle : 'Escort', optionWidth: 350, editable: true, width: 130},
   { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 130}, 
   
];


if(this.oidbstrnFactory.offallschModel && this.oidbstrnFactory.offallschModel.fromDate) {
   this.offallschModel = this.oidbstrnFactory.offallschModel;
} else {
   this.offallschModel.fromDate = DateFormat.getDate();
   this.offallschModel.toDate = DateFormat.getDate();
}
if(this.oidbstrnFactory.batchUpdModel) {
   this.batchUpdModel = this.oidbstrnFactory.batchUpdModel;
}
if(this.oidbstrnFactory.offSchRowData && this.oidbstrnFactory.offSchRowData.length > 0) {
	this.offSchRowData = this.oidbstrnFactory.offSchRowData;
	if(this.oidbstrnFactory.rowIndex || this.oidbstrnFactory.rowIndex === 0) {
	   this.selected = this.oidbstrnFactory.rowIndex;
	   
   }
}
if(this.oidbstrnFactory.nameLovData && this.oidbstrnFactory.nameLovData.offenderId) {
   this.vNameSearch = this.oidbstrnFactory.nameLovData;

}

}
onButRetrieveclick(){
   this.displayMsg = 0;
   this.frmDate=this.offallschModel.fromDate;
   this.tDate=this.offallschModel.toDate;
const proceed =	this.queryCtrlWhenValidateRecordTrigger();
if(!proceed){
   return;
}

this.offallschExecuteQuery();
}
allowNumbers( event ){
}
onGridClear = () => {
   this.offallschExecuteQuery();
   return true;
}
onButCopyAllclick(){
		   
   // Added for Batch Update Validation
		   
   if(!this.butCopyAllWhenButtonPressedTrigger(this.batchUpdModel)){
	   return;
   }
   if(!this.bathchEventDateWhenValidateItemTrigger(this.batchUpdModel)){
	   return;
   }
   if(!this.eventTimeWhenValidateItemTrigger(this.batchUpdModel)) {
	   return;
   }
   if(this.offSchRowData.length > 0) {
	   this.displayMsg = 1;
						   
		   // Batch Update values are binding to Row Data
		   for(let i = 0; i < this.offSchRowData.length; i++) {
		   if (this.batchUpdModel.eventDate) {
			   this.grid.setColumnData('eventDate',i,this.batchUpdModel.eventDate);
		   }
		   if (this.batchUpdModel.startTime) {
			   this.grid.setColumnData('startTime',i,this.batchUpdModel.startTime);
		   }
		   if(this.batchUpdModel.toAgyLocId) {
			   this.grid.setColumnData('toAgyLocId',i,this.batchUpdModel.toAgyLocId);
		   }
		   if(this.batchUpdModel.eventSubType) {
			   this.grid.setColumnData('eventSubType',i,this.batchUpdModel.eventSubType);
		   }
		   if(this.batchUpdModel.escortCode){
			   this.grid.setColumnData('escortCode',i,this.batchUpdModel.escortCode);
		   }
	   
	   }
} else {
   this.copyFlag = true;
   this.grid.addRecord(null);
   this.onButCopyAllclick();
}
}
onRowClickoffallsch(event){
   this.offSchSelectedRow = event;
   if(this.oidbstrnFactory.rowIndex || this.oidbstrnFactory.rowIndex === 0) {
   
   const index = this.oidbstrnFactory.rowIndex;
   this.oidbstrnFactory.nameLovData;
   this.offSchRowData[index]['offenderIdDisplay'] = this.oidbstrnFactory.nameLovData.offenderIdDisplay;
   this.offSchRowData[index]['offenderLastName'] = this.oidbstrnFactory.nameLovData.lastName;
   this.offSchRowData[index]['offenderFirstName'] = this.oidbstrnFactory.nameLovData.firstName;
   this.offSchRowData[index]['agyLocId'] = this.oidbstrnFactory.nameLovData.agyLocId;
   this.offSchRowData[index]['offenderBookId'] = this.oidbstrnFactory.nameLovData.offenderBookId;
   this.grid.setRowData(index,this.offSchRowData[index]);
   this.grid.updatedMap.set(index,this.offSchRowData[index]);
   this.grid.btnSavebtnDisable = false;
   
   this.oidbstrnFactory.rowIndex = null;

}

}
ok(){
}
no(){
}
cancel(){
}
onOffenderChange(offender) {
}
offallschExecuteQuery() {
			const offallschResult = this.oidbstrnFactory.
			offAllSchExecuteQuery(this.sessionManager.currentCaseLoad, this.offallschModel);
				offallschResult.subscribe(offallschResultList => {
			   if (offallschResultList.length === 0) {
				   this.offSchRowData = [];
				   if(this.displayMsg === 0){
				   this.show(this.translateService.translate('common.querycaused'),'warn');
				   }
				   this.retriveDisabled = false;
					this.outComeReasonCode = '';

				   this.namesReadOnly = false;
				   return;
			   } else {
				   offallschResultList.forEach(element => {
					   element['lunchbtn'] = '...';
					   element['nbtConfirm'] = false;
					   element['toAgyLocId'] = element.toAgyLocId;
					   element['eventSubType'] = element.eventSubType;
				   });
				   this.offSchRowData = offallschResultList;
				   this.offallschData =offallschResultList;
				   this.selected = 0;
				   this.retriveDisabled = true;
				   this.clearDisabled = false;
				   this.namesReadOnly = true;
			   }
			   this.outComeReasonCode = null;
		   });
	   }
/**
*  This function will be executed when commit event is
* fired
*/
oidbstrnSaveoffallschForm(event){
// TODO declare commit bean and add insert list to that object.
   if(!this.queryCtrlWhenValidateRecordTrigger()){
	   return;
   }
   this.offallschInsertList = event.added
   this.offallschUpdatetList = event.updated
   this.offallschDeleteList = event.removed
   this.offallschCommitModel.insertList = [];
   this.offallschCommitModel.updateList = [];
   this.offallschCommitModel.deleteList = [];
   const validate = {proceed: true}
   

   if(this.offallschUpdatetList.length > 0 || this.offallschInsertList.length > 0) {
	   this.offSchRowData.forEach(element => {
		   
		   if(!this.offAllSchWhenValidateRecordTrigger(element)) {
			   validate.proceed = false;
			   return false;
		   }
		   if(!element.offenderIdDisplay) {
			   validate.proceed = false;
			   this.show(this.translateService.translate('system-profile.off-id-code') +' ' 
			   + this.translateService.translate('common.mustbeenter'),'warn')
			   return false;
		   }
		   if (element.agyLocId && element.toAgyLocId && element.agyLocId == element.toAgyLocId) {
			   validate.proceed = false;
			   this.show(this.translateService.translate('common.fromandtolocationcannotbesame'), 'warn')
			   return false;
		   }

		   if (this.outComeReasonCode) {
			   element.outcomeReasonCode = this.outComeReasonCode;
		   } else {
			   element.outcomeReasonCode = null;
		   }
		   if (!element.eventId) {
			   this.offallschCommitModel.insertList.push(element);
		   } else {
			   this.offallschCommitModel.updateList.push(element);
		   }
		   
	   });
	   const validReapeat = {reapeat: 0}
	   

   }
   if(!validate.proceed){
	   return;
   }

   if(this.offallschDeleteList.length > 0) {
	   this.offallschCommitModel.deleteList = this.offallschDeleteList;
   }

	const offallschSaveData = this.oidbstrnFactory.offAllSchCommit( this.offallschCommitModel );
    offallschSaveData.subscribe( data => {
   if(data) {
	   if(String(data).indexOf('ORA-20001') > 0) {
		   this.show(this.translateService.translate('oiiwltwj.thisrecordhasbeenupdatedbyanotheruser'),'warn');
		   return;
	   }
	   if(String(data).indexOf('ORA-20002') > 0) {
		   this.show(this.translateService.translate('oiiwltwj.thisrecordiscurrentlylockedbyanotheruser'),'warn');
		   return;
	   }
	   if(String(data).indexOf('ORA-20003') > 0) {
		   this.show(this.translateService.translate('oiiwltwj.noupdateforthishistoricrecord'),'warn');
		   return;
	   }
	   if(String(data) === '2') {
		this.show(this.translateService.translate('This Transfer is already scheduled.'),'warn');
		return;
	}
	if ( String(data) === '1' ) {
	   this.show(this.translateService.translate('common.addupdateremoverecordsuccess'),'success');
	const offallschResult = this.oidbstrnFactory.
			offAllSchExecuteQuery(this.sessionManager.currentCaseLoad, this.offallschModel);
		offallschResult.subscribe(offallschResultList => {
			{
				this.offSchRowData = offallschResultList;
				this.offallschData = offallschResultList;
				this.selected = 0;
				this.retriveDisabled = true;
				this.clearDisabled = true;
				this.namesReadOnly = true;
			}
			this.outComeReasonCode = null;
		});
   }else{
	   this.show(this.translateService.translate('common.addupdateremoverecordfailed'),'warn'); 
	   this.offallschExecuteQuery();
   } }
	});
}

nbtFromEventDateKeyListvalTrigger() {
}

butFromAgyLocDescriptionWhenButtonPressedTrigger() {
}

nbtToEventDateKeyListvalTrigger() {
}

butToAgyLocDescriptionWhenButtonPressedTrigger() {
	 //TODO go_item('query_ctrl.nbt_to_agy_loc_description');
	 //TODO do_key('list_values');
}

butRetrieveWhenButtonPressedTrigger() {
	 //TODO do_query('0');
}

queryCtrlOnErrorTrigger() {
/* Trap errors returning from the server and report in a user
friendly manner*/
// 		 const errCode = errorCode;
// 		 const errType = errorType;
// 		 const serverErr = abs (dbmsErrorCode);
// 		 const serverMsg = dbmsErrorText;
// 		 const constraintName;
// 		 const vAlertNo;
// 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
// 		while (server_err = 604) {
// 		  //TODO cgte$pop_error_stack (server_err, server_msg);
// 		}
// 		  //TODO 
// /* Check and report the generic constraint violations */
// 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
// 		   throw new Error('form_trigger_failure');
// 		}
// 		  //(TODO) 
// /* Check and report the constraint violations specific to this
//             block */
// 		  //TODO constraint_name = cgte$strip_constraint (server_msg);
// 		}
// 		  //TODO 
// 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
// 		switch() {
// 			case ( err_type = 'frm' and err_code = 40202)
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 			case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
// 		;
// 			case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 		} else {
// 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
// 		} else {
// 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
// 		if (serverErr===20951 ){
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
// 		} else {
// 		 //TODO  this.showErrorForm();
// 		}
// 		  //TODO 
// 		   throw new Error('form_trigger_failure');
// 		}
	 //TODO 
	//TODO  this.checkBlockErrors();
	 //TODO 
}

queryCtrlKeyClrrecTrigger() {
	//TODO  this.clearAllBlocks();
}

queryCtrlKeyClrblkTrigger() {
	//TODO  this.clearAllBlocks();
}

queryCtrlWhenValidateRecordTrigger() {
   if((!this.offallschModel.fromDate && this.offallschModel.toDate) || (this.offallschModel.fromDate && !this.offallschModel.toDate)) {
	   this.show(this.translateService.translate('oidbstrn.pleaseenterbothfromandtodates'),'warn');
	   return false;
   }
   if(this.offallschModel.fromDate && this.offallschModel.toDate && DateFormat.compareDate(this.offallschModel.fromDate,this.offallschModel.toDate) === 1) {
	   this.show(this.translateService.translate('oidbstrn.todatemustbeafterfromdate'),'warn');
	   return false;
   }
   return true;
   //  const vAlertNo;
   //   //TODO 
   // if (queryCtrlModel.nbtToEventDate < queryCtrlModel.nbtFromEventDate ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error to date must be after from date.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
	 //TODO 
}

queryCtrlKeyDownTrigger() {
}

bathchEventDateWhenValidateItemTrigger(element) {
   if(element.eventDate) {
   if(DateFormat.compareDate(element.eventDate,DateFormat.getDate()) < 0){
	   this.show(this.translateService.translate('oidbstrn.batchadddateandtimemustnotbeinthepast'),'warn');
	   return false;
   } }
   return true;
   //  const vAlertNo;
   //   //TODO 
   // if (batchAddModel.eventDate = null  steve, qc#15 ){
   //   //TODO batch_add.event_time = null;
   // } else {
   // if (batchAddModel.eventDate < trunc(sysdate) ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error batch add date must not be in the past.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // }
	 //TODO 
}

eventDateKeyListvalTrigger() {
	//TODO  this.displayCalendar();
}

eventTimeWhenValidateItemTrigger(element) {
   if(element.eventDate){
	   const startTime = (element.startTime) ? element.startTime : DateFormat.getDate(DateFormat.getDate().setHours(0,0,0,0));
   
   if(DateFormat.compareDate(element.eventDate,DateFormat.getDate() ) < 0 
   ||( DateFormat.compareDate(element.eventDate,DateFormat.getDate() ) === 0
   && DateFormat.compareTime(startTime,DateFormat.getDate())) < 0) {
	   this.show(this.translateService.translate('oidbstrn.batchadddateandtimemustnotbeinthepast'),'warn');
	   return false;
   }
}
   return true;
   //  const vAlertNo;
   //   //TODO 
   // if ( batchAddModel.eventDate !== null &&  batchAddModel.eventTime !== null ){
   //   //TODO 
   // if (toDate(toChar(batchAddModel.eventDate, 'yyyymmdd') || toChar(batchAddModel.eventTime, 'hh24mi'), 'yyyymmddhh24mi') < sysdate ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error batch add date and time must not be in the past.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   //   //TODO 
   // }
   //   //TODO 
   // }
	 //TODO 
}

butAgyLocDescriptionWhenButtonPressedTrigger() {
	 //TODO go_item('batch_add.nbt_agy_loc_description');
	 //TODO do_key('list_values');
}

butReasonWhenButtonPressedTrigger() {
	 //TODO go_item('batch_add.nbt_reason_description');
	 //TODO do_key('list_values');
}

butEscortWhenButtonPressedTrigger() {
	 //TODO go_item('batch_add.nbt_escort_description');
	 //TODO do_key('list_values');
}

butCopyAllWhenButtonPressedTrigger(element) {
	   if(!element.eventDate && !element.startTime && !element.toAgyLocId && !element.eventSubType && !element.escortCode){
	   this.show(this.translateService.translate('oidbstrn.pleaseenteratleastonevaluetocopu'),'warn');
	   return false;
   }
   if(element.startTime && !element.eventDate) {
	   this.show(this.translateService.translate('oidbstrn.batchadddatemustbeentered'),'warn');
	   return false;
   }
   return true;
   //  const vAlertNo;
   //   //TODO 
   //  //-- Steve, QC#15
   // if ( batchAddModel.eventDate = null &&  batchAddModel.eventTime !== null ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error batch add date must be entered.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   //   //TODO 
   // }
   //   //TODO 
   //   //TODO 
   //   //TODO 
   // if (	batchAddModel.eventDate = null &&  batchAddModel.eventTime = null &&  batchAddModel.nbtAgyLocId = null &&  batchAddModel.nbtReasonCode = null &&  batchAddModel.nbtEscortCode = null ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'warning please enter at least one value to copy.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   //   //TODO go_block('off_all_sch');
   //   //TODO 
   //  //TODO  this.firstRecord();
   //   //TODO 
   //  //TODO  this.{();
   //   //TODO 
   // if (batchAddModel.eventDate !== null ){
   //   //TODO off_all_sch.event_date = batch_add.event_date;
   // }
   //   //TODO 
   // if (batchAddModel.eventTime !== null ){
   //   //TODO off_all_sch.start_time = batch_add.event_time;
   // }
   //   //TODO 
   // if (batchAddModel.nbtAgyLocDescription !== null ){
   //   //TODO off_all_sch.to_agy_loc_id = batch_add.nbt_agy_loc_id;
   //   //TODO off_all_sch.to_agy_loc_desc = batch_add.nbt_agy_loc_description;
   // }
   //   //TODO 
   // if (batchAddModel.nbtReasonDescription !== null ){
   //   //TODO off_all_sch.event_sub_type = batch_add.nbt_reason_code;
   //   //TODO off_all_sch.event_sub_type_desc = batch_add.nbt_reason_description;
   // }
   //   //TODO 
   // if (batchAddModel.nbtEscortDescription !== null ){
   //   //TODO off_all_sch.escort_code = batch_add.nbt_escort_code;
   //   //TODO off_all_sch.escort_desc = batch_add.nbt_escort_description;
   // }
   //   //TODO 
   // if (systemModel.lastRecord==='true' ){
   //  //TODO  this.exit();
   // }
	 //TODO 
	//TODO  this.nextRecord();
	 //TODO 
	//TODO  this.}();
	 //TODO 
	//TODO  this.firstRecord();
	 //TODO 
}

batchAddKeyDownTrigger() {
}

batchAddOnErrorTrigger() {
/* Trap errors returning from the server and report in a user
friendly manner*/
// 		 const errCode = errorCode;
// 		 const errType = errorType;
// 		 const serverErr = abs (dbmsErrorCode);
// 		 const serverMsg = dbmsErrorText;
// 		 const constraintName;
// 		 const vAlertNo;
// 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
// 		while (server_err = 604) {
// 		  //TODO cgte$pop_error_stack (server_err, server_msg);
// 		}
// 		  //TODO 
// /* Check and report the generic constraint violations */
// 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
// 		   throw new Error('form_trigger_failure');
// 		}
// 		  //TODO 
// /* Check and report the constraint violations specific to this
//             block */
// 		  //TODO constraint_name = cgte$strip_constraint (server_msg);
// 		}
// 		  //TODO 
// 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
// 		switch() {
// 			case ( err_type = 'frm' and err_code = 40202)
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 			case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
// 		;
// 			case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 		} else {
// 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
// 		} else {
// 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
// 		if (serverErr===20951 ){
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
// 		} else {
// 		 //TODO  this.showErrorForm();
// 		}
// 		  //TODO 
// 		   throw new Error('form_trigger_failure');
// 		}
	 //TODO 
	//TODO  this.checkBlockErrors();
	 //TODO 
}

nbtConfirmWhenCheckboxChangedTrigger() {
   // if (cancelModel.nbtCancelReasonCode !== null ){
   //   //TODO off_all_sch.event_status = 'canc';
   //   //TODO off_all_sch.outcome_reason_code = cancel.nbt_cancel_reason_code;
   // } else {
   // if (offAllSchModel.eventStatus==='pen' ){
   //   //TODO off_all_sch.event_status = 'sch';
   // }
   // }
   //   //TODO 
   // if (systemModel.recordStatus==='query' ){
   //  //--   Patrick  Defect 2631 Fixed bug by putting the correct parameters for calling set_record_property
   //   //TODO set_record_property(system.trigger_record,'off_all_sch', status,changed_status);
   // }
}

offenderIdDisplayKeyListvalTrigger() {
	//TODO  this.callOiinames();
}

offenderIdDisplayWhenValidateItemTrigger() {
   //  const vAlertNo;
   //   //TODO 
   // if (offAllSchModel.offenderIdDisplay !== null ){
   //   //TODO 
   //  //-- @@@ Rose 22-APR-2008 #5619
   // if (getProfileValue('display', 'idDisplay')==='y' ){
   //   //TODO off_all_sch.offender_id_display = upper( lpad( ltrim ( off_all_sch.offender_id_display, '0' ), 10, '0'));
   // }
   //   //TODO 
   //   //TODO this.oidbstrnGetLastnameFirstname(off_all_sch.offender_id_display,off_all_sch.offender_last_name,off_all_sch.offender_first_name,off_all_sch.offender_book_id,off_all_sch.offender_id,off_all_sch.agy_loc_id);
   //   //TODO 
   // if (offAllSchModel.offenderId = null ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error this offender does not exist.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // if (offAllSchModel.agyLocId !== null ){
   //   //TODO off_all_sch.agy_loc_desc = tag_incidents.getagencylocationdesc(off_all_sch.agy_loc_id);
   // }
   //   //TODO 
   // }
	 //TODO 
}

butOffenderIdDisplayWhenButtonPressedTrigger() {
	//TODO  this.callOiinames();
}

eventDateWhenValidateItemTrigger() {
   //  const vAlertNo;
   //   //TODO 
   // if (systemModel.recordStatus != 'query' ){
   //   //TODO 
   // if (offAllSchModel.eventDate < trunc(sysdate) ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error offender schedule date must not be in the past.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // }
	 //TODO 
	 //TODO off_all_sch.nbt_sch_count = 0;
	 //TODO 
	//TODO  this.preDmlAction();
	 //TODO 
}

// eventDateKeyListvalTrigger() {
// 	 //TODO  this.displayCalendar();
// }

startTimeWhenValidateItemTrigger() {
   //  const vAlertNo;
   //   //TODO 
   // if (systemModel.recordStatus != 'query' ){
   //  //--@@ Sarah D#15: When date is null alert user and make time null to avoid looping error
   // if (offAllSchModel.eventDate = null &&  offAllSchModel.startTime !== null ){
   //   //TODO v_alert_no              = display_the_alert('cfg_error', 'please enter offender schedule date first', null, null, null, null);
   //   //TODO off_all_sch.start_time = null;
   //    throw new Error('form_trigger_failure');
   // } else {
   // if (toDate(toChar(offAllSchModel.eventDate, 'yyyymmdd') || toChar(offAllSchModel.startTime, 'hh24mi'), 'yyyymmddhh24mi') < sysdate ){
   //   //TODO v_alert_no = display_the_alert('cfg_error', 'offender schedule date and time must not be in the past.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   // }
   // }
}

butToAgyLocDescWhenButtonPressedTrigger() {
	 //TODO go_item('off_all_sch.to_agy_loc_desc');
	 //TODO do_key('list_values');
}

butEventSubTypeWhenButtonPressedTrigger() {
	 //TODO go_item('off_all_sch.event_sub_type_desc');
	 //TODO do_key('list_values');
}

butEscortDescWhenButtonPressedTrigger() {
	 //TODO go_item('off_all_sch.escort_desc');
	 //TODO do_key('list_values');
}

nbtEventDateKeyListvalTrigger() {
	//TODO  this.displayCalendar();
}

offAllSchKeyClrblkTrigger() {
	//TODO  this.clearAllBlocks();
}

offAllSchOnErrorTrigger() {
/* Trap errors returning from the server and report in a user
friendly manner*/
// 		 const errCode = errorCode;
// 		 const errType = errorType;
// 		 const serverErr = abs (dbmsErrorCode);
// 		 const serverMsg = dbmsErrorText;
// 		 const constraintName;
// 		 const vAlertNo;
// 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
// 		while (server_err = 604) {
// 		  //TODO cgte$pop_error_stack (server_err, server_msg);
// 		}
// 		  //TODO 
// /* Check and report the generic constraint violations */
// 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
// 		   throw new Error('form_trigger_failure');
// 		}
// 		  //TODO 
// /* Check and report the constraint violations specific to this
//             block */
// 		  //TODO constraint_name = cgte$strip_constraint (server_msg);
// 		}
// 		  //TODO 
// 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
// 		switch() {
// 			case ( err_type = 'frm' and err_code = 40202)
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 			case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
// 		;
// 			case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 		} else {
// 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
// 		} else {
// 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
// 		if (serverErr===20951 ){
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
// 		} else {
// 		 //TODO  this.showErrorForm();
// 		}
// 		  //TODO 
// 		   throw new Error('form_trigger_failure');
// 		}
	 //TODO 
	//TODO  this.checkBlockErrors();
	 //TODO 
}

offAllSchOnInsertTrigger() {
	 //TODO l_rec tag_schedule.g_schedule_rec;
	 //TODO 
   // if (nvl(offAllSchModel.nbtConfirm,'n')==='y' ){
	 //TODO 
	 //TODO l_rec.offender_book_id		= off_all_sch.offender_book_id;
	 //TODO l_rec.event_date					= off_all_sch.event_date;
	 //TODO l_rec.start_time					= off_all_sch.start_time;
	 //TODO l_rec.event_class					= off_all_sch.event_class;
	 //TODO l_rec.event_type					= off_all_sch.event_type;
	 //TODO l_rec.event_sub_type			= off_all_sch.event_sub_type;
	 //TODO l_rec.event_status				= off_all_sch.event_status;
	 //TODO l_rec.comment_text				= off_all_sch.comment_text;
	 //TODO l_rec.agy_loc_id					= off_all_sch.agy_loc_id;
	 //TODO l_rec.to_agy_loc_id				= off_all_sch.to_agy_loc_id;
	 //TODO l_rec.outcome_reason_code = off_all_sch.outcome_reason_code;
	 //TODO l_rec.escort_code 				= off_all_sch.escort_code;
	//-- @@@ Venu 19/01/2006, Defect#264: Added code to fix the issue.
	 //TODO l_rec.direction_code      = 'out';
	 //TODO 
	//TODO  this.tagSchedule.createSchedule();
	 //TODO this.(p_schedule_rec=l_rec,p_event_id=off_all_sch.event_id);
	 //TODO 
   // }
	 //TODO 
}

offAllSchOnUpdateTrigger() {
   // if (nvl(offAllSchModel.nbtConfirm,'n')==='y' ){
	 //TODO 
	//TODO  this.oidbstrn.updateSchedule();
	 //TODO this.(off_all_sch.event_date,off_all_sch.start_time,off_all_sch.to_agy_loc_id,off_all_sch.event_sub_type,off_all_sch.escort_code,off_all_sch.event_status,off_all_sch.comment_text,off_all_sch.outcome_reason_code,off_all_sch.event_id);
	 //TODO 
   // }
}

offAllSchOnLockTrigger() {
   //  const lvAlert;
	 //TODO tag_schedule.lock_event(off_all_sch.event_id,off_all_sch.check_sum);
}

offAllSchPreQueryTrigger() {
	//TODO  this.setBlockDefaultWhere();
}

offAllSchPreInsertTrigger() {
		if(this.offSchRowData.length > 0) {
			
		}
}

offAllSchPreUpdateTrigger() {
	//TODO  this.preDmlAction();
}

offAllSchPostQueryTrigger() {
	 //TODO off_all_sch.nbt_event_date = off_all_sch.event_date;
	 //TODO 
	 //TODO set_record_property (system.trigger_record, 'off_all_sch', status, query_status );
}

offAllSchWhenValidateRecordTrigger(element) {
   if(element.nbtConfirm){
	   if(!element.eventDate) {
		   this.show(this.translateService.translate('oidbstrn.pleaseenterdatetocontinue'),'warn');
		   return false;
	   }
	   if(!element.startTime) {
		   this.show(this.translateService.translate('oidbstrn.pleaseentertimetocontinue'),'warn');
		   return false;
	   }
	   const eventDate = (element.eventDate instanceof Date) ? element.eventDate : DateFormat.getDate(element.eventDate);
	   const startTime = (element.startTime instanceof Date) ? element.startTime : DateFormat.getDate(element.startTime);
	   if(DateFormat.compareDate(eventDate,DateFormat.getDate() ) < 0 
	   ||( DateFormat.compareDate(eventDate,DateFormat.getDate() ) === 0
	   && DateFormat.compareTime(startTime,DateFormat.getDate()) < 0) ) {
		   this.show(this.translateService.translate('oidbstrn.offenderscheduledateandtimemustbotbeinthepast'),'warn');
		   return false;
	   }
	   if(!element.toAgyLocId) {
		   this.show(this.translateService.translate('oidbstrn.pleaseenterthetolocation'),'warn');
		   return false;
	   }
	   if(!element.eventSubType) {
		   this.show(this.translateService.translate('oidbstrn.pleaseenterthelocation'),'warn');
		   return false;
	   }
	   return true

   }
   return true;
   //  const lvAlert;
   //   //TODO 
   // if (nvl(offAllSchModel.nbtConfirm, 'n')==='y' ){
   // if (offAllSchModel.eventDate = null ){
   //   //TODO lv_alert = display_the_alert('cfg_error', 'error please enter the date to continue.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   // if (offAllSchModel.startTime = null ){
   //   //TODO lv_alert = display_the_alert('cfg_error', 'error please enter the time to continue.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   //  //-- Steve, QC#15
   // if (toDate(toChar(offAllSchModel.eventDate, 'yyyymmdd') || toChar(offAllSchModel.startTime, 'hh24mi'), 'yyyymmddhh24mi') < sysdate ){
   //   //TODO lv_alert = display_the_alert('cfg_error', 'error offender schedule date and time must not be in the past.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   // if (offAllSchModel.toAgyLocDesc = null ){
   //   //TODO lv_alert = display_the_alert('cfg_error', 'error please enter the to location to continue.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   // if (offAllSchModel.eventSubTypeDesc = null ){
   //   //TODO lv_alert = display_the_alert('cfg_error', 'error please enter the reason to continue.', null, null, null, null);
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // }
	 //TODO 
}

offAllSchPostInsertTrigger() {
	 //TODO off_all_sch.check_sum = oidsiapp.get_check_sum(off_all_sch.event_id);
}

offAllSchPostUpdateTrigger() {
	 //TODO off_all_sch.check_sum = oidsiapp.get_check_sum(off_all_sch.event_id);
}

nbtCancelReasonKeyListvalTrigger() {
	//TODO  this.listValues();
	 //TODO 
   // if (cancelModel.nbtCancelReason !== null ){
   //   //TODO 
   //   //TODO go_block('off_all_sch');
   //   //TODO 
   //  //TODO  this.firstRecord();
   //   //TODO 
   //  //TODO  this.{();
   //   //TODO 
   //   //TODO off_all_sch.event_status = 'canc';
   //   //TODO off_all_sch.outcome_reason_code = cancel.nbt_cancel_reason_code;
   //   //TODO off_all_sch.nbt_outcome_reason = cancel.nbt_cancel_reason;
   //   //TODO 
   // if (systemModel.lastRecord==='true' ){
   //  //TODO  this.exit();
   // }
   //   //TODO 
   //  //TODO  this.nextRecord();
   //   //TODO 
   //  //TODO  this.}();
   //   //TODO 
   //  //TODO  this.firstRecord();
   //   //TODO 
   // } else {
   //   //TODO 
   //   //TODO cancel.nbt_cancel_reason_code = null;
   //   //TODO 
   // }
}

butCancelReasonWhenButtonPressedTrigger() {
	 //TODO go_item('cancel.nbt_cancel_reason');
	 //TODO do_key('list_values');
}

cancelKeyDownTrigger() {
}

cancelOnErrorTrigger() {
/* Trap errors returning from the server and report in a user
friendly manner*/
// 		 const errCode = errorCode;
// 		 const errType = errorType;
// 		 const serverErr = abs (dbmsErrorCode);
// 		 const serverMsg = dbmsErrorText;
// 		 const constraintName;
// 		 const vAlertNo;
// 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
// /* Remove recursive errors from the top of the stack */
// 		while (server_err = 604) {
// 		  //TODO cgte$pop_error_stack (server_err, server_msg);
// 		}
// 		  //TODO 
// /* Check and report the generic constraint violations */
// 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
// 		   throw new Error('form_trigger_failure');
// 		}
// 		  //TODO 
// /* Check and report the constraint violations specific to this
//             block */
// 		  //TODO constraint_name = cgte$strip_constraint (server_msg);
// 		}
// 		  //TODO 
// 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
// 		switch() {
// 			case ( err_type = 'frm' and err_code = 40202)
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things//     patrick 20/09/2005.  use replace instead of substr and instr.//     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.//     '*' character won't appear along with the prompt when mandatory value is not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 			case ( error_code = 40401 or -- no changes to save                error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved                error_code = 40100 )  -- at first record
// 		;
// 			case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.                error_code = 41351 or -- cannot navigate out of the current form.                error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.                error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
// 		   throw new Error('form_trigger_failure');
// 		} else {
// 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
// /* If error not found, issue default message */
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
// 		} else {
// 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
// 		if (serverErr===20951 ){
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
// 		} else {
// 		 //TODO  this.showErrorForm();
// 		}
// 		  //TODO 
// 		   throw new Error('form_trigger_failure');
// 		}
	 //TODO 
	//TODO  this.checkBlockErrors();
	 //TODO 
}

butOffendersWhenButtonPressedTrigger() {
	 //TODO 
}

butOffendersKeyNextItemTrigger() {
	 //TODO 
}

butOffendersKeyPrevItemTrigger() {
	 //TODO 
}

butWorksWhenButtonPressedTrigger() {
	 //TODO 
}

butWorksKeyNextItemTrigger() {
	 //TODO 
}

butWorksKeyPrevItemTrigger() {
	 //TODO 
}

butCalendarWhenButtonPressedTrigger() {
	 //TODO 
}

butCalendarKeyNextItemTrigger() {
	 //TODO 
}

butCalendarKeyPrevItemTrigger() {
	 //TODO 
}

butOffUpdatesWhenButtonPressedTrigger() {
	 //TODO 
}

butOffUpdatesKeyNextItemTrigger() {
	 //TODO 
}

butOffUpdatesKeyPrevItemTrigger() {
	 //TODO 
}

butDetailWhenButtonPressedTrigger() {
	 //TODO 
}

butDetailKeyNextItemTrigger() {
	 //TODO 
}

butDetailKeyPrevItemTrigger() {
	 //TODO 
}

mymenuOnErrorTrigger() {
	 //TODO 
}

oidbstrnI___itemTrigger() {
}

oidbstrnKeyListvalTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_item_h.key_listval;	// application hook
	 //TODO 
	//TODO  this.listValues();
	 //TODO 
	 //TODO next_item ;
}

oidbstrnWhenButtonPressedTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_item_h.when_button_pressed;	// application hook
}

oidbstrnI_navigateTrigger() {
}

oidbstrnKeyExitTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
   //  const lvAlert;
   //   //TODO 
   // if (systemModel.formStatus==='changed' ){
   //   //TODO lv_alert = display_the_alert  ('ync_alert', 'do you wish to save the changes you have made?', null, null, null, null ); // replaced message by form api
   // if (lvAlert===alertButton1 ){
   //  //TODO  this.formCommit();
   // }
   //  //--			exit_form(no_validate); -- Commented by Rose 29-JAN-2008 #4412
   // }
	 //TODO 
	 //TODO 
	 //TODO applib_navigate_h.key_exit;	// application hook
	 //TODO 
	 //TODO exit_form(no_validate); // rose 29-jan-2008 #4412;
	 //TODO 
	//-- new code from triggeradd --
	//--
	//-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
	//--     in application library to handle coordination of menu and forms
	//--
	//TODO  this.undoPostFormInit();
	 //TODO 
	//-- end new code --
}

oidbstrnKeyNxtblkTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.key_nxtblk;	// application hook
	 //TODO 
	//TODO  this.nextBlock();
}

oidbstrnKeyPrvblkTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.key_prvblk;	// application hook
	 //TODO 
	//TODO  this.previousBlock();
}

oidbstrnPostFormTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.post_form;	// application hook
}

oidbstrnPreBlockTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.pre_block;	// application hook
}

oidbstrnPreFormTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.pre_form;	// application hook
}

oidbstrnWhenNewRecordInstanceTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.when_new_rec_instance;	// application hook
	 //TODO 
	 //TODO populate_images ;
}

oidbstrnWhenNewFormInstanceTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	//TODO  this.createLibraryGlobals();
	 //TODO 
	//TODO  this.createApplibGlobals();
	 //TODO 
	 //TODO set_item_property('query_ctrl.nbt_from_agy_loc_description', prompt_text, get_profile_value('label','inst_agency'));
	 //TODO set_item_property('query_ctrl.nbt_to_agy_loc_description', prompt_text, get_profile_value('label','inst_agency'));
	 //TODO set_item_property('batch_add.nbt_agy_loc_description', prompt_text, get_profile_value('label','inst_agency'));
	 //TODO 
	 //TODO set_item_property('off_all_sch.offender_last_name', prompt_text, get_profile_value('label','name_last'));
	 //TODO set_item_property('off_all_sch.offender_first_name', prompt_text, get_profile_value('label','name_given_1'));
	 //TODO 
	 //TODO applib_navigate_h.w_new_form_instance;	// application hook
	 //TODO 
	//-- @@@ Venu 01-Dec-2004, 	Added code to carry over the offender if Global.Offender_Book_ID or
	//--													GLOBAL.Root_Offender_ID exists, otherwise	put the form in Enter-Query mode.
	//--                         This code is required only if the form has Header Block, otherwise delete the code.
	 //TODO 
	 //TODO tag_establishment.default_agency(global.caseload_id,fv.default_agy_loc_id,fv.default_agy_loc_description);
	 //TODO 
	 //TODO query_ctrl.nbt_from_agy_loc_description = fv.default_agy_loc_description;
	 //TODO 
	 //TODO set_item_property('off_all_sch.offender_id_display', prompt_text, get_profile_value('label', 'off_id_code')||'*');
}

oidbstrnWhenNewBlockInstanceTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.w_new_block_instance;	// application hook
}

oidbstrnWhenNewItemInstanceTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_navigate_h.w_new_item_instance;	// application hook
}

oidbstrnI____queryTrigger() {
}

oidbstrnKeyEntqryTrigger() {

   if(!this.offallschModel.fromDate || this.offallschModel.toDate) {
	   this.show(this.translateService.translate('oidbstrn.pleaseenteravaliddaterange'),'warn')
	   return false;
   }
   return true;
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
   //  const vAlertNo;
	 //TODO 
	 //TODO applib_query_h.key_entqry;	// application hook
	 //TODO 
	 //TODO handle_images ;
	 //TODO 
   // if (queryCtrlModel.nbtFromEventDate = null ||  queryCtrlModel.nbtToEventDate = null ){
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error please enter a valid date range, insufficient search criteria.',null,null,null,null);
   // if (systemModel.triggerBlock != 'queryCtrl' ){
   //   //TODO go_block('query_ctrl');
   // }
   // if (queryCtrlModel.nbtFromEventDate = null ){
   //   //TODO go_item('query_ctrl.nbt_from_event_date');
   // } else {
   //   //TODO go_item('query_ctrl.nbt_to_event_date');
   // }
   //    throw new Error('form_trigger_failure');
   // } else {
   //   //TODO go_block('off_all_sch');
   //   //TODO clear_block(ask_commit);
   //   //TODO go_block('query_ctrl');
   // }
	 //TODO 
}

oidbstrnKeyExeqryTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_query_h.key_exeqry;	// application hook
	 //TODO 
	 //TODO do_query('0');
}

oidbstrnPostQueryTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_query_h.post_query;	// application hook
}

oidbstrnPreQueryTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_query_h.pre_query;	// application hook
}

oidbstrnITransactionalTrigger() {
}

oidbstrnKeyCommitTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_transactional_h.key_commit;	// application hook
	 //TODO 
	//TODO  this.formCommit();
}

oidbstrnOnInsertTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_transactional_h.on_insert;	// application hook
	 //TODO 
	//TODO  this.insertRecord();
	 //TODO 
	//-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
	//--                       violations, if any such violation occurs when user tries to commit a record then it should
	//--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
	//--                       message and as well as "Row already exists with....", fixed it by following call.
	//TODO  this.chkPackageFailure();
}

oidbstrnOnUpdateTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_transactional_h.on_update;	// application hook
	 //TODO 
	//TODO  this.updateRecord();
	 //TODO 
	//-- @@@ Venu 07/Apr/2005, In CGTE$CHECK_CONSTRAINT_VIO program unit we check for Primary Key/Unique Key or Check constraint
	//--                       violations, if any such violation occurs when user tries to commit a record then it should
	//--                       RAISE FORM_TRIGGER_FAILURE before continuing further but it displays "Transaction complete...."
	//--                       message and as well as "Row already exists with....", fixed it by following call.
	//TODO  this.chkPackageFailure();
}

oidbstrnPreInsertTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_transactional_h.pre_insert;	// application hook
}

oidbstrnPreUpdateTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_transactional_h.pre_update;	// application hook
}

oidbstrnIValidationTrigger() {
   ;
}

oidbstrnOnErrorTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_validation_h.on_error;	// application hook
}

oidbstrnWhenValidateItemTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_validation_h.when_validate_item;	// application hook
}

oidbstrnWhenValidateRecordTrigger() {
	//-- ---------------------------------------------
	//-- 		Application Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_validation_h.when_validate_record;	// application hook
}

oidbstrnI__variousTrigger() {
}

oidbstrnKeyHelpTrigger() {
	//-- ---------------------------------------------
	//-- 		Event Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_various_h.key_help;	// application hook
}

oidbstrnOnMessageTrigger() {
	//-- ---------------------------------------------
	//-- 		Event Hooks
	//-- ---------------------------------------------
	//-- @@@ Venu 26-April-2005, Not required.
	//-- APPLIB_Various_H.On_Message;	-- application hook
	 //TODO 
   //  const vAlertNo;
   // if (messageCode===40400 ){
   //   //TODO set_alert_property ('cfg_information', alert_message_text,
   //   //TODO message_text);
   //   //TODO v_alert_no = show_alert ('cfg_information');
   // } else {
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgErrormessage_type|| '-'|| to_char (message_code)|| ' '|| message_text,null,null,null,null);
   // }
}

oidbstrnI__windowTrigger() {
}

oidbstrnWhenWindowActivatedTrigger() {
	//-- ---------------------------------------------
	//-- 		Event Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_window_h.when_window_activated;	// application hook
}

oidbstrnWhenWindowClosedTrigger() {
	//-- ---------------------------------------------
	//-- 		Event Hooks
	//-- ---------------------------------------------
	 //TODO 
	 //TODO applib_window_h.when_window_closed;	// application hook
}

oidbstrnPreTextItemTrigger() {
	 //TODO applib_navigate_h.pre_text_item;	// application hook
}

oidbstrnPostTextItemTrigger() {
	 //TODO applib_navigate_h.post_text_item;	// application hook
}
/*
* This function executed when cgte$checkConstraintVio
* fired
*/
cgte$checkConstraintVio() {
	 //TODO function cgte$check_constraint_vio (
   //  const pServerErr;
	 //TODO p_server_msg   in   varchar2
   //  const );
	//TODO  this.is();
/* Check and report Primary/Unique Key, Check Constraint and User */
/* Defined Constraint violations                                  */
// 		 const constraintName;
// 		 const vAlertNo;
// /* Check if the error code is one we are interested in */
// 		if ((! (   pServerErr in (1, 2290) ||  (pServerErr >= 20000 &&  pServerErr <= 20999) ) ) ){
// 		  //TODO return (false);
// 		}
// 		  //TODO 
// /* Deal with user defined errors */
// 		if ((pServerErr >= 20000 &&  pServerErr <= 20999) ){
// /* If error not found, issue default message */
// 		  //TODO v_alert_no =
// 		  //TODO this.displayTheAlertCfgError'error ' || cgte$strip_first_error (p_server_msg),null,null,null,null);
// 		  //TODO return (true);
// 		}
	 //TODO 
/* Deal with Primary/Unique Key and Check Constraint violations */
	 //TODO constraint_name = cgte$strip_constraint (p_server_msg);
	 //TODO v_alert_no =
	 //TODO display_the_alert ('cfg_error', p_server_msg, null, null, null, null);
	 //TODO return (true);
}

/*
* This function executed when createLibraryGlobals
* fired
*/
createLibraryGlobals() {
	 //TODO global.library_version = '11.2.1.0';
/*
	   VERSION HISTORY       
-------------------------------------------------------------------------------------------------------------------
DATE      	  AUTHOR    		VERSION    			 DESCRIPTION 
-------------------------------------------------------------------------------------------------------------------
10-Jul-2013  Niko Chu      11.2.1.0         Initial version 
*/ 
}

/*
* This function executed when checkBlockErrors
* fired
*/
checkBlockErrors() {
   ;
}

/*
* This function executed when callOiinames
* fired
*/
callOiinames() {
	 //TODO 
	 //TODO global.from_form = 'oidostab';
	 //TODO global.agy_loc_id = off_all_sch.agy_loc_id;
	 //TODO go_block('off_all_sch');
	 //TODO call_form('oiinames',hide,do_replace);
	 //TODO 
   // if (globalModel.offenderBookId !== null	){
   //   //TODO 
   //   //TODO off_all_sch.offender_book_id 		= global.offender_book_id;
   //   //TODO off_all_sch.offender_id_display	= global.offender_id_display;
   //   //TODO off_all_sch.offender_last_name		= global.last_name;
   //   //TODO off_all_sch.offender_first_name	= global.first_name;
   //   //TODO off_all_sch.agy_loc_id						= global.agy_loc_id;
   //   //TODO 
   // if (offAllSchModel.agyLocId !== null ){
   //   //TODO off_all_sch.agy_loc_desc = tag_incidents.getagencylocationdesc(off_all_sch.agy_loc_id);
   // }
   //   //TODO 
   //   //TODO go_item('off_all_sch.event_date');
   //   //TODO 
   // }
	 //TODO 
}

/*
* This function executed when doQuery
* fired
*/
doQuery() {
   //  const vMessageLevel = :system.messageLevel;
   //  const lvAlert;
   //   //TODO validate(record_scope);
   //   //TODO 
   // if (! formSuccess ){
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // if (( queryCtrlModel.nbtFromEventDate !== null &&  queryCtrlModel.nbtToEventDate = null ) ||  ( queryCtrlModel.nbtFromEventDate = null &&  queryCtrlModel.nbtToEventDate !== null ) ){
   //   //TODO this.lvAlertDisplayTheAlertCfgErrorErrorPleaseEnterBothFromAndToDatesOrNeithernull, null, null, null );
   //   //TODO 
   //    throw new Error('form_trigger_failure');
   // } else {
   // if (queryCtrlModel.nbtFromEventDate !== null &&  queryCtrlModel.nbtFromEventDate > queryCtrlModel.nbtToEventDate ){
   //   //TODO this.lvAlertDisplayTheAlertCfgErrorErrorPleaseEnterAToDateAfterTheFromDatenull, null, null, null );
   //    throw new Error('form_trigger_failure');
   // }
   // }
   //   //TODO 
   //   //TODO go_block('off_all_sch');
   //   //TODO 
   //   //TODO validate(record_scope);
   //   //TODO 
   // if (! formSuccess ){
   //    throw new Error('form_trigger_failure');
   // }
	 //TODO 
	 //TODO cancel.nbt_cancel_reason				= null;
	 //TODO cancel.nbt_cancel_reason_code	= null;
	 //TODO 
	 //TODO system.message_level = p_message_level;
	 //TODO 
	//TODO  this.executeQuery();
	 //TODO 
	 //TODO system.message_level = v_message_level;
	 //TODO 
}

/*
* This function executed when confirmedChanges
* fired
*/
confirmedChanges() {
	 //TODO function confirmed_changes return boolean is
	 //TODO 
	 //TODO go_block('off_all_sch');
	 //TODO 
	//TODO  this.firstRecord();
	 //TODO 
	//TODO  this.{();
	 //TODO 
   // if (nvl(offAllSchModel.nbtConfirm,'n')==='y' ){
   //   //TODO return(true);
   // }
   //   //TODO 
   // if (systemModel.lastRecord==='true' ){
   //  //TODO  this.exit();
   // }
	 //TODO 
	//TODO  this.nextRecord();
	 //TODO 
	//TODO  this.}();
	 //TODO 
	//TODO  this.firstRecord();
	 //TODO 
	 //TODO return(false);
	 //TODO 
}

/*
* This function executed when clearUnconfirmed
* fired
*/
clearUnconfirmed() {
	 //TODO 
	 //TODO go_block('off_all_sch');
	 //TODO 
	//TODO  this.firstRecord();
	 //TODO 
	//TODO  this.{();
	 //TODO 
   // if (nvl(offAllSchModel.nbtConfirm,'n') != 'y' ){
   //  //TODO  this.clearRecord();
   // } else {
   //  //TODO  this.nextRecord();
   // }
   //   //TODO 
   // if (systemModel.lastRecord==='true' ){
   // if (nvl(offAllSchModel.nbtConfirm,'n') != 'y' ){
   //  //TODO  this.clearRecord();
   // }
   //  //TODO  this.exit();
   // }
	 //TODO 
	//TODO  this.}();
	 //TODO 
	//TODO  this.firstRecord();
	 //TODO 
}

/*
* This function executed when formCommit
* fired
*/
formCommit(elements) {
   const confirm = {count: 0}
   elements.forEach(element => {
	   if(element.nbtConfirm) {
		   confirm.count++;
		   return;
	   }
   });
   if(confirm.count <= 0) {
	   this.show(this.translateService.translate('oidbstrn.therearenoconfirmedchanges'),'warn')
	   return false;
   } else {
	   return true;
   }
   //  const vAlertNo;
	 //TODO 
	 //TODO validate(record_scope);
	 //TODO 
   // if (! formSuccess ){
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   // if (confirmedChanges ){
   //  //TODO  this.clearUnconfirmed();
   //  //TODO  this.commit();
   // if (systemModel.formStatus==='query' ){
   //   //TODO do_query('10');
   // }
   // } else {
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgWarningA'warning there are no confirmed changes.',null,null,null,null);
   //    throw new Error('form_trigger_failure');
   // }
	 //TODO 
}

/*
* This function executed when preDmlAction
* fired
*/
preDmlAction() {
	//TODO  this.vAlertNo	number();
	 //TODO v_return		number;
	 //TODO 
   // if (nvl(offAllSchModel.nbtConfirm,'n')==='y' ){
   //   //TODO 
   //   //TODO off_all_sch.start_time =
   //   //TODO to_date(to_char(off_all_sch.event_date, 'yyyymmdd') ||
   //   //TODO to_char(off_all_sch.start_time, 'hh24mi'), 'yyyymmddhh24mi');
   //   //TODO 
   // if (offAllSchModel.eventStatus==='sch' &&  oidbstrnModel.duplicateExists( pOffenderIdDisplay=>offAllSchModel.offenderIdDisplay, pEventDate=>offAllSchModel.eventDate, pStartTime=>offAllSchModel.startTime, pEventId=>offAllSchModel.eventId, pEventStatus=>offAllSchModel.eventStatus, pEventType=>offAllSchModel.eventType, pEventClass=>offAllSchModel.eventClass) ){
   //   //TODO 
   //   //TODO v_alert_no =
   //   //TODO this.displayTheAlertCfgError'error this transfer is already scheduled.',null,null,null,null);
   //   //TODO 
   //    throw new Error('form_trigger_failure');
   //   //TODO 
   // }
   //   //TODO 
   // if (offAllSchModel.nbtEventDate = null ||  offAllSchModel.eventDate != offAllSchModel.nbtEventDate ){
   //   //TODO 
   //   //TODO v_return = tag_schedule.check_schedule_conflict(
   //   //TODO off_all_sch.offender_book_id,
   //   //TODO off_all_sch.event_date);
   //   //TODO 
   // if (vReturn != offAllSchModel.nbtSchCount &&  vReturn > 0 ){
   //   //TODO 
   //   //TODO global.schedule_date			= off_all_sch.event_date;
   //   //TODO global.allow_schedule		= 'n';
   //   //TODO global.schudule_id				= off_all_sch.event_id;
   //   //TODO global.offender_book_id	= off_all_sch.offender_book_id;
   //   //TODO 
   //   //TODO call_form ('oiuscinq', no_hide, no_replace, query_only);
   //   //TODO 
   // if (globalModel.allowSchedule==='n' ){
   //    throw new Error('form_trigger_failure');
   // }
   //   //TODO 
   //   //TODO off_all_sch.nbt_sch_count = v_return;
   //   //TODO 
   // }
   //   //TODO 
   // }
   //   //TODO 
   // }
	 //TODO 
}

/*
* This function executed when clearAllBlocks
* fired
*/
clearAllBlocks() {
   //  const lvAlert;
	 //TODO 
	//TODO  this.clearDetailBlock();
	 //TODO 
	 //TODO go_block('off_all_sch');
	 //TODO 
	 //TODO clear_block(no_validate);
	 //TODO go_block('query_ctrl');
	 //TODO 
	 //TODO query_ctrl.nbt_from_agy_loc_description = fv.default_agy_loc_description;
	 //TODO 
}

/*
* This function executed when fv
* fired
*/
// fv() {
// 	  //TODO package fv is
// 	 const defaultAgyLocDescription;
// 	 const defaultAgyLocId;
// }

/*
* This function executed when fv
* fired
*/
fv() {
	 //TODO package body fv is
   ;
}

/*
* This function executed when clearDetailBlock
* fired
*/
clearDetailBlock() {
   this.show('oidbstrn.pleaseenteravaliddaterange','warn');
   //  const lvAlert;
   //   //TODO 
   // if (systemModel.formStatus==='changed' ){
   //   //TODO lv_alert = display_the_alert  ('ync_alert', 'do you wish to save the changes you have made?', null, null, null, null ); // replaced message by form api
   // if (lvAlert===alertButton1 ){
   //  //TODO  this.formCommit();
   // }
   // }
	 //TODO 
	 //TODO clear_block(no_validate);
	 //TODO 
}

/*
* This function executed when setBlockDefaultWhere
* fired
*/
setBlockDefaultWhere() {
	 //TODO 
   //  const lDefWhere = '     vOffenderAllSchedules.eventClass;
   //   //TODO ' and v_offender_all_schedules.event_type = ''trn'' '												||
   //   //TODO ' and v_offender_all_schedules.event_status in (''sch'',''pen'') ';
   //   //TODO 
   //  const lDateBetween = ' and vOffenderAllSchedules.eventDate between '	||;
   //   //TODO '     query_ctrl.nbt_from_event_date and query_ctrl.nbt_to_event_date ';
   //   //TODO 
   //  const lDateNull = ' and vOffenderAllSchedules.eventDate is null ';
   //   //TODO 
   //  const lPendingClause = ' and exists ( select 1 from offenderIndSchWaitLists o '								||;
   //   //TODO '              where o.event_id = v_offender_all_schedules.event_id '  		  ||
   //   //TODO '              and   o.wait_list_status = ''pen'' '													||
   //   //TODO '              and   o.approved_flag  = ''y'' ) ';
   //   //TODO 
   //  const lCaseloadClause = ' and exists ( select 1 from agencyLocations al ' 													||;
   //   //TODO '              where al.agency_location_type = ''inst''' 										||
   //   //TODO '              and   al.agy_loc_id = v_offender_all_schedules.agy_loc_id ' 	||
   //   //TODO '              and   al.agy_loc_id not in (''out'', ''trn'') ' 							||
   //   //TODO '              and   exists ( select 1 from caseload_agency_locations cl' 	||
   //   //TODO '                             where  cl.agy_loc_id = v_offender_all_schedules.agy_loc_id ' ||
   //   //TODO '                             and    cl.caseload_id = global.caseload_id)) ';
   //   //TODO 
   //   //TODO 
   // if (queryCtrlModel.nbtFromEventDate = null ){
   //   //TODO l_def_where = l_def_where || l_date_null || l_pending_clause;
   // } else {
   //   //TODO l_def_where = l_def_where || l_date_between; // || l_pending_clause;
   // }
   //   //TODO 
   // if (queryCtrlModel.nbtToAgyLocDescription !== null ){
   //   //TODO l_def_where = l_def_where || ' and v_offender_all_schedules.to_agy_loc_id = query_ctrl.nbt_to_agy_loc_id ';
   // }
   //   //TODO 
   // if (queryCtrlModel.nbtFromAgyLocDescription !== null ){
   //   //TODO l_def_where = l_def_where || ' and v_offender_all_schedules.agy_loc_id = query_ctrl.nbt_from_agy_loc_id ';
   // }
   //   //TODO 
   // if (queryCtrlModel.nbtFromAgyLocDescription = null &&  queryCtrlModel.nbtToAgyLocDescription = null ){
   //   //TODO l_def_where = l_def_where || l_caseload_clause;
   // }
	 //TODO 
	 //TODO set_block_property('off_all_sch', default_where , l_def_where);
	 //TODO 
}

/*
* This function executed when createLibraryGlobalsBak
* fired
*/
createLibraryGlobalsBak() {
	 //TODO global.library_version = '10.2.20.1.8';
	 //TODO 
/*
VERSION HISTORY
-------------------------------------------------------------------------------------------------------------------
DATE      	  AUTHOR    		VERSION    			DESCRIPTION
-------------------------------------------------------------------------------------------------------------------
01-Sep-2009   Edward        10.2.20.1.8			QC#1270: Set Date field in Offender Schedules block to Not Required to allow multiple offenders inserts with 'Copy to All' functionality.
14-Jul-2009   Sarah         10.2.20.1.7     QC#15: modified when validate item on start time to alert user When date is 
									   null and time is not null and make time null to avoid looping the error.
05-Jul-2009   Sarah         10.2.20.1.6     QC#15: Passed the form through the API
										- Subclassed the date in offender_schedule block
										- Make validation item trigger on event_date after form level to handle
										  07/05/09 to 07/05/2009.     
10-Jun-2009   Steve         10.2.20.1.5     QC#15: Increased length of offender_id_display field.
									   Ensure that Batch Add Date is formated correctly.
									   Make batch add date mandatory if batch add time is entered.
									   Null out batch add time if batch add date is null.
									   When confirming movements, ensure that date and time is not before sysdate at record level (when using copy all).
											  
08-JUN-2009   Niko          10.2.20.1.4     Bug fixed on defect#476
22-APR-2008   Rose          10.2.20.1.3     #5619: If the system profile DISPLAY / ID_DISPLAY = 'Y' the user does not need to enter the padded zeros in order for the screen to retrieve the offender. 
29-JAN-2008   Rose          10.2.20.1.2     #4412: Fixed bugs that clearing the global values when exiting the form.
08-MA-2007    Vikas   			10.2.20.1.1 		TAG10gR2 : Last_Name, First_Name, Institution labels are taken from system_profiles
												   10.2.20					No Description was entered
23-JUN-2006   Patrick       10.2.19         Defect 2631 Fixed bug by putting the correct parameters for calling set_record_property 
																				 in when_check_box_changed of NBT_CONFIRM flag
06-Jun-2006   Erin          10.2.16         #2323: Fix ergonomic label format problems from API (reset inherited label attributes)
19-Jan-2006	  Venu					10.2.13				  Defect#264: Modified ON-INSERT trigger on OFF_ALL_SCH, added direction_code = 'OUT' upon transfer. 
16-Jan-2006		GJC						10.2.12					Defect 178
09-Dec-2005		GJC						10.2.11					Refresh check_sum post insert and update.
22-Nov-2005		GJC						10.2.10					Further peer review changes.
18-Nov-2005		GJC						10.2.9					Ensure conflict check gets called in vvi too.
01-Nov-2005		GJC						10.2.8					Add waiting list functionality
31-Oct-2005		GJC						10.2.7					Better on-lock error message
28-Oct-2005	  GJC						10.2.6					Set trigger execution hierarchy settings
27-Oct-2005		GJC						10.2.5					Amendments to Design specification included for system codes.
25-Oct-2005		GJC						10.2.3					This is a complete new version of OIDBSTRN
*/
	 //TODO 
}
show(vldmsg, type) {
   const msgval = [{ message: vldmsg, type: type }];
   this.msgs = [...msgval];
 }

 addschdule = () => {
	 
   const copyall =  {agyLocDesc: this.batchUpdModel.agyLocDesc,
			eventDate: this.batchUpdModel.eventDate,
			startTime: this.batchUpdModel.startTime,
			toAgyLocDesc: this.batchUpdModel.toAgyLocDesc,
			escortDesc: this.batchUpdModel.escortDesc,
			lunchbtn: '...',
			};
   if(this.offSchRowData.length <= 0 && this.copyFlag) {
	   this.copyFlag = false;
	   return copyall;
   } else {
	   return {lunchbtn: '...' , 'offenderIdDisplay': '', 'offenderLastName': '', 'offenderFirstName': '','agyLocId': '' } ;
   }
 }

 ngOnDestroy() {
	 
   if(this.router.url === '/OIINAMES') {
	   for(let i = 0; i < this.offSchRowData.length; i++) {		
		   if(this.offSchRowData[i].gridIndex || this.offSchRowData[i].gridIndex === 0) {
			   
			   this.oidbstrnFactory.rowIndex = i;
			   this.offSchRowData[i].gridIndex = undefined;
		   }
	   }
	   this.oiinamesFactory.routUrl = this.routUrl;
	   this.oidbstrnFactory.offallschModel = this.offallschModel;
	   this.oidbstrnFactory.batchUpdModel = this.batchUpdModel;
	   this.oidbstrnFactory.offSchRowData = this.offSchRowData;

   } else {
	   this.oidbstrnFactory.offallschModel = new VOffenderAllSchedules();
	   this.oidbstrnFactory.batchUpdModel = new  VOffenderAllSchedules();
	   this.oidbstrnFactory.offSchRowData = [];
   }
   
}
change() {
   this.outComeReasonCode;
}
namesrchExecuteQuery(data,index) {
  /*  for (let i = String(data.offenderIdDisplay).length; i < 10; i++) {
	   data.offenderIdDisplay = '0' + data.offenderIdDisplay;
   } */
   data.offenderIdDisplay = data.offenderIdDisplay;
   const namesrchModel = new VNameSearch();
   namesrchModel.offenderIdDisplay = data.offenderIdDisplay;
   namesrchModel.caseloadId = this.sessionManager.currentCaseLoad;
   const nameSearch = this.oiinamesFactory.
   namesrchExecuteQuery(namesrchModel);
   nameSearch.subscribe(serData => {
	   if (serData.length > 0 || serData[0].activeFlag === 'Y') {
		   // this.crteventsModel.offenderIdDisplay = data[0].offenderIdDisplay;
		   // this.offenderName = data[0].lastName + ' , ' + data[0].firstName;
		   // this.offSchRowData[index]['offenderIdDisplay'] = this.oidbstrnFactory.nameLovData.offenderIdDisplay;
		   // this.offSchRowData[index]['offenderLastName'] = this.oidbstrnFactory.nameLovData.lastName;
		   // this.offSchRowData[index]['offenderFirstName'] = this.oidbstrnFactory.nameLovData.firstName;
		   // this.offSchRowData[index]['agyLocId'] = this.oidbstrnFactory.nameLovData.agyLocId;
		   this.offSchRowData[index]['offenderBookId'] = serData[0].offenderBookId;
		   this.grid.setColumnData('offenderIdDisplay',index, serData[0].offenderIdDisplay);
		   this.grid.setColumnData('offenderLastName',index, serData[0].lastName);
		   this.grid.setColumnData('offenderFirstName',index, serData[0].firstName);
		   this.grid.setColumnData('agyLocId',index, serData[0].agyLocId);
	   } else {
		   this.show('This Offender does not exist', 'warn');
		   this.offSchRowData[index]['offenderBookId'] = null;
		   this.grid.setColumnData('offenderIdDisplay',index, null);
		   this.grid.setColumnData('offenderLastName',index, null);
		   this.grid.setColumnData('offenderFirstName',index, null);
		   this.grid.setColumnData('agyLocId',index, null);
		   // this.offenderName = '';
	   }
   });
}
getIdDisplay = (event) => {
   const rowIndex = event.rowIndex;
   const rowdata = new ValidateRowReturn();
   if(event.newValue !== event.oldValue && event.field === 'offenderIdDisplay'){
	   this.namesrchExecuteQuery(event.data,rowIndex);
   }
   rowdata.validated = true;
   return rowdata;

}
onClearQuery(){
   this.offallschModel = new VOffenderAllSchedules();
	 this.offallschModel.fromDate = DateFormat.getDate();
	this.offallschModel.toDate = DateFormat.getDate();
	this.offSchRowData = [];
   this.retriveDisabled = false;
   this.clearDisabled = true;
   this.namesReadOnly = false;
}
	get clearDis() {
		if ((this.offallschModel.fromDate && (DateFormat.compareDate(DateFormat.getDate(),DateFormat.getDate(this.offallschModel.fromDate))) !== 0) || this.offallschModel.agyLocId || (this.offallschModel.toDate && (DateFormat.compareDate(DateFormat.getDate(),DateFormat.getDate(this.offallschModel.toDate))) !== 0)
			|| this.offallschModel.toAgyLocId) {
			return false;
		} else {
			return true;
		}
	}

	get cancelFormClear() {
		if (this.outComeReasonCode) {
			return false;
		} else {
			return true;
		}
	}

	get batchAddFormClear(){
		if(this.batchUpdModel.eventDate || this.batchUpdModel.startTime || this.batchUpdModel.toAgyLocId || this.batchUpdModel.eventSubType || this.batchUpdModel.escortCode){
			return false;
		} else {
			return true;
		}
	}
}