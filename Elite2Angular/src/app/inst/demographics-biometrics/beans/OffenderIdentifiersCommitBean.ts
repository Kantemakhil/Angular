import {BaseModel} from '@commonbeans/BaseModel';
import {OffenderIdentifier} from '@instdemographicsbeans/OffenderIdentifier';

export class OffenderIdentifiersCommitBean extends BaseModel {

  private _insertList: Array<OffenderIdentifier>;
  private _deleteList: Array<OffenderIdentifier>;
  private _updateList: Array<OffenderIdentifier>;

  get insertList(): Array<OffenderIdentifier> { return this._insertList; }

  set insertList(pinsertList: Array<OffenderIdentifier>) { this._insertList = pinsertList; }

  get deleteList(): Array<OffenderIdentifier> { return this._deleteList; }

  set deleteList(pdeleteList: Array<OffenderIdentifier>) { this._deleteList = pdeleteList; }

  get updateList(): Array<OffenderIdentifier> { return this._updateList; }

  set updateList(pupdateList: Array<OffenderIdentifier>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
}