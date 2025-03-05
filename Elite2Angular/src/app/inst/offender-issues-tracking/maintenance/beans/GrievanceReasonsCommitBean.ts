
import { BaseModel } from "@common/beans/BaseModel";
import { GrievanceReasons } from "./GrievanceReasons";



export class GrievanceReasonsCommitBean extends BaseModel {
    private _insertList: Array<GrievanceReasons>;
    private _deleteList: Array<GrievanceReasons>;
    private _updateList: Array<GrievanceReasons>;

    get insertList(): Array<GrievanceReasons> { return this._insertList; }

    set insertList( pinsertList: Array<GrievanceReasons> ) { this._insertList = pinsertList; }

    get deleteList(): Array<GrievanceReasons> { return this._deleteList; }

    set deleteList( pdeleteList: Array<GrievanceReasons> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<GrievanceReasons> { return this._updateList; }

    set updateList( pupdateList: Array<GrievanceReasons> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}