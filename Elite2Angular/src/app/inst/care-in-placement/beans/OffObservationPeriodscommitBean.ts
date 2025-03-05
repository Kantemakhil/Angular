import { OffObservationPeriods } from './OffObservationPeriods';

export class OffObservationPeriodscommitBean {
    private _serialVersionUID: number;
    private _deleteList: Array<OffObservationPeriods>;
    private _insertList: Array<OffObservationPeriods>;
    private _updateList: Array<OffObservationPeriods>;

    get deleteList(): Array< OffObservationPeriods> { return  this._deleteList; }

    set deleteList(pdeleteList: Array< OffObservationPeriods>) { this._deleteList = pdeleteList; }

    get insertList(): Array< OffObservationPeriods> { return  this._insertList; }

    set insertList(pinsertList: Array< OffObservationPeriods>) { this._insertList = pinsertList; }

    get updateList(): Array< OffObservationPeriods> { return  this._updateList; }

    set updateList(pupdateList: Array< OffObservationPeriods>) { this._updateList = pupdateList; }

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
