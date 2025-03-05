import { OffObsPeriodChecks } from './OffObsPeriodChecks';

export class OffObsPeriodCheckscommitBean {
    private _serialVersionUID: number;
    private _deleteList: Array< OffObsPeriodChecks>;
    private _insertList: Array< OffObsPeriodChecks>;
    private _updateList: Array< OffObsPeriodChecks>;

    get deleteList(): Array<  OffObsPeriodChecks> { return  this._deleteList; }

    set deleteList(pdeleteList: Array<  OffObsPeriodChecks>) { this._deleteList = pdeleteList; }

    get insertList(): Array<  OffObsPeriodChecks> { return  this._insertList; }

    set insertList(pinsertList: Array<  OffObsPeriodChecks>) { this._insertList = pinsertList; }

    get updateList(): Array<  OffObsPeriodChecks> { return  this._updateList; }

    set updateList(pupdateList: Array<  OffObsPeriodChecks>) { this._updateList = pupdateList; }

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
