import { OffenderPersonRestricts } from "@inst/visits-management/beans/OffenderPersonRestricts";
    export class OffenderPersonRestrictsCommitBean {
         private _deleteList: Array<OffenderPersonRestricts>;
         private _serialVersionUID: number;
         private _insertList: Array<OffenderPersonRestricts>;
         private _updateList: Array<OffenderPersonRestricts>;

         get deleteList(): Array<OffenderPersonRestricts> { return  this._deleteList; }

         set deleteList(pdeleteList: Array<OffenderPersonRestricts>) { this._deleteList = pdeleteList; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get insertList(): Array<OffenderPersonRestricts> { return  this._insertList; }

         set insertList(pinsertList: Array<OffenderPersonRestricts>) { this._insertList = pinsertList; }

         get updateList(): Array<OffenderPersonRestricts> { return  this._updateList; }

         set updateList(pupdateList: Array<OffenderPersonRestricts>) { this._updateList = pupdateList; }


     toJSON(): any {
         return {
            'deleteList': this._deleteList,
            'serialVersionUID': this._serialVersionUID,
            'insertList': this._insertList,
            'updateList': this._updateList,
             };
         }
 }
