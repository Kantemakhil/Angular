import {  ScheduleMovementSetting } from "./ScheduleMovementSetting";


export class SchMovSettingCommitBean  {

    private _insertList: Array<ScheduleMovementSetting>;
    private _deleteList: Array<ScheduleMovementSetting>;
    private _updateList: Array<ScheduleMovementSetting>;
    


    get insertList(): Array<ScheduleMovementSetting> { return this._insertList; }

    set insertList(pinsertList: Array<ScheduleMovementSetting>) { this._insertList = pinsertList; }

    get deleteList(): Array<ScheduleMovementSetting> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ScheduleMovementSetting>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ScheduleMovementSetting> { return this._updateList; }

    set updateList(pupdateList: Array<ScheduleMovementSetting>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
