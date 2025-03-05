import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Teams } from '@instCaseManagementbeans/Teams';
import { TeamMembers } from '@cm/teams-workflow/beans/TeamMembers';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { TeamsCommitBean } from '@inst/workflow/maintenance/beans/TeamsCommitBean';
import { TeamMembersCommitBean } from '@cm/teams-workflow/beans/TeamMembersCommitBean';
import { TeamFunctionsCommitBean } from '@inst/workflow/maintenance/beans/TeamFunctionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OcmteamMainService } from '../service/ocmteamMain.service';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';



@Component({
    selector: 'app-ocmteamMain',
    templateUrl: './ocmteamMain.component.html'

})

export class OcmteamMainComponent implements OnInit {
    @ViewChild('teamsgrid') teamsgrid: any;
    @ViewChild('teamMembersgrid') teamMembersgrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    teamsData: Teams[] = [];
    teamsDataTemp: Teams[] = [];
    teamsModel: Teams = new Teams();
    teamsSearchModel: Teams = new Teams();
    teamsValidateModel: Teams = new Teams();
    teamsIndex: Number = 0;
    teamsInsertList: Teams[] = [];
    teamsUpdatetList: Teams[] = [];
    teamsDeleteList: Teams[] = [];
    teammembersData: TeamMembers[] = [];
    teammembersDataTemp: TeamMembers[] = [];
    teammembersModel: TeamMembers = new TeamMembers();
    teammembersValidateModel: TeamMembers = new TeamMembers();
    teammembersIndex: Number = 0;
    teammembersInsertList: TeamMembers[] = [];
    teammembersUpdatetList: TeamMembers[] = [];
    teammembersDeleteList: TeamMembers[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    teamsColumnDef: any[];
    availTeamColumnDef: any[];
    teamMembersColumnDef: any[];
    teamFunctionsColumnDef: any[];
    mainTeamReadOnly: Boolean = false;
    teamsReadOnly: Boolean = false;
    teamFunctionsReadOnly: Boolean = false;
    availTeamReadOnly: Boolean = false;
    teamMembersReadOnly: Boolean = false;
    teamsCommitModel: TeamsCommitBean = new TeamsCommitBean();
    teammembersCommitModel: TeamMembersCommitBean = new TeamMembersCommitBean();
    teamfunctionsCommitModel: TeamFunctionsCommitBean = new TeamFunctionsCommitBean();
    agyLocIdMap: Map<string, string> = new Map<string, string>();
    rgstaffnamecommRg: any[] = [];
    clearDisabled: boolean;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    tableIndex: number;
    isLoading: boolean;
    teamMembersEnableGrid: boolean;
    enableFunctionGridDelete: boolean;
    enableFunctionGrid: boolean;
    enableTeamsGridDelete: boolean;
    updateAgyLocId: any;
    updateAllowedFlagTeams: boolean;
    updateFunctionServedGrid: boolean;
    type: string;
    message: string;
    selectedTabIndex: any;
    caseLoadTitles: { code: string; description: string;};
    enableTeamGridInsert: boolean;
    updateTeamGrid: boolean;
    enableTeamMembersGrid: boolean;
    namesReadOnlyArea: boolean;
    teamCodeExist: boolean;
    deleteFlag: boolean;
    deleteFlagTemp: any;
    gridInsBtn: boolean;
    teamMembersTitles = { description: 'Name', userId:'User Id',code: 'Staff Id' };
    staffmap: Map<number, string> = new Map<number, string>();
    staffMemberLovList : StaffMembers[]=[];
    agyLovData: Map<string, string> = new Map<string, string>();
	functionLovData: Map<string, string> = new Map<string, string>();
    constructor(private ocmteamsFactory: OcmteamMainService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.teamsColumnDef = [];
        this.teamMembersColumnDef = [];
    }
    ngOnInit() {
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.teamMembersEnableGrid = false;
        this.enableFunctionGrid = false;
        this.enableFunctionGridDelete = false;
        this.updateAllowedFlagTeams = false;
        this.updateFunctionServedGrid = false;
        this.updateTeamGrid = true;
        this.enableTeamMembersGrid = true;
        this.teamsSearchModel.agyLocType = '';
        this.gridInsBtn = false;

        this.caseLoadTitles = {
            code: this.translateService.translate('ocmteams.caseloadid'),
            description: this.translateService.translate('ocmteams.lovdescription')
           
        };
        
        this.teamsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmteammain.teamcode'), field: 'teamCode', editable: false,
                width: 150, datatype: 'text', uppercase: true,required: true,
                maxlength: 20,
            },
            {
                fieldName: this.translateService.translate('ocmteammain.teamname'), field: 'description', editable: false,
                width: 150, datatype: 'text', uppercase: 'false', maxlength: 40,required: true
            },
            {
                fieldName: this.translateService.translate('ocmteammain.teamEmail'), field: 'teamEmail', editable: false,
                width: 150, datatype: 'email', uppercase: 'false', maxlength: 40,required: false
            },
           
            {
                fieldName: this.translateService.translate('ocmteammain.adminlocation'), field: 'agyLocId', editable: false,
                width: 300, datatype: 'text',required: true
                
            },
            {
                fieldName: this.translateService.translate('ocmteammain.asssignfunction'), field: 'functionType', editable: false,
                width: 300, datatype: 'text'
                
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: false,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocmteammain.editdetails'), field: 'button', editable: true, width: 150,displayas: 'image',
                datatype: 'hyperlink',onLaunchClick: this.onEditTeamClick,  modal: false,data: 'row', updateField: 'row',
            
             },
            { fieldName: '', field: 'description', editable: false, width: 10, hide: true }
        ];
        
        this.teamMembersColumnDef = [
            { fieldName: this.translateService.translate('ocmteammain.staff'), field: 'staffId',  required: true,
              editable: true, width: 300,datatype: 'lov', link: 'ocmteammain/getStaffDetails',titles: this.teamMembersTitles },
              
            { fieldName: this.translateService.translate('ocmteammain.userId'), field: 'userId', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            }
        ];

        
        const areaData = this.ocmteamsFactory.getAgyLocRecords();
		areaData.subscribe(data => {
			if (data.length === 0) {
			} else {
				this.agyLovData = data;
			}
			
        });
        const functionData = this.ocmteamsFactory.getFunctioTypeRecords();
		functionData.subscribe(data => {
			if (data.length === 0) {
			} else {
				this.functionLovData = data;
			}
		})
        const staffDetail = this.ocmteamsFactory.getStaffDetails();
        staffDetail.subscribe(data => {
            if (data.length > 0) {
                data.forEach(obj=>{
                    this.staffmap.set(obj.staffId,obj.userId);
                })
               this.staffMemberLovList=data;
            }
            this.teamsExecuteQuery();
        });
       
    }
   
   
    
    
  
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickteams(event) {
        if (event) {
           this.teamsModel = event;
           if (this.teamsModel.teamId) {
            this.teamMembersEnableGrid = true;
            this.teammembersData = [];
            this.teammembersModel = new TeamMembers(); 
            this.teammembersExecuteQuery();
        } else {
            this.teamMembersEnableGrid = false;
        }
        }
    }
    
    onRowClickteammembers(event) {
        if (event) {
            if (event) {
                this.teammembersModel = event;
                this.teammembersModel.teamId = this.teamsModel.teamId;
            }

        }
    }
    isInsertable() {
        if (this.teamsSearchModel.agyLocType || this.teamsSearchModel.areaCode) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }
    clear() {
        this.teamsSearchModel = new Teams();
        this.teamsModel = new Teams();
        this.teamsData = [];
        this.teammembersData = [];
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.namesReadOnlyArea = true;
        this.enableTeamGridInsert = false;
        this.enableFunctionGrid = false;
        this.teamMembersEnableGrid = false;
        this.gridInsBtn = false;
    }
    
   
    
    onGridClearTeams = (event) => {
        this.teamCodeExist = false;
        this.teamsExecuteQuery();
        return;
    }
    
    teamMembersInsert = () => {
        return {
            button: '..', firstName: '', lastName: '', role: '', activeFlag: true, position: ''
        };

    }
    
    validateTeamButton(data) {
        if (!data.createDatetime) {
            if (!data.functionType || !data.functionType.trim()) {
                this.show(this.translateService.translate('ocdvteam.functiontypeselectvalidation'), 'warn');
                return false;
            }
        } else {
            return false;
        }
        return true;


    }

    onEditTeamClick = (event) => {
        event.agyLocData=this.agyLovData;
        event.functionLovData=this.functionLovData;
        this.dialogService.openLinkDialog('/TEAMDIALOG', event, 80).subscribe(result => {
          if (result) {
             this.teamsExecuteQuery();
          }
       });
       return true;
 }
   
    
    teamsDataSave(event) {
        if (!this.teamDataValidations()) {
            return;
        }
        this.teamsInsertList = event.added;
        this.teamsUpdatetList = event.updated;
        this.teamsDeleteList = event.removed;
        this.teamsCommitModel.insertList = [];
        this.teamsCommitModel.updateList = [];
        this.teamsCommitModel.deleteList = [];
        if (this.teamsInsertList.length > 0 || this.teamsUpdatetList.length > 0) {
            for (let i = 0; i < this.teamsInsertList.length; i++) {
                this.teamsInsertList[i].activeFlag = this.teamsInsertList[i].activeFlag ? 'Y' : 'N';
                this.teamsInsertList[i].createDatetime  = DateFormat.getDate();
                this.teamsInsertList[i].createUserId = this.sessionManager.getId();
               
            }
            this.teamsCommitModel.insertList = this.teamsInsertList;
            for (let i = 0; i < this.teamsUpdatetList.length; i++) {
                this.teamsUpdatetList[i].activeFlag = this.teamsUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.teamsUpdatetList[i].modifyDatetime = DateFormat.getDate();
                this.teamsUpdatetList[i].modifyUserId = this.sessionManager.getId();
            }
            this.teamsCommitModel.updateList = this.teamsUpdatetList;
        }
        if (this.teamsDeleteList.length > 0) {
            for (let i = 0; i < this.teamsDeleteList.length; i++) {
                this.teamsCommitModel.deleteList = this.teamsDeleteList;
            }
        }
        const teamsSaveData = this.ocmteamsFactory.teamsCommit(this.teamsCommitModel);
        teamsSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TEAMS_PK') > 0) {
                this.show(this.translateService.translate('ocmteams.teamprimarykeyvalidation'), 'warn');
                this.teamsExecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TEAM_MEMBERS_TEAMS_FK') > 0) {
                this.show(this.translateService.translate('ocmteams.teammeberforignkeyvalidation'), 'warn');
                this.teamsExecuteQuery();
                return;
            }
            if (String(data[0].errorMessage).indexOf('TEAM_FUNCTIONS_TEAMS_FK') > 0) {
                this.show(this.translateService.translate('ocmteams.teamfunctionforignkeyvalidation'), 'warn');
                this.teamsExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.teamsExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.teamsExecuteQuery();
                return;
            }
        });

    }
    retriveBeforevlidations() {
        const is = { valid: true };
        if(!this.teamsSearchModel.caseLoadId){
            this.show(this.translateService.translate('ocmteammain.caseloadmandatory'), 'warn');
            return false;

        }
       
        return is.valid;
    }
    /*execute query*/
    teamsExecuteQuery() {
        const serviceObj = this.ocmteamsFactory.teamsExecuteQuery();
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.teamsData = [];
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
                this.namesReadOnlyArea = true;
                this.show('common.querycaused');
                this.gridInsBtn = true;
                return;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.checkFlag = element.checkFlag === 'Y' ? true : false;
                    element['button'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                });
                this.teamsData = data;
                this.teamsModel = this.teamsData[0];
                this.teamsIndex = 0;
                this.retriveDisabled = true;
                this.clearDisabled = false;
                this.namesReadOnly = true;
                this.namesReadOnlyArea = true;
                this.gridInsBtn = true;
            }
        });
    }
    validateRowDataTeams = (event) => {
        const rowIndex = this.teamsData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.field === 'activeFlag' && event.data.checkFlag != undefined
                && event.data.checkFlag !== event.newValue) {
                this.teamsgrid.setColumnData('activeFlag', rowIndex, event.data.checkFlag);
                rowdata.validated = true;
                return rowdata;
            } else if (event.data.activeFlag) {
                this.teamsgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    

    teamCodeValidation(){
		if (this.teamsData.length > 0) {
			for (let i = 0; i < this.teamsData.length; i++) {
				for(let j = i+1; j < this.teamsData.length; j++) {
					if(this.teamsData[i].teamCode.trim() === this.teamsData[j].teamCode.trim()){
						return true;
					}
				}
				}
			
		}
      return false;

    }
    



    
    onTeamsInsert = () => {
        if (!this.teamDataValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    teamDataValidations() {
        const is = { valid: true };
        if (this.teamsData && this.teamsData) {
            this.teamsData.forEach(element => {
                if (!element.teamCode) {
                    this.show(this.translateService.translate('ocmteams.teamcodemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
                if (!element.description) {
                    this.show(this.translateService.translate('ocmteams.teamnamemandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
              
                if (!element.caseLoadId) {
                    this.show(this.translateService.translate('ocmteams.locationmandatory'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            });
        }
        if (this.teamCodeValidation()) {
            this.show(this.translateService.translate('ocmteams.teamcodealreadyexist'), 'warn');
            is.valid = false;
            return is.valid;
        }
        return is.valid;
    }
   
    
    
    teammembersExecuteQuery() {
        this.teammembersModel.teamId=this.teamsModel.teamId;
        const teammembersResult = this.ocmteamsFactory.teamMembersExecuteQuery(this.teammembersModel);
        teammembersResult.subscribe(teammembersResultList => {
            if (teammembersResultList.length === 0) {
                this.teammembersData = [];
            } else {
                teammembersResultList.forEach(element => {
                    element['button'] = '..';
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.checkFlag = element.checkFlag === 'Y' ? true : false;
                });
                this.teammembersData = teammembersResultList;
                this.teammembersModel = teammembersResultList[0];
                this.tableIndex = 0;
            }
        });
    }
    
    onGridClearStaff = () => {
        this.teammembersExecuteQuery();
        return;
    }
    validateRowDataStaff = (event) => {
        const rowIndex = this.teammembersData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'staffId') {
            const userId=this.staffmap.get(event.newValue);
            this.teamMembersgrid.setColumnData('userId', rowIndex, userId);
            this.teamMembersgrid.setColumnData('staffId', rowIndex, event.newValue);
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.teamMembersgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.teamMembersgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
   saveTeamMembersData(event) {
        this.teammembersInsertList = event.added;
        this.teammembersUpdatetList = event.updated;
        this.teammembersDeleteList = event.removed;
        this.teammembersCommitModel.insertList = [];
        this.teammembersCommitModel.updateList = [];
        this.teammembersCommitModel.deleteList = [];
        if (this.teammembersInsertList.length > 0 || this.teammembersUpdatetList.length > 0) {
            for (let i = 0; i < this.teammembersInsertList.length; i++) {
                if (!this.teammembersInsertList[i].staffId) {
                    this.show(this.translateService.translate('ocmteams.staffidmust'), 'warn');
					return;
				}
                this.teammembersInsertList[i].teamId = this.teamsModel.teamId;
                this.teammembersInsertList[i].activeFlag = this.teammembersInsertList[i].activeFlag ? 'Y' : 'N';
                this.teammembersInsertList[i].createDatetime  = DateFormat.getDate();
                this.teammembersInsertList[i].createUserId = this.sessionManager.getId();
                
            }
            this.teammembersCommitModel.insertList = this.teammembersInsertList;
            for (let i = 0; i < this.teammembersUpdatetList.length; i++) {
                if (!this.teammembersUpdatetList[i].staffId) {
                    this.show(this.translateService.translate('ocmteams.staffidmust'), 'warn');
					return;
				}
                this.teammembersUpdatetList[i].activeFlag = this.teammembersUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.teammembersUpdatetList[i].modifyDatetime = DateFormat.getDate();
                this.teammembersUpdatetList[i].modifyUserId = this.sessionManager.getId();
            }
            this.teammembersCommitModel.updateList = this.teammembersUpdatetList;
        }
        if (this.teammembersDeleteList.length > 0) {
            for (let i = 0; i < this.teammembersDeleteList.length; i++) {
                this.teammembersDeleteList[i].activeFlag = this.teammembersDeleteList[i].activeFlag ? 'Y' : 'N';
                this.teammembersDeleteList[i].checkFlag = this.teammembersDeleteList[i].checkFlag ? 'Y' : 'N';
                if (this.teammembersDeleteList[i].expiryDate) {
                    this.teammembersDeleteList[i].expiryDate = DateFormat.getDate(this.teammembersDeleteList[i].expiryDate);
                }
            }
            this.teammembersCommitModel.deleteList = this.teammembersDeleteList;
        }
        const teammembersSaveData = this.ocmteamsFactory.teamMembersCommit(this.teammembersCommitModel);
        teammembersSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('TEAM_MEMBERS_PK') > 0) {
                this.show(this.translateService.translate('ocmteams.teammemberprimarykey'), 'warn');
                this.teammembersExecuteQuery();
                return;
            }
            if (data[0] && data[0].returnValue === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.teammembersExecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.teammembersExecuteQuery();
                return;
            }
        });
    }
    onAgyLocTypeBlur() {
        if (!this.teamsSearchModel.agyLocType) {
            this.teamsSearchModel.agyLocType = this.teamsSearchModel.agyLocType === '' ? undefined : '';
        }
    }

    onAreaBlur() {
        if (!this.teamsSearchModel.areaCode) {
            this.teamsSearchModel.areaCode = this.teamsSearchModel.areaCode === '' ? undefined : '';
        }
    }

    onCreateTeamClick = (event) => {
        event = this.teamsSearchModel;
        event.agyLocData=this.agyLovData;
        event.functionLovData=this.functionLovData;
            this.dialogService.openLinkDialog('/TEAMDIALOG', event, 80).subscribe(result => {
              if (result) {
                this.teamsExecuteQuery();
              }
           });
           return true;
     }

     

    onTeamMemberDelete = () => {
        const popupData = {
            label: this.translateService.translate('ocmteammain.deletestaffwarn'),
            yesBtn: true, noBtn: true
          };
          this.dialogService.openLinkDialog('/ocucoffeconfirmbox', popupData, 50).subscribe(result => {
            if (result) {
             return true;
            }else{
                return false;
            }
		
    })
}
    
    
   
}

