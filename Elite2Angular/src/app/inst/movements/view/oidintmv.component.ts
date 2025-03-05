import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidintmvService } from '../service/oidintmv.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { VOffenderAllSchedulesCommitBean } from '@inst/schedules/beans/VOffenderAllSchedulesCommitBean';
import { Router } from '@angular/router';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { InjectOffenderService } from '@core/service/inject-offender.service';

@Component({
    selector: 'app-oidintmv',
    templateUrl: './oidintmv.component.html'
})

export class OidintmvComponent implements OnInit {
    isformRetrieve: boolean;
    offenderFullObj: VHeaderBlock = new VHeaderBlock();
    warnMsgLst: any[] = [];
    warningFlag: boolean;
    insertBlk: boolean;
    offBlkIndex = -1;
    routUrl: string;
    toIntLocLevel3Code: any;
    toIntLocLevel2Code: any;
    toIntLocLevel1Code: any;
    namesrchData: VNameSearch[] = [];
    namesrchModel: VNameSearch = new VNameSearch();
    oiintlocLink: string;
    oiintlocFlag: boolean;
    level3Label = this.translateService.translate('common.level3');
    level2Label = this.translateService.translate('common.level2');
    level1Label = this.translateService.translate('common.level1');
    offblkCommitModel: VOffenderAllSchedulesCommitBean = new VOffenderAllSchedulesCommitBean();
    agencyImlLevel3Code: any;
    agencyImlLevel2Code: any;
    agencyImlLevel1Code: any;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    msglist = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offblkData: VOffenderAllSchedules[] = [];
    offblkDataTemp: VOffenderAllSchedules[] = [];
    offblkModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    offblkInsertList: VOffenderAllSchedules[] = [];
    offblkUpdateList: VOffenderAllSchedules[] = [];
    offblkDeleteList: VOffenderAllSchedules[] = [];
    intmovectrlModel: VOffenderAllSchedules = new VOffenderAllSchedules();
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    offBlkColumnDef: any[];
    rgestablishmentRg: any[] = [];
    rgmovementtypeRg: any[] = [];
    rgfromhloclevel1Rg: any[] = [];
    rgfromhloclevel2Rg: any[] = [];
    rgfromhloclevel3Rg: any[] = [];
    rgfromiloclevel1Rg: any[] = [];
    rgfromiloclevel2Rg: any[] = [];
    rgfromiloclevel3Rg: any[] = [];
    rgtoiloclevel1Rg: any[] = [];
    rgtoiloclevel2Rg: any[] = [];
    rgtoiloclevel3Rg: any[] = [];
    rgschtypeRg: any[] = [];
    rgschreasonRg: any[] = [];
    currentDateTime: Date;
    confirmAll: boolean;
    type = 'error';
    message = ' Invalid.';
    caseLoadId: any;
    option = [{ id: 'SCHEDULED', text: 'Scheduled' }, { id: 'UNSCHEDULED', text: 'Unscheduled' }];
    fromIntLoc1Map: Map<string, string> = new Map();
    fromIntLoc2Map: Map<string, string> = new Map();
    fromIntLoc3Map: Map<string, string> = new Map();
    toIntLoc1Map: Map<string, string> = new Map();
    toIntLoc2Map: Map<string, string> = new Map();
    toIntLoc3Map: Map<string, string> = new Map();
    @ViewChild('grid') grid: any;
    housingTitles = { description: 'description' };
    lctionTitles = { description: 'description' };
    lvngUnitTitles = { description: 'description' };
    warngPList: any;
    retriveDisable: boolean;
    commonDisable: boolean;
    movmentTypeTitles: { description: string; };
    commonDisableOne: boolean;
    commonDisableThree: boolean;
    commonDisableTwo: boolean;
    level1CodeLov: any;
    level2CodeLov: any;
    level3CodeLov: any;
    commonDisableIlocOne: boolean;
    commonDisableIlocTwo: boolean;
    commonDisableIlocThree: boolean;
    frominternallocationLink: string;
    agencyImlLevel2CodeLink: string;
    agencyImlLevel3CodeLink: string;
    cancelAll: boolean;
    outcomechange: string;
    disableCancelFlag: boolean;
    disableOutcome: boolean;
    cancelAllReasonValue: string;
    disableApplyAll: boolean;
    cancelCheckBoxValue: boolean;
    reqCancelReason: boolean;
    constructor(private oidintmvFactory: OidintmvService, public translateService: TranslateService,
        private sessionManager: UserSessionManager, public dialogService: DialogService, private offenderSearchService: OffenderSearchService,
        private router: Router, private oiinamesFactory: OiinamesService, private injectOffenderService: InjectOffenderService) {
        this.offBlkColumnDef = [];
    }
    ngOnInit() {
        this.commonDisable = false;
        this.commonDisableOne = true;
        this.commonDisableTwo = true;
        this.commonDisableThree = true;
        this.commonDisableIlocOne = true;
        this.commonDisableIlocTwo = true;
        this.commonDisableIlocThree = true;
        this.disabled = true;
        this.retriveDisable = false;
        this.disableCancelFlag = true;
        this.disableOutcome = true;
        this.disableApplyAll = true;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.movmentTypeTitles = { description: this.translateService.translate('oidscexm.movementtype') };
        this.offBlkColumnDef = [
            {
                fieldName: this.translateService.translate('common.confirm'), field: 'confirmMove',
                datatype: 'checkbox', cellEditable: this.confirmEditable, width: 120
            },
            {
                fieldName: this.translateService.translate('oidintmv.id') + '*', field: 'offenderIdDisplay',
                editable: true, required: true, width: 150
            },
            {
                fieldName: '', field: 'checkBox1', displayas: 'image', datatype: 'hyperlink', link: '/oiinamesdialog', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'offenderLastName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'offenderFirstName',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidintmv.housinglocation'), field: 'livingUnitDesc',
                editable: false, width: 90
            },
            {
                fieldName: this.translateService.translate('oidintmv.scheduletime'), field: 'startTime',
                datatype: 'time', editable: false, width: 90
            },
            {
                fieldName: this.translateService.translate('common.scheduletype'), field: 'eventTypeDesc',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidintmv.schedulereason'), field: 'eventSubTypeDesc',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidintmv.internallocation'), field: 'agyLocDesc',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidintmv.tointernallocation') + '*', field: 'toIntLocUserDesc',
                editable: false, required: true, width: 150
            },
            {
                fieldName: '', field: 'details', datatype: 'hyperlink', link: '/OIINTLOC', data: 'row', updateField: 'row',
                modal: true, width: 300, displayas: 'href', styleClass: 'search'
            },
            { fieldName: '', field: 'toInternalLocationId', hide: true, width: 150 },
            {
                fieldName: this.translateService.translate('oidintmv.cancelflag'), field: 'cancelFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oidintmv.cancelreason'), field: 'eventOutcome', editable: false, width: 150,
                datatype: 'lov', domain: 'APT_CAN_REA', cellEditable: this.canActiveEdit
            },
        ];

        if (this.oidintmvFactory.intmovectrlModel && this.oidintmvFactory.intmovectrlModel.eventDate) {
            this.intmovectrlModel = this.oidintmvFactory.intmovectrlModel;
            this.currentDateTime = DateFormat.getDate();
            this.offblkData = this.oidintmvFactory.offblkData;
            if (this.oidintmvFactory.vNameSearch) {
                if (this.oidintmvFactory.vNameSearch.activeFlag === 'I' ||
                    this.intmovectrlModel.agyLocId !== this.oidintmvFactory.vNameSearch.agyLocId) {
                    this.type = 'warn';
                    this.offblkData[this.offblkData.length - 1]['offenderIdDisplay'] = this.oidintmvFactory.vNameSearch.offenderIdDisplay;
                    this.message = this.oidintmvFactory.vNameSearch.offenderIdDisplay + ' ' +
                        this.translateService.translate('oidintmv.inactiveornotinfacility') + ' ' +
                        this.intmovectrlModel.agyLocId;
                    this.show();
                } else {
                    this.offblkData[this.offblkData.length - 1]['offenderBookId'] = this.oidintmvFactory.vNameSearch.offenderBookId;
                    this.offblkData[this.offblkData.length - 1]['offenderIdDisplay'] = this.oidintmvFactory.vNameSearch.offenderIdDisplay;
                    this.offblkData[this.offblkData.length - 1]['offenderLastName'] = this.oidintmvFactory.vNameSearch.lastName;
                    this.offblkData[this.offblkData.length - 1]['offenderFirstName'] = this.oidintmvFactory.vNameSearch.firstName;
                    this.offblkData[this.offblkData.length - 1]['livingUnitDesc'] = this.oidintmvFactory.vNameSearch.livingUnitDescription;
                    this.offblkData[this.offblkData.length - 1]['agyLocId'] = this.intmovectrlModel.agyLocId;
                    this.offblkData[this.offblkData.length - 1]['details'] = '..';
                }
                this.oidintmvFactory.vNameSearch = new VNameSearch();
            }
            this.oidintmvFactory.intmovectrlModel = new VOffenderAllSchedules();
        } else {
            this.intmovectrlModel.eventDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
            this.intmovectrlModel.scheduleMovementTime = DateFormat.getDate();
            this.currentDateTime = DateFormat.getDate();
            this.intmovectrlModel.eventType = 'UNSCHEDULED';
        }

        this.oiintlocFlag = true;
        this.routUrl = this.router.url;
    }
    canActiveEdit = (data: any, index: number, field: string): boolean => {
        if (data.cancelFlag === true) {
            return true;
        } else {
            return false;
        }
    }


    onToTimeChange(event) {
        if (DateFormat.compareTime(this.intmovectrlModel.startTime, this.intmovectrlModel.endTime) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.fromtomecannotbegreaterthantotime');
            this.show();
            return;
        }
    }
    onFacilityChange(event) {
        if (event) {
            this.intmovectrlModel.agyLocId = event.code;
            this.level1CodeLov = 'oidintmv/rgFromHlocLevel1RecordGroup?agyLocId=' + event.code;
            const labelNamesObj = this.oidintmvFactory.rgFromHlocLevel1RecordGroup(event.code);
            labelNamesObj.subscribe(data => {
                if (data.length > 0) {
                    this.commonDisableOne = false;
                } else {
                    this.commonDisableOne = true;
                    this.commonDisableThree = true;
                    this.commonDisableTwo = true;
                }
            });
            this.frominternallocationLink = 'oidintmv/rgFromIlocLevel1RecordGroup?agyLocId=' + event.code;
            const labelNamesObjTwo = this.oidintmvFactory.rgFromIlocLevel1RecordGroup(event.code)
            labelNamesObjTwo.subscribe(data => {
                if (data.length > 0) {
                    this.commonDisableIlocOne = false;
                } else {
                    this.commonDisableIlocOne = true;
                    this.commonDisableIlocThree = true;
                    this.commonDisableIlocTwo = true;
                }
            });
        }
    }
    onhlev1Change(event) {
        if (event) {
            this.level2CodeLov = 'oidintmv/rgFromHlocLevel2RecordGroup?agyLocId=' + this.intmovectrlModel.agyLocId + '&fromLocLevelOne=' + event.code;
            const labelNamesObj = this.oidintmvFactory.rgFromHlocLevel2RecordGroup(this.intmovectrlModel.agyLocId, event.code);
            labelNamesObj.subscribe(data => {
                if (data.length > 0) {
                    this.commonDisableTwo = false;
                } else {
                    this.commonDisableThree = true;
                    this.commonDisableTwo = true;
                }
            });
        }
    }
    onhlev2Change(event) {
        if (event) {
            this.level3CodeLov = 'oidintmv/rgFromHlocLevel3RecordGroup?agyLocId=' + this.intmovectrlModel.agyLocId + '&fromLocLevelTwo=' + event.code;
            const labelNamesObj = this.oidintmvFactory.rgFromHlocLevel3RecordGroup(this.intmovectrlModel.agyLocId, event.code);
            labelNamesObj.subscribe(data => {
                if (data.length > 0) {
                    this.commonDisableThree = false;
                } else {
                    this.commonDisableThree = true;
                }
            });
        }
    }
    onhlev3Change(event) {
        const lev3 = this.intmovectrlModel.luLevel3Code === undefined ? '' : undefined;
        this.intmovectrlModel.luLevel3Code = lev3;
    }
    onFromLev1Change(event) {
        const imlwv1 = this.agencyImlLevel1Code === undefined ? '' : undefined;
        this.agencyImlLevel1Code = imlwv1;
    }
    onFromLev2Change(event) {
        const imlwv2 = this.agencyImlLevel2Code === undefined ? '' : undefined;
        this.agencyImlLevel2Code = imlwv2;
    }
    onFromLev3Change(event) {
        const imlwv3 = this.agencyImlLevel3Code === undefined ? '' : undefined;
        this.agencyImlLevel3Code = imlwv3;
    }
    onToLoc1Change(event) {
        const intLoc1 = this.toIntLocLevel1Code === undefined ? '' : undefined;
        this.toIntLocLevel1Code = intLoc1;
    }
    onToLoc2Change(event) {
        const intLoc2 = this.toIntLocLevel2Code === undefined ? '' : undefined;
        this.toIntLocLevel2Code = intLoc2;
    }
    onToLoc3Change(event) {
        const intLoc3 = this.toIntLocLevel3Code === undefined ? '' : undefined;
        this.toIntLocLevel3Code = intLoc3;
    }

    /*
    * trigger is fired when establishment changed
    */
    establishmentWhenValidateItemTrigger(event) {
        this.disabled = false;
        if (this.intmovectrlModel.agyLocId) {
            this.oiintlocLink = '/OIINTLOC';
            this.insertBlk = true;
        }
        this.intmovectrlModel.luLevel1Code = null;
        this.intmovectrlModel.luLevel2Code = null;
        this.intmovectrlModel.luLevel3Code = null;
        this.intmovectrlModel.agencyImlLevel1Code = null;
        this.intmovectrlModel.agencyImlLevel2Code = null;
        this.intmovectrlModel.agencyImlLevel3Code = null;
        this.intmovectrlModel.toIntLocLevel1Code = null;
        this.intmovectrlModel.toIntLocLevel2Code = null;
        this.intmovectrlModel.toIntLocLevel3Code = null;
        this.intmovectrlModel.toIntLocUserDesc = null;
        this.intmovectrlModel.toInternalLocationId = null;
        if (this.intmovectrlModel.agyLocId) {
            const labelNamesObj = this.oidintmvFactory.getLabels(this.intmovectrlModel.agyLocId);
            labelNamesObj.subscribe(data => {
                 if (data.level1Code) {
                    this.level1Label = data.level1Code;
                } else {
                    this.level1Label = this.translateService.translate('common.level1');
                }
                if (data.level2Code) {
                    this.level2Label = data.level2Code;
                } else {
                    this.level2Label = this.translateService.translate('common.level2');
                }
                if (data.level3Code) {
                    this.level3Label = data.level3Code;
                } else {
                    this.level3Label = this.translateService.translate('common.level3');
                }
                const rgfromiloclevel1ServiceObj = this.oidintmvFactory.rgFromIlocLevel1RecordGroup(this.intmovectrlModel.agyLocId);
                rgfromiloclevel1ServiceObj.subscribe(rgfromiloclevel1list => {
                    for (const dataval of rgfromiloclevel1list) {
                        this.fromIntLoc1Map.set(dataval.code, dataval.internalLocationId);
                    }
                });
            });
            if (!this.intmovectrlModel.agencyImlLevel1Code) {
                this.intmovectrlModel.agencyImlLevel1Code = '';
            }
            const rgtoiloclevel1ServiceObj = this.oidintmvFactory.rgToIlocLevel1RecordGroup(this.intmovectrlModel.agyLocId,
                this.intmovectrlModel.agencyImlLevel1Code, this.intmovectrlModel.luLevel1Code);
            rgtoiloclevel1ServiceObj.subscribe(rgtoiloclevel1list => {
                for (const dataval of rgtoiloclevel1list) {
                    this.toIntLoc1Map.set(dataval.code, dataval.internalLocationId);
                }
            });
        } else {
            this.level1Label = this.translateService.translate('common.level1');
            this.level2Label = this.translateService.translate('common.level2');
            this.level3Label = this.translateService.translate('common.level3');
            this.oiintlocLink = null;
        }
    }

    get checkBoxDisable() {
        if (this.offblkData.length > 0)
            return false;
        else
            return true;
    }

    /*
     * trigger is fired when movementType changed
     */
    movementTypeWhenValidateItemTrigger(event) {
        this.disabled = false;
        if (event === 'UNSCHEDULED') {
            this.oiintlocFlag = true;
            this.oiintlocLink = '/OIINTLOC';
        } else {
            this.oiintlocLink = null;
            this.oiintlocFlag = false;
            if (!this.intmovectrlModel.agencyImlLevel1Code) {
                this.intmovectrlModel.agencyImlLevel1Code = '';
            }
            const rgtoiloclevel1ServiceObj = this.oidintmvFactory.rgToIlocLevel1RecordGroup
                (this.intmovectrlModel.agyLocId,
                    this.intmovectrlModel.agencyImlLevel1Code, this.intmovectrlModel.luLevel1Code);
            rgtoiloclevel1ServiceObj.subscribe(rgtoiloclevel1list => {
                for (const dataval of rgtoiloclevel1list) {
                    this.toIntLoc1Map.set(dataval.code, dataval.internalLocationId);
                }
            });
        }
    }

    toIlocLevel1Change() {
        this.intmovectrlModel.toIntLocLevel1Code = this.toIntLoc1Map.get(this.toIntLocLevel1Code);
        const rgtoiloclevel2ServiceObj = this.oidintmvFactory.rgToIlocLevel2RecordGroup
            (this.intmovectrlModel.agyLocId, this.intmovectrlModel.toIntLocLevel1Code);
        rgtoiloclevel2ServiceObj.subscribe(rgtoiloclevel2list => {
            for (const dataval of rgtoiloclevel2list) {
                this.toIntLoc2Map.set(dataval.code, dataval.internalLocationId);
            }
        });
    }

    toIlocLevel2Change() {
        this.intmovectrlModel.toIntLocLevel2Code = this.toIntLoc2Map.get(this.toIntLocLevel2Code);
        const rgtoiloclevel3ServiceObj = this.oidintmvFactory.rgToIlocLevel3RecordGroup
            (this.intmovectrlModel.agyLocId, this.intmovectrlModel.toIntLocLevel2Code);
        rgtoiloclevel3ServiceObj.subscribe(rgtoiloclevel3list => {
            for (const dataval of rgtoiloclevel3list) {
                this.toIntLoc3Map.set(dataval.code, dataval.internalLocationId);
            }
        });
    }

    toIlocLevel3Change() {
        this.intmovectrlModel.toIntLocLevel3Code = this.toIntLoc3Map.get(this.toIntLocLevel3Code);
    }

    getDialogData(event) {
        if (event) {
            this.intmovectrlModel.toIntLocUserDesc = event.toIntLocUserDesc;
            this.intmovectrlModel.toInternalLocationId = event.toInternalLocationId;
            this.intmovectrlModel.toInternalLocationDesc = event.toInternalLocationDesc;
        }
    }
    /*
    * trigger is fired when FromIlocLevel1 changed
    */
    FromIlocLevel1Change(event) {
        if (event) {
            this.intmovectrlModel.agencyImlId = null;
            this.intmovectrlModel.agencyImlLevel1Code = this.fromIntLoc1Map.get(this.agencyImlLevel1Code);
            this.intmovectrlModel.agencyImlId = parseInt(this.intmovectrlModel.agencyImlLevel1Code);
            this.agencyImlLevel2CodeLink = "oidintmv/rgFromIlocLevel2RecordGroup?agyLocId=" + this.intmovectrlModel.agyLocId + "&fromILocLevelOneId=" + this.intmovectrlModel.agencyImlLevel1Code;
            const rgtoiloclevel1ServiceObj = this.oidintmvFactory.rgFromIlocLevel2RecordGroup(this.intmovectrlModel.agyLocId,
                this.intmovectrlModel.agencyImlLevel1Code);
            rgtoiloclevel1ServiceObj.subscribe(rgfromiloclevel2List => {
                for (const dataval of rgfromiloclevel2List) {
                    this.fromIntLoc2Map.set(dataval.code, dataval.internalLocationId);
                }
                if (rgfromiloclevel2List.length > 0) {
                    this.commonDisableIlocTwo = false;

                } else {
                    this.commonDisableIlocThree = true;
                    this.commonDisableIlocTwo = true;
                }

            });
        }
    }

    /*
     * trigger is fired when FromIlocLevel1 changed
     */
     FromIlocLevel2Change(event) {
        if (event) {
            this.intmovectrlModel.agencyImlId = null;
            this.intmovectrlModel.agencyImlLevel2Code = this.fromIntLoc2Map.get(this.agencyImlLevel2Code);
            this.intmovectrlModel.agencyImlId = parseInt(this.intmovectrlModel.agencyImlLevel2Code);

            this.agencyImlLevel3CodeLink = "oidintmv/rgFromIlocLevel3RecordGroup?agyLocId=" + this.intmovectrlModel.agyLocId + "&fromILocLevelTwoId=" + event.internalLocationId;
            const rgfromiloclevel3ServiceObj = this.oidintmvFactory.rgFromIlocLevel3RecordGroup
                (this.intmovectrlModel.agyLocId, this.intmovectrlModel.agencyImlLevel2Code);
            rgfromiloclevel3ServiceObj.subscribe(rgfromiloclevel3List => {
                if (rgfromiloclevel3List.length > 0) {
                    this.commonDisableIlocThree = false;
                } else {
                    this.commonDisableIlocTwo = true;
                    this.commonDisableIlocThree = true;
                }
                 for (const dataval of rgfromiloclevel3List) {
                     this.fromIntLoc3Map.set(dataval.code, dataval.internalLocationId);
                 }
            });
        }
    }

    /*
    * trigger is fired when FromIlocLevel1 changed
    */
    FromIlocLevel3Change(event) {
        this.intmovectrlModel.agencyImlId = null;
        this.intmovectrlModel.agencyImlLevel3Code = this.fromIntLoc3Map.get(this.agencyImlLevel3Code);
        this.intmovectrlModel.agencyImlId = parseInt(this.intmovectrlModel.agencyImlLevel3Code);
    }
    /*
     * trigger is fired when date changed
     */
    validateDate(fromDate?) {
        if (fromDate) {
            if (String(fromDate.lastValue).indexOf('_') >= 0 && fromDate.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return false;
            }
        }
        if (fromDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.intmovectrlModel.eventDate), DateFormat.getDate()) > 0) {
                this.intmovectrlModel.eventDate = undefined;
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.movementDateValidation');
                this.show();
                return false;
            }

        }
    }
    movementDateWhenValidateItemTrigger(event) {
        if (this.intmovectrlModel.eventDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.intmovectrlModel.eventDate), DateFormat.getDate()) > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.movementDateValidation');
                this.show();
                return;
            }
        }
        if (this.intmovectrlModel.scheduleMovementTime) {
            if (DateFormat.compareDate(this.intmovectrlModel.scheduleMovementTime, this.currentDateTime) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.movementTimeValidation');
                this.show();
                return;
            }
        }
    }

    allowNumbers(event) {
    }


    /**
    *  This function will be fired when retreve button is
    *   clicked
    */
    onButRetrieveclick() {
        if (!this.intmovectrlModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.pleaseselectthefacility');
            this.show();
            return;
        }
        if (!this.intmovectrlModel.eventDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.movementdatemandatorycheck');
            this.show();
            return;
        }
        if (!this.intmovectrlModel.scheduleMovementTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.movementtimemandatorycheck');
            this.show();
            return;
        }
        if (!this.intmovectrlModel.eventType) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.movementtypemandatorycheck');
            this.show();
            return;
        }
        if (this.intmovectrlModel.eventType === 'UNSCHEDULED') {
            if (!this.intmovectrlModel.luLevel1Code && !this.intmovectrlModel.agencyImlLevel1Code) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.fromhousingorfrominternallocvalidation');
                this.show();
                return;
            }
        }
        if (this.intmovectrlModel.endTime) {
            if (DateFormat.compareTime(this.intmovectrlModel.startTime, this.intmovectrlModel.endTime) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.fromtomecannotbegreaterthantotime');
                this.show();
                return;
            }
        }

        this.offblkExecuteQuery();

    }

    onRowClickoffblk(event) {
        if (event) {
            if (this.confirmAll && this.isformRetrieve) {
                this.isformRetrieve = false;
                for (let i = 0; i < this.offblkData.length; i++) {
                    this.grid.setColumnData('confirmMove', i, true);
                }
            }
        }
        if (event.cancelFlag) {
            this.grid.requiredOn('eventOutcome');
        } else {
            this.grid.requiredOff('eventOutcome')

        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    offblkExecuteQuery() {
        const offblkResult = this.oidintmvFactory.offBlkExecuteQuery(this.intmovectrlModel);
        offblkResult.subscribe(data => {
            this.insertBlk = true;
            this.retriveDisable = true;
            if (data.length === 0) {
                this.offblkData = [];
                this.commonDisable = false;
                this.retriveDisable = false;
                this.disableCancelFlag = true;
                this.disableOutcome = true;
                this.disableApplyAll = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidscexm.querycausednorecords');
                this.show();
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].luLevel1Code) {
                        data[i].agencyImlDesc = data[i].luLevel1Code + '-' + data[i].luLevel2Code + '-' +
                            data[i].luLevel3Code;
                    }
                    if (data[i].agencyImlLevel1Code) {
                        data[i].toIntLocUserDesc = data[i].agencyImlLevel1Code + '-' + data[i].agencyImlLevel2Code + '-' +
                            data[i].agencyImlLevel3Code;
                    } else {
                        if (!data[i].toIntLocUserDesc) {
                            data[i].toIntLocUserDesc = this.intmovectrlModel.toIntLocUserDesc;
                            data[i].toInternalLocationId = this.intmovectrlModel.toInternalLocationId;
                            data[i].toInternalLocationDesc = this.intmovectrlModel.toInternalLocationDesc;
                        }
                        if (this.agencyImlLevel1Code) {
                            if (this.agencyImlLevel3Code) {
                                data[i].agencyImlDesc = this.agencyImlLevel1Code + '-' + this.agencyImlLevel2Code +
                                    '-' + this.agencyImlLevel3Code;
                            } else if (this.agencyImlLevel2Code) {
                                data[i].agencyImlDesc = this.agencyImlLevel1Code + '-' + this.agencyImlLevel2Code;
                            } else if (this.agencyImlLevel1Code) {
                                data[i].agencyImlDesc = this.agencyImlLevel1Code;
                            }
                        }
                    }
                    data[i].details = '..';
                    data[i].checkBox1 = 'assets/icons/eoff_icons/person_search_black_24dp.png';
                    data[i].agyLocId = this.intmovectrlModel.agyLocId;
                    if (String(this.confirmAll) === 'true') {
                        data[i].confirmMove = 'true';
                    } else {
                        data[i].confirmMove = undefined;
                    }
                }
                data.forEach(ele => {
                    ele.cancelFlag = ele.cancelFlag === 'Y' ? true : false;
                });
                this.offblkData = data;
                this.isformRetrieve = true;
                this.offBlkIndex = 0;
                this.offblkModel = data[0];

                this.commonDisable = true;
                this.commonDisableIlocOne = true;
                this.commonDisableIlocThree = true;
                this.commonDisableIlocTwo = true;
                this.commonDisableOne = true;
                this.commonDisableTwo = true;
                this.commonDisableThree = true;
                this.disableCancelFlag = false;
                this.disableOutcome = true;
                this.disableApplyAll = true;
                this.outcomechange = undefined;
                let cancelAllFlagCount = this.offblkData.filter(e => e.cancelFlag).length;
                if (cancelAllFlagCount === this.offblkData.length) {
                    this.cancelAll = true;
                    this.outcomechange = data[0].eventOutcome;
                } else {
                    this.cancelAll = false;

                }
            }
        });
    }

    /**
    *  This function will be executed when commit event is
    * fired
    */
    oidintmvSaveoffblkForm(event) {
        if (!this.intmovectrlModel.eventDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.movdatemust');
            this.show();
            return;
        }
        this.offblkInsertList = event.added;
        this.offblkUpdateList = event.updated;
        this.offblkCommitModel.insertList = [];
        this.offblkCommitModel.updateList = [];
        if (this.offblkInsertList.length > 0 || this.offblkUpdateList.length > 0) {
            for (let i = 0; i < this.offblkInsertList.length; i++) {
                if (!this.offblkInsertList[i].confirmMove) {
                    this.offblkInsertList.splice(i, 1);
                    i = i - 1;
                }
            }
            for (let i = 0; i < this.offblkUpdateList.length; i++) {
                if (!this.offblkUpdateList[i].confirmMove) {
                    this.offblkUpdateList.splice(i, 1);
                    i = i - 1;
                }
            }
        }
        if (this.offblkInsertList.length === 0 && this.offblkUpdateList.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.plsselectatleastonoffdetailsforinternalmovements');
            this.show();
            return;
        }
        for (let i = 0; i < this.offblkInsertList.length; i++) {
            if (!this.offblkInsertList[i].toInternalLocationId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.tointernallocvalidation');
                this.show();
                return;
            }
            if (this.agencyImlLevel1Code === this.offblkInsertList[i].toInternalLocationDesc) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.fromandtointernalocationcannotbethesame');
                this.show();
                return;
            }
            this.offblkInsertList[i].eventDate = DateFormat.getDate(
                DateFormat.getDate(this.intmovectrlModel.eventDate).setHours(12, 0, 0, 0));
            this.offblkInsertList[i].scheduleMovementTime = this.intmovectrlModel.scheduleMovementTime;
            this.offblkInsertList[i].agencyImlId = this.intmovectrlModel.agencyImlId;
            this.offblkInsertList[i].confirmMove = this.offblkInsertList[i].confirmMove ? 'Y' : 'N';
            if (this.offblkInsertList[i].toInternalLocationDesc = 'RTU') {
                this.offblkInsertList[i].agencyImlId = null;
            }
        }
        for (let i = 0; i < this.offblkUpdateList.length; i++) {
            this.offblkUpdateList[i].eventDate = DateFormat.getDate(
                DateFormat.getDate(this.intmovectrlModel.eventDate).setHours(12, 0, 0, 0));
            this.offblkUpdateList[i].scheduleMovementTime = this.intmovectrlModel.scheduleMovementTime;
            this.offblkUpdateList[i].confirmMove = this.offblkUpdateList[i].confirmMove ? 'Y' : 'N';
            this.offblkUpdateList[i].agencyImlId = this.intmovectrlModel.agencyImlId;
            if (this.offblkUpdateList[i].cancelFlag) {
                if (!this.offblkUpdateList[i].eventOutcome) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidintmv.cancelreasonmustbeentered');
                    this.show();
                    return;
                }
            }
            this.offblkUpdateList[i].cancelFlag = (this.offblkUpdateList[i].cancelFlag) ? 'Y' : 'N';
            if (!this.offblkUpdateList[i].toInternalLocationId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.tointernallocvalidation');
                this.show();
                return;
            }
            if (this.agencyImlLevel1Code && this.agencyImlLevel1Code === this.offblkUpdateList[i].toInternalLocationDesc) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidintmv.fromandtointernalocationcannotbethesame');
                this.show();
                return;
            }

            if (this.offblkUpdateList[i].toInternalLocationDesc = 'RTU') {
                this.offblkUpdateList[i].agencyImlId = null;
            }

        }
        for (let i = 0; i < this.offblkInsertList.length; i++) {
            this.offblkInsertList[i].offenderBookIdOne = this.offblkInsertList[i].offenderBookId;
            this.offblkInsertList[i].offenderIdOne = this.offblkInsertList[i].offenderId;
            this.offblkInsertList[i].toInternalLocationIdOne = this.offblkInsertList[i].toInternalLocationId;
        }
        for (let i = 0; i < this.offblkUpdateList.length - 1; i++) {
            this.offblkUpdateList[i].offenderBookIdOne = this.offblkUpdateList[i + 1].offenderBookId;
            this.offblkUpdateList[i].offenderIdOne = this.offblkUpdateList[i + 1].offenderId;
            this.offblkUpdateList[i].toInternalLocationIdOne = this.offblkUpdateList[i + 1].toInternalLocationId;
        }
        this.offblkCommitModel.insertList = this.offblkInsertList;
        this.offblkCommitModel.updateList = this.offblkUpdateList;
        const offblkSaveData = this.oidintmvFactory.offBlkCommit(this.offblkCommitModel);
        offblkSaveData.subscribe(data => {
            if (data[0] && data[0].returnValue === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offblkExecuteQuery();
                if (this.offenderSearchService.selectedOffender) {
                    this.injectOffenderService.updateOffenderInContext(this.offenderSearchService.selectedOffender.offenderId);
                }

            } else if (data[0] && data[0].returnValue === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else if (data[0] && data[0].warningMsg) {
                this.warngPList = { 'warningMsg': data[0].warningMsg, 'warnMsgLst': this.warnMsgLst, 'warningPrompt': data[0].warningPrompt };
                this.dialogService.openLinkDialog('/OCUWARNG', this.warngPList).subscribe(result => {
                    if (result) {
                    } else {
                    }
                });
            }
        });
    }

    onOffBlkDataInsert = () => {
        this.disableCancelFlag = true;
        this.disableOutcome = true;
        this.disableApplyAll = true;
        if (!this.intmovectrlModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.facilityneedstobeselected');
            this.show();
            return;
        }
        if (!this.intmovectrlModel.eventDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidintmv.movdatemust');
            this.show();
            return;
        }
        return {
            checkBox1: 'assets/icons/eoff_icons/person_search_black_24dp.png', details: '..', toIntLocUserDesc: '', agyLocId: this.intmovectrlModel.agyLocId,
            toInternalLocationId: '', toInternalLocationDesc: '', lunchbtn: '...',
            offenderIdDisplay: '', offenderLastName: '', offenderFirstName: ''
        };
    }

    /*
    * this method is called when offenderIdis changed.
    */
    offenderIdChange = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'offenderIdDisplay' && event.newValue !== event.oldValue) {
            if (event.data) {
                if (event.data.offenderIdDisplay) {
                    this.namesrchModel.offenderIdDisplay = event.data.offenderIdDisplay;
                    const namesrchResult = this.oiinamesFactory.namesrchExecuteQuery(this.namesrchModel);
                    namesrchResult.subscribe(data => {
                        if (data.length === 0) {
                            this.namesrchData = [];
                            this.type = 'warn';
                            this.message = this.namesrchModel.offenderIdDisplay + ' ' +
                                this.translateService.translate('oidintmv.inactiveornotinfacility') + ' ' +
                                this.intmovectrlModel.agyLocId;
                            this.show();
                            rowdata.validated = true;
                            return rowdata;
                        } else {
                            if (data[0].activeFlag === 'N' || this.intmovectrlModel.agyLocId !== data[0].agyLocId) {
                                this.type = 'warn';
                                this.message = data[0].offenderIdDisplay + ' ' +
                                    this.translateService.translate('oidintmv.inactiveornotinfacility') + ' ' +
                                    this.intmovectrlModel.agyLocId;
                                this.show();
                                rowdata.validated = true;
                                return rowdata;
                            }
                            this.namesrchData = data;
                            this.offenderFullObj = new VHeaderBlock();
                            this.offenderFullObj.agyLocId = this.intmovectrlModel.agyLocId;
                            this.offenderFullObj.offenderIdDisplay = data[0].offenderIdDisplay;
                            this.offenderFullObj.caseLoadId = this.sessionManager.currentCaseLoad;
                            const getOffenderDetailsResult = this.oidintmvFactory.getOffenderFullDetails(this.offenderFullObj);
                            getOffenderDetailsResult.subscribe(offenderDetails => {
                                this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                                this.grid.setColumnData('offenderLastName', index, data[0].lastName);
                                this.grid.setColumnData('offenderFirstName', index, data[0].firstName);
                                this.grid.setColumnData('livingUnitDesc', index, data[0].livingUnitDescription);
                                this.offblkData[index]['agyLocId'] = this.intmovectrlModel.agyLocId;
                                this.offblkData[index]['offenderBookId'] = data[0].offenderBookId;
                                this.offblkData[index]['offenderId'] = data[0].offenderId;
                                if (offenderDetails) {
                                    this.grid.setColumnData('agencyImlDesc', index, offenderDetails.livingUnitDescription);
                                }
                                this.grid.gridOptions.api.redrawRows();
                            });


                        }
                    });
                    if (event.data.offenderIdDisplay === null || event.data.offenderIdDisplay === '') {
                        event.data.button = '..';
                    } else {
                        event.data.button = undefined;
                    }
                    rowdata.validated = true;
                    this.oiinamesFactory.oiiflag = true;
                }
                
                return rowdata;
            }
        }
        if (event.field === 'confirmMove' && event.newValue !== event.oldValue) {
            if (event.data) {
                if (event.data.offenderIdDisplay) {
                    const offenderExistsResult = this.oidintmvFactory.isOffenderExists(event.data.offenderIdDisplay);
                    offenderExistsResult.subscribe(data => {
                        if (data == 1) {
                            this.type = 'warn';
                            this.message = 'Only one scheduled movement for offender ' + ' ' + event.data.offenderIdDisplay + ' ' +
                                ' can be confirmed!';
                            this.show();
                        }
                    });
                    if (!this.warningFlag) {
                        for (let i = 0; i < this.offblkData.length; i++) {
                            for (let j = 0; j < this.offblkData.length; j++) {
                                if (i !== j && this.offblkData[j].confirmMove && this.offblkData[i].confirmMove &&
                                    this.offblkData[j].offenderIdDisplay === this.offblkData[i].offenderIdDisplay) {
                                    this.type = 'warn';
                                    this.message = 'Only one scheduled movement for offender' + ' ' +
                                        this.offblkData[j].offenderIdDisplay + ' ' +
                                        'can be confirmed!';
                                    this.show();
                                    rowdata.validated = true;
                                    this.grid.setColumnData('confirmMove', index, undefined);
                                }
                            }
                        }
                    }
                }
                rowdata.validated = true;
                return rowdata;
            }
        }
        if(event.field === "cancelFlag") {
            if(event.data.cancelFlag === false) {
                this.grid.setColumnData('eventOutcome',index, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onButClearclick() {
        this.intmovectrlModel = new VOffenderAllSchedules();
        this.toIntLocLevel1Code = null;
        this.offblkData = [];
        this.intmovectrlModel.eventDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
        this.intmovectrlModel.scheduleMovementTime = DateFormat.getDate();
        this.intmovectrlModel.eventType = 'UNSCHEDULED';
        this.confirmAll = undefined;
        this.retriveDisable = false;
        this.agencyImlLevel1Code = undefined;
        this.agencyImlLevel2Code = undefined;
        this.agencyImlLevel3Code = undefined;
        this.commonDisable = false;
        this.commonDisableOne = true;
        this.commonDisableTwo = true;
        this.commonDisableThree = true;
        this.commonDisableIlocOne = true;
        this.commonDisableIlocThree = true;
        this.commonDisableIlocTwo = true;
        this.cancelAll = undefined;
        this.outcomechange = undefined;
        this.disableCancelFlag = true;
        this.disableOutcome = true;
        this.disableApplyAll = true;
    }

    confirmAllEvent(event) {
        this.warningFlag = false;
        const rowData = this.offblkData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                this.grid.setColumnData('confirmMove', i, this.cancelCheckBoxValue);
            }
        }
        this.warnMsgLst = [];
        for (let i = 0; i < this.offblkData.length; i++) {
            for (let j = 0; j < this.offblkData.length; j++) {
                if (i !== j && this.offblkData[j].confirmMove && this.offblkData[i].confirmMove &&
                    this.offblkData[j].offenderIdDisplay === this.offblkData[i].offenderIdDisplay) {
                    if (this.warnMsgLst.length > 0) {
                        for (let k = 0; k < this.warnMsgLst.length; k++) {
                            if (this.warnMsgLst[k] !== (this.offblkData[i].offenderIdDisplay + '-' + this.offblkData[i].offenderLastName
                                + ',' + this.offblkData[i].offenderFirstName)) {
                                this.warnMsgLst.push(this.offblkData[i].offenderIdDisplay + '-' + this.offblkData[i].offenderLastName
                                    + ',' + this.offblkData[i].offenderFirstName);
                            }
                        }
                    } else {
                        this.warnMsgLst.push(this.offblkData[i].offenderIdDisplay + '-' + this.offblkData[i].offenderLastName
                            + ',' + this.offblkData[i].offenderFirstName);
                    }
                    this.warningFlag = true;
                }
            }
        }
        if (this.warningFlag) {
            this.warngPList = undefined;
            const warningMsg = 'The following offender/s have duplicate records:';
            const warningPrompt = 'Please manually clear duplicate records or restrict search criteria. ' +
                ' Please select Yes or No to close this form.';
            this.warngPList = { 'warningMsg': warningMsg, 'warnMsgLst': this.warnMsgLst, 'warningPrompt': warningPrompt };
            this.dialogService.openLinkDialog('/OCUWARNG', this.warngPList).subscribe(result => {
                this.warningFlag = false;
                for (let i = 0; i < rowData.length; i++) {
                    this.grid.setColumnData('confirmMove', i, undefined);
                }
                this.confirmAll = undefined;
                if (result) {
                } else {
                }
            });
        }
        this.offblkData = rowData;
    }

    onBlkClear = () => {
        if (this.confirmAll) {
            this.clearConfirmAll();
        }
        return true;
    }

    clearConfirmAll() {
        this.confirmAll = undefined;
    }
    /**
    * This function displays the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'warn';
                this.message = 'List of Values contains no entries.';
                this.show();
            }
        }
    }

    ngOnDestroy() {
        if (this.router.url === '/OIINAMES') {
            this.oiinamesFactory.routUrl = this.routUrl;
            this.oidintmvFactory.intmovectrlModel = this.intmovectrlModel;
            this.oidintmvFactory.offblkData = this.offblkData;
        }

        //  
    }
    confirmEditable = (data: any, index: number, field: string): boolean => {
        if (data.offenderIdDisplay) {
            return true;
        }
        return false;
    }
    get insertBlkOne() {
        if (this.retriveDisable) {
            return true;
        }
        return false;
    }

    cancelAllChkboxChange(event) {
        if (event.checked) {
            this.cancelCheckBoxValue = event.checked;
            this.reqCancelReason=true
            this.disableOutcome = false;
            this.disableApplyAll = false;

        } else {
            this.cancelCheckBoxValue = event.checked;
            this.reqCancelReason=false;
            this.disableOutcome = true;
            this.outcomechange = undefined;
            this.disableApplyAll = true;
        }
    }

    cancelAllLovChange(event) {
        if (event.description) {
            this.cancelAllReasonValue = event.code;
            this.disableApplyAll = false;
        }
    }

    onGridClear = () => {
        this.offblkExecuteQuery();
        return true;
    }

    onApplyToAllClick() {
        if(this.cancelCheckBoxValue) {
            this.offblkData.forEach((e, i) => {
                this.grid.setColumnData('cancelFlag', i, this.cancelCheckBoxValue);
                this.grid.setColumnData('confirmMove', i, this.cancelCheckBoxValue);
            });
        } else {
            this.offblkData.forEach((e, i) => {
                this.grid.setColumnData('cancelFlag', i, this.cancelCheckBoxValue);
                this.grid.setColumnData('confirmMove', i, this.cancelCheckBoxValue);
                this.grid.setColumnData('eventOutcome', i, undefined);
            });
        }
        if (!this.cancelAllReasonValue) {
            this.type = 'warn';
            this.message = this.translateService.translate('Cancel Reason must be entered');
            this.show();
            return;
        }
        this.offblkData.forEach((e, i) => {
            if (e.cancelFlag) {
                this.grid.setColumnData('eventOutcome', i, this.cancelAllReasonValue);
            } 
        });
    }
}
