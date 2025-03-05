import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsihrsumService } from '@inst/systemsearch/service/osihrsum.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VHeaderBlock2 } from '@commonbeans/VHeaderBlock2';
import { VHistoricalBookings } from '@inst/systemsearch/beans/VHistoricalBookings';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { FormAccessibleForms } from '@instSecurityThreatGroupsbeans/FormAccessibleForms';
import { FormAccessibleFormsCommitBean } from '@saadminbeans/FormAccessibleFormsCommitBean';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
// import required bean declarations

@Component({
   selector: 'app-osihrsum',
   templateUrl: './osihrsum.component.html'
})

export class OsihrsumComponent implements OnInit,OnDestroy {
   // Variable declaration
   caseloadFlag = false;
   bookingFlag = false;
   msgs: any[] = [];
   offbkgsData: VHeaderBlock2[] = [];
   offbkgsModel: VHeaderBlock2 = new VHeaderBlock2();
   offbkgsSearchModel: VHeaderBlock2 = new VHeaderBlock2();
   vhisbooData: VHistoricalBookings[] = [];
   vhisbooModel: VHistoricalBookings = new VHistoricalBookings();
   selectedVhisbooData: VHistoricalBookings = new VHistoricalBookings();
   vhisbooIndex = -1;
   fafData: FormAccessibleForms[] = [];
   fafModel: FormAccessibleForms = new FormAccessibleForms();
   fafIndex = -1;
   fafCommitModel: FormAccessibleFormsCommitBean = new FormAccessibleFormsCommitBean();
   fafInsertList: FormAccessibleForms[] = [];
   fafDeleteList: FormAccessibleForms[] = [];
   syspflData: SystemProfiles[] = [];
   syspflModel: SystemProfiles = new SystemProfiles();
   syspflIndex = 0;
   fafColumnDef: any[];
   bookDetailColumnDef: any[];
   vHisBooColumnDef: any[];
   cgfkFafdestinationformRg: any[] = [];
   type: string;
   message: string;
   msglist: any[];
   offenderImage: any;
   enableFafDelete: boolean;
   isVisibleCameraButton: boolean = false;
   enableFafInsert: boolean;
   routerChild: any[] = [];
   routerpath: string[] = [];
   index: number;
   finalIndex: number;
   constructor(private osihrsumFactory: OsihrsumService, public translateService: TranslateService,
      private router: Router, public sessionManager: UserSessionManager,
      private osiosearchService: OsiosearService, private dialogService: DialogService,private injectOffenderService: InjectOffenderService,
      private offenderSearchService: OffenderSearchService,) {
      // TODO initilize data members here..!
      this.fafColumnDef = [];
      this.bookDetailColumnDef = [];
      this.vHisBooColumnDef = [];
   }
   ngOnInit() {
      this.enableFafDelete = false;
      this.routerChild = [];
      const routerComponets = this.router.config;
      this.routerpath = routerComponets.map(ele => ele.path);
      this.routerChild = [];
      this.vHisBooColumnDef = [
         {
            fieldName: this.translateService.translate('osihrsum.admitintaketransindate'), field: 'inDate', editable: false, width: 150,
            datatype: 'date'
         },
         { fieldName: this.translateService.translate('common.time'), field: 'inTime', editable: false, width: 150, datatype: 'time' },
         { fieldName: this.translateService.translate('common.reason'), field: 'inMovementReasonCode', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('common.locationdescription'), field: 'locatoinDescription', editable: false,
            width: 150
         },
         { fieldName: this.translateService.translate('common.type'), field: 'agyLocType', editable: false, width: 150 },
         {
            fieldName: this.translateService.translate('osihrsum.releaseortransferdate'), field: 'outDate', editable: false, width: 150,
            datatype: 'date'
         },
         { fieldName: this.translateService.translate('common.time'), field: 'outTime', editable: false, width: 150, datatype: 'time' },
         { fieldName: this.translateService.translate('common.reason'), field: 'outMovementReasonCode', editable: false, width: 150 },
         { fieldName: this.translateService.translate('osihrsum.intakenumber'), field: 'bookingNo', editable: false, width: 150 },
      ];
      this.fafColumnDef = [
         {
            fieldName: this.translateService.translate('osihrsum.name'), field: 'destinationForm', editable: false, width: 150,
            datatype: 'lov', link: 'osihrsum/cgfkFafDestinationFormRecordGroup', cellEditable: this.canNameEdit
         },
         {
            fieldName: this.translateService.translate('common.data'), field: 'tempCheckFlag', editable: false, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: '', field: 'butGo', editable: false, width: 150, datatype: 'launchbutton', onLaunchClick: this.onGoBtnLaunch,
            modal: true, updateField: 'row', data: 'row', dialogWidth: '80%', height: '80%', isDisable : this.disableCell
         },
      ];

      routerComponets.filter(ele => {
         if (ele.children && Array.isArray(ele.children)) {
            return true;
         } else {
            return false;
         }
      }).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
      //this.routerpath.push(...this.routerChild);

   }

   /**
     * This function displays the messages
     */
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }


   disableCell = (data: any, index: number): boolean => {
      if (data && data.destinationForm) {
         const childScreen = this.routerpath.includes(data.destinationForm) ? true : false;
         const parentScreen = this.routerChild.includes(data.destinationForm) ? true : false;
         if (childScreen) {
           /*  this.dialogService.openLinkDialog(data.destinationForm, event, 80).subscribe(result => {
               this.fafExecuteQuery();
            }); */
            return false;
         } else if (parentScreen) {
            return false;
            //this.router.navigate(['/' + data.destinationForm]);
         } else {

            return true;

           /*  this.type = 'warn';
            this.message = this.translateService.translate('osihrsum.developmentoutofscope');
            this.show();
            return; */
         }
      }


      if (data.createDatetime) {
        return true;
      } else {
        return false;
      }
    }


   onGoBtnLaunch = (event) => {
      if (event && event.destinationForm) {
         const childScreen = this.routerpath.includes(event.destinationForm) ? true : false;
         const parentScreen = this.routerChild.includes(event.destinationForm) ? true : false;
         if (childScreen) {
            this.dialogService.openLinkDialog(event.destinationForm, event, 80).subscribe(result => {
               this.fafExecuteQuery();
            });
         } else if (parentScreen) {
            this.router.navigate(['/' + event.destinationForm]);
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('osihrsum.developmentoutofscope');
            this.show();
            return;
         }
      }
   }

   canNameEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   onRowClickfaf(event) {
   }
   onCameraPcclick() {
   }
   clear() {
      this.vhisbooData = [];
      this.fafData = [];
      this.enableFafDelete = false;
      this.enableFafInsert = false;
      this.selectedVhisbooData = new VHistoricalBookings();
   }
   onOffenderChange(offender) {
      this.clear();
      this.offbkgsModel = offender;
      this.offenderImage = undefined;
      if (this.offbkgsModel && this.offbkgsModel.rootOffenderId) {
         this.isVisibleCameraButton = true;
         this.enableFafInsert = true;
         this.vhisbooExecuteQuery();
         this.fafExecuteQuery();
      }
      else{
         this.isVisibleCameraButton = false;
      }
   }

   vhisbooExecuteQuery() {
      this.vhisbooModel = new VHistoricalBookings();
      this.vhisbooModel.rootOffenderId = this.offbkgsModel.rootOffenderId;
      const vhisbooResult = this.osihrsumFactory.
         vHisBooExecuteQuery(this.offbkgsModel.rootOffenderId);
      vhisbooResult.subscribe(data => {
         if (data && data.length > 0) {
            this.vhisbooData = data;
            this.index=0;
            this.vhisbooData.forEach(obj => {
               if (obj.offenderBookId === this.offbkgsModel.offenderBookId) {
                  //this.selectedVhisbooData = obj;
                  this.index= this.vhisbooData.findIndex(ord => ord.offenderBookId == this.offbkgsModel.offenderBookId);             
               }
           });
            this.vhisbooIndex = this.index;
         } else {
            this.vhisbooData = [];
         }
      });
   }
   fafExecuteQuery() {
      if(this.offbkgsModel.rootOffenderId){
         this.offbkgsSearchModel.rootOffenderId=this.offbkgsModel.rootOffenderId;
      }
      if(this.offbkgsModel.offenderBookId){
         this.offbkgsSearchModel.offenderBookId=this.offbkgsModel.offenderBookId;
      }
      const fafResult = this.osihrsumFactory.fafExecuteQuery(this.offbkgsModel);
      fafResult.subscribe(data => {
         if (data && data.length > 0) {
            this.fafData = data;
            this.fafIndex = 0;
            this.fafData.forEach(element => {
               element.butGo = this.translateService.translate('common.goButton');
               element.tempCheckFlag = element.checkFlag === 'Y' ? true : false;
            });
            this.enableFafDelete = true;
         } else {
            this.fafData = [];
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   osihrsumSavefafForm(event) {
      // TODO declare commit bean and add insert list to that object
      if (!this.fafGridMandatoryFieldsValidations()) {
         return;
      }
      this.fafInsertList = event.added;
      this.fafDeleteList = event.removed;
      this.fafCommitModel.insertList = [];
      this.fafCommitModel.deleteList = [];
      if (this.fafInsertList.length > 0) {
         for (let i = 0; i < this.fafInsertList.length; i++) {
            this.fafInsertList[i].checkFlag = this.fafInsertList[i].tempCheckFlag ? 'Y' : 'N';
            this.fafCommitModel.insertList = this.fafInsertList;
         }
      }
      if (this.fafDeleteList.length > 0) {
         for (let i = 0; i < this.fafDeleteList.length; i++) {
            this.fafCommitModel.deleteList = this.fafDeleteList;
         }
      }
      const fafSaveData = this.osihrsumFactory.fafCommit(this.fafCommitModel);
      fafSaveData.subscribe(data => {
         if (data && data.sealFlag) {
            if (data.sealFlag === '1') {
               this.type = 'success';
               this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
               this.show();
               this.fafExecuteQuery();
               return;
            } else if (data.sealFlag === 'insertError') {
               this.type = 'warn';
               this.message = this.translateService.translate('osihrsum.rowalreadyexists');
               this.show();
               this.fafExecuteQuery();
               return;
            } else if (data.sealFlag === 'deleteError') {
               this.type = 'warn';
               this.message = this.translateService.translate('osihrsum.connotdelete');
               this.show();
               this.fafExecuteQuery();
               return;
            } else {
               this.type = 'warn';
               this.message = this.translateService.translate('common.addupdateremoverecordfailed');
               this.show();
               this.fafExecuteQuery();
               return;
            }
         }
      });
   }

   syspflExecuteQuery() {
      const syspflResult = this.osihrsumFactory.
         sysPflExecuteQuery(this.syspflModel);
      syspflResult.subscribe(data => {
         if (data && data.length > 0) {
            this.syspflData = data;
            this.syspflModel = data[0];
         } else {
            this.syspflData = [];
         }
      });
   }

   onRowClickvhisboo(event) {
      if (event) {
         this.selectedVhisbooData = event;
         if (event.offenderBookId) {
            this.getImageData(event);
         }
      } else {
         this.selectedVhisbooData = new VHistoricalBookings();
      }
   }

   getImageData(event) {
      this.osihrsumFactory.getImageData(event).subscribe(data => {
         if (data && data.imageObjectId) {
            this.offenderImage = 'data:image/JPEG;base64,' + data.imageThumbnail;
         }
      });
   }

   callFormImage() {
      if (this.selectedVhisbooData.offenderBookId && this.offenderImage) {
         const captureImageData = this.osiosearchService.captureImageProcedure();
         captureImageData.subscribe(captureImage => {
            if (captureImage === 'OIUIMAGE') {
               this.osiosearchService.imagesDataTemp.imageObjectId = this.selectedVhisbooData.offenderBookId;
               this.osiosearchService.imagesDataTemp.imageObjectType = 'OFF_BKG';
               this.osiosearchService.imagesDataTemp.imageViewType = 'FACE';
               this.osiosearchService.imagesDataTemp.imageObjectSeq = null;
               this.osiosearchService.imagesDataTemp.orientationType = null;
               this.dialogService.openLinkDialog('/oiuimagedialog', this.osiosearchService.imagesDataTemp, 80).subscribe(result => {
                  //this.injectOffenderService.updateOffenderInContext(this.offbkgsModel.offenderId);
               });
            }
         });
      } else {
         this.type = 'warn';
         this.message = this.translateService.translate('osihrsum.noimage');
         this.show();
         return;
      }
   }

   onFafGridClear() {
      this.fafExecuteQuery();
   }

   onFafGridDelete = () => {
      return true;
   }

   onFafGridInsert = () => {
      if (this.fafData && this.fafData.length > 0 && !this.fafGridMandatoryFieldsValidations()) {
         return;
      }
      return {
         butGo: this.translateService.translate('common.goButton'),
      };
   }

   fafGridMandatoryFieldsValidations() {
      const is = { valid: true };
      this.fafData.forEach(data => {
         if (is.valid) {
            if (!data.destinationForm) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.namemustbeentered');
               this.show();
               is.valid = false;
               return;
            }
         }
      });
      return is.valid;
   }

   ngOnDestroy() {
      if (this.offbkgsModel) {
          if (this.offbkgsModel.offenderBookId === 0) {
              this.offbkgsModel.offenderBookId = null;
          }
          if (!this.offbkgsModel.offenderBookId) {
              this.offenderSearchService.selectedOffender = undefined;
          }
         
      }
  }

}
