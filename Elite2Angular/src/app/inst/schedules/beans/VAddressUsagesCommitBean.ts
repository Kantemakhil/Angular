
import {BaseModel} from '@commonbeans/BaseModel';
import { VAddressUsages } from '@instschedulebeans/VAddressUsages';

export class VAddressUsagesCommitBean extends BaseModel {
private _insertList: Array<VAddressUsages>;
  private _deleteList: Array<VAddressUsages>;
  private _updateList: Array<VAddressUsages>;

  get insertList(): Array<VAddressUsages> { return this._insertList; }

  set insertList(pinsertList: Array<VAddressUsages>) { this._insertList = pinsertList; }

  get deleteList(): Array<VAddressUsages> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VAddressUsages>) { this._deleteList = pdeleteList; }

  get updateList(): Array<VAddressUsages> { return this._updateList; }

  set updateList(pupdateList: Array<VAddressUsages>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}