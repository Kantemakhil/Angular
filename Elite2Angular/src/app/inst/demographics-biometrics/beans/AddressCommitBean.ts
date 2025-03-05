import { BaseModel } from '@commonbeans/BaseModel';
import { Addresses } from './Addresses';

export class AddressCommitBean extends BaseModel {

    private _insertList: Array<Addresses>;
    private _deleteList: Array<Addresses>;
    private _updateList: Array<Addresses>;
    private _offenderId: number;
    private _primaryFlagTemp: string;
    private _mailFlagTemp: string;
    get mailFlagTemp(): string { return this._mailFlagTemp; }

set mailFlagTemp( pmailFlagTemp: string ) { this._mailFlagTemp = pmailFlagTemp; }

    get insertList(): Array<Addresses> { return this._insertList; }

    set insertList( pinsertList: Array<Addresses> ) { this._insertList = pinsertList; }

    get deleteList(): Array<Addresses> { return this._deleteList; }

    set deleteList( pdeleteList: Array<Addresses> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<Addresses> { return this._updateList; }

    set updateList( pupdateList: Array<Addresses> ) { this._updateList = pupdateList; }

    get offenderId(): number { return this._offenderId; }

    set offenderId( poffenderId: number ) { this._offenderId = poffenderId; }

    get primaryFlagTemp(): string { return this._primaryFlagTemp; }

    set primaryFlagTemp( pprimaryFlagTemp: string ) { this._primaryFlagTemp = pprimaryFlagTemp; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offenderId': this._offenderId,
            'primaryFlagTemp': this._primaryFlagTemp,
            'mailFlagTemp': this._mailFlagTemp,
        };
    }
}
