import { BaseModel } from '@commonbeans/BaseModel';
import { VProgramModules } from './VProgramModules';

export class VProgramModulesCommitBean extends BaseModel {

private _insertList: Array<VProgramModules>;
private _deleteList: Array<VProgramModules>;
private _updateList: Array<VProgramModules>;


get insertList(): Array<VProgramModules> { return this._insertList; }

set insertList(pinsertList: Array<VProgramModules>) { this._insertList = pinsertList; }

get deleteList(): Array<VProgramModules> { return this._deleteList; }

set deleteList(pdeleteList: Array<VProgramModules>) { this._deleteList = pdeleteList; }

get updateList(): Array<VProgramModules> { return this._updateList; }

set updateList(pupdateList: Array<VProgramModules>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}

}