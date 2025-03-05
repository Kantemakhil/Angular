import { Component, OnInit } from '@angular/core';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { BedAssignmentHistories } from '../../demographics-biometrics/beans/BedAssignmentHistories';
import { OiihlhisService } from '../service/oiihlhis.service';
import { TranslateService } from '@common/translate/translate.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
// import required bean declarations

@Component({
	selector: 'app-oiihlhis',
	templateUrl: './oiihlhis.component.html',
})

export class OiihlhisComponent implements OnInit {
	// Variable declaration
	bedAhData: BedAssignmentHistories[] = [];
	bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
	bedAhIndex: number = 0;
	bedAhColumnDef: any[];
	msgs: any[] = [];
	vHeaderBlock: VHeaderBlock;
	count = 0;
	constructor(private oiihlhisFactory: OiihlhisService,public translateService:TranslateService ,private injectOffenderService: InjectOffenderService) {
		this.bedAhColumnDef = [];
	}
	ngOnInit() {
		this.bedAhColumnDef = [
			{ fieldName: this.translateService.translate('oiihlhis.date'), field: 'assignmentDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('oiihlhis.time'), field: 'assignmentTime', editable: false, width: 150, datatype: 'time' },
			{ fieldName: this.translateService.translate('oiihlhis.location'), field: 'dspDescription', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oiihlhis.reason'), field: 'assignmentReason', editable: false, width: 150, datatype: 'text' },
			{ fieldName: this.translateService.translate('oiihlhis.date'), field: 'assignmentEndDate', editable: false, width: 150, datatype: 'date' },
			{ fieldName: this.translateService.translate('oiihlhis.time'), field: 'assignmentEndTime', editable: false, width: 150, datatype: 'time' },
		];

	}

	onOffenderChange(offender) {
		this.vHeaderBlock = offender;
		if (offender && offender.offenderBookId) {
			this.bedAhExecuteQuery();
		} else {
			this.bedAhData = [];
		}
	}
	
	bedAhExecuteQuery() {
		this.bedahModel = new BedAssignmentHistories();
		this.bedahModel.offenderBookId = this.vHeaderBlock.offenderBookId;
		const bedahResult = this.oiihlhisFactory.
			bedAhExecuteQuery(this.bedahModel);
		bedahResult.subscribe(data => {
			if (data.length === 0) {
				this.bedAhData = [];
			} else {
				this.bedAhData = data;
			}
		});
	}

}
