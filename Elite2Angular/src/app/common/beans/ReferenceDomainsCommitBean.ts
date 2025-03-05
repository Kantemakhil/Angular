import {BaseModel} from '@commonbeans/BaseModel';
import { ReferenceDomains } from '@commonbeans/ReferenceDomains';


export class ReferenceDomainsCommitBean extends BaseModel {
  private _insertList: Array<ReferenceDomains>;
  private _deleteList: Array<ReferenceDomains>;
  private _updateList: Array<ReferenceDomains>;
  

  get insertList(): Array<ReferenceDomains> { return this._insertList; }

  set insertList(pinsertList: Array<ReferenceDomains>) { this._insertList = pinsertList; }

  get deleteList(): Array<ReferenceDomains> { return this._deleteList; }

  set deleteList(pdeleteList: Array<ReferenceDomains>) { this._deleteList = pdeleteList; }

  get updateList(): Array<ReferenceDomains> { return this._updateList; }

  set updateList(pupdateList: Array<ReferenceDomains>) { this._updateList = pupdateList; }



  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
    };
  }


}
