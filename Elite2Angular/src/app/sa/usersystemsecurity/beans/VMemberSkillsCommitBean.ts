import {BaseModel} from '@commonbeans/BaseModel';
import { VMemberSkills } from './VMemberSkills';


export class VMemberSkillsCommitBean extends BaseModel {
private _insertList: Array<VMemberSkills>;
  private _deleteList: Array<VMemberSkills>;
  private _updateList: Array<VMemberSkills>;

  get insertList(): Array<VMemberSkills> { return this._insertList; }

  set insertList(pinsertList: Array<VMemberSkills>){ this._insertList = pinsertList; }

  get deleteList(): Array<VMemberSkills> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VMemberSkills>){ this._deleteList = pdeleteList; }

  get updateList(): Array<VMemberSkills> { return this._updateList; }

  set updateList(pupdateList: Array<VMemberSkills>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}
