import { AgencyIncidentParties } from './AgencyIncidentParties';
import {BaseModel} from '@commonbeans/BaseModel';

export class AgencyIncidentPartiesCommitBean extends BaseModel {
private _insertList: Array<AgencyIncidentParties>;
  private _deleteList: Array<AgencyIncidentParties>;
  private _updateList: Array<AgencyIncidentParties>;

  get insertList(): Array<AgencyIncidentParties> { return this._insertList; }

  set insertList(pinsertList: Array<AgencyIncidentParties>) { this._insertList = pinsertList; }

  get deleteList(): Array<AgencyIncidentParties> { return this._deleteList; }

  set deleteList(pdeleteList: Array<AgencyIncidentParties>) { this._deleteList = pdeleteList; }

  get updateList(): Array<AgencyIncidentParties> { return this._updateList; }

  set updateList(pupdateList: Array<AgencyIncidentParties>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }


}
