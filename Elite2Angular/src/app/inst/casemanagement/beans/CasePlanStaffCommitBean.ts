import { CasePlanStaff } from "./CasePlanStaff";


export class CasePlanStaffCommitBean  {
    private _insertList: Array<CasePlanStaff>;
    private _updateList: Array<CasePlanStaff>;
    private _deleteList: Array<CasePlanStaff>;
    public get insertList(): Array<CasePlanStaff> {
        return this._insertList;
    }
    public set insertList(value: Array<CasePlanStaff>) {
        this._insertList = value;
    }
    public get updateList(): Array<CasePlanStaff> {
        return this._updateList;
    }
    public set updateList(value: Array<CasePlanStaff>) {
        this._updateList = value;
    }
    public get deleteList(): Array<CasePlanStaff> {
        return this._deleteList;
    }
    public set deleteList(value: Array<CasePlanStaff>) {
        this._deleteList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

}