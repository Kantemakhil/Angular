import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderTrustAccountsTemp } from '@inmate/beans/OffenderTrustAccountsTemp';

export class OffenderTrustAccountsTempCommitBean extends BaseModel {

   private _insertList: Array<OffenderTrustAccountsTemp>;
   private _deleteList: Array<OffenderTrustAccountsTemp>;
   private _updateList: Array<OffenderTrustAccountsTemp>;

   get insertList(): Array<OffenderTrustAccountsTemp> { return this._insertList; }

   set insertList(pinsertList: Array<OffenderTrustAccountsTemp>) { this._insertList = pinsertList; }

   get deleteList(): Array<OffenderTrustAccountsTemp> { return this._deleteList; }

   set deleteList(pdeleteList: Array<OffenderTrustAccountsTemp>) { this._deleteList = pdeleteList; }

   get updateList(): Array<OffenderTrustAccountsTemp> { return this._updateList; }

   set updateList(pupdateList: Array<OffenderTrustAccountsTemp>) { this._updateList = pupdateList; }

   toJSON(): any {
      return {
         'insertList': this._insertList,
         'deleteList': this._deleteList,
         'updateList': this._updateList
      };
   }
}