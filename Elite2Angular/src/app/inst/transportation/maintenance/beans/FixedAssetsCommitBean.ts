import { BaseModel } from '@common/beans/BaseModel';
import { FixedAssets } from './FixedAssets';


export class FixedAssetsCommitBean extends BaseModel{
    private _insertList: Array<FixedAssets>;
    private _updateList: Array<FixedAssets>;
    private _deleteList: Array<FixedAssets>;

    public get insertList(): Array<FixedAssets> {
        return this._insertList;
    }
    public set insertList(value: Array<FixedAssets>) {
        this._insertList = value;
    }
    
    public get updateList(): Array<FixedAssets> {
        return this._updateList;
    }
    public set updateList(value: Array<FixedAssets>) {
        this._updateList = value;
    }
    public get deleteList(): Array<FixedAssets> {
        return this._deleteList;
    }
    public set deleteList(value: Array<FixedAssets>) {
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