
//import {BaseModel} from '@commonbeans/BaseModel';extends BaseModel 

import { VExternalMoves } from './VExternalMoves';
import { BaseModel } from "@common/beans/BaseModel";

export class VExternalMovesCommitBean extends BaseModel{

    private _insertList: Array<VExternalMoves>;
    private _deleteList: Array<VExternalMoves>;
    private _updateList: Array<VExternalMoves>;

    get insertList(): Array<VExternalMoves> { return this._insertList; }

    set insertList(pinsertList: Array<VExternalMoves>) { this._insertList = pinsertList; }

    get deleteList(): Array<VExternalMoves> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VExternalMoves>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VExternalMoves> { return this._updateList; }

    set updateList(pupdateList: Array<VExternalMoves>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };

   }
}

