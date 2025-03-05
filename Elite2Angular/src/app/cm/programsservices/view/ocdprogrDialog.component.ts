import { OcdprogrService } from '../service/ocdprogr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OffenderSentences } from "@inst/legal/beans/OffenderSentences";
import { OivctmngService } from '@inst/victimmanagement/service/oivctmng.service';
// import required bean declarations

@Component({
    selector: 'app-ocdprogrdialog',
    templateUrl: './ocdprogrDialog.component.html'
})

export class OcdprogrDialogComponent implements OnInit {
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
    constructor(private ocdprogrFactory: OcdprogrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private oivctmngFactory: OivctmngService) {
        // TODO initilize data members here..!
        this.sentenceColumnDef = [];
    }
    ngOnInit() {
        if (this.dialog.data.moduleName === 'OCDPROGR') {
            this.ocdprogrPopulateDetails();
        } else if (this.dialog.data.moduleName === 'OIVCTMNG') {
            this.rgOffenderSentencesRecordGroupBothCustAndNonCust();
        } else {
            this.ocdxrogPopulateDetails();
        }
        this.sentenceColumnDef = [
            {
                fieldName: this.translateService.translate('ocdprogr.ordertype'), field: 'description', editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdprogr.lineno'), field: 'sentenceCategory', editable: true, width: 150
            },
            { fieldName: this.translateService.translate('common.sequencename'), field: 'sentenceSeq', editable: true, width: 150 ,hide:true},
            { fieldName: this.translateService.translate('ocdprogr.commencedate'), field: 'startDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'endDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocdprogr.court'), field: 'jurisCode', editable: false, width: 150 },
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
        const serviceObj = this.ocdprogrFactory.
            rgOffenderSentencesRecordGroup(this.dialog.data.offenderBookId);
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

    ocdxrogPopulateDetails() {
        const serviceObj = this.ocdprogrFactory.
        rgOffenderSentencesRecordGroupComm(this.dialog.data.offenderBookId);
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
    
    onSelect() {
        this.dialog.close({
            'sentenceDesc': this.offSentmodel.description,
            'referralDate': this.offSentmodel.startDate, 'courtName': this.offSentmodel.jurisCode,
            'sentenceCategory': this.offSentmodel.sentenceCategory, 'sentenceEndDate': this.offSentmodel.endDate,
            'sentenceSeq': this.offSentmodel.sentenceSeq,
            'orderType': this.offSentmodel.orderType,
        });
    }
    cancel() {
        this.dialog.close(null);
    }

    rgOffenderSentencesRecordGroupBothCustAndNonCust() {
        const serviceObj = this.oivctmngFactory.
            rgOffenderSentencesRecordGroupBothCustAndNonCust(this.dialog.data.offenderBookId);
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
}
