import {BaseModel} from '@commonbeans/BaseModel';
import { SecurityThreatGroups } from '@instincidentsbeans/SecurityThreatGroups';

export class SecurityThreatGroupsCommitBean extends BaseModel {
private _insertList: Array<SecurityThreatGroups>;
  private _deleteList: Array<SecurityThreatGroups>;
  private _updateList: Array<SecurityThreatGroups>;

  get insertList(): Array<SecurityThreatGroups> { return this._insertList; }

  set insertList(pinsertList: Array<SecurityThreatGroups>) { this._insertList = pinsertList; }

  get deleteList(): Array<SecurityThreatGroups> { return this._deleteList; }

  set deleteList(pdeleteList: Array<SecurityThreatGroups>) { this._deleteList = pdeleteList; }

  get updateList(): Array<SecurityThreatGroups> { return this._updateList; }

  set updateList(pupdateList: Array<SecurityThreatGroups>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }


}
