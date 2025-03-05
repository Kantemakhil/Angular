import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuselveService } from '@inst/transportation/maintenance/service/oiuselve.service';
import { SelectVehiclesV1 } from '@inst/transportation/beans/SelectVehiclesV1';
import { Router } from '@angular/router';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
@Component({
    selector: 'app-oiuselve',
    templateUrl: './oiuselve.component.html',
})

export class OiuselveComponent implements OnInit {
    @ViewChild('SvlsGrid', { static: true }) fodGrid: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    msglist: any[];
    message: any;
    type: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    index: any;
    nameOfLovPage: string;
    listToCompare: any[] = [];
    selectvehiclesDataTemp: SelectVehiclesV1 = new SelectVehiclesV1();
    selectvehiclesModel2: SelectVehiclesV1 = new SelectVehiclesV1();
    selectvehiclesIndex: number = 0;
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    selectDisabled: boolean;
    editable: boolean = true;
    selectVehiclesColumnDef: any[];
    selectVehiclesReadOnly: boolean = false;
    selectvehiclesData: SelectVehiclesV1[] = [];
    modeldata: SelectVehiclesV1 = new SelectVehiclesV1();
    screenName: string;

    constructor(private oiuselveFactory: OiuselveService, public translateService: TranslateService,
         private router: Router, public dialogService: DialogService) {

        this.selectVehiclesColumnDef = [];
    }
    ngOnInit() {

        this.screenName = this.router.url.replace('/', '');
        if (this.screenName === 'OIDSLTRI') {
            this.selectDisabled = true;
        } else {
            this.selectDisabled = false;
        }
        this.selectVehiclesColumnDef = [
            { fieldName: this.translateService.translate('oiuselve.type'), field: 'type', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.make'), field: 'make', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.modelNo'), field: 'modelNo', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.vehicleId'), field: 'vehicleId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.description'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.optcap'), field: 'optimumCapacity', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oiuselve.physopt'), field: 'physicalCapacity', editable: false, width: 150 },
           

        ];
        this.selectvehiclesExecuteQuery();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClickselectvehicles(event) {
        if (event) {
            this.selectvehiclesDataTemp = event;
        }
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    onButSelectclick() {
        this.dialog.close(this.selectvehiclesDataTemp);
    }

    selectvehiclesExecuteQuery() {
        this.modeldata = new SelectVehiclesV1()
        this.modeldata.scheduledTripId = this.dialog.data.scheduledTripId;
        this.modeldata.formModuleName = this.screenName;

        const selectvehiclesResult = this.oiuselveFactory.
            selectvehiclesExecuteQuery(this.modeldata);
        selectvehiclesResult.subscribe(data => {
            if (data.length === 0) {
                this.selectvehiclesData = [];

            } else {
                this.selectvehiclesData = data;

            }
        });
    }
}


