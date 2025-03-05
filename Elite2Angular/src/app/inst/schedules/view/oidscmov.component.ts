import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidscmovService } from '@inst/schedules/service/oidscmov.service';
import { CourtEvents } from '@instschedulebeans/CourtEvents';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { CourtEventsCommitBean } from '@instschedulebeans/CourtEventsCommitBean';
import { OiinamesService } from '../../movement-external/service/oiinames.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidcrtevService } from '@inst/legal/service/oidcrtev.service';
import { RecursiveAstVisitor } from '@angular/compiler';
import { element } from 'protractor';
import { AppConstants } from '@core/classes/appConstants';
// import required bean declarations

@Component({
    selector: 'app-oidscmov',
    templateUrl: './oidscmov.component.html'
})

export class OidscmovComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crtEveData: any[] = [];
    crtEveDataTemp: any[] = [];
    ctrEveModel: CourtEvents = new CourtEvents();
    ctrEveModelTemp: CourtEvents = new CourtEvents();
    vCtrEveModelTemp: CourtEvents = new CourtEvents();
    vCtrEveModelModelTemp: CourtEvents = new CourtEvents();
    courteventTemp: CourtEvents = new CourtEvents();
    crtEveIndex = 0;
    crtEvegridIndex = -1;
    crtEveInsertList: CourtEvents[] = [];
    crtEveUpdateList: CourtEvents[] = [];
    crtEveDeleteList: CourtEvents[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    crtEveColumnDef: any[];
    ctrlReadOnly = false;
    crtEveReadOnly = false;
    rgCtrlInstRg: any[] = [];
    rgCtrlInstRgDup: any[] = [];
    rgCtrlReasonRg: any[] = [];
    rgCtrlReasonRgDup: any[] = [];
    rgCtrlCourtRg: any[] = [];
    rgCourtReaRg: any[] = [];
    rgCtrlCourtRgDup: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    errorCode: any;
    dbmsErrorCode: any;
    dbmsErrorText: any;
    messageCode: any;
    pServerErr: any;
    tableIndex: any;
    crtEveCommitModel: CourtEventsCommitBean = new CourtEventsCommitBean();
    systemDate: Date;
    oidscmovFalg = false;
    exitflag: boolean;
    eventTime: any;
    sysTime: any;
    addFlag: boolean;
    caseLoadId: any;
    routeUrl: string;
    systemDataTemp: Date;
    public gridOptions: GridOptions;
    @ViewChild('grid', { static: true }) grid: any;
    offSchSelectedRow: any;
    inCountDup = 0;
    compareDuplicate = false;
    conflictFlag = false;
    index = 0;
    blUpdateFlag = false;
    saveConfirmFlag = false;
    blInsertFlag = false;
    facilityTitle = { code: 'Location ID', description: 'Description' };
    reasonTitle = { code: 'Reason Code', description: 'Description' };
    courtTitle = { code: 'Court Code', description: 'Description' };
    rowIndex = -1;
    onClearFlag = false;
    repeatClick = 0;
    retrieveBtnDisable: boolean;
    savedRecordConflictVerification: boolean;
    conflictIndex = 0;
    offenderBookId: number;
    conflictRowIndex: number;
    checkConfictFlag: boolean;
    flag: boolean = false;
    disabledFlag: boolean;
    chkNaConflictFlag: boolean = false;
    insertList: any;
    vOffPrgOblDataTemp: CourtEvents[] = [];
    count: number = 0;
    appearanceTypeData: any[];
    enableSelection = true;
    offenderDetalisList: CourtEvents[] = [];
    caseLoad: string;
    courtMap: Map<string, string> = new Map<string, string>();
    locationMap: Map<string, string> = new Map<string, string>();
    defaultCanReason:string;
    disableCancelFlag:boolean;
    disableOutcome: boolean;
    cancelReason:string;
    applyToAllDisable: boolean;
    cancelAll:boolean;
    outcomechange:string;
    cancelCheckbox: boolean;
    reqCancelReason: boolean;
    constructor(private oidscmovFactory: OidscmovService, public translateService: TranslateService,
        private activatedRoute: ActivatedRoute, private sessionManager: UserSessionManager,
        private oiinamesFactory: OiinamesService, private router: Router, public dialogService: DialogService, private OidcrtevFactory: OidcrtevService) {
        this.crtEveColumnDef = [];
        this.exitflag = false;

    }
    ngOnInit() {
        this.caseLoad = this.sessionManager.currentCaseLoad
        this.disabledFlag = false;
        this.checkConfictFlag = false;
        this.retrieveBtnDisable = false;
        this.routeUrl = this.router.url;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.oiinamesFactory.routUrl = this.routeUrl;
        this.disabled = false;
        this.apperancelocationRecordGroup();
        this.rgCtrlCourtRecordGroup();
        this.getDefaultCancellationReason();
        this.disableCancelFlag=true;
        this.disableOutcome=true;
        this.applyToAllDisable=true;
        console.log(this.locationMap);
        console.log(this.courtMap);
        this.crtEveColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code') + '*', field: 'nbtOffenderIdDisplay',
                editable: false, width: 150,
                maxlength: 12, datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: ' ', field: 'idbutton', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onConflictLaunchEdit
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'nbtLastName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'nbtFirstName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'nbtInst', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oidscmov.offreason'), field: 'courtEventType', editable: true,
                codeTitle: this.translateService.translate('oidscmov.reason'), width: 150, datatype: 'lov',
                titles: { code: 'Reasons', description: 'Description' },
                link: 'oidscmov/rgCtrlReasonRecordGroup', optionWidth: 350, cellEditable: this.offenderConflictFlag, source :'OUMEMOVE'
            },
            {
                fieldName: this.translateService.translate('oidscmov.offcourt'), field: 'agyLocId', editable: true, width: 250,
                codeTitle: this.translateService.translate('oidscmov.court'), datatype: 'lov',
                titles: { code: 'Court', description: 'Description' },
                link: 'oidscmov/rgCtrlCourtRecordGroup', optionWidth: 350, cellEditable: this.offenderConflictFlag, source :'OUMAGLOC'
            },

            {
                fieldName: this.translateService.translate('oidscmov.offtime'), field: 'startTime', editable: true,
                width: 100, datatype: 'time', cellEditable: this.offenderConflictFlag
            },
            {
                fieldName: this.translateService.translate('oidscmov.apperancetype'), required: true, editable: true, domain: 'CRT_APP_TYPE',
                field: 'appearanceType', datatype: 'lov', width: 130, cellEditable: this.offenderConflictFlag,
            },
            {
                fieldName: this.translateService.translate('oidscmov.apperancelocation'), required: false, editable: true, source: 'OIMULOCA',
                link: 'oidcrtev/apperancelocationRecordGroup?caseLoadId=' , parentField: 'nbtInst',
                field: 'appearanceLocation', datatype: 'lov', width: 130, cellEditable: this.commCellEditable,
            },
            {
                fieldName: this.translateService.translate('oidscmov.judgename'), field: 'judgeName', editable: true, width: 150,
                cellEditable: this.offenderConflictFlag, datatype: 'text', maxlength: 60
            },
            {
                fieldName: this.translateService.translate('oidscmov.comment'), field: 'commentText',
                editable: true, width: 150, maxlength: 240, cellEditable: this.offenderConflictFlag, datatype: 'text', uppercase: 'false'
            },
            {
                fieldName: '', field: 'chkNaConflictFlag', hide: true
            },
            {
                fieldName: this.translateService.translate('oidscmov.cancel'),
                field: 'cancelFlag', datatype: 'checkbox', width: 130, cellEditable: this.callEditableCancelField,
            },
            {
                fieldName: this.translateService.translate('oidscmov.outcomeReason'),
                field: 'outcomeReasonCode', datatype: 'lov', width: 130, domain: 'CRT_CAN_RSN', cellEditable: this.cellEditableReason,
            },
            {
                fieldName: '', field: 'eventStatus', hide: true,datatype:'text'
              }

        ];

        // TODO all initializations here
        const rgCtrlInstServiceObj = this.oidscmovFactory.rgCtrlInstRecordGroup(this.caseLoadId);
        rgCtrlInstServiceObj.subscribe(rgCtrlInstList => {
            if (rgCtrlInstList.length === 0) {
                this.rgCtrlInstRg = [];
                this.rgCtrlInstRgDup = [];

            } else {
                for (let i = 0; i < rgCtrlInstList.length; i++) {
                    this.rgCtrlInstRg.push({
                        'text': rgCtrlInstList[i].code + ' - ' +
                            rgCtrlInstList[i].description, 'id': rgCtrlInstList[i].code
                    });
                    this.rgCtrlInstRgDup.push({
                        'text':
                            rgCtrlInstList[i].description, 'id': rgCtrlInstList[i].code
                    });
                }
            }
            if (rgCtrlInstList && rgCtrlInstList.length === 1) {
                this.ctrEveModel.agyLocId = rgCtrlInstList[0].code;
            }

        });
        const rgCtrlReasonServiceObj = this.oidscmovFactory.rgCtrlReasonRecordGroup();
        rgCtrlReasonServiceObj.subscribe(rgCtrlReasonList => {
            if (rgCtrlReasonList.length === 0) {
                this.rgCtrlReasonRg = [];
                this.rgCtrlReasonRgDup = [];
            } else {
                for (let i = 0; i < rgCtrlReasonList.length; i++) {
                    this.rgCtrlReasonRg.push({
                        'text': rgCtrlReasonList[i].code + ' - ' +
                            rgCtrlReasonList[i].description, 'id': rgCtrlReasonList[i].code
                    });
                    this.rgCtrlReasonRgDup.push({
                        'text':
                            rgCtrlReasonList[i].description, 'id': rgCtrlReasonList[i].code
                    });
                }
            }
        });
        const rgCtrlCourtServiceObj = this.oidscmovFactory.rgCtrlCourtRecordGroup();
        rgCtrlCourtServiceObj.subscribe(rgCtrlCourtList => {
            if (rgCtrlCourtList.length === 0) {
                this.rgCtrlCourtRg = [];
                this.rgCtrlCourtRgDup = [];
            } else {
                for (let i = 0; i < rgCtrlCourtList.length; i++) {
                    this.rgCtrlCourtRg.push({
                        'text': rgCtrlCourtList[i].code + ' - ' +
                            rgCtrlCourtList[i].description, 'id': rgCtrlCourtList[i].code
                    });
                    this.rgCtrlCourtRgDup.push({
                        'text':
                            rgCtrlCourtList[i].description, 'id': rgCtrlCourtList[i].code
                    });
                }
            }
        });
        const rgCourtReaServiceObj = this.oidscmovFactory.rgCourtReaRecordGroup();
        rgCourtReaServiceObj.subscribe(rgCourtReaList => {
            if (rgCourtReaList.length === 0) {
                this.rgCourtReaRg = [];
            } else {
                for (let i = 0; i < rgCourtReaList.length; i++) {
                    this.rgCourtReaRg.push({
                        'text': rgCourtReaList[i].code + ' - ' +
                            rgCourtReaList[i].description, 'id': rgCourtReaList[i].code
                    });
                }
            }
        });
        this.gridOptions = <GridOptions>{
            editType: '',
            enableSorting: true,
            enableFilter: true,
            pagination: true,
            floatingFilter: false,
            paginationPageSize: 5,
            animateRows: true,
        };
        this.ctrEveModel = new CourtEvents();
        this.ctrEveModel.eventDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
        this.oidscmovFactory.crtEveDeleteList = undefined;
        this.oidscmovFactory.crtEveUpdateList = undefined;


        this.OidcrtevFactory.getAppearanceTypeData(this.sessionManager.getId(),'OIDSCMOV').subscribe(data => {
            if (data) {
                this.appearanceTypeData = data;
            }
        })
    }
    allowNumbers(event) {
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    checkConflictFlag = (data: any, index: number, field: string): boolean => {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                    return true;
                }
            });

        } else {
            return true;
        }
    }
    offenderConflictFlag = (data: any, index: number, field: string): boolean => {
        this.conflictIndex = 0;
        if (this.crtEveData.length > 0) {
            this.conflictIndex = this.crtEveData.indexOf(data);
        }
        if (field === 'nbtOffenderIdDisplay' && this.conflictFlag && index === this.conflictRowIndex) {
            this.checkConfictFlag = false;
            return true;
        }
        if (field === 'nbtOffenderIdDisplay' && this.conflictFlag && index !== this.conflictRowIndex) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                    return true;
                }
            });
            return false;
        }
        if (field !== 'nbtOffenderIdDisplay' && this.conflictFlag && this.checkConfictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                    return true;
                }
            });

        } else {
            return true;
        }

    }

    commCellEditable = (data: any, index: number, field: string): boolean => {
        if (field == 'appearanceLocation') {
            if (data.eventDate && DateFormat.compareDate(DateFormat.getDate(data.eventDate), DateFormat.getDate()) === -1) {
                return false;
            } else if (this.appearanceTypeData.length) {
                let filterData = this.appearanceTypeData.filter(obj => obj.code == data.appearanceType);
                if (filterData.length && filterData[0].parentCode == 'EXT') {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }
    nonEditableConflictFlag = (data: any, index: number, field: string): boolean => {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                    return false;
                }
            });

        } else {
            return false;
        }
    }
    onConflictLaunchEdit = (event) => {
        if (this.crtEveData.length > 0) {
            this.conflictIndex = this.crtEveData.indexOf(event);
        }
        if (this.conflictFlag && this.offSchSelectedRow && this.offSchSelectedRow.rowIndex !== this.conflictIndex) {
            return false;
        } else {
            this.dialogService.openLinkDialog('/oiinamesdialog', event, 80).subscribe(result => {
                const index = this.crtEveData.indexOf(event);
                this.grid.setColumnData('nbtOffenderIdDisplay', index, result.nbtOffenderIdDisplay);
                this.grid.setColumnData('nbtLastName', index, result.nbtLastName);
                this.grid.setColumnData('nbtFirstName', index, result.nbtFirstName);
                this.grid.setColumnData('nbtInst', index, result.nbtInst);
                this.grid.setColumnData('offenderBookId', index, result.offenderBookId);
            });
            return true;
        }

    }
    /*
    *  This event is used to set the facility value in Schedule Court Movements Block.
    */
    onFacilityChange() {
        this.ctrEveModel.agyLocId = this.ctrEveModel.agyLocId === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the Reason value in Schedule Court Movements Block.
     */
    onReasonChange() {
        this.ctrEveModel.movementReasonCode = this.ctrEveModel.movementReasonCode === undefined ? '' : undefined;
    }
    /*
     *  This event is used to set the Court value in Schedule Court Movements Block.
     */
    onCourtChange() {
        this.ctrEveModel.courtAgyLocId = this.ctrEveModel.courtAgyLocId === undefined ? '' : undefined;
    }
    onRowClickcrteve(event) {
        if (event) {
            this.rowIndex = this.crtEveData.indexOf(event);
            if (this.conflictFlag && this.offSchSelectedRow && this.offSchSelectedRow.rowIndex !== this.rowIndex) {
                this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                    if (!result) {
                        this.conflictFlag = true;
                        this.disabled = true;
                    } else {
                        this.conflictFlag = false;
                        this.disabled = false;
                    }
                });
            } else {
                this.offSchSelectedRow = event;
                this.offSchSelectedRow.rowIndex = this.rowIndex;
                this.offSchSelectedRow.eventDate = this.ctrEveModel.eventDate;
                this.crtEveIndex = this.crtEveData.indexOf(event);
                return true;
            }
        }
        return false;
    }

    cancel() {
        this.disableCancelFlag=true;
        this.disableOutcome=true;
        this.applyToAllDisable=true;
        this.cancelAll=undefined;
        this.outcomechange=undefined;
        this.ctrEveModel = new CourtEvents();
        this.vCtrEveModelTemp = new CourtEvents();
        this.vCtrEveModelModelTemp = new CourtEvents();
        this.ctrEveModelTemp = new CourtEvents();
        this.crtEveData = [];
        this.ctrEveModel = new CourtEvents();
        this.oiinamesFactory.ctrEveModelTemp = undefined;
        this.oiinamesFactory.crtEveDataTemp = undefined;
        this.conflictFlag = false;
        this.compareDuplicate = false;
        this.disabled = false;
        this.saveConfirmFlag = false;
        this.flag = false;
        this.retrieveBtnDisable = false;
        this.disabledFlag = false;
       
    }
    clearOffSchTrigger = () => {
        this.oidscmovRetrieveQuery(true);
        this.onClearFlag = true;
        this.conflictFlag = false;
        this.cancelAll = undefined;
        this.outcomechange = undefined;
        this.disableCancelFlag = (this.crtEveData.length > 0) ? false : true;
        this.disableOutcome = true;
        this.applyToAllDisable = true;
        this.cancelReason=undefined;
        this.oidscmovRetrieveQuery(true);
        return true;
    }
    onGridReady = () => {
        this.disableCancelFlag=true;
        this.disableOutcome=true;
        this.applyToAllDisable=true;
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                }
            });

        }

        if (!this.conflictFlag) {
            if (!this.ctrEveModel.eventDate) {
                this.show(this.translateService.translate('oidscmov.eventdateentered'), 'warn');
                return;
            }
            this.oiinamesFactory.ctrEveModelTemp = this.ctrEveModel;

            if (this.crtEveData.length > 0) {
                for (let i = 0; i < this.crtEveData.length; i++) {
                    if (!this.crtEveData[i].nbtOffenderIdDisplay) {
                        this.show(this.translateService.translate('system-profile.off-id-code') + ' ' + this.translateService.translate('oidscmov.identered'), 'warn');
                        return;
                    }

                    if (!this.crtEveData[i].courtEventType) {
                        this.show(this.translateService.translate('oidscmov.reasonentered'), 'warn');
                        return;
                    }

                    if (!this.crtEveData[i].agyLocId) {
                        this.show(this.translateService.translate('oidscmov.courtentered'), 'warn');
                        return;
                    }

                    if (!this.crtEveData[i].startTime) {
                        this.show(this.translateService.translate('oidscmov.timeentered'), 'warn');
                        return;
                    }
                    if (this.crtEveData[i].appearanceType === 'OME' || this.crtEveData[i].appearanceType === 'VID') {
                        if (!this.crtEveData[i].appearanceLocation) {
                            this.show(this.translateService.translate('oidscmov.appranceLocationMustBeEntered'), 'warn');
                            return;
                        }
                    }
                    this.oiinamesFactory.crtEveDataTemp = this.crtEveData;
                }
            } else {
                this.oiinamesFactory.crtEveDataTemp = this.crtEveData;
            }
            return {
                nbtOffenderIdDisplay: '', idbutton: '..'
                /* , nbtLastName : '', nbtFirstName : '',
                nbtInst : '', courtEventType : '', agyLocId : '',
                startTime :this.ctrEveModel.startTime, judgeName : '', commentText : undefined */
            };
        }
    }

    isDateChanged(event) {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                }
            });
        } else {
            if (event) {
                if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                    this.disabled = true;

                    return;
                }
            }
            this.disabled = false;
        }
    }
    isTimeChanged() {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                }
            });

        } else {
            if (this.ctrEveModel.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                    this.disabled = true;
                    return;
                }
            }
            if (this.ctrEveModel.eventTime) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.ctrEveModel.eventTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                        this.disabled = true;
                        return false;
                    }
                }
            }
            this.disabled = false;
        }
    }
    checkToSaveInsert() {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                }
            });

        } else {
            if (this.ctrEveModel.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                    this.disabled = true;
                    return;
                }
            }
            if (this.ctrEveModel.eventTime) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.ctrEveModel.eventTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                        this.disabled = true;
                        return false;
                    }
                }
            }

            this.disabled = false;
        }
    }
    onLovMouseDown() {
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (!result) {
                    this.conflictFlag = true;
                    this.disabled = true;
                    return false;
                } else {
                    this.conflictFlag = false;
                    this.disabled = false;
                }
            });

        } else {
            if (this.ctrEveModel.eventDate) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                    this.disabled = true;
                    return;
                }
            }
            if (this.ctrEveModel.eventTime) {
                if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.ctrEveModel.eventTime, DateFormat.getDate()) < 0) {
                        this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                        this.disabled = true;
                        return false;
                    }
                }
            }
            this.disabled = false;
        }
    }
    oidscmovRetrieveQuery(event, eventDate?) {
        if (eventDate) {
            if (eventDate.lastValue === '0_/__/____') {
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show(this.translateService.translate(this.message), 'warn');
                return;
            }
            if (String(eventDate.lastValue).indexOf('_') >= 0 && eventDate.value === null) {
                this.message = this.translateService.translate('ocdclogs.dateformate');
                this.show(this.translateService.translate(this.message), 'warn');
                return;
            }
        }

        if (!this.ctrEveModel.eventDate) {
            this.show(this.translateService.translate('oidscmov.eventdateentered'), 'warn');
            return;
        }
        if (this.ctrEveModel.eventDate && this.ctrEveModel.eventTime) {
            if (DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) === 0) {
                if (DateFormat.compareTime(this.ctrEveModel.eventTime, DateFormat.getDate()) < 0) {
                    this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                    return false;
                }
                this.ctrEveModel.eventTime = TimeFormat.parse(TimeFormat.format(this.ctrEveModel.eventTime),
                    this.ctrEveModel.eventDate);
                this.ctrEveModel.startTime = this.ctrEveModel.eventTime;
            }
        } else {
            if (!event && DateFormat.compareDate(DateFormat.getDate(this.ctrEveModel.eventDate), DateFormat.getDate()) < 0) {
                this.show(this.translateService.translate('oidscmov.eventdateandtime'), 'warn');
                return false;
            }
        }
        if (this.ctrEveModel.eventDate && this.ctrEveModel.eventTime) {
            this.ctrEveModel.eventTime = TimeFormat.parse(TimeFormat.format(this.ctrEveModel.eventTime),
                this.ctrEveModel.eventDate);
            this.ctrEveModel.startTime = this.ctrEveModel.eventTime;
        }
        this.ctrEveModel.courtEventType = this.sessionManager.currentCaseLoadType;
        this.ctrEveModel.resultCode = this.sessionManager.currentCaseLoad;
        this.ctrEveModel.eventDate = DateFormat.parse(DateFormat.format(this.ctrEveModel.eventDate));
        const crteveResult = this.oidscmovFactory.crtEveExecuteQuery(this.ctrEveModel);
        crteveResult.subscribe(crteveResultList => {
            if (crteveResultList.length === 0) {
                this.addFlag = true;
                this.disabledFlag = false;
                this.retrieveBtnDisable = false;
                this.crtEveData = [];
                this.disableCancelFlag=true;
                this.disableOutcome=true;
                this.applyToAllDisable=true;
                this.cancelReason=undefined;
                if (!event) {
                    this.show(this.translateService.translate('common.querycaused'), 'warn');
                }
                return false;
            } else {
                this.addFlag = true;
                this.disabledFlag = true;
                this.retrieveBtnDisable = true;
                this.oiinamesFactory.ctrEveModelTemp = this.ctrEveModel;
                for (let i = 0; i < crteveResultList.length; i++) {
                    crteveResultList[i].idbutton = '...';
                    crteveResultList[i].cancelFlag = crteveResultList[i].eventStatus === 'CANC' ? true : false;
                }
                this.crtEveData = crteveResultList;
                this.disableCancelFlag=false;
                this.disableOutcome=true;
                this.applyToAllDisable=true;
                this.cancelAll=undefined;
                this.outcomechange=undefined;
                this.tableIndex = 0;
            }
        });
    }

    updateCrtEveValidator = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.conflictFlag = false;
        this.checkConfictFlag = false;
        if (event.data.appearanceType === 'OME' || event.data.appearanceType === 'VID') {
            this.grid.requiredOn('appearanceLocation');
        } else {
            this.grid.requiredOff('appearanceLocation');
        }

        if (event.oldValue !== event.newValue && event.newValue !== null) {
            if (event.field === 'nbtOffenderIdDisplay' && Number(event.oldValue) !== Number(event.newValue)) {
                this.crtEveIndex = rowIndex;

                if (event.newValue) {
                    const offenderIdDislay = Number(event.newValue);
                    /* for (let i = Number(String(event.newValue).length); i < 10; i++) {
                        event.newValue = '0' + event.newValue;
                    } */
                    if (offenderIdDislay === 0) {
                        event.newValue = undefined;
                        this.crtEveData[this.crtEveIndex]['nbtOffenderIdDisplay'] = undefined;
                        rowdata.data = {
                            eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
                            startTime: event.data.startTime
                        };
                        rowdata.validated = true;
                        return rowdata;
                    }
                    const crteveResult = this.oidscmovFactory.getOffenderDetails(event.newValue,
                        this.ctrEveModel.agyLocId, this.caseLoadId);
                    crteveResult.subscribe(crteveResultList => {
                        if (crteveResultList.length === 0) {
                            this.index = this.crtEveIndex;
                            this.grid.setColumnData('nbtOffenderIdDisplay', this.index, null);
                            this.grid.setColumnData('nbtLastName', this.index, null);
                            this.grid.setColumnData('nbtFirstName', this.index, null);
                            this.grid.setColumnData('nbtInst', this.index, null);
                            // Below line is commented for to resolve jira issue - S4-14173
                            //  this.grid.setColumnData('offenderBookId', this.index, null);
                            if (this.ctrEveModel.movementReasonCode) {
                                this.grid.setColumnData('courtEventType', this.index, this.ctrEveModel.movementReasonCode);
                            }
                            if (this.ctrEveModel.courtAgyLocId) {
                                this.grid.setColumnData('agyLocId', this.index, this.ctrEveModel.courtAgyLocId);
                            }
                            if (this.ctrEveModel.eventTime) {
                                this.grid.setColumnData('startTime', this.index, this.ctrEveModel.eventTime);
                            }
                            if (this.ctrEveModel.judgeName) {
                                this.grid.setColumnData('judgeName', this.index, this.ctrEveModel.judgeName);
                            }
                            if (this.ctrEveModel.agyLocId) {
                                this.show(event.newValue + ' ' +
                                    this.translateService.translate('oidscmov.inactiveorexists') + ' ' +
                                    this.caseLoadId, 'warn');
                                this.oidscmovRetrieveQuery(true);
                            } else {
                                this.show(event.newValue + ' ' +
                                    this.translateService.translate('oidscmov.inactiveorexists') + ' ' + this.caseLoadId, 'warn');
                                this.oidscmovRetrieveQuery(true);
                            }
                        } else {
                            for (let i = 0; i < crteveResultList.length; i++) {
                                this.index = this.crtEveIndex;
                                this.offSchSelectedRow.offenderBookId = crteveResultList[i].offenderBookId;
                                this.offenderBookId = crteveResultList[i].offenderBookId;
                                this.grid.setColumnData('nbtOffenderIdDisplay', this.index, crteveResultList[i].nbtOffenderIdDisplay);
                                this.grid.setColumnData('nbtLastName', this.index, crteveResultList[i].nbtLastName);
                                if (crteveResultList[i].nbtFirstName) {
                                    if (crteveResultList[i].nbtFirstName === 'null') {
                                        this.grid.setColumnData('nbtFirstName', this.index, '');
                                    } else {
                                        this.grid.setColumnData('nbtFirstName', this.index, crteveResultList[i].nbtFirstName);
                                    }
                                }
                                this.grid.setColumnData('nbtInst', this.index, crteveResultList[i].nbtInst);
                                this.grid.setColumnData('offenderBookId', crteveResultList[i].offenderBookId);

                                if (this.ctrEveModel.movementReasonCode) {
                                    this.grid.setColumnData('courtEventType', this.index, this.ctrEveModel.movementReasonCode);
                                }

                                if (this.ctrEveModel.courtAgyLocId) {
                                    this.grid.setColumnData('agyLocId', this.index, this.ctrEveModel.courtAgyLocId);
                                }

                                if (this.ctrEveModel.eventTime) {
                                    this.grid.setColumnData('startTime', this.index, this.ctrEveModel.eventTime);
                                }
                                if (this.ctrEveModel.judgeName) {
                                    this.grid.setColumnData('judgeName', this.index, this.ctrEveModel.judgeName);
                                }
                            }
                            this.vCtrEveModelTemp.eventDate = this.offSchSelectedRow.eventDate;
                            this.vCtrEveModelTemp.offenderBookId = this.offenderBookId;
                            const offschCheckConflit = this.oidscmovFactory.checkScheduleConflict(this.vCtrEveModelTemp);
                            offschCheckConflit.subscribe(checkConflict => {
                                if (checkConflict > 0) {
                                    this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                                        if (!result) {
                                            this.conflictRowIndex = this.crtEveData.indexOf(event.data);
                                            this.conflictFlag = true;
                                            this.checkConfictFlag = true;
                                            this.disabled = true;
                                        } else {
                                            this.disabled = false;
                                            this.conflictFlag = false;
                                        }
                                    });
                                } else {
                                    this.disabled = false;
                                    this.conflictFlag = false;
                                }
                            });
                        }
                    });
                }
                rowdata.validated = true;
            }
            if (event.field === 'cancelFlag') {
                if (event.data.eventStatus === 'COMP') {
                    this.grid.setColumnData('cancelFlag', rowIndex, false);
                    this.show(this.translateService.translate('oidscmov.cannotCancelEvent'), 'warn');
                    rowdata.validated = true;
                    return rowdata;
                }
                else if (event.data.cancelFlag) {
                    this.grid.requiredOn('outcomeReasonCode');
                    if (this.cancelReason)
                        this.grid.setColumnData('outcomeReasonCode', rowIndex, this.cancelReason);
                    else
                        this.grid.setColumnData('outcomeReasonCode', rowIndex, this.defaultCanReason !== null ? this.defaultCanReason : undefined);

                    this.grid.setColumnData('eventStatus', rowIndex, 'CANC');
                }
                else {
                    this.grid.requiredOff('outcomeReasonCode');
                    this.grid.setColumnData('outcomeReasonCode', rowIndex, undefined);
                    this.grid.setColumnData('eventStatus', rowIndex, 'SCH');
                }
            }
            if (event.newValue != event.oldValue) {
                if (event.field === 'appearanceType') {
                    this.enableSelection = true;
                    if (this.appearanceTypeData.length) {
                        let filterData = this.appearanceTypeData.filter(obj => obj.code == event.newValue);
                        if (filterData.length && filterData[0].parentCode == 'EXT') {
                            this.enableSelection = false;
                            rowdata.data = { appearanceLocation: '' };
                        }
                    } else {
                        this.enableSelection = false;
                        rowdata.data = { appearanceLocation: '' };
                    }
                    rowdata.validated = true;
                    return rowdata;
                }
            }

            if (event.field === 'agyLocId' && event.data.agyLocId && event.oldValue !== event.newValue) {
                this.courteventTemp = new CourtEvents();
                this.courteventTemp.offenderBookId = event.data.offenderBookId;
                this.courteventTemp.agyLocId = event.data.agyLocId;
                this.courteventTemp.eventDate = event.data.eventDate;
                const offschCheckConflit = this.oidscmovFactory.getChkNaConflictFlag(this.courteventTemp);
                offschCheckConflit.subscribe(data => {
                    this.chkNaConflictFlag = data;
                });
                this.grid.setColumnData('chkNaConflictFlag', rowIndex, this.chkNaConflictFlag);

            }

        }
        // rowdata.data = {
        //     eventDate: event.data.eventDate, offenderBookId: event.data.offenderBookId,
        //     startTime: event.data.startTime
        // };
        rowdata.validated = true;
        return rowdata;
    }

    crtEveOnDeleteTrigger = () => {
        if (this.conflictFlag) {
            if (this.offSchSelectedRow.eventId) {
                this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                    if (!result) {
                        this.conflictFlag = true;
                        this.disabled = true;
                        return false;
                    } else {
                        this.conflictFlag = false;
                        this.disabled = false;
                        return true;
                    }
                });
            } else {
                this.conflictFlag = false;
                this.disabled = false;
                return true;
            }
        } else {
            return true;
        }
    }
    /**
    *  This function will be executed when commit event is
   * fired
   */
    oidscmovSaveAfterConflictcrteveForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.crtEveDeleteList = [];
        this.crtEveUpdateList = [];
        this.crtEveInsertList = [];
        this.crtEveCommitModel.insertList = [];
        this.crtEveCommitModel.updateList = [];
        this.crtEveCommitModel.deleteList = [];
        this.crtEveDeleteList = event.removed;
        this.crtEveUpdateList = event.updated;
        this.crtEveInsertList = event.added;
        if (this.crtEveInsertList.length > 0) {
            for (let i = 0; i < this.crtEveInsertList.length; i++) {

                if (!this.crtEveInsertList[i].nbtOffenderIdDisplay) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' ' + this.translateService.translate('oidscmov.identered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].courtEventType) {
                    this.show(this.translateService.translate('oidscmov.reasonentered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].agyLocId) {
                    this.show(this.translateService.translate('oidscmov.courtentered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidscmov.timeentered'), 'warn');
                    return;
                }
                if (!this.crtEveInsertList[i].nbtLastName || !this.crtEveInsertList[i].nbtInst) {
                    this.show(this.translateService.translate('oidscmov.unabletoinsert'), 'warn');
                    return;
                }

                if (this.crtEveInsertList[i].appearanceType === 'OME' || this.crtEveInsertList[i].appearanceType === 'VID') {
                    if (!this.crtEveInsertList[i].appearanceLocation) {
                        this.show(this.translateService.translate('oidscmov.apperenceLocationmustentered'), 'warn');
                        return;
                    }
                }


                if (this.crtEveInsertList[i].chkNaConflictFlag) {
                    this.chkNaConflictFlag = true;
                }
                const currDate = this.ctrEveModel.eventDate;
                currDate.setSeconds(0);
                this.crtEveInsertList[i].eventDate = currDate;
                const date = this.crtEveInsertList[i].startTime;
                this.crtEveInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveInsertList[i].startTime),
                    this.crtEveInsertList[i].eventDate);
                this.crtEveInsertList[i].eventStatus = 'SCH';
                this.crtEveInsertList[i].nextEventRequestFlag = 'N';
                this.crtEveInsertList[i].orderRequestedFlag = 'N';
                this.crtEveInsertList[i].directionCode = 'OUT';
                this.crtEveInsertList[i].holdFlag = 'N';

            }
        }

        if (this.crtEveInsertList.length > 0) {
            this.crtEveCommitModel.insertList = this.crtEveInsertList;
        }
        if (this.crtEveUpdateList.length > 0) {
            for (let i = 0; i < this.crtEveUpdateList.length; i++) {
                if (!this.crtEveUpdateList[i].nbtOffenderIdDisplay) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' ' + this.translateService.translate('oidscmov.identered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].courtEventType) {
                    this.show(this.translateService.translate('oidscmov.reasonentered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].agyLocId) {
                    this.show(this.translateService.translate('oidscmov.courtentered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].startTime) {
                    this.show(this.translateService.translate('oidscmov.timeentered'), 'warn');
                    return;
                }
                if (!this.crtEveUpdateList[i].nbtLastName || !this.crtEveUpdateList[i].nbtInst) {
                    this.show(this.translateService.translate('oidscmov.unabletoupdate'), 'warn');
                    return;
                }
                if (this.crtEveUpdateList[i].appearanceType === 'OME' || this.crtEveUpdateList[i].appearanceType === 'VID') {
                    if (!this.crtEveUpdateList[i].appearanceLocation) {
                        this.show(this.translateService.translate('oidscmov.apperenceLocationmustentered'), 'warn');
                        return;
                    }
                }
                if (this.crtEveUpdateList[i].chkNaConflictFlag) {
                    this.chkNaConflictFlag = true;
                }
                this.crtEveUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveUpdateList[i].startTime),
                    this.crtEveUpdateList[i].eventDate);
            }
            this.crtEveCommitModel.updateList = this.crtEveUpdateList;
        }
        if (this.crtEveDeleteList.length > 0) {
            for (let i = 0; i < this.crtEveDeleteList.length; i++) {
            }
            this.crtEveCommitModel.deleteList = this.crtEveDeleteList;
        }
        if (this.conflictFlag) {
            this.dialogService.openLinkDialog('/oiuscinq', this.offSchSelectedRow).subscribe(result => {
                if (result) {
                    this.conflictFlag = false;
                    this.disabled = false;
                    this.oidscmovSavecrteveSaveData();
                } else {
                    this.disabled = true;
                    return;
                }

            });
        } else {
            this.disabled = false;
            this.oidscmovSavecrteveSaveData();
        }

    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidscmovSavecrteveForm(event) {
        if (this.cancelAll && !this.outcomechange) {
            this.show(this.translateService.translate('oidscmov.reasonmustbeentered'), 'warn');
            return;
        }
        this.crtEveDeleteList = [];
        this.crtEveUpdateList = [];
        this.crtEveInsertList = [];
        this.crtEveCommitModel.insertList = [];
        this.crtEveCommitModel.updateList = [];
        this.crtEveCommitModel.deleteList = [];
        this.crtEveDeleteList = event.removed;
        this.crtEveUpdateList = event.updated;
        this.crtEveInsertList = event.added;
        if (this.crtEveInsertList.length > 0) {
            for (let i = 0; i < this.crtEveInsertList.length; i++) {

                if (!this.crtEveInsertList[i].nbtOffenderIdDisplay) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' ' + this.translateService.translate('oidscmov.identered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].courtEventType) {
                    this.show(this.translateService.translate('oidscmov.reasonentered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].agyLocId) {
                    this.show(this.translateService.translate('oidscmov.courtentered'), 'warn');
                    return;
                }

                if (!this.crtEveInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidscmov.timeentered'), 'warn');
                    return;
                }
                if (!this.crtEveInsertList[i].nbtLastName || !this.crtEveInsertList[i].nbtInst) {
                    this.show(this.translateService.translate('oidscmov.unabletoinsert'), 'warn');
                    return;
                }

                if (this.crtEveInsertList[i].appearanceType === 'OME' || this.crtEveInsertList[i].appearanceType === 'VID' || this.crtEveInsertList[i].appearanceType === 'INT') {
                    if (!this.crtEveInsertList[i].appearanceLocation) {
                        this.show(this.translateService.translate('oidscmov.apperenceLocationmustentered'), 'warn');
                        return;
                    }
                }
                const currDate = this.ctrEveModel.eventDate;
                currDate.setSeconds(0);
                this.crtEveInsertList[i].eventDate = currDate;
                const date = this.crtEveInsertList[i].startTime;
                this.crtEveInsertList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveInsertList[i].startTime),
                    this.crtEveInsertList[i].eventDate);
                this.crtEveInsertList[i].eventStatus = 'SCH';
                this.crtEveInsertList[i].nextEventRequestFlag = 'N';
                this.crtEveInsertList[i].orderRequestedFlag = 'N';
                this.crtEveInsertList[i].directionCode = 'OUT';
                this.crtEveInsertList[i].holdFlag = 'N';

            }
        }
        if (this.crtEveUpdateList.length > 0) {
            for (let i = 0; i < this.crtEveUpdateList.length; i++) {
                if (!this.crtEveUpdateList[i].nbtOffenderIdDisplay) {
                    this.show(this.translateService.translate('system-profile.off-id-code') + ' ' + this.translateService.translate('oidscmov.identered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].courtEventType) {
                    this.show(this.translateService.translate('oidscmov.reasonentered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].agyLocId) {
                    this.show(this.translateService.translate('oidscmov.courtentered'), 'warn');
                    return;
                }

                if (!this.crtEveUpdateList[i].startTime) {
                    this.show(this.translateService.translate('oidscmov.timeentered'), 'warn');
                    return;
                }
                if (!this.crtEveUpdateList[i].nbtLastName || !this.crtEveUpdateList[i].nbtInst) {
                    this.show(this.translateService.translate('oidscmov.unabletoupdate'), 'warn');
                    return;
                }
                if (this.crtEveUpdateList[i].eventId && this.crtEveUpdateList[i].eventStatus === 'CANC' && !this.crtEveUpdateList[i].outcomeReasonCode) {
                    this.show(this.translateService.translate('oidscmov.reasonmustbeentered'), 'warn');
                    return;
                }
                if (this.crtEveUpdateList[i].appearanceType === 'OME' || this.crtEveUpdateList[i].appearanceType === 'VID' || this.crtEveUpdateList[i].appearanceType === 'INT') {
                    if (!this.crtEveUpdateList[i].appearanceLocation) {
                        this.show(this.translateService.translate('oidscmov.apperenceLocationmustentered'), 'warn');
                        return;
                    }
                }
                if (this.crtEveUpdateList[i].chkNaConflictFlag) {
                    this.chkNaConflictFlag = true;
                }
                this.crtEveUpdateList[i].startTime = TimeFormat.parse(TimeFormat.format(this.crtEveUpdateList[i].startTime),
                    this.crtEveUpdateList[i].eventDate);
            }
            this.crtEveCommitModel.updateList = this.crtEveUpdateList;
        }

        if (this.crtEveInsertList && this.crtEveInsertList.length > 0) {
            this.crtEveInsertList.forEach(ele => {
                ele.court = ele.agyLocId;
                ele.caseLoad = this.caseLoad;
            });
            this.crtEveCommitModel.insertList = this.crtEveInsertList;
        }
        if (this.crtEveUpdateList && this.crtEveUpdateList.length > 0) {
            this.crtEveUpdateList.forEach(ele => {
                ele.court = ele.agyLocId;
                ele.caseLoad = this.caseLoad;
            });
            this.crtEveCommitModel.updateList = this.crtEveUpdateList;
        }
        if (this.crtEveInsertList.length !== 0 && this.crtEveUpdateList.length !== 0) {
            this.crtEveCommitModel.insertAndUpdateList = this.crtEveInsertList;
            this.crtEveUpdateList.forEach(e => this.crtEveCommitModel.insertAndUpdateList.push(e));
        } else if (this.crtEveInsertList.length !== 0) {
            this.crtEveCommitModel.insertAndUpdateList = this.crtEveInsertList;
        } else {
            this.crtEveCommitModel.insertAndUpdateList = this.crtEveUpdateList;
        }
        if (this.crtEveDeleteList && this.crtEveDeleteList.length > 0) {
            this.crtEveCommitModel.deleteList = this.crtEveDeleteList;
        }

        if (this.crtEveCommitModel.insertAndUpdateList && this.crtEveCommitModel.insertAndUpdateList.length > 0) {
            this.vOffPrgOblDataTemp = [];
            this.vOffPrgOblDataTemp = this.crtEveCommitModel.insertAndUpdateList;
            var conflictObj = this.oidscmovFactory.getNonAssociationWarnings(this.crtEveCommitModel);
            conflictObj.subscribe(data => {
                if (data) {
                    this.internalAndExternalNonAssocationByIngAndGangNew(data.insertAndUpdateList, 0, 0);
                } // end data 
            });// end subscribe 
        } else {
            this.finalSave();
        }
    }



    oidscmovSavecrteveSaveData() {
        if (this.chkNaConflictFlag) {
            const chkNaConflictMessage = {
                label: this.translateService.translate('Non-association conflict found. Proceed?'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', chkNaConflictMessage, 50).subscribe(result => {
                if (result) {
                    this.chkNaConflictFlag = false;
                    this.finalSave();
                } else {
                    return;
                }

            });
        } else {
            this.finalSave();
        }
    }
    finalSave() {
        const crtEveSaveData = this.oidscmovFactory.crtEveCommit(this.crtEveCommitModel);
        crtEveSaveData.subscribe(data => {
            if (data === 2) {
                for (let i = 0; i < this.crtEveInsertList.length; i++) {
                    for (let j = i + 1; j < this.crtEveInsertList.length; j++) {
                        if (this.crtEveInsertList[i].offenderBookId === this.crtEveInsertList[j].offenderBookId) {
                            this.vCtrEveModelModelTemp.eventDate = this.crtEveCommitModel.insertList[i].eventDate;
                            this.vCtrEveModelModelTemp.startTime = this.crtEveCommitModel.insertList[i].startTime;
                            this.vCtrEveModelModelTemp.courtEventType = this.crtEveCommitModel.insertList[i].courtEventType;
                            this.vCtrEveModelModelTemp.eventStatus = this.crtEveCommitModel.insertList[i].eventStatus;
                            this.vCtrEveModelModelTemp.conflictFlag = true;
                        }
                    }
                }
                this.dialogService.openLinkDialog('/oiuscinq', this.vCtrEveModelModelTemp).subscribe(result => {
                    if (result !== null) {
                        for (let i = 0; i < this.crtEveCommitModel.insertList.length; i++) {
                            this.crtEveCommitModel.insertList[i].conflictFlag = true;
                        }
                        this.oidscmovSavecrteveSaveDataTemp();
                    } else {
                        for (let i = 0; i < this.crtEveCommitModel.insertList.length; i++) {
                            this.crtEveCommitModel.insertList[i].conflictFlag = false;
                        }
                    }
                });
            } else if (data === 1) {
                this.addFlag = true;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oidscmovFactory.crtEveDeleteList = undefined;
                this.oidscmovFactory.crtEveUpdateList = undefined;
                this.crtEveData = [];
                this.conflictFlag = false;
                this.saveConfirmFlag = false;
                this.oidscmovRetrieveQuery(true);
            } else if (data === 3) {
                this.show(this.translateService.translate('ocuoicch.unabletodeleterecord'), 'warn');
                this.oidscmovRetrieveQuery(true);
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.oidscmovFactory.crtEveDeleteList = undefined;
                this.oidscmovFactory.crtEveUpdateList = undefined;
                this.crtEveData = [];
                this.conflictFlag = false;
                this.saveConfirmFlag = false;
                this.oidscmovRetrieveQuery(true);
            }
        });
    }

    oidscmovSavecrteveSaveDataTemp() {
        const crtEveSaveData = this.oidscmovFactory.crtEveCommit(this.crtEveCommitModel);
        crtEveSaveData.subscribe(data => {
            if (data === 1) {
                this.addFlag = true;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oidscmovFactory.crtEveDeleteList = undefined;
                this.oidscmovFactory.crtEveUpdateList = undefined;
                this.crtEveData = [];
                this.conflictFlag = false;
                this.saveConfirmFlag = false;
                this.oidscmovRetrieveQuery(true);
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.oidscmovFactory.crtEveDeleteList = undefined;
                this.oidscmovFactory.crtEveUpdateList = undefined;
                this.crtEveData = [];
                this.conflictFlag = false;
                this.saveConfirmFlag = false;
                this.oidscmovRetrieveQuery(true);
            }
        });

    }
    dateBlur(eventDate) {
        if (eventDate.lastValue || eventDate.value)
            this.flag = true;
    }
    get clearBtnDisable() {
        if (this.ctrEveModel.eventDate || this.ctrEveModel.eventTime || this.ctrEveModel.agyLocId
            || this.ctrEveModel.movementReasonCode || this.ctrEveModel.courtAgyLocId || this.flag) {
            return false;
        } else {
            return true;
        }
    }


    internalAndExternalNonAssocationByIngAndGangNew(event, x, y) {
        let i = x;
        let j = y;
        if (i == event.length && this.vOffPrgOblDataTemp && this.vOffPrgOblDataTemp.length != 0) {
            this.crtEveCommitModel.insertList = [];
            this.crtEveCommitModel.updateList = [];
            this.crtEveCommitModel.insertList = this.vOffPrgOblDataTemp.filter(ele => !ele.createDatetime);
            this.crtEveCommitModel.updateList = this.vOffPrgOblDataTemp.filter(ele => ele.createDatetime);
            this.finalSave();
        }
        if (i == j && i < event.length) {
            if ((event[i].externalNonAssDetailsInd && event[i].externalNonAssDetailsInd !== AppConstants.EMPTYDATA) ||
                (event[i].offenderNonAssociationsByInd !== null) ||
                (event[i].offenderNonAssociationsByGang !== null)) {
                var msgExt = '';
                var msgInt = '';
                var apperanceTypeForOffender = (event[i].appearanceType === 'INP') ? this.translateService.translate('oidscmov.inperson') : this.translateService.translate('oidscmov.cctvORonline');
                apperanceTypeForOffender = apperanceTypeForOffender.replace('The selected offender', event[i].nbtLastName + ' ' + event[i].nbtFirstName + ' with ' + event[i].nbtOffenderIdDisplay);
                var exitMsg = this.translateService.translate('oidscmov.doYouWantExit');
                if (event[i].externalNonAssDetailsInd !== AppConstants.EMPTYDATA) {
                    msgExt = msgExt + ' \n' + this.translateService.translate('oidscmov.alreadyScheduled') + '\n' + event[i].externalNonAssDetailsInd;
                }
                var internalIndNonAss = '';
                if (event[i].offenderNonAssociationsByInd != null) {
                    event[i].offenderNonAssociationsByInd.forEach(ele => {
                        this.offenderDetalisList = [];
                        this.offenderDetalisList = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId === ele));
                        if (this.offenderDetalisList.length > 0) {
                            this.offenderDetalisList.forEach(e => {
                                internalIndNonAss = internalIndNonAss + e.nbtLastName + ' ' + e.nbtFirstName + ' ' + e.nbtOffenderIdDisplay + ' ' +
                                    ((e.appearanceType === 'INP') ? this.getCourtName(e.agyLocId) : (e.appearanceType === 'VID' || e.appearanceType === 'OME') ? this.getLocationName(e.appearanceLocation) : '') + ' ' + TimeFormat.format(e.startTime) + '\n';
                            });
                        }
                    });

                }
                var internalGangNonAss = '';
                if (event[i].offenderNonAssociationsByGang != null) {
                    event[i].offenderNonAssociationsByGang.forEach(ele => {
                        this.offenderDetalisList = [];
                        this.offenderDetalisList = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId === ele));
                        if (this.offenderDetalisList.length > 0) {
                            this.offenderDetalisList.forEach(e => {
                                internalGangNonAss = internalGangNonAss + e.nbtLastName + ' ' + e.nbtFirstName + ' ' + e.nbtOffenderIdDisplay + ' ' +
                                    ((e.appearanceType === 'INP') ? this.getCourtName(e.agyLocId) : (e.appearanceType === 'VID' || e.appearanceType === 'OME') ? this.getLocationName(e.appearanceLocation) : '') + ' ' + TimeFormat.format(e.startTime) + '\n';
                            });
                        }
                    });

                }
                if (internalIndNonAss.length > 0 || internalGangNonAss.length > 0) {
                    msgInt = msgInt + this.translateService.translate('oidscmov.beingScheduled');
                    if (internalIndNonAss.length > 0) {
                        msgInt = msgInt + '\n' + this.translateService.translate('oidscmov.individualNonAss') + '\n' + internalIndNonAss;
                    }
                    if (internalGangNonAss.length > 0) {
                        msgInt = msgInt + '\n' + this.translateService.translate('oidscmov.gangNonAss') + '\n' + internalGangNonAss;
                    }
                }

                const extInd = this.translateService.translate('oidscmov.individualNonAss');
                const extGang = this.translateService.translate('oidscmov.gangNonAss');
                msgExt = msgExt.replace('oidscmov.individualNonAss', extInd);
                msgExt = msgExt.replace('oidscmov.gangNonAss', extGang);
                if (msgInt.length > 0 || msgExt.length > 0) {
                    var msg = '';
                    if (msgInt.length > 0 || msgExt.length > 0) {
                        msg = apperanceTypeForOffender + '\n\n' + msgInt + '\n' + msgExt + '\n\n\n' + exitMsg;
                    } else if (msgInt.length > 0) {
                        msg = apperanceTypeForOffender + '\n\n' + msgInt + '\n\n' + exitMsg;
                    }
                    else {
                        msg = apperanceTypeForOffender + '\n\n' + msgExt + '\n\n' + exitMsg;
                    }
                    const data = {
                        label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                    j++;
                    this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
                        if (result) {
                            i++;
                            if (i < event.length) {
                                this.internalAndExternalNonAssocationByIngAndGangNew(event, i, j);
                            } else {
                                this.internalAndExternalNonAssocationByIngAndGangNew(event, i, j);
                            }
                        } else {
                            // For INP

                            if (event[i].appearanceType === 'INP') {
                                for (let r = 0; r < event.length; r++) {
                                    if (event[r].offenderBookId !== event[i].offenderBookId && event[r].appearanceType === 'INP') {
                                        if (event[r].offenderNonAssociationsByInd && event[r].offenderNonAssociationsByInd.length > 0)
                                            event[r].offenderNonAssociationsByInd = event[r].offenderNonAssociationsByInd.filter(ele => ele !== event[i].offenderBookId);

                                        if (event[r].offenderNonAssociationsByGang && event[r].offenderNonAssociationsByGang.length > 0)
                                            event[r].offenderNonAssociationsByGang = event[r].offenderNonAssociationsByGang.filter(ele => ele !== event[i].offenderBookId);
                                    }
                                }
                            }
                            // for OME or VID

                            if (event[i].appearanceType === 'VID' || event[i].appearanceType === 'OME') {
                                for (let r = 0; r < event.length; r++) {
                                    if (event[r].offenderBookId !== event[i].offenderBookId && (event[r].appearanceType === 'OME' || event[r].appearanceType === 'VID')) {
                                        if (event[r].offenderNonAssociationsByInd && event[r].offenderNonAssociationsByInd.length > 0)
                                            event[r].offenderNonAssociationsByInd = event[r].offenderNonAssociationsByInd.filter(ele => ele !== event[i].offenderBookId);

                                        if (event[r].offenderNonAssociationsByGang && event[r].offenderNonAssociationsByGang.length > 0)
                                            event[r].offenderNonAssociationsByGang = event[r].offenderNonAssociationsByGang.filter(ele => ele !== event[i].offenderBookId);
                                    }
                                }
                            }


                            this.vOffPrgOblDataTemp = this.vOffPrgOblDataTemp.filter((element) => (element.offenderBookId != event[i].offenderBookId));
                            i++;
                            this.internalAndExternalNonAssocationByIngAndGangNew(event, i, j);
                        }
                    }); // end dialog 
                } else {
                    j++;
                    i++;
                    this.internalAndExternalNonAssocationByIngAndGangNew(event, i, j);
                }

            } else {
                j++;
                i++;
                this.internalAndExternalNonAssocationByIngAndGangNew(event, i, j);
            }
        }
    }

    apperancelocationRecordGroup() {

        const obj = this.OidcrtevFactory.apperancelocationRecordGroup(this.caseLoad);
        obj.subscribe(data => {
            if (data.length > 0) {
                data.forEach(ele => {
                    this.locationMap.set(ele.code, ele.description);
                });
            }
        });
    }
    rgCtrlCourtRecordGroup() {
        const obj = this.oidscmovFactory.rgCtrlCourtRecordGroup();
        obj.subscribe(data => {
            if (data.length > 0) {
                data.forEach(ele => {
                    this.courtMap.set(ele.code, ele.description);
                });
            }
        });
    }
    getCourtName(code) {
        for (let [key, value] of this.courtMap.entries()) {
            if (key === code)
                return value;
        }
    }
    getLocationName(code) {
        for (let [key, value] of this.locationMap.entries()) {
            if (key === code)
                return value;
        }
        
    }

    cellEditableReason = (data: any, index: number, field: string): boolean => {
        return (data && data.cancelFlag) ? true : false;
      }
      callEditableCancelField = (data: any, index: number, field: string): boolean => {
        if (data && data.eventId) {
          return true
        } else {
          return false;
        }
      }

    getDefaultCancellationReason() {
        const canReason = this.OidcrtevFactory.getDefaultCancellationReason();
        canReason.subscribe(data => {
            this.defaultCanReason = data;
        });

    }

    cancelAllChkboxChange(event) {
        if (event.checked) {
            this.cancelCheckbox = true;
            this.disableOutcome = false;
            this.applyToAllDisable = false;
            this.reqCancelReason = true;
            this.outcomechange = this.defaultCanReason != null ? this.defaultCanReason : undefined;
            this.cancelReason = this.outcomechange;

        } else {
            this.disableOutcome = true;
            this.cancelCheckbox = false
            this.applyToAllDisable = true;
            this.outcomechange = undefined;
            this.cancelReason = undefined;
            this.reqCancelReason = false;
        }
    }

    cancelAllLovChange(event) {
        if (event.code) {
            this.cancelReason = event.code;
        }
    }
    
    outcomechangeChange() {
        this.outcomechange = this.outcomechange === undefined ? '' : undefined;
    }
    onApplyToAllClick() {
        if (!this.outcomechange) {
            this.show(this.translateService.translate('oidscmov.reasonmustbeentered'), 'warn');
            return;
        }
        var count = 0;
        this.crtEveData.forEach((e, i) => {
            if (e.eventId && e.eventStatus === 'COMP' && this.cancelCheckbox) {
                count = count + 1;
            }
            if (e.eventId && e.eventStatus !== 'COMP' && !e.cancelFlag) {
                this.grid.setColumnData('cancelFlag', i, true);
                this.grid.setColumnData('outcomeReasonCode', i, this.cancelReason);
                this.grid.setColumnData('eventStatus', i, 'CANC');
            }
            if (count === 1) {
                this.show(this.translateService.translate('oidscmov.cannotCancelEventForManyOffenders'), 'warn');
            }
        });
        this.applyToAllDisable = true;
        this.disableCancelFlag = true;
        this.disableOutcome=true;
    }
}

