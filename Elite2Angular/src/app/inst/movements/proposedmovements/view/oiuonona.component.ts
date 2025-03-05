
import {
    Component, OnInit, ViewChild,

} from '@angular/core';
//import { OiutnonaService } from '../service/oiutnona.service';
import { OiuononaService } from '../service/oiuonona.service';

import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderNaDetails } from '@common/beans/OffenderNaDetails';

import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { StgRelationships } from '@common/beans/StgRelationships';
@Component({
    selector: 'app-oiuonona',
    templateUrl: './oiuonona.component.html',

})
export class OiuononaComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    msglist: any[];
    message: any;
    type: any;
    lovModel: any[];
    msgs: any[] = [];
    index: any;
    offnonassoData: OffenderNaDetails[] = [];
    offnonassoDataTemp: OffenderNaDetails[] = [];
    offnonassoModel: OffenderNaDetails = new OffenderNaDetails();
    offnonassoIndex: number = 0;
    stgrelationshipsData: StgRelationships[] = [];
    stgrelationshipsDataTemp: StgRelationships[] = [];
    stgrelationshipsModel: StgRelationships = new StgRelationships();
    stgrelationshipsIndex: number = 0;
    stgrelationshipsInsertList: StgRelationships[] = [];
    stgrelationshipsUpdateList: StgRelationships[] = [];
    stgrelationshipsDeleteList: StgRelationships[] = [];
    minDate: Date;
    display: boolean;
    editable: boolean = true;
    offNonAssoColumnDef: any[];
    stgRelationshipsColumnDef: any[];
    offNonAssoReadOnly: boolean = false;
    stgRelationshipsReadOnly: boolean = false;
    ctrlReadOnly: boolean = false;
    onDialogCick: any;

    constructor(private oiuononaFactory: OiuononaService, public translateService: TranslateService, public sessionManager: UserSessionManager, private router: Router, public dialogService: DialogService) {

        this.offNonAssoColumnDef = [];
        this.stgRelationshipsColumnDef = [];
    }

    ngOnInit() {
        this.offNonAssoColumnDef = [

            { fieldName: this.translateService.translate('oiuonona.sid#'), field: 'offenderId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuonona.name'), field: 'offenderName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuonona.location'), field: 'livingUnitDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuonona.type'), field: 'nbtType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuonona.reason'), field: 'nbtReason', editable: false, width: 150 },
        ];
        this.stgRelationshipsColumnDef = [
            { fieldName: this.translateService.translate('oiuonona.gangnonassociations'), field: 'nbtRelatedStgId', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate(' '), field: 'butViewMembers', editable: true, width: 150, datatype: 'launchbutton',
                dialogWidth: 80, data: 'row', modal: true, updateField: 'row', onLaunchClick: this.caGoBtnClick
            },
        ];

        this.offnonassoExecuteQuery();
        this.stgrelationshipsExecuteQuery();
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickoffnonasso(event) {
        this.offnonassoDataTemp = event;

    }
    onRowClickstgrelationships(event) {

    }
    onButProfileExitclick() {
        this.dialog.close(null);
    }


    offnonassoExecuteQuery() {
        this.offnonassoModel = new OffenderNaDetails();
        this.offnonassoModel.moduleName = this.router.url.replace('/', '');
        this.offnonassoModel.scheduledTripId = this.dialog.data.scheduledTripId;
        this.offnonassoModel.offenderBookId = this.dialog.data.offenderBookId;
        this.offnonassoModel.offenderId = this.dialog.data.offenderId;
        this.offnonassoModel.livingUnitDescription = this.dialog.data.livingUnitDescription;
        if (this.dialog.data['nonAssoFlag']) {
            const offnonassoResult = this.oiuononaFactory.
                offnonassoExecuteQuery(this.offnonassoModel);
            offnonassoResult.subscribe(data => {
                if (data.length === 0) {
                    this.offnonassoData = [];
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                } else {
                    if( this.offnonassoData = data){
                     this.dialog.data.nonAssoFlag=true;
                    }
                    this.offnonassoData = data;
                    this.offnonassoModel = data[0];
                }
            });
        }
    }

    stgrelationshipsExecuteQuery() {
        this.stgrelationshipsModel = new StgRelationships();
        this.stgrelationshipsModel.moduleName = this.router.url.replace('/', '');
        this.stgrelationshipsModel.scheduledTripId = this.dialog.data.scheduledTripId;
        this.stgrelationshipsModel.offenderBookId = this.dialog.data.offenderBookId;

        if (this.dialog.data['nonAssoFlag']) {
            const stgrelationshipsResult = this.oiuononaFactory.
                stgrelationshipsExecuteQuery(this.stgrelationshipsModel);
            stgrelationshipsResult.subscribe(data => {
                if (data.length === 0) {
                    this.stgrelationshipsData = [];
                } else {
                    data.forEach(element => {
                        element.butViewMembers = this.translateService.translate('oiuonona.viewmembers');
                    });
                    this.stgrelationshipsData = data;
                    this.stgrelationshipsModel = data[0];
                }
            });
        }
    }

    caGoBtnClick = (event) => {
        this.stgrelationshipsModel.stgId = event.relatedStgId;
        this.dialogService.openLinkDialog('/OIISTGMI', this.stgrelationshipsModel, 80).subscribe(data => {

        });
        return false;
    }


}



