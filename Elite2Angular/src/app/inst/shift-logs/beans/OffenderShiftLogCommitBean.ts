import { BaseModel } from '@commonbeans/BaseModel';
import { OffendersShiftLog } from '@instshiftlogsbeans/OffendersShiftLog';

export class OffendersShiftLogCommitBean extends BaseModel {

    private _insertList: Array<OffendersShiftLog>;
    private _updateList: Array<OffendersShiftLog>;

    public get insertList(): Array<OffendersShiftLog> {
        return this._insertList;
    }
    public set insertList(value: Array<OffendersShiftLog>) {
        this._insertList = value;
    }
   
    public get updateList(): Array<OffendersShiftLog> {
        return this._updateList;
    }
    public set updateList(value: Array<OffendersShiftLog>) {
        this._updateList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList          
        };
    }
}
