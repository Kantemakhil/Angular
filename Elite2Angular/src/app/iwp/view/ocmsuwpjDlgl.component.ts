import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OcmsuwpjService } from '../service/ocmsuwpj.service';
import { VCorporateAddresses } from '@instschedulebeans/VCorporateAddresses';
import { OumaglocService } from '@sa/admin/service/oumagloc.service';
import { VAgencyAddresses } from '@saadminbeans/VAgencyAddresses';

@Component({
    selector: 'app-ocmsuwpjdlgl',
    templateUrl: './ocmsuwpjDlgl.component.html'
})

export class OcmsuwpjDlglComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    vCorpModel: VCorporateAddresses = new VCorporateAddresses();
    vCorpAddData: VCorporateAddresses[] = [];
    placeAddListColumnDef: any[];
    msgs: any[] = [];
    okDisabled: boolean;
    selected = -1;
    vAgyAddrModel :VAgencyAddresses = new VAgencyAddresses();
    constructor(public translateService: TranslateService, private router: Router,
        private OcmsuwpjFactory: OcmsuwpjService, private oumaglocService:OumaglocService) {
        this.placeAddListColumnDef = [];
    }
    ngOnInit() {
        this.okDisabled = true;
        this.placeAddListColumnDef = [
            { fieldName: this.translateService.translate('common.streetaddress'), field: 'streetAddress', editable: false, width: 150,
            datatype: 'text' },
            { fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocmsuwpj.city'), field: 'cityName', editable: false, width: 150, },
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
        if (this.dialog.data.type === 'EXT') {
            const placementResult = this.OcmsuwpjFactory.placementAddressExecuteQuery(this.dialog.data.placementCorporateId);
            placementResult.subscribe(data => {
                if (data.length === 0) {
                    this.vCorpAddData = [];
                    this.vCorpModel = new VCorporateAddresses();
                } else {
                    this.vCorpAddData = data;
                    this.vCorpModel = data[0];
                    this.okDisabled = false;
                    this.selected = 0;
                }
            });
        }
        else {

            this.vAgyAddrModel.agyLocId = this.dialog.data.agyLocId;
            const placementResult = this.oumaglocService.vAgyAddrExecuteQuery(this.vAgyAddrModel);
            placementResult.subscribe(data => {
                if (data.length === 0) {
                    this.vCorpAddData = [];
                    this.vCorpModel = new VCorporateAddresses();
                } else {
                    this.vCorpAddData = data;
                    this.vCorpModel = data[0];
                    this.okDisabled = false;
                    this.selected = 0;
                }
            });
        }
    }
    /**
 *  This function will be executed  event is fired
*/
    onRowclickEvent(event) {
        if (event) {
            this.vCorpModel = event;
        } else {
            this.vCorpModel = new VCorporateAddresses();
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
        this.dialog.close(this.vCorpModel);
    }
}

