import { BaseModel } from "@common/beans/BaseModel";
import { OffenderSentences } from '@inst/legal/beans/OffenderSentences';

export class SentencesCommitBean extends BaseModel {
    private _deleteList: Array<OffenderSentences>;
    private _insertList: Array<OffenderSentences>;
    private _updateList: Array<OffenderSentences>;
    private _sealFlag: string;

    get deleteList(): Array<OffenderSentences> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffenderSentences>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffenderSentences>  { return this._insertList; }
    set insertList(pinsertList: Array<OffenderSentences> ) { this._insertList = pinsertList; }
    get updateList(): Array<OffenderSentences>  { return this._updateList; }
    set updateList(pupdateList: Array<OffenderSentences> ) { this._updateList = pupdateList; }
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
