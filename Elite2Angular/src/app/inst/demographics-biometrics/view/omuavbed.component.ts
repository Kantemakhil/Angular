import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OmuavbedService } from '@inst/demographics-biometrics/service/omuavbed.service';
import { LivingUnits } from '@instdemographicsbeans/LivingUnits';
import { TempLivingUnitProfiles } from '@instdemographicsbeans/TempLivingUnitProfiles';
import { OmuavbedLivUnitsQuery } from '@instdemographicsbeans/OmuavbedLivUnitsQuery';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidadmisService } from '@inst/demographics-biometrics/service/oidadmis.service';
import { BedAssignmentHistories } from '@instdemographicsbeans/BedAssignmentHistories';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-omuavbed',
    templateUrl: './omuavbed.component.html'
})

export class OmuavbedComponent implements OnInit {
    level1Code: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    livingunitstypeData: LivingUnits[] = [];
    livingunitstypeDataTemp: LivingUnits[] = [];
    livingunitstypeModel: LivingUnits = new LivingUnits();
    livingunitstypeInsertList: LivingUnits[] = [];
    livingunitstypeUpdatetList: LivingUnits[] = [];
    livingunitstypeDeleteList: LivingUnits[] = [];
    livuprofuforData: TempLivingUnitProfiles[] = [];
    livuprofuforDataTemp: TempLivingUnitProfiles[] = [];
    livuprofuforModel: TempLivingUnitProfiles = new TempLivingUnitProfiles();
    livuprofuforInsertList: TempLivingUnitProfiles[] = [];
    livuprofuforUpdatetList: TempLivingUnitProfiles[] = [];
    livuprofuforDeleteList: TempLivingUnitProfiles[] = [];
    livuprofattrData: TempLivingUnitProfiles[] = [];
    livuprofattrDataTemp: TempLivingUnitProfiles[] = [];
    livuprofattrModel: TempLivingUnitProfiles = new TempLivingUnitProfiles();
    livuprofattrInsertList: TempLivingUnitProfiles[] = [];
    livuprofattrUpdatetList: TempLivingUnitProfiles[] = [];
    livuprofattrDeleteList: TempLivingUnitProfiles[] = [];
    livingunitslevelsData: LivingUnits[] = [];
    livingunitslevelsDataTemp: LivingUnits[] = [];
    livingunitslevelsModel: LivingUnits = new LivingUnits();
    livingunitslevelsInsertList: LivingUnits[] = [];
    livingunitslevelsUpdatetList: LivingUnits[] = [];
    livingunitslevelsDeleteList: LivingUnits[] = [];
    livingunitsData: OmuavbedLivUnitsQuery[] = [];
    livingunitsDataTemp: OmuavbedLivUnitsQuery[] = [];
    livingunitsModel: OmuavbedLivUnitsQuery = new OmuavbedLivUnitsQuery();
    livingunitsInsertList: OmuavbedLivUnitsQuery[] = [];
    livingunitsUpdatetList: OmuavbedLivUnitsQuery[] = [];
    livingunitsDeleteList: OmuavbedLivUnitsQuery[] = [];
    offbkgModel: VHeaderBlock = new VHeaderBlock();
    bedahModel: BedAssignmentHistories = new BedAssignmentHistories();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offEducationsColumnDef: any[];
    offEmploymentsColumnDef: any[];
    livingUnitsColumnDef: any[];
    vOffEmpAddrColumnDef: any[];
    livuProfUforColumnDef: any[];
    vOffEduAddrColumnDef: any[];
    livuProfAttrColumnDef: any[];
    offEducationsReadOnly: boolean;
    vOffEduAddrReadOnly: boolean;
    eduAddrCtrlReadOnly: boolean;
    offEmploymentsReadOnly: boolean;
    vOffEmpAddrReadOnly: boolean;
    empAddrCtrlReadOnly: boolean;
    offTxnReadOnly: boolean;
    livingUnitsTypeReadOnly: boolean;
    livuProfUforReadOnly: boolean;
    livuProfAttrReadOnly: boolean;
    livingUnitsLevelsReadOnly: boolean;
    livingUnitsReadOnly: boolean;
    rgLivingUnitPagyRg: any[] = [];
    rgLivingUnitLocIdRg: any[] = [];
    rgLivingUnitLevelIdRg: any[] = [];
    rgLivingUnitRg: any[] = [];
    rglivingunittypeRg: any[] = [];
    rgusedforRg: any[] = [];
    rgattributesRg: any[] = [];
    translateLabel: any;
    livingunitsResultList: any[];
    unitIdLevelValue: any;
    unitIdLevelOneValue: any;
    unitIdLevelTwoValue: any;
    unitIdLevelThreeValue: any;
    cellBlock: any;
    cellLocation: any;
    levelCellChange: any;
    CellChange: any;
    livingUnitId: any;
    livingUnitCode: any;
    livingUnitDescription: any;
    livingUnitProp: any;
    profileType: any;
    profileCode: any;
    clearDisabled: boolean;
    searchDisablrd: boolean;
    offenderBookId: any;
    profileTypeOne: any;
    profileCodeOne: any;
    pLivingUnitType: any;
    @ViewChild('omuavbedForm', {static: true}) form: any;
    pUnitType: any;
    callBlock = '';
    cell = '';
    cellOne = '';
    cellTwo = '';
    callBlockHide: boolean;
    cellHide: boolean;
    cellOneHide: boolean;
    cellTwoHide: boolean;
    availableLocationSearchRead: boolean;

    level1ReadOnly: boolean;
    level2ReadOnly: boolean;
    level3ReadOnly: boolean;
    level4ReadOnly: boolean;
    livingUnitFourDescription: any;
    offenderId:number;

    constructor(private omuavbedFactory: OmuavbedService,
        private oidadmisFactory: OidadmisService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private router: Router, private oidchlocFactory: OidchlocService, public dialogService: DialogService) {
        this.offEducationsColumnDef = [];
        this.offEmploymentsColumnDef = [];
        this.livingUnitsColumnDef = [];
        this.vOffEmpAddrColumnDef = [];
        this.livuProfUforColumnDef = [];
        this.vOffEduAddrColumnDef = [];
        this.livuProfAttrColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.disabled = true;
        this.searchDisablrd = false;
        let data = this.dialog.data
        this.livingunitsModel.pAgyLocId = data.agyLocId;
        this.level1ReadOnly = false;
        this.level2ReadOnly = true;
        this.level3ReadOnly = true;
        this.level4ReadOnly = true;
        this.cellBlock = 'omuavbed/rgLivingUnitRecordGroup?agencyLocId=' + data.agyLocId;
        this.livingUnitsColumnDef = [
            {
                fieldName: this.translateService.translate('omuavbed.availableLocations'), field: 'description',
                editable: false, width: 330
            },
            { fieldName: this.translateService.translate('omuavbed.capacity'), field: 'capacity', editable: false, width: 120 },
            { fieldName: this.translateService.translate('omuavbed.occupied'), field: 'noOfOccupant', editable: false, width: 120 },
            { fieldName: this.translateService.translate('omuavbed.available'), field: 'noOfAvailable', editable: false, width: 120 },
            {
                fieldName: this.translateService.translate('omuavbed.atOperationalCapacity'), field: 'unitAtCapacity',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('omuavbed.OffenderConflict'), field: 'prisonerConflict',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('omuavbed.SecurityConflict'), field: 'securityConflict',
                editable: false, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('omuavbed.CellSharingConflict'), field: 'cellSharingConflict',
                editable: false, width: 150, datatype: 'checkbox'
            },
        ];
        const rgUsedForServiceObj = this.omuavbedFactory.rgUsedForRecordGroup();
        rgUsedForServiceObj.subscribe(rgUsedForlist => {
            if (rgUsedForlist.length === 0) {
                this.rgusedforRg = [];
            } else {
                this.rgusedforRg = [];
                for (let i = 0; i < rgUsedForlist.length; i++) {
                    this.rgusedforRg.push({
                        'text':
                            rgUsedForlist[i].description, 'id': rgUsedForlist[i].code
                    });
                }
            }
        });
        this.clearDisabled = true;
        this.form.valueChanges.subscribe(data => {
            const keys = Object.keys(data);
            const count = { i: 0 };
            if (this.livingunitsData.length === 0) {
                do {
                    if (!data[keys[count.i]]) {
                        this.clearDisabled = true;
                    } else {
                        this.clearDisabled = false;
                    }
                    count.i++;
                } while (this.clearDisabled && count.i < keys.length);
            }
        });
        const livingunitsResult = this.omuavbedFactory.gettingLabels(this.sessionManager.currentCaseLoad);
        livingunitsResult.subscribe(livingunitsResultList => {
            if (livingunitsResultList) {
                if (livingunitsResultList.housingLev1Code) {
                    this.callBlock = livingunitsResultList.housingLev1Code;
                    this.callBlockHide = true;
                }
                if (livingunitsResultList.housingLev2Code) {
                    this.cell = livingunitsResultList.housingLev2Code;
                    this.cellHide = true;
                }
                if (livingunitsResultList.housingLev3Code) {
                    this.cellOne = livingunitsResultList.housingLev3Code;
                    this.cellOneHide = true;
                }
                if (livingunitsResultList.housingLev4Code) {
                    this.cellTwo = livingunitsResultList.housingLev4Code;
                    this.cellTwoHide = true;
                }
            }
        });
    }
    changeCellBlock(event) {
        this.livingunitstypeModel.level2Code =undefined;
        this.livingunitstypeModel.level3Code =undefined;
        this.livingunitstypeModel.level4Code =undefined;
        if (event) {
            //this.livingunitstypeModel.level1Code = event.code;
            this.livingUnitId = event.code;
            this.cellLocation = 'omuavbed/rgLivingUnitPagyRecordGroup?livingUnitId=' + this.livingUnitId + '&level1Code=' +
            this.dialog.data.agyLocId;
            this.livingunitstypeModel.level3Code =null;

            this.levelCellChange=null;
            this.CellChange=null;
            this.searchDisablrd = false;
            this.level1Code = event.description;
            this.livingUnitId = event.code;
            this.level2ReadOnly = false;
            this.livingUnitCode = undefined;
            this.livingUnitDescription = undefined;
            this.livingUnitFourDescription = undefined;
        } else {
           // this.level1Code = null;
            this.level2ReadOnly = true;
            this.level3ReadOnly = true;
            this.level4ReadOnly = true;

        }
    }
    levelModelChange(event) {
        this.livingunitstypeModel.level3Code =undefined;
        this.livingunitstypeModel.level4Code =undefined;
        if (event) {
            this.CellChange="";
            this.searchDisablrd = false;
            this.livingUnitId = event.code;
            this.livingUnitCode = event.description;
            this.levelCellChange = 'omuavbed/rgLivingUnitLocIdRecordGroup?livingUnitId=' + this.livingUnitId + '&level2Code=' +
            this.dialog.data.agyLocId;
            this.level3ReadOnly = false;
            this.livingUnitDescription = undefined;
            this.livingUnitFourDescription = undefined;
        } else {
           // this.livingUnitCode = null;
            this.level3ReadOnly = true;
            this.level4ReadOnly = true;
        }
    }
    levelModelChangeCellBlock(event) {
        this.livingunitstypeModel.level4Code =undefined;
        if (event) {
            this.searchDisablrd = false;
            this.livingUnitId = event.code;
            this.livingUnitDescription = event.description;
            this.CellChange = 'omuavbed/rgLivingUnitLevelIdRecordGroup?livingUnitId=' + this.livingUnitId + '&level3Code=' +
            this.dialog.data.agyLocId;
            this.level4ReadOnly = false;
            this.livingUnitFourDescription = undefined;
        } else {
           // this.livingUnitDescription = null;
            this.level4ReadOnly = true;
        }
    }
    levelModelLevelcode4Block(event){
        if(event){
            this.livingUnitFourDescription = event.description;
        }
    }
    changeProfileType(event) {
        if (event) {
            this.profileType = event.code;
            this.searchDisablrd = false;
        } else {
            this.profileType = null;
        }
    }
    changeProfileCode(event) {
        if (event) {
            this.profileCode = event.code;
            this.searchDisablrd = false;
        } else {
            this.profileCode = null;
        }
    }
    changeUnitType(event) {
        if (event) {
            this.pUnitType = event.code;
            this.searchDisablrd = false;
        } else {
            this.pUnitType = null;
        }
    }
    livingunitsExecuteQuery() {
        if (this.dialog.data.bookingId) {
            this.livingunitsModel.pOffenderBookId = this.dialog.data.bookingId;
            this.offenderBookId = this.dialog.data.bookingId;
        } else if (this.dialog.data.offenderBookId) {
            this.livingunitsModel.pOffenderBookId = this.dialog.data.offenderBookId;
        } else {
            this.livingunitsModel.pOffenderBookId = null;
        }
        this.offenderId=this.dialog.data.offenderId;
        this.livingunitsModel.pAgyLocId = this.dialog.data.agyLocId;
        this.livingunitsModel.profileType = this.profileType;
        this.livingunitsModel.profileCode = this.profileCode;
        this.livingunitsModel.pLevel1Code = this.level1Code;
        this.livingunitsModel.pLevel2Code = this.livingUnitCode;
        this.livingunitsModel.pLevel3Code = this.livingUnitDescription;
        this.livingunitsModel.pLevel4Code = this.livingUnitFourDescription;
        this.livingunitsModel.pLivingUnitType = this.pUnitType;
        this.livingunitsModel.profileTypeOne =this.profileTypeOne;
        this.livingunitsModel.profileCodeOne = this.profileCodeOne;
        const livingunitsResult = this.omuavbedFactory.livingUnitsExecuteQuery(this.livingunitsModel);
        livingunitsResult.subscribe(livingunitsResultList => {
            if (livingunitsResultList.length === 0) {
                this.livingunitsData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                livingunitsResultList.forEach(living => {
                    living.unitAtCapacity = (living.unitAtCapacity === 'Y') ? true : false;
                    living.prisonerConflict = (living.prisonerConflict === 'Y') ? true : false;
                    living.securityConflict = (living.securityConflict === 'Y') ? true : false;
                    living.cellSharingConflict = (living.cellSharingConflict === 'Y') ? true : false;
                });
                this.livingunitsData = livingunitsResultList;
                this.livingunitsModel = this.livingunitsData[0];
                this.clearDisabled = false;
                this.searchDisablrd = true;
                this.availableLocationSearchRead = true;
            }
        });
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClicklivuprofufor(event) {
        this.bedahModel = new BedAssignmentHistories();
        this.disabled = false;
        this.bedahModel.dspDescription = event.description;
        this.bedahModel.livingUnitId = event.livingUnitId;
        this.bedahModel['noOfAvailable'] = event.noOfAvailable;
        this.bedahModel.offenderId=this.offenderId;
        if (this.offenderBookId) {
            this.bedahModel.offenderBookId = this.offenderBookId;
        }
    }
    select() {
        if (this.livingunitsModel.unitAtCapacity === 'true' ||
            this.livingunitsModel.prisonerConflict === 'true' || this.livingunitsModel.securityConflict === 'true'
            || this.livingunitsModel.cellSharingConflict === 'true') {
            this.type = 'warn';
            this.message = this.translateService.translate('omuavbed.donthavetoselect');
            this.show();
            return;
        }
        /**
         * below code used to check whether warning message exists or not for offenderBookId and agyLocId
         * params this.bedahModel
         * if warningDetails.warningMsg is not null then warning screen will be open.
         * if click on yes data will be bind or else warning screen will be closed.
         * if warningDetails.warningMsg is null then bed screen will be closed.
         */
        if (this.dialog.data && this.dialog.data.offenderBookId) {
            this.bedahModel.offenderBookId = this.dialog.data.offenderBookId;
        }
        if(this.dialog.data && this.dialog.data.agyLocId){
            this.bedahModel.agyLocId = this.dialog.data.agyLocId;
        }
        const checkWarningService = this.omuavbedFactory.checkAllConficts(this.bedahModel);
        checkWarningService.subscribe(warningDetails => {
            if (warningDetails.warningMsg !== 'null' && warningDetails.sealFlag !== 'EMPTYDATA') {
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationmsg', this.translateService.translate('omuavbed.nonassocationmsg'));
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationhouse', this.translateService.translate('omuavbed.nonassocationhouse'));
                const data = {
                    warningMsg: warningDetails.sealFlag + '\n' + warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                    yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                    }
                });
            } else if (warningDetails.sealFlag !== 'EMPTYDATA') {
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationmsg', this.translateService.translate('omuavbed.nonassocationmsg'));
                warningDetails.sealFlag = warningDetails.sealFlag.replaceAll('omuavbed.nonassocationhouse', this.translateService.translate('omuavbed.nonassocationhouse'));
                const data = {
                    warningMsg: warningDetails.sealFlag, warningPrompt: '',
                    yesBtn: warningDetails, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                    }
                });
            }
            else if (warningDetails.warningMsg !== 'null') {
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                warningDetails.warningMsg = warningDetails.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
                const data = {
                    warningMsg: warningDetails.warningMsg, warningPrompt: warningDetails.warningPrompt,
                    yesBtn: warningDetails.inserted, noBtn: true
                };
                this.dialogService.openLinkDialog('/OCUWARNG', data, 50).subscribe(result => {
                    if (typeof result === 'boolean' && result) {
                        this.dialog.close({
                            dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                            noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                            isNonAssocOverriddenWarn: 'Y', warningMsg: warningDetails.warningMsg
                        });
                    } else {
                    }
                });
            }
            else {
                this.dialog.close({
                    dspDescription: this.bedahModel.dspDescription, livingUnitId: this.bedahModel.livingUnitId,
                    noOfAvailable: this.bedahModel['noOfAvailable'], ['toLivingUnitId']: this.bedahModel.livingUnitId,
                    isNonAssocOverriddenWarn: 'N', warningMsg: null
                });
            }
        });
    }
    clear() {
        const pLivingUnitType = this.pLivingUnitType === undefined ? '' : undefined;
        const profileType = this.livuprofuforModel.profileType === undefined ? '' : undefined;
        const profileCode = this.livuprofuforModel.profileCode === undefined ? '' : undefined;
        const level1Code = this.livingunitstypeModel.level1Code === undefined ? '' : undefined;
        const level2Code = this.livingunitstypeModel.level2Code === undefined ? '' : undefined;
        const level3Code = this.livingunitstypeModel.level3Code === undefined ? '' : undefined;
        const level4Code = this.livingunitstypeModel.level4Code === undefined ? '' : undefined;
        this.livingunitstypeModel = new LivingUnits();
        this.livingunitsModel = new OmuavbedLivUnitsQuery();
        this.livuprofuforModel = new TempLivingUnitProfiles();
        this.pLivingUnitType = pLivingUnitType;
        this.livuprofuforModel.profileType = profileType;
        this.livuprofuforModel.profileCode = profileCode;
        this.livingunitstypeModel.level1Code = level1Code;
        this.livingunitstypeModel.level2Code = level2Code;
        this.livingunitstypeModel.level3Code = level3Code;
        this.livingunitstypeModel.level4Code = level4Code;
        this.level1Code = null;
        this.clearDisabled = true;
        this.searchDisablrd = false;
        this.livingunitsData = [];
        this.livingunitstypeData = [];
        this.disabled = true;
        this.availableLocationSearchRead = false;
        this.level1Code = undefined;
        this.livingUnitCode = undefined;
        this.livingUnitDescription = undefined;
        this.livingUnitFourDescription = undefined;
       
    }
    cancel() {
        this.dialog.close(null);
    }

    changeProfileTypeOne(event) {
        if (event) {
            this.profileTypeOne = event.code;
            this.searchDisablrd = false;
        } else {
            this.profileTypeOne = null;
        }
    }

    changeProfileCodeOne(event) {
        if (event) {
            this.profileCodeOne = event.code;
            this.searchDisablrd = false;
        } else {
            this.profileCodeOne = null;
        }
    }
}
