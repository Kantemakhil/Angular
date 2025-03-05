import {BaseModel} from '@commonbeans/BaseModel';
import { OmsRoles } from '@sausersystemsecuritybeans/OmsRoles';

export class OmsRolesCommitBean extends BaseModel {
private _insertList: Array<OmsRoles>;
  private _deleteList: Array<OmsRoles>;
  private _updateList: Array<OmsRoles>;

  get insertList(): Array<OmsRoles> { return this._insertList; }

  set insertList(pinsertList: Array<OmsRoles>){ this._insertList = pinsertList; }

  get deleteList(): Array<OmsRoles> { return this._deleteList; }

  set deleteList(pdeleteList: Array<OmsRoles>){ this._deleteList = pdeleteList; }

  get updateList(): Array<OmsRoles> { return this._updateList; }

  set updateList(pupdateList: Array<OmsRoles>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}
