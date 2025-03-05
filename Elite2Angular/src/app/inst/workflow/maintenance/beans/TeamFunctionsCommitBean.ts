
import { BaseModel } from '@commonbeans/BaseModel';
import { TeamFunctions } from './TeamFunctions';



export class TeamFunctionsCommitBean extends BaseModel{

    private _insertList: Array<TeamFunctions>;
    private _deleteList: Array<TeamFunctions>;
    private _updateList: Array<TeamFunctions>;

    get insertList(): Array<TeamFunctions> { return this._insertList; }

    set insertList( pinsertList: Array<TeamFunctions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<TeamFunctions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<TeamFunctions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<TeamFunctions> { return this._updateList; }

    set updateList( pupdateList: Array<TeamFunctions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}