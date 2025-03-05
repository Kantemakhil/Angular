import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { VProgramPhases } from '@inst/institutional-activities/maintenance/beans/VProgramPhases';
import { OcmsvphaService } from '../service/ocmsvpha.service';
import { VProgramPhasesCommitBean } from '../beans/VProgramPhasesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
	selector: 'app-ocmsvpha',
	templateUrl: './Ocmsvpha.component.html'
})

export class OcmsvphaComponent implements OnInit {
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	@ViewChild('placegrid', { static: true }) placegrid: any;
	// Variable declaration
	msgs: any[] = [];
	vPrgPhssData: VProgramPhases[] = [];
	vPrgPhssDataTemp: VProgramPhases[] = [];
	// TODO angular.copy(this.vprgphssData, thisvprgphssDataTemp);
	vPrgPhssModel: VProgramPhases = new VProgramPhases();
	vPrgPhssBean: VProgramPhases = new VProgramPhases();
	vPrgPhssModelTemp: VProgramPhases = new VProgramPhases();
	vPrgPhssInsertList: VProgramPhases[] = [];
	vPrgPhssUpdatetList: VProgramPhases[] = [];
	vPrgPhssDeleteList: VProgramPhases[] = [];
	enableInsert: boolean;
	enableDelete: boolean;
	enableUpdateBtn :boolean;
	errorMessage: string;
	parentDescription: string;
	parentDescCode: string;
	parentProgramId: number;
	disabled: boolean;
	editable: boolean = true;
	vPrgPhssColumnDef: any[];
	tableIndex = -1;
	modulesBtn: boolean;
	blockContentBtn: boolean;
	vPrgPhssCommitModel: VProgramPhasesCommitBean = new VProgramPhasesCommitBean();
	courceActCount: number;
	type: string;
	commenttext: string;
	message: string;
	constructor(private ocmsvphaFactory: OcmsvphaService, public translateService: TranslateService, public sessionManager: UserSessionManager
		, public dialogService: DialogService) {
		// TODO initilize data members here..!
		this.vPrgPhssColumnDef = [];
	}
	ngOnInit() {
		this.parentDescCode = this.dialog.data.programCode;
		this.parentDescription = this.dialog.data.description;
		this.vPrgPhssModelTemp.programId = this.dialog.data.programId;
		this.vPrgPhssModelTemp.activeFlag = this.dialog.data.activeFlag;
		this.modulesBtn = true;
		this.blockContentBtn = true;
		this.enableUpdateBtn = true;
		this.enableDelete = false;

		if (this.vPrgPhssModelTemp.programId) {
			this.getCourceActCount();
		}
		this.vPrgPhssColumnDef = [
			{
				fieldName: '', field: 'test', hide: true, width: 150
			},
			{ fieldName: this.translateService.translate('ocmsvpha.sequence'), field: 'listSeq', editable: false, datatype:'number', width: 150, minValue: 1, maxValue: 9999999},
			{
				fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description', datatype: 'lov', domain: 'PS_PHASE',
				editable: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmsvpha.modular'), field: 'moduleFlag', datatype: 'checkbox', width: 150,
				cellEditable: this.canMouleFlag
			},
			{
				fieldName: this.translateService.translate('ocmsvpha.modulartypemandatory'), field: 'moduleTypeDesc', cellEditable: this.canNbtModuleTypeDesc, datatype: 'lov', domain: 'PS_MOD_TYPE',
				editable: true, width: 150
			},
			{ fieldName: this.translateService.translate('common.capacity'), field: 'capacity', editable: true, minValue: 0 ,maxValue: 9999999 , width: 150 ,datatype:'number', whole: true},
			{ fieldName: this.translateService.translate('ocmsvpha.noofsessions'), field: 'noOfSessions', editable: true, minValue: 0 ,maxValue: 9999999, width: 150 , datatype: 'number' , cellEditable: this.canModuleFlagsEdit ,
			 whole: true},
			{ fieldName: this.translateService.translate('ocmsvpha.sessionlength'), field: 'sessionLength', editable: true, width: 150, datatype: 'time' },
			{ fieldName: '', field: 'commentText', width: 150, hide: true, },
		];

		this.vPrgPhssExecuteQuery();
	}
	clearQuery() {
		  
		this.dialog.close(null);
	}

	canModuleFlagsEdit = (data: any, index: number, field: string): boolean => {
		if (this.vPrgPhssBean && this.vPrgPhssBean.moduleFlag) {
			return false;
		} else {
			return true;
		}
	}
	canMouleFlag = (data: any, index: number, field: string): boolean => {
		if(data.programId){
			return false;
		}else{
			return true;
		}
		/* if (this.vPrgPhssBean && !this.vPrgPhssBean.programId) {
			return false;
		} else {
			return true;
		} */
	}
	canNbtModuleTypeDesc = (data: any, index: number, field: string): boolean => {
		if(data.programId){
			return false;
		}
		if (this.vPrgPhssBean && this.vPrgPhssBean.moduleFlag) {
			return true;
		}
		else {
			return false;
		}
	}
	/**
*  This function will be executed when we click on validation button
*
*/
	validateRow = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === "listSeq") {
			if (event.data.listSeq) {
				this.placegrid.setColumnData('test', rowIndex, event.listSeq);
			}
		}

		if (event.field === "moduleFlag"){
			if(!event.data.moduleFlag){
				this.placegrid.setColumnData('moduleTypeDesc', rowIndex, undefined);
			}
		}

		if (event.field === "moduleFlag" && !event.programId) {
			if (event.data.moduleFlag) {
				this.placegrid.setColumnData('noOfSessions', rowIndex, undefined);
				this.placegrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['moduleTypeDesc'].includes(obj.colId) ) {
						obj.colDef.headerClass = 'header-col';
						this.placegrid.gridApi.refreshHeader();
					}

					if ( ['noOfSessions'].includes(obj.colId) ) {
						obj.colDef.headerClass = '';
						this.placegrid.gridApi.refreshHeader();
					}
				});
			}else{
				this.placegrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['moduleTypeDesc'].includes(obj.colId) ) {
						obj.colDef.headerClass = '';
						this.placegrid.gridApi.refreshHeader();
					}

					if ( ['noOfSessions'].includes(obj.colId) ) {
						obj.colDef.headerClass = 'header-col';
						this.placegrid.gridApi.refreshHeader();
					}
				});
			}

		}
		

		if (event.data.moduleType === "BLOCK" && event.data.moduleFlag) {
			this.blockContentBtn = false;
		} else {
			this.blockContentBtn = true;
		}

		if (!event.data.moduleFlag) {
			this.modulesBtn = true;
		} /*  else {
			this.modulesBtn = false;
		} */

		rowdata.validated = true;
		return rowdata;
	}

	get modulesBtnDis(){
		if(this.placegrid.addedMap.size>0 || this.placegrid.updatedMap.size>0
			|| this.placegrid.removedMap.size>0){
				return true;
			}else{
				return false;
			}
	}


	/**
	 * This function displays the messages
	 * 	  
	 * */
	show(vldmsg, type?) {
		type = type ? type : 'warn';
		vldmsg = this.translateService.translate(vldmsg);
		const msgval = [{ message: vldmsg, type: type }];
		this.msgs = [...msgval];
	}

	onRowClickvprgphss(event) {
		this.commenttext = event.commentText;
		this.vPrgPhssBean = event;
		this.tableIndex = event.rowIndex;
		this.vPrgPhssModel.programPhaseId = event.programPhaseId;
		this.vPrgPhssModel.nbtDescription = event.nbtDescription;
		this.vPrgPhssModel.activeFlag = event.activeFlag;
	
		if (event.moduleType === "BLOCK" && event.moduleFlag) {
			this.blockContentBtn = false;
		} else {
			this.blockContentBtn = true;
		}

		if (!event.moduleFlag) {
			this.modulesBtn = true;
			this.placegrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
				if ( ['moduleTypeDesc'].includes(obj.colId) ) {
					obj.colDef.headerClass = '';
					this.placegrid.gridApi.refreshHeader ();
				} 

				if ( ['noOfSessions'].includes(obj.colId) ) {
					obj.colDef.headerClass = 'header-col';
					this.placegrid.gridApi.refreshHeader();
				}
			});
			//this.placegrid.setColumnHeader('moduleTypeDesc',this.translateService.translate('ocmsvpha.modulartype'));
		} else {
			this.modulesBtn = false;
			this.placegrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
				if ( ['moduleTypeDesc'].includes(obj.colId) ) {
					obj.colDef.headerClass = 'header-col';
					this.placegrid.gridApi.refreshHeader();
				} 

				if ( ['noOfSessions'].includes(obj.colId) ) {
					obj.colDef.headerClass = '';
					this.placegrid.gridApi.refreshHeader ();
				} 
			});
			//this.placegrid.setColumnHeader('moduleTypeDesc',this.translateService.translate('ocmsvpha.modulartypemandatory'));

		}


	}
	cancel() {
	}
	
	listSeqValidations() {
		const is = { valid: true };
		this.vPrgPhssData.forEach(data => {
			if (is.valid) {
				const index = this.vPrgPhssData.indexOf(data);
				for (let i = 0; i < this.vPrgPhssData.length; i++) {
					if (index !== i && this.vPrgPhssData[i].listSeq == data.listSeq) {
						this.message = this.translateService.translate('ocmsvpha.uniqueseq');
						this.show(this.message, 'warn');
						is.valid = false;
						return is.valid;
					}
				}
			}
		});
		return is.valid;
	}

	vPrgPhssExecuteQuery() {
		const vprgphssResult = this.ocmsvphaFactory.vPrgPhssExecuteQuery(this.vPrgPhssModelTemp);
		vprgphssResult.subscribe(vprgphssResultList => {
			if (vprgphssResultList.length === 0) {
				this.vPrgPhssData = [];
				this.enableDelete = false;
			} else {
				vprgphssResultList.forEach(element => {
					element.listSeqTemp = element.listSeq;
					if (element.moduleFlag) {
						element.moduleFlag = element.moduleFlag === 'Y' ? true : false;
					}
					if (element.sessionLength !== null && element.sessionLength !== 0) {
						element.sessionLength = Math.abs(element.sessionLength / 60).toFixed(2);
						if (element.sessionLength.toString().includes('.')) {
							var time = element.sessionLength + '';
							var val = time.split('.');
							var val1 = Number(val[0]);
							var val2 = Number(val[1]);
							var minutes = Math.round((val2 / 100) * 60);
							element.sessionLength = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
						} else {
							element.sessionLength = DateFormat.getDate(DateFormat.getDate().setHours(element.sessionLength, 0, 0, 0));
						}
					} else if(element.sessionLength == 0) {
						element.sessionLength = DateFormat.getDate(DateFormat.getDate().setHours(element.sessionLength, 0, 0, 0));
					}
				});
				this.vPrgPhssData = vprgphssResultList;
				this.enableDelete = true;
				this.enableUpdateBtn = true;
				this.tableIndex = 0;
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	ocmsvphaSaveVPrgPhssForm(event) {
		
		// TODO declare commit bean and add insert list to that object.
		this.vPrgPhssInsertList = event.added;
		this.vPrgPhssUpdatetList = event.updated;
		this.vPrgPhssDeleteList = event.removed;
		this.vPrgPhssCommitModel.insertList = [];
		this.vPrgPhssCommitModel.updateList = [];
		this.vPrgPhssCommitModel.deleteList = [];
		if (this.vPrgPhssInsertList.length > 0 ||  this.vPrgPhssUpdatetList.length > 0){
			if (!this.ocmsvphaValidations()) {
				return;
			}
		}
		if (this.vPrgPhssInsertList.length > 0) {
			for (let i = 0; i < this.vPrgPhssInsertList.length; i++) {
				this.vPrgPhssInsertList[i].programId = this.vPrgPhssModelTemp.programId;
				this.vPrgPhssInsertList[i].moduleFlag = this.vPrgPhssInsertList[i].moduleFlag ? 'Y' : 'N';
				this.vPrgPhssInsertList[i].activeFlag = this.vPrgPhssModelTemp.activeFlag ? 'Y' : 'N';
				if (this.vPrgPhssInsertList[i].sessionLength) {
					this.vPrgPhssInsertList[i].sessionLength = (DateFormat.getDate(this.vPrgPhssInsertList[i].sessionLength)
						.getHours() * 60) + (DateFormat.getDate(this.vPrgPhssInsertList[i].sessionLength).getMinutes());
				}
				this.vPrgPhssCommitModel.insertList = this.vPrgPhssInsertList;
			}
		}
		if (this.vPrgPhssUpdatetList.length > 0) {

			for (let i = 0; i < this.vPrgPhssUpdatetList.length; i++) {
				this.vPrgPhssUpdatetList[i].programId = this.vPrgPhssModelTemp.programId;
				this.vPrgPhssUpdatetList[i].moduleFlag = this.vPrgPhssUpdatetList[i].moduleFlag ? 'Y' : 'N';
				if (this.vPrgPhssUpdatetList[i].sessionLength) {
					this.vPrgPhssUpdatetList[i].sessionLength = (DateFormat.getDate(this.vPrgPhssUpdatetList[i].sessionLength)
						.getHours() * 60) + (DateFormat.getDate(this.vPrgPhssUpdatetList[i].sessionLength).getMinutes());
				}
				this.vPrgPhssCommitModel.updateList = this.vPrgPhssUpdatetList;
			}
		}
		if (this.vPrgPhssDeleteList.length > 0) {
			for (let i = 0; i < this.vPrgPhssDeleteList.length; i++) {
				this.vPrgPhssDeleteList[i].moduleFlag = this.vPrgPhssDeleteList[i].moduleFlag ? 'Y' : 'N';
				if (this.vPrgPhssDeleteList[i].sessionLength || this.vPrgPhssDeleteList[i].sessionLength === null) {
					this.vPrgPhssDeleteList[i].sessionLength = (DateFormat.getDate(this.vPrgPhssDeleteList[i].sessionLength)
						.getHours() * 60) + (DateFormat.getDate(this.vPrgPhssDeleteList[i].sessionLength).getMinutes());
				}
				this.vPrgPhssCommitModel.deleteList = this.vPrgPhssDeleteList;
			}
		}
		const vprgphssSaveData = this.ocmsvphaFactory.vPrgPhssCommit(this.vPrgPhssCommitModel);
		vprgphssSaveData.subscribe(data => {
			if (data && data.sealFlag === '1') {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.vPrgPhssExecuteQuery();
				return;
			} else if (data && data.sealFlag === '0') {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.vPrgPhssExecuteQuery();
				return;
			}
			else if (data && data.sealFlag && data.seqOne === 2292) {
				this.message = this.translateService.translate('ocmsvpha.recordcannotbedeleted');
				//this.message = String(this.message).replace('%tablename%', data.sealFlag);
				this.show(this.message, 'warn');
				this.vPrgPhssExecuteQuery();
				return;
			} else if (data && data.sealFlag && data.seqOne === 2291) {
				this.message = this.translateService.translate('common.recordcannotbedeletedparent');
				this.message = String(this.message).replace('%tablename%', data.sealFlag);
				this.show(this.message, 'warn');
				this.vPrgPhssExecuteQuery();
				return;
			}
		});

	}
	onVPrgPhssInsert = () => {
		this.enableDelete = false;
		this.enableUpdateBtn = true;
		const index = this.vPrgPhssData.length;
		if (this.placegrid.addedMap.size > 0) {
			return {
				listSeq: this.vPrgPhssData[index - 1].listSeq + 1
			}
		} else {
			const getSeqMax = this.ocmsvphaFactory.getListSeqMaxCount(this.vPrgPhssModelTemp);
			getSeqMax.subscribe(data => {
				if (data) {
					this.placegrid.setColumnData('listSeq', index, data);
				}
			});
			return {
				listSeq: undefined
			}
		}
	}

	getCourceActCount() {
		const vprgphssResult = this.ocmsvphaFactory.getCourceActivityCount(this.vPrgPhssModelTemp);
		vprgphssResult.subscribe(data => {
			if (data) {
				this.courceActCount = data;
			}
		});

	}

	ocmsvphaValidations() {
		const is = { valid: true };
		this.vPrgPhssDataTemp = [];
		this.placegrid.addedMap.forEach(
			(v: any, k: number) => {
				this.vPrgPhssDataTemp.push(v);
			}
		);
		this.placegrid.updatedMap.forEach(
			(v: any, k: number) => {
				this.vPrgPhssDataTemp.push(v);
			}
		);
		this.vPrgPhssDataTemp.forEach(data => {
			if (is.valid) {
				if (!data.listSeq) {
					this.show(this.translateService.translate('common.sequencemustbeentered'), 'warn');
					is.valid = false;
					return;
				}
				if (!this.listSeqValidations()) {
					is.valid = false;
					return;
				}
				if (data.listSeq != data.listSeqTemp && data.programId && this.courceActCount > 0 && data.programPhaseId) {
					this.show(this.translateService.translate('ocmsvpha.listseqvalidation'), 'warn');
					is.valid = false;
					return;
				}

				if (!data.description || !data.description.trim()) {
					this.show(this.translateService.translate('common.descriptionmustbeentered'), 'warn');
					is.valid = false;
					return;
				}
				if (!data.moduleFlag && !data.noOfSessions) {
					this.show(this.translateService.translate('ocmsvpha.noofsessionsvalidation'), 'warn');
					is.valid = false;
					return;
				}
			
				if (data.moduleFlag && !data.moduleTypeDesc) {
					this.show(this.translateService.translate('ocmsvpha.moduletypemustbeentered'), 'warn');
					is.valid = false;
					return;
				}
			}
		});
		return is.valid;
	}
	onClear = () => {
		// this.enableInsert = false;
		this.enableDelete = true;
		this.vPrgPhssModelTemp.listSeqTemp =undefined; 
		this.vPrgPhssExecuteQuery();
        return true;
	}

	onCommentTextInsert(event) {
		const index = this.vPrgPhssData.indexOf(this.vPrgPhssBean);
		this.placegrid.setColumnData('commentText', index, event);
	}


	onModulesLaunchClick = () => {
		this.modulesBtn = true;
		this.dialogService.openLinkDialog('/OCMSVMOD', this.vPrgPhssModel, 80).subscribe(result => {
			this.vPrgPhssExecuteQuery();
		});
	}
	onBlockContentLaunchClick = () => {
		this.dialogService.openLinkDialog('/OCMPHBLK', this.vPrgPhssModel, 80).subscribe(result => {
			this.tableIndex = 0;
		});
	}
}
