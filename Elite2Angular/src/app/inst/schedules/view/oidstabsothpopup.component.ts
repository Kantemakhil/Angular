import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidstabsService } from '@instschedules/service/oidstabs.service';
import { VAddressUsages } from '@instschedulebeans/VAddressUsages';
// import required bean declarations

@Component({
    selector: 'app-oidstabsothpopup',
    templateUrl: './oidstabsothpopup.component.html'

})
export class OidstabsothpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    othaddrData: VAddressUsages[] = [];
    othaddrModel: VAddressUsages = new VAddressUsages();
    othLocColumnDefs: any[];
    incidentDate: any;
    constructor(private oidstabsFactory: OidstabsService, public translateService: TranslateService) {
        this.othLocColumnDefs = [];
    }

    ngOnInit() {
        this.othLocColumnDefs = [
                           { fieldName: this.translateService.translate('common.name'),
                              field: 'description', editable: true, width: 200 },
                           { fieldName: this.translateService.translate('common.suite'),
                              field: 'suiteNumber', editable: true, width: 300 },
                           { fieldName: this.translateService.translate('common.street'),
                              field: 'streetInformation', editable: true, width: 200 },
                              { fieldName: this.translateService.translate('common.city'),
                                  field: 'cityName', editable: true, width: 200 },
                       ];
        const rgothlocServiceObj = this.oidstabsFactory.rgOthLocRecordGroup(this.dialog.data.rootOffenderId);
        rgothlocServiceObj.subscribe(rgothlocList => {
            this.othaddrData = rgothlocList;
        });
    }

    onRowClickEvent(event) {
        this.othaddrModel = new VAddressUsages();
        this.othaddrModel.description = event.description;
        this.othaddrModel.suiteNumber = event.suiteNumber;
        this.othaddrModel.streetInformation = event.streetInformation;
        this.othaddrModel.cityName = event.cityName;
        this.othaddrModel.addressId = event.addressId;
    }

    processResult() {
        if ( this.othaddrModel.addressId ) {
                this.dialog.close({description: this.othaddrModel.description, suiteNumber: this.othaddrModel.suiteNumber,
                    streetInformation: this.othaddrModel.streetInformation, addressId: this.othaddrModel.addressId,
                    cityName: this.othaddrModel.cityName});
        } else {
            this.dialog.close(null);
        }

    }
    clearData() {
        this.dialog.close(null);
    }
}
