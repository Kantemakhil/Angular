import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderBookings } from '@inst/demographics-biometrics/beans/OffenderBookings';
import { OffenderBookingsCommitBean } from '@inst/demographics-biometrics/beans/OffenderBookingsCommitBean';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { OcdatpowService } from '../service/ocdatpow.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';

@Component({
    selector: 'app-ocdatpow',
    templateUrl: './ocdatpow.component.html',
})

export class OcdatpowComponent implements OnInit {
    @ViewChild('offbkgGrid') offbkgGrid: any;
    @ViewChild('voffdetGrid') voffdetGrid: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    descriptionlink: String;
    dsplastnamelink: String;

    offbkgCommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
    offbkgModel: OffenderBookings = new OffenderBookings();
    offbkgData: OffenderBookings[] = [];

    offbkgInsertList: OffenderBookings[] = [];
    offbkgUpdateList: OffenderBookings[] = [];
    genoffbkgUpdateList: OffenderBookings[] = [];

    voffdetModel: TeamMembers = new TeamMembers();
    selectedVoffdetModel: TeamMembers = new TeamMembers();
    voffdetModelngModel: TeamMembers = new TeamMembers();
    voffdetData: TeamMembers[] = [];

    stafflrModel: StaffMembers = new StaffMembers();

    voffdetIserList: TeamMembers[] = [];
    voffdetUpdateist: TeamMembers[] = [];
    genvoffdetUpdateList: TeamMembers[] = [];

    vOffDetColumnDef: any[];
    offBkg1ColumnDef: any[];
    staffLrReadOnly: boolean = false;
    offBkg1ReadOnly: boolean = false;
    modeldspDescription: string;
    code: string;
    agencyLocationType: string;
    message: string;
    type: string;
    msgs: any[] = [];

    check: boolean;
    disableSavebutton: boolean;
    visability1: boolean;
    visability2: boolean;
    stafflrModeldspLastName: string;
    stafflrModeldspFirstName: string;
    stafflrModelposition: string;
    stafflrModelrole: string;
    childScreenCode: string;
    chkOffbkg1All: boolean;
    offTxnReadOnly: any;
    commstaffid: number;
    lastNameTemp:string;

    //common.locationdescription 

    teamMembersTitles = { description: this.translateService.translate('common.locationdescription'), code: this.translateService.translate('ocdatpow.locationid') };
    teamtitles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('ocdatpow.teamid') };
    clearDisable: boolean;
    disableGoBut: boolean;
    disableOcuaoffi: boolean;
    tabIndex: number;
    tabIndex1: number;
    descriptionReadonly: boolean;
    num: number;
    falseNum: number;
    rgcordGroupTot= [];
    rgcordGroupTot1=[];

    omteamBeased:boolean;
    vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
    constructor(private ocdatpowFactory: OcdatpowService, public translateService: TranslateService,
         public sessionManager: UserSessionManager, public dialogService: DialogService,
         private offenderSearchService: OffenderSearchService,  public osiosearFactory: OsiosearService) {

        this.offBkg1ColumnDef = [];
        this.vOffDetColumnDef = [];
    }
    ngOnInit() {
        this.omTeamFuncton();   
        this.disableGoBut = false;
        this.clearDisable = true;
        this.offTxnReadOnly = true
        this.disableOcuaoffi = true;
        this.disableSavebutton = true;
        
        this.descriptionlink = 'ocdatpow/cgfkstaffLrDspDescriptionRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoad;
        this.offBkg1ColumnDef = [
            { fieldName: this.translateService.translate('ocdatpow.assign'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'rootOffenderId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'dspLastName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'dspFirstName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocdatpow.assigndate'), field: 'modifyDatetime', editable: false, width: 150, datatype: 'date' },
        ];

        this.vOffDetColumnDef = [
            { fieldName: this.translateService.translate('ocdatpow.assign'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('ocdatpow.name'), field: 'staffName',editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocdatpow.position'), field: 'position', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_POS' },
            { fieldName: this.translateService.translate('system-profile.staff-role'), field: 'role', editable: false, width: 150, datatype: 'lov', domain: 'STAFF_ROLE' },
            { fieldName: this.translateService.translate('ocdatpow.gender'), field: 'gender', editable: false, width: 150, datatype: 'lov', domain: 'SEX' },
            { fieldName: this.translateService.translate('ocdatpow.schedule'), field: 'scheduleType', editable: false, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP' },
            { fieldName: this.translateService.translate('system-profile.no-prim-owns'), field: 'offenders', editable: false, width: 150, datatype: 'number', },
            {
                fieldName: this.translateService.translate('ocdatpow.team'), field: 'omTeam',editable: true, width: 150,datatype: 'lov',
                link: 'ocdatpow/rgTeamRecordGroup?sealFlag=', parentField: 'sealFlag', titles: this.teamtitles,cellEditable: this.omrecordGrCellEdit, 
            },
            { fieldName: this.translateService.translate('ocdatpow.worked'), field: 'subType', editable: false, width: 150, datatype: 'checkbox' },
        ];
    }
omTeamFuncton(){
    const saveObj = this.ocdatpowFactory.omMandatoryGrid();
    saveObj.subscribe(data=>{
        this.omteamBeased=data;
        if (this.omteamBeased) {
            if (this.omteamBeased === true) {
            this.voffdetGrid.setColumnHeader('omTeam', this.translateService.translate('ocdatpow.team') +
            this.translateService.translate('common.mandatory'));
            } else {
            this.voffdetGrid.setColumnHeader('omTeam', this.translateService.translate('ocdatpow.team'));
            }
        }
    
    });
}

    
    omrecordGrCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.count>0) {
            return true;
        } else {
            return false;
        }
    }

    modelChange(event) {
        if (event == undefined) {
            this.disableOcuaoffi = true;
            this.clearDisable = true;
            this.stafflrModeldspLastName = "";
            this.stafflrModeldspFirstName = "";
            this.stafflrModelposition = "";
            this.stafflrModelrole = "";
        }
        this.code = event.code;
        this.agencyLocationType = event.agencyLocationType;
        this.offbkgModel.intakeAgyLocId = this.code;
        this.voffdetModel.intakeAgyLocId = this.code;
        this.voffdetModel.agencyLocationType = this.agencyLocationType;
        this.voffdetModel.offenderBookId = this.offbkgModel.offenderBookId;
        this.clearDisable = false;
        this.stafflrModel.agyLocId = event.code
        if (!event.description || event.description == undefined || event.description == null) {
            this.disableOcuaoffi = true;
        } else {
            this.disableOcuaoffi = false;
        }

    }

    clearDisableFun() {
        if (this.stafflrModeldspLastName ||
            this.stafflrModeldspFirstName ||
            this.stafflrModelposition ||
            this.stafflrModelrole ||
            this.modeldspDescription) {
            return false;
        }
        return true;
    }

    onLocationBlur() {
        if (!this.modeldspDescription) {
            this.modeldspDescription = this.modeldspDescription === '' ? undefined : '';
        }
    }


    searchLaunchButtonClick() {
        if (!this.modeldspDescription) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.entlocation');
            this.show(this.message, this.type);
            this.clearDisable = true;
            return;
        }
        if (!this.stafflrModeldspLastName) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.enterofficer');
            this.show(this.message, this.type);
            this.clearDisable = true;
            return;
        }

        this.ofbk1ExcecuteQuery();
        this.clearDisable = false;
        this.disableGoBut = true;
    }

    getOfficers = () => {
        this.dialogService.openLinkDialog('/OCUAOFFI', this.stafflrModel, 80).subscribe(result => {
            if(result && result.lastName){
            this.stafflrModeldspLastName = result.lastName;
            }           
            this.stafflrModeldspFirstName = result.firstName;
            this.stafflrModelposition = result.position;
            this.stafflrModelrole = result.role;
            this.childScreenCode = result.calAgyLocId;
            this.commstaffid = result.sacStaffId;
            this.offbkgModel.commStaffRole = result.role;
            this.disableGoBut = false;
        })
    }
    clear() {
        this.clearDisable = true;
        this.offbkgData = [];
        this.voffdetData = [];
        this.clearDisable = true;
        this.stafflrModeldspLastName = "";
        this.stafflrModeldspFirstName = "";
        this.stafflrModelposition = "";
        this.stafflrModelrole = "";
        this.descriptionlink = "";
        this.stafflrModel.agyLocId = "";
        this.agencyLocationType = "";
        this.offbkgModel.intakeAgyLocId = "";
        this.voffdetModel.intakeAgyLocId = "";
        this.voffdetModel.agencyLocationType = "";
        this.voffdetModel.offenderBookId = 0;
        this.disableGoBut = false;
        this.disableOcuaoffi = true;
        this.disableSavebutton = true;
        this.offTxnReadOnly = true;
        this.modeldspDescription = "";
        this.descriptionReadonly = false;
    }

    onRowClickoffbkg1(event) {
        if (event) {
            this.offbkgModel = event;
            this.vOff1DetExecuteQuery();
            
        }
    }


    /*  OFF_BKG1 execute query
     */
    ofbk1ExcecuteQuery() {
        this.offbkgModel.commStaffId = this.commstaffid;
        this.offbkgModel.position = this.stafflrModelposition;
        this.offbkgModel.commStaffRole=this.stafflrModelrole;
        this.offbkgModel.intakeAgyLocId=this.code;
        const saveObj = this.ocdatpowFactory.offBkg1ExecuteQuery(this.offbkgModel);
        saveObj.subscribe(data => {
            if (data.length === 0) {
                this.descriptionReadonly = true;
                this.offbkgData = [];
                this.offTxnReadOnly = true;
                this.chkOffbkg1All = false;
                this.voffdetModel.offenderBookId = undefined;
                this.offbkgModel.offenderBookId = undefined;
                this.vOff1DetExecuteQuery();
            } else {
                this.descriptionReadonly = true;
                this.disableOcuaoffi = true;
                this.offbkgData = data;
                this.tabIndex = 0;
                this.offTxnReadOnly = false;
                this.chkOffbkg1All = false;
                this.disableSavebutton = false;
                this.vOff1DetExecuteQuery();
                data.forEach(element => {
                    element.activeFlag = false;
                    for (let i = Number(String(element.rootOffenderId).length); i < 10; i++) {
                        element.rootOffenderId = '0' + element.rootOffenderId;
                    }
                });
            }
        });
    }

    /*  V_OFF_DET excecute query
     */
    vOff1DetExecuteQuery() {
        this.voffdetModel.offenderBookId = this.offbkgModel.offenderBookId;
        this.voffdetModel.agyLocId = this.modeldspDescription;
        this.voffdetModel.position = this.stafflrModelposition;
        this.voffdetModel.role = this.stafflrModelrole;
        this.voffdetModel.staffId = this.commstaffid;
        const saveObj = this.ocdatpowFactory.vOffDetExecuteQuery(this.voffdetModel);
        saveObj.subscribe(data => {
            if (data.length === 0) {
                this.voffdetData = [];
                this.descriptionReadonly = true;
                if(this.offbkgData.length==0 && this.voffdetData.length==0){
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show(this.message, this.type);
                    this.disableGoBut=false;
                }
            } else {
                this.descriptionReadonly = true;
                this.voffdetData = data;
                this.tabIndex1 = 0;
                this.disableSavebutton = false;
                this.disableOcuaoffi = true;
                this.voffdetData.forEach(element => {
                    element.sealFlag = element.position + '-' + element.role + '-' + element.staffId;
                    element.subType = element.subType;
                });
            }
        });
    }


    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    /*  external save or total save
     */
    onSave() {
        this.genoffbkgData();
        this.genoffdetData();
        this.offbkgUpdateList = this.genoffbkgUpdateList;
        this.voffdetUpdateist = this.genvoffdetUpdateList;
        this.offbkgCommitModel.updateList = [];
        this.offbkgCommitModel.offdetUpdateList = [];

        if (!this.offdetValidate(this.offbkgUpdateList, this.voffdetUpdateist)) {
            return;
        }

        if (this.offbkgUpdateList.length >= 0) {

            for (let i = 0; i < this.offbkgUpdateList.length; i++) {
                this.offbkgUpdateList[i].activeFlag = this.offbkgUpdateList[i].activeFlag ? 'Y' : 'N';
                this.offbkgUpdateList[i].commStaffId = this.commstaffid;
                this.offbkgUpdateList[i].caseloadType = this.sessionManager.currentCaseLoad;
                this.offbkgCommitModel.updateList = this.offbkgUpdateList;
            }
        }

        if (this.voffdetUpdateist.length >= 0) {

            for (let i = 0; i < this.voffdetUpdateist.length; i++) {
                this.voffdetUpdateist[i].activeFlag = this.voffdetUpdateist[i].activeFlag ? 'Y' : 'N';
                this.offbkgCommitModel.offdetUpdateList = this.voffdetUpdateist;
            }
        }

        const saveObj = this.ocdatpowFactory.offBkg1Commit(this.offbkgCommitModel);
        saveObj.subscribe(data => {
            if (data === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show(this.message, this.type);
                this.ofbk1ExcecuteQuery();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show(this.message, this.type);
                this.ofbk1ExcecuteQuery();
            }
        });
    }

    onRowClickvoffdet(event) {
        if (event != undefined) {
            this.selectedVoffdetModel = event;
            this.voffdetModel = event;
        }
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.voffdetData.indexOf(event.data);
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag && this.offbkgData.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdatpow.nooffender');
                this.show(this.message, this.type);
                this.voffdetGrid.setColumnData('activeFlag', rowIndex, false);
                rowdata.validated = true;
                return rowdata;
            }
            if (!event.data.activeFlag) {
                this.voffdetGrid.setColumnData('omTeam', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;


    }
    offdetValidate(offbksData: any, VoffdetData: any) {
        const is = { valid: true }

        var count = 0;
        var count1 = 0;

        if (!this.selectedVoffdetModel.omTeam && this.omteamBeased==true) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.omteam');
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        for (let i = 0; i < offbksData.length; i++) {
            if (offbksData[i].activeFlag) {
                count = count + 1;
            }

        }

        for (let i = 0; i < VoffdetData.length; i++) {
            if (VoffdetData[i].activeFlag) {
                count1 = count1 + 1;
            }
            if (!VoffdetData[i].omTeam && this.omteamBeased==true) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocdatpow.omteam');
                this.show(this.message, this.type);
                is.valid = false;
                return is.valid;
            }

        }

        if (count > 0 && count1 === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.offender');
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        if ((count == 0 && count1 == 0) || (count === 0 && count1 > 0)) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.commiting');
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }

        if (count > 0 && count1 > 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdatpow.onlyoffender');
            this.show(this.message, this.type);
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }


    extOtChkboxChange(event) {
        const rowData = this.offbkgData;
        if (event) {
            for (let i = 0; i < rowData.length; i++) {
                this.offbkgGrid.setColumnData('activeFlag', i, event.checked);
                this.check = true;
            }
        } else {
            this.check = false;
        }
        this.offbkgData = rowData;
    }

    genoffbkgData() {
        this.genoffbkgUpdateList = [];

        this.offbkgGrid.updatedMap.forEach(
            (v: any, k: number) => {
                if (v.activeFlag === true) {
                    this.genoffbkgUpdateList.push(v);
                }
            }
        );
    }


    genoffdetData() {
        this.genvoffdetUpdateList = [];
        this.voffdetGrid.updatedMap.forEach(
            (v: any, k: number) => {
                if (v.activeFlag === true) {
                    this.genvoffdetUpdateList.push(v);
                }
            }
        );
    }

    validateRowDataTwo = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.offbkgData.indexOf(event.data);
        this.num = 0;
        this.falseNum = 0;
        this.offbkgData.forEach(ele => {
            if (ele.activeFlag) {
                this.num = this.num + 1;
            } else {
                this.falseNum = this.falseNum + 1;
            }
        });
        if (this.num > 0) {
        } else {
            this.chkOffbkg1All = undefined;
        }
        if (this.falseNum > 0) {
            this.chkOffbkg1All = undefined;
        } else {
            this.chkOffbkg1All = true;
        }

        rowdata.validated = true;
        return rowdata;
    }
    ngOnDestroy() {
        if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.offenderBookId !== undefined) {
          this.vHeaderBlockModelBean = new VHeaderBlock();
          this.vHeaderBlockModelBean.offenderIdDisplay = this.offenderSearchService.selectedOffender.offenderIdDisplay;
          this.vHeaderBlockModelBean.agyLocId = this.sessionManager.currentCaseLoad;
          this.vHeaderBlockModelBean.agyLocType = this.sessionManager.currentCaseLoadType;
          const searchResult = this.osiosearFactory.
            offbkgGlobalQuery(this.vHeaderBlockModelBean);
          searchResult.subscribe(vhbList => {
            if (vhbList.length > 0) {
              this.offenderSearchService.selectedOffender = vhbList[0];
            }
          });
        }
      }

}



