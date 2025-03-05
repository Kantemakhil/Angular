import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidremcsService } from '../service/oidremcs.service';
import { AgencyLocationCounts } from '@automatedbeans/AgencyLocationCounts';
import { AgencyLocationCountsCommitBean } from '@automatedbeans/AgencyLocationCountsCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Router } from '@angular/router';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-oidremcs',
    templateUrl: './oidremcs.component.html'
})

export class OidremcsComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    conductedByUseridCode: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    subremcntData: AgencyLocationCounts[] = [];
    subremcntDataTemp: AgencyLocationCounts[] = [];
    subremcntModel: AgencyLocationCounts = new AgencyLocationCounts();
    subremcntCommitModel: AgencyLocationCountsCommitBean = new AgencyLocationCountsCommitBean();
    subremcntIndex: number;
    subremcntInsertList: AgencyLocationCounts[] = [];
    subremcntUpdatetList: AgencyLocationCounts[] = [];
    subremcntDeleteList: AgencyLocationCounts[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offCaseNrColumnDef: any[];
    teamsColumnDef: any[];
    perAddrColumnDef: any[];
    perIdentColumnDef: any[];
    profilesColumnDef: any[];
    perEmpColumnDef: any[];
    offNotesColumnDef: any[];
    offCntPerColumnDef: any[];
    bedAhColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    crtMvTmpReadOnly: boolean;
    bedAhReadOnly: boolean;
    offNotesReadOnly: boolean;
    cntlReadOnly: boolean;
    vOffBkgReadOnly: boolean;
    sysPflReadOnly: boolean;
    subRemCntReadOnly: boolean;
    cgfkHousinglevel1Rg: any[] = [];
    cgfkHousinglevel2Rg: any[] = [];
    cgfkHousinglevel3Rg: any[] = [];
    cgfkInitloccodeRg: any[] = [];
    cgfkConductedbyRg: any[] = [];
    countTypeIdLink: string;
    housingLevel2Link: string;
    housingLevel3Link: string;
    internalLocation: string;
    conductedby: string;
    actualCountReadOnly: boolean;
    reportedCount: any;
    conductedByTitles = { description: 'User ID', firstName: 'First Name', title: 'Last Name' };
    livUnitIdMap: Map<string, string> = new Map<string, string>();
    internalLocationMap: Map<string, string> = new Map<string, string>();
    internalLocationReadOnly: boolean;
    userId: string;
    housingLevOneLableName: string;
    housingLevTwoLableName: string;
    housingLevThreeLableName: string;
    ishousingLvlTwoMandatory: boolean;
    ishousingLvlThreeMandatory: boolean;
    livingUnitIdOne: any;
    conductedByUseridValue: any;
    bedDisabled: boolean;
    cellDisabled: boolean;
    livUnitDisabled: boolean;
    constructor(private oidremcsFactory: OidremcsService, public dialogService: DialogService, private router: Router,
        public translateService: TranslateService, private sessionManager: UserSessionManager,) {
        this.offCaseNrColumnDef = [];
        this.teamsColumnDef = [];
        this.perAddrColumnDef = [];
        this.perIdentColumnDef = [];
        this.profilesColumnDef = [];
        this.perEmpColumnDef = [];
        this.offNotesColumnDef = [];
        this.offCntPerColumnDef = [];
        this.bedAhColumnDef = [];
        this.contactsColumnDef = [];
    }
    ngOnInit() {
        this.conductedByUseridValue = this.sessionManager && this.sessionManager.getStaffDetail() && this.sessionManager.getStaffDetail().staffId;
        this.subremcntModel = new AgencyLocationCounts();
        this.getHousingLocationLovNames();
        this.subremcntExecuteQuery();
        this.actualCountReadOnly = true;
        this.ishousingLvlTwoMandatory = false;
        this.ishousingLvlThreeMandatory = false;
        this.livingUnitIdOne = undefined;
        this.bedDisabled = true;
        this.cellDisabled = true;
        this.livUnitDisabled = true;
        this.countTypeIdLink = 'oidremcs/cgfkHousingLevel1RecordGroup?countTypeId=' + this.dialog.data.countTypeId;
        this.internalLocation = 'oidremcs/cgfkInitLocCodeRecordGroup?countTypeId=' + this.dialog.data.countTypeId;
        this.conductedby = 'oidremcs/cgfkConductedByRecordGroup';
        const cgfkHousinglevel1ServiceObj = this.oidremcsFactory.cgfkHousinglevel1RecordGroup(this.dialog.data.countTypeId);
        cgfkHousinglevel1ServiceObj.subscribe(cgfkHousinglevel1List => {
            if (cgfkHousinglevel1List.length === 0) {
                this.cgfkHousinglevel1Rg = [];
            } else {
                for (let i = 0; i < cgfkHousinglevel1List.length; i++) {
                    this.cgfkHousinglevel1Rg.push({
                        'text': cgfkHousinglevel1List[i].code + ' - ' +
                            cgfkHousinglevel1List[i].description, 'id': cgfkHousinglevel1List[i].code
                    });
                    this.livUnitIdMap.set(cgfkHousinglevel1List[i].code, cgfkHousinglevel1List[i].livingUnitId);
                }
            }
        });
        const cgfkInitloccodeServiceObj = this.oidremcsFactory.cgfkInitloccodeRecordGroup(this.dialog.data.countTypeId);
        cgfkInitloccodeServiceObj.subscribe(cgfkInitloccodeList => {
            if (cgfkInitloccodeList.length === 0) {
                this.cgfkInitloccodeRg = [];
                this.livUnitDisabled = true;
            } else {
                this.livUnitDisabled = false;
                for (let i = 0; i < cgfkInitloccodeList.length; i++) {
                    this.cgfkInitloccodeRg.push({
                        'text': cgfkInitloccodeList[i].code + ' - ' +
                            cgfkInitloccodeList[i].description, 'id': cgfkInitloccodeList[i].code
                    });
                    this.internalLocationMap.set(cgfkInitloccodeList[i].code, cgfkInitloccodeList[i].agencyImlId);
                }
            }
        });
    }
    get livUnitDisabledOne() {
        if (this.livUnitDisabled || this.subremcntModel.housingLev1Code) {
            return true;
        }
        return false;
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onCancelclick() {
        this.dialog.close(null);
    }
    conductedByValueChange(event) {
        if (event) {
            this.subremcntModel.conductedByUserid = event.description;
        } else {
            this.subremcntModel.conductedByUserid = undefined;
        }

    }
    allowNumbers(event) {
        if (this.subremcntModel.reportedCount && String(this.subremcntModel.reportedCount).length >= 6) {
            const reg = /[0-9]/;
            if (reg.test(event.key)) {
                event.stopPropagation();
                return false;
            }
        } if (event.key === '+') {
            event.stopPropagation();
            return false;
        }
    }
    housingLevelOne(event) {
        this.livingUnitIdOne = undefined;
        if (event) {
            this.housingLevel2Link = 'oidremcs/cgfkHousingLevel2RecordGroup?countTypeId='
                + this.dialog.data.countTypeId + '&livingUnitId=' + event.livingUnitId;
            this.livingUnitIdOne = event.livingUnitId;
            const getCountData = this.oidremcsFactory.cgfkHousingLevel2RecordGroup(this.dialog.data.countTypeId, event.livingUnitId);
            getCountData.subscribe(getData => {
                if (getData.length > 0) {
                    this.bedDisabled = false;
                    this.cellDisabled = true;
                } else {
                    this.cellDisabled = true;
                    this.bedDisabled = true;
                }
            });
            const getCount = this.oidremcsFactory.changeHousingLevelOne(event.livingUnitId);
            getCount.subscribe(data => {
                if (data.length === 0) {
                    this.subremcntData = [];
                } else {
                    if (data.housingLevel) {
                        this.ishousingLvlTwoMandatory = true;
                    } else {
                        this.ishousingLvlTwoMandatory = false;
                    }
                    if (data.actualCount || data.actualCount === 0) {
                        this.subremcntModel.actualCount = data.actualCount;
                        this.actualCountReadOnly = true;
                    }
                }
            });
        } else {
            this.cellDisabled = true;
            this.bedDisabled = true;
            this.subremcntModel.actualCount = undefined;
            this.subremcntModel.reportedCount = undefined;
        }
    }
    housingLevelOneBlur(){
        if(this.subremcntModel.housingLev1Code === undefined){
            this.ishousingLvlTwoMandatory = false;
        }
    }
    housingLevelTwo(event) {
        if (event) {
            this.subremcntModel.housingLev2Code = event.code;
            this.subremcntModel.livingUnitId2 = event.livingUnitId;
            this.housingLevel3Link = 'oidremcs/cgfkHousingLevel3RecordGroup?countTypeId='
                + this.dialog.data.countTypeId + '&livingUnitId=' + event.livingUnitId;
                const getCountData = this.oidremcsFactory.cgfkHousingLevel3RecordGroup(this.dialog.data.countTypeId, event.livingUnitId);
                getCountData.subscribe(getData => {
                    if (getData.length > 0) {
                        this.cellDisabled = false;
                    } else {
                        this.cellDisabled = true;
                    }
                });
            const getCount = this.oidremcsFactory.changeHousingLevelTwo(this.livingUnitIdOne, event.livingUnitId);
            getCount.subscribe(data => {
                if (data && data.length === 0) {
                    this.subremcntData = [];
                } else {
                    if (data.housingLevel) {
                        this.ishousingLvlThreeMandatory = true;
                    } else {
                        this.ishousingLvlThreeMandatory = false;
                    }
                    if (data.actualCount || data.actualCount === 0) {
                        this.subremcntModel.actualCount = data.actualCount;
                        this.actualCountReadOnly = true;
                    }
                }

            });

        } else {
            this.cellDisabled = true;
            this.subremcntModel.actualCount = undefined;
            this.subremcntModel.reportedCount = undefined;
        }
    }

    housingLevelTwoBlur(){
        if(this.subremcntModel.housingLev2Code === undefined){
            this.ishousingLvlThreeMandatory = false;
        }
    }

    calculateActualCount(event) {
        if (event) {
            this.subremcntModel.livingUnitId3 = event.livingUnitId;
            const getCount = this.oidremcsFactory.calculateActualCount(event.livingUnitId);
            getCount.subscribe(count => {
                if (count || count === 0) {
                    this.subremcntModel.actualCount = count;
                }
            });
        } else {
            this.subremcntModel.actualCount = undefined;
            this.subremcntModel.reportedCount = undefined;
        }
    }
    housingLevelThree(event) {
        this.subremcntModel.internalLocation = event ? event.code : undefined;
        if (event) {
            this.subremcntModel.housingLev3Code = event.code;
            const getCount = this.oidremcsFactory.getInternalLocationCount(event.agencyImlId);
            getCount.subscribe(countList => {
                if (countList.length === 0) {
                    this.subremcntData = [];
                } else {
                    if (countList || countList === 0) {
                        this.subremcntModel.actualCount = countList;
                        this.actualCountReadOnly = true;
                    }
                }

            });
        } else {
            this.subremcntModel.actualCount = undefined;
            this.subremcntModel.reportedCount = undefined;
        }
    }
    subremcntExecuteQuery() {
        const subremcntResult = this.oidremcsFactory.subRemCntExecuteQuery(this.subremcntModel);
        subremcntResult.subscribe(data => {
            if (data.length === 0) {
                this.subremcntData = [];
            } else {
                this.subremcntData = data;
            }
        });
    }
    isLovReadOnly(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    validateRegEx(text, regex) {
        let valid = true;
        for (let i = 0; i < text.length; i++) {

            if (!regex.test(text[i])) {
                valid = false;
                break;
            }
        }
        return valid;
    }
    oidremcsSavesubremcntForm(event) {
        this.subremcntUpdatetList = [];
        this.subremcntCommitModel.insertList = [];
        this.subremcntCommitModel.updateList = [];
        this.subremcntCommitModel.deleteList = [];
        if (this.subremcntModel.housingLev1Code) {
            this.subremcntModel.livingUnitId = Number(this.livUnitIdMap.get(this.subremcntModel.housingLev1Code));
        }
        if (this.subremcntModel.internalLocation) {
            this.subremcntModel.internalLocationId = Number(this.internalLocationMap.get(this.subremcntModel.internalLocation));
        }
        this.subremcntModel.reportingLocId = this.dialog.data.inserted;
        this.subremcntModel.countTypeId = this.dialog.data.countTypeId;
        this.subremcntModel.dateSubmitted = DateFormat.getDate();
        this.subremcntModel.conductedDatetime = DateFormat.getDate();
        this.subremcntModel.createDatetime = DateFormat.getDate();
        this.subremcntModel.modifyDatetime = DateFormat.getDate();

        if (!this.subremcntModel.internalLocation && !this.subremcntModel.housingLev1Code) {
            this.show(this.housingLevOneLableName + ' must be entered.', 'warn');
            return;
        }
        if (this.ishousingLvlTwoMandatory && !this.subremcntModel.housingLev2Code) {
            this.show(this.housingLevTwoLableName + ' must be entered.', 'warn');
            return;
        }
        if (this.ishousingLvlThreeMandatory && !this.subremcntModel.housingLev3Code) {
            this.show(this.housingLevThreeLableName + ' must be entered.', 'warn');
            return;
        }
        if (!this.subremcntModel.conductedByUserid) {
            this.show('Conducted By must be entered.', 'warn');
            return;
        }
        if (!this.subremcntModel.reportedCount && this.subremcntModel.reportedCount !== 0) {
            this.show('Count  must be entered.', 'warn');
            return;
        }

        if (this.subremcntModel.reportedCount) {
            this.reportedCount = Math.round(this.subremcntModel.reportedCount);
            this.subremcntModel.reportedCount = this.reportedCount;
        }
        this.subremcntUpdatetList.push(this.subremcntModel);
        this.subremcntCommitModel.updateList = this.subremcntUpdatetList;
        const subremcntSaveData = this.oidremcsFactory.subRemCntCommit(this.subremcntCommitModel);
        subremcntSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.dialog.close(1);
            } else if (data === 2) {
                this.show(this.translateService.translate('oidremcs.checkflag'), 'warn');
                this.dialog.close(1);
            }  else if (data === 3) {
                this.show(this.translateService.translate('oidsublc.countvalidation'), 'warn');
                this.dialog.close(1);
            }  else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    getHousingLocationLovNames() {
        this.oidremcsFactory.getHousingLocationLovNames(this.dialog.data.countTypeId).subscribe(data => {
            if (data) {
                this.housingLevOneLableName = data.HOUSINGLEVONELABLENAME;
                this.housingLevTwoLableName = data.HOUSINGLEVTWOLABLENAME;
                this.housingLevThreeLableName = data.HOUSINGLEVTHREELABLENAME;
            }
        })
    }

    get enableCount(){
        if (this.subremcntModel.actualCount || this.subremcntModel.actualCount == 0) {
            return false;
        }
        return true;
    }
}



