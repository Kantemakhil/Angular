import { BaseModel } from '@commonbeans/BaseModel';

export class SystemProfiles extends BaseModel {

    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _oldTableName: string;
    private _profileValue: string;
    private _profileValue2: string;
    private _sealFlag: string;
    private _profileType: string;
    private _profileCode: string;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get oldTableName(): string { return this._oldTableName; }

    set oldTableName( poldTableName: string ) { this._oldTableName = poldTableName; }

    get profileValue(): string { return this._profileValue; }

    set profileValue( pprofileValue: string ) { this._profileValue = pprofileValue; }

    get profileValue2(): string { return this._profileValue2; }

    set profileValue2( pprofileValue2: string ) { this._profileValue2 = pprofileValue2; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get profileType(): string { return this._profileType; }

    set profileType( pprofileType: string ) { this._profileType = pprofileType; }

    get profileCode(): string { return this._profileCode; }

    set profileCode( pprofileCode: string ) { this._profileCode = pprofileCode; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'oldTableName': this._oldTableName,
            'profileValue': this._profileValue,
            'profileValue2': this._profileValue2,
            'sealFlag': this._sealFlag,
            'profileType': this._profileType,
            'profileCode': this._profileCode
        };
    }
}
