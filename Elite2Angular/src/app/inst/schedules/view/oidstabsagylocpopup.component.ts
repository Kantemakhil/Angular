import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidstabsService } from '@instschedules/service/oidstabs.service';
import { VAgencyAddresses } from '@instschedulebeans/VAgencyAddresses';
// import required bean declarations

@Component({
    selector: 'app-oidstabsagylocpopup',
    templateUrl: './oidstabsagylocpopup.component.html'

})
export class OidstabsagylocpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    agyaddrData: VAgencyAddresses[] = [];
    agyaddrModel: VAgencyAddresses = new VAgencyAddresses();
    agyLocColumnDefs: any[];
    incidentDate: any;
    constructor(private oidstabsFactory: OidstabsService, public translateService: TranslateService) {
        this.agyLocColumnDefs = [];
    }

    ngOnInit() {
        this.agyLocColumnDefs = [
                           { fieldName: this.translateService.translate('common.description'),
                              field: 'agyLocIdDesc', editable: true, width: 230 },
                           { fieldName: this.translateService.translate('common.id'),
                              field: 'agyLocId', width: 250, editable: true },
                           { fieldName: this.translateService.translate('common.suite'),
                              field: 'suiteNumber', editable: true, width: 300 },
                           { fieldName: this.translateService.translate('common.street'),
                              field: 'streetInformation', editable: true, width: 200 },
                              { fieldName: this.translateService.translate('common.city'),
                                  field: 'cityName', editable: true, width: 200 },
                       ];
        const rgagylocServiceObj = this.oidstabsFactory.rgAgyLocRecordGroup();
        rgagylocServiceObj.subscribe(rgagylocList => {
           this.agyaddrData = rgagylocList;
        });
    }

    onRowClickEvent(event) {
        this.agyaddrModel = new VAgencyAddresses();
        this.agyaddrModel.agyLocIdDesc = event.agyLocIdDesc;
        this.agyaddrModel.agyLocId = event.agyLocId;
        this.agyaddrModel.suiteNumber = event.suiteNumber;
        this.agyaddrModel.streetInformation = event.streetInformation;
        this.agyaddrModel.cityName = event.cityName;
        this.agyaddrModel.addressId = event.addressId;
    }

    processResult() {
        if ( this.agyaddrModel.agyLocId ) {
                this.dialog.close({agyLocIdDesc: this.agyaddrModel.agyLocIdDesc,
                    agyLocId: this.agyaddrModel.agyLocId, suiteNumber: this.agyaddrModel.suiteNumber,
                    streetInformation: this.agyaddrModel.streetInformation,
                    cityName: this.agyaddrModel.cityName, addressId : this.agyaddrModel.addressId});
        } else {
            this.dialog.close(null);
        }

    }
    clearData() {
        this.dialog.close(null);
    }
}
