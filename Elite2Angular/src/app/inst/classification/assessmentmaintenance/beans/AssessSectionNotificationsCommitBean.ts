import { BaseModel } from '@commonbeans/BaseModel';
import { AssessSectionNotifications } from './AssessSectionNotifications';



export class AssessSectionNotificationsCommitBean extends BaseModel {
    private _insertList: Array<AssessSectionNotifications>;
    private _deleteList: Array<AssessSectionNotifications>;
    private _updateList: Array<AssessSectionNotifications>;

    get insertList(): Array<AssessSectionNotifications> { return this._insertList; }

    set insertList( pinsertList: Array<AssessSectionNotifications> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AssessSectionNotifications> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AssessSectionNotifications> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AssessSectionNotifications> { return this._updateList; }

    set updateList( pupdateList: Array<AssessSectionNotifications> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}