import { OffObsPrdCharacteristics } from './OffObsPrdCharacteristics';

export class OffObsPrdCharacteristicscommitBean {
    private _serialVersionUID: number;
    private _deleteList: Array< OffObsPrdCharacteristics>;
    private _insertList: Array< OffObsPrdCharacteristics>;
    private _updateList: Array< OffObsPrdCharacteristics>;

    get deleteList(): Array<  OffObsPrdCharacteristics> { return  this._deleteList; }

    set deleteList(pdeleteList: Array<  OffObsPrdCharacteristics>) { this._deleteList = pdeleteList; }

    get insertList(): Array<  OffObsPrdCharacteristics> { return  this._insertList; }

    set insertList(pinsertList: Array<  OffObsPrdCharacteristics>) { this._insertList = pinsertList; }

    get updateList(): Array<  OffObsPrdCharacteristics> { return  this._updateList; }

    set updateList(pupdateList: Array<  OffObsPrdCharacteristics>) { this._updateList = pupdateList; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    toJSON(): any  {
        return {
          'deleteList': this._deleteList,
          'insertList': this._insertList,
          'updateList': this._updateList,
          'serialVersionUID': this._serialVersionUID,
        };
    }
}
