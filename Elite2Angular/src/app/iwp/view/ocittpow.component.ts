import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcittpowService } from '../service/ocittpow.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VExtOwnershipTransfer } from '@cm/primaryofficeragentassignment/beans/VExtOwnershipTransfer';
import { VExtOwnershipTransferCommitBean } from '@cm/primaryofficeragentassignment/beans/VExtOwnershipTransferCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
	selector: 'app-ocittpow',
	templateUrl: './ocittpow.component.html',
})

export class OcittpowComponent implements OnInit {
	@ViewChild('extoTab') extoTab: any;
	msgs: any[];
	agyLocIdFrom: any;
	tableIndex: number;
	type: any;
	message: any;
	msglist: any[];
	transferFlag: string;
	transferredOffendersColumnDefs: any[];
	dspDescriptionLink: string;
	transferredOffendersModel: VExtOwnershipTransfer = new VExtOwnershipTransfer();
	transferredOffendersData: VExtOwnershipTransfer[] = [];
	transferredOffendersIndex: number;
	code: string;
	VExtOwnershipTransferInsertList: VExtOwnershipTransfer[] = [];
	VExtOwnershipTransferUpdateList: VExtOwnershipTransfer[] = [];
	VExtOwnershipTransferDeleteList: VExtOwnershipTransfer[] = [];
	VExtOwnershipTransferCommitBeanModel: VExtOwnershipTransferCommitBean = new VExtOwnershipTransferCommitBean();
	editable = true;
	clearDisabled: boolean;
	retrieveDisabled: boolean;
	dspDescriptionReadOnly: boolean;

	constructor(private ocittpowFactory: OcittpowService,
		public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		this.transferredOffendersColumnDefs = [];
	}
	/* 
	 * ngOnInit
	*/
	ngOnInit() {

		this.transferredOffendersColumnDefs = [
			{
				fieldName: this.translateService.translate('ocittpow.aos'), field: 'offenderIdDisplay', editable: false,
				width: 150, datatype: 'text',
			},
			{
				fieldName: this.translateService.translate('ocittpow.lastname'), field: 'offenderLastName', editable: false,
				width: 150, datatype: 'text',
			},
			{
				fieldName: this.translateService.translate('ocittpow.firstname'), field: 'offenderFirstName', editable: false,
				width: 150, datatype: 'text',
			},
			{
				fieldName: this.translateService.translate('ocittpow.previousassignedofficername'), field: 'staffName', editable: false,
				width: 150, datatype: 'text',
			},
			{
				fieldName: this.translateService.translate('ocittpow.transferredtolocation'), field: 'agyLocIdTo', editable: false,
				width: 150, datatype: 'lov', link: 'ocittpow/agyLocIdFromRecordGroup?agyLocIdFrom=' + this.code,
			},
			{
				fieldName: this.translateService.translate('ocittpow.transferdate'), field: 'transferDate', editable: false,
				width: 150, datatype: 'date',
			},
			{
				fieldName: this.translateService.translate('ocittpow.canceltransfer'), field: 'transferFlag', editable: true,
				width: 150, datatype: 'checkbox',
			},
		];

		this.dspDescriptionLink = 'ocittpow/dspDescriptionRecordGroup?currentCaseLoad=' + this.sessionManager.currentCaseLoad;
		this.clearDisabled = true;
		this.retrieveDisabled = false;
		this.dspDescriptionReadOnly = false;
	}


	dspDescriptionTitles = {
		'description': this.translateService.translate('common.description'),
		'code': this.translateService.translate('ocittpow.transferredfromlocation')
	};

	/* show() to Display msgs */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}

	/*  transferred From Location Change Operation  */
	transferredFromLocationChange(event) {
		if (event) {
			this.code = event.code;
			this.clearDisabled = false;
		} else {
			this.clearDisabled = true;
			this.code = undefined;
		}
	}

	onDspDescription() {
		if (!this.agyLocIdFrom) {
			this.agyLocIdFrom = this.agyLocIdFrom === '' ? undefined : '';
		}
	}

	/* Performing Execute Query of Transferred Offenders */
	transferredOffendersExecuteQuery() {
		if (!this.code) {
			this.type = 'warn';
			this.message = this.translateService.translate('ocittpow.transferredfromlocationmustbeentered');
			this.show();
			return;
		}
		const transferredOffendersExecuteQuery = this.ocittpowFactory.transferredOffendersExecuteQuery(this.code);
		transferredOffendersExecuteQuery.subscribe(data => {
			if (data.length > 0) {
				data.forEach(element => {
					element.transferFlag = element.transferFlag === 'Y' ? true : false;
				});
				this.transferredOffendersData = data;
				this.tableIndex = 0;
				this.clearDisabled = false;
				this.retrieveDisabled = true;
				this.dspDescriptionReadOnly = true;
			}
			else {
				this.transferredOffendersData = [];
				this.type = 'warn';
				this.message = this.translateService.translate('ocittpow.norecordstoretrive');
				this.show();
				return;
			}
		});
	}

	/* transferredOffendersValidateRowData */
	transferredOffendersValidateRowData = (event) => {
		const rowIndex = this.transferredOffendersData.indexOf(event.data);
		const rowdata = new ValidateRowReturn();
		/* if (event.field === 'transferFlag' && event.newValue !== event.oldValue && !event.oldValue) {
			const transferFlag = this.ocittpowFactory.whenCheckboxChanged(event.data);
			transferFlag.subscribe(data => {
				if (data === 1) {
					this.type = 'warn';
					this.message = 'You cannot cancel this transfer as the paper file is not either In Transit to the destination location, or held at the transferring location'//this.translateService.translate('ocittpow.youcannotcancelthistransfer');
					this.show();
					this.extoTab.setColumnData('transferFlag', rowIndex, false);
					rowdata.validated = true;
					return rowdata;
				}
			});
		} */
		if (event.field === 'agyLocIdTo' && event.newValue !== event.oldValue && !event.oldValue) {
			const agyLocIdTo = this.ocittpowFactory.agyLocIdToExecuteQuery(event.data.agyLocIdTo);
			agyLocIdTo.subscribe(data => {
				if (data === 0) {
					this.type = 'warn';
					this.message = this.translateService.translate('ocittpow.noprimarykeyrowfoundforvalueinagylocidto');
					this.show();
					this.extoTab.setColumnData('agyLocIdTo', rowIndex, null);
					rowdata.validated = true;
					return rowdata;
				}
			});
		}
		rowdata.validated = true;
		return rowdata;
	}

	/* onRowClick of TraOff */
	onRowClickTraOff(event) {
		if (event) {
			this.transferredOffendersModel = event;
		}
	}

	/**  This function will be executed when commit event is fired */
	transferredOffendersCommit(event) {
		const rowIndex = this.transferredOffendersData.indexOf(event.data);
		this.VExtOwnershipTransferUpdateList = event.updated;
		this.VExtOwnershipTransferCommitBeanModel.updateList = [];

		if (this.VExtOwnershipTransferUpdateList.length > 0) {
			let count = 0;
			for (let i = 0; i < this.VExtOwnershipTransferUpdateList.length; i++) {
				this.VExtOwnershipTransferUpdateList[i].transferFlag = this.VExtOwnershipTransferUpdateList[i].transferFlag ? 'Y' : 'N';
				if (this.VExtOwnershipTransferUpdateList[i].transferFlag == 'Y') {
					count++;
				}
			}
			if (count === 0) {
				this.type = 'warn';
				this.message = this.translateService.translate('ocittpow.pleaseselectatleastoneoffender');
				this.show();
				return;
			}

			this.VExtOwnershipTransferCommitBeanModel.updateList = this.VExtOwnershipTransferUpdateList;
			const saveData = this.ocittpowFactory.transferredOffendersCommit(this.VExtOwnershipTransferCommitBeanModel);
			saveData.subscribe(data => {
				if (data === 1) {
					this.type = 'success';
					this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
					this.show();
					this.transferredOffendersExecuteQuery();
					return;
				} else {
					this.type = 'warn';
					this.message = this.translateService.translate('ocittpow.youcannotcancelthistransfer');
					this.show();
					this.transferredOffendersExecuteQuery();
					return;
				}
			});
		}
	}

	/* Clear Functionality */
	onClear = () => {
		this.transferredOffendersData = [];
		this.dspDescriptionLink = undefined;
		this.clearDisabled = true;
		this.retrieveDisabled = false;
		this.dspDescriptionReadOnly = false;
		this.code = undefined;
		this.agyLocIdFrom = undefined;
	}
}


