
import { BaseModel } from "@common/beans/BaseModel";
import { SentenceTerms } from "./SentenceTerms";

export class SentenceTermsCommitBean extends BaseModel {
    private _insertList: Array<SentenceTerms>;
    private _deleteList: Array<SentenceTerms>;
    private _updateList: Array<SentenceTerms>;

    get insertList(): Array<SentenceTerms> { return this._insertList; }

    set insertList( pinsertList: Array<SentenceTerms> ) { this._insertList = pinsertList; }

    get deleteList(): Array<SentenceTerms> { return this._deleteList; }

    set deleteList( pdeleteList: Array<SentenceTerms> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<SentenceTerms> { return this._updateList; }

    set updateList( pupdateList: Array<SentenceTerms> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}