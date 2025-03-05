import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { VProgramModules } from '../beans/VProgramModules';
import { VProgramModulesCommitBean } from '../beans/VProgramModulesCommitBean';
import { OcmsvmodService } from '../service/ocmsvmod.service';

// import required bean declarations

@Component({
	selector: 'app-ocmsvmod',
	templateUrl: './ocmsvmod.component.html'
})

export class OcmsvmodComponent implements OnInit {
	// Variable declaration
	@ViewChild('placegrid', { static: false }) placegrid: any;
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	msgs: any[] = [];
	vprgmdlsData: VProgramModules[] = [];
	vprgmdlsTemp: VProgramModules = new VProgramModules();
	vprgmdlsDataTemp: VProgramModules[] = [];
	// TODO angular.copy(this.vprgmdlsData, thisvprgmdlsDataTemp);
	vPrgMdlsModel: VProgramModules = new VProgramModules();
	vprgmdlsBean: VProgramModules = new VProgramModules();
	vprgmdlsIndex = -1;
	vprgmdlsInsertList: VProgramModules[] = [];
	vprgmdlsUpdatetList: VProgramModules[] = [];
	vprgmdlsDeleteList: VProgramModules[] = [];
	editable: boolean;
	enableInsert: boolean;
	enableDelete: boolean;
	parentDescription : string;
	vPrgMdlsColumnDef: any[];
	vprgmdlsCommitModel: VProgramModulesCommitBean = new VProgramModulesCommitBean();
	type: string;
	message: string;
	seqName: number;
	constructor(private ocmsvmodFactory: OcmsvmodService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.vPrgMdlsColumnDef = [];
	}
	ngOnInit() {
		this.vPrgMdlsModel = this.dialog.data;
		this.enableDelete = false;
		this.parentDescription = this.dialog.data.nbtDescription;
		this.vPrgMdlsColumnDef = [
			{
				fieldName: '', field: 'test', hide: true, width: 150
			},
			{
				fieldName: this.translateService.translate('ocmsvmod.sequence'), field: 'listSeq', editable: true, width: 150, datatype: 'number',minValue: 1 ,maxValue: 999999, required: true
			},
			{
				fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description', editable: true, width: 150,
				datatype: 'text', maxlength: 40, uppercase: 'false'
			},
			{
				fieldName: this.translateService.translate('ocmsvmod.numberofsessions'), field: 'noOfSessions', editable: true, width: 150, datatype: 'number',minValue: 1, maxValue: 999999, required: true
			},
			{
				fieldName: this.translateService.translate('ocmsvmod.startpermitted'), field: 'startFlag', editable: true, width: 150, datatype: 'checkbox'
			},

		];

		this.vprgmdlsExecuteQuery();
	}
	validateRow = (event) => {
		const rowIndex = event.rowIndex;
		const rowdata = new ValidateRowReturn();
		if (event.field === "listSeq") {
			if (event.data.listSeq) {
				this.placegrid.setColumnData('test', rowIndex, event.listSeq);
			}
			if (!this.listSeqValidations()) {
				// return;
				rowdata.validated = true;
				return rowdata;
			}
		}
		rowdata.validated = true;
		return rowdata;
	}

	listSeqValidations() {
		const is = { valid: true };
		this.vprgmdlsData.forEach(data => {
			if (is.valid) {
				const index = this.vprgmdlsData.indexOf(data);
				for (let i = 0; i < this.vprgmdlsData.length; i++) {
					if (index !== i && this.vprgmdlsData[i].listSeq == data.listSeq) {
						this.message = this.translateService.translate('ocmsvmod.listsequencemustbeunique')
						this.show(this.message, 'warn');
						is.valid = false;
						return is.valid;
					}
				}
			}
		});
		return is.valid;
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
	////this.dialog.data.programPhaseId:  2710 ,2266,2707
	vprgmdlsExecuteQuery() {
		this.vPrgMdlsModel.programPhaseId = this.dialog.data.programPhaseId;
		const vprgmdlsResult = this.ocmsvmodFactory.
			vPrgMdlsExecuteQuery(this.vPrgMdlsModel);
		vprgmdlsResult.subscribe(data => {
			if (data.length === 0) {
				this.vprgmdlsData = [];
				//this.enableDelete = false;
			} else {
				data.forEach(element => {
					element.startFlag = element.startFlag === 'Y' ? true : false;
				});
				this.vprgmdlsData = data;
				this.vPrgMdlsModel = data[0];
				//this.enableDelete = true;
				this.vprgmdlsIndex = 0;
			}
		});
	}
	/**
	 * this function execute when commit event is fired
	 * 
	 */
	saveVPrgMdlsForm(event) {
		if (!this.ocmsvmodValidations()) {
			return;
		}
		// TODO declare commit bean and add insert list to that object.
		this.vprgmdlsInsertList = event.added;
		this.vprgmdlsUpdatetList = event.updated;
		this.vprgmdlsDeleteList = event.removed;
		this.vprgmdlsCommitModel.insertList = [];
		this.vprgmdlsCommitModel.updateList = [];
		this.vprgmdlsCommitModel.deleteList = [];
		if (this.vprgmdlsInsertList.length > 0 || this.vprgmdlsUpdatetList.length > 0) {
			for (let i = 0; i < this.vprgmdlsInsertList.length; i++) {
				this.vprgmdlsInsertList[i].programPhaseId = this.dialog.data.programPhaseId;
				this.vprgmdlsInsertList[i].startFlag = this.vprgmdlsInsertList[i].startFlag ? 'Y' : 'N';
				this.vprgmdlsInsertList[i].activeFlag = this.vPrgMdlsModel.activeFlag ? 'Y' : 'N';
				this.vprgmdlsCommitModel.insertList = this.vprgmdlsInsertList;
			}
		}
		if (this.vprgmdlsUpdatetList.length > 0) {
			for (let i = 0; i < this.vprgmdlsUpdatetList.length; i++) {
				this.vprgmdlsUpdatetList[i].programPhaseId = this.dialog.data.programPhaseId;
				this.vprgmdlsUpdatetList[i].startFlag = this.vprgmdlsUpdatetList[i].startFlag ? 'Y' : 'N';
			}
			this.vprgmdlsCommitModel.updateList = this.vprgmdlsUpdatetList;
		}
		if (this.vprgmdlsDeleteList.length > 0) {
			for (let i = 0; i < this.vprgmdlsDeleteList.length; i++) {
				this.vprgmdlsDeleteList[i].startFlag = this.vprgmdlsDeleteList[i].startFlag ? 'Y' : 'N';
				this.vprgmdlsCommitModel.deleteList = this.vprgmdlsDeleteList;
			}
		}
		const vprgmdlsSaveData = this.ocmsvmodFactory.vPrgMdlsCommit(this.vprgmdlsCommitModel);
		vprgmdlsSaveData.subscribe(data => {
			if (data && data.sealFlag === '1') {
				this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
				this.vprgmdlsExecuteQuery();
				return;
			} else if (data && data.sealFlag === '0') {
				this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
				this.vprgmdlsExecuteQuery();
				return;
			} else if (data && data.sealFlag && data.seqOne === 2292) {
				this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
				this.message = String(this.message).replace('%tablename%', data.sealFlag);
				this.show(this.message, 'warn');
				this.vprgmdlsExecuteQuery();
				return;
			} else if (data && data.sealFlag && data.seqOne === 2291) {
				this.message = this.translateService.translate('common.recordcannotbedeletedparent');
				this.message = String(this.message).replace('%tablename%', data.sealFlag);
				this.show(this.message, 'warn');
				this.vprgmdlsExecuteQuery();
				return;
			}
		});
	}
	onGridInsert = () => {
		if (this.vprgmdlsData.length > 0) {
            this.vprgmdlsTemp = this.vprgmdlsData[this.vprgmdlsData.length - 1];
        } else {
            this.vprgmdlsTemp = new VProgramModules()
        }
        return { listSeq: this.vprgmdlsTemp && this.vprgmdlsTemp.listSeq ? Number(this.vprgmdlsTemp.listSeq) + 1 : 1 };
	}
	
	/**
	*  This function will be executed to validate the mandetory fields in grid
	* 
	*/
	ocmsvmodValidations() {
		const is = { valid: true };
		this.vprgmdlsDataTemp = [];
		this.placegrid.addedMap.forEach(
			(v: any, k: number) => {
				this.vprgmdlsDataTemp.push(v);
			}
		);
		this.placegrid.updatedMap.forEach(
			(v: any, k: number) => {
				this.vprgmdlsDataTemp.push(v);
			}
		);
		this.vprgmdlsDataTemp.forEach(data => {
			if (is.valid) {
				if (!data.listSeq && data.listSeq === 0) {
					this.show(this.translateService.translate('ocmsvmod.mustbeinrangeonetonine'), 'warn');
					is.valid = false;
					return;
				}
				if (!data.listSeq) {
					this.show(this.translateService.translate('common.sequencemustbeentered'), 'warn');
					is.valid = false;
					return;
				}
				if (!this.listSeqValidations()) {
					is.valid = false;
					return;
				}
				if (!data.description || !data.description.trim()) {
					this.show(this.translateService.translate('common.descriptionmustbeentered'), 'warn');
					is.valid = false;
					return;
				}
				if (!data.noOfSessions && data.noOfSessions === 0) {
					this.show(this.translateService.translate('ocmsvmod.noofsessionsmustbeinrange'), 'warn');
					is.valid = false;
					return;
				}
				if (!data.noOfSessions) {
					this.show(this.translateService.translate('ocmsvmod.noofsessionsmustbeentered'), 'warn');
					is.valid = false;
					return;
				}
			}
		});
		return is.valid;
	}
	onClear() {
		//this.enableDelete = true;
	}
	onVprgMdlsDelete = () => {
		return true;
	}
	onRowClick(event) {
		if (event) {
			this.vprgmdlsBean = event;
		}
		if(event && event.programPhaseId){
			this.enableDelete=true;
		} else {
			this.enableDelete=false;
		}

	}
	cancel() {
		this.dialog.close(null);
	}


}