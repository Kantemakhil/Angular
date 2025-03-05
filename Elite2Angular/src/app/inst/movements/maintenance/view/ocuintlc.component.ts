import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyInternalLocations } from '@instoicbeans/AgencyInternalLocations';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OimulocaService } from '@inst/movements/maintenance//service/oimuloca.service';
import { OcuintlcService } from '@inst/movements/maintenance/service/ocuintlc.service';

@Component({
    selector: 'app-ocuintlc',
    templateUrl: './ocuintlc.component.html'
})

export class OcuintlcComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    msgs: any[] = [];
    intlocData: AgencyInternalLocations[] = [];
    intlocModel: AgencyInternalLocations = new AgencyInternalLocations();
    selectedRow: AgencyInternalLocations = new AgencyInternalLocations();
    intlocIndex = -1;
    intLocColumnDef: any[];
    displayhlocFlag: boolean;
    spinnerFlag: boolean;
    constructor(private ocuintlcFactory: OcuintlcService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public oimulocaFactory: OimulocaService) {
        this.intLocColumnDef = [];
        this.spinnerFlag = true;
    }
    ngOnInit() {
        this.intlocIndex = -1;
        this.displayhlocFlag = false;
        this.intlocExecuteQuery();
        this.intLocColumnDef = [
            {
                fieldName: this.translateService.translate('common.select'), field: 'activeFlag',
                editable: true, width: 40, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.locationcode'), field: 'internalLocationCode',
                editable: false, width: 80
            },
            { fieldName: this.translateService.translate('common.locationdescription'), field: 'description', editable: false, width: 80 },
            { fieldName: this.translateService.translate('common.level'), field: 'levelCode', editable: false, width: 40 },
        ];
    }
    /**
     * This function displays the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
    *  This function will be executed when we select a row in the grid
   *
   */
    onRowClickintloc(event) {
        if (event) {
            this.selectedRow = event;
        }
    }
    /**
*  This function is used to enable/disable grid save button
*/
    get saveBtn() {
        return false;
    }
    /**
    *  This function will be executed when we click on select button
   *
   */
    onButSelectclick() {
        const colsedDialogData = [];
        this.intlocData.forEach(element => {
            if (element['activeFlag']) {
                colsedDialogData.push(element);
            }
        });
        this.dialog.close(colsedDialogData);
    }
    /**
    *  This function will be executed when we click cancel
   *
   */
    onButCancelclick() {
        this.dialog.close(null);
    }
    /**
    *  This function will be executed when we click on checkbox
   *
   */
    whenCheckboxChangedTrigger(event) {
        this.intlocExecuteQuery();
    }
    /**
    *  This function to get the data in the grid
   *
   */
    intlocExecuteQuery() {
        this.intlocModel = new AgencyInternalLocations();
        this.intlocModel.agyLocId = this.dialog.data.agyLocId;
        this.intlocModel.inserted = this.dialog.data.tabIndex;
        this.intlocModel.internalLocationUsageId = this.dialog.data.internalLocationUsageId;
        if (this.dialog.data.internalLocationId) {
            this.intlocModel.internalLocationId = this.dialog.data.internalLocationId;
        }
        if (this.displayhlocFlag) {
            this.intlocModel.trackingFlag = 'Y';
        } else {
            this.intlocModel.trackingFlag = 'N';
        }
        const intlocResult = this.ocuintlcFactory.
            intLocExecuteQuery(this.intlocModel);
        intlocResult.subscribe(intlocResultList => {
            if (intlocResultList.length === 0) {
                this.intlocData = [];
                this.spinnerFlag = false;
                this.intlocIndex = -1;
            } else {
                intlocResultList.forEach(element => {
                    element.levelCode = element.levelCode === 'null' ? undefined : element.levelCode;
                });
                this.intlocData = intlocResultList;
                this.intlocModel = intlocResultList[0];
                this.spinnerFlag = false;
                this.intlocIndex = 0;
            }
        });
    }
}
