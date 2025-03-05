
import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderPptyContainers } from './OffenderPptyContainers';

export class OffenderPptyContainersCommitBean extends BaseModel {
private _insertList: Array<OffenderPptyContainers>;
  private _deleteList: Array<OffenderPptyContainers>;
  private _updateList: Array<OffenderPptyContainers>;

  get insertList(): Array<OffenderPptyContainers> { return this._insertList; }

  set insertList(pinsertList: Array<OffenderPptyContainers>) { this._insertList = pinsertList; }

  get deleteList(): Array<OffenderPptyContainers> { return this._deleteList; }

  set deleteList(pdeleteList: Array<OffenderPptyContainers>) { this._deleteList = pdeleteList; }

  get updateList(): Array<OffenderPptyContainers> { return this._updateList; }

  set updateList(pupdateList: Array<OffenderPptyContainers>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}