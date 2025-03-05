import {
   Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OffenderBookingsCommitBean } from '@inst/demographics-biometrics/beans/OffenderBookingsCommitBean';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { StaffLocationRoles } from '@sa/usersystemsecurity/beans/StaffLocationRoles';
import { StaffLocationRolesCommitBean } from '@sausersystemsecuritybeans/StaffLocationRolesCommitBean';
import { StaffMembersV2 } from '../beans/StaffMembersV2';
import { TransferBWOfficerCommitBean } from '../beans/TransferBWOfficerCommitBean';
import { OcdtapowService } from '../service/ocdtapow.service';
import { OcuaoffiService } from '../service/ocuaoffi.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
@Component({
   selector: 'app-ocdtapow',
   templateUrl: './ocdtapow.component.html'

})

export class OcdtapowComponent implements OnInit {
   @ViewChild('grid', { static: true }) grid: any;
   @ViewChild('staffgrid', { static: true }) staffgrid: any;

   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   stafflrData: StaffLocationRoles[] = [];
   stafflrDataTemp: StaffLocationRoles[] = [];
   stafflrModel: StaffMembers = new StaffMembers();
   stafflrModelObj: StaffLocationRoles = new StaffLocationRoles();
   stafflrModelData: StaffLocationRoles = new StaffLocationRoles();
   transferBWOfficerCommitBean: TransferBWOfficerCommitBean = new TransferBWOfficerCommitBean();
   stafflrIndex: number;
   stafflrInsertList: StaffLocationRoles[] = [];
   stafflrUpdatetList: StaffLocationRoles[] = [];
   stafflrDeleteList: StaffLocationRoles[] = [];
   offbkg1Data: OffenderBookings[] = [];
   offbkg1List: OffenderBookings[] = [];
   selectedActiveOfficerData: StaffMembersV2 = new StaffMembersV2();
   offbkg1DataTemp: OffenderBookings[] = [];
   voffdetData: any[] = [];
   offbkg1Model: OffenderBookings = new OffenderBookings();
   offbkg1Index: number;
   offbkg1InsertList: OffenderBookings[] = [];
   offbkg1UpdatetList: OffenderBookings[] = [];
   offbkg1DeleteList: OffenderBookings[] = [];
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: boolean;
   vOffDetColumnDef: any[];
   offBkg1ColumnDef: any[];
   staffLrReadOnly: boolean;
   offBkg1ReadOnly: boolean;
   vOffDetReadOnly: boolean;
   cg$ctrlReadOnly: boolean;
   cgfkStafflrdspdescriptionRg: any[] = [];
   cgfkVoffdetpositionRg: any[] = [];
   cgfkVoffdetroleRg: any[] = [];
   cgfkVoffdetsexcodeRg: any[] = [];
   cgfkVoffdetscheduletypeRg: any[] = [];
   cgfkVoffdetskilltypeRg: any[] = [];
   cgfkVoffdetskillsubtypeRg: any[] = [];
   cgfkStafflrdsplastnameRg: any[] = [];
   addstaffData: StaffMembersV2[] = [];
   uniqueList: StaffMembersV2[] = [];
   stafflrCommitModel: StaffLocationRolesCommitBean = new StaffLocationRolesCommitBean();
   offbkg1CommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
   msglist: any[];
   message: any;
   type: any;
   agyLocLink: string;
   scheduletypeTitles = {
      'code': this.translateService.translate('oumsmala.scheduletype'),
      'description': this.translateService.translate('common.description')
   };
   tableIndex: number;
   stafftableIndex: number;
   dspWorkload: boolean;
   chkselect: boolean;
   voupdateList: StaffLocationRoles[] = [];
   staffselect: boolean;
   saveFlag: boolean;
   disableSaveButton: boolean;
   stafflrmodelReadonly: boolean;
   calAgyLocId: boolean;
   checkDisabled: boolean;
   disableGoBut: boolean;
   disableClear: boolean;
   lastnameVal: boolean;
   disableworkload: boolean;
   disableLaunchBut: boolean;
   tempLastName: String;
   agyLocMap: Map<string, string> = new Map<string, string>();
   caseloadtype: string;
   vHeaderBlockModelBean: VHeaderBlock = new VHeaderBlock();
   constructor(private ocdtapowFactory: OcdtapowService, private ocuaoffiFactory: OcuaoffiService,
      public translateService: TranslateService, private offenderSearchService: OffenderSearchService,  public osiosearFactory: OsiosearService,
      public sessionManager: UserSessionManager, public dialogService: DialogService) {
      this.vOffDetColumnDef = [];
      this.offBkg1ColumnDef = [];
   }
   ngOnInit() {

      this.agyLocLink = `ocdtapow/cgfkStaffLrDspDescriptionRecordGroup?caseloadId=${this.sessionManager.currentCaseLoad}`;
      this.caseloadtype = this.sessionManager.currentCaseLoadType;
      this.disableClear = true;
      this.checkDisabled = true;
      this.disableSaveButton = true;
      this.disableworkload = true;
      this.disableLaunchBut = true;
      this.vOffDetColumnDef = [

         {
            fieldName: this.translateService.translate('common.assign'), field: 'staffIdTemp',
            editable: true, width: 150,
            datatype: 'checkbox',
         },

         { fieldName: this.translateService.translate('common.name'), field: 'name', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('common.position'), field: 'position', datatype: 'lov',
            domain: 'STAFF_POS', editable: false, width: 150
         },
         {
            fieldName: this.translateService.translate('system-profile.staff-role'), field: 'role', datatype: 'lov',
            domain: 'STAFF_ROLE',
            editable: false, width: 150
         },
         {
            fieldName: this.translateService.translate('ocdtapow.sex'), field: 'sexCode', datatype: 'lov',
            domain: 'SEX', editable: false, width: 150
         },
         {
            fieldName: this.translateService.translate('common.scheduletype'), field: 'scheduleType',
            editable: false, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP', titles: this.scheduletypeTitles
         },
         {
            fieldName: this.translateService.translate('ocdtapow.hoursperweek'), field: 'hoursPerWeek', editable: false, width: 150,
            datatype: 'text'
         },
         {
            fieldName: this.translateService.translate('system-profile.no-prim-owns'), field: 'noOffender', editable: false, width: 150,
            datatype: 'text'
         },
         {
            fieldName: this.translateService.translate('ocdtapow.hasworked'), field: 'skillSubTypeFlag', editable: false, width: 150,
            datatype: 'checkbox',
         }
      ];
      this.offBkg1ColumnDef = [
         {
            fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false,
            width: 150
         },
         { fieldName: this.translateService.translate('ocdtapow.offLastname'), field: 'dspLastName', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('ocdtapow.assigndate'), field: 'bookingBeginDate', editable: false, width: 150,
            datatype: 'date'
         },
         {
            fieldName: this.translateService.translate('common.assign'), field: 'assignFlag', editable: true, width: 150,
            datatype: 'checkbox',
         }
      ];
      const serviceObject = this.ocdtapowFactory.
         cgfkStafflrdspdescriptionRecordGroup(this.sessionManager.currentCaseLoad);
      serviceObject.subscribe(data => {
         if (data.length === 0) {
         } else {
            data.forEach(ele => {
               this.agyLocMap.set(ele.code, ele.description);
            });
         }
      });
   }

   /*   validateRow = (event) => {
        const rowdata = new ValidateRowReturn();
        return rowdata;
     } */
   validateRowData = (event) => {
      const rowIndex = this.offbkg1Data.indexOf(event.data);
      const rowdata = new ValidateRowReturn();
      if (event.field === 'assignFlag') {
         if (event.data.assignFlag) {
            if (!this.offbkg1Data || this.offbkg1Data.length === 0) {
               this.grid.setColumnData('assignFlag', rowIndex, false);
               this.type = 'warn';
               this.message = 'No offender is currently assigned to selected officer,assign flag can not be checked';
               this.show();
            } else {
               let count = 0;
               const offLen = this.offbkg1Data.length;
               this.offbkg1Data.forEach(element => {
                  if (element.assignFlag) {
                     ++count;
                  }
               })
               if (offLen === count) {
                  this.calAgyLocId = true;
               }
            }
         } else {
            let count = 0;
            const offLen = this.offbkg1Data.length;
            this.offbkg1Data.forEach(element => {
               if (!element.assignFlag) {
                  ++count;
               }
            })
            if (count > 0 || count == 0) {
               this.calAgyLocId = false;
            }
         }
      }

      rowdata.validated = true;
      this.handleWorkWithOffender();
      return rowdata;

   }

   validateRows = (event) => {
      const rowdata = new ValidateRowReturn();
      rowdata.validated = true;
      return rowdata;
   }
   onRowClickoffbkg1(event) {
      if (event) {
         this.offbkg1Model = event;
         this.voffdetData = [];
         this.stafflrExecuteQuery();
      }

      if (event && event.caseOfficerId) {
         this.voffdetData.forEach(element => {
             element.staffIdTemp = true;
             const index = this.voffdetData.indexOf(element);
              this.staffgrid.setColumnData('staffIdTemp', index, true);
         });
         this.staffgrid.prepareAgColumnDef();

      } else {
         this.voffdetData.forEach(element => {
              element.staffIdTemp = true;
              const index = this.voffdetData.indexOf(element);
             this.staffgrid.setColumnData('staffIdTemp', index, false);
         });
         this.staffgrid.prepareAgColumnDef();

      }

   }
  
   onAgyblur() {
      if (this.stafflrModel.description && !this.agyLocMap.get(this.stafflrModel.description)) {
         this.stafflrModel.description = this.stafflrModel.description === '' ? undefined : '';
         this.disableClear = true;
      } else if (!this.stafflrModel.description) {
         this.stafflrModel.description = this.stafflrModel.description === '' ? undefined : '';
         this.disableClear = true;
      } if (this.stafflrModel.staffId) {
         this.disableClear = false;
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

   checkData = () => {
      if (!this.stafflrModel.lastName) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.officerLastname');
         this.show();
      } else if (!this.stafflrModel.staffId) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.lastnameVal');
         this.show();
      }
   }
   onCheckBoxChange = (event) => {
      if (event.checked) {
         this.offbkg1List = this.offbkg1Data;
         if (!this.offbkg1Data || this.offbkg1Data.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdtapow.assignflagval');
            this.show();

         } else {
            setTimeout(() => {
               this.offbkg1Data.forEach(element => {
                  const rowIndex = this.offbkg1Data.indexOf(element);
                  element.assignFlag = true;
                  this.grid.setColumnData('assignFlag', rowIndex, true);
               });
            }, 100);

            //  this.offbkg1Data = this.offbkg1List;
            this.offbkg1Model = this.offbkg1Data[0];
            this.tableIndex = 0;

            // this.grid.prepareAgColumnDef();
         }
      } else {
         this.offbkg1Data.forEach(element => {
            const rowIndex = this.offbkg1Data.indexOf(element);
            element.assignFlag = false;
            this.grid.setColumnData('assignFlag', rowIndex, false);
         });
         // this.grid.prepareAgColumnDef();
      }
   }


   agyLocChangeEvent(event) {
      if (event) {
         this.disableClear = false;
         this.stafflrModel.agyLocId = this.stafflrModel.description;
         if (this.stafflrModel.agyLocId) {
            this.disableLaunchBut = false;
         } else {
            this.disableLaunchBut = true;
         }

         this.offbkg1Data = [];
         this.voffdetData = [];
         this.stafflrmodelReadonly = false;
         if (!this.stafflrModel.description) {
            this.stafflrModel = new StaffMembers();
         } else {
            this.stafflrModel.staffId = 0;
            this.stafflrModel.lastName = '';
            this.stafflrModel.firstName = '';
            this.stafflrModel.position = '';
            this.stafflrModel.role = '';
         }
      } else {
         this.disableLaunchBut = true;
         if (this.stafflrModel.staffId) {
            this.disableClear = false;
         }
         this.offbkg1Data = [];
         this.voffdetData = [];
         this.stafflrmodelReadonly = false;
         if (!this.stafflrModel.description) {
            this.stafflrModel = new StaffMembers();

         }

      }
   }
   searchLaunchButtonClick() {
      this.disableLaunchBut = false;
      this.offbkg1Data = [];
      this.voffdetData = [];
      this.disableClear = false;
      if (!this.stafflrModel.description) {
         this.disableLaunchBut = true;
         this.disableClear = true;
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.description');
         this.show();
      } else if (!this.stafflrModel.lastName) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.officerLastname');
         this.show();
      } else if (!this.stafflrModel.staffId) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.lastnameVal');
         this.show();
      }
      else {
         this.disableClear = true;
         this.disableLaunchBut = true;
         this.offbkg1ExecuteQuery();
      }
   }

   clear() {



      this.offbkg1Data = [];
      this.voffdetData = [];
      this.stafflrModel = new StaffMembers();
      this.stafflrmodelReadonly = false;
      this.disableGoBut = false;
      this.disableClear = true;
      this.disableLaunchBut = false;
      this.calAgyLocId = false;
      this.dspWorkload = false;
      this.disableworkload = true;
      this.checkDisabled = true;
      this.disableSaveButton = true;
   }
   offbkg1ExecuteQuery() {

      this.stafflrModelObj.staffId = this.stafflrModel && this.stafflrModel.staffId && this.stafflrModel.staffId.toString();
      this.stafflrModel.caseloadType=this.caseloadtype;
      const offbkg1Result = this.ocdtapowFactory.offBkg1ExecuteQuery(this.stafflrModel);
      offbkg1Result.subscribe(data => {
         this.disableClear = false;
         if (data.length === 0) {
            this.offbkg1Data = [];
            this.checkDisabled = true;
            this.disableworkload = true;
            this.disableSaveButton = true;
         } else {
            this.offbkg1Data = data;
            this.offbkg1Model = data[0];
            this.tableIndex = 0;
            this.checkDisabled = false;
            this.disableSaveButton = false;
         }
         this.stafflrExecuteQuery();
      });
   }
   stafflrExecuteQuery() {
      this.disableClear = true;
      this.stafflrModelObj.sacStaffId = this.stafflrModel.staffId;
      this.stafflrModelObj.calAgyLocId = this.stafflrModel.description;
      // this.stafflrModelObj.supervisorStaffId = this.offbkg1Model.offenderBookId;

      const stafflrResult = this.ocdtapowFactory.staffLrExecuteQuery(this.stafflrModelObj);
      stafflrResult.subscribe(data => {
         this.disableClear = false;
         this.disableGoBut = true;
         this.disableLaunchBut = true;
         this.disableLaunchBut = true;
         if (data.length === 0) {
            this.stafflrData = [];
            this.disableSaveButton = true;
            this.disableworkload = true;
         } else {
            data.forEach(element => {
               element.skillSubTypeFlag = element.skillSubTypeFlag === 'Y' ? true : false;
               element.staffIdTemp = false;
            });

            this.disableSaveButton = false;
            this.voffdetData = data;
            this.staffgrid.prepareAgColumnDef();
            this.stafflrModelData = data[0];
            this.stafftableIndex = 0;
            this.stafflrmodelReadonly = true;
            this.disableGoBut = true;
            this.disableworkload = false;
            // this.handleWorkWithOffender();

         }

         if (this.voffdetData.length === 0 && this.offbkg1Data.length === 0) {
            this.disableLaunchBut = false;
            this.disableSaveButton = true;
            this.disableworkload = true;
            this.type = 'warn';
            this.message = this.translateService.translate('common.querycaused');
            this.show();
         }
      });
   }


   saveData() {
      this.disableSaveButton = true;
      this.transferBWOfficerCommitBean = new TransferBWOfficerCommitBean();
      this.transferBWOfficerCommitBean.updateList = this.offbkg1UpdatetList;

      this.transferBWOfficerCommitBean.staffupdateList = this.voupdateList;

      this.transferBWOfficerCommitBean.staffMembers = this.stafflrModel;
      const offbkg1SaveData = this.ocdtapowFactory.saveData(this.transferBWOfficerCommitBean);
      offbkg1SaveData.subscribe(data => {
         this.disableSaveButton = false;
         if (data.sealFlag === '0') {
            this.calAgyLocId = false;
            this.dspWorkload = false;
            this.offbkg1ExecuteQuery();
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
         } else {
            if (data.sealFlag === '1') {
               this.message = this.translateService.translate('ocdtapow.caseplans');
            }
            if (data.sealFlag === '2') {
               this.message = this.translateService.translate('ocdtapow.asssumm');
            }
            if (data.sealFlag === '3') {
               this.message = this.translateService.translate('ocdtapow.plandet');
            }
            if (data.sealFlag === '4') {
               this.message = this.translateService.translate('ocdtapow.caseworksteps');
            }
            if (data.sealFlag === '5') {
               this.message = this.translateService.translate('ocdtapow.transferfiles');
            }
            if (data.sealFlag === '6') {
               this.message = this.translateService.translate('ocdtapow.updateoffwa');
            }
            if (data.sealFlag === '7') {
               this.message = this.translateService.translate('ocdtapow.updateofcommfiles');
            }
            if (data.sealFlag === '8') {
               this.message = this.translateService.translate('ocdtapow.offfiletrans');
            }


            this.type = 'warn';

            this.show();
         }
      });
   }




   onSave() {
      this.chkselect = false;
      this.staffselect = false;
      
  

      let voupdateList = [];
      let staffcount = 0;
      this.staffgrid.updatedMap.forEach((value, keys) => { voupdateList.push(value); });

      voupdateList.forEach(element => {
         if (!element.staffIdTemp) {
            const index = voupdateList.indexOf(element);
            voupdateList.splice(index, 1);
         }


         if (element.fromDate) {
            element.fromDate = undefined;
         }
      });
      this.voupdateList = JSON.parse(JSON.stringify(voupdateList));
      this.offbkg1UpdatetList = JSON.parse(JSON.stringify(this.offbkg1Data));
      let offupdateList = [];

      offupdateList = this.offbkg1UpdatetList;

      offupdateList.forEach(element => {
         if (!element.assignFlag) {
            const index = offupdateList.indexOf(element);
            offupdateList.splice(index, 1);
         }

      });

      this.offbkg1UpdatetList = [];
      this.offbkg1UpdatetList = offupdateList;

      if (this.offbkg1UpdatetList.length > 0) {

         this.offbkg1UpdatetList.forEach(element => {
            if (element.assignFlag) {
               this.chkselect = true;
            }
         });
      }
      if (this.voupdateList.length > 0) {

         this.voupdateList.forEach(element => {
            if (element.staffIdTemp) {
               this.staffselect = true;
               staffcount = ++staffcount;
            }
         });
      }
      if (!this.chkselect) { 
         this.saveFlag = false;
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.assignflagvalid');
         this.show();
         return;
      } else if (!staffcount || staffcount > 1 || staffcount === 0) {
         this.saveFlag = false;
         this.type = 'warn';
         this.message = this.translateService.translate('ocdtapow.onlyoneofficerMsg');
         this.show();
         return;
      } else {
         this.saveFlag = true;
      }
      if (this.saveFlag) {
         this.saveData();
      }
   }


   getOfficers = () => {
      if (this.stafflrModel.agyLocId) {
         this.disableLaunchBut = false;
         this.dialogService.openLinkDialog('/OCUAOFFI', this.stafflrModel, 80).subscribe(result => {
            if (result) {
               this.selectedActiveOfficerData = result;
               this.stafflrModel.lastName = this.selectedActiveOfficerData.lastName;
               this.stafflrModel.staffId = (this.selectedActiveOfficerData.sacStaffId);
               this.stafflrModel.firstName = this.selectedActiveOfficerData.firstName;
               this.stafflrModel.position = this.selectedActiveOfficerData.position;
               this.stafflrModel.role = this.selectedActiveOfficerData.role;
               this.disableClear = false;
               this.disableGoBut = false;
            }
         });

      } else {
         this.disableLaunchBut = true;
      }

   }

   activeOfficersExecuteQueryData = (event) => {
      if (event) {
         if (this.tempLastName !== this.stafflrModel.lastName) {
            this.tempLastName = this.stafflrModel.lastName;
            this.uniqueList = [];
            this.stafflrModel.agyLocId = this.stafflrModel.description;
            const queryParams = {
               sacStaffId: this.stafflrModel.staffId,
               calAgyLocId: this.stafflrModel.description
            };
            const addstaffResult = this.ocuaoffiFactory.addStaffExecuteQuery(queryParams);
            addstaffResult.subscribe(data => {
               if (data.length === 0) {
                  this.addstaffData = [];
               } else {
                  this.addstaffData = data;
                  //this.tableIndex = 0;
                  this.addstaffData.forEach(element => {
                     if (this.stafflrModel.lastName === element.lastName) {
                        this.uniqueList.push(element);
                     }
                  });
                  if (this.uniqueList.length === 1) {
                     this.disableGoBut = false;
                     this.selectedActiveOfficerData = this.uniqueList[0];
                     this.stafflrModel.lastName = this.selectedActiveOfficerData.lastName;
                     this.stafflrModel.staffId = (this.selectedActiveOfficerData.sacStaffId);
                     this.stafflrModel.firstName = this.selectedActiveOfficerData.firstName;
                     this.stafflrModel.position = this.selectedActiveOfficerData.position;
                     this.stafflrModel.role = this.selectedActiveOfficerData.role;
                  } else if (this.uniqueList.length > 1) {
                     this.offbkg1Data = [];
                     this.voffdetData = [];
                     this.stafflrModel.staffId = 0;
                     this.stafflrModel.firstName = '';
                     this.stafflrModel.position = '';
                     this.stafflrModel.role = '';
                     this.getOfficers();
                  } else if (!this.stafflrModel.lastName) {
                     this.type = 'warn';
                     this.message = this.translateService.translate('ocdtapow.officerLastname');
                     this.show();
                  } else {
                     this.offbkg1Data = [];
                     this.voffdetData = [];
                     this.stafflrModel.staffId = 0;
                     this.stafflrModel.firstName = '';
                     this.stafflrModel.position = '';
                     this.stafflrModel.role = '';
                     this.type = 'warn';
                     this.message = this.translateService.translate('ocdtapow.lastnameVal');
                     this.show();
                  }
               }
            });
         }
      } else {
         this.offbkg1Data = [];
         this.voffdetData = [];
         this.stafflrModel.staffId = 0;
         this.stafflrModel.firstName = '';
         this.stafflrModel.position = '';
         this.stafflrModel.role = '';
         this.stafflrmodelReadonly = false;
      }

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

  handleWorkWithOffender() {
   let offStaffId = [];
   if (this.offbkg1Data.length == 0 || this.voffdetData.length == 0 ) {
     return;
   }

   this.grid.gridApi.forEachNode((rowNode, index) => {
      if (rowNode.data.assignFlag && rowNode.data.workedStaffMembers) {
         offStaffId.push(...rowNode.data.workedStaffMembers);
      }
   });
   if( offStaffId == undefined || offStaffId == null || offStaffId.length == 0 ){
      return;
   }
   this.staffgrid.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      let offStaffIdSecondGrid = rowNode.data.staffId;
      if (offStaffId && offStaffIdSecondGrid && offStaffId.includes(+offStaffIdSecondGrid)) {
         this.staffgrid.setColumnData('skillSubTypeFlag', index, true);
      }
      else {
         this.staffgrid.setColumnData('skillSubTypeFlag', index, false);
      }
   })

 }


}


