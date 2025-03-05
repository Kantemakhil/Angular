import { BaseModel } from '../../../common/beans/BaseModel';
import { OffenderTierLevel } from './OffenderTierLevel';
export class OffenderTierLevelCommitBean extends BaseModel {
    private _insertList: Array<OffenderTierLevel>;
    private _deleteList: Array<OffenderTierLevel>;
    private _updateList: Array<OffenderTierLevel>;

    get insertList(): Array<OffenderTierLevel> {return this._insertList;}
    set insertList(value: Array<OffenderTierLevel>) {this._insertList = value;}
    get deleteList(): Array<OffenderTierLevel> {return this._deleteList;}
    set deleteList(value: Array<OffenderTierLevel>) {this._deleteList = value;}
    get updateList(): Array<OffenderTierLevel> {return this._updateList;}
    set updateList(value: Array<OffenderTierLevel>) {this._updateList = value;}

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }


}