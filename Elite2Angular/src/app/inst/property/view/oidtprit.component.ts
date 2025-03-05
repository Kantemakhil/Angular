import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidtpritService } from '../service/oidtprit.service';
import { OffenderPptyItemTxns } from '@instproperty/OffenderPptyItemTxns';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffenderPptyItemsCommitBean } from '@instproperty/OffenderPptyItemsCommitBean';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidrpitmService } from '../service/oidrpitm.service';

@Component({
    selector: 'app-oidtprit',
    templateUrl: './oidtprit.component.html'
})

export class OidtpritComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    selectedLocation: any;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    selectedFromStatus: string;
    selectedStatus: any;
    vHeaderBlockModel: VPropertyHeaderBlock = new VPropertyHeaderBlock();
    itmtxData: OffenderPptyItemTxns[] = [];
    itmtxDataTemp: OffenderPptyItemTxns[] = [];
    itmtxModel: OffenderPptyItemTxns = new OffenderPptyItemTxns();
    offpiCommitModel: OffenderPptyItemsCommitBean = new OffenderPptyItemsCommitBean();
    itmtxIndex: number;
    itmtxInsertList: OffenderPptyItemTxns[] = [];
    itmtxUpdatetList: OffenderPptyItemTxns[] = [];
    itmtxDeleteList: OffenderPptyItemTxns[] = [];
    offpiData: OffenderPptyItems[] = [];
    offpiDataTemp: OffenderPptyItems[] = [];
    offpiModel: OffenderPptyItems = new OffenderPptyItems();
    offpiIndex = -1;
    offpiInsertList: OffenderPptyItems[] = [];
    offpiUpdatetList: OffenderPptyItems[] = [];
    offpiDeleteList: OffenderPptyItems[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offPiColumnDef: any[];
    itmTxReadOnly: boolean;
    offPiReadOnly: boolean;
    sysPflReadOnly: boolean;
    cgfkItmtxfromstatuscodeRg: any[] = [];
    cgfkItmtxtostatuscodeRg: any[] = [];
    cgfkItmtxpropertycontainerRg: any[] = [];
    facilityLink: any;
    locationLink: any;
    offBkId: any;
    selectedToStatus: string;
    caseLoadId: any;
    commentText: any;
    selectedToLocation: any;
    selectedfromLocation: any;
    fromFalg: boolean;
    toFalg: boolean;
    tostatusFalg: boolean;
    fromstatusFalg: boolean;
    manageLocDisable: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    propertyContainerId: any;
    lockFlag: boolean;
    containerId: any;
    toContainerId: any;
    check: any;
    checkConfirmAllFlag: boolean;
    checkPrintFlag: boolean;
    fromLocationFlag: boolean;
    toLocationFlag: boolean;
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    colorRecordGroupValues: any[] = [];
    conditionRecordGroupValues: any[] = [];
    locationValuesList: any[] = [];
    fromLocReadOnly: boolean;
    toLocReadOnly: boolean;
    LocationTitles = { description: 'Description', itemToStatus: 'Container Description'};
    lockFlagTemp: boolean;
    commentReadOnly: boolean;
    fromStatusLink: any;
    constructor(private oidtpritFactory: OidtpritService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
        private router: Router, public dialogService: DialogService, private oidrpitmFactory: OidrpitmService) { }
    onGridReady(event) {
    }
    ngOnInit() {
        this.commentReadOnly = true;
        this.lockFlagTemp = true;
        this.fromLocReadOnly = true;
        this.toLocReadOnly = true;
        this.fromLocationFlag = true;
        this.toLocationFlag = true;
        this.manageLocDisable = true;
        this.checkConfirmAllFlag = true;
        this.checkPrintFlag = true;
        this.tostatusFalg = true;
        this.fromFalg = true;
        this.toFalg = true;
        this.fromstatusFalg = true;
        this.check = true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        if (this.oidtpritFactory.offPptyItmTxnModel && (!this.oidtpritFactory.flag && this.oidtpritFactory.flag !== undefined)
         && !this.oidtpritFactory.checkExitFlag && this.oidtpritFactory.checkExitFlag !== undefined) {
            this.tostatusFalg = false;
            this.fromFalg = false;
            this.selectedFromStatus = this.oidtpritFactory.offPptyItmTxnModel.fromStatusCode;
            this.selectedStatus = this.oidtpritFactory.offPptyItmTxnModel.toStatusCode;
            this.selectedfromLocation = this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId;
            this.selectedToLocation = this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId;
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
            this.offpiIndex = -1;
        }
        this.offPiColumnDef = [
            {
                fieldName: this.translateService.translate('oiddprop.confirm'), field: 'confirmFlag',
                editable: true, width: 150, datatype: 'checkbox', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.type'), field: 'propertyTypeDesc',
                editable: true, width: 150, datatype: 'text', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.description'), field: 'propertyDescription',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.color'), field: 'color',
                datatype: 'text',
                editable: false
            },
            {
                fieldName: this.translateService.translate('common.condition'), field: 'conditionCode',
                datatype: 'text',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.make'), field: 'make',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.serialnumber'), field: 'serialNo',
                editable: false, width: 150, datatype: 'text', maxlength: 12
            },
            {
                fieldName: this.translateService.translate('common.quantity'), field: 'quantity',
                editable: false, width: 150, datatype: 'text', mask: this.getMask
            },
        ];
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
        const colorServiceObj = this.oidrpitmFactory.rgColorRecordGroup();
        colorServiceObj.subscribe(colorList => {
            if (colorList.length === 0) {
                this.colorRecordGroupValues = [];
            } else {
                for (let i = 0; i < colorList.length; i++) {
                    this.colorRecordGroupValues.push({ 'id': colorList, 'text': colorList });
                }
            }
        });
        const conditionServiceObj = this.oidrpitmFactory.rgCondnRecordGroup();
        conditionServiceObj.subscribe(conditionList => {
            if (conditionList.length === 0) {
                this.conditionRecordGroupValues = [];
            } else {
                for (let i = 0; i < conditionList.length; i++) {
                    this.conditionRecordGroupValues.push({
                        'id': conditionList,
                        'text': conditionList
                    });
                }
            }
        });
    }
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!this.vHeaderBlockModel.offenderBookId && !this.offpiData[0].propertyDescription) {
            return false;
        } else {
            return true;
        }
    }
    onRowClickagyincpartiesoffender(event) {
            if (!this.selectedFromStatus) {
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.type = 'warn';
                this.message = this.translateService.translate('oidtprit.selectfromstatus');
                this.show();
                return;
            }
            if (this.selectedFromStatus === 'STORED' && !this.selectedfromLocation) {
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.type = 'warn';
                this.message = this.message = this.translateService.translate('oidtprit.selectLocation');
                this.show();
                return;
            }
            if (!this.selectedStatus) {
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.type = 'warn';
                this.message = this.translateService.translate('oidtprit.tostatusmustbeentered');
                this.show();
                return;
            }
            if (this.selectedStatus === 'STORED' && !this.selectedToLocation) {
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.type = 'warn';
                this.message = this.message = this.translateService.translate('oidtprit.selectLocation');
                this.show();
                return;
            }
            this.offconModel = new OffenderPptyContainers();
            if (this.selectedfromLocation && this.selectedfromLocation.length > 0) {
                this.offconModel.propertyContainerId = this.selectedfromLocation;
            } else if (this.selectedToLocation && this.selectedToLocation.length > 0) {
                this.offconModel.propertyContainerId = this.selectedToLocation;
            } else {
                this.offconModel.propertyContainerId = undefined;
            }
            this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
            if (!this.offpiData[0].propertyItemSeq) {
                this.getSealMarkValue();
            }
    }
    getSealMarkValue() {
        const sealMarkValue = this.oidtpritFactory.itmTxWhenValidateRecordregItems(this.offconModel);
        sealMarkValue.subscribe(sealMarkList => {
            this.offconModel.sealMark = sealMarkList.sealMark;
            if (this.offconModel.sealMark) {
                const data = {
                    label: this.translateService.translate('oidtprit.transactwillresult'), yesBtn: true, noBtn: false
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if (result) {
                        this.offpiExecuteQuery();
                    } else {
                        this.offpiExecuteQuery();
                    }
                });
            } else {
                this.offpiExecuteQuery();
            }

        });
    }
    onOffenderChange(offender) {
        if (offender) {
            this.fromStatusLink = 'oidtprit/cgfkItmTxFromStatusCodeRecordGroup';
            this.containerId = undefined;
            this.toContainerId = undefined;
            this.vHeaderBlockModel = offender;
            this.oidtpritFactory.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
            const agyincpartiesstaffResult = this.oidtpritFactory.
                cgfkItmtxpropertycontainerRecordGroup(this.caseLoadId, this.vHeaderBlockModel.offenderBookId);
            agyincpartiesstaffResult.subscribe(locationValues => {
                if (locationValues.length === 0) {
                    this.locationValuesList = [];
                } else {
                    this.locationValuesList = locationValues;
                }
            });
            this.fromFalg = true;
            this.tostatusFalg = true;
            this.fromstatusFalg = false;
            this.manageLocDisable = false;
            this.selectedFromStatus = undefined;
            this.selectedfromLocation = undefined;
            this.selectedStatus = undefined;
            this.commentText = undefined;
            this.checkConfirmAllFlag = false;
            this.commentReadOnly = false;
            if (this.oidtpritFactory.offPptyItmTxnModel && (!this.oidtpritFactory.flag && this.oidtpritFactory.flag !== undefined)
             && !this.oidtpritFactory.checkExitFlag && this.oidtpritFactory.checkExitFlag !== undefined) {
                this.oidtpritFactory.flag = true;
                this.tostatusFalg = false;
                this.fromFalg = false;
                this.selectedFromStatus = this.oidtpritFactory.offPptyItmTxnModel.fromStatusCode;
                this.selectedStatus = this.oidtpritFactory.offPptyItmTxnModel.toStatusCode;
                this.selectedfromLocation = this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId;
                this.selectedToLocation = this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId;
                this.oidtpritFactory.offPptyItmTxnModel = new OffenderPptyItemTxns();
                this.oidtpritFactory.offPptyItmTxnModel.toStatusCode = undefined;
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.oidtpritFactory.checkExitFlag = false;
            }
        } else {
            this.selectedFromStatus = undefined;
            this.selectedfromLocation = undefined;
            this.selectedStatus = undefined;
            this.commentText = undefined;
            this.lockFlag = false;
            this.selectedToLocation = undefined;
            this.fromstatusFalg = true;
            this.fromFalg = true;
            this.tostatusFalg = true;
            this.toFalg = true;
            this.offpiData = [];
            this.offpiModel = new OffenderPptyItems();
            this.checkConfirmAllFlag = true;
            this.oidtpritFactory.flag = true;
            this.fromLocReadOnly = true;
            this.toLocReadOnly = true;
            this.toLocationFlag = true;
            this.fromLocationFlag = true;
            this.manageLocDisable = true;
            this.commentReadOnly = true;
            this.offpiIndex = -1;
        }
    }
    /*
     * This function displays the ssn format
     */
    getMask = (index, col, data) => {
        if (data) {
            return {
                mask: [/\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }
    }

    whenChangeFromLocation(event) {
        if (event) {
            this.tostatusFalg = false;
            this.facilityLink = 'oidtprit/cgfkItmTxToStatusCodeRecordGroup?selectedFromStatus=' + this.selectedFromStatus;
            if (!this.selectedfromLocation) {
                this.selectedfromLocation = undefined;
                const selectFromClear = this.selectedfromLocation === undefined ? '' : undefined;
                this.selectedfromLocation = selectFromClear;
            }
            this.containerId = undefined;
            if (this.selectedFromStatus === 'STORED') {
                this.fromLocReadOnly = false;
                this.fromLocationFlag = false;
                this.fromFalg = false;
                this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                this.offBkId = this.vHeaderBlockModel.offenderBookId;
                this.caseLoadId = this.sessionManager.currentCaseLoad;
                this.locationLink = 'oidtprit/cgfkItmTxPropertyContainerRecordGroup?caseloadId=' +
                    this.caseLoadId + '&offenderBookId=' + this.offBkId;
            } else {
                this.selectedfromLocation = undefined;
                this.fromLocationFlag = true;
                this.fromFalg = true;
                this.fromLocReadOnly = true;
            }
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
        } else {
            this.selectedStatus = undefined;
            this.selectedfromLocation = undefined;
            this.selectedToLocation = undefined;
        }
    }
    whenChangeLocation(event) {
        this.propertyContainerId = event.propertyContainerId;
    }
    whenChangeToLocation(event) {
        if (event) {
            this.toContainerId = undefined;
            this.selectedStatus = event.code;
            if (!this.selectedToLocation) {
                this.selectedToLocation = undefined;
                const selectToClear = this.selectedToLocation === undefined ? '' : undefined;
                this.selectedToLocation = selectToClear;
            }
            if (event.code === 'STORED') {
                this.toLocReadOnly = false;
                this.toLocationFlag = false;
                this.toFalg = false;
                this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                this.offBkId = this.vHeaderBlockModel.offenderBookId;
                this.caseLoadId = this.sessionManager.currentCaseLoad;
                this.locationLink = 'oidtprit/cgfkItmTxPropertyContainerRecordGroup?caseloadId=' +
                    this.caseLoadId + '&offenderBookId=' + this.offBkId;
            } else {
                this.toLocReadOnly = true;
                this.toLocationFlag = true;
            }
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
        } else {
            this.toLocationFlag = true;
            this.toFalg = true;
            this.selectedToLocation = undefined;
            this.selectedStatus = undefined;
        }
    }
    changetheValueOfFromLocation(event) {
        if (event) {
            this.selectedfromLocation = undefined;
            this.selectedfromLocation = event.code;
        } else {
            this.selectedfromLocation = undefined;
            this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId = undefined;
        }

    }
    changetheValueOfToLocation(event) {
        if (event) {
            this.selectedToLocation = undefined;
            this.selectedToLocation = event.code;
        } else {
            this.selectedToLocation = undefined;
            this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId = undefined;
        }

    }
    clickOnConfirmAll(event) {
        const rowData = this.offpiData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                this.grid.setColumnData('confirmFlag', i, event.checked);
                this.check = true;
            }
        } else {
            this.check = false;
        }
        this.offpiData = rowData;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        this.lockFlagTemp = true;
        if (event.data.confirmFlag === true) {
            for (let i = 0; i < this.offpiData.length; i++) {
                if (this.offpiData[i].confirmFlag) {
                    this.check = true;
                    this.lockFlag = true;
                } else {
                    this.lockFlag = false;
                    this.lockFlagTemp = false;
                }

            }
            if (!this.lockFlagTemp) {
                this.lockFlag = false;
            }
        } else if (!event.data.confirmFlag) {
            this.lockFlag = false;
            for (let i = 0; i < this.offpiData.length; i++) {
                if (this.offpiData[i].confirmFlag) {
                    this.check = true;
                    this.lockFlag = false;
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    this.check = false;
                    this.lockFlag = false;
                }
            }
        }
        return rowdata;
    }

    exit() {
        if (this.selectedFromStatus) {
            this.oidtpritFactory.offPptyItmTxnModel.fromStatusCode = this.selectedFromStatus;
        } else {
            this.oidtpritFactory.offPptyItmTxnModel.fromStatusCode = undefined;
        }
        if (this.selectedStatus) {
            this.oidtpritFactory.offPptyItmTxnModel.toStatusCode = this.selectedStatus;
        } else {
            this.oidtpritFactory.offPptyItmTxnModel.toStatusCode = undefined;
        }
        if (this.selectedfromLocation) {
            this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId = this.selectedfromLocation;
        } else {
            this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId = undefined;
        }
        if (this.selectedToLocation) {
            this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId = this.selectedToLocation;
        } else {
            this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId = undefined;
        }
        this.oidtpritFactory.flag = true;
        this.oidtpritFactory.checkExitFlag = true;
        this.router.navigate(['/OIDMPCON']);
    }
    /**
     * event is fired when click on Location button
     */
    fromLocationClick = () => {
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            return false;
        }
        if (this.locationValuesList.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsiapp.listofvalues');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    itmtxExecuteQuery() {
        this.itmtxModel.fromStatusCode = this.selectedFromStatus;
        const itmtxResult = this.oidtpritFactory.
            itmTxExecuteQuery(this.itmtxModel);
        itmtxResult.subscribe(itmtxResultList => {
            if (itmtxResultList.length === 0) {
                this.itmtxData = [];
            } else {
                this.itmtxData = itmtxResultList;
                this.itmtxModel = itmtxResultList[0];
            }
        });
    }

    getDialogData(event) {
        if (event) {
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
            this.containerId = event.containerId;
            this.selectedLocation = event.selectedfromLocation;
            if (!this.fromFalg) {
                this.selectedfromLocation = this.selectedLocation;
            }
            if (!this.fromFalg) {
                this.selectedfromLocation = this.selectedLocation;
            }
            if (this.selectedfromLocation) {
                this.oidtpritFactory.offPptyItmTxnModel.nbtDspDescription = this.selectedfromLocation;
                this.oidtpritFactory.offPptyItmTxnModel.propertyItemTxnId = this.containerId;
            }
        }

    }
    getToLocDialogData(event) {
        if (event) {
            this.offpiData = [];
            this.offpiData.push(new OffenderPptyItems());
            this.toContainerId = undefined;
            this.toContainerId = event.containerId;
            this.selectedToLocation = event.selectedfromLocation;
            if (this.selectedToLocation) {
                this.oidtpritFactory.offPptyItmTxnModel.propertyDescription = this.selectedToLocation;
                this.oidtpritFactory.offPptyItmTxnModel.toPropertyContainerId = this.toContainerId;
            }
        }
    }
    offpiExecuteQuery() {
        this.offpiModel = new OffenderPptyItems();
        if (this.selectedFromStatus === 'STORED') {
            this.offpiModel.propertyContainerId = this.selectedfromLocation;
        }
        this.offpiModel.statusCode = this.selectedFromStatus;
        this.offBkId = this.vHeaderBlockModel.offenderBookId;
        this.offpiModel.offenderBookId = this.offBkId;
        this.offpiModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offpiResult = this.oidtpritFactory.
            offPiExecuteQuery(this.offpiModel);
        offpiResult.subscribe(offpiResultList => {
            if (offpiResultList.length === 0) {
                this.offpiData = [];
                this.offpiData.push(new OffenderPptyItems());
                this.offpiIndex = -1;
            } else {
                for (let i = 0; i < offpiResultList.length; i++) {
                    if (offpiResultList[i].confirmFlag === 'N' || offpiResultList[i].confirmFlag === 'Y') {
                        offpiResultList[i].confirmFlag = false;
                    }
                }
                this.offpiData = offpiResultList;
                this.offpiModel = offpiResultList[0];
                this.offpiIndex = 0;
                this.offconModel = new OffenderPptyContainers();
                this.offconModel.propertyContainerId = this.offpiModel.propertyContainerId;
                this.offconModel.agyLocId = this.offpiModel.agyLocId;
            }
        });
    }
    commentChangeEvent (event) {
        if (event) {
        this.commentText = event;
        }
    }
    /**
         *  This function will be executed when commit event is
        * fired
        */
    oidtpritSaveoffpiForm(event) {
        this.offpiUpdatetList = [];
        for (let j = 0; j < event.updated.length; j++) {
            if (event.updated[j].confirmFlag) {
                this.offpiUpdatetList.push(event.updated[j]);
            }

        }
        this.offpiCommitModel.insertList = [];
        this.offpiCommitModel.updateList = [];
        this.offpiCommitModel.deleteList = [];

        if (this.offpiUpdatetList.length > 0) {
            for (let i = 0; i < this.offpiUpdatetList.length; i++) {
                if (this.offpiUpdatetList[i].confirmFlag) {
                    this.offpiUpdatetList[i].confirmFlag = 'Y';
                } else {
                    this.offpiUpdatetList[i].confirmFlag = 'N';
                }
                this.offpiUpdatetList[i].statusCode = this.selectedStatus;
                this.offpiUpdatetList[i].commentText = this.commentText;
                this.offpiUpdatetList[i].propertyContainerId = this.selectedToLocation;
            }
        }
        if (this.offpiDeleteList.length > 0) {
            for (let i = 0; i < this.offpiDeleteList.length; i++) {
            }
            this.offpiCommitModel.deleteList = this.offpiDeleteList;
        }
        this.offpiCommitModel.updateList = this.offpiUpdatetList;
        const offpiSaveData = this.oidtpritFactory.offPiCommit(this.offpiCommitModel);
        offpiSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offpiExecuteQuery();
            } else {
                return;
            }
        });
    }
}
