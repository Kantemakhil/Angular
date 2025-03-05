import { BaseModel } from '@commonbeans/BaseModel';
import { CaseloadFormatPrinters } from './CaseloadFormatPrinters';

export class CaseloadFormatPrintersCommitBean  extends BaseModel {
    private _insertList: Array<CaseloadFormatPrinters>;
    private _deleteList: Array<CaseloadFormatPrinters>;
    private _updateList: Array<CaseloadFormatPrinters>;

    get insertList(): Array<CaseloadFormatPrinters> { return this._insertList; }

    set insertList(pinsertList: Array<CaseloadFormatPrinters>) { this._insertList = pinsertList; }

    get deleteList(): Array<CaseloadFormatPrinters> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CaseloadFormatPrinters>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CaseloadFormatPrinters> { return this._updateList; }

    set updateList(pupdateList: Array<CaseloadFormatPrinters>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}