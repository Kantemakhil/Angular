import { Component, OnInit, ViewChild } from "@angular/core";
import { OcdprogrService } from "@cm/programsservices/service/ocdprogr.service";
import { TranslateService } from "@common/translate/translate.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderSentences } from "../beans/OffenderSentences";
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OcsprogrService } from "../service/ocsprogr.service";
import { OffenderBookings } from "@inst/demographics-biometrics/beans/OffenderBookings";

@Component({
    selector: 'app-ocdlodetdialog',
    templateUrl: './ocdlodetdialog.component.html'
})
export class OcdlodetdialogComponent implements OnInit {
    selectDisBtn = true;
    lovModel: any[];
    msgs: any[] = [];
    minDate: any;
    display: boolean;
    sentenceColumnDef: any[];
    sentenceData: any[] = [];
    tableIndex = 0;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    offenderSentData: OffenderSentences[] = [];
    offSentmodel: OffenderSentences = new OffenderSentences();
    OffenderDetailsModelData: OffenderBookings= new OffenderBookings ;
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService, public ocsprogrService: OcsprogrService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.sentenceColumnDef = [];
    }
    ngOnInit(): void {
        this.ocdprogrPopulateDetails();

        this.sentenceColumnDef = [
            {
                fieldName: this.translateService.translate('ocdlodet.ordertype'), field: 'description', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdlodet.lineno'), field: 'sentenceCategory', editable: true, width: 150
            },
            { fieldName: this.translateService.translate('common.sequencename'), field: 'sentenceSeq', editable: true, width: 150, hide: true },
            { fieldName: this.translateService.translate('ocdlodet.commencedate'), field: 'startDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'endDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocdlodet.court'), field: 'jurisCode', editable: false, width: 150 },
            { fieldName: '', field: 'orderType', hide: true },
        ];

    }

    onRowSentence(event) {
        if (event) {
            this.offSentmodel = event;
        }
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
    /**
    * This function loads the data into the Master Record and its child records
    */
    ocdprogrPopulateDetails() {
        this.OffenderDetailsModelData.offenderBookId =  this.dialog.data.offenderBookId;
        this.OffenderDetailsModelData.offenderPrgObligationId = this.dialog.data.offenderPrgObligationId;
        const serviceObj = this.ocsprogrService.
            rgOffenderSentencesRecordGroupComm(this.OffenderDetailsModelData);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.show(this.translateService.translate('common.querycaused'));
                this.offenderSentData = [];
                this.tableIndex = -1;
                this.selectDisBtn = true;
            } else {
                this.offenderSentData = data;
                this.tableIndex = 0;
                this.selectDisBtn = false;
            }
        }); 

    }
    cancel() {
        this.dialog.close(null);
    }
}
