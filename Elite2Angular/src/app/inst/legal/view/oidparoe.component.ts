import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderParoleEvent } from '../beans/OffenderParoleEvent';
import { OffenderSentenceAdjustment } from '../beans/OffenderSentenceAdjustment';
import { OidparoeService } from '../service/oidparoe.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
	selector: 'app-oidparoe',
	templateUrl: './oidparoe.component.html',

})
export class OidparoeComponent implements OnInit {
	@ViewChild('eventGrid', { static: true }) eventGrid: any;
	@ViewChild('adjustmentGrid', { static: true }) adjustmentGrid: any;
	msgs: any[] = [];
	msglist: any[];
	message: any;
	type: any;
	tableIndex = 0;
	insertFlag: boolean = false;
	adjustInsertFlag: boolean = false;
	vHeaderBlockModel: any;
	paroleEventData: OffenderParoleEvent[] = [];
	eventColumnDefs: any[];
	adjustmentColumnDefs: any[];
	adjustmentRowData: OffenderSentenceAdjustment[] = [];
	initialEventData = [];
	initialAdjustmentData = [];
	RPARCONST: string = 'RPAR';
	selectedObjectId: any;
	isSingleSaveBtnDisable: boolean = true;
	singleSaveBtnText = "Save";
	days: any;
	PARCONST = 'PAR';
	addupdateEventData = [];
	tempId = 0;
	tempAdjId = 0;
	SelectedTempId: any;
	insertParoleEventData: OffenderParoleEvent[] = [];
	paroleEventDeleteList:OffenderParoleEvent[] = [];
	adjustmentDeleteList: OffenderSentenceAdjustment[] = [];
	existingAdjustments:OffenderSentenceAdjustment[] = [];
	iscalcReasonNeed : boolean = false;
	 paroleEventCommitData: OffenderParoleEvent[] = [];
	 selectedParEventModel: OffenderParoleEvent = new OffenderParoleEvent();
	constructor(public translateService: TranslateService,
		private sessionManager: UserSessionManager, private oidparoeService: OidparoeService, private dialogService: DialogService) {

	}
	ngOnInit() {
		this.eventColumnDefs = [
			{
				fieldName: this.translateService.translate('oidparoe.eventDate'), field: 'eventDate', editable: true,
				datatype: 'date', width: 220, required: true
			},
			{
				fieldName: this.translateService.translate('oidparoe.paroleEvent'), field: 'paroleEvent', datatype: 'lov',
				domain: 'PAR_EVENTS', editable: true, width: 220, cellEditable: this.canAddParoleEent, required: true
			},
			{
				fieldName: this.translateService.translate('oidparoe.comment'), field: 'comment', editable: true, datatype: 'text',  width: 250, uppercase: 'false'
			},
		];

		this.adjustmentColumnDefs = [
			{
				fieldName: this.translateService.translate('oidparoe.type'), field: 'orderAdjustCode', editable: true, source: 'OIMSATYP', 
				datatype: 'lov', width: 150, required: true, link: 'parole/adjustmentTyep'
			},
			{
				fieldName: this.translateService.translate('oidparoe.postedDate'), field: 'adjustDate', editable: true,
				datatype: 'date', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('oidparoe.fromDate'), field: 'adjustFromDate', editable: true,
				datatype: 'date', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('oidparoe.toDate'), field: 'adjustToDate', editable: true,
				datatype: 'date', width: 150, required: true
			},
			{
				fieldName: this.translateService.translate('oidparoe.days'), field: 'adjustDays', datatype: 'number',
				editable: true, width: 150, required: true, whole: true, strictFP: false, minValue : 1
			},
			{
				fieldName: this.translateService.translate('oidparoe.comment'), field: 'commentText', datatype: 'text', uppercase: 'false',
				editable: true, width: 220
			},
			{
				field: 'objectId', datatype: 'number', hide: true
			}
		];

	}

	onOffenderChange(offender) {
		this.vHeaderBlockModel = offender;
		this.paroleEventData = [];
		this.adjustmentRowData = [];
		this.isSingleSaveBtnDisable = true;
		this.insertFlag = false;
		this.adjustInsertFlag = false;
		if (offender) {
			this.insertFlag = true;
			this.getPaloreEvents(this.vHeaderBlockModel.offenderBookId);
			this.getAllExistingAdjustment(this.vHeaderBlockModel.offenderBookId);
		} 

	}

	getPaloreEvents(offenderBookId) {
		const paroleEvent = this.oidparoeService.getEventData(offenderBookId);
		paroleEvent.subscribe(data => {
			this.paroleEventData = data;
			let trmpData = JSON.parse(JSON.stringify(data));
			this.initialEventData = trmpData;
			this.paroleEventDeleteList = [];
			this.adjustmentDeleteList = [];
		});
	}
	
	getAllExistingAdjustment(offenderBookId){
		const paroleEvent = this.oidparoeService.getAllExistingAdjustment(offenderBookId);
		paroleEvent.subscribe(data => {
			this.existingAdjustments = data;
		});
	}

	setExternalSaveButton() {
		if (this.oidparoeService.isGridDataModified(this.initialEventData, this.paroleEventData) ||
			this.oidparoeService.isGridDataModified(this.initialAdjustmentData, this.adjustmentRowData)) {
			this.isSingleSaveBtnDisable = false;
		}
		else {
			this.isSingleSaveBtnDisable = true;
		}
	}

	onUpdatedMapsData(event, gridName?: string) {
		this.setExternalSaveButton();
		let index = -1;
		if (gridName == "eventGrid") {
			if (event.updated.paroleEventId) {
				index = this.paroleEventData.findIndex(eve => eve.paroleEventId == event.updated.paroleEventId);
			} else {
				index = this.paroleEventData.findIndex(eve => eve['tempId'] == event.updated['tempId']);
			}
			if (this.initialEventData[index] && this.initialEventData[index].paroleEventId !== undefined) {
				this.paroleEventData[index] = JSON.parse(JSON.stringify(event.updated));
				this.paroleEventData[index].recordFlag = 'U'

			} else {
				this.paroleEventData[index] = JSON.parse(JSON.stringify(event.updated));
				this.paroleEventData[index].recordFlag = 'I';

			}
		}
		if (gridName == "adjustmentGrid") {
			if (event.updated.offenderOrderAdjustId) {
				index = this.adjustmentRowData.findIndex(eve => eve.offenderOrderAdjustId == event.updated.offenderOrderAdjustId);
			} else {
				index = this.adjustmentRowData.findIndex(eve => eve['tempAdjId'] == event.updated['tempAdjId']);
			}
			if (this.initialAdjustmentData[index] && this.initialAdjustmentData[index].offenderOrderAdjustId !== undefined) {
				this.adjustmentRowData[index] = JSON.parse(JSON.stringify(event.updated));
				for (let i = 0; i < this.paroleEventData.length; i++) {
					if (this.adjustmentRowData[index].objectId == this.paroleEventData[i].paroleEventId) {
						this.adjustmentRowData[index].recordFlag = 'U';
						this.paroleEventData[i].listOffenderSentenceAdjustment = this.adjustmentRowData;
						this.paroleEventData[i].recordFlag = 'U'
					}
				}
			} else {
				this.adjustmentRowData[index] = JSON.parse(JSON.stringify(event.updated));
				for (let i = 0; i < this.paroleEventData.length; i++) {
					if (this.adjustmentRowData[index].objectId != undefined && this.adjustmentRowData[index].objectId == this.paroleEventData[i].paroleEventId) {
						this.adjustmentRowData[index].recordFlag = 'I';
						this.paroleEventData[i].listOffenderSentenceAdjustment = this.adjustmentRowData;
						this.paroleEventData[i].recordFlag = 'U'
					} else if (this.adjustmentRowData[index].objectId == undefined && this.adjustmentRowData[index]['tempId'] == this.paroleEventData[i]['tempId']) {
						this.adjustmentRowData[index].recordFlag = 'I';
						this.paroleEventData[i].listOffenderSentenceAdjustment = this.adjustmentRowData;
					}
				}
			}
		}
	}


	resetParoleEventData(rowData, rowIndex) {
		rowData['recordFlag'] = 'U';
	}

	onMapsData(event, gridName?: string) {
		this.setExternalSaveButton();
		if (gridName == "eventGrid") {
			let rowData = event.added;
			rowData['recordFlag'] = 'I';
			this.tempId = this.tempId + 1;
			rowData['tempId'] = this.tempId;
			//this.initialEventData.push(JSON.parse(JSON.stringify(event.added)))

		}
		if (gridName == "adjustmentGrid") {
			let rowData = event.added;
			rowData['adjustDays'] = 0;
			if (this.selectedObjectId) {
				rowData['objectId'] = this.selectedObjectId;
			}
			rowData['tempId'] = this.SelectedTempId;
			this.tempAdjId = this.tempAdjId + 1;
			rowData['tempAdjId'] = this.tempAdjId;
			for (let i = 0; i < this.paroleEventData.length; i++) {
				if (this.adjustmentRowData[0].objectId != undefined && this.adjustmentRowData[0].objectId == this.paroleEventData[i].paroleEventId) {
					this.paroleEventData[i].listOffenderSentenceAdjustment = this.adjustmentRowData;
					this.paroleEventData[i].recordFlag = 'U'
				} else if (this.adjustmentRowData[0]['tempId'] != undefined && this.adjustmentRowData[0]['tempId'] == this.paroleEventData[i]['tempId']) {
					this.paroleEventData[i].listOffenderSentenceAdjustment = this.adjustmentRowData;

				}
			}
		}
	}

	onSave(event) {
		let iseventDeleted = this.paroleEventDeleteList && this.paroleEventDeleteList.length > 0;
		let iseventChanged = this.oidparoeService.isGridDataModified(this.initialEventData, this.paroleEventData);
		let isAdjustmentChanged = this.oidparoeService.isGridDataModified(this.initialAdjustmentData, this.adjustmentRowData);

		if (!iseventChanged && !isAdjustmentChanged && !iseventDeleted) {
			this.show(this.translateService.translate('NO data Modified'), 'warn');
			return false;
		}
		else {
			if(iseventDeleted) {
				this.iscalcReasonNeed = true;
			}
			this.onSaveApiCall();
		}
	}



	//single save
	onSaveApiCall() {
		this.paroleEventCommitData = [];
		if(this.paroleEventDeleteList.length>0){
			this.paroleEventCommitData.push.apply(this.paroleEventCommitData,this.paroleEventDeleteList);
		}
		
		for (let n = 0; n < this.paroleEventData.length; n++) {
			if(this.paroleEventData[n].listOffenderSentenceAdjustment == null){
				this.paroleEventData[n].listOffenderSentenceAdjustment = [];
			}		
			for (let m = 0; m < this.adjustmentDeleteList.length; m++) {
				if(this.paroleEventData[n].paroleEventId == this.adjustmentDeleteList[m].objectId){
					
					this.paroleEventData[n].listOffenderSentenceAdjustment.push(this.adjustmentDeleteList[m]);
					this.paroleEventData[n].recordFlag = 'U';
				}				
			}
		}

		for (let i = 0; i < this.paroleEventData.length; i++) {
			if (this.paroleEventData[i].recordFlag == 'U' || this.paroleEventData[i].recordFlag == 'I') {
				this.paroleEventData[i].recordFlag = (this.paroleEventData[i].recordFlag == 'U' && this.paroleEventData[i].paroleEventId)?'U' :'I'; 
				this.paroleEventCommitData.push(this.paroleEventData[i]);
			}
		}
		
		if(this.checkForOverlappingDateUpadteAndInsertRecords(this.paroleEventCommitData)){
			this.show(this.translateService.translate('oidparoe.overlappingAdjustment'), 'warn');
			return false;
		}
		
		let currentDate = new Date();
		for (let i = 0; i < this.paroleEventCommitData.length; i++) {
			//Check all mandatory field filled.
			if (this.paroleEventCommitData[i].eventDate == null || this.paroleEventCommitData[i].eventDate == undefined) {
				this.show(this.translateService.translate('oidparoe.eventDatenotfilled'), 'warn');
				return false;
			}
			if (this.paroleEventCommitData[i].paroleEvent == null || this.paroleEventCommitData[i].paroleEvent == undefined) {
				this.show(this.translateService.translate('oidparoe.eventtypenotfilled'), 'warn');
				return false;
			}
			let eventDate = new Date(this.paroleEventCommitData[i].eventDate);
			if (DateFormat.compareDate(eventDate, currentDate) === 1 ) {
				this.show(this.translateService.translate('oidparoe.eventDateCannotbelaterthansystemDate'), 'warn');
				return false;
			} 
			
			if (this.paroleEventCommitData[i].paroleEventId == null && this.paroleEventCommitData[i].recordFlag == 'I') {
				this.paroleEventCommitData[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
				this.paroleEventCommitData[i].createUserId = this.sessionManager.getId();
				let adjustmentData = this.paroleEventCommitData[i].listOffenderSentenceAdjustment;
				if (adjustmentData != undefined) {
					for (let j = 0; j < adjustmentData.length; j++) {
						if(adjustmentData[j].recordFlag !=='D' && adjustmentData[j].recordFlag !== null) {
						if (adjustmentData[j].orderAdjustCode == null || adjustmentData[j].orderAdjustCode == undefined ||
							adjustmentData[j].adjustDate == null || adjustmentData[j].adjustDate == undefined ||
							adjustmentData[j].adjustFromDate == null || adjustmentData[j].adjustFromDate == undefined ||
							 adjustmentData[j].adjustToDate == null || adjustmentData[j].adjustToDate == undefined ) {
							this.show(this.translateService.translate('oidparoe.adjustmandatoryinfowarn'), 'warn');
							return false;
						}
						let postedDate = new Date(adjustmentData[j].adjustDate);
						if ( DateFormat.compareDate(postedDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.postedDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						let fromDate = new Date(adjustmentData[j].adjustFromDate);
						let toDate = new Date(adjustmentData[j].adjustToDate);
						
						if ( DateFormat.compareDate(fromDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.fromDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						if (DateFormat.compareDate(toDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.toDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						if(fromDate.getTime() > toDate.getTime()){
							this.show(this.translateService.translate('oidparoe.dategreaterthanvalidation'), 'warn');
							return false;
						}
						if(adjustmentData[j].recordFlag !=='D' && adjustmentData[j].recordFlag !== null){
							if(this.checkOverlappingWithExistingAdjustment(adjustmentData[j])){
							this.show(this.translateService.translate('oidparoe.overlappingAdjustment'), 'warn');
							return false;
							}
						}
						
						
						if (adjustmentData[j].objectId == this.paroleEventCommitData[i].paroleEventId) {
							adjustmentData[j].offenderBookId = this.vHeaderBlockModel.offenderBookId;
							adjustmentData[j].objectType = this.PARCONST;
							adjustmentData[j].createUserId = this.sessionManager.getId();
							this.paroleEventCommitData[i].listOffenderSentenceAdjustment[j] = adjustmentData[j];
						}
					}
				}
				}
			} else {
				this.paroleEventCommitData[i].modifyUserId = this.sessionManager.getId();
				//this.paroleEventCommitData[i].recordFlag = 'U';
				let adjustmentData = this.paroleEventCommitData[i].listOffenderSentenceAdjustment;
				if (adjustmentData != undefined) {
					for (let k = 0; k < adjustmentData.length; k++) {
						if(adjustmentData[k].recordFlag !=='D' && adjustmentData[k].recordFlag !== null) {
						if (adjustmentData[k].orderAdjustCode == null || adjustmentData[k].orderAdjustCode == undefined ||
							adjustmentData[k].adjustDate == null || adjustmentData[k].adjustDate == undefined ||
							adjustmentData[k].adjustFromDate == null || adjustmentData[k].adjustFromDate == undefined ||
							 adjustmentData[k].adjustToDate == null || adjustmentData[k].adjustToDate == undefined ) {
							this.show(this.translateService.translate('oidparoe.adjustmandatoryinfowarn'), 'warn');
							return false;
						}
						let postedUpdateDate = new Date(adjustmentData[k].adjustDate);
						if ( DateFormat.compareDate(postedUpdateDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.postedDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						let fromDate = new Date(adjustmentData[k].adjustFromDate);
						let toDate = new Date(adjustmentData[k].adjustToDate);
						
						if ( DateFormat.compareDate(fromDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.fromDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						if (DateFormat.compareDate(toDate, currentDate) === 1 ) {
							this.show(this.translateService.translate('oidparoe.toDateCannotbelaterthansystemDate'), 'warn');
							return false;
						}
						
						if(fromDate.getTime() > toDate.getTime()){
							this.show(this.translateService.translate('oidparoe.dategreaterthanvalidation'), 'warn');
							return false;
						}
						if(adjustmentData[k].recordFlag !=='D' && adjustmentData[k].recordFlag !== null){
							if(this.checkOverlappingWithExistingAdjustment(adjustmentData[k])){
								this.show(this.translateService.translate('oidparoe.overlappingAdjustment'), 'warn');
								return false;
							}
						}
						if (adjustmentData[k].recordFlag == 'U' || adjustmentData[k].recordFlag == 'I') {
							adjustmentData[k].objectType = this.PARCONST;
							if (adjustmentData[k].offenderOrderAdjustId == null) {
								adjustmentData[k].createUserId = this.sessionManager.getId();
								adjustmentData[k].offenderBookId = this.vHeaderBlockModel.offenderBookId;
								this.paroleEventCommitData[i].listOffenderSentenceAdjustment[k] = adjustmentData[k];
							} else {
								adjustmentData[k].modifyUserId = this.sessionManager.getId();
								this.paroleEventCommitData[i].listOffenderSentenceAdjustment[k] = adjustmentData[k];
							}
						}
					}
				}
				}
			}
		}


		if(this.iscalcReasonNeed) {
			this.dialogService.openLinkDialog('/OCUCALCR', this.vHeaderBlockModel, 80).subscribe(result => {
                if (result) {
					this.paroleEventCommitData.forEach( ele =>{
						ele.calcReason = JSON.stringify(result);
					})
					this.saveEvents(this.paroleEventCommitData);
                }
        	});
			
		} else {
			this.saveEvents(this.paroleEventCommitData);
		}	
	}
	
	
	checkForOverlappingDateUpadteAndInsertRecords(paroleEventCommitData: any) {
		let adjustmentTempList: OffenderSentenceAdjustment[] = [];

		for (let i = 0; i < this.paroleEventCommitData.length; i++) {
			adjustmentTempList.push.apply(adjustmentTempList, this.paroleEventCommitData[i].listOffenderSentenceAdjustment)
		}

		for (let n = 0; n < adjustmentTempList.length; n++) {
			for (let m = 0; m < adjustmentTempList.length; m++) {
				if (n != m && adjustmentTempList[n].recordFlag !== 'D' && adjustmentTempList[m].recordFlag !== 'D') {
					let firstFromDate = new Date(adjustmentTempList[n].adjustFromDate);
					let firstToDate = new Date(adjustmentTempList[n].adjustToDate);

					let nextFromDate = new Date(adjustmentTempList[m].adjustFromDate);
					let nextToDate = new Date(adjustmentTempList[m].adjustToDate);

					if (DateFormat.compareDate(firstFromDate, nextFromDate) == 0 && DateFormat.compareDate(firstToDate, nextToDate) == 0) {
						return true;
						
					} else {
						if ((firstFromDate.valueOf() >= nextFromDate.valueOf() && firstFromDate.valueOf() <= nextToDate.valueOf()) ||
							(firstToDate.valueOf() >= nextFromDate.valueOf() && firstToDate.valueOf() <= nextToDate.valueOf())) {
							return true;
						}
					}
				}
			}
		}
	}
	
	checkOverlappingWithExistingAdjustment(adjustment: any) {
		if (adjustment != undefined) {
			for (let i = 0; i < this.existingAdjustments.length; i++) {
				let deletedAdjustment = this.adjustmentDeleteList.filter(obj => obj.offenderOrderAdjustId == this.existingAdjustments[i].offenderOrderAdjustId)
				if(deletedAdjustment.length == 0 && this.existingAdjustments[i].offenderOrderAdjustId !== adjustment.offenderOrderAdjustId) {
				let exAdjustment = this.existingAdjustments[i];
				let exadjustFromDate = new Date(exAdjustment.adjustFromDate);
				let exadjustToDate = new Date(exAdjustment.adjustToDate);
				let adjFromDate = new Date(adjustment.adjustFromDate);
				let adjToDate = new Date(adjustment.adjustToDate);

				if ( DateFormat.compareDate(exadjustFromDate, adjFromDate) == 0 && DateFormat.compareDate(exadjustToDate, adjToDate) == 0) {
					return true;
				} else {
					if ((adjFromDate.valueOf() >= exadjustFromDate.valueOf() && adjFromDate.valueOf() <= exadjustToDate.valueOf()) ||
						(adjToDate.valueOf() >= exadjustFromDate.valueOf() && adjToDate.valueOf() <= exadjustFromDate.valueOf())) {
						return true;
					}
				}
			  }
			}
		}

	}

	saveEvents(paroleEventCommitData: any) {
		const paroleEventSaveData = this.oidparoeService.paroleEventCommit(paroleEventCommitData);
		paroleEventSaveData.subscribe(submitResult => {
			this.paroleEventDeleteList = [];
			this.existingAdjustments = [];
			this.paroleEventCommitData = [];
			this.adjustmentDeleteList = [];
			const mapObject = new Map(Object.entries(submitResult));
			this.isSingleSaveBtnDisable = true;
			for (let [key, value] of mapObject) {
				if (value['eventResponse'] == "Failed") {
					this.message = this.translateService.translate('oidparoe.addupdateremoverecordfail');
					this.show(this.message, 'warn');
				} else if (value['eventResponse'] != "Success" && this.iscalcReasonNeed) {
					let dlgData = {};
					if (value['eventResponse'] == '2') {
						dlgData = {
							heading: 'Warning',
							label: this.translateService.translate('ocucalcr.userhaspendingcalcevents'),
							yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
						};
					} else if (value['eventResponse'] == '3') {
						dlgData = {
							heading: 'Warning',
							label: this.translateService.translate('ocucalcr.applicationstatusdown'),
							yesBtn: true, noBtn: false, yesLabel: this.translateService.translate('ocucalcr.warnok')
						};
					}
					if (Object.keys(dlgData).length > 0) {
						this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dlgData, 50).subscribe(result => {
						});
					}
					this.show(this.translateService.translate('ocdleglo.savedaspendingevent'));
				}
				this.iscalcReasonNeed = false;
				this.show(this.translateService.translate('oidparoe.addupdateremoverecordsuccess'), 'success');
				this.getPaloreEvents(this.vHeaderBlockModel.offenderBookId);
				this.getAllExistingAdjustment(this.vHeaderBlockModel.offenderBookId);
				return;
			}
			this.iscalcReasonNeed = false;
			this.message = this.translateService.translate('oidparoe.addupdateremoverecordsuccess');
			this.show(this.message, 'success');
			this.getPaloreEvents(this.vHeaderBlockModel.offenderBookId);
			this.getAllExistingAdjustment(this.vHeaderBlockModel.offenderBookId);
			return;
		});
	}

	canAddParoleEent = (data: any, index: number, field: string, originalIndex: number): boolean => {
		if (data.paroleEventId == undefined) {
			return true;
		} else {
			return false;
		}
	}

	//Based on prole event find adujstment
	onRowClickEvent(event) {
		this.adjustInsertFlag = true;
		this.adjustmentRowData = [];
		this.initialAdjustmentData = [];
		this.selectedParEventModel = event;
		this.selectedObjectId = event.paroleEventId;
		this.SelectedTempId = event.tempId;
		let eventAdjustments = event.paroleEventId? this.paroleEventData.filter(i=> i.paroleEventId == event.paroleEventId)[0].listOffenderSentenceAdjustment : this.paroleEventData.filter(i=> i['tempId'] == event['tempId'])[0].listOffenderSentenceAdjustment;
		if (eventAdjustments) {
			let initialAdjustments = event.paroleEventId ? this.initialEventData?.filter(i => i.paroleEventId == event.paroleEventId)[0].listOffenderSentenceAdjustment : [];
			this.initialAdjustmentData = JSON.parse(JSON.stringify(initialAdjustments?initialAdjustments: []));
			this.adjustmentRowData = eventAdjustments.filter(i => i.recordFlag != 'D');
		}
	}

	onAdjustmentRowClicked(event) {
		if (this.initialEventData) {
			let initialAdjustments = event.objectId ? this.initialEventData?.filter(i => i.paroleEventId == event.objectId)[0].listOffenderSentenceAdjustment : [];
			if (!(initialAdjustments && this.adjustmentRowData && JSON.stringify(this.adjustmentRowData) == JSON.stringify(initialAdjustments))) {
				this.adjustmentGrid.btnClearbtnDisable = false;
			}
		}
	}

	onclearedData(event, gridName?: string) {
		this.isSingleSaveBtnDisable = true;
		this.iscalcReasonNeed = false;
		this.adjustmentRowData = [];
		this.tempId = 0;
		this.paroleEventData = this.initialEventData;
		this.paroleEventCommitData = [];
		this.getPaloreEvents(this.vHeaderBlockModel.offenderBookId);
	}

	onEventGridInsert = () => {
		let intialflag = false;
		if (this.paroleEventData.length >= 1) {
			for (let i = 0; i < this.paroleEventData.length; i++) {
				if (this.paroleEventData[i].paroleEvent == this.RPARCONST) {
					intialflag = true;
				}
			}
		} else {
			this.show(this.translateService.translate('oidparoe.initialParoleEventnotCreated'), 'warn');
		}
		if (!intialflag) {
			this.show(this.translateService.translate('oidparoe.initialParoleEventnotCreated'), 'warn');
			return;
		} else {
			this.adjustmentRowData = [];
			return {};
		}

	}

	validateEventRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		let systemDate = new Date();
		let eventDate = new Date(event.data.eventDate);
		if(event.field != 'comment' && (event.data.paroleEvent == "PAR_REV" || event.data.paroleEvent == "RPAR")){
			this.iscalcReasonNeed = true;
		}
		if(event.field === 'comment' && event.newValue !== event.oldValue) {
			this.isSingleSaveBtnDisable = true;
		}
		
		
		if (event.field === 'eventDate' && DateFormat.compareDate(eventDate, systemDate) === 1 ) {
			// this.iscalcReasonNeed = true;
			this.show(this.translateService.translate('oidparoe.eventDateCannotbelaterthansystemDate'), 'warn');
			rowdata.validated = true;
			return rowdata;
		} 
		if (event.field === 'eventDate' && event.newValue !== event.oldValue) {
			// this.iscalcReasonNeed = true;
			this.isSingleSaveBtnDisable = true;
		}
		if (event.data.paroleEventId == null) {
			rowdata['recordFlag'] = 'I';
		}
		rowdata.validated = true;
		return rowdata;
	}
	

	onGridInsert = () => {
		return { adjustDays: 0, objectId: this.selectedObjectId };
	}

	onAdjustmentDelete = (row) => {
		row[0].recordFlag = 'D';
		this.adjustmentDeleteList.push(row[0]);
		this.isSingleSaveBtnDisable = false;
		if(this.selectedParEventModel.paroleEvent == "PAR_REV"){// If this adjustments results in Keydates
			this.iscalcReasonNeed = true;
		}
		return true;
	}
	
	onEventDelete = (row) => {		
		if(this.adjustmentRowData.length >0){
			this.show(this.translateService.translate('oidparoe.childrecordexist'), 'warn');
			return false;
		}
		if(row[0].paroleEventId){
			row[0].recordFlag = 'D';
			this.paroleEventDeleteList.push(row[0]);
			this.isSingleSaveBtnDisable = false;
		}
		return true;
	}
	

	validateRowData = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		
		let systemDate = new Date();
		let adjustDate = new Date(event.data.adjustDate);
		if(this.selectedParEventModel && this.selectedParEventModel.paroleEvent == 'PAR_REV' && event.field != 'commentText'){
			this.iscalcReasonNeed = true;
		}
		if(event.field === 'commentText' && event.newValue !== event.oldValue) {
			this.isSingleSaveBtnDisable = true;
		}
		
		if (event.field === 'adjustDays' && event.newValue !== event.oldValue) {
			// this.iscalcReasonNeed = true;
			this.isSingleSaveBtnDisable = true;
		}
		if (event.field === 'adjustDate' && DateFormat.compareDate(adjustDate, systemDate) === 1 ) {
			this.show(this.translateService.translate('oidparoe.postedDateCannotbelaterthansystemDate'), 'warn');
			rowdata.validated = true;
			return rowdata;
		} 
		let fromDate = new Date(event.data.adjustFromDate);
		let toDate = new Date(event.data.adjustToDate);
		
		if (event.field === 'adjustFromDate' && DateFormat.compareDate(fromDate, systemDate) === 1 ) {
			this.show(this.translateService.translate('oidparoe.fromDateCannotbelaterthansystemDate'), 'warn');
			rowdata.validated = true;
			return rowdata;
		}
		
		if (event.field === 'adjustToDate' && DateFormat.compareDate(toDate, systemDate) === 1 ) {
			this.show(this.translateService.translate('oidparoe.toDateCannotbelaterthansystemDate'), 'warn');
			rowdata.validated = true;
			return rowdata;
		}
		
		if(fromDate.getTime() > toDate.getTime()){
			this.show(this.translateService.translate('oidparoe.dategreaterthanvalidation'), 'warn');
			rowdata.validated = true;
			return rowdata;
		}
		
		
		const oneDay = 1000 * 60 * 60 * 24;
		
		if ((event.field === 'adjustFromDate' && event.oldValue !== event.newValue) ||
			event.field === 'adjustToDate' && event.oldValue !== event.newValue) {
				// this.iscalcReasonNeed = true;
			if (toDate.getTime() >= fromDate.getTime()) {
				var time_difference = toDate.getTime() - fromDate.getTime();
				this.days = time_difference / oneDay;
				rowdata.data = { adjustDays:  this.days? Math.round(this.days) + 1 : 1 };
				rowdata.validated = true;
				return rowdata;
			} else {
				rowdata.validated = true;
				return rowdata;
			}
		} else {
			rowdata.validated = true;
			return rowdata;
		}
	}


	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
		this.paroleEventCommitData = [];
	}

	cellKeyDown(e) {
		this.isSingleSaveBtnDisable = e.isSaveButtonDisable;
		let rowData = e.rowData ? e.rowData : null;
		let cellValue = rowData && e.cellField ? rowData[e.cellField] : null;
		let cellField = e.cellField ? e.cellField : null;
		if (rowData && (cellField == 'adjustDate' || cellField == "adjustFromDate" ||
			cellField == "adjustToDate") &&
			e.colType == 'date' && this.isValidDate(cellValue)) {
			let systemDate = new Date();
			let adjustDate = new Date(rowData.adjustDate);
			let fromDate = new Date(rowData.adjustFromDate);
			let toDate = new Date(rowData.adjustToDate);

			cellValue = this.formattedDate(cellValue);
			adjustDate = cellField == 'adjustDate' ? cellValue : adjustDate;
			fromDate = cellField == 'adjustFromDate' ? cellValue : fromDate;
			toDate = cellField == 'adjustToDate' ? cellValue : toDate;

			if (cellField === 'adjustDate' && DateFormat.compareDate(adjustDate, systemDate) === 1) {
				this.show(this.translateService.translate('oidparoe.postedDateCannotbelaterthansystemDate'), 'warn');
				return;
			}

			if (cellField === 'adjustFromDate' && DateFormat.compareDate(fromDate, systemDate) === 1) {
				this.show(this.translateService.translate('oidparoe.fromDateCannotbelaterthansystemDate'), 'warn');
				return;
			}

			if (cellField === 'adjustToDate' && DateFormat.compareDate(toDate, systemDate) === 1) {
				this.show(this.translateService.translate('oidparoe.toDateCannotbelaterthansystemDate'), 'warn');
				return;
			}

			const oneDay = 1000 * 60 * 60 * 24;

			if (cellField === 'adjustFromDate' || cellField === 'adjustToDate') {
				// this.iscalcReasonNeed = true;
				if (toDate.getTime() >= fromDate.getTime()) {
					var time_difference = toDate.getTime() - fromDate.getTime();
					this.days = time_difference / oneDay;
					let days = this.days ? Math.round(this.days) + 1 : 1 ;
					this.adjustmentGrid.setColumnData('adjustDays', e.rowIndex, days);
					return;
				}
			}
		}
	}

	cellKeyDownEventGrid(e){
		this.isSingleSaveBtnDisable = e.isSaveButtonDisable;
	}


	isValidDate(value){
		if(value == undefined || value == '' || value == null){
           return false;
		}
		let occOfUnderscore = (value.match(new RegExp("_", "g")) || []).length;
		return occOfUnderscore == 0 ? true : false;
	}

	formattedDate(value){
		let dd = value.split('-')[0];
		let mm = value.split('-')[1] - 1;
		let yy = value.split('-')[2];
		value = yy + '-' + mm + '-' + dd;
		return new Date(yy, mm, dd, 0, 0, 0);
	}

}	