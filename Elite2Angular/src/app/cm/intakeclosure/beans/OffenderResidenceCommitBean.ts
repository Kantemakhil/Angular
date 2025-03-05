import { OffenderResidence } from "@cm/intakeclosure/beans/OffenderResidence";


   export class OffenderResidenceCommitBean {
       private _deleteList: Array<OffenderResidence>;
       private _serialVersionUID: number;
       private _insertList: Array<OffenderResidence>;
       private _updateList: Array<OffenderResidence>;
       

       get deleteList(): Array<OffenderResidence> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<OffenderResidence>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<OffenderResidence> { return  this._insertList; }

       set insertList(pinsertList: Array<OffenderResidence>) { this._insertList = pinsertList; }

       get updateList(): Array<OffenderResidence> { return  this._updateList; }

       set updateList(pupdateList: Array<OffenderResidence>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
