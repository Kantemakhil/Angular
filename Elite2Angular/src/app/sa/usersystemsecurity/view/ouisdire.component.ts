import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuisdireService } from '@sa/usersystemsecurity/service/ouisdire.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffSkills } from '@sa/usersystemsecurity/beans/StaffSkills';
import { VMemberSkills } from '@sa/usersystemsecurity/beans/VMemberSkills';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { VMemberSkillsCommitBean } from '@sa/usersystemsecurity/beans/VMemberSkillsCommitBean';
import { StaffSkillsCommitBean } from '@sa/usersystemsecurity/beans/StaffSkillsCommitBean';
import { Phones } from '@sa/usersystemsecurity/beans/Phones';
import { InternetAddresses } from '@sa/usersystemsecurity/beans/InternetAddresses';
// import required bean declarations

@Component({
    selector: 'app-ouisdire',
    templateUrl: './ouisdire.component.html'
})

export class OuisdireComponent implements OnInit {
    // Variable declaration
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vms1Data: VMemberSkills[] = [];
    vmsModel: VMemberSkills = new VMemberSkills();
    vms1Model: VMemberSkills = new VMemberSkills();
    vms1InsertList: VMemberSkills[] = [];
    vms1UpdatetList: VMemberSkills[] = [];
    vms1DeleteList: VMemberSkills[] = [];
    stskData: StaffSkills[] = [];
    stskModel: StaffSkills = new StaffSkills();
    stskInsertList: StaffSkills[] = [];
    stskUpdatetList: StaffSkills[] = [];
    stskDeleteList: StaffSkills[] = [];
    hmphoneData: Phones[] = [];
    hmphoneDataTemp: Phones[] = [];
    hmphoneModel: Phones = new Phones();
    hmphoneIndex: Number = 0;
    hmphoneInsertList: Phones[] = [];
    hmphoneUpdatetList: Phones[] = [];
    hmphoneDeleteList: Phones[] = [];
    bsphoneData: Phones[] = [];
    bsphoneDataTemp: Phones[] = [];
    bsphoneModel: Phones = new Phones();
    bsphoneIndex: Number = 0;
    bsphoneInsertList: Phones[] = [];
    bsphoneUpdatetList: Phones[] = [];
    bsphoneDeleteList: Phones[] = [];
    emailData: InternetAddresses[] = [];
    emailDataTemp: InternetAddresses[] = [];
    emailModel: InternetAddresses = new InternetAddresses();
    emailIndex: Number = 0;
    emailInsertList: InternetAddresses[] = [];
    emailUpdatetList: InternetAddresses[] = [];
    emailDeleteList: InternetAddresses[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    vms1ColumnDef: any[];
    stskColumnDef: any[];
    vmsReadOnly: Boolean = false;
    vms1ReadOnly: Boolean = false;
    stskReadOnly: Boolean = false;
    hmPhoneReadOnly: Boolean = false;
    bsPhoneReadOnly: Boolean = false;
    emailReadOnly: Boolean = false;
    nomregionrgRg: any[] = [];
    cgfkStskskilltypeRg: any[] = [];
    cgfkStsksubtypeRg: any[] = [];
    navigationdummyRg: any[] = [];
    cgfkVmssexcodeRg: any[] = [];
    cgfkVmsagencylocationtypeRg: any[] = [];
    cgfkVmsagylocidRg: any[] = [];
    cgfkVmscityRg: any[] = [];
    cgfkVmsscheduletypeRg: any[] = [];
    cgfkVmspositionRg: any[] = [];
    cgfkVmsroleRg: any[] = [];
    vms1CommitModel: VMemberSkillsCommitBean = new VMemberSkillsCommitBean();
    stskCommitModel: StaffSkillsCommitBean = new StaffSkillsCommitBean();
    tableIndex: number;
    cellvalues: string;
    retriveDisabled: boolean;
    clearDisabled: boolean;
    namesReadOnly: boolean;
    tableIndexStsk: number;
    genderTitles: { code: string; description: string; };
    cityTitles: { description: string; code: string; };
    regionTitles: { description: string; code: string; listSeq: string};
    scheduleTitles: { description: string; code: string; };
    agencyTypeTitles: { code: string; description: string; };
    agencyTitles: { code: string; description: string; };
    positionTitles: { description: string; code: string; };
    roleTitles: { description: string; code: string; };
    skillTitles: { description: string; code: string; };
    subTypeTitles: { description: string; code: string; };
    disableSubType: boolean;
    singleFiledsStaffReadOnly: boolean;
    constructor(private ouisdireFactory: OuisdireService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.vms1ColumnDef = [];
        this.stskColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.disableSubType = true;
        this.singleFiledsStaffReadOnly = true;
        this.genderTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.gender')
        };
        this.cityTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.city')
        };
        this.regionTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.areacodetitle'),
            listSeq: this.translateService.translate('ouisdire.listseqtitle'),
        };
        this.scheduleTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.lovscheduletypecode')
        };
        this.agencyTypeTitles = {
            code: this.translateService.translate('ouisdire.agency'),
            description: this.translateService.translate('ouisdire.description'),
        };

        this.agencyTitles = {
            code: this.translateService.translate('Agy Loc Id'),
            description: this.translateService.translate('ouisdire.description'),
        };
        this.positionTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.position')
        };
        this.roleTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.role')
        };
        this.skillTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.lovskilltypecode')
        };
        this.subTypeTitles = {
            description: this.translateService.translate('ouisdire.description'),
            code: this.translateService.translate('ouisdire.lovsubtypecode')
        };
        this.vms1ColumnDef = [
            { fieldName: this.translateService.translate('ouisdire.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouisdire.firstname'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ouisdire.agencyabbrivname'), field: 'agyLocId', editable: false,
                width: 150, datatype: 'lov', link: 'ouisdire/cgfkVmsAgyLocIdRecordGroup'
            },
            {
                fieldName: this.translateService.translate('ouisdire.city'), field: 'city', editable: false, width: 150,
                domain: 'CITY', datatype: 'lov'
            },
            { fieldName: this.translateService.translate('ouisdire.schedule'), field: 'scheduleType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouisdire.position'), field: 'position', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouisdire.role'), field: 'role', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.active'), field: 'status',
                editable: false, width: 150, datatype: 'checkbox'
            },
        ];
        this.stskColumnDef = [
            { fieldName: this.translateService.translate('ouisdire.skillbackground'), field: 'skillType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouisdire.description'), field: 'stskComment', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ouisdire.typesubtype'), field: 'subType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ouisdire.asofDate'), field: 'asOfDate', editable: false,
                width: 150, datatype: 'date'
            },
        ];

    }
    /**
  *  This function will be used to vaidate the row in grid
   * fired
   */
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
    /**
    * This function is used to get the lov data of subtype when changed the data in skill type
    */
    changeCellBlock(event) {
        if (event) {
            this.cellvalues = 'ouisdire/cgfkStskSubTypeRecordGroup?subType=' + this.vmsModel.skillType;
            this.getSubTypeList();

        } else {
            this.vmsModel.skillType = undefined;
        }
    }
    getSubTypeList() {
        const getObjectData = this.ouisdireFactory.cgfkStsksubtypeRecordGroup(this.vmsModel.skillType);
        getObjectData.subscribe(data => {
            if (data.length > 0) {
                this.disableSubType = false;
            } else {
                this.disableSubType = true;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ouisdireSavevms1Form(event) {
        // TODO declare commit bean and add insert list to that object.
        this.vms1InsertList = event.added;
        this.vms1UpdatetList = event.updated;
        this.vms1DeleteList = event.removed;
        this.vms1CommitModel.insertList = [];
        this.vms1CommitModel.updateList = [];
        this.vms1CommitModel.deleteList = [];
        if (this.vms1InsertList.length > 0 || this.vms1UpdatetList.length > 0) {
            for (let i = 0; i < this.vms1InsertList.length; i++) {
                this.vms1CommitModel.insertList = this.vms1InsertList;
            }
            for (let i = 0; i < this.vms1UpdatetList.length; i++) {
                this.vms1CommitModel.updateList = this.vms1UpdatetList;
            }
        }
        if (this.vms1DeleteList.length > 0) {
            for (let i = 0; i < this.vms1DeleteList.length; i++) {
                this.vms1CommitModel.deleteList = this.vms1DeleteList;
            }

        }
        const vms1SaveData = this.ouisdireFactory.vms1Commit(this.vms1CommitModel);
        vms1SaveData.subscribe(data => {
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }
    // execute query
    ouisdireexecuteQuery() {
        if (this.vmsModel.lastName || this.vmsModel.firstName || this.vmsModel.sexCode
            || this.vmsModel.city || this.vmsModel.nomsRegionCode ||
            this.vmsModel.scheduleType || this.vmsModel.agencyLocationType
            || this.vmsModel.agyLocId || this.vmsModel.position || this.vmsModel.role
            || this.vmsModel.skillType || this.vmsModel.subType) {
            const serviceObj = this.ouisdireFactory.vms1ExecuteQuery(this.vmsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.vms1Data = [];
                    this.retriveDisabled = false;
                    this.namesReadOnly = false;
                    this.disableSubType = false;
                    this.show('common.querycaused');
                    this.clear();
                    return;
                } else {
                    data.forEach(element => {
                        element.status = element.status === 'Y' ? true : false;
                    });
                    this.vms1Data = data;
                    this.vms1Model = this.vms1Data[0];
                    this.tableIndex = 0;
                    this.retriveDisabled = true;
                    this.clearDisabled = false;
                    this.namesReadOnly = true;
                    this.disableSubType = true;
                }
            });
        } else {
            this.show(this.translateService.translate('ouisdire.searchfieldmandtory'), 'warn');
            return;
        }
    }
    /**
    * This function is used to when any data changed in the single serach fields ngmodel change
    */
    isInsertable() {
        if (this.vmsModel.lastName || this.vmsModel.firstName || this.vmsModel.sexCode
            || this.vmsModel.city || this.vmsModel.nomsRegionCode ||
            this.vmsModel.scheduleType || this.vmsModel.agencyLocationType
            || this.vmsModel.agyLocId || this.vmsModel.position || this.vmsModel.role
            || this.vmsModel.skillType || this.vmsModel.subType || this.namesReadOnly) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    /**
  * This function is used to when clicked on clear button
  */
    clear() {
        this.hmphoneModel = new Phones();
        this.bsphoneModel = new Phones();
        this.emailModel = new InternetAddresses();
        this.stskData = [];
        this.vms1Data = [];
        this.vms1Model = new VMemberSkills();
        this.vmsModel = new VMemberSkills();
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.hmphoneData = [];
        this.bsphoneData = [];
        this.emailData = [];
        this.disableSubType = true;
    }
    /**
  * This function is used to when clicked on a vmember grid row
  */
    onRowClickvms1(event) {
        if (event) {
            this.vms1Model = event;
            if (this.vms1Model.staffId) {
                this.stskModel = new StaffSkills();
                this.stskModel.staffId = this.vms1Model.staffId;
                this.hmphoneModel = new Phones();
                this.bsphoneModel = new Phones();
                this.emailModel = new InternetAddresses();
                this.hmphoneModel.ownerId = this.vms1Model.staffId;
                this.bsphoneModel.ownerId = this.vms1Model.staffId;
                this.emailModel.ownerId = this.vms1Model.staffId;
                this.stskExecuteQuery();
            }
            if (this.vms1Model.staffId) {
                
            } else {
                
            }
        }
    }
    /**
  * This function is used to retrive the skilltypes grid data
  */
    stskExecuteQuery() {
        const stskResult = this.ouisdireFactory.stskExecuteQuery(this.stskModel);
        stskResult.subscribe(stskResultList => {
            if (stskResultList.length === 0) {
                this.stskData = [];
            } else {
                this.stskData = stskResultList;
                this.stskModel = stskResultList[0];
                this.tableIndexStsk = 0;
            }
        });
        this.hmphoneExecuteQuery();
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    ouisdireSavestskForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.stskInsertList = event.added;
        this.stskUpdatetList = event.updated;
        this.stskDeleteList = event.removed;
        this.stskCommitModel.insertList = [];
        this.stskCommitModel.updateList = [];
        this.stskCommitModel.deleteList = [];
        if (this.stskInsertList.length > 0 || this.stskUpdatetList.length > 0) {
            for (let i = 0; i < this.stskInsertList.length; i++) {
                this.stskCommitModel.insertList = this.stskInsertList;
            }
            for (let i = 0; i < this.stskUpdatetList.length; i++) {
                this.stskCommitModel.updateList = this.stskUpdatetList;
            }
        }
        if (this.stskDeleteList.length > 0) {
            for (let i = 0; i < this.stskDeleteList.length; i++) {
                this.stskCommitModel.deleteList = this.stskDeleteList;
            }
        }
        const stskSaveData = this.ouisdireFactory.stskCommit(this.stskCommitModel);
        stskSaveData.subscribe(data => {
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }
    /**
      * This function is used to retrive the home phone number
      */
    hmphoneExecuteQuery() {
        const hmphoneResult = this.ouisdireFactory.hmPhoneExecuteQuery(this.hmphoneModel);
        hmphoneResult.subscribe(hmphoneResultList => {
            if (hmphoneResultList.length === 0) {
                this.hmphoneData = [];
            } else {
                this.hmphoneData = hmphoneResultList;
                this.hmphoneModel = hmphoneResultList[0];
            }
        });
        this.bsphoneExecuteQuery();
    }
    /**
  * This function is used to retrive the office phone number
  */
    bsphoneExecuteQuery() {
        const bsphoneResult = this.ouisdireFactory.bsPhoneExecuteQuery(this.bsphoneModel);
        bsphoneResult.subscribe(bsphoneResultList => {
            if (bsphoneResultList.length === 0) {
                this.bsphoneData = [];
            } else {
                this.bsphoneData = bsphoneResultList;
                this.bsphoneModel = bsphoneResultList[0];
            }
        });
        this.emailExecuteQuery();
    }
    /**
  * This function is used to retrive the email address
  */
    emailExecuteQuery() {
        const emailResult = this.ouisdireFactory.emailExecuteQuery(this.emailModel);
        emailResult.subscribe(emailResultList => {
            if (emailResultList.length === 0) {
                this.emailData = [];
            } else {
                this.emailData = emailResultList;
                this.emailModel = emailResultList[0];
            }
        });
    }
    /**
      * This function is used to blur event in subtype field
      */
    onSubTypeBlur() {
        if (!this.vmsModel.subType) {
            this.vmsModel.subType = this.vmsModel.subType === '' ? undefined : '';
        }
    }
    /**
     * This function is used to blur event in skill type field
     */
    onSkillBlur() {
        if (!this.vmsModel.skillType) {
            this.vmsModel.skillType = this.vmsModel.skillType === '' ? undefined : '';
            this.vmsModel.subType = this.vmsModel.subType === '' ? undefined : '';
            this.disableSubType = true;
        }
    }
    /**
      * This function is used to blur event in role field
      */
    onRoleBlur() {
        if (!this.vmsModel.role) {
            this.vmsModel.role = this.vmsModel.role === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in subtype field
      */
    onPositionBlur() {
        if (!this.vmsModel.position) {
            this.vmsModel.position = this.vmsModel.position === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in agency field
      */
    onAgencyBlur() {
        if (!this.vmsModel.agyLocId) {
            this.vmsModel.agyLocId = this.vmsModel.agyLocId === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in agencytype field
      */
    onAgencyTypeBlur() {
        if (!this.vmsModel.agencyLocationType) {
            this.vmsModel.agencyLocationType = this.vmsModel.agencyLocationType === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in schedule type field
      */
    onScheduleBlur() {
        if (!this.vmsModel.scheduleType) {
            this.vmsModel.scheduleType = this.vmsModel.scheduleType === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in region field
      */
    onRegionBlur() {
        if (!this.vmsModel.nomsRegionCode) {
            this.vmsModel.nomsRegionCode = this.vmsModel.nomsRegionCode === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in city field
      */
    onCityBlur() {
        if (!this.vmsModel.city) {
            this.vmsModel.city = this.vmsModel.city === '' ? undefined : '';
        }
    }
    /**
      * This function is used to blur event in gender field
      */
    onSexBlur() {
        if (!this.vmsModel.sexCode) {
            this.vmsModel.sexCode = this.vmsModel.sexCode === '' ? undefined : '';
        }
    }
}

