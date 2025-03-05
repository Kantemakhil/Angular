import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidcoasiService } from '@inst/workflow/managingworkassignments/servies/oidcoasi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VPimsNameSearch } from '@cm/searchassaign/beans/VPimsNameSearch';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { OcinamesService } from '@cm/searchassaign/service/ocinames.service';
import { OidcoasiOffenderAssignments } from '@inst/workflow/managingworkassignments/beans/OidcoasiOffenderAssignments';
import { OidcoasiOffenderAssignmentsCommitBean } from '@inst/workflow/managingworkassignments/beans/OidcoasiOffenderAssignmentsCommitBean';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
// import required bean declarations

@Component({
   selector: 'app-oidcoasi',
   templateUrl: './oidcoasi.component.html'
})

export class OidcoasiComponent implements OnInit {
   // Variable declaration
   @ViewChild('grid') grid: any;
   msgs: any[] = [];
   vnsearchModelData: VPimsNameSearch = new VPimsNameSearch();
   offasgnData: OidcoasiOffenderAssignments[] = [];
   officersList: StaffMembers[] = [];
   offasgnDataTemp: OidcoasiOffenderAssignments[] = [];
   offenderAssignmentSearchModel: OidcoasiOffenderAssignments = new OidcoasiOffenderAssignments();
   offasgnCommitModel: OidcoasiOffenderAssignmentsCommitBean = new OidcoasiOffenderAssignmentsCommitBean();
   offasgnIndex = -1;
   offasgnInsertList: OidcoasiOffenderAssignments[] = [];
   offasgnUpdatetList: OidcoasiOffenderAssignments[] = [];
   offasgnDeleteList: OidcoasiOffenderAssignments[] = [];
   offAsgnColumnDef: any[];
   msglist: any[];
   message: any;
   type: any;
   caseLoadId: string;
   facilityLink: string;
   disableSearchFields: boolean;
   disableHLOneLovField: boolean;
   disableHLTwoLovField: boolean;
   disableHLThreeLovField: boolean;
   disableHLFourLovField: boolean;
   disableOfficerLovField: boolean;
   confirmationAllFlag: boolean;
   unassignedFlag: boolean;
   gridIndex = -1;
   facilityLovTitles = {
      code: this.translateService.translate('oidcoasi.facility'),
      description: this.translateService.translate('common.description')
   };
   houseLocationLovTitles = {
      description: this.translateService.translate('common.housinglocation'),
      code: this.translateService.translate('oidcoasi.unitid')
   };
   officerLovTitles = {
      description: this.translateService.translate('common.lastname'),
      firstName: this.translateService.translate('common.firstname'),
      code: this.translateService.translate('oidcoasi.officerid'),

   };
   housingLocationLinkOne: string;
   officerLovLink: string;
   housingLocationLinkFour: string;
   housingLocationLinkThree: string;
   housingLocationLinkTwo: string;
   retrievedisabled: boolean;
   clearDisabled: boolean;
   user: string;
   disableConfirmAll: boolean;
   enableFlag: boolean;
   constructor(private oidcoasiFactory: OidcoasiService, public translateService: TranslateService,
      public sessionManager: UserSessionManager, public dialogService: DialogService,
      private ocinamesFactory: OcinamesService, private oiinamesFactory: OiinamesService) {
      // TODO initilize data members here..!
      this.offAsgnColumnDef = [];
   }
   ngOnInit() {
      this.unassignedFlag = false;
      this.disableConfirmAll = true;
      this.confirmationAllFlag = false;
      this.disableHLOneLovField = true;
      this.disableHLTwoLovField = true;
      this.disableHLThreeLovField = true;
      this.disableHLFourLovField = true;
      this.disableOfficerLovField = true;
      this.clearDisabled = true;
      this.retrievedisabled = true;
      this.disableSearchFields = false;
      this.offenderAssignmentSearchModel.movementDate = DateFormat.getDate();
      this.offenderAssignmentSearchModel.movementTime = DateFormat.getDate();
      this.user = this.sessionManager.getId();
      this.offAsgnColumnDef = [
         {
            fieldName: this.translateService.translate('oidcoasi.c'), field: 'confirmationFlagOne', editable: true, width: 150,
            datatype: 'checkbox'
         },
         { fieldName: this.translateService.translate('common.aos'), field: 'offenderId', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.location'), field: 'agyLocDescription', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('oidcoasi.officelastname'), field: 'caseOfficerId', editable: true, width: 150,
            datatype: 'lov', link: this.officerLovLink, titles: this.officerLovTitles, cellEditable: this.canCellEdit, required: true,
         },
         { fieldName: this.translateService.translate('common.firstname'), field: 'staffFirstName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oidcoasi.id'), field: 'caseOfficerId', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('common.date'), field: 'caseAssignedDate', editable: true, required: true,
            width: 150, datatype: 'date'
         },
         {
            fieldName: this.translateService.translate('common.time'), field: 'caseAssignedTime', required: true,
            editable: true, width: 150, datatype: 'time'
         },
         {
            fieldName: '', field: 'hideVal', hide: true,
         },
      ];

      this.caseLoadId = this.sessionManager.currentCaseLoad;
      this.facilityLink = '/oidcoasi/rgAgyLocIdRecordGroup?caseloadId=' + this.caseLoadId;
   }
   /** 
  * This function displays the messages
  */
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   canCellEdit = (data: any, index: number, field: string): boolean => {
      if (!this.offenderAssignmentSearchModel.assignOfficerStaffId) {
         return true;
      } else {
         return false;
      }
   }

   changeFacility(event) {
      this.housingLocationLinkOne = '/oidcoasi/rgLivingUnitCodeOneRecordGroup?agyLocId=' + this.offenderAssignmentSearchModel.agyLocId;
      this.officerLovLink = '/oidcoasi/rgStaffIdRecordGroup?agyLocId=' + this.offenderAssignmentSearchModel.agyLocId;
      this.getOfficerLovData();
      this.rgLivingUnitCodeOneRecordGroup();
   }

   rgLivingUnitCodeOneRecordGroup() {
      if (this.offenderAssignmentSearchModel.agyLocId) {
         const rgLivingUnitCodeOne = this.oidcoasiFactory.rgLivingUnitCodeOneRecordGroup(this.offenderAssignmentSearchModel.agyLocId);
         rgLivingUnitCodeOne.subscribe(data => {
            if (data && data.length > 0) {
               this.disableHLOneLovField = false;
            } else {
               this.disableHLOneLovField = true;
            }
         });
      }
   }

   rgLivingUnitCodeTwoRecordGroup(event) {
      this.disableHLThreeLovField = true;
      this.disableHLFourLovField = true;
      if (this.offenderAssignmentSearchModel.agyLocId && this.offenderAssignmentSearchModel.livingUnitCodeOne) {
         const rgLivingUnitCodeTwo = this.oidcoasiFactory.rgLivingUnitCodeTwoRecordGroup(this.offenderAssignmentSearchModel.agyLocId,
            this.offenderAssignmentSearchModel.livingUnitCodeOne);
         rgLivingUnitCodeTwo.subscribe(data => {
            this.offenderAssignmentSearchModel.livingUnitCodeOne = event.description;
            if (data && data.length > 0) {
               this.disableHLTwoLovField = false;
            } else {
               this.disableHLTwoLovField = true;
            }
         });
      }
   }

   rgLivingUnitCodeThreeRecordGroup(event) {
      this.disableHLFourLovField = true;
      if (this.offenderAssignmentSearchModel.agyLocId && this.offenderAssignmentSearchModel.livingUnitCodeTwo) {
         const rgLivingUnitCodeThree = this.oidcoasiFactory.rgLivingUnitCodeThreeRecordGroup(this.offenderAssignmentSearchModel.agyLocId,
            this.offenderAssignmentSearchModel.livingUnitCodeTwo);
         rgLivingUnitCodeThree.subscribe(data => {
            this.offenderAssignmentSearchModel.livingUnitCodeTwo = event.description;
            if (data && data.length > 0) {
               this.disableHLThreeLovField = false;
            } else {
               this.disableHLThreeLovField = true;
            }
         });
      }
   }

   rgLivingUnitCodeFourRecordGroup(event) {
      if (this.offenderAssignmentSearchModel.agyLocId && this.offenderAssignmentSearchModel.livingUnitCodethree) {
         const rgLivingUnitCodeFour = this.oidcoasiFactory.rgLivingUnitCodeFourRecordGroup(this.offenderAssignmentSearchModel.agyLocId,
            this.offenderAssignmentSearchModel.livingUnitCodethree);
         rgLivingUnitCodeFour.subscribe(data => {
            this.offenderAssignmentSearchModel.livingUnitCodethree = event.description;
            if (data && data.length > 0) {
               this.disableHLFourLovField = false;
            } else {
               this.disableHLFourLovField = true;
            }
         });
      }
   }

   getOfficerLovData() {
      const offasgnResult = this.oidcoasiFactory.getOfficerLovData(this.offenderAssignmentSearchModel.agyLocId);
      offasgnResult.subscribe(data => {
         if (data && data.length > 0) {
            this.officersList = data;
            this.disableOfficerLovField = false;
         } else {
            this.officersList = [];
            this.disableOfficerLovField = true;
         }
      });
   }

   changeHousingLocationOne(event) {
      this.housingLocationLinkTwo = '/oidcoasi/rgLivingUnitCodeTwoRecordGroup?agyLocId='
         + this.offenderAssignmentSearchModel.agyLocId + '&livingUnitId=' + this.offenderAssignmentSearchModel.livingUnitCodeOne;
      this.rgLivingUnitCodeTwoRecordGroup(event);
   }

   changeHousingLocationTwo(event) {
      this.housingLocationLinkThree = '/oidcoasi/rgLivingUnitCodeThreeRecordGroup?agyLocId='
         + this.offenderAssignmentSearchModel.agyLocId + '&livingUnitId=' + this.offenderAssignmentSearchModel.livingUnitCodeTwo;
      this.rgLivingUnitCodeThreeRecordGroup(event);
   }

   changeHousingLocationThree(event) {
      this.housingLocationLinkFour = '/oidcoasi/rgLivingUnitCodeFourRecordGroup?agyLocId='
         + this.offenderAssignmentSearchModel.agyLocId + '&livingUnitId=' + this.offenderAssignmentSearchModel.livingUnitCodethree;
      this.rgLivingUnitCodeFourRecordGroup(event);
   }

   changeHousingLocationFour(event) {
      this.offenderAssignmentSearchModel.livingUnitCodeFour = event.description;
   }

   changeCurrentOfficer(event) {
      this.offenderAssignmentSearchModel.currentOfficerLastName = event.description;
      this.offenderAssignmentSearchModel.currentOfficerFirstName = event.firstName;
      this.offenderAssignmentSearchModel.currentOfficerStaffId = event.code;
      this.unassignedFlag = false;
   }

   changeAssignOfficer(event) {
      if (event) {
         this.disableConfirmAll = false;
         this.offenderAssignmentSearchModel.assignOfficerLastName = event.description;
         this.offenderAssignmentSearchModel.assignOfficerFirstName = event.firstName;
         this.offenderAssignmentSearchModel.assignOfficerStaffId = event.code;
      }
      this.unassignedFlag = false;
   }

   validateMovementDate() {
      if (this.offenderAssignmentSearchModel.movementDate &&
         DateFormat.compareDate(this.offenderAssignmentSearchModel.movementDate, DateFormat.getDate()) < 0) {
         this.type = 'warn';
         this.message = this.translateService.translate('oidcoasi.movementdateerror');
         this.show();
         return;
      }
   }

   changeUnAssignedFlag() {
      if (this.unassignedFlag) {
         this.offenderAssignmentSearchModel.currentOfficerLastName = undefined;
         this.offenderAssignmentSearchModel.currentOfficerFirstName = undefined;
         this.offenderAssignmentSearchModel.currentOfficerStaffId = undefined;
         this.offenderAssignmentSearchModel.assignOfficerLastName = undefined;
         this.offenderAssignmentSearchModel.assignOfficerFirstName = undefined;
         this.offenderAssignmentSearchModel.assignOfficerStaffId = undefined;
      }
   }

   offasgnExecuteQuery(date?) {
      if (date) {
         if (date.lastValue === '0_/__/____') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.leapyearnotallowed');
            this.show();
            this.clearDisabled = false;
            return;
         }
         if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentervalidformat');
            this.show();
            this.clearDisabled = false;
            return;
         }
      }
      if (!this.offenderAssignmentSearchModel.agyLocId) {
         this.type = 'warn';
         this.message = this.translateService.translate('oidcoasi.facilitymustbeentered');
         this.show();
         return;
      }
      this.offenderAssignmentSearchModel.unassignedFlag = this.unassignedFlag ? 'Y' : 'N';
      this.offenderAssignmentSearchModel.confirmationAllFlag = this.confirmationAllFlag ? 'Y' : 'N';
      const offasgnResult = this.oidcoasiFactory.
         offAsgnExecuteQuery(this.offenderAssignmentSearchModel);
      offasgnResult.subscribe(offasgnResultList => {
         if (offasgnResultList.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.querycausedReEnter');
            this.show();
            this.offasgnData = [];
            this.retrievedisabled = false;
            this.clearDisabled = false;
         } else {
            this.disableSearchFields = true;
            this.disableHLOneLovField = true;
            this.disableHLTwoLovField = true;
            this.disableHLThreeLovField = true;
            this.disableHLFourLovField = true;
            this.disableOfficerLovField = true;
            this.retrievedisabled = true;
            this.clearDisabled = false;
            this.offasgnData = offasgnResultList;
            this.offasgnData.forEach(element => {
               element.confirmationFlagOne = element.confirmationFlag === 'Y' ? true : false;
               if (element && element.caseOfficerId) {
                  element.sealFlag = 'Y';
               } else {
                  element.sealFlag = 'N';
               }
               if (this.confirmationAllFlag) {
                  element.caseOfficerId = this.offenderAssignmentSearchModel.assignOfficerStaffId;
                  element.staffFirstName = this.offenderAssignmentSearchModel.assignOfficerFirstName;
                  element.caseAssignedDate = this.offenderAssignmentSearchModel.movementDate;
                  element.caseAssignedTime = this.offenderAssignmentSearchModel.movementTime;
                  this.enableFlag = true;
               }
            });

            this.gridIndex = 0;
            this.officerLovLink = '/oidcoasi/rgStaffIdRecordGroup?agyLocId=' + this.offenderAssignmentSearchModel.agyLocId;
            this.offAsgnColumnDef[5].link = this.officerLovLink;
            this.grid.prepareAgColumnDef();
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oidcoasiSaveoffasgnForm(event) {
      // TODO declare commit bean and add insert list to that object.
      if (!this.offAssessmentsValidations()) {
         return;
      }
      this.offasgnUpdatetList = event.updated;
      this.offasgnCommitModel.updateList = [];
      if (this.offasgnUpdatetList.length > 0) {
         for (let i = 0; i < this.offasgnUpdatetList.length; i++) {
            if (!this.offasgnUpdatetList[i].confirmationFlagOne) {
               this.type = 'warn';
               this.message = this.translateService.translate('oidcoasi.recordmustbeconfirmed');
               this.show();
               return;
            }
            if (this.offasgnUpdatetList[i].confirmationFlagOne && this.offenderAssignmentSearchModel.currentOfficerStaffId &&
               this.offenderAssignmentSearchModel.assignOfficerStaffId && this.offenderAssignmentSearchModel.currentOfficerStaffId !== this.offenderAssignmentSearchModel.assignOfficerStaffId) {
               this.offasgnUpdatetList[i].staffLastName = this.offenderAssignmentSearchModel.assignOfficerLastName;
               this.offasgnUpdatetList[i].staffFirstName = this.offenderAssignmentSearchModel.assignOfficerFirstName;
               this.offasgnUpdatetList[i].caseOfficerId = this.offenderAssignmentSearchModel.assignOfficerStaffId;
               this.offasgnUpdatetList[i].caseAssignedDate = this.offenderAssignmentSearchModel.movementDate;

               if (DateFormat.compareDate(DateFormat.getDate(this.offasgnUpdatetList[i].caseAssignedTime), DateFormat.getDate(this.offenderAssignmentSearchModel.movementTime)) !== 0) {
                  this.offasgnUpdatetList[i].caseAssignedTime = this.offenderAssignmentSearchModel.movementTime;
               } else {
                  this.offasgnUpdatetList[i].caseAssignedTime = DateFormat.getDate();
               }
            } else if (!this.offenderAssignmentSearchModel.currentOfficerStaffId && this.offenderAssignmentSearchModel.assignOfficerStaffId) {
               this.offasgnUpdatetList[i].staffLastName = this.offenderAssignmentSearchModel.assignOfficerLastName;
               this.offasgnUpdatetList[i].staffFirstName = this.offenderAssignmentSearchModel.assignOfficerFirstName;
               this.offasgnUpdatetList[i].caseOfficerId = this.offenderAssignmentSearchModel.assignOfficerStaffId;
               this.offasgnUpdatetList[i].caseAssignedDate = this.offenderAssignmentSearchModel.movementDate;

               if (DateFormat.compareDate(DateFormat.getDate(this.offasgnUpdatetList[i].caseAssignedTime), DateFormat.getDate(this.offenderAssignmentSearchModel.movementTime)) !== 0) {
                  this.offasgnUpdatetList[i].caseAssignedTime = this.offenderAssignmentSearchModel.movementTime;
               } else {
                  this.offasgnUpdatetList[i].caseAssignedTime = DateFormat.getDate();
               }
            }
            this.offasgnUpdatetList[i].user = this.user;
            this.offasgnUpdatetList[i].agyLocId = this.offenderAssignmentSearchModel.agyLocId;
            this.offasgnUpdatetList[i].confirmationFlag = this.offasgnUpdatetList[i].confirmationFlagOne ? 'Y' : 'N';
            this.offasgnCommitModel.updateList = this.offasgnUpdatetList;
         }
      }
      const offasgnSaveData = this.oidcoasiFactory.offAsgnCommit(this.offasgnCommitModel);
      offasgnSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.clear();
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
         }
      });
   }

   isInsertable() {
      if (this.offenderAssignmentSearchModel.agyLocId || this.offenderAssignmentSearchModel.livingUnitCodeOne ||
         this.offenderAssignmentSearchModel.livingUnitCodeTwo || this.offenderAssignmentSearchModel.livingUnitCodethree ||
         this.offenderAssignmentSearchModel.livingUnitCodeFour || this.offenderAssignmentSearchModel.currentOfficerStaffId ||
         this.offenderAssignmentSearchModel.assignOfficerStaffId || this.offenderAssignmentSearchModel.offenderId
         || this.offenderAssignmentSearchModel.lastName || this.offenderAssignmentSearchModel.firstName || this.unassignedFlag
         || this.confirmationAllFlag) {
         this.clearDisabled = false;
         this.retrievedisabled = false;
      } else {
         this.clearDisabled = true;
         this.retrievedisabled = true;
      }
   }

   validateRowData = (event) => {
      // const rowIndex = this.offasgnData.indexOf(event.data);
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'confirmationFlagOne') {
         if (event.data.confirmationFlagOne) {
            /* this.offasgnData.forEach((element, index) => {
               if (element.confirmationFlagOne && !element.caseOfficerId && rowIndex !== index) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidcoasi.enterofficername');
                  this.grid.setColumnData('confirmationFlagOne', rowIndex, false);
                  this.show();
                  return;
               }
            }); */
            if (this.confirmationAllFlag) {
               this.grid.setColumnData('caseOfficerId', rowIndex, this.offenderAssignmentSearchModel.assignOfficerStaffId);
               this.grid.setColumnData('staffFirstName', rowIndex, this.offenderAssignmentSearchModel.assignOfficerFirstName);
               this.grid.setColumnData('caseAssignedDate', rowIndex, this.offenderAssignmentSearchModel.movementDate);
               this.grid.setColumnData('caseAssignedTime', rowIndex, this.offenderAssignmentSearchModel.movementTime);
            } else if (!event.data.caseOfficerId && this.offenderAssignmentSearchModel.assignOfficerStaffId) {
               this.grid.setColumnData('caseOfficerId', rowIndex, this.offenderAssignmentSearchModel.assignOfficerStaffId);
               this.grid.setColumnData('staffFirstName', rowIndex, this.offenderAssignmentSearchModel.assignOfficerFirstName);
               this.grid.setColumnData('caseAssignedDate', rowIndex, this.offenderAssignmentSearchModel.movementDate);
               this.grid.setColumnData('caseAssignedTime', rowIndex, this.offenderAssignmentSearchModel.movementTime);
            }
            rowdata.validated = true;
            return rowdata;
         } else {
            if (event.data.sealFlag === 'N') {
               this.grid.setColumnData('caseOfficerId', rowIndex, undefined);
               //this.grid.setColumnData('staffLastName', rowIndex, undefined);
               this.grid.setColumnData('staffFirstName', rowIndex, undefined);
               this.grid.setColumnData('caseAssignedDate', rowIndex, undefined);
               this.grid.setColumnData('caseAssignedTime', rowIndex, undefined);
               rowdata.validated = true;
               return rowdata;
            }
         }
      }

      if (event.field === 'caseOfficerId') {
         if (event.data.caseOfficerId) {
            this.officersList.forEach((element, index) => {
               if (element.code === event.data.caseOfficerId) {
                 // this.grid.setColumnData('staffLastName', rowIndex, element.code);
                  this.grid.setColumnData('staffFirstName', rowIndex, element.firstName);
                  this.grid.setColumnData('caseOfficerId', rowIndex, element.code);
               }
            });
            if (event.data.caseAssignedTime && DateFormat.compareDate(this.offenderAssignmentSearchModel.movementTime,
               DateFormat.getDate(event.data.caseAssignedTime)) < 0) {
               this.grid.setColumnData('caseAssignedTime', rowIndex, this.offenderAssignmentSearchModel.movementTime);
            } else {
               this.grid.setColumnData('caseAssignedTime', rowIndex, DateFormat.getDate());
            }
            this.grid.setColumnData('caseAssignedDate', rowIndex, DateFormat.getDate(this.offenderAssignmentSearchModel.movementDate));
            this.grid.setColumnData('confirmationFlagOne', rowIndex, true);
         } else {
            this.grid.setColumnData('caseOfficerId', rowIndex, undefined);
            //this.grid.setColumnData('staffLastName', rowIndex, undefined);
            this.grid.setColumnData('staffFirstName', rowIndex, undefined);
            this.grid.setColumnData('caseAssignedDate', rowIndex, undefined);
            this.grid.setColumnData('caseAssignedTime', rowIndex, undefined);
            this.grid.setColumnData('confirmationFlagOne', rowIndex, false
            );
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   openGo() {
      this.dialogService.openLinkDialog('/oiinamesdialog', event, 80).subscribe(result => {
         this.vnsearchModelData = this.ocinamesFactory.ocittaskSharedData;
         this.offenderAssignmentSearchModel.lastName = this.vnsearchModelData.lastName;
         this.offenderAssignmentSearchModel.firstName = this.vnsearchModelData.firstName;
         this.offenderAssignmentSearchModel.offenderId = this.vnsearchModelData.offenderIdDisplay;
      });
   }

   seOffenderIdDisplay(event) {
      if (event) {
         this.offenderAssignmentSearchModel.offenderId = event.offenderIdDisplay;
         this.offenderAssignmentSearchModel.lastName = event.lastName;
         this.offenderAssignmentSearchModel.firstName = event.firstName;
         this.retrievedisabled = false;
         this.clearDisabled = false;
      } else {
         this.offenderAssignmentSearchModel.offenderId = undefined;
         this.offenderAssignmentSearchModel.lastName = undefined;
         this.offenderAssignmentSearchModel.firstName = undefined;
         this.retrievedisabled = true;
         this.clearDisabled = true;
      }
   }

   offAssessmentsValidations() {
      const is = { valid: true };
      this.offasgnData.forEach(data => {
         if (is.valid) {
            if (data.confirmationFlagOne && !data.caseOfficerId) {
               this.type = 'warn';
               this.message = this.translateService.translate('oidcoasi.enterofficername');
               this.show();
               is.valid = false;
               return;
            }
            if (data.confirmationFlagOne && data.caseOfficerId && !data.caseAssignedDate) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.datemustbeentered');
               this.show();
               is.valid = false;
               return;
            }
            if (data.confirmationFlagOne && data.caseOfficerId && !data.caseAssignedTime) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.timemustbeentered');
               this.show();
               is.valid = false;
               return;
            }
         }
      });
      return is.valid;
   }

   clear() {
      this.offenderAssignmentSearchModel = new OidcoasiOffenderAssignments();
      this.offenderAssignmentSearchModel.movementDate = DateFormat.getDate();
      this.offenderAssignmentSearchModel.movementTime = DateFormat.getDate();
      this.offasgnData = [];
      this.clearDisabled = true;
      this.disableSearchFields = false;
      this.disableHLOneLovField = true;
      this.disableHLTwoLovField = true;
      this.disableHLThreeLovField = true;
      this.disableHLFourLovField = true;
      this.disableOfficerLovField = true;
      this.retrievedisabled = false;
      this.unassignedFlag = false;
      this.confirmationAllFlag = false;
      this.disableConfirmAll = true;
   }

   onBlur() {
      const queryParams = {
         agyLocId: this.sessionManager.currentCaseLoad,
         offenderIdDisplay: this.offenderAssignmentSearchModel.offenderId
      };
      const namesrchResult = this.oiinamesFactory.namesrchExecuteQuery(queryParams);
      namesrchResult.subscribe(headerList => {
         if (headerList.length > 0) {
            this.vnsearchModelData = headerList[0];
            this.offenderAssignmentSearchModel.lastName = this.vnsearchModelData.lastName;
            this.offenderAssignmentSearchModel.firstName = this.vnsearchModelData.firstName;
         }
      });
   }

   changeConfirmAllFlag() {
      const rowData = this.offasgnData;
      if (this.confirmationAllFlag) {
         for (let i = 0; i < rowData.length; i++) {
            this.grid.setColumnData('confirmationFlagOne', i, true);
            this.grid.setColumnData('hideVal', i, 'enable');
         }
      } else {
         this.offasgnExecuteQuery();
      }
      this.offasgnData = rowData;
   }

   onRowClick(event) {
      if (event) {
         if (this.confirmationAllFlag && this.enableFlag) {
            this.changeConfirmAllFlag();
            this.enableFlag = false;
         }
      }
   }
}
