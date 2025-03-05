import { BaseModel } from '@commonbeans/BaseModel';

export class AgyLocEstablishments extends BaseModel {

    private _agyLocId: string;
    private _establishmentType: string;
    private _createDateTime: Date;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get establishmentType(): string { return this._establishmentType; }

    set establishmentType( pestablishmentType: string ) { this._establishmentType = pestablishmentType; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'agyLocId': this._agyLocId,
            'establishmentType': this._establishmentType,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag
        };
    }
}