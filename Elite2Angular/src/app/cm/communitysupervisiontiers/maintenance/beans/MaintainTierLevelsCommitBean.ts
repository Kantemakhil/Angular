
import { BaseModel } from '../../../../common/beans/BaseModel';
import { MaintainTierDefaultEvents } from './MaintainTierDefaultEvents';
import { MaintainTierLevels } from './MaintainTierLevels';

export class MaintainTierLevelsCommitBean extends BaseModel {
    private _insertList: Array<MaintainTierLevels>;
    private _deleteList: Array<MaintainTierLevels>;
    private _updateList: Array<MaintainTierLevels>;
    private _insertTierDefEvents: Array<MaintainTierDefaultEvents>;
    private _updateTierDefEvents: Array<MaintainTierDefaultEvents>;
    private _deleteTierDefEvents: Array<MaintainTierDefaultEvents>;
    

    get insertList(): Array<MaintainTierLevels> {return this._insertList;}
    set insertList(value: Array<MaintainTierLevels>) {this._insertList = value;}
    get deleteList(): Array<MaintainTierLevels> {return this._deleteList;}
    set deleteList(value: Array<MaintainTierLevels>) {this._deleteList = value;}
    get updateList(): Array<MaintainTierLevels> {return this._updateList;}
    set updateList(value: Array<MaintainTierLevels>) {this._updateList = value;}
    get insertTierDefEvents(): Array<MaintainTierDefaultEvents> {return this._insertTierDefEvents;}
    set insertTierDefEvents(value: Array<MaintainTierDefaultEvents>) {this._insertTierDefEvents = value;}
    get updateTierDefEvents(): Array<MaintainTierDefaultEvents> {return this._updateTierDefEvents;}
    set updateTierDefEvents(value: Array<MaintainTierDefaultEvents>) {this._updateTierDefEvents = value;}
    get deleteTierDefEvents(): Array<MaintainTierDefaultEvents> {return this._deleteTierDefEvents; }
    set deleteTierDefEvents(value: Array<MaintainTierDefaultEvents>) {this._deleteTierDefEvents = value;}

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'insertTierDefEvents' :this._insertTierDefEvents,
            'updateTierDefEvents' :this._updateTierDefEvents,
            'deleteTierDefEvents' :this._deleteTierDefEvents,
        };
    }


}