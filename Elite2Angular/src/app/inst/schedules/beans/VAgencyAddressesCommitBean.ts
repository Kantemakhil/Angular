
import {BaseModel} from '@commonbeans/BaseModel';
import { VAgencyAddresses } from '@instschedulebeans/VAgencyAddresses';

export class VAgencyAddressesCommitBean extends BaseModel {
private _insertList: Array<VAgencyAddresses>;
  private _deleteList: Array<VAgencyAddresses>;
  private _updateList: Array<VAgencyAddresses>;

  get insertList(): Array<VAgencyAddresses> { return this._insertList; }

  set insertList(pinsertList: Array<VAgencyAddresses>) { this._insertList = pinsertList; }

  get deleteList(): Array<VAgencyAddresses> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VAgencyAddresses>) { this._deleteList = pdeleteList; }

  get updateList(): Array<VAgencyAddresses> { return this._updateList; }

  set updateList(pupdateList: Array<VAgencyAddresses>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}