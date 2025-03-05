import { BaseModel } from "@common/beans/BaseModel";
import { SentenceTerms } from '@inst/legal/beans/SentenceTerms';

export class TermsCommitBean extends BaseModel {
    private _deleteList: Array<SentenceTerms>;
    private _insertList: Array<SentenceTerms>;
    private _updateList: Array<SentenceTerms>;
    private _sealFlag: string;

    get deleteList(): Array<SentenceTerms> { return this._deleteList; }
    set deleteList(pdeleteList: Array<SentenceTerms>) { this._deleteList = pdeleteList; }
    get insertList(): Array<SentenceTerms>  { return this._insertList; }
    set insertList(pinsertList: Array<SentenceTerms> ) { this._insertList = pinsertList; }
    get updateList(): Array<SentenceTerms>  { return this._updateList; }
    set updateList(pupdateList: Array<SentenceTerms> ) { this._updateList = pupdateList; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'sealFlag': this._sealFlag,
        };
    }
}
