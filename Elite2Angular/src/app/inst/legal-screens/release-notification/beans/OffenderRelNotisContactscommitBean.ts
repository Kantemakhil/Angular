import { BaseModel } from '@common/beans/BaseModel';
import { OffenderRelNotisContacts } from './OffenderRelNotisContacts';

export class OffenderRelNotisContactscommitBean extends BaseModel {
    private _deleteList: Array<OffenderRelNotisContacts>;
    private _insertList: Array<OffenderRelNotisContacts>;
    private _updateList: Array<OffenderRelNotisContacts>;
    private _serialVersionUID: number;

    get deleteList(): Array<OffenderRelNotisContacts> { return  this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderRelNotisContacts>) { this._deleteList = pdeleteList; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get insertList(): Array<OffenderRelNotisContacts> { return  this._insertList; }

    set insertList(pinsertList: Array<OffenderRelNotisContacts>) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderRelNotisContacts> { return  this._updateList; }

    set updateList(pupdateList: Array<OffenderRelNotisContacts>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
}
