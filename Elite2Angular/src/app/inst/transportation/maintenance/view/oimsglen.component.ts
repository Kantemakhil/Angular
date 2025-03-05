import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OimsglenService } from '../service/oimsglen.service';
import { AgencySegmentLengths } from '../beans/AgencySegmentLengths';
import { AgencysegmentlengthsCommitBean } from '@inst/transportation/maintenance/beans/AgencySegmentLengthsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';


@Component({
	selector: 'app-oimsglen',
	templateUrl: './oimsglen.component.html',
})

export class OimsglenComponent implements OnInit {
	// Variable declaration
	msglist: any[];
	message: any;
	type: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	index: any;
	nameOfLovPage: string;
	listToCompare: any[] = [];
	agencysegmentlengthsData: AgencySegmentLengths[] = [];
	agencysegmentlengthsDataTemp: AgencySegmentLengths[] = [];

	agencysegmentlengthsModel: AgencySegmentLengths = new AgencySegmentLengths();
	agencysegmentlengthsCommitBeans: AgencysegmentlengthsCommitBean = new AgencysegmentlengthsCommitBean();
	agencysegmentlengthsIndex: number = 0;
	agencysegmentlengthsInsertList: AgencySegmentLengths[] = [];
	agencysegmentlengthsUpdateList: AgencySegmentLengths[] = [];
	agencysegmentlengthsDeleteList: AgencySegmentLengths[] = [];
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	lvPropertyValue: string;
	lvHour: number;
	lvMinutte: number;
	lvValueCheck: number;
	agencySegmentLengthsColumnDef: any[];
	agencySegmentLengthsReadonly: boolean = false;
	constructor(private oimsglenFactory: OimsglenService,
		public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		// TODO initilize data members here..!
		this.agencySegmentLengthsColumnDef = [];
	}
	onGridReady(event) {
	}
	ngOnInit() {
		this.agencySegmentLengthsColumnDef = [
			{ fieldName: this.translateService.translate('oimsglen.fromAgyLocId'), field: 'fromAgyLocId' ,editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oimsglen.fromDescription'), field: 'fromDescription', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oimsglen.toAgyLocId'), field: 'toAgyLocId', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oimsglen.toDescription'), field: 'toDescription', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oimsglen.segmentLength'), field: 'nbtSegmentLength', editable: true, width: 150, datatype: 'time',required: 'true'},
		];
		// TODO all initializations here
		this.agencysegmentlengthsExecuteQuery();

	}
	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onRowClickagencysegmentlengths(event) {
	}


	ok() {
	}
	no() {
	}
	cancel() {
	}
	onOffenderChange(offender) {
	}
	agencysegmentlengthsExecuteQuery() {
		this.agencysegmentlengthsModel.fromDescription;
		this.agencysegmentlengthsModel.toDescription;

		const agencysegmentlengthsResult = this.oimsglenFactory.
			agencysegmentlengthsExecuteQuery(this.agencysegmentlengthsModel);
		agencysegmentlengthsResult.subscribe(data => {
			if (data.length === 0) {
				this.agencysegmentlengthsData = [];

			} else {
				data.forEach(element => {
					if (element.segmentLength !== 0 && element.segmentLength !== null) {
						element.segmentLength = Math.abs(element.segmentLength).toFixed(2);
						if (element.segmentLength.toString().includes('.')) {
							var time = element.segmentLength + '';
							var val = time.split('.');
							var val1 = Number(val[0]);
							var val2 = Number(val[1]);
							var minutes = Math.round((val2 / 100) * 60);
							element.nbtSegmentLength = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
						} else {
							element.nbtSegmentLength = DateFormat.getDate(DateFormat.getDate().setHours(element.segmentLength, 0, 0, 0));
						}
					} else {
						element.nbtSegmentLength = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
					}
				});
				this.agencysegmentlengthsData = data;
				this.agencysegmentlengthsModel = data[0];
			}
		});
	}
	/**
	 *  This function will be executed when commit event is
	* fired
	*/
	oimsglenSaveagencysegmentlengthsForm(event) {
		// TODO declare commit bean and add insert list to that object.

		this.agencysegmentlengthsUpdateList = event.updated
		if (this.agencysegmentlengthsUpdateList.length > 0) {
			for (let i = 0; i < this.agencysegmentlengthsUpdateList.length; i++) {

				if (this.agencysegmentlengthsUpdateList[i].createDatetime) {
					this.agencysegmentlengthsUpdateList[i].createDatetime = DateFormat.getDate(this.agencysegmentlengthsUpdateList[i].createDatetime)
				}
				if (this.agencysegmentlengthsUpdateList[i].nbtSegmentLength) {
					this.agencysegmentlengthsUpdateList[i].segmentLength = (DateFormat.getDate(this.agencysegmentlengthsUpdateList[i].nbtSegmentLength).getHours()) + (DateFormat.getDate(this.agencysegmentlengthsUpdateList[i].nbtSegmentLength).getMinutes()) / 60;
				}
			}
			this.agencysegmentlengthsCommitBeans.updateList = this.agencysegmentlengthsUpdateList;

		}
		const agencysegmentlengthsSaveData = this.oimsglenFactory.agencysegmentlengthsCommit(this.agencysegmentlengthsCommitBeans);
		agencysegmentlengthsSaveData.subscribe(data => {
			if (data === 1) {
				this.type = 'success';
				this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
				this.show();
				this.agencysegmentlengthsExecuteQuery();
			} else {
				this.type = 'warn';
				this.message = this.translateService.translate('common.addupdateremoverecordfailed');
				this.show();
				this.agencysegmentlengthsExecuteQuery();
			}
		});
	}
}
