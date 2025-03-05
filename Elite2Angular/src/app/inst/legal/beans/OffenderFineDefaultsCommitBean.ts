import { BaseModel } from "../../../common/beans/BaseModel";
import { OffenderFineDefaults } from "./OffenderFineDefaults";
import { OffenderSentencesCommitBean } from "./OffenderSentencesCommitBean";

export class OffenderFineDefaultsCommitBean extends BaseModel{
    private _insertList: Array<OffenderFineDefaults>;
    private _updateList: Array<OffenderFineDefaults>;
    private _deleteList: Array<OffenderFineDefaults>;

    private _offenderSentencesCommitBean: OffenderSentencesCommitBean;
    
    get offenderSentencesCommitBean(): OffenderSentencesCommitBean{ return this._offenderSentencesCommitBean; }
    set offenderSentencesCommitBean(poffenderSentencesCommitBean: OffenderSentencesCommitBean){
         this._offenderSentencesCommitBean = poffenderSentencesCommitBean ;
        }
    get insertList(): Array<OffenderFineDefaults> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderFineDefaults> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderFineDefaults> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderFineDefaults> ) { this._updateList = pupdateList; }

    get deleteList(): Array<OffenderFineDefaults> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderFineDefaults> ) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList,
            'offenderSentencesCommitBean':this._offenderSentencesCommitBean
        };
    }

}