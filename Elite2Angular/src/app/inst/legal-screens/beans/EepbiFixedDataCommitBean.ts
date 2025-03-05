
import { EepbiFixedData } from './EepbiFixedData';

export class EepbiFixedDataCommitBean {
    private _insertList: Array<EepbiFixedData>;
    public get insertList(): Array<EepbiFixedData> {
        return this._insertList;
    }
    public set insertList(value: Array<EepbiFixedData>) {
        this._insertList = value;
    }
    private _deleteList: Array<EepbiFixedData>;
    public get deleteList(): Array<EepbiFixedData> {
        return this._deleteList;
    }
    public set deleteList(value: Array<EepbiFixedData>) {
        this._deleteList = value;
    }
    private _updateList: Array<EepbiFixedData>;
    public get updateList(): Array<EepbiFixedData> {
        return this._updateList;
    }
    public set updateList(value: Array<EepbiFixedData>) {
        this._updateList = value;
    }

}
