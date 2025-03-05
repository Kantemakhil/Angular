import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiintlocService } from '@inst/movements/service/oiintloc.service';
import { VIntLocUsageLocations } from '@inst/movements/beans/VIntLocUsageLocations';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OidintmvService } from '../service/oidintmv.service';

@Component({
    selector: 'app-oiintloc',
    templateUrl: './oiintloc.component.html'
})

export class OiintlocComponent implements OnInit {
    disableSelectBtn = true;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    usage: any;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    intlocData: VIntLocUsageLocations[] = [];
    intlocDataTemp: VIntLocUsageLocations[] = [];
    intlocModel: VIntLocUsageLocations = new VIntLocUsageLocations();
    intlocInsertList: VIntLocUsageLocations[] = [];
    intlocUpdatetList: VIntLocUsageLocations[] = [];
    intlocDeleteList: VIntLocUsageLocations[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    offCipDetailsColumnDef: any[];
    intLocColumnDef: any[];
    offBlkColumnDef: any[];
    offEmColumnDef: any[];
    bedAhColumnDef: any[];
    resBlColumnDef: any[];
    offSchColumnDef: any[];
    offLocIndex = -1;
    rgusagesRg: any[] = [];
    constructor(private oidintmvFactory: OidintmvService,
        public translateService: TranslateService, ) {
        this.offCipDetailsColumnDef = [];
        this.intLocColumnDef = [];
        this.offBlkColumnDef = [];
        this.offEmColumnDef = [];
        this.bedAhColumnDef = [];
        this.resBlColumnDef = [];
        this.offSchColumnDef = [];
    }
    ngOnInit() {
        this.offCipDetailsColumnDef = [
            { fieldName: 'Type*', field: 'nbtPlacementDesc', editable: false, width: 150 },
            { fieldName: 'Requested By*', field: 'nbtRequestedBy', editable: false, width: 150 },
            { fieldName: 'Reason*', field: 'nbtPlaceReasonDesc', editable: false, width: 150 },
            { fieldName: 'Facility*', field: 'nbtAgyLocDesc', editable: false, width: 150 },
            { fieldName: '', field: 'butReqStaff', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementType', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementReason', editable: false, width: 150 },
            { fieldName: '', field: 'butAgyLocId', editable: false, width: 150 },
        ];
        this.intLocColumnDef = [
            {
                fieldName: this.translateService.translate('oiintloc.locationcode'), field: 'internalLocationCode',
                editable: false, width: 400
            },
            {
                fieldName: this.translateService.translate('oiintloc.locationdescription'), field: 'description',
                editable: false, width: 700
            },

        ];
        this.offBlkColumnDef = [
            { fieldName: '', field: 'butOffenderIdDisplay', editable: false, width: 150 },
            { fieldName: 'Schedule&#10;Time', field: 'startTime', editable: false, width: 150 },
            { fieldName: '', field: 'butEventSubType', editable: false, width: 150 },
            { fieldName: 'To Internal&#10;Location*', field: 'toInternalLocationDesc', editable: false, width: 150 },
            { fieldName: '', field: 'offenderFirstName', editable: false, width: 150 },
            { fieldName: '', field: 'butEventType', editable: false, width: 150 },
            { fieldName: 'Housing &#10;Location', field: 'livingUnitDesc', editable: false, width: 150 },
            { fieldName: '', field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: 'Internal &#10;Location', field: 'agencyImlDesc', editable: false, width: 150 },
            { fieldName: '', field: 'offenderLastName', editable: false, width: 150 },
            { fieldName: 'Schedule&#10;Type', field: 'eventTypeDesc', editable: false, width: 150 },
            { fieldName: 'Confirm', field: 'confirm', editable: false, width: 150 },
            { fieldName: 'Schedule &#10;Reason', field: 'eventSubTypeDesc', editable: false, width: 150 },
            { fieldName: '', field: 'butToInternalLocation', editable: false, width: 150 },
        ];
        this.offEmColumnDef = [
            { fieldName: '', field: 'movementType2', editable: false, width: 150 },
            { fieldName: 'Reason', field: 'movementReasonCode', editable: false, width: 150 },
            { fieldName: '', field: 'movementReasonCode2', editable: false, width: 150 },
            { fieldName: 'Date', field: 'movementDate', editable: false, width: 150 },
            { fieldName: 'Type', field: 'movementType', editable: false, width: 150 },
            { fieldName: '', field: 'lastName', editable: false, width: 150 },
            { fieldName: '', field: 'firstName', editable: false, width: 150 },
            { fieldName: '', field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: 'From', field: 'nbtFromAgyLocId', editable: false, width: 150 },
            { fieldName: 'To', field: 'nbtToAgyLocId', editable: false, width: 150 },
            { fieldName: 'Dir', field: 'directionCode', editable: false, width: 150 },
            { fieldName: 'Time', field: 'movementTime', editable: false, width: 150 },
            { fieldName: 'S', field: 'nbtMovementStatus', editable: false, width: 150 },
        ];
        this.bedAhColumnDef = [
            { fieldName: '', field: 'dspLastName', editable: false, width: 150 },
            { fieldName: '', field: 'dspFirstName', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay2', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Reason', field: 'dspDescription', editable: false, width: 150 },
            { fieldName: 'To Location*', field: 'cgnbtLivingUnitId2', editable: false, width: 150 },
            { fieldName: 'From Location', field: 'dspLivingUnitDescription', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
            { fieldName: '', field: 'dspDescription2', editable: false, width: 150 },
        ];
        this.resBlColumnDef = [
            { fieldName: '', field: 'agyLocId2', editable: false, width: 150 },
            { fieldName: '', field: 'butCommentText', editable: false, width: 150 },
            { fieldName: 'Until Date*', field: 'reserveUntilDate', editable: false, width: 150 },
            { fieldName: 'Comment', field: 'commentText', editable: false, width: 150 },
            { fieldName: '', field: 'agyLocId', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId', editable: false, width: 150 },
            { fieldName: '', field: 'butOffenderId', editable: false, width: 150 },
            { fieldName: 'OC?', field: 'cgnbtCommentText', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId2', editable: false, width: 150 },
            { fieldName: '', field: 'offenderId', editable: false, width: 150 },
            { fieldName: 'CB', field: 'cgnbtOffenderId3', editable: false, width: 150 },
            { fieldName: '', field: 'reserveBedId', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Location*', field: 'cgnbtLivingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'livingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
        ];
        this.offSchColumnDef = [
            { fieldName: 'Date*', field: 'eventDate', editable: false, width: 150 },
            { fieldName: 'Time*', field: 'startTime', editable: false, width: 150 },
            { fieldName: 'Comment', field: 'commentText', editable: false, width: 150 },
            { fieldName: '', field: 'butToInternalLocationDesc', editable: false, width: 150 },
            { fieldName: 'Location*', field: 'toInternalLocationDesc', editable: false, width: 150 },
            { fieldName: 'Schedule Reason*', field: 'eventSubTypeDesc', editable: false, width: 150 },
            { fieldName: '', field: 'butEventSubTypeDesc', editable: false, width: 150 },
        ];

        const rgusagesServiceObj = this.oidintmvFactory.rgUsagesRecordGroup();
        rgusagesServiceObj.subscribe(rgusageslist => {
            if (rgusageslist.length === 0) {
                this.rgusagesRg = [];
            } else {
                for (let i = 0; i < rgusageslist.length; i++) {
                    this.rgusagesRg.push({
                        'text': rgusageslist[i].code + ' - ' +
                            rgusageslist[i].description, 'id': rgusageslist[i].code
                    });
                }
            }
        });
    }
    onRowClickintloc(event) {
        this.intlocModel = new VIntLocUsageLocations();
        this.intlocModel.userDesc = event.description;
        this.intlocModel.internalLocationId = event.internalLocationId;
        this.intlocModel.internalLocationCode = event.internalLocationCode;
    }
    allowNumbers(event) {
    }
    getData() {
        this.dialog.close({
            toIntLocUserDesc: this.intlocModel.userDesc,
            toInternalLocationId: this.intlocModel.internalLocationId,
            toInternalLocationDesc: this.intlocModel.internalLocationCode
        });
    }
    no() {
    }
    cancel() {
        this.dialog.close(null);
    }
    onOffenderChange(offender) {
    }
    intlocExecuteQuery(event) {
        this.intlocModel.agyLocId = this.dialog.data.agyLocId;
        this.intlocModel.internalLocationUsage = event;
        const intlocResult = this.oidintmvFactory.intLocExecuteQuery(this.intlocModel);
        intlocResult.subscribe(intlocResultList => {
            if (intlocResultList.length === 0) {
                this.intlocData = [];
                this.disableSelectBtn = true;
            } else {
                this.intlocData = intlocResultList;
                this.intlocModel = intlocResultList[0];
                this.offLocIndex = 0;
                this.disableSelectBtn = false;
            }
        });
    }
}
