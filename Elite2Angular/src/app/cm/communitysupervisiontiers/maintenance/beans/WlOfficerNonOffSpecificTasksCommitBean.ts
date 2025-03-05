import { WlOfficerNonOffSpecificTasks } from "./WlOfficerNonOffSpecificTasks";

export class WlOfficerNonOffSpecificTasksCommitBean {
    private _insertList: Array<WlOfficerNonOffSpecificTasks>;
    private _updateList: Array<WlOfficerNonOffSpecificTasks>;
    private _deleteList: Array<WlOfficerNonOffSpecificTasks>;
 
    private _availableWLUnits: number;
    public get availableWLUnits(): number {
        return this._availableWLUnits;
    }
    public set availableWLUnits(value: number) {
        this._availableWLUnits = value;
    }


    public get insertList(): Array<WlOfficerNonOffSpecificTasks> { return this._insertList; }
    public set insertList(value: Array<WlOfficerNonOffSpecificTasks>) { this._insertList = value; }
    public get deleteList(): Array<WlOfficerNonOffSpecificTasks> { return this._deleteList; }
    public set deleteList(value: Array<WlOfficerNonOffSpecificTasks>) { this._deleteList = value; }
    public get updateList(): Array<WlOfficerNonOffSpecificTasks> { return this._updateList; }
    public set updateList(value: Array<WlOfficerNonOffSpecificTasks>) { this._updateList = value; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
            'availableWLUnits': this._availableWLUnits
        }
    }


}