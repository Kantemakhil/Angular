import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OcmsvacpService } from '../service/ocmsvacp.service';
import { VAddresses } from '@inst/demographics-biometrics/beans/VAddresses';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 'app-ocmsvacpdialoug',
    templateUrl: './ocmsvacpdialoug.component.html'
})

export class OcmsvacpDialougComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    vAddressModel: VAddresses = new VAddresses();
    vAddressData: VAddresses[] = [];
    placeAddListColumnDef: any[];
    msgs: any[] = [];
    okDisabled: boolean;
    selected = -1;
    crsActBean: CourseActivities = new CourseActivities();
    constructor(public translateService: TranslateService, private router: Router,
        private OcmsvacpFactory: OcmsvacpService,  public sessionManager: UserSessionManager) {
        this.placeAddListColumnDef = [];
    }
    ngOnInit() {
        this.okDisabled = true;
        this.placeAddListColumnDef = [
            { fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress', editable: false, width: 150,
            datatype: 'text' },
            { fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocmsvacp.city'), field: 'cityName', editable: false, width: 150, },
            { fieldName: this.translateService.translate('common.state'), field: 'provStateDesc', editable: false, width: 150, },
            { fieldName: this.translateService.translate('system-profile.zip-post'), field: 'zipPostalCode', editable: false, width: 150, },
            { fieldName: this.translateService.translate('common.country'), field: 'country', editable: false, width: 150, },
        ];
        this.placementExecuteQuery();
    }
    /**
       *  This function will be executed  event is fired
      */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
   *  This function will be executed  event is fired
  */
    placementExecuteQuery() {
        this.crsActBean.providerPartyId = this.dialog.data.providerPartyId;
        this.crsActBean.providerPartyCode = this.dialog.data.code;
        this.crsActBean.providerPartyCode=this.dialog.data.providerPartyCode;
        this.crsActBean.providerType = this.dialog.data.providerType;
        this.crsActBean.agyLocId = this.sessionManager.currentCaseLoadType;
        this.crsActBean.caseloadId=this.sessionManager.currentCaseLoad;
        this.vAddressModel.ownerId = this.dialog.data.ownerId;
        const placementResult = this.OcmsvacpFactory.addressExecuteQueryDialog(this.crsActBean);
        placementResult.subscribe(data => {
            if (data.length === 0) {
                this.vAddressData = [];
                this.vAddressModel = new VAddresses();
            } else {
                this.vAddressData = data;
                this.vAddressModel = data[0];
                this.okDisabled = false;
                this.selected = 0;
            }
        });
    }
    /**
 *  This function will be executed  event is fired
*/
    onRowclickEvent(event) {
        if (event) {
            this.vAddressModel = event;
        } else {
            this.vAddressModel = new VAddresses();
        }
    }
    /**
       *  This function will be executed  event is fired
      */
    onExit() {
        this.dialog.close(null);
    }
    /**
   *  This function will be executed  event is fired
  */
    onSelect() {
        this.dialog.close(this.vAddressModel);
    }
}

