import { OffSupervisionStsHty } from "@cm/intakeclosure/beans/OffSupervisionStsHty";


   export class OffSupervisionStsHtyCommitBean {
       private _deleteList: Array<OffSupervisionStsHty>;
       private _insertList: Array<OffSupervisionStsHty>;
       private _updateList: Array<OffSupervisionStsHty>;
       

       get deleteList(): Array<OffSupervisionStsHty> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<OffSupervisionStsHty>) { this._deleteList = pdeleteList; }

       get insertList(): Array<OffSupervisionStsHty> { return  this._insertList; }

       set insertList(pinsertList: Array<OffSupervisionStsHty>) { this._insertList = pinsertList; }

       get updateList(): Array<OffSupervisionStsHty> { return  this._updateList; }

       set updateList(pupdateList: Array<OffSupervisionStsHty>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
