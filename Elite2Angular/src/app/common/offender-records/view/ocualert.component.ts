import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcualertService } from '../service/ocualert.service';
import { OffenderAlerts } from '@instdemographicsbeans/OffenderAlerts';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-ocualert',
    templateUrl: './ocualert.component.html',
    styleUrls: []
})

export class OcualertComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    alertData: OffenderAlerts[] = [];
    alertDataTemp: OffenderAlerts[] = [];
    alertModel: OffenderAlerts = new OffenderAlerts();
    alertIndex = 0;
    alertInsertList: OffenderAlerts[] = [];
    alertUpdatetList: OffenderAlerts[] = [];
    alertDeleteList: OffenderAlerts[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    alertColumnDef: any[];
    alertReadOnly = false;
    navigationdummyRg: any[] = [];
    alertGridIndex = 1;
    alertOption: any[] = [];
    alertCodeOption: any[] = [];
    alertDomain: any;
    alertCodeDomain: any;
    constructor(private ocualertFactory: OcualertService, public translateService: TranslateService) {
        this.alertColumnDef = [];
    }
    ngOnInit() {
        this.alertExecuteQuery();
        this.alertColumnDef = [
            {
                fieldName: this.translateService.translate('ocualert.alerttype'), field: 'alertTypeDes', editable: false, width: 150,
                options: this.alertOption, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocualert.alertcode'), field: 'alertCodeDes', editable: false, width: 150,
                options: this.alertCodeOption, datatype: 'text'
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: false, width: 150 ,tooltip:true},
            {
                fieldName: this.translateService.translate('common.effectivedate'), field: 'alertDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            { fieldName: '', field: 'caseloadType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.verified'), field: 'verifiedFlag',
                editable: false, width: 150, datatype: 'checkbox'
            },
        ];
        this.alertDomain = 'ALERT';
        const serviceObjAlert = this.ocualertFactory.rgAlertDescription(this.alertDomain);
        serviceObjAlert.subscribe(alertList => {
            alertList.forEach(listval => {
                this.alertOption.push({ 'id': listval.description, 'text': listval.description });
            });

        });
        this.alertCodeDomain = 'ALERT_CODE';
        const serviceObjAlertCode = this.ocualertFactory.rgAlertDescription(this.alertCodeDomain);
        serviceObjAlertCode.subscribe(alertLists => {
            alertLists.forEach(listval => {
                this.alertCodeOption.push({ 'id': listval.description, 'text': listval.description });
            });

        });
    }
    alertExecuteQuery() {
        this.alertModel = new OffenderAlerts();
        this.alertModel.offenderBookId = this.dialog.data.offenderBookId;
        const alertResult = this.ocualertFactory.
            alertExecuteQuery(this.alertModel);
        alertResult.subscribe(alertResultList => {
            if (alertResultList.length === 0) {
                this.alertData = [];
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                for (let i = 0; i < alertResultList.length; i++) {
                    alertResultList[i].verifiedFlag = alertResultList[i].verifiedFlag === 'Y' ? true : false;
                }
                 var tempalertData=[];
                for (let i = 0; i < alertResultList.length; i++) {
                    if(alertResultList[i].alertStatus=='ACTIVE'){
                        tempalertData.push(alertResultList[i]);
                    }
                }
                this.alertData = tempalertData;
                this.alertModel = alertResultList[0];
            }
        });
    }


    butExitWhenButtonPressedTrigger() {
        this.dialog.close(null);
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
}
