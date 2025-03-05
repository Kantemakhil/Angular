import {BaseModel} from '@commonbeans/BaseModel';
import { ProgramServices } from '@inst/institutional-activities/maintenance/beans/ProgramServices';

export class ProgramServicesCommitBean extends BaseModel {
private _insertList: Array<ProgramServices>;
  private _deleteList: Array<ProgramServices>;
  private _updateList: Array<ProgramServices>;

  get insertList(): Array<ProgramServices> { return this._insertList; }

  set insertList(pinsertList: Array<ProgramServices>) { this._insertList = pinsertList; }

  get deleteList(): Array<ProgramServices> { return this._deleteList; }

  set deleteList(pdeleteList: Array<ProgramServices>) { this._deleteList = pdeleteList; }

  get updateList(): Array<ProgramServices> { return this._updateList; }

  set updateList(pupdateList: Array<ProgramServices>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
