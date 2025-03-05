import {Component, OnInit,ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VAcpSchedules } from '@iwp/beans/VAcpSchedules';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OcdpatteService } from '../service/ocdpatte.service';


@Component({
	selector: 'app-ocuschpr',
	templateUrl: './ocuschpr.component.html'
	
})

export class OcuschprComponent implements OnInit {
	@ViewChild('ocuaschprDialog', { static: true }) ocuaschprDialog: DialogComponent;
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	vacpschedulesData: VAcpSchedules[] = [];
	vacpschedulesDataTemp: VAcpSchedules[] = [];
	selectedvacpschedulesModel: VAcpSchedules = new VAcpSchedules();
	vacpschedulesInsertList: VAcpSchedules[] = [];
	vacpschedulesUpdatetList: VAcpSchedules[] = [];
	vacpschedulesDeleteList: VAcpSchedules[] = [];
	vAcpSchedulesColumnDef: any[];
	tableIndex: number;
	url: string;
	selectDisable : boolean;
	vacpschedulesModel: VAcpSchedules = new VAcpSchedules();
	constructor(private ocdpatteFactory: OcdpatteService, public  translateService: TranslateService) {

		this.vAcpSchedulesColumnDef = [];
	}
	ngOnInit() {
		this.selectDisable = true;
		if (this.ocuaschprDialog && this.ocuaschprDialog.data ) {
			this.vacpschedulesModel.scheduleDate = this.ocuaschprDialog.data.scheduleDate;
			this.vacpschedulesModel.phaseProviderPartyCode  = this.ocuaschprDialog.data.providerCode;
			this.vacpschedulesModel.phaseProviderPartyId =Number(this.ocuaschprDialog.data.providerDesc);
			this.vacpschedulesModel.programId = this.ocuaschprDialog.data.programId;
			this.vacpschedulesModel.catchUpSessionFlag = this.ocuaschprDialog.data.catchUpSessionFlag;
			this.vacpschedulesExecuteQuery();
		}
		this.vAcpSchedulesColumnDef = [
			{ fieldName: this.translateService.translate('ocuschpr.service'), field: 'programDesc', editable: false, datatype: 'text', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.occurenceCode'), field: 'programInstanceCode', editable: false, datatype: 'text', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.phase'), field: 'phaseInstanceDesc', editable: false, datatype: 'text', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.module'), field: 'moduleInstanceDesc', editable: false, datatype: 'text', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.session'), field: 'sessionNo', editable: false, datatype: 'number', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.catchUp'), field: 'catchUpSessionFlag', editable: false, datatype: 'checkbox' , width: 150 },
			{ fieldName: this.translateService.translate('common.startTime'), field: 'startTime', editable: false, datatype: 'time', width: 150 },
			{ fieldName: this.translateService.translate('common.endTime'), field: 'endTime', editable: false, datatype: 'time', width: 150 },
			{ fieldName: this.translateService.translate('ocuschpr.internalLocation'), field: 'internalLocationDesc', editable: false, datatype: 'text', width: 150 },
		];

	}

	show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
	onRowClickvacpschedules(event) {
		if (event) {
			this.selectedvacpschedulesModel = event;
		}
	}
	onButSelectclick() {
		this.ocuaschprDialog.close(this.selectedvacpschedulesModel);
	}

	onButExitclick(){
		this.ocuaschprDialog.close(null);
	}

vacpschedulesExecuteQuery() {
	const vacpschedulesResult = this.ocdpatteFactory.
	vAcpSchedulesExecuteQuery(this.vacpschedulesModel);
	vacpschedulesResult.subscribe(data => {
		if (data.length === 0) {
			this.vacpschedulesData = [];
		} else {
			this.selectDisable = false;
			data.forEach(element => {
				element.catchUpSessionFlag = element.catchUpSessionFlag === 'Y' ? true : false;
			});
			this.vacpschedulesData = data;
			this.tableIndex = 0;
		}
	});
}



}
