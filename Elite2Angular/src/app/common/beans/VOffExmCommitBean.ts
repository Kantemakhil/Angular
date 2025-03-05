import {BaseModel} from './BaseModel';
import { VOffExm } from './VOffExm';

export class VOffExmCommitBean extends BaseModel {
private _insertList: Array<VOffExm>;
  private _deleteList: Array<VOffExm>;
  private _updateList: Array<VOffExm>;

  get insertList(): Array<VOffExm> { return this._insertList; }

  set insertList(pinsertList: Array<VOffExm>){ this._insertList = pinsertList; }

  get deleteList(): Array<VOffExm> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VOffExm>){ this._deleteList = pdeleteList; }

  get updateList(): Array<VOffExm> { return this._updateList; }

  set updateList(pupdateList: Array<VOffExm>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}
