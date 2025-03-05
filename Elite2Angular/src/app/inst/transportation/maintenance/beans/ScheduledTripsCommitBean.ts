import { BaseModel } from '../../../../common/beans/BaseModel';
import { ScheduledTrips } from './ScheduledTrips';
export class ScheduledTripsCommitBean extends BaseModel {
    private _insertList: Array<ScheduledTrips>;
    private _deleteList: Array<ScheduledTrips>;
    private _updateList: Array<ScheduledTrips>;

    get insertList(): Array<ScheduledTrips> {return this._insertList;}
    set insertList(value: Array<ScheduledTrips>) {this._insertList = value;}
    get deleteList(): Array<ScheduledTrips> {return this._deleteList;}
    set deleteList(value: Array<ScheduledTrips>) {this._deleteList = value;}
    get updateList(): Array<ScheduledTrips> {return this._updateList;}
    set updateList(value: Array<ScheduledTrips>) {this._updateList = value;}

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
    
}