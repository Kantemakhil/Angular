import { BaseModel } from "../../../../common/beans/BaseModel";
import { WlDefaultStaffUnits } from "./WlDefaultStaffUnits";
import { WlNonOffSpecificTasks } from "./WlNonOffSpecificTasks";
export class WlNonOffSpecificTasksCommitBean extends BaseModel {
    private _insertList: Array<WlNonOffSpecificTasks>;
    private _deleteList: Array<WlNonOffSpecificTasks>;
    private _updateList: Array<WlNonOffSpecificTasks>;
    private _startingUnitsInsertList: Array<WlDefaultStaffUnits>;
    private _startingUnitsDeleteList: Array<WlDefaultStaffUnits>;
    private _startingUnitsUpdateList: Array<WlDefaultStaffUnits>;

    public get insertList(): Array<WlNonOffSpecificTasks> {
        return this._insertList;
    }
    public set insertList(value: Array<WlNonOffSpecificTasks>) {
        this._insertList = value;
    }
    public get deleteList(): Array<WlNonOffSpecificTasks> {
        return this._deleteList;
    }
    public set deleteList(value: Array<WlNonOffSpecificTasks>) {
        this._deleteList = value;
    }
    public get updateList(): Array<WlNonOffSpecificTasks> {
        return this._updateList;
    }
    public set updateList(value: Array<WlNonOffSpecificTasks>) {
        this._updateList = value;
    }

    public get startingUnitsInsertList(): Array<WlDefaultStaffUnits> {
        return this._startingUnitsInsertList;
    }
    public set startingUnitsInsertList(value: Array<WlDefaultStaffUnits>) {
        this._startingUnitsInsertList = value;
    }
    public get startingUnitsDeleteList(): Array<WlDefaultStaffUnits> {
        return this._startingUnitsDeleteList;
    }
    public set startingUnitsDeleteList(value: Array<WlDefaultStaffUnits>) {
        this._startingUnitsDeleteList = value;
    }
    public get startingUnitsUpdateList(): Array<WlDefaultStaffUnits> {
        return this._startingUnitsUpdateList;
    }
    public set startingUnitsUpdateList(value: Array<WlDefaultStaffUnits>) {
        this._startingUnitsUpdateList = value;
    }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'startingUnitsInsertList': this._startingUnitsInsertList,
            'startingUnitsDeleteList': this._startingUnitsDeleteList,
            'startingUnitsUpdateList': this._startingUnitsUpdateList
        }
    }
}