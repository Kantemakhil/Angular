import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuhofflService } from '../service/oiuhoffl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
	selector: 'app-oiuhoffl',
	templateUrl: './oiuhoffl.component.html'
})

export class OiuhofflComponent implements OnInit {
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	voffbkgData: VHeaderBlock[] = [];
	offsubmitData: VHeaderBlock[] = [];
	voffbkgDataTemp: VHeaderBlock[] = [];
	voffbkgModel: VHeaderBlock = new VHeaderBlock();
	voffbkgIndex: number = 0;
	voffbkgInsertList: VHeaderBlock[] = [];
	voffbkgUpdatetList: VHeaderBlock[] = [];
	voffbkgDeleteList: VHeaderBlock[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	vOffBkgColumnDef: any[];
	offSubmitColumnDef: any[];
	vOffBkgReadOnly: boolean = false;
	tableIndex = -1;
	constructor(private oiuhofflFactory: OiuhofflService, public translateService: TranslateService, public sessionManager: UserSessionManager) {
		this.vOffBkgColumnDef = [];
		this.offSubmitColumnDef = [];
	}
	ngOnInit() {
		this.vOffBkgColumnDef = [
			{ fieldName: this.translateService.translate('common.select'), field: 'nbtSelect', editable: true, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('ID#'), field: 'offenderIdDisplay', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: false, width: 150, datatype: 'checkbox' },
		];
		this.offSubmitColumnDef = [
			{ fieldName: this.translateService.translate('common.select'), field: 'nbtRemove', editable: true, width: 150, datatype: 'checkbox' },
			{ fieldName: this.translateService.translate('ID#'), field: 'offenderIdDisplay', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: false, width: 150, datatype: 'checkbox' },
		];
		this.voffbkgExecuteQuery();
	}
	ok() {
		this.dialog.close({
			accountCode: this.offsubmitData
		});
	}
	voffbkgExecuteQuery() {
		this.voffbkgModel.caseLoadId = this.sessionManager.currentCaseLoad;
		this.voffbkgModel.agyLocType = this.sessionManager.currentCaseLoadType;
		const voffbkgResult = this.oiuhofflFactory.vOffBkgExecuteQuery(this.voffbkgModel);
		voffbkgResult.subscribe(voffbkgResultList => {
			if (voffbkgResultList.length === 0) {
				this.voffbkgData = [];
			} else {
				voffbkgResultList.forEach(element => {
					element.activeFlag = element.activeFlag === 'Y' ? true : false;
				});
				this.voffbkgData = voffbkgResultList;
				this.voffbkgModel = voffbkgResultList[0];
			}
		});
	}
	selectAllData() {
		const removeRowData = JSON.parse(JSON.stringify(this.offsubmitData));
		removeRowData.push(...this.voffbkgData);
		setTimeout(ele => {
			this.offsubmitData = removeRowData;
		}, 100);
		this.voffbkgData = [];
	}
	resultValidate = (event) => {
		if (event && event.field === 'nbtSelect' && event.newValue) {
			const index = this.voffbkgData.indexOf(event.data);
			const gridRowData = JSON.parse(JSON.stringify(this.voffbkgData));
			gridRowData.splice(index, 1);
			const data = JSON.parse(JSON.stringify(this.offsubmitData));
			const eventdata = event.data;
			eventdata.nbtSelect = null;
			data.push(eventdata);
			setTimeout(ele => {
				this.offsubmitData = data;
				this.voffbkgData = gridRowData;
				this.tableIndex = 0;
			}, 100);
		}
		const rowdata = new ValidateRowReturn();
		rowdata.validated = true;
		return rowdata;
	}
	offenderValidate = (event) => {
		const rowdata = new ValidateRowReturn();
		if (event && event.field === 'nbtRemove') {
			const index = this.offsubmitData.indexOf(event.data);
			const gridRowData = JSON.parse(JSON.stringify(this.offsubmitData));
			gridRowData.splice(index, 1);
			const data = JSON.parse(JSON.stringify(this.voffbkgData));
			const eventdata = event.data;
			eventdata.nbtRemove = null;
			data.splice(event.data.index, 0, eventdata);
			setTimeout(ele => {
				this.voffbkgData = data;
				this.offsubmitData = gridRowData;
			}, 100);
		}
		rowdata.validated = true;
		return rowdata;
	}
	get rettBtnFlg() {
		if (this.offsubmitData.length > 0) {
			return false;
		} else {
			return true;
		}
	}
}
