import {
	Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuschcoService } from '../service/oiuschco.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffSchOverview } from '../beans/VOffSchOverview';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { Router } from "@angular/router";

// import required bean declarations

@Component({
	selector: 'app-oiuschco',
	templateUrl: './oiuschco.component.html',
})

export class OiuschcoComponent implements OnInit {
	// Variable declaration
	@ViewChild('dialog', { static: true }) dialog: DialogComponent;
	msglist: any[];
	message: any;
	type: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	index: any;
	nameOfLovPage: string;
	listToCompare: any[] = [];
	voffschoverviewData: VOffSchOverview[] = [];
	voffschoverviewModel: VOffSchOverview = new VOffSchOverview();
	voffschoverviewIndex: number = 0;
	minDate: Date;
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	vOffSchOverviewColumnDef: any[];
	vOffSchOverviewReadOnly: boolean = false;
	cg$ctrlReadOnly: boolean = false;
	constructor(private oiuschcoFactory: OiuschcoService, public translateService: TranslateService, public sessionManager: UserSessionManager, private router: Router, public dialogService: DialogService) {
		this.vOffSchOverviewColumnDef = [];
	}
	ngOnInit() {
		this.vOffSchOverviewColumnDef = [
			{ fieldName: this.translateService.translate('oiuschco.schprop'), field: 'tstatus', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiuschco.intext'), field: 'intExt', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiuschco.eventdate'), field: 'eventDate', editable: false, width: 150,datatype: 'date' },
			{ fieldName: this.translateService.translate('oiuschco.eventtime'), field: 'eventTime', editable: false, width: 150 ,datatype: 'time'},
			{ fieldName: this.translateService.translate('oiuschco.type'), field: 'typeDescp', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('oiuschco.reason'), field: 'rsnDescp', editable: false, width: 150 },

		];
		this.voffschoverviewExecuteQuery();
	}
	/** 
	 * This function displays the messages
	 */
	show() {
		this.msglist = [];
		this.msglist.push({ message: this.message, type: this.type });
		this.msgs = [...this.msglist];
	}
	onButProfileProceedclick() {
		this.dialog.close(true);
	}
	onButProfileCancelclick() {
		this.dialog.close(null);
	}
	voffschoverviewExecuteQuery() {
		const searchModel = {};
        searchModel['offenderBookId'] = this.dialog.data.offenderBookId;
		let url = this.router.url
		if (url.startsWith('/')) {
			url = url.substring(1);
		}
		searchModel['moduleName'] = url;
		const voffschoverviewResult = this.oiuschcoFactory.
			voffschoverviewExecuteQuery(searchModel);
		voffschoverviewResult.subscribe(data => {
			if (data.length === 0) {
				this.voffschoverviewData = [];
			} else {
				this.voffschoverviewData = data;
				this.voffschoverviewModel = data[0];
			}
		});
	}
}
