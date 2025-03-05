import { SupervisionStatusHsty } from "@cm/intakeclosure/beans/SupervisionStatusHsty";


   export class SupervisionStatusHstyCommitBean {
       private _deleteList: Array<SupervisionStatusHsty>;
       private _insertList: Array<SupervisionStatusHsty>;
       private _updateList: Array<SupervisionStatusHsty>;
       

       get deleteList(): Array<SupervisionStatusHsty> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<SupervisionStatusHsty>) { this._deleteList = pdeleteList; }

       get insertList(): Array<SupervisionStatusHsty> { return  this._insertList; }

       set insertList(pinsertList: Array<SupervisionStatusHsty>) { this._insertList = pinsertList; }

       get updateList(): Array<SupervisionStatusHsty> { return  this._updateList; }

       set updateList(pupdateList: Array<SupervisionStatusHsty>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
