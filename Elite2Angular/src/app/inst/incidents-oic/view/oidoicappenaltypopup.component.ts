import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import { DialogComponent } from "@core/ui-components/dialog/dialog.component";
import { DialogService } from "@core/ui-components/dialog/dialog.service";
import { OffenderOicAppealPenalties } from "../maintenance/beans/OffenderOicAppealPenalties";
import { OidoicapService } from "../service/oidoicap.service";

@Component({
	selector: 'app-oidoicappenaltypopup',
	templateUrl: './oidoicappenaltypopup.component.html'
})

export class OidoicapPenaltyPopUpComponent implements OnInit {

	@ViewChild('Penaltiespopup', { static: true }) Penaltiespopup: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    msgs: any[] = [];
    penaltiesPopUpColumnDefs: any[];
    penaltiesppopupData: OffenderOicAppealPenalties[] =[];
    penaltiesPopUpModel: OffenderOicAppealPenalties = new OffenderOicAppealPenalties();
    offOicapPopUpModel:OffenderOicAppealPenalties = new OffenderOicAppealPenalties();
    tableIndex: number;
    selectDisable: boolean;
    offenderBookId: any;
    seq: any;
    icApprealId: any;
    icHearingId: any;
    esultSeq: any;
    cancelDisable: boolean;

	
	constructor(public translateService: TranslateService, public sessionManager: UserSessionManager, 
                public oidoicapFactory: OidoicapService, public dialogService: DialogService) {
		this.penaltiesPopUpColumnDefs = [];
	}
	ngOnInit() {
        this.selectDisable = true;
		this.penaltiesPopUpColumnDefs = [
			{
				fieldName: this.translateService.translate('oidoicap.ln'), field: 'oicSeqLog', editable: false, width: 150,
				datatype: 'number', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.consln'), field: 'oicResultSeqLog', datatype: 'number',  editable: false, width: 150,
				
			},
			{
				fieldName: this.translateService.translate('oidoicap.tolog'), field: 'oicHearingIdLog', editable: false, width: 150,
				datatype: 'number', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.type'), field: 'oicPenaltyType', editable: false, width: 150,
				datatype: 'text', 
			},
			{
				fieldName: this.translateService.translate('oidoicap.apphearingdate'), field: 'hearingDate', datatype: 'text', editable: false, width: 150,
			},
            {
				fieldName: this.translateService.translate('oidoicap.apphearingtime'), field: 'hearingTime', datatype: 'text', editable: false, width: 150,
			},
		];
        this.offOicapPopUpModel.offenderBookingId = this.dialog.data.offenderBookId;
        this.offOicapPopUpModel.seq= this.dialog.data.seq;
		this.offOicapPopUpModel.oicApprealId= this.dialog.data.oicApprealId;
		this.offOicapPopUpModel.oicHearingId= this.dialog.data.oicHearingId;
		this.offOicapPopUpModel.resultSeq= this.dialog.data.resultSeq;
        this.oidoicapPopUpExecuteQuery();

	}

    oidoicapPopUpExecuteQuery(){
        this.penaltiesppopupData = [];
        this.selectDisable = true;
        const serviceObj = this.oidoicapFactory.rgOicSeqLogRecordGroup(this.offOicapPopUpModel);
        serviceObj.subscribe(data =>{
            if(data.length >0){
                this.penaltiesppopupData = data;
                this.selectDisable = false;
                this.tableIndex = 0;
            }
        });
    }

    onRowClickPenaltiesPopUp(event){
        this.penaltiesPopUpModel = new OffenderOicAppealPenalties();
        if(event){
            this.penaltiesPopUpModel = event;
        }
    }

    cancel() {
        this.dialog.close(false);
    }

    onSelect(){
        this.dialog.close(this.penaltiesPopUpModel);
    }

}