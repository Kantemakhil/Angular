import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { VLivingUnitOffenders } from '@inst/automated-counts/beans/VLivingUnitOffenders';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OiiprollService } from '../service/oiiproll.service';
// import required bean declarations

@Component({
    selector: 'app-oiiunrol',
    templateUrl: './oiiunrol.component.html'
})

export class OiiunrolComponent implements OnInit {
    // Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    rolllistData: VLivingUnitOffenders[] = [];
    rolllistDataTemp: VLivingUnitOffenders[] = [];
    rolllistModel: VLivingUnitOffenders = new VLivingUnitOffenders();
    rolllistIndex = -1;
    rolllistInsertList: VLivingUnitOffenders[] = [];
    rolllistUpdatetList: VLivingUnitOffenders[] = [];
    rolllistDeleteList: VLivingUnitOffenders[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    rollListColumnDef: any[];
    personsReadOnly = false;
    cg$ctrlReadOnly = false;
    rollListReadOnly = false;
    locationDesc: any;
    constructor(
        private oiiprollFactory: OiiprollService,
        public translateService: TranslateService) {
        // TODO initilize data members here..!
        this.rollListColumnDef = [];
    }
    ngOnInit() {
        if (this.dialog.data) {
            this.locationDesc = undefined;
            this.locationDesc = this.dialog.data.bedLocation;
            this.rolllistExecuteQuery();
        }
        this.rollListColumnDef = [
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.givenname'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.housinglocation'), field: 'livingUnitDesc', editable: false, width: 200 },
            {
                fieldName: this.translateService.translate('common.currentlocation'), field: 'agencyImlDesc',
                editable: false, width: 200
            },
            {
                fieldName: this.translateService.translate('common.activealerts'), field: 'alertFlag', editable: false, width: 180,
                datatype: 'checkbox'
            }
        ];
    }
    allowNumbers(event) {
    }
    onRowClickrolllist(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    rolllistExecuteQuery() {
        this.rolllistModel = new VLivingUnitOffenders();
        this.rolllistModel.agyLocId = this.dialog.data.agyLocId;
        this.rolllistModel.rootLivingUnitId = this.dialog.data.Id;
        this.rolllistModel.cellType = this.dialog.data.type;
        const rolllistResult = this.oiiprollFactory.
            rollListExecuteQuery(this.rolllistModel);
        rolllistResult.subscribe(rolllistResultList => {
            if (rolllistResultList.length === 0) {
                this.rolllistData = [];
                this.rolllistDataTemp = [];
            } else {
                for (let i = 0; i < rolllistResultList.length; i++) {
                    rolllistResultList[i].alertFlag = rolllistResultList[i].alertFlag === 'Y' ? true : false;
                       // this.rolllistData.push(rolllistResultList[i]);
                }
                this.rolllistDataTemp = [];
                this.rolllistDataTemp = rolllistResultList;
                this.rolllistModel = rolllistResultList[0];
                this.rolllistIndex = 0;
            }
        });
    }

    butCloseWhenButtonPressedTrigger() {
        this.dialog.close(null);
    }
}
