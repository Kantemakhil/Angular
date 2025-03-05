import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import { DialogComponent } from "@core/ui-components/dialog/dialog.component";
import { DialogService } from "@core/ui-components/dialog/dialog.service";
import { OicHearingResults } from "../beans/OicHearingResults";
import { OidoicapService } from "../service/oidoicap.service";

@Component({
	selector: 'app-oidoicappopup',
	templateUrl: './OidoicapPopUp.component.html'
})

export class OidoicapPopUpComponent implements OnInit {

	@ViewChild('oidoicappopup', { static: true }) oidoicappopup: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    msgs: any[] = [];
    OidoicapPopUpColumnDefs: any[];
    oidoicappopupData: OicHearingResults[] =[];
    oidoicapPopUpModel: OicHearingResults = new OicHearingResults();
    tableIndex: number;
    selectDisable: boolean;
    offenderBookId: any;
    cancelDisable: boolean;

	
	constructor(public translateService: TranslateService, public sessionManager: UserSessionManager, 
                public oidoicapFactory: OidoicapService, public dialogService: DialogService) {
		this.OidoicapPopUpColumnDefs = [];
	}
	ngOnInit() {
        this.selectDisable = true;
		this.OidoicapPopUpColumnDefs = [
			{
				fieldName: this.translateService.translate('oidoicap.oicincidentid'), field: 'oicIncidentId', editable: false, width: 150,
				datatype: 'text', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.hearingid'), field: 'code', datatype: 'text',  editable: false, width: 150,
				
			},
			{
				fieldName: this.translateService.translate('oidoicap.resultseq'), field: 'resultSeq', editable: false, width: 150,
				datatype: 'text', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.resultingcharge'), field: 'oicOffenceCode', editable: false, width: 150,
				datatype: 'text', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.description'), field: 'description', datatype: 'text', editable: false, width: 150,
			},
		];
        this.offenderBookId = this.dialog.data.offenderBookId;
        this.oidoicapPopUpExecuteQuery();

	}

    oidoicapPopUpExecuteQuery(){
        this.oidoicappopupData = [];
        this.selectDisable = true;
        const serviceObj = this.oidoicapFactory.rgHearingOffencesRecordGroup(this.offenderBookId);
        serviceObj.subscribe(data =>{
            if(data.length >0){
                this.oidoicappopupData = data;
                this.selectDisable = false;
                this.tableIndex = 0;
            }
        });
    }

    onRowClickOidoicapPopUp(event){
        this.oidoicapPopUpModel = new OicHearingResults();
        if(event){
            this.oidoicapPopUpModel = event;
        }
    }

    cancel() {
        this.dialog.close(false);
    }

    onSelect(){
        this.dialog.close(this.oidoicapPopUpModel);
    }

}