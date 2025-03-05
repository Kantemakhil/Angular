import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmstoffService } from '../service/ocmstoff.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ProgramServicesProfiles } from '../beans/ProgramServicesProfiles';
import { ProgramServicesProfilesCommitBean } from '../beans/ProgramServicesProfilesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';

@Component({
    selector: 'app-ocmstoff',
    templateUrl: './ocmstoff.component.html',
    styleUrls: ['./ocmstoff.component.scss']
})

export class OcmstoffComponent implements OnInit {
    exTakenAll: any;
    inTakenAll: any;
    facTakenAll: any;
    excludeArray: any;
    includeArray: any;
    ethTakenAll: any;
    ageTakenAll: any;
    ageArray: any;
    facilityArray: any;
    itemsCarry: any;
    ethnicityArray: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('ingrid', {static: true}) ingrid: any;
    @ViewChild('exgrid', {static: true}) exgrid: any;
    @ViewChild('genederId', {static: true}) genederId: any;
    @ViewChild('ethinicityId', {static: true}) ethinicityId: any;
    @ViewChild('ageRangeId', {static: true}) ageRangeId: any;
    @ViewChild('facilityId', {static: true}) facilityId: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    prgprfgdData: ProgramServicesProfiles[] = [];
    prgprfgdBean: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfgdModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfgdIndex: Number = -1;
    prgprfgdInsertList: ProgramServicesProfiles[] = [];
    prgprfgdUpdatetList: ProgramServicesProfiles[] = [];
    prgprfgdDeleteList: ProgramServicesProfiles[] = [];
    prgprfrcData: ProgramServicesProfiles[] = [];
    prgprfrcDataTemp: ProgramServicesProfiles[] = [];
    prgprfrcModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfrcIndex: Number = -1;
    prgprfrcInsertList: ProgramServicesProfiles[] = [];
    prgprfrcUpdatetList: ProgramServicesProfiles[] = [];
    prgprfrcDeleteList: ProgramServicesProfiles[] = [];
    prgprfagData: ProgramServicesProfiles[] = [];
    prgprfagDataTemp: ProgramServicesProfiles[] = [];
    prgprfagModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfagIndex: Number = -1;
    prgprfagInsertList: ProgramServicesProfiles[] = [];
    prgprfagUpdatetList: ProgramServicesProfiles[] = [];
    prgprfagDeleteList: ProgramServicesProfiles[] = [];
    prgprffaData: ProgramServicesProfiles[] = [];
    prgprffaDataTemp: ProgramServicesProfiles[] = [];
    prgprffaModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprffaIndex: Number = -1;
    prgprffaInsertList: ProgramServicesProfiles[] = [];
    prgprffaUpdatetList: ProgramServicesProfiles[] = [];
    prgprffaDeleteList: ProgramServicesProfiles[] = [];
    prgprfigData: ProgramServicesProfiles[] = [];
    prgprfigDataTemp: ProgramServicesProfiles[] = [];
    prgprfigModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfigIndex: Number = -1;
    prgprfigInsertList: ProgramServicesProfiles[] = [];
    prgprfigUpdatetList: ProgramServicesProfiles[] = [];
    prgprfigDeleteList: ProgramServicesProfiles[] = [];
    prgprfxgData: ProgramServicesProfiles[] = [];
    prgprfxgDataTemp: ProgramServicesProfiles[] = [];
    prgprfxgModel: ProgramServicesProfiles = new ProgramServicesProfiles();
    prgprfxgIndex: Number = -1;
    prgprfxgInsertList: ProgramServicesProfiles[] = [];
    prgprfxgUpdatetList: ProgramServicesProfiles[] = [];
    prgprfxgDeleteList: ProgramServicesProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    prgPrfFaColumnDef: any[];
    prgPrfIgColumnDef: any[];
    prgPrfGdColumnDef: any[];
    prgPrfXgColumnDef: any[];
    prgPrfRcColumnDef: any[];
    prgPrfAgColumnDef: any[];
    prgPrfGdReadOnly: Boolean = false;
    prgPrfRcReadOnly: Boolean = false;
    prgPrfAgReadOnly: Boolean = false;
    prgPrfFaReadOnly: Boolean = false;
    prgPrfIgReadOnly: Boolean = false;
    prgPrfXgReadOnly: Boolean = false;
    rgpssexRg: any[] = [];
    rgethnicityRg: any[] = [];
    rgpsneedsRg: any[] = [];
    rgpsagerangeRg: any[] = [];
    rgpsoffgrpsRg: any[] = [];
    prgprfgdCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprfrcCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprfagCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprffaCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprfigCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprfxgCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    prgprfallInsertList: ProgramServicesProfiles[] = [];
    prgprfallUpdatetList: ProgramServicesProfiles[] = [];
    prgprfallDeleteList: ProgramServicesProfiles[] = [];
    prgprfallCommitModel: ProgramServicesProfilesCommitBean = new ProgramServicesProfilesCommitBean();
    message = ' Invalid.';
    deleteGenderGrid: boolean;
    deleteEtnicityGrid: boolean;
    deleteAgeRangeGrid: boolean;
    deleteFacilityGrid: boolean;
    deleteIncludeGroupGrid: boolean;
    deleteExcludeGroupGrid: boolean;
    saveButtonGo: boolean;
    isTakenAll: any;
    affDisableFlag: boolean;
    constructor(private ocmstoffFactory: OcmstoffService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private refCodeService: ReferenceDomainService) {
        this.prgPrfFaColumnDef = [];
        this.prgPrfIgColumnDef = [];
        this.prgPrfGdColumnDef = [];
        this.prgPrfXgColumnDef = [];
        this.prgPrfRcColumnDef = [];
        this.prgPrfAgColumnDef = [];
    }
    ngOnInit() {
        this.deleteGenderGrid = false;
        this.deleteEtnicityGrid = false;
        this.deleteAgeRangeGrid = false;
        this.deleteFacilityGrid = false;
        this.deleteIncludeGroupGrid = false;
        this.deleteExcludeGroupGrid = false;
        this.affDisableFlag = true;
        this.prgPrfGdColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.gender'), field: 'profileGenderCode',
                editable: true, width: 150, cellEditable: this.canAlertEdit, datatype: 'lov', domain: 'PS_SEX',
            },
        ];
        this.prgPrfRcColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.raceetnicity'), field: 'profileEtiCityCode',
                editable: true, width: 150, cellEditable: this.canAlertEdit, datatype: 'lov', domain: 'ETHNICITY',
            },
        ];
        this.prgPrfAgColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.agerange'), field: 'profileAgeRangeCode',
                editable: true, width: 150, cellEditable: this.canAlertEdit, datatype: 'lov', domain: 'PS_AGE_RANGE',
            },
        ];
        this.prgPrfFaColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.facility'), field: 'profileFacilityCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_FACILITY', cellEditable: this.canAlertEdit
            },

        ];
        this.prgPrfIgColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.includegroup'), field: 'profileInGroupCode', editable: true,
                width: 150, cellEditable: this.canAlertEdit, datatype: 'lov', domain: 'PS_OFF_GRPS'
            },
        ];

        this.prgPrfXgColumnDef = [
            { fieldName: '', field: 'parentField1', hide: true },
            {
                fieldName: this.translateService.translate('ocmstoff.excludegroup'), field: 'profileExGroupCode',
                editable: true, width: 150, cellEditable: this.canAlertEdit, datatype: 'lov', domain: 'PS_OFF_GRPS'
            },
        ];
        this.lovDataRefresh();
        this.lovDataRefreshOne();
        this.lovDataRefreshTwo();
        this.lovDataRefreshFour();
        this.lovDataRefreshFive();
        this.lovDataRefreshSix();
        this.lovDataRefreshOne();
        this.lovDataRefreshOne();
        this.prgprfgdExecuteQuery();
        this.prgprfagExecuteQuery();
        this.prgprfrcExecuteQuery();
        this.prgprffaExecuteQuery();
        this.prgprfigExecuteQuery();
        this.prgprfxgExecuteQuery();
    }
    lovDataRefresh() {
        this.refCodeService.getRefCodes('PS_SEX', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
             let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.itemsCarry = filtetList;
        });
    }
    lovDataRefreshOne() {
        this.refCodeService.getRefCodes('ETHNICITY', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.ethnicityArray = filtetList;
        });
    }
    lovDataRefreshTwo() {
        this.refCodeService.getRefCodes('PS_AGE_RANGE', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.ageArray = filtetList;
        });
    }
    lovDataRefreshFour() {
        this.refCodeService.getRefCodes('PS_FACILITY', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.facilityArray = filtetList;
        });
    }
    lovDataRefreshFive() {
        this.ocmstoffFactory.rgPsOffGrpsRecordGroup().subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.includeArray = JSON.parse(JSON.stringify(filtetList));
        });
    }
    lovDataRefreshSix() {
        this.refCodeService.getRefCodes('PS_OFF_GRPS', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'));
            this.excludeArray = JSON.parse(JSON.stringify(filtetList));
        });
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
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
    onButExitclick() {
        this.dialog.close(null);
    }
    onRowClickprgprfgd(event) {
        if (event) {
            this.prgprfgdModel = event;
            if (this.prgprfgdModel.createDatetime) {
                this.deleteGenderGrid = true;
            } else {
                this.deleteGenderGrid = false;
            }
        }
    }
    onRowClickprgprfrc(event) {
        if (event) {
            this.prgprfrcModel = event;
            if (this.prgprfrcModel.createDatetime) {
                this.deleteEtnicityGrid = true;
            } else {
                this.deleteEtnicityGrid = false;
            }
        }
    }
    onRowClickprgprfag(event) {
        if (event) {
            this.prgprfagModel = event;
            if (this.prgprfagModel.createDatetime) {
                this.deleteAgeRangeGrid = true;
            } else {
                this.deleteAgeRangeGrid = false;
            }
        }
    }
    onRowClickprgprffa(event) {
        if (event) {
            this.prgprffaModel = event;
            if (this.prgprffaModel.createDatetime) {
                this.deleteFacilityGrid = true;
            } else {
                this.deleteFacilityGrid = false;
            }
        }
    }
    onRowClickprgprfig(event) {
        if (event) {
            this.prgprfigModel = event;
            if (this.prgprfigModel.createDatetime) {
                this.deleteIncludeGroupGrid = true;
            } else {
                this.deleteIncludeGroupGrid = false;
            }
        }
    }
    onRowClickprgprfxg(event) {
        if (event) {
            this.prgprfxgModel = event;
            if (this.prgprfxgModel.createDatetime) {
                this.deleteExcludeGroupGrid = true;
            } else {
                this.deleteExcludeGroupGrid = false;
            }
        }
    }
    prgprfgdExecuteQuery() {
        this.prgprfgdModel.programId = this.dialog.data.programId;
        this.prgprfgdModel.programProfileType = 'PS_SEX';
        const prgprfgdResult = this.ocmstoffFactory.prgPrfGdExecuteQuery(this.prgprfgdModel);
        prgprfgdResult.subscribe(prgprfgdResultList => {
            if (prgprfgdResultList.length === 0) {
                this.prgprfgdData = [];
            } else {
                this.prgprfgdData = prgprfgdResultList;
                if (this.itemsCarry.length > 0) {
                    this.itemsCarry.forEach(ele => {
                        this.prgprfgdData.forEach(element => {
                            if (ele.code === element.programProfileCode) {
                                ele.taken = true;
                                ele['createDatetime'] = element.createDatetime;
                                ele['programId'] = element.programId;
                                ele['programProfileType'] = element.programProfileType;
                                ele['programProfileCode'] = element.programProfileCode;
                            }
                        });
                    });
                }
                this.prgprfgdModel = prgprfgdResultList[0];
                this.prgprfgdIndex = 0;
            }
            this.isTakenAll = this.itemsCarry.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }

    /**
    *  This function will be executed when commit event is
    * fired
    */
    ocmstoffSaveprgprfgdForm() {
        this.prgprfgdInsertList = [];
        this.prgprfgdUpdatetList = [];
        this.prgprfgdDeleteList = [];
        this.itemsCarry.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = ele.programId;
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.prgprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = this.dialog.data.programId;
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_SEX';
                this.prgprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        this.ethnicityArray.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = ele.programId;
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.prgprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = this.dialog.data.programId;
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_ETHNICITY';
                this.prgprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        this.ageArray.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = ele.programId;
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.prgprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = this.dialog.data.programId;
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_AGE_RANGE';
                this.prgprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        this.facilityArray.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = ele.programId;
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.prgprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new ProgramServicesProfiles();
                this.prgprfgdBean.programId = this.dialog.data.programId;
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_FACILITY';
                this.prgprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        if (this.includeArray.length > 0) {
            for (let i = 0; i < this.includeArray.length; i++) {
                for (let j = 0; j < this.excludeArray.length; j++) {
                    const flag = this.excludeArray[i].taken ? 'Y' : 'N';
                    const flagOne = this.includeArray[i].taken ? 'Y' : 'N';
                    if (i !== j && (flag === 'Y' && flagOne === 'Y') && this.excludeArray[i].createDatetime ||
                        ((this.includeArray[i].code === this.excludeArray[i].code) && flag === 'Y'
                            && flagOne === 'Y')) {
                        this.show(this.translateService.translate('ocmstoff.inclurowvalidate'), 'warn');
                        return;
                    }
                }
            }
            this.includeArray.forEach(ele => {
                if (ele.createDatetime && !ele.taken) {
                    this.prgprfgdBean = new ProgramServicesProfiles();
                    this.prgprfgdBean.programId = ele.programId;
                    this.prgprfgdBean.programProfileType = ele.programProfileType;
                    this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                    this.prgprfgdDeleteList.push(this.prgprfgdBean);
                } else if (!ele.createDatetime && ele.taken) {
                    this.prgprfgdBean = new ProgramServicesProfiles();
                    this.prgprfgdBean.programId = this.dialog.data.programId;
                    this.prgprfgdBean.programProfileCode = ele.code;
                    this.prgprfgdBean.programProfileType = 'PS_INC_GRP';
                    this.prgprfgdInsertList.push(this.prgprfgdBean);
                }
            });
        }
        if (this.excludeArray.length > 0) {
            for (let i = 0; i < this.excludeArray.length; i++) {
                for (let j = 0; j < this.includeArray.length; j++) {
                    const flag = this.excludeArray[i].taken ? 'Y' : 'N';
                    const flagOne = this.includeArray[i].taken ? 'Y' : 'N';
                    if (i !== j && ((flag === 'Y' && flagOne === 'Y') && this.includeArray[i].createDatetime) ||
                        ((this.excludeArray[i].code === this.includeArray[i].code) && flag === 'Y'
                            && flagOne === 'Y')) {
                        this.show(this.translateService.translate('ocmstoff.exclurowvalidate'), 'warn');
                        return;
                    }
                }
            }
            this.excludeArray.forEach(ele => {
                if (ele.createDatetime && !ele.taken) {
                    this.prgprfgdBean = new ProgramServicesProfiles();
                    this.prgprfgdBean.programId = ele.programId;
                    this.prgprfgdBean.programProfileType = ele.programProfileType;
                    this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                    this.prgprfgdDeleteList.push(this.prgprfgdBean);
                } else if (!ele.createDatetime && ele.taken) {
                    this.prgprfgdBean = new ProgramServicesProfiles();
                    this.prgprfgdBean.programId = this.dialog.data.programId;
                    this.prgprfgdBean.programProfileCode = ele.code;
                    this.prgprfgdBean.programProfileType = 'PS_EXC_GRP';
                    this.prgprfgdInsertList.push(this.prgprfgdBean);
                }
            });
        }
        this.prgprfgdCommitModel.insertList = this.prgprfgdInsertList;
        this.prgprfgdCommitModel.deleteList = this.prgprfgdDeleteList;
        if(this.prgprfgdCommitModel.deleteList.length == 0 && this.prgprfgdCommitModel.insertList.length == 0){
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.clear();
            return;
        }
        const prgprfgdSaveData = this.ocmstoffFactory.prgPrfGdCommit(this.prgprfgdCommitModel);
        prgprfgdSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('PROGRAM_SERVICES_PROFILES_PK') > 0) {
                this.show(this.translateService.translate('ocmstoff.primarykeyviolation'), 'warn');
                this.prgprfgdExecuteQuery();
                return;
            }
            if (data[0] && data[0].sealFlag && data[0].serverCode === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data[0].sealFlag);
                this.show(this.message, 'warn');
                this.prgprfgdExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                if (this.prgprfgdBean.programProfileType === 'PS_SEX') {
                    this.clear();
                } else if (this.prgprfgdBean.programProfileType === 'PS_ETHNICITY') {
                    this.clear();
                } else if (this.prgprfgdBean.programProfileType === 'PS_AGE_RANGE') {
                    this.clear();
                } else if (this.prgprfgdBean.programProfileType === 'PS_FACILITY') {
                    this.clear();
                } else if (this.prgprfgdBean.programProfileType === 'PS_INC_GRP') {
                    this.clear();
                } else if (this.prgprfgdBean.programProfileType === 'PS_EXC_GRP') {
                    this.clear();
                }
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.clear();
                return;
            }
        });

    }

    prgprfrcExecuteQuery() {
        this.prgprfrcModel.programId = this.dialog.data.programId;
        this.prgprfrcModel.programProfileType = 'PS_ETHNICITY';
        const prgprfrcResult = this.ocmstoffFactory.prgPrfRcExecuteQuery(this.prgprfrcModel);
        prgprfrcResult.subscribe(prgprfrcResultList => {
            if (prgprfrcResultList.length === 0) {
                this.prgprfrcData = [];
            } else {
                this.prgprfrcData = prgprfrcResultList;
                this.ethnicityArray.forEach(ele => {
                    this.prgprfrcData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programId'] = element.programId;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
                this.prgprfrcModel = prgprfrcResultList[0];
                this.prgprfrcIndex = 0;
            }
            this.ethTakenAll = this.ethnicityArray.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    prgprfagExecuteQuery() {
        this.prgprfagModel.programId = this.dialog.data.programId;
        this.prgprfagModel.programProfileType = 'PS_AGE_RANGE';
        const prgprfagResult = this.ocmstoffFactory.prgPrfAgExecuteQuery(this.prgprfagModel);
        prgprfagResult.subscribe(prgprfagResultList => {
            if (prgprfagResultList.length === 0) {
                this.prgprfagData = [];
            } else {
                this.prgprfagData = prgprfagResultList;
                this.ageArray.forEach(ele => {
                    this.prgprfagData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programId'] = element.programId;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.ageTakenAll = this.ageArray.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    prgprffaExecuteQuery() {
        this.prgprffaModel.programId = this.dialog.data.programId;
        this.prgprffaModel.programProfileType = 'PS_FACILITY';
        const prgprffaResult = this.ocmstoffFactory.prgPrfFaExecuteQuery(this.prgprffaModel);
        prgprffaResult.subscribe(prgprffaResultList => {
            if (prgprffaResultList.length === 0) {
                this.prgprffaData = [];
            } else {
                this.prgprffaData = prgprffaResultList;
                this.facilityArray.forEach(ele => {
                    this.prgprffaData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programId'] = element.programId;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.facTakenAll = this.facilityArray.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    prgprfigExecuteQuery() {
        this.prgprfigModel.programId = this.dialog.data.programId;
        this.prgprfigModel.programProfileType = 'PS_INC_GRP';
        setTimeout(() => {
        const prgprfigResult = this.ocmstoffFactory.prgPrfIgExecuteQuery(this.prgprfigModel);
        prgprfigResult.subscribe(prgprfigResultList => {
            if (prgprfigResultList.length === 0) {
                this.prgprfigData = [];
            } else {
                this.prgprfigData = prgprfigResultList;
                this.includeArray.forEach(ele => {
                    this.prgprfigData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programId'] = element.programId;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
                this.prgprfigModel = prgprfigResultList[0];
                this.prgprfigIndex = 0;
            }
            this.inTakenAll = this.includeArray.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }, 100);
    }
    prgprfxgExecuteQuery() {
        this.prgprfxgModel.programId = this.dialog.data.programId;
        this.prgprfxgModel.programProfileType = 'PS_EXC_GRP';
        const prgprfxgResult = this.ocmstoffFactory.prgPrfXgExecuteQuery(this.prgprfxgModel);
        prgprfxgResult.subscribe(prgprfxgResultList => {
            if (prgprfxgResultList.length === 0) {
                this.prgprfxgData = [];
            } else {
                this.prgprfxgData = prgprfxgResultList;
                this.excludeArray.forEach(ele => {
                    this.prgprfxgData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programId'] = element.programId;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
                this.prgprfxgModel = prgprfxgResultList[0];
                this.prgprfxgIndex = 0;
            }
            this.exTakenAll = this.excludeArray.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    executeQueryCall() {
        this.prgprfgdExecuteQuery();
        this.prgprfrcExecuteQuery();
        this.prgprfagExecuteQuery();
        this.prgprffaExecuteQuery();
        this.prgprfigExecuteQuery();
        this.prgprfxgExecuteQuery();
    }
    allTakenOut(event: any, element: string) {
        this[element].forEach(data => data.taken = event);
        this.affDisableFlag = false;
    }
    itemTakenOut(event: any, item: string, element: string) {
        this[element] = this[item].every(data => data.taken);
        this.affDisableFlag = false;
    }
    someSelected(event: string, element: string) {
        return this[event] && this[event].some(data => data.taken) && !this[element];
    }
    onContainerClick(event: any, element: any) {
        if (element && event && event.target.classList.contains('allBox')) {
            element.click();
        }
    }
    clear() {
        this.lovDataRefresh();
        this.lovDataRefreshOne();
        this.lovDataRefreshTwo();
        this.lovDataRefreshFour();
        this.lovDataRefreshFive();
        this.lovDataRefreshSix();
        this.lovDataRefreshOne();
        this.lovDataRefreshOne();
        this.prgprfgdExecuteQuery();
        this.prgprfagExecuteQuery();
        this.prgprfrcExecuteQuery();
        this.prgprffaExecuteQuery();
        this.prgprfigExecuteQuery();
        this.prgprfxgExecuteQuery();
        this.affDisableFlag = true;
    }
}

