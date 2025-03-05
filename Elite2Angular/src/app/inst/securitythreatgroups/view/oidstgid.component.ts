import {
   Component,
   OnInit,
   ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidstgidService } from '../service/oidstgid.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgIdentifiersCommitBean } from '@instSecurityThreatGroupsbeans/StgIdentifiersCommitBean';
import { StgIdentifyingWordsCommitBean } from '@instSecurityThreatGroupsbeans/StgIdentifyingWordsCommitBean';
import { StgIdentifyingWords } from '@instSecurityThreatGroupsbeans/StgIdentifyingWords';
import { StgIdentifiers } from '@instSecurityThreatGroupsbeans/StgIdentifiers';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
   selector: 'app-oidstgid',
   templateUrl: './oidstgid.component.html'
})

export class OidstgidComponent implements OnInit {
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   msgs: any[] = [];
   stgidentifiersData: StgIdentifiers[] = [];
   stgidentifiersCommitModel: StgIdentifiersCommitBean = new StgIdentifiersCommitBean();
   stgidentifyingwordsModelData: StgIdentifyingWords = new StgIdentifyingWords();
   stgidentifiersModel: StgIdentifiers = new StgIdentifiers();
   stgidentifiersInsertList: StgIdentifiers[] = [];
   stgidentifiersUpdatetList: StgIdentifiers[] = [];
   stgidentifiersDeleteList: StgIdentifiers[] = [];
   stgidentifyingwordsCommitModel: StgIdentifyingWordsCommitBean = new StgIdentifyingWordsCommitBean();
   stgidentifyingwordsData: StgIdentifyingWords[] = [];
   stgidentifyingwordsDataTemp: StgIdentifyingWords[] = [];
   stgidentifyingwordsModel: StgIdentifyingWords = new StgIdentifyingWords();
   stgidentifyingwordsInsertList: StgIdentifyingWords[] = [];
   stgidentifyingwordsUpdatetList: StgIdentifyingWords[] = [];
   stgidentifyingwordsDeleteList: StgIdentifyingWords[] = [];
   stgIdentifyingWordsColumnDef: any[];
   stgIdentifiersColumnDef: any[];
   ProfileTypeLovLink: string;
   stgidentInsertList: StgIdentifiers[] = [];
   stgidentUpdatetList: StgIdentifiers[] = [];
   stgidentDeleteList: StgIdentifiers[] = [];
   stgidentifyingInsertList: StgIdentifyingWords[] = [];
   stgidentifyingUpdatetList: StgIdentifyingWords[] = [];
   stgidentifyingDeleteList: StgIdentifyingWords[] = [];
   tableIndex = -1;
   tableIndexOne = -1;
   image = null;
   gloableStgDescription: string;
   deleteEnable: boolean;
   deleteEnableOne: boolean;
   camDisable: boolean;
   profileTypeTitles = {
      'code': this.trMsg('common.type'), 'description': this.trMsg('common.description')
   };
   constructor(private oidstgidFactory: OidstgidService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService) {
      this.stgIdentifyingWordsColumnDef = [];
      this.stgIdentifiersColumnDef = [];
   }
   ngOnInit() {
      this.stgIdentifyingWordsColumnDef = [
         {
            fieldName: this.trMsg('common.codemandatory'), field: 'code', editable: true, width: 150,
            datatype: 'text', maxlength: 40, uppercase: 'false'
         },
         {
            fieldName: this.trMsg('oidstgid.descriptionmandatory'),
            field: 'description', editable: true, width: 150, datatype: 'text', maxlength: 100, uppercase: 'false'
         },
         { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
      ];
      this.stgIdentifiersColumnDef = [
         {
            fieldName: this.trMsg('oidstgid.characteristicmandatory'), field: 'profileType',
            link: 'oidstgid/rgProfileTypeRecordGroup?stgId=' + this.dialog.data.stgId, editable: true, width: 150, datatype: 'lov',
            titles: this.profileTypeTitles,source:'OIMPRFCA'
         },
         {
            fieldName: this.trMsg('common.detail'), field: 'detail', editable: true, width: 150,
            datatype: 'text', maxlength: 100, uppercase: 'false'
         },
         { fieldName: this.trMsg('common.enteredby'), field: 'createUserId', editable: false, width: 150 },
         { fieldName: this.trMsg('common.image'), field: 'imageFlag', editable: false, width: 150, datatype: 'checkbox' },
      ];
      this.camDisable = true;
      this.stgidentifiersExecuteQuery();
      this.stgidentifyingwordsExecuteQuery();
      this.oidstgidGetGlobalStgDescription();
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
   trMsg(msg, astr?) {
      return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
   }
   /**
 *  This function will be executed when rowClicked event is
 * fired
 */
   onRowClickstgidentifiers(event) {
      if (event) {
         this.stgidentifiersModel = event;
         this.image = event.imageData ? 'data:image/JPEG;base64,' + event.imageData : null;
         if (event.identifierSeq) {
            this.deleteEnable = true;
         } else {
            this.deleteEnable = false;
         }
         if (event.stgId) {
            this.camDisable = false;
         } else {
            this.camDisable = true;
         }
      }
   }
   /**
  *  This function will be executed when rowClicked event is
  * fired
  */
   onRowClickstgidentifyingwords(event) {
      if (event) {
         this.stgidentifyingwordsModel = event;
         if (event.wordSeq) {
            this.deleteEnableOne = true;
         } else {
            this.deleteEnableOne = false;
         }
      }
   }
   oidstgidGetGlobalStgDescription() {
      this.oidstgidFactory.oidstgidGetGlobalStgDescription(this.dialog.data.stgId)
         .subscribe(data => this.gloableStgDescription = typeof data === 'string' ? data : '');
   }

   /**
    *  This function will be executed when onClick event is
    * fired
    */
   onCameraPcclick(grid?, gridOne?) {
      this.stgidentInsertList = [];
      this.stgidentUpdatetList = [];
      this.stgidentDeleteList = [];

      this.stgidentifyingInsertList = [];
      this.stgidentifyingUpdatetList = [];
      this.stgidentifyingDeleteList = [];

      if (grid) {
         const added = [];
         grid.addedMap.forEach((value, keys) => { added.push(value); });
         const removed = [];
         grid.removedMap.forEach((value, keys) => { removed.push(value); });
         const updated = [];
         grid.updatedMap.forEach((value, keys) => { updated.push(value); });
         this.stgidentInsertList = JSON.parse(JSON.stringify(added));
         this.stgidentUpdatetList = JSON.parse(JSON.stringify(updated));
         this.stgidentDeleteList = JSON.parse(JSON.stringify(removed));
      }
      if (gridOne) {
         const added = [];
         gridOne.addedMap.forEach((value, keys) => { added.push(value); });
         const removed = [];
         gridOne.removedMap.forEach((value, keys) => { removed.push(value); });
         const updated = [];
         gridOne.updatedMap.forEach((value, keys) => { updated.push(value); });
         this.stgidentifyingInsertList = JSON.parse(JSON.stringify(added));
         this.stgidentifyingUpdatetList = JSON.parse(JSON.stringify(updated));
         this.stgidentifyingDeleteList = JSON.parse(JSON.stringify(removed));
      }
      const is = { valid: true };
      if (this.stgidentInsertList.length > 0 || this.stgidentUpdatetList.length > 0 || this.stgidentDeleteList.length > 0 ||
         this.stgidentifyingInsertList.length > 0 || this.stgidentifyingUpdatetList.length > 0 ||
         this.stgidentifyingDeleteList.length > 0) {
         this.show(this.translateService.translate('oidstgid.commitchanges'), 'warn');
         is.valid = false;
         return is.valid;
      }
      const index = this.stgidentifiersData.indexOf(this.stgidentifiersModel);
      const dialgReqData = {
         stgId: this.stgidentifiersModel.stgId,
         identifierSeq: this.stgidentifiersModel.identifierSeq,
         modelName: 'OIDSTGID',
         objType: 'STG',
         imageType: this.stgidentifiersModel.profileType,
         stgGroup: this.gloableStgDescription
      };
      this.dialogService.openLinkDialog('/oiuimagedialog', dialgReqData, 80).subscribe(ele => {
         this.stgidentifiersExecuteQuery(index);
         this.oidstgidGetGlobalStgDescription();
      });
   }
   /**
    *  This function will be executed when Exit event is
    * fired
    */
   cancel() {
      this.dialog.close(null);
   }
   onOffenderChange(offender) {
      this.stgidentifiersData = [];
      this.stgidentifiersModel = new StgIdentifiers();
      if (offender) {
         this.stgidentifiersModel = offender;
         this.ProfileTypeLovLink = 'oidstgid/rgProfileTypeRecordGroup?profileType=' + this.stgidentifiersModel.profileType;
      }
   }

   /**
  *  This function will be executed when execute query call
  */
   stgidentifiersExecuteQuery(index?) {
      this.stgidentifiersModel.stgId = this.dialog.data.stgId;
      const stgidentifiersResult = this.oidstgidFactory.stgIdentifiersExecuteQuery(this.stgidentifiersModel);
      stgidentifiersResult.subscribe(data => {
         if (data.length === 0) {
            this.stgidentifiersData = [];
            this.camDisable = true;
         } else {
            data.forEach(element => {
               if (element.imageData) {
                  element.imageFlag = true;
               } else {
                  element.imageFlag = false;
               }
            });
            this.stgidentifiersData = data;
            this.stgidentifiersModel = this.stgidentifiersData[0];
            this.tableIndex = index && index > -1 ? index : 0;
         }
      });
   }

   oidstgidValidations() {
      const is = { valid: true };
      this.stgidentifiersData.forEach(data => {
         if (is.valid) {
            if (!data.profileType) {
               this.show('oidstgid.characteristicmustbeentered');
               is.valid = false;
               return;
            }
         }
      });
      return is.valid;
   }

   /**
    *  This function will be executed when onCommit event is
   * fired
   */
   oidstgidSavestgidentifiersForm(event) {
      if (!this.oidstgidValidations()) {
         return;
      }
      this.stgidentifiersInsertList = event.added;
      this.stgidentifiersUpdatetList = event.updated;
      this.stgidentifiersDeleteList = event.removed;
      this.stgidentifiersCommitModel.insertList = [];
      this.stgidentifiersCommitModel.updateList = [];
      this.stgidentifiersCommitModel.deleteList = [];
      if (this.stgidentifiersInsertList.length > 0) {
         for (let i = 0; i < this.stgidentifiersInsertList.length; i++) {
            this.stgidentifiersInsertList[i].stgId = this.dialog.data.stgId;
            this.stgidentifiersInsertList[i].createDatetime = DateFormat.getDate();
            this.stgidentifiersCommitModel.insertList = this.stgidentifiersInsertList;
         }
      }
      if (this.stgidentifiersUpdatetList.length > 0) {
         for (let i = 0; i < this.stgidentifiersUpdatetList.length; i++) {
            this.stgidentifiersUpdatetList[i]['imageData'] = null;
            this.stgidentifiersCommitModel.updateList = this.stgidentifiersUpdatetList;
         }
      }
      if (this.stgidentifiersDeleteList.length > 0) {
         for (let i = 0; i < this.stgidentifiersDeleteList.length; i++) {
            this.stgidentifiersCommitModel.deleteList = this.stgidentifiersDeleteList;
         }
      }
      const stgidentifiersSaveData = this.oidstgidFactory.stgIdentifiersCommit(this.stgidentifiersCommitModel);
      stgidentifiersSaveData.subscribe(data => {
         if (data === 1) {
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.stgidentifiersExecuteQuery(null);
            return;
         } else {
            this.show('common.addupdateremoverecordfailed');
            this.stgidentifiersExecuteQuery(null);
            return;
         }
      });
   }
   /**
       *  This function will be executed when execute query call
       */
   stgidentifyingwordsExecuteQuery() {
      this.stgidentifyingwordsModelData = new StgIdentifyingWords();
      this.stgidentifyingwordsModelData.stgId = this.dialog.data.stgId;
      const stgidentifyingwordsResult = this.oidstgidFactory.
         stgIdentifyingWordsExecuteQuery(this.stgidentifyingwordsModelData);
      stgidentifyingwordsResult.subscribe(data => {
         if (data.length === 0) {
            this.stgidentifyingwordsData = [];
         } else {
            this.stgidentifyingwordsData = data;
            this.tableIndexOne = 0;
         }
      });
   }

   /**
 *  This function will be executed when update/insert the row
*/
   oidstgididentifyingwordsValidations() {
      const is = { valid: true };
      this.stgidentifyingwordsData.forEach(data => {
         if (is.valid) {
            if (!data.code) {
               this.show('oidstgid.codemustbeentered');
               is.valid = false;
               return;
            }
         }
         if (!data.description) {
            this.show('oidstgid.descriptionmustbeentered');
            is.valid = false;
            return;
         }
      });
      return is.valid;
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oidstgidSavestgidentifyingwordsForm(event) {
      if (!this.oidstgididentifyingwordsValidations()) {
         return;
      }
      this.stgidentifyingwordsInsertList = event.added;
      this.stgidentifyingwordsUpdatetList = event.updated;
      this.stgidentifyingwordsDeleteList = event.removed;
      this.stgidentifyingwordsCommitModel.insertList = [];
      this.stgidentifyingwordsCommitModel.updateList = [];
      this.stgidentifyingwordsCommitModel.deleteList = [];
      if (this.stgidentifyingwordsInsertList.length > 0) {
         for (let i = 0; i < this.stgidentifyingwordsInsertList.length; i++) {
            this.stgidentifyingwordsInsertList[i].stgId = this.dialog.data.stgId;
            this.stgidentifyingwordsInsertList[i].code = this.stgidentifyingwordsInsertList[i].code;
            this.stgidentifyingwordsInsertList[i].description = this.stgidentifyingwordsInsertList[i].description;
            this.stgidentifyingwordsInsertList[i].createDatetime = DateFormat.getDate();
            this.stgidentifyingwordsCommitModel.insertList = this.stgidentifyingwordsInsertList;
         }
      }
      if (this.stgidentifyingwordsUpdatetList.length > 0) {
         for (let i = 0; i < this.stgidentifyingwordsUpdatetList.length; i++) {
            this.stgidentifyingwordsCommitModel.updateList = this.stgidentifyingwordsUpdatetList;
         }
      }
      if (this.stgidentifyingwordsDeleteList.length > 0) {
         for (let i = 0; i < this.stgidentifyingwordsDeleteList.length; i++) {
            this.stgidentifyingwordsCommitModel.deleteList = this.stgidentifyingwordsDeleteList;
         }
      }
      const stgidentifyingwordsSaveData = this.oidstgidFactory.
         stgIdentifyingWordsCommit(this.stgidentifyingwordsCommitModel);
      stgidentifyingwordsSaveData.subscribe(data => {
         if (data === 1) {
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.stgidentifyingwordsExecuteQuery();
            return;
         } else {
            this.show('common.addupdateremoverecordfailed');
            this.stgidentifyingwordsExecuteQuery();
            return;
         }
      });
   }
   /**
 *  This function will be executed when onInsert/commit event is
* fired
*/
   onGridInsert = () => {
      if (!this.oidstgidValidations()) {
         return null;
      }
      return {
         createUserId: this.sessionManager.getId()
      };
   }

   onGridDelete = () => {
      if (this.stgidentifiersModel.imageData) {
        this.show('common.youcannotdeleteselectedrecord');
        return false;
      }
      return true;
  }
   /**
  *  This function will be executed when onInsert/commit event is
 * fired
 */
   onGridInsertSeq = () => {
      if (!this.oidstgididentifyingwordsValidations()) {
         return null;
      }
      if (this.stgidentifyingwordsData.length > 0) {
         for (let i = 0; i < this.stgidentifyingwordsData.length; i++) {
            if (!this.stgidentifyingwordsData[i].wordSeq) {
               if (!this.stgidentifyingwordsData[i].code) {
                  this.show('oidstgid.codemustbeentered');
                  return;
               }
            }
            if (!this.stgidentifyingwordsData[i].description) {
               this.show('oidstgid.descriptionmustbeentered');
               return;
            }
            // this.stgidentifiersData.length = 0  i.e 0-1 Error :Cannot read properties of undefined (reading 'profileType')
            
            // if (!this.stgidentifiersData[this.stgidentifiersData.length - 1].profileType) {
            //    this.show(this.translateService.translate('oidstgid.characteristicmustbeentered'));
            //    return;
            // }

         }
      }
      return {
         createUserId: this.sessionManager.getId()
      };
   }

   onSTGidentifierClear = () => {
        this.stgidentifiersExecuteQuery();
        return true ;
    }

}
