
import { Allowances } from './Allowances';


export class AllowancesCommitBean{

    private _insertList: Array<Allowances>;
    private _updateList: Array<Allowances>;

    public get insertList(): Array<Allowances> {
        return this._insertList;
    }
    public set insertList(value: Array<Allowances>) {
        this._insertList = value;
    }

    public get updateList(): Array<Allowances> {
        return this._updateList;
    }
    public set updateList(value: Array<Allowances>) {
        this._updateList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}