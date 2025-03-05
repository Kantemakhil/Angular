import { BaseModel } from '@common/beans/BaseModel';
import { OffenderReleaseNotis } from './OffenderReleaseNotis';
import { OffenderRelNotisContacts } from './OffenderRelNotisContacts';

export class OffenderReleaseNotiscommitBean extends BaseModel {
    private _deleteList: Array<OffenderReleaseNotis>;
    private _insertList: Array<OffenderReleaseNotis>;
    private _updateList: Array<OffenderReleaseNotis>;
    private _insertRncList: Array<OffenderRelNotisContacts>;
    private _updateRncList: Array<OffenderRelNotisContacts>;
    private _deleteRncList: Array<OffenderRelNotisContacts>;
    private _serialVersionUID: number;

    get insertRncList(): Array<OffenderRelNotisContacts> { return  this._insertRncList; }

    set insertRncList(pinsertRncList: Array<OffenderRelNotisContacts>) { this._insertRncList = pinsertRncList; }

    get updateRncList(): Array<OffenderRelNotisContacts> { return  this._updateRncList; }

    set updateRncList(pupdateRncList: Array<OffenderRelNotisContacts>) { this._updateRncList = pupdateRncList; }

    get deleteRncList(): Array<OffenderRelNotisContacts> { return  this._deleteRncList; }

    set deleteRncList(pdeleteRncList: Array<OffenderRelNotisContacts>) { this._deleteRncList = pdeleteRncList; }

    get deleteList(): Array<OffenderReleaseNotis> { return  this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderReleaseNotis>) { this._deleteList = pdeleteList; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get insertList(): Array<OffenderReleaseNotis> { return  this._insertList; }

    set insertList(pinsertList: Array<OffenderReleaseNotis>) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderReleaseNotis> { return  this._updateList; }

    set updateList(pupdateList: Array<OffenderReleaseNotis>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
         'insertRncList': this._insertRncList,
         'updateRncList': this._updateRncList,
         'deleteRncList': this._deleteRncList,
         };
       }
}
