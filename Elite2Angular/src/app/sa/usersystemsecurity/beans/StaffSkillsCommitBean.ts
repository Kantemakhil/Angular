import {BaseModel} from '@commonbeans/BaseModel';
import { StaffSkills } from './StaffSkills';


export class StaffSkillsCommitBean extends BaseModel {
private _insertList: Array<StaffSkills>;
  private _deleteList: Array<StaffSkills>;
  private _updateList: Array<StaffSkills>;

  get insertList(): Array<StaffSkills> { return this._insertList; }

  set insertList(pinsertList: Array<StaffSkills>){ this._insertList = pinsertList; }

  get deleteList(): Array<StaffSkills> { return this._deleteList; }

  set deleteList(pdeleteList: Array<StaffSkills>){ this._deleteList = pdeleteList; }

  get updateList(): Array<StaffSkills> { return this._updateList; }

  set updateList(pupdateList: Array<StaffSkills>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}
