import {BaseModel} from '@commonbeans/BaseModel';
import {BedAssignmentHistories} from './BedAssignmentHistories';

export class BedAssignmentHistoriesCommitBean extends BaseModel {
private _insertList: Array<BedAssignmentHistories>;
  private _deleteList: Array<BedAssignmentHistories>;
  private _updateList: Array<BedAssignmentHistories>;

  get insertList(): Array<BedAssignmentHistories> { return this._insertList; }

  set insertList(pinsertList: Array<BedAssignmentHistories>){ this._insertList = pinsertList; }

  get deleteList(): Array<BedAssignmentHistories> { return this._deleteList; }

  set deleteList(pdeleteList: Array<BedAssignmentHistories>){ this._deleteList = pdeleteList; }

  get updateList(): Array<BedAssignmentHistories> { return this._updateList; }

  set updateList(pupdateList: Array<BedAssignmentHistories>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
