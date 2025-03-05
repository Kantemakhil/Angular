import {BaseModel} from '@commonbeans/BaseModel';
import { AgencyIncidentRepairs } from '@instincidentsbeans/AgencyIncidentRepairs';

export class AgencyIncidentRepairsCommitBean extends BaseModel {
private _insertList: Array<AgencyIncidentRepairs>;
  private _deleteList: Array<AgencyIncidentRepairs>;
  private _updateList: Array<AgencyIncidentRepairs>;

  get insertList(): Array<AgencyIncidentRepairs> { return this._insertList; }

  set insertList(pinsertList: Array<AgencyIncidentRepairs>) { this._insertList = pinsertList; }

  get deleteList(): Array<AgencyIncidentRepairs> { return this._deleteList; }

  set deleteList(pdeleteList: Array<AgencyIncidentRepairs>) { this._deleteList = pdeleteList; }

  get updateList(): Array<AgencyIncidentRepairs> { return this._updateList; }

  set updateList(pupdateList: Array<AgencyIncidentRepairs>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }


}
