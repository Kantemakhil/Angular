
import { BaseModel } from '@commonbeans/BaseModel';
import { AgyLocTeamFunctions } from './AgyLocTeamFunctions';



export class AgyLocTeamFunctionsCommitBean extends BaseModel{

    

    private _insertList: Array<AgyLocTeamFunctions>;
    private _deleteList: Array<AgyLocTeamFunctions>;
    private _updateList: Array<AgyLocTeamFunctions>;

    get insertList(): Array<AgyLocTeamFunctions> { return this._insertList; }

    set insertList( pinsertList: Array<AgyLocTeamFunctions> ) { this._insertList = pinsertList; }

    get deleteList(): Array<AgyLocTeamFunctions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgyLocTeamFunctions> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgyLocTeamFunctions> { return this._updateList; }

    set updateList( pupdateList: Array<AgyLocTeamFunctions> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}