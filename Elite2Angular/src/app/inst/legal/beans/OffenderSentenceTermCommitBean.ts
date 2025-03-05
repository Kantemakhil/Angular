import { BaseModel } from '@commonbeans/BaseModel';
import { SentenceTerms } from "../beans/SentenceTerms";


export class OffenderSentenceTermCommitBean extends BaseModel {
    
    private _insertList: Array<SentenceTerms>;
    private _updateList: Array<SentenceTerms>;
    private _deleteList: Array<SentenceTerms>;

    get insertList(): Array<SentenceTerms> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceTerms> ) { this._insertList = pinsertList; }

    get updateList(): Array<SentenceTerms> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceTerms> ) { this._updateList = pupdateList; }

    get deleteList(): Array<SentenceTerms> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceTerms> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
        };
    }
}