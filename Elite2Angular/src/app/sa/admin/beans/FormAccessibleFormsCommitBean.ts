import {BaseModel} from '@commonbeans/BaseModel';
import { FormAccessibleForms } from '@instSecurityThreatGroupsbeans/FormAccessibleForms';

export class FormAccessibleFormsCommitBean extends BaseModel {

    private _insertList: Array<FormAccessibleForms>;
    private _deleteList: Array<FormAccessibleForms>;
    private _updateList: Array<FormAccessibleForms>;

    get insertList(): Array<FormAccessibleForms> { return this._insertList; }

    set insertList(pinsertList: Array<FormAccessibleForms>) { this._insertList = pinsertList; }

    get deleteList(): Array<FormAccessibleForms> { return this._deleteList; }

    set deleteList(pdeleteList: Array<FormAccessibleForms>) { this._deleteList = pdeleteList; }

    get updateList(): Array<FormAccessibleForms> { return this._updateList; }

    set updateList(pupdateList: Array<FormAccessibleForms>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}