
import {BaseModel} from '@commonbeans/BaseModel';
import { VCorporateAddresses } from '@instschedulebeans/VCorporateAddresses';

export class VCorporateAddressesCommitBean extends BaseModel {
private _insertList: Array<VCorporateAddresses>;
  private _deleteList: Array<VCorporateAddresses>;
  private _updateList: Array<VCorporateAddresses>;

  get insertList(): Array<VCorporateAddresses> { return this._insertList; }

  set insertList(pinsertList: Array<VCorporateAddresses>) { this._insertList = pinsertList; }

  get deleteList(): Array<VCorporateAddresses> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VCorporateAddresses>) { this._deleteList = pdeleteList; }

  get updateList(): Array<VCorporateAddresses> { return this._updateList; }

  set updateList(pupdateList: Array<VCorporateAddresses>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}