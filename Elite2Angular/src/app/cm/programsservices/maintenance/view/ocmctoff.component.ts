import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmctoffService } from '@cm/programsservices/maintenance/service/ocmctoff.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivityProfiles } from '@cm/programsservices/maintenance/beans/CourseActivityProfiles';
import { CourseActivityProfilesCommitBean } from '@cm/programsservices/maintenance/beans/CourseActivityProfilesCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { OcmstoffService } from '@inst/institutional-activities/maintenance/service/ocmstoff.service';
// import required bean declarations

@Component({
    selector: 'app-ocmctoff',
    templateUrl: './ocmctoff.component.html',
    styleUrls: ['./ocmctoff.component.scss']
})

export class OcmctoffComponent implements OnInit {
    @ViewChild('ocmctoffDialog', {static: true}) ocmctoffDialog: DialogComponent;
    @ViewChild('genderGrid', {static: true}) genderGrid: any;
    @ViewChild('raceGrid', {static: true}) raceGrid: any;
    @ViewChild('ageGrid', {static: true}) ageGrid: any;
    @ViewChild('facilityGrid', {static: true}) facilityGrid: any;
    @ViewChild('includGrpGrid', {static: true}) includGrpGrid: any;
    @ViewChild('excludGrpGrid', {static: true}) excludGrpGrid: any;
    // Variable declaration
    msgs: any[] = [];
    prgprfgdBean: CourseActivityProfiles = new CourseActivityProfiles();
    crprfgdData: CourseActivityProfiles[] = [];
    crprfgdModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprfgdInsertList: CourseActivityProfiles[] = [];
    crprfgdUpdatetList: CourseActivityProfiles[] = [];
    crprfgdDeleteList: CourseActivityProfiles[] = [];
    crprfrcData: CourseActivityProfiles[] = [];
    crprfgdCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprfrcCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprfagCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprffaCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprfigCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprfxgCommitModel: CourseActivityProfilesCommitBean = new CourseActivityProfilesCommitBean();
    crprfrcModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprfrcInsertList: CourseActivityProfiles[] = [];
    crprfrcUpdatetList: CourseActivityProfiles[] = [];
    crprfrcDeleteList: CourseActivityProfiles[] = [];
    crprfagData: CourseActivityProfiles[] = [];
    crprfagModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprfagInsertList: CourseActivityProfiles[] = [];
    crprfagUpdatetList: CourseActivityProfiles[] = [];
    crprfagDeleteList: CourseActivityProfiles[] = [];
    crprffaData: CourseActivityProfiles[] = [];
    crprffaModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprffaInsertList: CourseActivityProfiles[] = [];
    crprffaUpdatetList: CourseActivityProfiles[] = [];
    crprffaDeleteList: CourseActivityProfiles[] = [];
    crprfigData: CourseActivityProfiles[] = [];
    crprfigModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprfigInsertList: CourseActivityProfiles[] = [];
    crprfigUpdatetList: CourseActivityProfiles[] = [];
    crprfigDeleteList: CourseActivityProfiles[] = [];
    crprfxgData: CourseActivityProfiles[] = [];
    crprfxgModel: CourseActivityProfiles = new CourseActivityProfiles();
    crprfxgInsertList: CourseActivityProfiles[] = [];
    crprfxgUpdatetList: CourseActivityProfiles[] = [];
    crprfxgDeleteList: CourseActivityProfiles[] = [];
    crPrfAgColumnDef: any[];
    crPrfRcColumnDef: any[];
    crPrfXgColumnDef: any[];
    crPrfGdColumnDef: any[];
    crPrfIgColumnDef: any[];
    crPrfFaColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    isGenderAll: any;
    isRaceAll: any;
    isAgeAll: any;
    isExcludeAll: any;
    isIncludeAll: any;
    isFacilityAll: any;
    enableGenderGridInsert: boolean;
    enableGenderGridDelete: boolean;
    genderGridIndex = 0;
    enableRaceGridInsert: boolean;
    enableRaceGridDelete: boolean;
    raceGridIndex = 0;
    enableAgeGridInsert: boolean;
    enableAgeGridDelete: boolean;
    ageGridIndex = 0;
    enableFacilityGridInsert: boolean;
    enableFacilityGridDelete: boolean;
    facilityGridIndex = 0;
    enableIncludeGridInsert: boolean;
    enableIncludeGridDelete: boolean;
    includeGridIndex = 0;
    enableExcludeGridInsert: boolean;
    enableExcludeGridDelete: boolean;
    excludeGridIndex = 0;
    programProfileType: string;
    itemsCarry: any;
    genderList: any[];
    ethnicityList: any[];
    includeList: any[];
    excludeList: any[];
    ageList: any[];
    facilityList: any[];
    affDisableFlag: boolean;
    readOnly: boolean;
    constructor(private refCodeService: ReferenceDomainService,
        private ocmctoffFactory: OcmctoffService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private ocmstoffFactory: OcmstoffService) {
        this.crPrfAgColumnDef = [];
        this.crPrfRcColumnDef = [];
        this.crPrfXgColumnDef = [];
        this.crPrfGdColumnDef = [];
        this.crPrfIgColumnDef = [];
        this.crPrfFaColumnDef = [];
    }
    ngOnInit() {
        if (this.ocmctoffDialog.data.readOnlyFlag) {
            this.readOnly = this.ocmctoffDialog.data.readOnlyFlag;
        } else {
            this.readOnly = false;
        }
        this.enableGenderGridInsert = true;
        this.enableGenderGridDelete = false;
        this.enableRaceGridInsert = true;
        this.enableRaceGridDelete = false;
        this.enableAgeGridInsert = true;
        this.enableAgeGridDelete = false;
        this.enableFacilityGridInsert = true;
        this.enableFacilityGridDelete = false;
        this.enableIncludeGridInsert = true;
        this.enableIncludeGridDelete = false;
        this.enableExcludeGridInsert = true;
        this.enableExcludeGridDelete = false;
        this.crprfxgModel = this.ocmctoffDialog.data;
        this.crprfgdModel = this.ocmctoffDialog.data;
        this.crprfrcModel = this.ocmctoffDialog.data;
        this.crprfagModel = this.ocmctoffDialog.data;
        this.crprffaModel = this.ocmctoffDialog.data;
        this.crprfigModel = this.ocmctoffDialog.data;
        this.affDisableFlag = true;
        this.crPrfAgColumnDef = [
            {
                fieldName: this.translateService.translate('ocmctoff.agerange'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_AGE_RANGE', cellEditable: this.canFieldsEdit
            },
        ];
        this.crPrfRcColumnDef = [
            {
                fieldName: this.translateService.translate('ocmctoff.raceorethinicity'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'ETHNICITY', cellEditable: this.canFieldsEdit
            },
        ];
        this.crPrfXgColumnDef = [
            {
                fieldName: this.translateService.translate('ocmctoff.excludegroup'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_OFF_GRPS', cellEditable: this.canFieldsEdit
            },
        ];
        this.crPrfGdColumnDef = [
            {
                fieldName: this.translateService.translate('common.gender'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_SEX', cellEditable: this.canFieldsEdit
            },
        ];
        this.crPrfIgColumnDef = [
            {
                fieldName: this.translateService.translate('ocmctoff.includegroup'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_OFF_GRPS', cellEditable: this.canFieldsEdit
            },
        ];
        this.crPrfFaColumnDef = [
            {
                fieldName: this.translateService.translate('ocmctoff.facility'), field: 'programProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_FACILITY', cellEditable: this.canFieldsEdit
            },
        ];
        this.getMasterData();
        this.getMasterDataOne();
        this.getMasterDataTwo();
        this.getMasterDataThree();
        this.getMasterDataFour();
        this.getMasterDataFive();
        this.crprfgdExecuteQuery();
        this.crprfrcExecuteQuery();
        this.crprfagExecuteQuery();
        this.crprffaExecuteQuery();
        this.crprfigExecuteQuery();
        this.crprfxgExecuteQuery();
    }
    getMasterData() {
        this.refCodeService.getRefCodes('PS_SEX', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.genderList = filtetList;
        });
    }
    getMasterDataOne() {
        this.refCodeService.getRefCodes('ETHNICITY', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.ethnicityList = filtetList;
        });
    }
    getMasterDataTwo() {
        this.refCodeService.getRefCodes('PS_AGE_RANGE', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.ageList = filtetList;
        });
    }
    getMasterDataThree() {
        this.refCodeService.getRefCodes('PS_FACILITY', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.facilityList = filtetList;
        });
    }
    getMasterDataFour() {
        this.refCodeService.getRefCodes('PS_OFF_GRPS', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.includeList = JSON.parse(JSON.stringify(filtetList));
        });
    }
    getMasterDataFive() {
        this.refCodeService.getRefCodes('PS_OFF_GRPS', '').subscribe(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    element['taken'] = false;
                    element['createDatetime'] = undefined;
                });
            }
            let filtetList = data.filter(item => !(item.activeFlag==='N'))
            this.excludeList = JSON.parse(JSON.stringify(filtetList));
        });
    }
    canFieldsEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    /**
       * This function displays the messages
       */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    crprfgdExecuteQuery() {
        this.crprfgdModel.sealFlag = 'PS_SEX';
        const crprfgdResult = this.ocmctoffFactory.crPrfGdExecuteQuery(this.crprfgdModel);
        crprfgdResult.subscribe(crprfgdResultList => {
            if (crprfgdResultList.length === 0) {
                this.crprfgdData = [];
            } else {
                this.crprfgdData = crprfgdResultList;
                this.genderList.forEach(ele => {
                    this.crprfgdData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isGenderAll = this.genderList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmctoffSavecrprfgdForm(event) {
        if (!this.validateGenderGridSave()) {
            return;
        }
        this.crprfgdInsertList = event.added;
        this.crprfgdUpdatetList = event.updated;
        this.crprfgdDeleteList = event.removed;
        this.crprfgdCommitModel.insertList = [];
        this.crprfgdCommitModel.updateList = [];
        this.crprfgdCommitModel.deleteList = [];
        this.crprfgdCommitModel.sealFlag = 'PS_SEX';
        if (this.crprfgdInsertList.length > 0 || this.crprfgdUpdatetList.length > 0) {
            for (let i = 0; i < this.crprfgdInsertList.length; i++) {
                if (!this.crprfgdInsertList[i].programProfileCode) {
                    return;
                }
                this.crprfgdInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprfgdCommitModel.insertList = this.crprfgdInsertList;
            }
            for (let i = 0; i < this.crprfgdUpdatetList.length; i++) {
                this.crprfgdCommitModel.updateList = this.crprfgdUpdatetList;
            }
        }
        if (this.crprfgdDeleteList.length > 0) {
            for (let i = 0; i < this.crprfgdDeleteList.length; i++) {
                this.crprfgdCommitModel.deleteList = this.crprfgdDeleteList;
            }
        }
        const crprfgdSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfgdCommitModel);
        crprfgdSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprfgdExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }

    saveData() {
        this.crprfgdInsertList = [];
        this.crprfgdDeleteList = [];
        this.genderList.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.crprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_SEX';
                this.crprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        this.ethnicityList.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.crprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_ETHNICITY';
                this.crprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        if (this.includeList.length > 0) {
            for (let i = 0; i < this.includeList.length; i++) {
                for (let j = 0; j < this.excludeList.length; j++) {
                    const flag = this.excludeList[i].taken ? 'Y' : 'N';
                    const flagOne = this.includeList[i].taken ? 'Y' : 'N';
                    if (i !== j && (flag === 'Y' && flagOne === 'Y') && this.excludeList[i].createDatetime ||
                        ((this.includeList[i].code === this.excludeList[i].code) && flag === 'Y'
                            && flagOne === 'Y')) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmctoff.alreadyExistedInExcludeGrp');
                        this.show();
                        return;
                    }
                }
            }
            this.includeList.forEach(ele => {
                if (ele.createDatetime && !ele.taken) {
                    this.prgprfgdBean = new CourseActivityProfiles();
                    this.prgprfgdBean.programProfileType = ele.programProfileType;
                    this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                    this.crprfgdDeleteList.push(this.prgprfgdBean);
                } else if (!ele.createDatetime && ele.taken) {
                    this.prgprfgdBean = new CourseActivityProfiles();
                    this.prgprfgdBean.programProfileCode = ele.code;
                    this.prgprfgdBean.programProfileType = 'PS_INC_GRP';
                    this.crprfgdInsertList.push(this.prgprfgdBean);
                }
            });
        }
        if (this.excludeList.length > 0) {
            for (let i = 0; i < this.excludeList.length; i++) {
                for (let j = 0; j < this.includeList.length; j++) {
                    const flag = this.excludeList[i].taken ? 'Y' : 'N';
                    const flagOne = this.includeList[i].taken ? 'Y' : 'N';
                    if (i !== j && ((flag === 'Y' && flagOne === 'Y') && this.includeList[i].createDatetime) ||
                        ((this.excludeList[i].code === this.includeList[i].code) && flag === 'Y'
                            && flagOne === 'Y')) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('ocmctoff.alreadyExistedInIncludeGrp');
                        this.show();
                        return;
                    }
                }
            }
            this.excludeList.forEach(ele => {
                if (ele.createDatetime && !ele.taken) {
                    this.prgprfgdBean = new CourseActivityProfiles();
                    this.prgprfgdBean.programProfileType = ele.programProfileType;
                    this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                    this.crprfgdDeleteList.push(this.prgprfgdBean);
                } else if (!ele.createDatetime && ele.taken) {
                    this.prgprfgdBean = new CourseActivityProfiles();
                    this.prgprfgdBean.programProfileCode = ele.code;
                    this.prgprfgdBean.programProfileType = 'PS_EXC_GRP';
                    this.crprfgdInsertList.push(this.prgprfgdBean);
                }
            });
        }
        this.ageList.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.crprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_AGE_RANGE';
                this.crprfgdInsertList.push(this.prgprfgdBean);
            }
        });

        this.facilityList.forEach(ele => {
            if (ele.createDatetime && !ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileType = ele.programProfileType;
                this.prgprfgdBean.programProfileCode = ele.programProfileCode;
                this.crprfgdDeleteList.push(this.prgprfgdBean);
            } else if (!ele.createDatetime && ele.taken) {
                this.prgprfgdBean = new CourseActivityProfiles();
                this.prgprfgdBean.programProfileCode = ele.code;
                this.prgprfgdBean.programProfileType = 'PS_FACILITY';
                this.crprfgdInsertList.push(this.prgprfgdBean);
            }
        });
        this.crprfgdInsertList.forEach(ele => ele.crsActyId = this.crprfagModel.crsActyId);
        this.crprfgdDeleteList.forEach(ele => ele.crsActyId = this.crprfagModel.crsActyId);
        this.crprfgdCommitModel.insertList = this.crprfgdInsertList;
        this.crprfgdCommitModel.deleteList = this.crprfgdDeleteList;
        if(this.crprfgdCommitModel.deleteList.length == 0 && this.crprfgdCommitModel.insertList.length == 0){
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.clear();
            return;
        }
        const crprfgdSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfgdCommitModel);
        crprfgdSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
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
                this.show();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.clear();
                return;
            }
        });
    }
    crprfrcExecuteQuery() {
        this.crprfrcModel.sealFlag = 'PS_ETHNICITY';
        const crprfrcResult = this.ocmctoffFactory.crPrfGdExecuteQuery(this.crprfrcModel);
        crprfrcResult.subscribe(crprfrcResultList => {
            if (crprfrcResultList.length === 0) {
                this.crprfrcData = [];
            } else {
                this.crprfrcData = crprfrcResultList;
                this.ethnicityList.forEach(ele => {
                    this.crprfrcData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isRaceAll = this.ethnicityList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    ocmctoffSavecrprfrcForm(event) {
        if (!this.validateRaceGridSave()) {
            return;
        }
        this.crprfrcInsertList = event.added;
        this.crprfrcUpdatetList = event.updated;
        this.crprfrcDeleteList = event.removed;
        this.crprfrcCommitModel.insertList = [];
        this.crprfrcCommitModel.updateList = [];
        this.crprfrcCommitModel.deleteList = [];
        this.crprfrcCommitModel.sealFlag = 'PS_ETHNICITY';
        if (this.crprfrcInsertList.length > 0 || this.crprfrcUpdatetList.length > 0) {
            for (let i = 0; i < this.crprfrcInsertList.length; i++) {
                if (!this.crprfrcInsertList[i].programProfileCode) {
                    return;
                }
                this.crprfrcInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprfrcCommitModel.insertList = this.crprfrcInsertList;
            }
            for (let i = 0; i < this.crprfrcUpdatetList.length; i++) {
                this.crprfrcCommitModel.updateList = this.crprfrcUpdatetList;
            }
        }
        if (this.crprfrcDeleteList.length > 0) {
            for (let i = 0; i < this.crprfrcDeleteList.length; i++) {
                this.crprfrcCommitModel.deleteList = this.crprfrcDeleteList;
            }
        }
        const crprfrcSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfrcCommitModel);
        crprfrcSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprfrcExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    crprfagExecuteQuery() {
        this.crprfagModel.sealFlag = 'PS_AGE_RANGE';
        const crprfagResult = this.ocmctoffFactory.
            crPrfGdExecuteQuery(this.crprfagModel);
        crprfagResult.subscribe(crprfagResultList => {
            if (crprfagResultList.length === 0) {
                this.crprfagData = [];
            } else {
                this.crprfagData = crprfagResultList;
                this.ageList.forEach(ele => {
                    this.crprfagData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isAgeAll = this.ageList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    ocmctoffSavecrprfagForm(event) {
        if (!this.validateAgeGridSave()) {
            return;
        }
        this.crprfagInsertList = event.added;
        this.crprfagUpdatetList = event.updated;
        this.crprfagDeleteList = event.removed;
        this.crprfagCommitModel.insertList = [];
        this.crprfagCommitModel.updateList = [];
        this.crprfagCommitModel.deleteList = [];
        this.crprfagCommitModel.sealFlag = 'PS_AGE_RANGE';
        if (this.crprfagInsertList.length > 0 || this.crprfagUpdatetList.length > 0) {
            for (let i = 0; i < this.crprfagInsertList.length; i++) {
                if (!this.crprfagInsertList[i].programProfileCode) {
                    return;
                }
                this.crprfagInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprfagCommitModel.insertList = this.crprfagInsertList;
            }
            for (let i = 0; i < this.crprfagUpdatetList.length; i++) {
                this.crprfagCommitModel.updateList = this.crprfagUpdatetList;
            }
        }
        if (this.crprfagDeleteList.length > 0) {
            for (let i = 0; i < this.crprfagDeleteList.length; i++) {
                this.crprfagCommitModel.deleteList = this.crprfagDeleteList;
            }
        }
        const crprfagSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfagCommitModel);
        crprfagSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprfagExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    crprffaExecuteQuery() {
        this.crprffaModel.sealFlag = 'PS_FACILITY';
        const crprffaResult = this.ocmctoffFactory.
            crPrfGdExecuteQuery(this.crprffaModel);
        crprffaResult.subscribe(crprffaResultList => {
            if (crprffaResultList.length === 0) {
                this.crprffaData = [];
            } else {
                this.crprffaData = crprffaResultList;
                this.facilityList.forEach(ele => {
                    this.crprffaData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isFacilityAll = this.facilityList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    ocmctoffSavecrprffaForm(event) {
        if (!this.validateFacilityGridSave()) {
            return;
        }
        this.crprffaInsertList = event.added;
        this.crprffaUpdatetList = event.updated;
        this.crprffaDeleteList = event.removed;
        this.crprffaCommitModel.insertList = [];
        this.crprffaCommitModel.updateList = [];
        this.crprffaCommitModel.deleteList = [];
        this.crprffaCommitModel.sealFlag = 'PS_FACILITY';
        if (this.crprffaInsertList.length > 0 || this.crprffaUpdatetList.length > 0) {
            for (let i = 0; i < this.crprffaInsertList.length; i++) {
                if (!this.crprffaInsertList[i].programProfileCode) {
                    return;
                }
                this.crprffaInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprffaCommitModel.insertList = this.crprffaInsertList;
            }
            for (let i = 0; i < this.crprffaUpdatetList.length; i++) {
                this.crprffaCommitModel.updateList = this.crprffaUpdatetList;
            }
        }
        if (this.crprffaDeleteList.length > 0) {
            for (let i = 0; i < this.crprffaDeleteList.length; i++) {
                this.crprffaCommitModel.deleteList = this.crprffaDeleteList;
            }
        }
        const crprffaSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprffaCommitModel);
        crprffaSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprffaExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    crprfigExecuteQuery() {
        this.crprfigModel.sealFlag = 'includeGrp';
        const crprfigResult = this.ocmctoffFactory.
            crPrfGdExecuteQuery(this.crprfigModel);
        crprfigResult.subscribe(crprfigResultList => {
            if (crprfigResultList.length === 0) {
                this.crprfigData = [];
            } else {
                this.crprfigData = crprfigResultList;
                this.includeList.forEach(ele => {
                    this.crprfigData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isIncludeAll = this.includeList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    ocmctoffSavecrprrfigForm(event) {
        if (!this.validateIncludeGrpGridSave()) {
            return;
        }
        this.crprfigInsertList = event.added;
        this.crprfigUpdatetList = event.updated;
        this.crprfigDeleteList = event.removed;
        this.crprfigCommitModel.insertList = [];
        this.crprfigCommitModel.updateList = [];
        this.crprfigCommitModel.deleteList = [];
        this.crprfigCommitModel.sealFlag = 'includeGrp';
        if (this.crprfigInsertList.length > 0 || this.crprfigUpdatetList.length > 0) {
            for (let i = 0; i < this.crprfigInsertList.length; i++) {
                if (!this.crprfigInsertList[i].programProfileCode) {
                    return;
                }
                this.crprfigInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprfigCommitModel.insertList = this.crprfigInsertList;
            }
            for (let i = 0; i < this.crprfigUpdatetList.length; i++) {
                this.crprfigCommitModel.updateList = this.crprfigUpdatetList;
            }
        }
        if (this.crprfigDeleteList.length > 0) {
            for (let i = 0; i < this.crprfigDeleteList.length; i++) {
                this.crprfigCommitModel.deleteList = this.crprfigDeleteList;
            }
        }
        const crprfigSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfigCommitModel);
        crprfigSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprfigExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    crprfxgExecuteQuery() {
        this.crprfxgModel.sealFlag = 'excludeGrp';
        const crprfxgResult = this.ocmctoffFactory.
            crPrfGdExecuteQuery(this.crprfxgModel);
        crprfxgResult.subscribe(crprfxgResultList => {
            if (crprfxgResultList.length === 0) {
                this.crprfxgData = [];
            } else {
                this.crprfxgData = crprfxgResultList;
                this.excludeList.forEach(ele => {
                    this.crprfxgData.forEach(element => {
                        if (ele.code === element.programProfileCode) {
                            ele.taken = true;
                            ele['createDatetime'] = element.createDatetime;
                            ele['programProfileType'] = element.programProfileType;
                            ele['programProfileCode'] = element.programProfileCode;
                        }
                    });
                });
            }
            this.isExcludeAll = this.excludeList.every(ele => ele.taken);
            this.affDisableFlag = true;
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmctoffSavecrprfxgForm(event) {
        if (!this.validateExcludeGrpGridSave()) {
            return;
        }
        this.crprfxgInsertList = event.added;
        this.crprfxgUpdatetList = event.updated;
        this.crprfxgDeleteList = event.removed;
        this.crprfxgCommitModel.insertList = [];
        this.crprfxgCommitModel.updateList = [];
        this.crprfxgCommitModel.sealFlag = 'excludeGrp';
        if (this.crprfxgInsertList.length > 0 || this.crprfxgUpdatetList.length > 0) {
            for (let i = 0; i < this.crprfxgInsertList.length; i++) {
                if (!this.crprfxgInsertList[i].programProfileCode) {
                    return;
                }
                this.crprfxgInsertList[i].crsActyId = this.crprfagModel.crsActyId;
                this.crprfxgCommitModel.insertList = this.crprfxgInsertList;
            }
            for (let i = 0; i < this.crprfxgUpdatetList.length; i++) {
                this.crprfxgCommitModel.updateList = this.crprfxgUpdatetList;
            }
        }
        if (this.crprfxgDeleteList.length > 0) {
            for (let i = 0; i < this.crprfxgDeleteList.length; i++) {
                this.crprfxgCommitModel.deleteList = this.crprfxgDeleteList;
            }
        }
        const crprfxgSaveData = this.ocmctoffFactory.crPrfGdCommit(this.crprfxgCommitModel);
        crprfxgSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.crprfxgExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    onButExitclick() {
        this.ocmctoffDialog.close(null);
    }
    validateGenderGridSave() {
        const is = { valid: true };
        this.crprfgdData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprfgdData.length; i++) {
                    for (let j = 0; j < this.crprfgdData.length; j++) {
                        if (i !== j && (this.crprfgdData[i].programProfileCode === this.crprfgdData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateRaceGridSave() {
        const is = { valid: true };
        this.crprfrcData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprfrcData.length; i++) {
                    for (let j = 0; j < this.crprfrcData.length; j++) {
                        if (i !== j && (this.crprfrcData[i].programProfileCode === this.crprfrcData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateAgeGridSave() {
        const is = { valid: true };
        this.crprfagData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprfagData.length; i++) {
                    for (let j = 0; j < this.crprfagData.length; j++) {
                        if (i !== j && (this.crprfagData[i].programProfileCode === this.crprfagData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateFacilityGridSave() {
        const is = { valid: true };
        this.crprffaData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprffaData.length; i++) {
                    for (let j = 0; j < this.crprffaData.length; j++) {
                        if (i !== j && (this.crprffaData[i].programProfileCode === this.crprffaData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateIncludeGrpGridSave() {
        const is = { valid: true };
        this.crprfigData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprfigData.length; i++) {
                    for (let j = 0; j < this.crprfigData.length; j++) {
                        if (i !== j && (this.crprfigData[i].programProfileCode === this.crprfigData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
                for (let i = 0; i < this.crprfigData.length; i++) {
                    for (let j = 0; j < this.crprfxgData.length; j++) {
                        if (i !== j && (this.crprfigData[i].programProfileCode === this.crprfxgData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.alreadyExistedInExcludeGrp');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    validateExcludeGrpGridSave() {
        const is = { valid: true };
        this.crprfxgData.forEach(data => {
            if (is.valid) {
                for (let i = 0; i < this.crprfxgData.length; i++) {
                    for (let j = 0; j < this.crprfxgData.length; j++) {
                        if (i !== j && (this.crprfxgData[i].programProfileCode === this.crprfxgData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.duplicaterows');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
                for (let i = 0; i < this.crprfxgData.length; i++) {
                    for (let j = 0; j < this.crprfigData.length; j++) {
                        if (i !== j && (this.crprfxgData[i].programProfileCode === this.crprfigData[j].programProfileCode)) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocmctoff.alreadyExistedInIncludeGrp');
                            this.show();
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    onRowClickprgprfgd(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableGenderGridDelete = true;
            } else {
                this.enableGenderGridDelete = false;
            }
        }
    }
    onRowClickprgprfrc(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableRaceGridDelete = true;
            } else {
                this.enableRaceGridDelete = false;
            }
        }
    }
    onRowClickprgprfag(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableAgeGridDelete = true;
            } else {
                this.enableAgeGridDelete = false;
            }
        }
    }
    onRowClickprgprffa(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableFacilityGridDelete = true;
            } else {
                this.enableFacilityGridDelete = false;
            }
        }
    }
    onRowClickprgprfig(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableIncludeGridDelete = true;
            } else {
                this.enableIncludeGridDelete = false;
            }
        }
    }
    onRowClickprgprfxg(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableExcludeGridDelete = true;
            } else {
                this.enableExcludeGridDelete = false;
            }
        }
    }
    onGenderGridInsert = () => {
        for (let i = 0; i < this.crprfgdData.length; i++) {
            if (!this.crprfgdData[i].programProfileCode) {
                return false;
            }
        }
        return {};
    }
    onRaceGridInsert = () => {
        for (let i = 0; i < this.crprfrcData.length; i++) {
            if (!this.crprfrcData[i].programProfileCode) {
                return false;
            }
        }
        return {};
    }
    onAgeGridInsert = () => {
        for (let i = 0; i < this.crprfagData.length; i++) {
            if (!this.crprfagData[i].programProfileCode) {
                return false;
            }
        }
        return {};
    }
    onFacilityGridInsert = () => {
        for (let i = 0; i < this.crprffaData.length; i++) {
            if (!this.crprffaData[i].programProfileCode) {
                return false;
            }
        }
        return {};
    }
    onIncludeGrpGridInsert = () => {
        for (let i = 0; i < this.crprfigData.length; i++) {
            if (!this.crprfigData[i].programProfileCode) {
                return false;
            }
        }
        return {};
    }
    onExcludeGrpGridInsert = () => {
        for (let i = 0; i < this.crprfxgData.length; i++) {
            if (!this.crprfxgData[i].programProfileCode) {
                return false;
            }
        }
        return {};
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
        this.getMasterData();
        this.getMasterDataOne();
        this.getMasterDataTwo();
        this.getMasterDataThree();
        this.getMasterDataFour();
        this.getMasterDataFive();
        this.crprfgdExecuteQuery();
        this.crprfrcExecuteQuery();
        this.crprfagExecuteQuery();
        this.crprffaExecuteQuery();
        this.crprfigExecuteQuery();
        this.crprfxgExecuteQuery();
        this.affDisableFlag = true;
    }
}
