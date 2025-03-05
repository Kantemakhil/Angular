import {
	Component, OnInit,
	ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderProgramProfiles } from '../beans/VOffenderProgramProfiles';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OciscataService } from '../service/ociscata.service';

@Component({
	selector: 'app-ocupaoff',
	templateUrl: './ocupaoff.component.html'
})

export class OcupaoffComponent implements OnInit {
	@ViewChild('dialog', {static: true}) dialog: DialogComponent;
    // @ViewChild('grid') grid: any;
	actionName: string;
	lovModel: any[];
	msgs: any[] = [];
	nameOfLovPage: string;
	listToCompare: any[] = [];
	voffprgprofilesData: VOffenderProgramProfiles[] = [];
	voffprgprofilesDataTemp: VOffenderProgramProfiles[] = [];
	voffprgprofilesModel: VOffenderProgramProfiles = new VOffenderProgramProfiles();
	voffprgprofilesIndex: Number = 0;
	voffprgprofilesInsertList: VOffenderProgramProfiles[] = [];
	voffprgprofilesUpdatetList: VOffenderProgramProfiles[] = [];
	voffprgprofilesDeleteList: VOffenderProgramProfiles[] = [];
	display: boolean;
	errorMessage: string;
	headerMessage: string;
	disabled: boolean;
	editable: boolean = true;
	docsColumnDef: any[];
	vOffPrgProfilesColumnDef: any[];
	offTxnColumnDef: any[];
	tasksColumnDef: any[];
	block2ReadOnly: boolean = false;
	ctrlReadOnly: boolean = false;
	docsReadOnly: boolean = false;
	ctrlBlReadOnly: boolean = false;
	tasksReadOnly: boolean = false;
	offTxnReadOnly: boolean = false;
	sysPflReadOnly: boolean = false;
	vOffPrgProfilesReadOnly: boolean = false;
	tableIndex: number;
	offenderName: any;
	clearDisabled: boolean;
	retrivedisabled: boolean;
	disableField: boolean;
	var: boolean;
	constructor(private ociscataFactory: OciscataService, public translateService: TranslateService,
		public sessionManager: UserSessionManager) {
		this.docsColumnDef = [];
		this.vOffPrgProfilesColumnDef = [];
		this.offTxnColumnDef = [];
		this.tasksColumnDef = [];
	}
	ngOnInit() {
	 this.retrivedisabled = true;
	 this.clearDisabled = false;
	 this.disableField = true;
	 this.var = true;
		this.vOffPrgProfilesColumnDef = [
			{ fieldName: this.translateService.translate('common.name'), field: 'offenderName', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.age'), field: 'age', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('common.gender'), field: 'sexCode', editable: false, width: 150,
			 datatype: 'lov', domain: 'SEX' },
			{ fieldName:this.translateService.translate('ocupaoff.alerts'), field: 'offenderAlert', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocupaoff.offenseindicators'), field: 'offenceTypes', editable: false, width: 150 },
			{ fieldName: this.translateService.translate('ocupaoff.ethnicity'), field: 'raceCode', editable: false, width: 150,
			 datatype: 'lov', domain: 'ETHNICITY' },
		];
		this.vOffPrgProfilesExecuteQuery();
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
	onRowClickvoffprgprofiles(event) {
	}
	isInsertableOne() {
		if (this.offenderName) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    
	}
	cancel() {
        this.voffprgprofilesData = [];
		this.voffprgprofilesModel = new VOffenderProgramProfiles();
		this.offenderName = undefined;
		this.clearDisabled = true;
		this.retrivedisabled = false;
		this.disableField = false;
	}
	retrieve() {
		this.vOffPrgProfilesExecuteQuery();
	}
	vOffPrgProfilesExecuteQuery() {
		this.voffprgprofilesModel = new VOffenderProgramProfiles();
        if (this.offenderName) {
              this.voffprgprofilesModel.offenderName = this.offenderName;
        }
		this.voffprgprofilesModel.crsActyId = this.dialog.data.crsActyId;
		this.voffprgprofilesModel.programId = this.dialog.data.programId;
		const voffprgprofilesResult = this.ociscataFactory.vOffPrgProfilesExecuteQuery(this.voffprgprofilesModel);
		voffprgprofilesResult.subscribe(voffprgprofilesResultList => {
			if (voffprgprofilesResultList.length === 0) {
				this.voffprgprofilesData = [];
				if (this.var) {
					this.clearDisabled = true;
					this.retrivedisabled = true;
					this.disableField = true;
					this.var = false;
				} else {
					this.retrivedisabled = false;
					this.disableField = false;
				}
				this.show('common.querycaused');
                return;
			} else {
				this.voffprgprofilesData = voffprgprofilesResultList;
				this.voffprgprofilesModel = voffprgprofilesResultList[0];
				this.tableIndex = 0;
				this.clearDisabled = false;
				this.retrivedisabled = true;
				this.disableField = true;
				this.var = false;
			}
		});
	}

}
