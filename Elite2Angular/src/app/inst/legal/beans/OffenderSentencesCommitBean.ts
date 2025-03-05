import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSentences } from "../beans/OffenderSentences";


export class OffenderSentencesCommitBean extends BaseModel {
 
    private _insertList: Array<OffenderSentences>;
    private _updateList: Array<OffenderSentences>;
    private _deleteList: Array<OffenderSentences>;
   

    get insertList(): Array<OffenderSentences> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSentences> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderSentences> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSentences> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderSentences> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderSentences> ) { this._deleteList = pdeleteList; }
    
  

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}