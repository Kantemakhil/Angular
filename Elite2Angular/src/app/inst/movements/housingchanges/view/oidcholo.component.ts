import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { CourtMovementTmp } from '@inst/movements/housingchanges/beans/CourtMovementTmp';
import { OidcholoService } from '../service/oidcholo.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { BedAssignmentHistories } from '@inst/demographics-biometrics/beans/BedAssignmentHistories';
import { BedAssignmentHistoriesCommitBean } from '@inst/demographics-biometrics/beans/BedAssignmentHistoriesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { VNameSearch } from '@common/beans/VNameSearch';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { OmuavbedLivUnitsQuery } from '@inst/demographics-biometrics/beans/OmuavbedLivUnitsQuery';
import { OmuavbedService } from '@inst/demographics-biometrics/service/omuavbed.service';
import { Offenders } from '@common/beans/Offenders';

@Component({
    selector: 'app-oidcholo',
    templateUrl: './oidcholo.component.html'
})

export class OidcholoComponent implements OnInit {
    trnMsg: string;
    isWarnChange: boolean;
    @ViewChild('oidcholoForm', {static: true}) form: any;
    @ViewChild('grid') grid: any;
    isLovChange = false;
    msgs: any[] = [];
    crtmvtmpData: CourtMovementTmp[] = [];
    crtmvtmpModel: CourtMovementTmp = new CourtMovementTmp();
    bedahData: any[] = [];
    crtmvtmpDeleteListTemp: BedAssignmentHistories[] = [];
    crtmvtmpInsertList: BedAssignmentHistories[] = [];
    crtmvtmpUpdatetList: BedAssignmentHistories[] = [];
    crtmvtmpDeleteList: BedAssignmentHistories[] = [];
    crtmvtmpCommitModel: BedAssignmentHistoriesCommitBean = new BedAssignmentHistoriesCommitBean();
    bedAhColumnDef: any[];
    cgfkCrtmvtmpdspliving4Rg: any[] = [];
    facilityUrl: string;
    dialogData = { 'agyLocId': null };
    frmHousingLocationUrl = 'None';
    facilityTitles = { code: 'code', description: 'description' };
    frmHsingLctionTitles = { description: 'description' };
    fromHsingLctionTitles = { description: 'description' };
    livingUnitFour: string;
    livingUnitthree: string;
    livingUnitTwo: string;
    cbConfirmFlag: boolean;
    isReadOnly: boolean;
    onreteriveFlag: boolean;
    selected = -1;
    noOfAvailable = 0;
    avalibleCapacity: any;
    toLivingUnitId: number;
    namesrchModel: VNameSearch = new VNameSearch();
    livingunitsModel: OmuavbedLivUnitsQuery = new OmuavbedLivUnitsQuery();
    disabledFlag:boolean;
    offendersList :Offenders[]=[];
    commintList: BedAssignmentHistories[] = [];
    finalCapacity: number;
    allowFinalSave: boolean =true;

    constructor(private oidcholoFactory: OidcholoService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,
        public dialogService: DialogService,
        private oiinamesFactory: OiinamesService,
        private oidchlocFactory: OidchlocService,
        private omuavbedFactory: OmuavbedService) {
            this.facilityUrl = 'oidcholo/cgfkcrtmvtmpagylocidrecordgroup?caseload=' + this.sessionManager.currentCaseLoad;
        }
    ngOnInit() {
        this.disabledFlag = false;
        this.crtmvtmpModel.movementReason = 'ADM';
        this.crtmvtmpModel.movementDate = DateFormat.getDate();
        this.crtmvtmpModel.movementTime = DateFormat.getDate();
        const titles = { 'code': 'Reason', 'description': 'Description' };
        this.bedAhColumnDef = [
            { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', cellEditable: this.isEdit, width: 150, required: true },
            {
                fieldName: '', field: 'dspOffenderIdDisplay2', isDisable: this.setDisable, datatype: 'launchbutton',
                updateField: 'row', modal: true, link: '/oiinamesdialog', width: 150
            },
            { fieldName: this.trMsg('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.trMsg('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.trMsg('oidcholo.fromLocation'), field: 'livingUnitDescription', editable: false, width: 150 },
            {
                fieldName: this.trMsg('oidcholo.tolocation', '*'), field: 'dspDescription', editable: true, width: 150,
                cellEditable: this.canEdit
            },
            {
                fieldName: '', field: 'butLivingUnitId', datatype: 'launchbutton', data: 'row', modal: true, link: '/omuavbed',
                updateField: 'row', width: 150, onLaunchClick: this.toLocLaunchClick,
            },
            {
                fieldName: this.trMsg('common.reason'), field: 'dspMovementReason', datatype: 'lov', editable: true, width: 150,
                domain:'CHG_HOUS_RSN'/*link: 'oidcholo/cgfkCrtMvTmpMovementReasoRecordGroup'*/, 'titles': titles
            },
            {
                fieldName: this.trMsg('common.confirm'), field: 'confirmFlag', datatype: 'checkbox', editable: true, width: 150,
                cellEditable: this.canConfirm
            },
            { field: 'fromLaunchButton', hide: true },

        ];

        this.form.valueChanges.subscribe(data => {
            if (this.bedahData.length > 0 && !this.onreteriveFlag) {
                this.cancel();
            }
        });

        const cgfkCrtmvtmpdspliving4ServiceObj = this.oidcholoFactory.
            cgfkCrtmvtmpdspliving4RecordGroup('ITAG');
        cgfkCrtmvtmpdspliving4ServiceObj.subscribe(cgfkCrtmvtmpdspliving4List => {
            if (cgfkCrtmvtmpdspliving4List.length === 0) {
                this.cgfkCrtmvtmpdspliving4Rg = [];
            } else {
                for (let i = 0; i < cgfkCrtmvtmpdspliving4List.length; i++) {
                    this.cgfkCrtmvtmpdspliving4Rg.push({
                        'text': cgfkCrtmvtmpdspliving4List[i].code + ' - ' +
                            cgfkCrtmvtmpdspliving4List[i].description, 'id': cgfkCrtmvtmpdspliving4List[i].code
                    });
                }
            }
        });
    }

    setDisable = (data, index) => {
        return data.existed;
    }

    facilityChange() {
            this.frmHousingLocationUrl = 'oidcholo/cgfkCrtMvTmpDspLiving4RecordGroup?agyLocId=' + this.crtmvtmpModel.agyLocId;
        
        this.dialogData.agyLocId = this.crtmvtmpModel.agyLocId;
        this.livingUnitFour = null;
        this.livingUnitthree = null;
        this.livingUnitTwo = null;
        this.crtmvtmpModel.livingUnitCode5 = '';
        this.crtmvtmpModel.livingUnitCode4 = this.crtmvtmpModel.livingUnitCode4 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode3 = this.crtmvtmpModel.livingUnitCode3 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
    }
    fromHousingLocationChange() {
            this.livingUnitFour = 'oidcholo/cgfkCrtMvTmpDspLiving3RecordGroup?agyLocId=' +
                this.crtmvtmpModel.agyLocId + '&livingUnitId=' + String(this.crtmvtmpModel.livingUnitCode5);
        
        this.livingUnitthree = null;
        this.livingUnitTwo = null;
        this.crtmvtmpModel.livingUnitCode4 = this.crtmvtmpModel.livingUnitCode4 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode3 = this.crtmvtmpModel.livingUnitCode3 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
        this.isLovChange = true;
    }
    livingUnitFourChange() {
            this.livingUnitthree = 'oidcholo/cgfkCrtMvTmpDspLiving3RecordGroup?agyLocId=' +
                this.crtmvtmpModel.agyLocId + '&livingUnitId=' + String(this.crtmvtmpModel.livingUnitCode4);
        
        this.livingUnitTwo = null;
        this.crtmvtmpModel.livingUnitCode3 = this.crtmvtmpModel.livingUnitCode3 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
    }
    livingUnitThreeChage() {
            this.livingUnitTwo = 'oidcholo/cgfkCrtMvTmpDspLiving3RecordGroup?agyLocId=' +
                this.crtmvtmpModel.agyLocId + '&livingUnitId=' + this.crtmvtmpModel.livingUnitCode3;

        this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
    }
    bedDetails(event) {
        if (event && event.dspDescription) {
            this.crtmvtmpModel.description = event.dspDescription;
            const valArr = event.dspDescription.split('-');
            this.crtmvtmpModel.livingUnitCode1 = valArr[valArr.length - 1];

        }
        if (event && event.noOfAvailable) {
            this.noOfAvailable = event.noOfAvailable;
        }

        if (event && event.livingUnitId) {
            this.toLivingUnitId = event.livingUnitId;
        }
    }

    addRow = () => {
        this.onreteriveFlag = true;
        const data = {
            'dspOffenderIdDisplay2': '...', 'butLivingUnitId': '...', 'firstName': '', 'lastName': '', 'offenderIdDisplay': '',
            'agyLocId': this.crtmvtmpModel.agyLocId, 'dspDescription': '', 'livingUnitDescription': '', 'confirmFlag': false,
            'livingUnitId': 0
        };
        return data;
    }

    canEdit = (data: any, index: number, field: string): boolean => {
        this.isWarnChange = false;
        return true;
    }

    canConfirm = (data: any, index: number, field: string): boolean => {
        if (!data[field]) {
            const moveDate = DateFormat.getDate(this.crtmvtmpModel.movementDate);
            const addDate = DateFormat.getDate(data.bookingBeginDate);
            if (DateFormat.compareDate(moveDate, addDate) < 0) {
                this.show('oidcholo.movementdatacannotbelessthecurrentDate');
                return false;
            }
        }
        if(!data.dspDescription){
            return false
        }
        
        return true;
    }

    toLocLaunchClick = (event) => {
        const index = this.bedahData.indexOf(event);
        this.isWarnChange = true;
        this.dialogService.openLinkDialog('/omuavbed', event, 90)
            .subscribe(dlgData => {
                if (dlgData) {
                    this.grid.setColumnData('dspDescription', index, dlgData.dspDescription);
                    this.bedahData[index].livingUnitId = dlgData.livingUnitId;
                    this.bedahData[index].noOfAvailable = dlgData.noOfAvailable;
                    this.grid.setColumnData('fromLaunchButton', index, true);
                }
            });
        return false;
    }

    validateRow = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        const fields = ['offenderIdDisplay', 'lastName', 'firstName', 'livingUnitDescription'];
        if (fields.includes(event.field)) {
            const index = rowIndex;
            // if (this.offenderSearchService.selectedOffender) {
            if (event.data.agyLocId !== this.crtmvtmpModel.agyLocId) {
                this.show('oidcholo.entercorrectoffenderidorchoosefromlistofvalues');
                const nField = ['lastName', 'firstName', 'livingUnitDescription'];
                if (nField.includes(event.field)) {
                    rowdata.validated = true;
                    const rdata = {};
                    rdata[event.field] = null;
                    rowdata['data'] = rdata;
                    return rowdata;
                } else {
                    rowdata.validated = true;
                }
                return rowdata;
            }
            //  this.bedahData[index]['offenderBookId'] = this.offenderSearchService.selectedOffender.offenderBookId;
            // this.bedahData[index]['agyLocId'] = this.offenderSearchService.selectedOffender.agyLocId;
            //  this.bedahData[index]['livingUnitDescription'] = this.offenderSearchService['livingUnitDescription'];
            // } else {
            if (event.field === 'offenderIdDisplay' && event.data.offenderIdDisplay && event.data.offenderIdDisplay.trim() !== ''
                && this.removeZeros(event.oldValue) !== this.removeZeros(event.newValue)) {
                this.getVNameSearchDetail(event.data.offenderIdDisplay, rowIndex);
                rowdata.validated = true;
                return rowdata;
            }
            // }
        }
        if (event.field === 'dspDescription' && event.newValue && event.newValue !== event.oldValue) {
            const rData = { 'dspMovementReason': event.data.dspMovementReason, 'confirmFlag': true };
            if (!event.data.dspMovementReason) {
                rData.dspMovementReason = this.crtmvtmpModel.movementReason;
            }
            rowdata['data'] = rData;
            if (event.data[event.field]) {
                if (!this.isWarnChange) {
                    this.testValOnDescriptionInsert(event.data[event.field], event.data['offenderbookid'],
                    rowIndex);
                } else {
                    this.isWarnChange = false;
                    this.grid.setColumnData('confirmFlag', rowIndex, true);
                }
            }
        }

        if (event.field === 'confirmFlag' && event.newValue && event.newValue !== event.oldValue) {
            if (!event.data.dspDescription) {
                this.show('oidcholo.tolocationfield');
            }
        }

        rowdata.validated = true;
        return rowdata;
    }

    isEdit = (data: any, index: number, field: string) => {
        return !data.hasOwnProperty('existed');
    }

    removeZeros(event) {
        if (event) {
            const value = { val: String(event) };
            while (value.val.startsWith('0')) {
                value.val = value.val.replace('0', '');
            }
            return value.val;
        } else {
            return event;
        }

    }

    allowNumbers(event) {
    }

    testValOnDescriptionInsert(data, offenderBookId, index) {
        const description = String(data).split('-');
        const livingUntModel = new OmuavbedLivUnitsQuery();
        if (description[0]) {
            livingUntModel.pAgyLocId = description[0];
        }
        if (description[1]) {
            livingUntModel.pLevel1Code = description[1];
        }
        if (description[2]) {
            livingUntModel.pLevel2Code = description[2];
        }
        if (description[3]) {
            livingUntModel.pLevel3Code = description[3];
        }
        if (description[4]) {
            livingUntModel.pLevel4Code = description[4];
        }

        this.omuavbedFactory.livingUnitsExecuteQuery(livingUntModel).subscribe(bedResult => {
            if (bedResult.length === 1 && !bedResult[0].errorMessage) {

                const bedData = new BedAssignmentHistories();
                bedData.offenderBookId = offenderBookId;
                bedData.livingUnitId = bedResult[0].livingUnitId;
                this.oidchlocFactory.checkAllConficts(bedData).subscribe(result => {
                    if ((result.warningMsg && result.warningMsg !== 'null')) {
                        const dialogData = {
                            warningMsg: result.warningMsg, warningPrompt: result.warningPrompt,
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/OCUWARNG', dialogData, 80).subscribe(dialogResult => {
                            if (dialogResult) {
                                this.grid.setColumnData('dspDescription', index, bedResult[0].description);
                                this.grid.setColumnData('confirmFlag', index, true);
                                this.bedahData[index].livingUnitId = bedResult[0].livingUnitId;
                                this.bedahData[index].noOfAvailable = bedResult[0].noOfAvailable;
                            } else {
                                this.grid.setColumnData('dspDescription', index, null);
                            }
                        });
                    } else {
                        this.grid.setColumnData('dspDescription', index, bedResult[0].description);
                        this.grid.setColumnData('confirmFlag', index, true);
                    }

                });
            } else {
                this.dialogService.openLinkDialog('/omuavbed', this.dialogData, 80).subscribe(bedScrData => {
                    if (bedScrData) {
                        this.isWarnChange = true;
                        this.grid.setColumnData('dspDescription', index, bedScrData.dspDescription);
                        this.grid.setColumnData('confirmFlag', index, true);
                        this.bedahData[index].livingUnitId = bedScrData.livingUnitId;
                        this.bedahData[index].noOfAvailable = bedScrData.noOfAvailable;
                    } else {
                        this.show('oidcholo.selectabedlocationfromlov');
                        this.grid.setColumnData('dspDescription', index, null);
                    }
                });
            }

        });

    }



    getBedDetail() {
        if (this.crtmvtmpModel.livingUnitCode1) {
            this.dialogService.openLinkDialog('/omuavbed', this.dialogData, 80).subscribe(data => {
                this.bedDetails(data);
            });
        } else {
            this.crtmvtmpModel.description = '';
        }
    }

    getVNameSearchDetail(data, index) {
        const vNameSearch = new VNameSearch();
        vNameSearch.offenderIdDisplay = data;
        if (vNameSearch.offenderIdDisplay && String(vNameSearch.offenderIdDisplay).trim() !== '') {
            // for (let i = String(vNameSearch.offenderIdDisplay).length; i < 10; i++) {
            //     vNameSearch.offenderIdDisplay = '0' + vNameSearch.offenderIdDisplay;
            // }
            const nameSearch = this.oiinamesFactory.
                namesrchExecuteQuery(vNameSearch);
            nameSearch.subscribe(result => {
                if (result.length > 0) {
                    if (result[0].agyLocId === this.crtmvtmpModel.agyLocId) {
                        this.bedahData[index].agyLocId = result[0].agyLocId;
                        this.grid.setColumnData('offenderIdDisplay', index, result[0].offenderIdDisplay);
                        this.grid.setColumnData('lastName', index, result[0].lastName);
                        this.grid.setColumnData('firstName', index, result[0].firstName);
                        this.grid.setColumnData('livingUnitDescription', index, result[0].livingUnitDescription);
                        this.bedahData[index].offenderBookId = result[0].offenderBookId;
                    } else {
                        this.show('oidcholo.entercorrectoffenderidorchoosefromlistofvalues');
                        this.grid.setColumnData('offenderIdDisplay', index, null);
                        this.grid.setColumnData('lastName', index, null);
                        this.grid.setColumnData('firstName', index, null);
                        this.grid.setColumnData('livingUnitDescription', index, null);
                        this.bedahData[index].offenderBookId = null;
                    }
                    this.oidcholoFactory.oidcholoCgfklkpBedAhBedDatetimeProc(result[0].nbtLivingUnitId, result[0].offenderBookId)
                        .subscribe(resultData => {
                            this.bedahData[index].assignmentDate = resultData[0].assignmentDate;
                            this.bedahData[index].assignmentTime = resultData[0].assignmentTime;
                            this.bedahData[index].bookingBeginDate = resultData[0].bookingBeginDate;
                        });
                } else {
                    this.show('oidcholo.entercorrectoffenderidorchoosefromlistofvalues');
                }

            });
        }

    }
    validateFacility() {
        if (!this.crtmvtmpModel.agyLocId) {
            this.crtmvtmpModel.agyLocId = this.crtmvtmpModel.agyLocId === undefined ? '' : undefined;
        }
    }
    validateLivingUnitOne() {
        if (!this.crtmvtmpModel.livingUnitCode5) {
            this.crtmvtmpModel.livingUnitCode5 = this.crtmvtmpModel.livingUnitCode5 === undefined ? '' : undefined;
        }
    }

    validateLivingUnitTwo() {
        if (!this.crtmvtmpModel.livingUnitCode4) {
            this.crtmvtmpModel.livingUnitCode4 = this.crtmvtmpModel.livingUnitCode4 === undefined ? '' : undefined;
        }
    }

    validateLivingUnitThree() {
        if (!this.crtmvtmpModel.livingUnitCode3) {
            this.crtmvtmpModel.livingUnitCode3 = this.crtmvtmpModel.livingUnitCode3 === undefined ? '' : undefined;
        }
    }

    validateLivingUnitFour() {
        if (!this.crtmvtmpModel.livingUnitCode2) {
            this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
        }
    }

    validateLivingUnitReason() {
        if (!this.crtmvtmpModel.movementReason) {
            this.crtmvtmpModel.movementReason = this.crtmvtmpModel.movementReason === undefined ? '' : undefined;
        }
    }
    validateDate() {
        if (!this.crtmvtmpModel.movementDate) {
            this.crtmvtmpModel.movementDate = DateFormat.getDate();
        }
        if (DateFormat.compareDate(this.crtmvtmpModel.movementDate, DateFormat.getDate()) > 0) {
            this.show('oidcholo.dateenteredcannotbegreaterthanthecurrentdata');
            return;
        }
        if (DateFormat.compareDate(this.crtmvtmpModel.movementDate, DateFormat.getDate()) === 0) {
            if (!this.crtmvtmpModel.movementTime) {
                this.crtmvtmpModel.movementTime = DateFormat.getDate();
            }
            const movementTime = DateFormat.getDate(DateFormat.getDate(this.crtmvtmpModel.movementTime).setSeconds(0, 0));
            const currentTime =  DateFormat.getDate(DateFormat.getDate().setSeconds(0, 0));
            if (DateFormat.compareTime(movementTime, currentTime) > 0) {
                this.show('oidcholo.timeenteredcannotbegreaterthanthecurrenttime');
                return;
            }

        }
    }

    onButMovementTimeclick() {
        if (!this.crtmvtmpModel.agyLocId) {
            this.show('oidcholo.selectfacilitybefore');
            return true;
        }

        if (!this.crtmvtmpModel.livingUnitCode5) {
            this.show('oidcholo.pleasechoosethefromlocation');
            return true;
        }

        if (DateFormat.compareDate(this.crtmvtmpModel.movementDate, DateFormat.getDate()) > 0) {
            this.show('oidcholo.dateenteredcannotbegreaterthanthecurrentdata');
            return true;
        }

        if (DateFormat.compareDate(this.crtmvtmpModel.movementDate, DateFormat.getDate()) === 0) {
            const movementTime = DateFormat.getDate(DateFormat.getDate(this.crtmvtmpModel.movementTime).setSeconds(0, 0));
            const currentTime =  DateFormat.getDate(DateFormat.getDate().setSeconds(0, 0));
            if (DateFormat.compareTime(movementTime, currentTime) > 0) {
                this.show('oidcholo.timeenteredcannotbegreaterthanthecurrenttime');
                return true;
            }

        }

        if (this.cbConfirmFlag && (!this.crtmvtmpModel.livingUnitCode1)) {
            this.show('oidcholo.tolocationfield');
            return true;
        }

        if (this.crtmvtmpModel.description) {
            const description = String(this.crtmvtmpModel.description).split('-');
            this.livingunitsModel = new OmuavbedLivUnitsQuery();
            if (description[0]) {
                this.livingunitsModel.pAgyLocId = description[0];
            }
            if (description[1]) {
                this.livingunitsModel.pLevel1Code = description[1];
            }
            if (description[2]) {
                this.livingunitsModel.pLevel2Code = description[2];
            }
            if (description[3]) {
                this.livingunitsModel.pLevel3Code = description[3];
            }
            if (description[4]) {
                this.livingunitsModel.pLevel4Code = description[4];
            }

            this.omuavbedFactory.livingUnitsExecuteQuery(this.livingunitsModel).subscribe(data => {
                if (data.length > 0) {
                    data.forEach(result => {
                        if (this.toLivingUnitId === result.livingUnitId) {
                            this.noOfAvailable = result.noOfAvailable;
                            return;
                        }

                    });
                } else {
                    this.noOfAvailable = 0;
                }
                this.crtmvtmpExecuteQuery();
            });

        } else {
            if (this.bedahData.length === 0) {
                this.crtmvtmpExecuteQuery();
            }
        }
        return false;
    }
    onRowClickbedah(event) {
        if (event) {
            if (this.onreteriveFlag) {
                this.onreteriveFlag = false;
                if (this.cbConfirmFlag) {
                    for (let i = 0; i < this.bedahData.length; i++) {
                        this.grid.setColumnData('confirmFlag', i, true);
                    }
                }
            }
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.crtmvtmpModel.agyLocId = this.crtmvtmpModel.agyLocId === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode5 = this.crtmvtmpModel.livingUnitCode5 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode4 = this.crtmvtmpModel.livingUnitCode4 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode3 = this.crtmvtmpModel.livingUnitCode3 === undefined ? '' : undefined;
        this.crtmvtmpModel.livingUnitCode2 = this.crtmvtmpModel.livingUnitCode2 === undefined ? '' : undefined;
        this.crtmvtmpModel.description = null;
        this.crtmvtmpModel.livingUnitCode1 = null;
        this.cbConfirmFlag = false;
        this.bedahData = [];
        this.crtmvtmpModel.movementReason = 'ADM';
        this.crtmvtmpModel.movementDate = DateFormat.getDate();
        this.crtmvtmpModel.movementTime = DateFormat.getDate();
        this.frmHousingLocationUrl = null;
        this.noOfAvailable = undefined;
        this.toLivingUnitId = undefined;
        this.isLovChange = false;
        this.disabledFlag = false;
    }
    onOffenderChange(offender) {
    }
    crtmvtmpExecuteQuery() {
        const crtmvtmpResult = this.oidcholoFactory.
            crtMvTmpExecuteQuery(this.crtmvtmpModel);
        crtmvtmpResult.subscribe(crtmvtmpResultList => {
            if (crtmvtmpResultList.length === 0) {
                this.crtmvtmpData = [];
                this.bedahData = [];
                this.disabledFlag = false;
                this.show('common.querycaused');
            } else {
                this.crtmvtmpData = crtmvtmpResultList;
                const moveData = { 'data': [], 'seq': 1 };
                crtmvtmpResultList.forEach(element => {
                    element['dspOffenderIdDisplay2'] = '...';
                    element['butLivingUnitId'] = '...';

                    if (this.crtmvtmpModel.agyLocId) {
                        element['agyLocId'] = this.crtmvtmpModel.agyLocId;
                    }

                    if (this.crtmvtmpModel.description && this.crtmvtmpModel.livingUnitCode1) {
                        element['dspDescription'] = this.crtmvtmpModel.description;
                    } else {
                        element['dspDescription'] = null;
                    }
                    if (this.crtmvtmpModel.movementReason) {
                        element['dspMovementReason'] = this.crtmvtmpModel.movementReason;
                    }
                    // element['confirmFlag'] = this.cbConfirmFlag ? true : false;

                    element['existed'] = true;
                    element['noOfAvailable'] = this.noOfAvailable ? this.noOfAvailable : 0;

                    if (element.activeFlag === 'N') {
                        moveData.seq++;
                    } else {
                        moveData.data.push(element);
                    }
                    element['toLivingUnitId'] = undefined;

                    if (this.toLivingUnitId) {
                        element.livingUnitId = this.toLivingUnitId;
                    }
                });
                // this.bedahData = crtmvtmpResultList;
                if (this.cbConfirmFlag && (this.noOfAvailable - moveData.data.length) < 0) {
                    this.show('oidcholo.notenoughspaceavailableintheselectedlocation');
                    return;
                }
                this.errorMsgDialog(moveData.data, moveData.seq);
                // this.crtmvtmpModel = crtmvtmpResultList[0];
            }
        });
    }
    errorMsgDialog(data, seq) {
        const seqVal = seq - 1;
        if (seqVal === 0) {
            this.bedahData = data;
            this.disabledFlag = true;
            this.onreteriveFlag = true;
            this.selected = 0;
            this.noOfAvailable = undefined;
        } else {
            const dialogData = {
                label: this.trMsg('oidcholo.entercorrectoffenderidorchoosefromlistofvalues'), yesBtn: true, noBtn: false,
                yesLabel: 'Ok'
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', dialogData, 50).subscribe(result => {
                this.errorMsgDialog(data, seqVal);
            });
        }
    }

    compereDate(aDate: Date, aTime: Date, mDate: Date, mTime: Date) {
        const assesDate = DateFormat.getDate(aDate);
        const assesTime = DateFormat.getDate(aTime);
        const moveDate = DateFormat.getDate(mDate);
        const moveTime = DateFormat.getDate(mTime);
        const assesDateTime = DateFormat.getDate(assesDate.setHours(assesTime.getHours(), assesTime.getMinutes(), 0, 0));
       const moveDateTime = DateFormat.getDate(moveDate.setHours(moveTime.getHours(), moveTime.getMinutes(), 0, 0));

       const comparsionValue = DateFormat.compareDate(moveDate, assesDate) === 1
             && DateFormat.compareDate(moveDate, DateFormat.getDate()) !== 1;
             if( DateFormat.compareDate(moveDate, assesDate) === 0) {
                const comparsionTimeValue = DateFormat.compareTime(moveDateTime, assesDateTime) > -1
                && DateFormat.compareDate(moveDateTime, DateFormat.getDate()) < 1;
                if (!comparsionTimeValue) {
                    return 1;
                   }
             }
     
       if(comparsionValue) {
        return false;
       }
     
        return true;
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidcholoSavecrtmvtmpForm(event) {
        this.crtmvtmpInsertList = event.added;
        this.crtmvtmpUpdatetList = event.updated;
        this.crtmvtmpDeleteList = event.removed;
        this.crtmvtmpCommitModel.insertList = [];
        this.crtmvtmpCommitModel.updateList = [];
        this.crtmvtmpCommitModel.deleteList = [];
        this.trnMsg = undefined;
        this.allowFinalSave=true;
        this.avalibleCapacity = {};
        const validation = { valid: true };
        const commitData = this.bedahData;
        const msgval = [];
        commitData.forEach(data => {
            if (data.confirmFlag) {
                if(!data.offenderIdDisplay){
                    this.show('oidcholo.pidmustbeentered');
                    validation.valid = false;
                    return;
                }
                if (!data.dspDescription) {
                    this.show('oidcholo.tolocationfield');
                    validation.valid = false;
                    return;

                }
                if (!data.livingUnitDescription) {
                    validation.valid = false;
                    return;
                }
            //   const  isValidDate = this.compereDate(data.assignmentDate, data.assignmentTime,
            //    this.crtmvtmpModel.movementDate, this.crtmvtmpModel.movementTime);
            //     if (isValidDate) {
            //         this.grid.setColumnData('confirmFlag', this.bedahData.indexOf(data), false);
            //         data['dateTimeError'] = true;
            //     if (isValidDate === 1) {
            //         validation.valid = false;
            //         msgval.push({message: this.trMsg('oidcholo.assignmenttimemustbebetweenlastmovementtimeandtoday'), type: 'warn' });
            //     } else {
            //         validation.valid = false;
            //        msgval.push({message: this.trMsg('oidcholo.assignmentdatemustbebetweenlastmovementdateandtoday'), type: 'warn' });
            //     }
            //         data.confirmFlag = false;
            //     }
                if (data.existed) {
                    const updated = new BedAssignmentHistories();
                    updated.agyLocId = this.crtmvtmpModel.agyLocId;
                    updated.dspDescription = data.dspDescription;
                    updated.offenderBookId = data.offenderBookId;
                    updated.assignmentEndDate = this.crtmvtmpModel.movementDate;
                    updated.assignmentEndTime = this.crtmvtmpModel.movementTime;
                    updated.offenderIdDisplay = data.offenderIdDisplay;
                    updated.offenderName = data.lastName + ', ' + data.firstName;
                    updated['livingUnitId'] = data['livingUnitId'];
                    updated['fromLaunchButton'] = data['fromLaunchButton'];
                    updated.assignmentReason = data.dspMovementReason;
                    if (!data.dateTimeError) {
                        this.crtmvtmpCommitModel.updateList.push(updated);
                    }
                    if (!this.avalibleCapacity[data.dspDescription]) {
                        this.avalibleCapacity[data.dspDescription] = [];
                    }
                    this.avalibleCapacity[data.dspDescription].push({ 'Location': data.dspDescription, 'capacity': data.noOfAvailable });

                } else {
                    const added = new BedAssignmentHistories();
                    added.assignmentDate = DateFormat.getDate(this.crtmvtmpModel.movementDate);
                    added.assignmentTime = DateFormat.getDate(this.crtmvtmpModel.movementTime);
                    added.offenderBookId = data.offenderBookId;
                    added.dspDescription = data.dspDescription;
                    added.assignmentReason = data.dspMovementReason;
                    added.assignmentReason = data.dspMovementReason;
                    added.agyLocId = this.crtmvtmpModel.agyLocId;
                    added['livingUnitId'] = data['livingUnitId'];
                    added['fromLaunchButton'] = data['fromLaunchButton'];
                    if (!data.dateTimeError) {
                        this.crtmvtmpCommitModel.insertList.push(added);
                    }
                    if (!this.avalibleCapacity[data.dspDescription]) {
                        this.avalibleCapacity[data.dspDescription] = [];
                    }
                    this.avalibleCapacity[data.dspDescription].push({ 'Location': data.dspDescription, 'capacity': data.noOfAvailable });
                }
            }
        });
        if (msgval.length > 0) {
            this.msgs = msgval;
        }
        if (!validation.valid) {
            return;
        } else {
            if (!this.crtmvtmpCommitModel.updateList.length && !this.crtmvtmpCommitModel.insertList.length) {
                setTimeout(ele => {
                    this.show('oidcholo.norecordtocommit');
                }, 10);
                return;
            }
        }
        // To check avaliable capacity for the cell
        this.finalCapacity=0;
        const locationValidation = Object.keys(this.avalibleCapacity);

        locationValidation.forEach(data => {
            const offenders = this.avalibleCapacity[data];
            const capacity = this.avalibleCapacity[data][0]['capacity'];
            if ((capacity - offenders.length) < 0) {
                    this.show('oidcholo.nobedavailableforselectedlocation');
                    this.allowFinalSave= false;
                    return false;
            }
        });
       if(this.allowFinalSave){
        this.saveData();
       }

    }
    saveData(){
 // to open warn sceen for offender;
        const warnData = [];
        this.crtmvtmpCommitModel.updateList.forEach(wrn => {
            warnData.push(wrn);
        });
        this.crtmvtmpCommitModel.insertList.forEach(wrn => {
            warnData.push(wrn);
        });
        this.crtmvtmpDeleteListTemp = warnData;
        const conflictObj = this.oidcholoFactory.checkNonIndGangConficts(warnData);
			conflictObj.subscribe(data => {
				if (data && data.length > 0) {
					this.internalNonAssocationPopupByIndAndGangUpdate(JSON.parse(JSON.stringify(warnData)), data, 0)
				}
			});

        // this.callWarningScreen(warnData, 0);

    }
    
    internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i) {
		var msg = null;
		var msgGang = null;

		if (i == nonAssList.length && this.crtmvtmpDeleteListTemp && this.crtmvtmpDeleteListTemp.length != 0) {
			this.callWarningScreen(this.crtmvtmpDeleteListTemp, 0);
		}
		var name;
		var id;
		var one = this.translateService.translate('oidpwait.bulkAsignForAccreditedProgram');
		//Both individual And gang Details data 
		if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0 &&
			nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			// individual details
			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// gang details 
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							msgGang = "Gang Non-Association Conflics" + '\n';
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// both ind and Gang
			if (msg != null && msgGang != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + "\n" + msgGang;
				msg = msg + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}

		}

		// individual details
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0) {

			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for ind only 
			if (msg != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + '\n\n' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}
		// Gang details 
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msgGang = "Gang Non-Association Conflics \n";
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for gang details 
			if (msgGang != null) {
				msgGang = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n' + msgGang + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msgGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};
				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}

		else {
			i++;
			this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
		}
	}

    callWarningScreen(data, seq) {
        this.commintList = [];
        this.commintList = JSON.parse(JSON.stringify(data));
        const commitData = data[seq];
        if (commitData && !commitData.fromLaunchButton) {
            if (seq < (this.crtmvtmpCommitModel.insertList.length + this.crtmvtmpCommitModel.updateList.length)) {
                const bedData = {
                    offenderBookId: null,
                    offenderbookid: null,
                    livingUnitId: null,
                };
                bedData.offenderBookId = commitData.offenderbookid ? commitData.offenderbookid : commitData.offenderBookId;
                bedData.offenderbookid = bedData.offenderBookId;
                bedData.livingUnitId = commitData.livingUnitId ? commitData.livingUnitId : this.toLivingUnitId;
                this.oidchlocFactory.checkAllConficts(bedData).subscribe(result => {
                    if (result.warningMsg && result.warningMsg !== 'null') {
                        result.warningMsg = result.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                        result.warningMsg = result.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
                        
                        const dialogData = {
                            warningMsg: result.warningMsg, warningPrompt: result.warningPrompt,
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/OCUWARNG', dialogData, 80).subscribe(dialogResult => {
                            if (dialogResult) {
                                this.callWarningScreen(data, seq + 1);
                            } else {
                                const bedInsertList = [];
                                const bedUpdateList = [];
                                const dataList = [];
                                this.commintList = [];
                                data = JSON.parse(JSON.stringify(data));
                                data.forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        dataList.push(element);
                                    }
                                });
                                JSON.parse(JSON.stringify(this.crtmvtmpCommitModel.insertList)).forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        bedInsertList.push(element);
                                    }
                                });
                                JSON.parse(JSON.stringify(this.crtmvtmpCommitModel.updateList)).forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        bedUpdateList.push(element);
                                    }
                                });
                                
                                data = [];
                                this.crtmvtmpCommitModel.insertList = [];
                                this.crtmvtmpCommitModel.updateList = []
                                if(dataList.length > 0) {
                                    data = dataList
                                }
                                if(bedInsertList.length > 0) {
                                    this.crtmvtmpCommitModel.insertList = bedInsertList;
                                }
                                if(bedUpdateList.length > 0) {
                                    this.crtmvtmpCommitModel.updateList = bedUpdateList;
                                }
                                this.commintList = JSON.parse(JSON.stringify(data));
                                if(data.length > seq) {
                                    this.callWarningScreen(data, seq);
                                } else if(this.commintList.length > 0){
                                    this.oidcholoCommit();
                                } else {
                                    return;
                                }
                            }
                        });
                    } else {
                        if ((seq + 1) === (this.crtmvtmpCommitModel.insertList.length + this.crtmvtmpCommitModel.updateList.length)) {
                            this.oidcholoCommit();
                        } else {
                            this.callWarningScreen(data, seq + 1);
                        }
                    }
                });
            } else {
                this.oidcholoCommit();
            }
        } else {
            if (commitData) {
            this.callWarningScreen(data, seq + 1);
            } else {
                this.oidcholoCommit();
            }
        }
    }

    oidcholoCommit() {
        const bedInsertList = [];
        const bedUpdateList = [];
        this.commintList.forEach(obj => {
            JSON.parse(JSON.stringify(this.crtmvtmpCommitModel.insertList)).forEach(element => {
                if(obj.offenderBookId == element.offenderBookId) {
                    bedInsertList.push(element);
                }
            });

            JSON.parse(JSON.stringify(this.crtmvtmpCommitModel.updateList)).forEach(element => {
                if(obj.offenderBookId == element.offenderBookId) {
                    bedUpdateList.push(element);
                }
            });
        });

        this.crtmvtmpCommitModel.insertList = [];
        this.crtmvtmpCommitModel.updateList = []
                                
        if(bedInsertList.length > 0) {
            this.crtmvtmpCommitModel.insertList = bedInsertList;
        }
        if(bedUpdateList.length > 0) {
            this.crtmvtmpCommitModel.updateList = bedUpdateList;
        }

        if (this.trnMsg) {
            this.show(this.trnMsg);
            this.trnMsg = undefined;
        }

        if (this.crtmvtmpCommitModel.insertList.length > 0 || this.crtmvtmpCommitModel.updateList.length > 0) {
            
            const crtmvtmpSaveData = this.oidcholoFactory.crtMvTmpCommit(this.crtmvtmpCommitModel);
            crtmvtmpSaveData.subscribe(data => {
                if (data === 1) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                } else {
                    this.show('common.addupdateremoverecordfailed');
                }
                setTimeout(ele => {
                    this.bedahData = [];
                    if (this.onButMovementTimeclick()) {
                        this.cancel();
                    }
                }, 10);

            });
        }
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
               // this.show('List of Values contains no entries.');
            }
        }
    }
    get disableLaunchButon() {
        if (this.bedahData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    isLovReadOnly(event) {
        if (this.bedahData.length === 0) {
            if (event && event.innerOptions) {
                if (event.innerOptions.length === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
        
    }

    get clearBtnDisableOne() {
        if (this.crtmvtmpModel.agyLocId ||
            this.crtmvtmpModel.livingUnitCode5 ||
            this.crtmvtmpModel.livingUnitCode1) {
            return false;
        }
        return true;
    }

    firstPopup(bulkAssignList, nonAssList, data, i) {
		this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
			if (result) {
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);

			} else {
				this.secondPopup(bulkAssignList, nonAssList, data, i);

			}
		});
	}
	secondPopup(bulkAssignList, nonAssList, data, i) {
		const offDetails = {
			label: 'This action will un-select ' + bulkAssignList[i].offenderName + '(ID: ' + bulkAssignList[i].offenderIdDisplay + '),' + this.translateService.translate('oidcholo.removeFromList')+'\n\n'+this.translateService.translate('ociscata.doyouwanttoproceed')
			, yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', offDetails, 50).subscribe(results => {
			if (results) {
				for (let k = 0; k < nonAssList.length; k++) {
					if (k !== i && ((nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0)
						|| (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0))) {

						if (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByInd.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByInd[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByInd[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByInd = this.offendersList;
						}

						if (nonAssList[k].offenderNonAssociationsByGang && nonAssList[k].offenderNonAssociationsByGang.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByGang.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByGang[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByGang[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByGang = this.offendersList;
						}
					}
				}

				this.crtmvtmpDeleteListTemp = JSON.parse(JSON.stringify(this.crtmvtmpDeleteListTemp)).filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
			}
			else {
				this.firstPopup(bulkAssignList, nonAssList, data, i);
			}
		});

	}

}
