import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidstabsService } from '@instschedules/service/oidstabs.service';
import { VCorporateAddresses } from '@instschedulebeans/VCorporateAddresses';
// import required bean declarations

@Component({
    selector: 'app-oidstabsbuspopup',
    templateUrl: './oidstabsbuspopup.component.html'

})
export class OidstabsbuspopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    busaddrData: VCorporateAddresses[] = [];
    busaddrModel: VCorporateAddresses = new VCorporateAddresses();
    busLocColumnDefs: any[];
    incidentDate: any;
    constructor(private oidstabsFactory: OidstabsService, public translateService: TranslateService) {
        this.busLocColumnDefs = [];
    }

    ngOnInit() {
        this.busLocColumnDefs = [
                           { fieldName: this.translateService.translate('common.description'),
                              field: 'description', editable: true, width: 200 },
                           { fieldName: this.translateService.translate('common.suite'),
                              field: 'suiteNumber', editable: true, width: 300 },
                           { fieldName: this.translateService.translate('common.street'),
                              field: 'streetInformation', editable: true, width: 200 },
                              { fieldName: this.translateService.translate('common.city'),
                                  field: 'cityName', editable: true, width: 200 },
                       ];
        const rgcorplocServiceObj = this.oidstabsFactory.rgCorpLocRecordGroup();
        rgcorplocServiceObj.subscribe(rgcorploclist => {
                this.busaddrData = rgcorploclist;
        });
    }

    onRowClickEvent(event) {
        this.busaddrModel = new VCorporateAddresses();
        this.busaddrModel.description = event.description;
        this.busaddrModel.suiteNumber = event.suiteNumber;
        this.busaddrModel.streetInformation = event.streetInformation;
        this.busaddrModel.cityName = event.cityName;
        this.busaddrModel.addressId = event.addressId;
    }

    processResult() {
        if ( this.busaddrModel.addressId ) {
                this.dialog.close({description: this.busaddrModel.description, suiteNumber: this.busaddrModel.suiteNumber,
                    streetInformation: this.busaddrModel.streetInformation, addressId: this.busaddrModel.addressId,
                    cityName: this.busaddrModel.cityName});
        } else {
            this.dialog.close(null);
        }

    }
    clearData() {
        this.dialog.close(null);
    }
}
