import {
  Component, OnInit,

  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { VCoursePhaseOfferings } from '@inst/accredited-programs/beans/VCoursePhaseOfferings';
import { VCoursePhaseOfferingsCommitBean } from '@inst/accredited-programs/beans/VCoursePhaseOfferingsCommitBean';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { CourseActivities } from '@instprogramswithoutschedulesbeans/CourseActivities';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OcmsvacpService } from '../service/ocmsvacp.service';
@Component({
  selector: 'app-ocmsvacp',
  templateUrl: './ocmsvacp.component.html'
  /* styleUrls: ['./ocmsvacp.component.css'] */
})

export class OcmsvacpComponent implements OnInit {
  lovReadOnly: boolean;
  enableDelete: boolean;
  enableInsertCms: boolean;
  clearDisable: boolean;
  programPhaseid: any;
  courseId: any;
  serviceId: any;
  // addrInsBtn = true;
  allowEdit: boolean;
  teamLov: string;
  @ViewChild('grid', { static: true }) grid: any;
  @ViewChild('vcrsGrid', { static: true }) vcrsGrid: any;
  @ViewChild('placegrid', { static: false }) placegrid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  ctlblkModel = new CourseActivities();
  vAddressModel: CourseActivities = new CourseActivities();
  vAddressData: CourseActivities[] = [];
  crsactData: CourseActivities[] = [];
  crsactDataTemp: CourseActivities[] = [];
  crsactModel: CourseActivities = new CourseActivities();
  crsactIndex = 0;
  crsactInsertList: CourseActivities[] = [];
  crsactUpdatetList: CourseActivities[] = [];
  crsactDeleteList: CourseActivities[] = [];
  vcrsphsData: VCoursePhaseOfferings[] = [];
  vcrsphsAddrData: VCoursePhaseOfferings[] = [];
  vcrsphsModel: VCoursePhaseOfferings = new VCoursePhaseOfferings();
  vcrsphsModelBean: VCoursePhaseOfferings = new VCoursePhaseOfferings();
  vcrsphsIndex = 0;
  vcrsphsInsertList: VCoursePhaseOfferings[] = [];
  vcrsphsUpdatetList: VCoursePhaseOfferings[] = [];
  vcrsphsDeleteList: VCoursePhaseOfferings[] = [];
  vcrsphsCommitModel = new VCoursePhaseOfferingsCommitBean();
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable = true;
  providerMap: Map<string, string> = new Map<string, string>();
  providerIdMap: Map<string, number> = new Map<string, number>();
  providerTeamIdMap: Map<string, string> = new Map<string, string>();
  vCrsPhsColumnDef: any[];
  crsActColumnDef: any[];
  ctlBlkReadOnly = false;
  crsActReadOnly = false;
  butCtrlReadOnly = false;
  but2CtlReadOnly = false;
  vCrsPhsReadOnly = false;
  rgrefcodeRg: any[] = [];
  rgproviderRg: any[] = [];
  rgteamagylocsRg: any[] = [];
  rgcorplocsRg: any[] = [];
  rgagylocsRg: any[] = [];
  rgaccprogramRg: any[] = [];
  rgintlocationRg: any[] = [];
  rgaddressRg: any[] = [];
  rgagyaddressRg: any[] = [];
  rgallagyaddressRg: any[] = [];
  placementColumnDef: any[];
  type: string;
  message: string;
  addressLink; string;
  index: any;
  crsactCommitModel = new CourseActivitiesCommitBean();
  provideDescLink: string;
  caseLoadId: any;
  description: any;
  caseLoadType: any;
  providerPartyId: any;
  providerSource: string;
  addressTitles = {
    description: this.translateService.translate('common.address'),
    agency: this.translateService.translate('common.agency')
  };

  programLovTitles = { 'description': this.translateService.translate('common.description'),
                       'code': this.translateService.translate('common.code') };
  intLocationLink: string;
  retriveDisable = false;
  crPhaseDisabled = true;
  backupCrsactData: CourseActivities[] = [];
  providerPartyCode: any;
  constructor(private ocmsvacpFactory: OcmsvacpService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager,
    private dialogService: DialogService) {
    this.vCrsPhsColumnDef = [];
    this.crsActColumnDef = [];
    this.placementColumnDef = [];
  }
  ngOnInit() {
    this.providerSource = null;
    this.clearDisable = true;
    this.enableInsertCms = false;
    this.enableDelete = false;
    this.lovReadOnly = true;
    this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
    this.crsActColumnDef = [
      {
        fieldName: this.translateService.translate('ocmsvacp.startdate'), field: 'scheduleStartDate', datatype: 'date', editable: true,
        width: 150,required:true
      },
      {
        fieldName: this.translateService.translate('ocmsvacp.programtype'), field: 'programId', datatype: 'lov',required:true,
        link: 'ocmsvacp/rgAccProgramRecordGroup', editable: true, cellEditable: this.canEdit, width: 150 ,  source:'OCMSERVI', titles: {
          programCode: this.translateService.translate('common.code')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('system-profile.ps-cors-code'), field: 'code', datatype: 'text',
         width: 150, required: true, maxlength: 20, cellEditable:this.canEdit,
      },
      {
        fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description', editable: true,
        datatype: 'text', uppercase: 'false', width: 150, maxlength: 40
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
        datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
        width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('common.comment'), field:'commentText', editable: true,
        datatype: 'text',  width: 150, maxlength:240, uppercase: 'false'
      },
      // { fieldName: '', field: 'programId', hide: true },
      {
        fieldName: this.translateService.translate('ocmsvacp.defaultinternal'), field: 'internalLocationId',datatype: 'lov',
        link: 'ocmsvacp/rgIntLocationRecordGroup?providerPartyCode=', editable: true, width: 150, parentField: 'providerPartyCode' 
      },

      { fieldName: '', field: 'scheduleNotes', hide: true },


    ];
    this.vCrsPhsColumnDef = [
      {
        fieldName: this.translateService.translate('ocmsvacp.includephaze'), field: 'offeringFlag',
        editable: true, width: 150, datatype: 'checkbox', cellEditable: this.canFlagsEdit
      },
      { fieldName: this.translateService.translate('ocmsvacp.no'), field: 'phListSeq', editable: false, width: 150, datatype: 'number' },
      {
        fieldName: this.translateService.translate('ocmsvacp.phase'), field: 'phDescription',
        editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('common.startdate'), field: 'cpStartDate',
        editable: false, width: 150, datatype: 'date'
      },
      { fieldName: this.translateService.translate('common.enddate'), field: 'cpEndDate', editable: false, width: 150, datatype: 'date' },
      {
        fieldName: this.translateService.translate('common.capacity'), field: 'cpCapacity',
        editable: true, width: 150, datatype: 'number', maxValue: 999, whole: true
      },
      {
        fieldName: this.translateService.translate('common.module'), field: 'phModuleFlag',
        editable: false, width: 150, datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('ocmsvacp.noofsessions'), field: 'cpNoOfSessions',
        editable: true, width: 150, datatype: 'number', cellEditable: this.canFlagsEditTwo, whole: true
      },
      {
        fieldName: this.translateService.translate('ocmsvacp.sessionlen'), field: 'cpSessionLength',
        editable: true, width: 150, datatype: 'time', cellEditable: this.canFlagsEditThree
       },
      {
        fieldName: '', field: 'button', datatype: 'launchbutton', editable: true,
        width: 100, data: 'row', updateField: 'row', modal: true, dialogWidth: 70, onLaunchClick: this.onPersonClick

      },


    ];
    this.placementColumnDef = [
      {
        fieldName: this.translateService.translate('common.streetaddress') , field: 'streetAddress', editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: '...', field: 'button', editable: true, width: 150, data: 'row', updateField: 'row',
        modal: true, dialogWidth: 80,displayas:'href',link: '/OCMSVACPDIALOUG',
        datatype: 'hyperlink', styleClass: 'launch' ,onLaunchClick: this.ocmsuwpjDlglClick, isDisable : this.disableCell
      },
      {
        fieldName: this.translateService.translate('common.unitnumber'), field: 'suiteNumber', editable: false, width: 150, datatype: 'text'
      },
      {
        fieldName: this.translateService.translate('ocmsvacp.city'), field: 'cityName', editable: false, width: 150, datatype: 'text'
      },

      { fieldName: this.translateService.translate('common.state'), field: 'provStateDesc', editable: false, width: 150, },
     
      {
        fieldName: this.translateService.translate('common.postalcode'), field: 'postalCode', editable: false, width: 150, datatype: 'text'
      },
      { fieldName: this.translateService.translate('common.country'), field: 'country', editable: false, width: 150, },
     /*  {
        fieldName: 'Internal Location', field: 'internalLocationId', editable: false, width: 150,
        datatype: 'lov'
      },
      {
        fieldName: 'Comment', field: 'cpCommentText', editable: true, width: 150,
         maxlength: 240,  uppercase: 'false', datatype: 'text', cellEditable: this.canCommentEditObj
      }, */

      { fieldName: '', field: 'cpServicesAddressId', hide: true, width: 150, },

    ];


    // TODO all initializations here
    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.description = this.sessionManager.currentCaseLoadName;
    this.caseLoadType = this.sessionManager.currentCaseLoadType;
    const rgAccServiceObj = this.ocmsvacpFactory.rgAccProgramRecordGroup();
    rgAccServiceObj.subscribe(rgteamstaffList => {
      if (rgteamstaffList.length === 0) {
      } else {
        for (let i = 0; i < rgteamstaffList.length; i++) {
          const prgUd = rgteamstaffList.programId;
          this.providerMap.set(rgteamstaffList[i].programId, rgteamstaffList[i].code);
          this.providerIdMap.set(rgteamstaffList[i].code, rgteamstaffList[i].programId);
        }
      }
    });

    const rgTeamServiceObj = this.ocmsvacpFactory.rgTeamAgyLocsRecordGroup(this.caseLoadId);
    rgTeamServiceObj.subscribe(rgteamstaffList => {
      if (rgteamstaffList.length === 0) {
      } else {
        for (let i = 0; i < rgteamstaffList.length; i++) {
          this.providerTeamIdMap.set(rgteamstaffList[i].code, rgteamstaffList[i].teamId);
        }
      }
    });
  }

  disableCell = (data: any, index: number): boolean => {
    if (this.vcrsphsModel.offeringFlag=='Y') {
      return true;
    }
    return false;
  }

  onPersonClick = (data) => {
    // if (data.offeringFlag && data.phModuleFlag) {
    //   this.dialogService.openLinkDialog('/OCMPHMOD', data, 60).subscribe(result => {
    //     if (result) {
    //     }
    // });
    //}
    if (!data.phModuleFlag || !data.coursePhaseId) {
      this.show('ocmsvacp.phaseisnotmodular');
      return false;
      } else {
        this.dialogService.openLinkDialog('/OCMPHMOD', data, 60).subscribe(result => {
          this.vcrsphsExecuteQuery();
          if (result) {
          }
      });
      }
  }
  // ScreenBtn = () => {
    
  //       this.dialogService.openLinkDialog('/OCMPHMOD', this.courseactModel, 80).subscribe(result => {
    
  //       });
  //     }

  canCommentEditObj = (data: any, index: number, field: string) => {
    if (data.offeringFlag === 'Y') {
      return true;
    }
    return false;
  }

  canFlagsEdit = (data: any, index: number, field: string): boolean => {
    if (data.completeFlag && data.offeringFlag === 'N') {
      this.show('common.fieldisprotectedagainstupdate');
      return false;
    }
  }
  canFlagsEditTwo = (data: any, index: number, field: string) => {
    if (data.offeringFlag === true && data.phModuleFlag !== true) {
      return true;
    }
    return false;
  }

  canFlagsEditThree = (data: any, index: number, field: string) => {
    if (data.offeringFlag === true) {
      return true;
    }
    return false;
  }

  canFlagsEditOne = (data: any, index: number, field: string): boolean => {
    if (data.phModuleFlag === 'N' && data.offeringFlag === 'N' || data.coursePhaseId === null) {
      this.type = 'warn';
      this.show('ocmsvacp.phaseisnotmodular');
      return false;
    }
    return true;
  }

  isInsertableOne() {
    if (this.ctlblkModel.providerType || this.ctlblkModel.code) {
      this.clearDisable = false;
    } else {
      this.clearDisable = true;
      this.lovReadOnly = true;
    }
  }

  providerChange(event){
    this.providerPartyId = event ? event.teamId : undefined;
    this.providerPartyCode=event ? event.code:null;
  }
  Insert = () => { // TODO implement on grid insert
  }
  validateRow = (event) => {
    const rowdata = new ValidateRowReturn();
    return rowdata;
  }   /**
   * This function displays the messages
   */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  onClear() {
    this.ctlblkModel = new CourseActivities();
    this.crsactModel = new CourseActivities();
    this.crsactData = [];
    this.vcrsphsModel = new VCoursePhaseOfferings();
    this.vcrsphsData = [];
    this.vAddressData = [];
    this.retriveDisable = false;
    this.crPhaseDisabled = true;
    this.clearDisable = true;
    this.enableInsertCms = false;
    this.enableDelete = false;

  }
  onStatusBlur() {
    if (!this.ctlblkModel.providerType) {
      this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
    }
  }

  onStatusBlurOne() {
    if (!this.ctlblkModel.code) {
      this.ctlblkModel.code = this.ctlblkModel.code === '' ? undefined : '';
    }
  }
  onGridClear = () => {
    this.ocmsvacpexecuteQuery(true);
    return true;
  }
  onRowClickcrsact(event) {
    if (event) {
      this.crsactModel = event;
      //this.crsActColumnDef[7].link = 'ocmsvacp/rgIntLocationRecordGroup?providerPartyCode=' + this.crsactModel.providerPartyCode;
      // this.grid.prepareAgColumnDef();
      this.crPhaseDisabled = true;
      if (event.createDatetime) {
        this.vcrsphsExecuteQuery();
        this.crPhaseDisabled = false;
        if (this.ctlblkModel.providerType === 'INT') {
          if (this.caseLoadType === 'INST') {

            this.addressLink = 'ocmsvacp/rgAddressRecordGroup?providerPartyCode=' + this.crsactModel.providerPartyCode;

          } else {
            this.addressLink = 'ocmsvacp/rgAllAgyAddressRecordGroup?providerPartyId=' + this.crsactModel.providerPartyId;
          }

        } else {
          this.ctlblkModel.providerPartyClass = 'CORP';
          this.addressLink = 'ocmsvacp/rgAddressRecordGroup?providerPartyCode=' + this.crsactModel.providerPartyCode;

        }
      }
    }
    
  
  }
  allowNumbers(event) {
  }
  onButContactClick = () => {
    if (!this.crsactModel.createDatetime) {
      return;
    }
    if (this.crsactModel.activeFlag) {
      this.crsactModel.pQueryOnly = 'N';
    } else {
      this.crsactModel.pQueryOnly = 'Y';
    }
    this.dialogService.openLinkDialog('/OCMSSVCT', this.crsactModel, 80).subscribe(result => {
    });
  }
  onButAreaclick = () => {
    if (!this.crsactModel.createDatetime) {
      return;
    }
    this.dialogService.openLinkDialog('/OCMSSVAS', this.crsactModel, 80).subscribe(result => {
    });
  }
  onButTargetclick = () => {
    if (!this.crsactModel.createDatetime) {
      return;
    }
    this.dialogService.openLinkDialog('/OCMCTOFF', this.crsactModel, 80).subscribe(result => {
    });
  }
  onButScheduleOneclick = () =>  {
    if (!this.crsactModel.createDatetime) {
      return;
    }
    this.dialogService.openLinkDialog('/OCMSCHPR', this.vcrsphsModel, 80).subscribe(result => {
      this.onRowClickcrsact(this.crsactModel);
    });
  }
  onButScheduleAllclick= () =>  {
    if (!this.crsactModel.createDatetime) {
      return;
    }
    this.dialogService.openLinkDialog('/OCMSCHPR', this.crsactModel, 80).subscribe(result => {
      this.onRowClickcrsact(this.crsactModel);
    });
  }
  onRowClickvcrsphs(event) {
    if (event) {
      this.vcrsphsModel = event;
      if(event.offeringFlag){
        this.vcrsGrid.requiredOn('cpSessionLength');
      } else {
        this.vcrsGrid.requiredOff('cpSessionLength');
      }
      if (this.vcrsphsModel.providerPartyId || this.vcrsphsModel.providerPartyCode) {
        this.addresExecuteQuery();
      } else {
        // this.placegrid.addRecord();
      }
    } else {
      this.allowEdit = true;
      this.vAddressData = [];
      // this.vAddressModel = new VAddresses();
    }
  }

  ocmsuwpjDlglClick = (event) => {
    //   if (!event.codeValue) {
    //      return;
    //   }
    // this.addresExecuteQuery();
    // this.vAddressModel = event;
    if (this.ctlblkModel.providerType === 'INT') {
      event.providerPartyCode = this.ctlblkModel.code;
      event.ownerId = this.ctlblkModel.providerPartyId;
      event.providerType = this.ctlblkModel.providerType;
      event.providerPartyCode=this.providerPartyCode;
      this.dialogService.openLinkDialog('/OCMSVACPDIALOUG', event, 80).subscribe(result => {
        if (result) {
          this.placegrid.setColumnData('streetAddress', 0, result.streetAddress);
          this.placegrid.setColumnData('suiteNumber', 0, result.suiteNumber);
          this.placegrid.setColumnData('cityName', 0, result.cityName);
          this.placegrid.setColumnData('provStateDesc', 0, result.provStateDesc);
          this.placegrid.setColumnData('country', 0, result.country);
          this.placegrid.setColumnData('postalCode', 0, result.zipPostalCode);
          this.placegrid.setColumnData('cpServicesAddressId', 0, result.addressId);
        }
        });
    } else {
      event.providerType = this.ctlblkModel.providerType;
      event.providerPartyCode=this.providerPartyCode;
      event.ownerId = Number(this.ctlblkModel.code);
      this.dialogService.openLinkDialog('/OCMSVACPDIALOUG', event, 50).subscribe(result => {
        if (result) {
          this.placegrid.setColumnData('streetAddress', 0, result.streetAddress);
          this.placegrid.setColumnData('suiteNumber', 0, result.suiteNumber);
          this.placegrid.setColumnData('cityName', 0, result.cityName);
          this.placegrid.setColumnData('provStateDesc', 0, result.provStateDesc);
          this.placegrid.setColumnData('country', 0, result.country);
          this.placegrid.setColumnData('postalCode', 0, result.zipPostalCode);
          this.placegrid.setColumnData('cpServicesAddressId', 0, result.addressId);
        } else {
          //   this.areaInformation = undefined;
          //   this.streetInformation = undefined;
          //   this.houseInformation = undefined;
          //   this.country = undefined;
          //   this.postalCode = undefined;
        }
      });
    }
    }
  no() {
  }
  cancel() {
  }
  onOffenderChange(offender) {
  }
  canEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'code' && !data.createDatetime) {
      return true;
    }
    if (field === 'programId') {
      if (!data.createDatetime) {
        return true;
      } else {
        return false;
      }
    }
  }
  providerLovChange() {
    if (this.ctlblkModel.providerType) {
      
    if (this.ctlblkModel.providerType === 'INT') {
      if (this.caseLoadType === 'INST') {
        this.providerSource='OUMAGLOC';
        this.provideDescLink = 'ocmsvacp/rgAgyLocsRecordGroup?caseLoadId=' + this.caseLoadId;
        this.ctlblkModel.providerPartyClass = 'AGY';
        this.ctlblkModel.code='';
        this.lovReadOnly = false;

      } else {
        this.providerSource='OCMTEAMMAIN';
        this.provideDescLink = 'ocmsvacp/rgTeamAgyLocsRecordGroup?caseLoadId=' + this.caseLoadId;
        this.ctlblkModel.code='';
        this.ctlblkModel.providerPartyClass = 'TEAM';
        this.addressLink = 'ocmsvacp/rgAgyLocsRecordGroup?providerPartyId=' + this.crsactModel.providerPartyId;
        this.lovReadOnly = false;
      }


    } else {
      this.providerSource='OUMAGENC';
      this.provideDescLink = 'ocmsvacp/rgCorpLocsRecordGroup';
      this.ctlblkModel.code='';
      this.ctlblkModel.providerPartyClass = 'CORP';
      this.lovReadOnly = false;
    }

  }

  }

  /**
  * This function loads the data into the Master Record and its child records
  */
  ocmsvacpPopulateDetails() {

    this.crsactModel = this.crsactData[this.index];
    const serviceObj = this.ocmsvacpFactory.
      vCrsPhsExecuteQuery(this.crsactModel);
    serviceObj.subscribe(data => {
      if (data !== undefined && data.errorMessage.length > 0) {
        this.crPhaseDisabled = true;
      } else {
        this.vcrsphsData = data;
        this.crPhaseDisabled = false;
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmsvacpSavecrsactForm(event) {
    // if (!this.crsActGridValidation()) {
    //   return;
    // }
    this.crsactInsertList = event.added;
    this.crsactUpdatetList = event.updated;
    this.crsactDeleteList = event.removed;
    this.crsactCommitModel.insertList = [];
    this.crsactCommitModel.updateList = [];
    this.crsactCommitModel.deleteList = [];
    if (this.crsactInsertList.length > 0 || this.crsactUpdatetList.length > 0) {
      if(this.crsactInsertList.length>0){
        if (!this.crsActGridValidation(this.crsactInsertList)) {
          return;
        }
      }

      for (let i = 0; i < this.crsactInsertList.length; i++) {
        this.crsactInsertList[i].activeFlag = this.crsactInsertList[i].activeFlag ? 'Y' : 'N';
        this.crsactInsertList[i].createUserId = this.sessionManager.getId();
        this.crsactInsertList[i].modifyUserId = this.sessionManager.getId();
        this.crsactInsertList[i].createDatetime = DateFormat.getDate();
        this.crsactInsertList[i].providerType = this.ctlblkModel.providerType;
        this.crsactInsertList[i].programId = Number(this.crsactInsertList[i].programId);
        this.crsactInsertList[i].commentText = this.crsactModel.commentText;

        // rgteamstaffList[i].programId, rgteamstaffList[i].code
        this.crsactInsertList[i].caseloadType = this.caseLoadType;
        this.crsactInsertList[i].courseActivityType = 'AP';
        this.crsactInsertList[i].courseClass = 'COURSE';
        if (this.ctlblkModel.providerType === 'INT') {
          if (this.caseLoadType === 'INST') {
            this.crsactInsertList[i].providerPartyCode = this.ctlblkModel.code;
            this.crsactInsertList[i].providerPartyClass = 'AGY';

          } else {
            this.crsactInsertList[i].providerPartyCode = this.ctlblkModel.code;
            this.crsactInsertList[i].providerPartyId = this.providerPartyId;
            this.crsactInsertList[i].providerPartyClass = 'TEAM';
          }

        } else {
          this.crsactInsertList[i].providerPartyId = Number(this.ctlblkModel.code);
          this.crsactInsertList[i].providerPartyClass = 'CORP';
          // this.crsactInsertList[i].providerPartyCode = this.ctlblkModel.code;
        }
      }
      if(this.crsactUpdatetList.length>0){
        if (!this.crsActGridValidation(this.crsactUpdatetList)) {
          return;
        }
      }
      for (let i = 0; i < this.crsactUpdatetList.length; i++) {
        this.crsactUpdatetList[i].programId =Number(this.crsactUpdatetList[i].programId);
        this.crsactUpdatetList[i].activeFlag = this.crsactUpdatetList[i].activeFlag ? 'Y' : 'N';
      }
      this.crsactCommitModel.insertList = this.crsactInsertList;
      this.crsactCommitModel.updateList = this.crsactUpdatetList;
    }
    if (this.crsactDeleteList.length > 0) {
      for (let i = 0; i < this.crsactDeleteList.length; i++) {
      }
      this.crsactCommitModel.deleteList = this.crsactDeleteList;
    }
    const crsactSaveData = this.ocmsvacpFactory.crsActCommit(this.crsactCommitModel);
    crsactSaveData.subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.ocmsvacpexecuteQuery();
        return;
      } else if (data === 2) {
        this.show('ocmsvacp.occurrencecannotbedeletedwhilethereareincludedphases', 'warn');
        this.ocmsvacpexecuteQuery();
        return;
      } else if (data === 3) {
        this.show('ocmsvacp.cannotdeletemasterchildrecord', 'warn');
        this.ocmsvacpexecuteQuery();
        return;
      } else if (data === 4) {
        this.show('ocmsvacp.codealreadyexists', 'warn');
        this.ocmsvacpexecuteQuery();
        return;
      }
      else {
        this.show('common.addupdateremoverecordfailed');
        this.ocmsvacpexecuteQuery();
        return;
      }
    });
  }

  // execute query
  ocmsvacpexecuteQuery(data?) {
    //   if (!this.crsDataSearchValidation()) {
    //    return;
    //   }
    if(!this.ctlblkModel.providerType){
      this.show('ocmsvacp.providertypemustbeentered','warn');
      return;
    }
    if (!this.ctlblkModel.code) {
      this.show('ocmsvacp.providermustbeentered', 'warn');
      return;
    }
    this.ctlblkModel.courseActivityType = 'AP';
    if (this.ctlblkModel.providerType === 'INT') {
      if (this.caseLoadType === 'INST') {
        this.ctlblkModel.providerPartyCode = this.ctlblkModel.code;
      } else {
        this.ctlblkModel.providerPartyId = this.providerPartyId;
      }

    } else {
      this.ctlblkModel.providerPartyId = Number(this.ctlblkModel.code);
    }
    const serviceObj = this.ocmsvacpFactory.
      crsActExecuteQuery(this.ctlblkModel);
    serviceObj.subscribe(data => {
      if (data && data.length === 0) {
        this.crsactData = [];
        this.vcrsphsData = [];
        this.vAddressData = [];
        this.lovReadOnly = true;
        if (!data) {
          this.show(this.translateService.translate('common.querycaused'));
        }
        this.enableInsertCms = true;
      } else {
        data.forEach(obj => {
          obj.programCode = this.providerMap.get(obj.programId);
          obj.coursePhaseId = obj.crsActyId;
          obj.activeFlag = obj.activeFlag === 'Y' ? true : false;
          obj.programId = String(obj.programId);
          obj.providerPartyCode = this.ctlblkModel.code;
           //this.crsActColumnDef[7].link = 'ocmsvacp/rgIntLocationRecordGroup?providerPartyCode=' + obj.providerPartyCode;
           //this.grid.prepareAgColumnDef();
        });
        this.crsactData = data;
        this.crsactModel = this.crsactData[0];
        this.backupCrsactData = JSON.parse(JSON.stringify(this.crsactData));
        this.crsactIndex = 0;
        this.retriveDisable = true;
        this.clearDisable = false;
        this.enableInsertCms = true;
        this.enableDelete = true;
        this.lovReadOnly = true;
       // this.populateDetails();
      }
    });
  }

  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.grid.setColumnData('expiryDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.grid.setColumnData('expiryDate', rowIndex,
          DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;

  }

  vcrsphsValidateRowDataOne = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'offeringFlag') {
      if (event.field === 'offeringFlag' && event.data.offeringFlag === true) {
        event.data.cpCourseActivityType = 'PROG_SESS';
        this.vcrsGrid.setColumnData('cpCapacity', rowIndex, event.data.phCapacity);
        this.vcrsGrid.setColumnData('cpNoOfSessions', rowIndex, event.data.phNoOfSessions);
        this.vcrsGrid.setColumnData('cpSessionLength', rowIndex, event.data.phSessionLengthTemp);
        if (event.data.phSessionLengthTemp !== 0 && event.data.phSessionLengthTemp !== null) {
          event.data.phSessionLength = Math.abs(event.data.phSessionLengthTemp / 60).toFixed(2);
          if (event.data.phSessionLength.toString().includes('.')) {
            var time = event.data.phSessionLength + '';
            var val = time.split('.');
            var val1 = Number(val[0]);
            var val2 = Number(val[1]); 
            var minutes = Math.round((val2 / 100) * 60);
            event.data.phSessionLength = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
          } else {
            event.data.phSessionLength = DateFormat.getDate(DateFormat.getDate().setHours(event.data.phSessionLength, 0, 0, 0));
          }
          this.vcrsGrid.setColumnData('cpSessionLength', rowIndex, event.data.phSessionLength);
         }
        event.data.caseLoadType = this.caseLoadType;
        // event.data.providerPartyId = this.ctlblkModel.providerType;
        event.data.providerPartyCode = this.ctlblkModel.code;

        if (this.ctlblkModel.providerType === 'INT' && event.data.caseLoadType === 'INST') {
          event.data.providerPartyClass = 'AGY';
        } else if (this.ctlblkModel.providerType === 'INT' && event.data.caseLoadType === 'COMM') {
          event.data.providerPartyClass = 'TEAM';
        } else if (this.ctlblkModel.providerType === 'EXT') {
          event.data.providerPartyClass = 'CORP';
        }
        this.serviceId = undefined;
        this.courseId = undefined;
        this.programPhaseid = undefined;
        // this.vcrsphsData.forEach(elementData => {
          if (event.data.cpServicesAddressId) {
            this.serviceId = event.data.cpServicesAddressId;
            this.courseId = event.data.courseId;
            this.programPhaseid = event.data.programPhaseId;
          }
        // });
        if (this.serviceId) {
          this.vcrsphsModelBean = new VCoursePhaseOfferings();
          this.vcrsphsModelBean.cpServicesAddressId = this.serviceId;
          this.vcrsphsModelBean.courseId = this.courseId;
          this.vcrsphsModelBean.programPhaseId = this.programPhaseid;
          this.serviceId = undefined;
          this.courseId = undefined;
          this.programPhaseid = undefined;
          const serviceObj = this.ocmsvacpFactory.addressExecuteQuery(this.vcrsphsModelBean);
          serviceObj.subscribe(data => {
            if (data.length > 0) {
              this.placegrid.setColumnData('streetAddress', 0, data[0].streetAddress);
              this.placegrid.setColumnData('suiteNumber', 0, data[0].suiteNumber);
              this.placegrid.setColumnData('cityName', 0, data[0].cityName);
              this.placegrid.setColumnData('provStateDesc', 0, data[0].provStateDesc);
              this.placegrid.setColumnData('country', 0, data[0].country);
              this.placegrid.setColumnData('postalCode', 0, data[0].postalCode);
              // this.placegrid.setColumnData('crsServicesAddressId', this.vAddressData.length - 1, event.crsServicesAddressId);
              // this.placegrid.setColumnData('area', 0, data.area);
              // this.placegrid.setColumnData('streetInformation', 0, data.streetInformation);
              // this.placegrid.setColumnData('house', 0, data.suiteNumber);
              // this.placegrid.setColumnData('country', 0, data.country);
              // this.placegrid.setColumnData('postalCode', 0, data.zipPostalCode);
              this.placegrid.setColumnData('cpServicesAddressId', 0, data[0].cpServicesAddressId);
            }
            if (this.crsactModel.internalLocationIdVal != null) {
              this.vcrsphsModel.cpInternalLocationId = Number(this.crsactModel.internalLocationIdVal);
            }
          });
        }
        // }
      } else {
        this.vcrsGrid.setColumnData('cpCapacity', rowIndex, undefined);
        this.vcrsGrid.setColumnData('cpNoOfSessions', rowIndex, undefined);
        this.vcrsGrid.setColumnData('cpSessionLength', rowIndex, undefined);
        this.placegrid.setColumnData('streetAddress',rowIndex, undefined);
        this.placegrid.setColumnData('suiteNumber', rowIndex, undefined);
        this.placegrid.setColumnData('cityName', 0, rowIndex, undefined);
        this.placegrid.setColumnData('provStateDesc', rowIndex, undefined);
        this.placegrid.setColumnData('country', 0, undefined);
        this.placegrid.setColumnData('postalCode', 0, undefined);
        // this.vcrsGrid.setColumnData('offeringFlag', 0, false);

      }

    }
    rowdata.validated = true;
    return rowdata;
  }

  vcrsAddressSavecrsactForm(event) {
    this.vcrsphsCommitModel = new VCoursePhaseOfferingsCommitBean();
    this.vcrsphsInsertList = [];
    this.vcrsphsUpdatetList = [];
    this.vcrsphsUpdatetList = event.updated;
    this.crsactDeleteList = event.removed;
    this.vcrsphsCommitModel.insertList = [];
    this.vcrsphsCommitModel.updateList = [];
    this.vcrsphsCommitModel.deleteList = [];
    // this.vcrsGrid.addedMap.forEach(
    //   (v: any, k: number) => {
    //     this.vcrsphsUpdatetList.push(v);
    //   }
    // );
    this.vcrsGrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.vcrsphsUpdatetList.push(v);
      }
    );


    if (this.vcrsphsUpdatetList.length > 0) {
      for (let i = 0; i < this.vcrsphsUpdatetList.length; i++) {
        this.vcrsphsUpdatetList[i].cpCommentText = this.vcrsphsUpdatetList[i].cpCommentText;
        this.vcrsphsUpdatetList[i].offeringFlag = this.vcrsphsUpdatetList[i].offeringFlag ? 'Y' : 'N';
        this.vcrsphsUpdatetList[i].phModuleFlag = this.vcrsphsUpdatetList[i].phModuleFlag ? 'Y' : 'N';
        if(this.vcrsphsUpdatetList[i].cpStartDate){
          this.vcrsphsUpdatetList[i].cpStartDate = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpStartDate);
        }
        if(this.vcrsphsUpdatetList[i].cpEndDate){
          this.vcrsphsUpdatetList[i].cpEndDate = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpEndDate);
        }
        this.vcrsphsUpdatetList[i].cpCourseActivityType = this.crsactModel.courseActivityType;
        this.vcrsphsUpdatetList[i].courseCaseLoadType = this.sessionManager.currentCaseLoadType;
        if (this.vcrsphsUpdatetList[i].coursePhaseId == null) {
          if (!isNaN(this.vcrsphsUpdatetList[i].cpSessionLength) && this.vcrsphsUpdatetList[i].cpSessionLength != null) {
            this.vcrsphsUpdatetList[i].cpSessionLength =
              (DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getMinutes())
              + DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getHours() * 60;
          }
        }
          this.vcrsphsUpdatetList[i].phSessionLength = null;
        this.vcrsphsUpdatetList[i].cpNoOfSessions = Number(this.vcrsphsUpdatetList[i].cpNoOfSessions);
        this.vcrsphsUpdatetList[i].cpCapacity = Number(this.vcrsphsUpdatetList[i].cpCapacity);
        this.vcrsphsUpdatetList[i].cpServicesAddressId = this.vcrsphsModelBean.cpServicesAddressId;

        if (this.vcrsphsUpdatetList[i].offeringFlag === 'N') {
          this.vcrsphsUpdatetList[i].cpServicesAddressId = undefined;
          this.vcrsphsUpdatetList[i].cpCapacity = undefined;
          this.vcrsphsUpdatetList[i].cpNoOfSessions = undefined;

      }
    }
      this.vcrsphsCommitModel.updateList = this.vcrsphsUpdatetList;
    }
    const courseactSaveData = this.ocmsvacpFactory.vCrsPhsCommit(this.vcrsphsCommitModel);
    courseactSaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.addresExecuteQuery();
        this.vcrsphsExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed');
        this.addresExecuteQuery();
        this.vcrsphsExecuteQuery();
        return;
      }
    });
  }
  onGridInsert = () => {
    this.enableDelete = false;
    // if (!this.crsActGridValidation()) {
    //   return false;
    // }
    this.vcrsphsData =[];
    this.vcrsphsModel =new VCoursePhaseOfferings();
    this.vAddressData = [];
    return {
      activeFlag: true,
      updateAllowedFlag: true,
      providerPartyCode: this.ctlblkModel.code
    };
  }
  onGridDelete = () => {
    
    if(this.crsactModel.caCount >  0 || this.crsactModel.carCount >  0 || this.crsactModel.csrCount >  0 ||
       this.crsactModel.csCount >  0 || this.crsactModel.ocaCount >  0 || this.crsactModel.oppCount >  0 ||
       this.crsactModel.ppbofcCount >  0 || this.crsactModel.ppcCount >  0){
      this.show('ocmsvacp.cannotdeletemasterchildrecord');
      return false;
    }else{
      return true;
    }
  }
  onAddGridInsert = () => {
    return {
      button: '..',
    };
  }
  get addrInsBtn() {
    if (this.vcrsphsData.length === 0) {
      return false;
    } else if (this.vcrsphsModel.providerPartyId && this.vAddressData.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  get readeOnlyFields() {
    if (this.crsactData.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  crsDataSearchValidation() {
    const is = { valid: true };
    if (!this.ctlblkModel.providerType || !this.ctlblkModel.providerType.trim()) {
      this.show('ocmsvacp.providertypemust', 'warn');
      is.valid = false;
      return is.valid;

    }
    if (!this.ctlblkModel.code || !this.ctlblkModel.code) {
      this.show('ocmsvacp.provider', 'warn');
      is.valid = false;
      return is.valid;

    }
    return is.valid;

  }

  crsActGridValidation(list) {
    const is = { valid: true };
    list.forEach(data => {
      if (is.valid) {
        if (!data.scheduleStartDate) {
          this.show('ocmsvacp.startDateMust', 'warn');
          is.valid = false;
          return;
        }
      }
      if (!data.programId || !data.programId) {
        this.show('ocmsvacp.programmust', 'warn');
        is.valid = false;
        return;
      }
      if (!data.code || !data.code.trim()) {
        this.show('ocmsvacp.codemust', 'warn');
        is.valid = false;
        return;
      }
      if (!data.description || !data.description.trim()) {
        this.show('ocmsvacp.descriptionmust', 'warn');
        is.valid = false;
        return;
      }
      if (DateFormat.compareDate(DateFormat.getDate(data.expiryDate),
        DateFormat.getDate()) === 1) {
        this.show(this.translateService.translate('ocmsvacp.expirydatecannotbelaterthanallocenddate'), 'warn');
        return;
      }
      if (DateFormat.compareDate(DateFormat.getDate(data.expiryDate),
        DateFormat.getDate()) > 0) {
        this.show(this.translateService.translate('ocmsvacp.expirydatecannotbeearlierthanallocenddate'), 'warn');
        return;
      }
      for (let i = 0; i < list.length; i++) {
        const dupData = this.crsactData.filter(opt => this.crsactData[i].code === opt.code);
            if (dupData && dupData.length > 1) {
                this.show('ocmsvacp.codealreadyexists');
                is.valid = false;
                return;
            }
    }

    });
    return is.valid;
  }

  vcrsphstabValidation() {
    const is = { valid: true };
    this.vcrsphsData.forEach(data => {
      if (is.valid) {
        if (!data.cpSessionLength) {
          this.show('ocmsvacp.sessionlengthmust');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }

  vcrsphsExecuteQuery() {
    const vcrsphsResult = this.ocmsvacpFactory.
      vCrsPhsExecuteQuery(this.crsactModel);
    vcrsphsResult.subscribe(data => {
      if (data.length === 0) {
        this.vcrsphsData = [];
        this.vAddressData = [];
        this.crPhaseDisabled= true;
      } else {
        data.forEach(element => {
          element['button'] = this.translateService.translate('ocmsvacp.module');;
          element.offeringFlag = element.offeringFlag === 'Y' ? true : false;
          element.phModuleFlag = element.phModuleFlag === 'Y' ? true : false;
          element.phSessionLengthTemp = element.phSessionLength; 
          if (element.cpSessionLength !== 0 && element.cpSessionLength !== null) {
            element.cpSessionLength = Math.abs(element.cpSessionLength / 60).toFixed(2);
            if (element.cpSessionLength.toString().includes('.')) {
              var time = element.cpSessionLength + '';
              var val = time.split('.');
              var val1 = Number(val[0]);
              var val2 = Number(val[1]);
              var minutes = Math.round((val2 / 100) * 60);
              element.cpSessionLength = DateFormat.getDate(DateFormat.getDate().setHours(val1, minutes, 0, 0));
            } else {
              element.cpSessionLength = DateFormat.getDate(DateFormat.getDate().setHours(element.cpSessionLength, 0, 0, 0));
            }
          } else {
          }
        });
        this.vcrsphsData = data;
        this.vcrsphsModel = data[0];
        this.vcrsphsIndex = 0;
        this.crPhaseDisabled = false;
      }
    });
  }



  addresExecuteQuery() {
    // this.vAddressModel.providerPartyId = this.vcrsphsModel.providerPartyId;
    // this.vAddressModel.crsServicesAddressId = this.vcrsphsModel.crsServicesAddressId;
    this.vcrsphsModelBean.courseId = this.vcrsphsModel.courseId;
    this.vcrsphsModelBean.programPhaseId = this.vcrsphsModel.programPhaseId;
    const vcrsphsResult = this.ocmsvacpFactory.
      addressExecuteQuery(this.vcrsphsModelBean);
    vcrsphsResult.subscribe(vcrsphsResultList => {
      if (vcrsphsResultList.length === 0) {
        this.vAddressData = [];
        this.placegrid.addRecord();
        // this.placegrid.addRecord();
        // this.addrInsBtn = true;
      } else {
        // this.addrInsBtn = false;
        this.vcrsphsIndex = 0;
        vcrsphsResultList.forEach(element => {
          if(this.vcrsphsModel.offeringFlag && this.vcrsphsModel.coursePhaseId){
            element['button'] = this.translateService.translate('...');
          }else{
            element['button'] = undefined;
          }
        });
        this.vAddressData = vcrsphsResultList;
        this.vcrsphsModelBean = vcrsphsResultList[0];
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
   ocmsvacpSavevcrsphsForm(event) {
    // if (!this.vcrsphstabValidation()) {
    //   return;
    // }
    this.vcrsphsInsertList = [];
    this.vcrsphsUpdatetList = [];
    this.vcrsphsInsertList = event.added;
    this.vcrsphsUpdatetList = event.updated;
    this.vcrsphsDeleteList = event.removed;
    this.vcrsphsCommitModel.insertList = [];
    this.vcrsphsCommitModel.updateList = [];
    this.vcrsphsCommitModel.deleteList = [];
    if (this.vcrsphsInsertList.length > 0 || this.vcrsphsUpdatetList.length > 0) {
      for (let i = 0; i < this.vcrsphsInsertList.length; i++) {
        this.vcrsphsInsertList[i].programId = Number(this.vcrsphsInsertList[i].programId);
        this.vcrsphsCommitModel.insertList = this.vcrsphsInsertList;
      }
      for (let i = 0; i < this.vcrsphsUpdatetList.length; i++) {
        if (this.vcrsphsUpdatetList[i].offeringFlag) {
          if ((this.vcrsphsUpdatetList[i].cpSessionLength === undefined || this.vcrsphsUpdatetList[i].cpSessionLength === null)) {
            this.show('ocmsvacp.sessionlengthmust');
            return;
          }
          const hours = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getHours();
          const minutes = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getMinutes();
          if (hours === 0 && minutes === 0) {
            this.show('ocmsvacp.sessionlengthmustbegreaterthazero');
            return;
          }

        }
        this.vcrsphsUpdatetList[i].programId = Number(this.vcrsphsUpdatetList[i].programId);
        this.vcrsphsUpdatetList[i].cpStartDate = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpStartDate);
       // this.vcrsphsUpdatetList[i].cpEndDate = DateFormat.getDate(this.vcrsphsUpdatetList[i].cpEndDate);
        this.vcrsphsUpdatetList[i].offeringFlag = this.vcrsphsUpdatetList[i].offeringFlag ? 'Y' : 'N';
        this.vcrsphsUpdatetList[i].phModuleFlag = this.vcrsphsUpdatetList[i].phModuleFlag ? 'Y' : 'N';
        this.vcrsphsUpdatetList[i].cpSessionLength =
          (DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getMinutes())
          + DateFormat.getDate(this.vcrsphsUpdatetList[i].cpSessionLength).getHours() * 60;
          this.vcrsphsUpdatetList[i].phSessionLength = this.vcrsphsUpdatetList[i].phSessionLengthTemp;
        this.vcrsphsUpdatetList[i].cpNoOfSessions = Number(this.vcrsphsUpdatetList[i].cpNoOfSessions);
        this.vcrsphsUpdatetList[i].cpCapacity = Number(this.vcrsphsUpdatetList[i].cpCapacity);
        //this.vcrsphsUpdatetList[i].cpCourseActivityType = this.crsactModel.courseActivityType;
        this.vcrsphsUpdatetList[i].cpServicesAddressId = this.vcrsphsModelBean.cpServicesAddressId;//12890
        if (this.vcrsphsUpdatetList[i].offeringFlag === 'N') {
          this.vcrsphsUpdatetList[i].cpServicesAddressId = undefined;
          this.vcrsphsUpdatetList[i].cpCapacity = undefined;
          this.vcrsphsUpdatetList[i].cpNoOfSessions = undefined;


        }
        this.vcrsphsCommitModel.updateList = this.vcrsphsUpdatetList;
      }
    }
    if (this.vcrsphsDeleteList.length > 0) {
      for (let i = 0; i < this.vcrsphsDeleteList.length; i++) {
      }
      this.vcrsphsCommitModel.deleteList = this.vcrsphsDeleteList;
    }
    const vcrsphsSaveData = this.ocmsvacpFactory.vCrsPhsCommit(this.vcrsphsCommitModel);
    vcrsphsSaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.vcrsphsExecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        this.vcrsphsExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.sealFlag === 'CSR_SCH_CRS_ACTY_FK') {
      // this.message = this.translateService.translate('common.recordcannotbedeletedparent');
    // this.message = String(this.message).replace('%tablename%', data.sealFlag);
    this.show('ocmsvacp.cannotremovephase');
    this.vcrsphsExecuteQuery();
    return;
 } else if (data && data.sealFlag && data.listSeq === 2292) {
    this.message = this.translateService.translate
          ('common.recordcannotbedeletedparent');
      this.message = String(this.message).replace('%tablename%', data.sealFlag);
      this.show(this.message, 'warn');
    this.vcrsphsExecuteQuery();
    return;
  }
    });

}


  isInsertable(event) {
    const index = this.crsactData.indexOf(this.crsactModel);
    this.grid.setColumnData('scheduleNotes', index, event);
  }

  onRowClickAddress(event) {
    if (event) {
      this.vcrsphsModelBean = event;
    }
  }
  onGridClearOne = () => {
    this.vcrsphsExecuteQuery();
    return true;
}
onGridClearTwo = () => {
  this.addresExecuteQuery();
  return true;
}
  onInternalLocIdBlur() {
    if (!this.crsactModel.internalLocationIdVal) {
      this.crsactModel.internalLocationIdVal = this.crsactModel.internalLocationIdVal === '' ? undefined : '';
    }
  }

  get crPhaseDisabledRec(){
    if(this.vcrsphsModel.coursePhaseId){
     return false;
    } else{
      return true;
    }
  }
}
