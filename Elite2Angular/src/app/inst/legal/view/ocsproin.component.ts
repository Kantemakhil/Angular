import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import { CourseActivities } from "@instprogramswithoutschedulesbeans/CourseActivities";
import { OffenderBookings } from "../../demographics-biometrics/beans/OffenderBookings";
import {  OcsproinService } from "../service/ocsproin.service";
import { DialogService } from "@core/ui-components/dialog/dialog.service";

@Component( {
    selector: 'app-ocsproin',
    templateUrl: './ocsproin.component.html',
    styleUrls: []
} )
export class OcsproinComponent implements OnInit {
    OffenderDetailsData: OffenderBookings[] = [];
    OffenderDetailsColumnDef: any[];
    CommunityServiceColumnDef : any[];
    CommunityServiceData: CourseActivities[] = [];
    teamLov: string;
    teamLovReadOnly: boolean;
  rgProjectLov: string;
    courseactModel: CourseActivities = new CourseActivities();
    weekDay: any[] = [];
    weekday: any[] = [];
    programStatus: string;
    avlblCapacityFlag : any;
    teamData: any;
    disLovValues: boolean;
    disavlblCapacityFlag: boolean;
    msgs: any[] = [];
    retrieveDis: boolean;
    clearDis: boolean;
    nbtProject: any;
    providerPartyId: any;
    mode: string;
    currentCaseload: any;
    crsActyId : number;
    weekLovFields: Object = { text: 'description', value: 'code' };
  targetOffDis: any;

  constructor(public translateService: TranslateService, private ocsproinFactory: OcsproinService, private sessionManager: UserSessionManager, private dialogService: DialogService) {

    }
    ngOnInit() {
      // this.disavlblCapacityFlag = false;
        this.mode = 'CheckBox';
        this.currentCaseload = this.sessionManager.currentCaseLoad;
        this.retrieveDis = false;
        this.clearDis = true;
        // teamLovReadOnly: false;
        this.disLovValues = false;
      this.targetOffDis = true;
        teamLovReadOnly: false;
        this.teamLov = '/ocsproin/rgTeamRecordGroup';
        this.rgProjectLov='/ocsproin/rgProjectsRgNoTeam';

        this.CommunityServiceColumnDef = [
            { fieldName: this.translateService.translate('ocsproin.projectcode'), field: 'code', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocsproin.description'), field: 'description', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocsproin.maxcapacity'), field: 'capacity', editable: false, width: 150, },
            { fieldName: this.translateService.translate('ocsproin.allocoffender'), field: 'allocatedOffender', editable: false, width: 150, datatype: 'text' },
          { fieldName: this.translateService.translate('ocsproin.referoffender'), field: 'referredOffenders', editable: false, width: 150, datatype: 'text' },
          {
            fieldName: '',
            field: 'goButton', editable: true, width: 220, datatype: 'launchbutton', onLaunchClick: this.isLaunchDisable, modal: true, updateField: 'row',
            data: 'row', dialogWidth: '80'
          },
            { fieldName: this.translateService.translate('ocsproin.projenddate'), field: 'scheduleEndDate', editable: false, width: 150, datatype: 'date' },
          { fieldName: this.translateService.translate('ocsproin.trgetsoffender'), field: 'targetOffFlag', editable: false, width: 150, datatype: 'checkbox' }

        ]

        this.OffenderDetailsColumnDef = [
            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, },
            { fieldName: this.translateService.translate('ocsproin.conditionstartdate'), field: 'conditionStartDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsproin.conditionenddate'), field: 'conditionEndDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsproin.remainingHours'), field: 'remainingHours', editable: false, width: 150, datatype: 'number' },
            { fieldName: this.translateService.translate('ocsproin.days'), field: 'weekday', editable: false, width: 150, datatype: 'text' }
        ] 

    }

    onRetrieve() {
        
        this.courseactModel.avlblCapacityFlag = this.avlblCapacityFlag === true ? 'Y' : 'N';
      if (this.nbtProject) {
        this.courseactModel.crsActyId = this.nbtProject;
      }
          this.courseactModel.providerPartyId = this.providerPartyId;
          this.courseactModel.weekDay = this.weekday;
          const courseactResult = this.ocsproinFactory.
            courseActExecuteQuery(this.courseactModel);
          courseactResult.subscribe(data => {
            if (data.length === 0) {
              this.disavlblCapacityFlag = false;
              this.targetOffDis = true;
              this.CommunityServiceData = [];
              this.OffenderDetailsData = [];
              this.show(this.translateService.translate('common.querycaused'));
              this.courseactModel = new CourseActivities();

            } else {
              data.forEach(ele => {
                 ele.avlblCapacityFlag = ele.avlblCapacityFlag === 'Y' ? true : false;
                ele.goButton = "GO";
                ele.targetOffFlag = ele.targetOffFlag === 'Y' ? true : false;
              });
              this.CommunityServiceData = data;
              this.courseactModel = data[0];
              this.retrieveDis= true;
              this.clearDis= false;
              this.disLovValues = true;
              this.disavlblCapacityFlag = true;            }
          });
           
    }

    ScheduleDaysChange(event) {
        if (event) {
            this.weekday = event;
            this.clearDis = false;
            this.retrieveDis = false;

        }
    }

   
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
      }
      changeTeam(event) {
		if (event && event.teamId) {
            this.clearDis = false;
			
			this.teamData = event.teamId;
            this.providerPartyId = event.teamId;

			
			this.rgProjectLov = 'ocsproin/rgProjectsRecordGroup?teamId=' + event.teamId;
		}
		if (!this.teamData) {
			this.nbtProject = '';
			
		}
        else{

        }
	}
   

 onCommServiceRowClick(event){
        if(event)
          this.crsActyId = event.crsActyId;
   this.targetOffDis = event.targetOffFlag ? false : true;
  const courseactResult = this.ocsproinFactory.offenderExecQuery(this.crsActyId);
          courseactResult.subscribe(data => {
            if (data.length === 0) {
              this.OffenderDetailsData = [];
             // this.show(this.translateService.translate('common.querycaused'));
            } else {
              this.OffenderDetailsData = data;
            //   this.courseactModel = data[0];
              this.teamLovReadOnly = true;
              
              
            }
          });
      
    }
      
    onClear() {
      this.targetOffDis = true;
      this.CommunityServiceData=[];
        this.OffenderDetailsData = [];
        this.providerPartyId = undefined;
        this.programStatus = undefined;
        this.teamData = undefined;
        this.nbtProject= undefined;
        this.weekday=undefined
        this.weekDay = [];
         this.avlblCapacityFlag= undefined;
        this.clearDis = true;
        this.retrieveDis = false;
        this.disLovValues = false;
        this.disavlblCapacityFlag = false;
        this.courseactModel = new CourseActivities();
        
    }
  getTargetOffenders = () => {
    if (this.courseactModel.crsActyId) {
      this.courseactModel.readOnlyFlag = true;
      this.dialogService.openLinkDialog('/OCMCTOFF', this.courseactModel, 80).subscribe(result => {
        if (result) {
        }
      });
    }
  }
  isLaunchDisable = (event) => {
    this.dialogService.openLinkDialog('/OCSPROINDIALOG', event, 80).subscribe(result => {

    });
  }

  activeprojectsChange = (event) => {

    if (event) {
        this.nbtProject = event;
        // this.disProvider = false;
        this.clearDis = false;
    }

  }

  cancel() {
      if (!this.nbtProject) {
          this.nbtProject = this.nbtProject === '' ? undefined : '';
      }
  }

  teamcancel(){
 if (!this.teamData) {
      this.teamData = this.teamData === '' ? undefined : '';
  }

  }


}