import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiipclocService } from '@inst/property/service/oiipcloc.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { UserSessionManager } from '@core/classes/userSessionManager';
//  import required bean declarations

@Component({
    selector: 'app-oiipcloc',
    templateUrl: './oiipcloc.component.html'
})

export class OiipclocComponent implements OnInit {
    //  Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offConModelTemp: OffenderPptyContainers = new OffenderPptyContainers();
    offConModel: OffenderPptyContainers = new OffenderPptyContainers();
    offConBean: OffenderPptyContainers = new OffenderPptyContainers();
    offconIndex = 0;
    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdatetList: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offConColumnDef: any[];
    offPiReadOnly = false;
    sysPflReadOnly = false;
    cg$ctrlReadOnly = false;
    offConReadOnly = false;
    rgcontainercodeRg: any[] = [];
    rgdescription2Rg: any[] = [];
    caseloadId: string;
    activeFlagTemp: any;
    retrivebtnDisable: boolean;
    offConGridIndex = -1;
    disabledFlag = true;
    associateoffenderReadonly: boolean;
    locationLink: any;
    disableFilter: boolean;
    locationTitles = {description: 'Description', code: 'Location' };
    constructor(private oiipclocFactory: OiipclocService, private sessionManager: UserSessionManager,
        public translateService: TranslateService) {
        this.offConColumnDef = [];
    }
    ngOnInit() {
        this.disableFilter = false;
        this.associateoffenderReadonly = true;
        this.activeFlagTemp = true;
        this.retrivebtnDisable = false;
        this.offConModel = new OffenderPptyContainers();
        this.offConModel.activeFlag = this.activeFlagTemp;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.locationLink = 'oiipcloc/rgDescriptionRecordGroup?caseloadId=' + this.caseloadId;
        this.offConColumnDef = [
            {
                fieldName: this.translateService.translate('common.type'), field: 'containerCode',
                editable: true, width: 200, datatype: 'lov', domain: 'PPTY_CNTNR', optionWidth: 350,
                cellEditable: this.canOffConEdit
            },
            {
                fieldName: this.translateService.translate('common.proposeddisposal'),
                field: 'proposedDisposalDate', editable: true, width: 200, cellEditable: this.canOffConEdit, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.deactivationdate'),
                field: 'expiryDate', editable: true, width: 200, cellEditable: this.canOffConEdit, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.sealmark'),
                field: 'sealMark', editable: true, width: 250, cellEditable: this.canOffConEdit
            },
            {
                fieldName: this.translateService.translate('common.location'),
                field: 'code', editable: true, width: 250, cellEditable: this.canOffConEdit, datatype: 'lov',source:'OIMULOCA',
                link: 'oiipcloc/rgDescriptionRecordGroup?caseloadId=' + this.caseloadId, codeTitle: 'Location', optionWidth: 400
            },
            {
                fieldName: this.translateService.translate('common.active'),
                field: 'activeFlag', editable: false, width: 200, cellEditable: false, datatype: 'checkbox'
            },
        ];

        const rgcontainercodeServiceObj = this.oiipclocFactory.rgContainerCodeRecordGroup();
        rgcontainercodeServiceObj.subscribe(rgcontainercodelist => {
            if (rgcontainercodelist.length === 0) {
                this.rgcontainercodeRg = [];
            } else {
                for (let i = 0; i < rgcontainercodelist.length; i++) {
                    this.rgcontainercodeRg.push({
                        'text': rgcontainercodelist[i].code + ' - ' +
                            rgcontainercodelist[i].description, 'id': rgcontainercodelist[i].code
                    });
                }
            }
        });
        const rgdescription2ServiceObj = this.oiipclocFactory.rgDescriptionRecordGroup(this.caseloadId);
        rgdescription2ServiceObj.subscribe(rgdescriptionlist => {
            if (rgdescriptionlist.length === 0) {
                this.rgdescription2Rg = [];
            } else {
                for (let i = 0; i < rgdescriptionlist.length; i++) {
                    this.rgdescription2Rg.push({
                        'text': rgdescriptionlist[i].code + ' - ' +
                            rgdescriptionlist[i].description, 'id': rgdescriptionlist[i].code
                    });
                }
            }
        });
    }
    /*
   * This function executed to clear grid values
   */
    offconClearQuery(form?) {
        this.disableFilter = false;
        this.offconData = [];
        this.activeFlagTemp = true;
        this.offConModel = new OffenderPptyContainers();
        this.offConBean = new OffenderPptyContainers();
        this.retrivebtnDisable = false;
        this.disabledFlag = true;
        this.offConModel.activeFlag = this.activeFlagTemp;
    }
    /*
     * This function executed to disable Module short name column in  Module Privileges column
     */
    canOffConEdit = (data: any, index: number, field: string): boolean => {
        if (!this.offconData[0].propertyContainerId) {
            return true;
        }
        return false;
    }
    /*
    * This function executed to add a new record into the grid
    */
    onGridInsert = () => {
        if (this.offconData.length > 0) {
            return;
        }
        return { propertyContainerId: undefined };
    }
    onRowClickoffcon(event) {
        if (event) {
            this.offConBean = event;
        }
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    whenLocation(event) {
        if (event) {
            this.offConModel.internalLocationId = event.internalLocationId;
        }
    }
    /*
    * This function executed to retrieve grid data
    */
    offconExecuteQuery() {
        /*if (this.offConModel.activeFlag) {
            this.offConModel.activeFlag = 'true';
        } else {
            this.offConModel.activeFlag = 'false';
        }*/
        if (!this.offConModel.internalLocationId || String(this.offConModel.internalLocationId) === 'true') {
            this.offConModel.internalLocationId = undefined;
        }
        const offconResult = this.oiipclocFactory.offConExecuteQuery(this.offConModel);
        offconResult.subscribe(offconResultList => {
            if (offconResultList.length === 0) {
                this.disableFilter = false;
                this.retrivebtnDisable = false;
                // this.disabledFlag = true;
                this.offconData = [];
                this.offConModel = new OffenderPptyContainers();
                this.offConModel.activeFlag = this.activeFlagTemp;
                this.offConBean = new OffenderPptyContainers();
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                this.disableFilter = true;
                for (let i = 0; i < offconResultList.length; i++) {
                    if ( offconResultList[i].activeFlag === 'Y') {
                        offconResultList[i].activeFlag = true;
                    } else {
                        offconResultList[i].activeFlag = false;
                    }
                }
                this.retrivebtnDisable = true;
                this.disabledFlag = false;
                this.offconData = offconResultList;
                this.offConGridIndex = 0;
                this.associateoffenderReadonly = true;
                this.offConModelTemp = new OffenderPptyContainers();
            }
        });
    }
    onCheckboxChange(event) {
        if (event) {
            if (event.checked) {
                this.offConModel.activeFlag = event.checked;
            } else {
                this.offConModel.activeFlag = event.checked;
            }
        }
    }
     /*
     * this event is used to do the validations
     */
    onKeyPressEvent() {
        this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
    }

    isClear(event) {
        if ((event.touched || event.dirty) || this.offconData.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}
