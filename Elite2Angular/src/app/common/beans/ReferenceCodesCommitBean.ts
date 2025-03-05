import {BaseModel} from '@commonbeans/BaseModel';
import { ReferenceCodes } from '@commonbeans/ReferenceCodes';


export class ReferenceCodesCommitBean extends BaseModel {
  private _insertList: Array<ReferenceCodes>;
  private _deleteList: Array<ReferenceCodes>;
  private _updateList: Array<ReferenceCodes>;
  

  get insertList(): Array<ReferenceCodes> { return this._insertList; }

  set insertList(pinsertList: Array<ReferenceCodes>) { this._insertList = pinsertList; }

  get deleteList(): Array<ReferenceCodes> { return this._deleteList; }

  set deleteList(pdeleteList: Array<ReferenceCodes>) { this._deleteList = pdeleteList; }

  get updateList(): Array<ReferenceCodes> { return this._updateList; }

  set updateList(pupdateList: Array<ReferenceCodes>) { this._updateList = pupdateList; }



  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
    };
  }


}
