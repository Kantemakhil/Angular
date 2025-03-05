import { OffenderRestrictions } from "@inst/visits-management/beans/OffenderRestrictions";

   export class OffenderRestrictionsCommitBean {
       private _deleteList: Array<OffenderRestrictions>;
       private _serialVersionUID: number;
       private _insertList: Array<OffenderRestrictions>;
       private _updateList: Array<OffenderRestrictions>;

       get deleteList(): Array<OffenderRestrictions> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<OffenderRestrictions>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<OffenderRestrictions> { return  this._insertList; }

       set insertList(pinsertList: Array<OffenderRestrictions>) { this._insertList = pinsertList; }

       get updateList(): Array<OffenderRestrictions> { return  this._updateList; }

       set updateList(pupdateList: Array<OffenderRestrictions>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
