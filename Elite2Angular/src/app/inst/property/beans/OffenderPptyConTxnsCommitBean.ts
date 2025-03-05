import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderPptyConTxns } from '@instproperty/OffenderPptyConTxns';

export class OffenderPptyConTxnsCommitBean extends BaseModel {
  private _insertList: Array<OffenderPptyConTxns>;
  private _deleteList: Array<OffenderPptyConTxns>;
  private _updateList: Array<OffenderPptyConTxns>;

  get insertList(): Array<OffenderPptyConTxns> { return this._insertList; }

  set insertList(pinsertList: Array<OffenderPptyConTxns>) { this._insertList = pinsertList; }

  get deleteList(): Array<OffenderPptyConTxns> { return this._deleteList; }

  set deleteList(pdeleteList: Array<OffenderPptyConTxns>) { this._deleteList = pdeleteList; }

  get updateList(): Array<OffenderPptyConTxns> { return this._updateList; }

  set updateList(pupdateList: Array<OffenderPptyConTxns>) { this._updateList = pupdateList; }


  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
    };
  }


}
