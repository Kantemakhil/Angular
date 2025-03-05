
import { BaseModel } from '@common/beans/BaseModel';
import { Vehicles } from './Vehicles';
export class VehiclesCommitBean extends BaseModel{
    private _insertList: Array<Vehicles>;
    private _updateList: Array<Vehicles>;
    private _deleteList: Array<Vehicles>;

    public get insertList(): Array<Vehicles> {
        return this._insertList;
    }
    public set insertList(value: Array<Vehicles>) {
        this._insertList = value;
    }
    
    public get updateList(): Array<Vehicles> {
        return this._updateList;
    }
    public set updateList(value: Array<Vehicles>) {
        this._updateList = value;
    }
    public get deleteList(): Array<Vehicles> {
        return this._deleteList;
    }
    public set deleteList(value: Array<Vehicles>) {
        this._deleteList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}