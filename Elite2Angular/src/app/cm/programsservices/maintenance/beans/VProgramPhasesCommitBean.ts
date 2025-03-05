import { BaseModel } from '@common/beans/BaseModel';
import { VProgramPhases } from '@inst/institutional-activities/maintenance/beans/VProgramPhases';




export class VProgramPhasesCommitBean extends BaseModel {

	private _insertList: Array<VProgramPhases>;
	private _updateList: Array<VProgramPhases>;
	private _deleteList: Array<VProgramPhases>;
	
	get insertList(): Array<VProgramPhases> { return this._insertList; }

set insertList(pinsertList: Array<VProgramPhases>) { this._insertList = pinsertList; }

get deleteList(): Array<VProgramPhases> { return this._deleteList; }

set deleteList(pdeleteList: Array<VProgramPhases>) { this._deleteList = pdeleteList; }

get updateList(): Array<VProgramPhases> { return this._updateList; }

set updateList(pupdateList: Array<VProgramPhases>) { this._updateList = pupdateList; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList
};
}

}
