import {BaseModel} from '@commonbeans/BaseModel';
import { IncidentFollowUpDetails } from './IncidentFollowUpDetails';


export class IncidentFollowUpDetailsCommitBean extends BaseModel {
private _insertList: Array<IncidentFollowUpDetails>;
  private _deleteList: Array<IncidentFollowUpDetails>;
  private _updateList: Array<IncidentFollowUpDetails>;

  get insertList(): Array<IncidentFollowUpDetails> { return this._insertList; }

  set insertList(pinsertList: Array<IncidentFollowUpDetails>) { this._insertList = pinsertList; }

  get deleteList(): Array<IncidentFollowUpDetails> { return this._deleteList; }

  set deleteList(pdeleteList: Array<IncidentFollowUpDetails>) { this._deleteList = pdeleteList; }

  get updateList(): Array<IncidentFollowUpDetails> { return this._updateList; }

  set updateList(pupdateList: Array<IncidentFollowUpDetails>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
