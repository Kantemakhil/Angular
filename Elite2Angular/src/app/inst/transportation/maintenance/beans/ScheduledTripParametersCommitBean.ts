import { BaseModel } from '../../../../common/beans/BaseModel';
import { ScheduledTripParameters } from './ScheduledTripParameters';

export class ScheduledTripParametersCommitBean extends BaseModel{

	private _insertList : Array<ScheduledTripParameters>;
	private _deleteList : Array<ScheduledTripParameters>;
	private _updateList : Array<ScheduledTripParameters>;

    get insertList(): Array<ScheduledTripParameters> {return this._insertList;}
    set insertList(value: Array<ScheduledTripParameters>) {this._insertList = value;}
    get deleteList(): Array<ScheduledTripParameters> {return this._deleteList;}
    set deleteList(value: Array<ScheduledTripParameters>) {this._deleteList = value;}
    get updateList(): Array<ScheduledTripParameters> {return this._updateList;}
    set updateList(value: Array<ScheduledTripParameters>) {this._updateList = value;}

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}