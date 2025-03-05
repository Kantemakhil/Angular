import { OffenderSentencesHty } from "./OffenderSentencesHty";

export class OffenderSentencesHtyCommitBean {
    private _insertList: Array<OffenderSentencesHty>;
    private _deleteList: Array<OffenderSentencesHty>;
    private _updateList: Array<OffenderSentencesHty>;

    get insertList(): Array<OffenderSentencesHty> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSentencesHty> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSentencesHty> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderSentencesHty> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSentencesHty> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSentencesHty> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}