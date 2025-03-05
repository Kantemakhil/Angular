
import { BaseModel } from '@commonbeans/BaseModel';
import { Teams } from '@instCaseManagementbeans/Teams';



export class TeamsCommitBean extends BaseModel{

    private _insertList: Array<Teams>;
    private _deleteList: Array<Teams>;
    private _updateList: Array<Teams>;

    get insertList(): Array<Teams> { return this._insertList; }

    set insertList( pinsertList: Array<Teams> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Teams> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Teams> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Teams> { return this._updateList; }

    set updateList( pupdateList: Array<Teams> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}