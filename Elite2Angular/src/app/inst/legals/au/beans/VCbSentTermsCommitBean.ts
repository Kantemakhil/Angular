import { BaseModel } from "@common/beans/BaseModel";
import { VCbSentTerms } from "./VCbSentTerms";

export  class VCbSentTermsCommitBean extends   BaseModel {

    private _deleteList: Array <VCbSentTerms>;
    private _insertList: Array <VCbSentTerms>;
    private _updateList: Array <VCbSentTerms>;

    get deleteList(): Array<VCbSentTerms> { return this._deleteList; }
    set deleteList(pdeleteList: Array<VCbSentTerms>) { this._deleteList = pdeleteList ; }
    get insertList(): Array<VCbSentTerms> { return this._insertList; }
    set insertList(pinsertList: Array<VCbSentTerms> ) { this._insertList = pinsertList ; }
    get updateList(): Array<VCbSentTerms> { return this._updateList; }
    set updateList(pupdateList: Array<VCbSentTerms> ) { this._updateList = pupdateList ; }

toJSON(): any {
    return {
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    }
}