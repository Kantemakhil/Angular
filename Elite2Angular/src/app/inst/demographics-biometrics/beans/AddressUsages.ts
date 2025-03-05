import {BaseModel} from '@commonbeans/BaseModel';
import {Addresses} from './Addresses';

export class AddressUsages extends BaseModel {

    private _addressId: number;
    private _addressUsage: string;
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _address: Addresses;
    private _activeFlagTemp: boolean;
    private _addressUsageTemp: string;



    get activeFlagTemp(): boolean { return this._activeFlagTemp; }

    set activeFlagTemp( pactiveFlagTemp: boolean ) { this._activeFlagTemp = pactiveFlagTemp; }

    get addressId(): number { return this._addressId; }

    set addressId(paddressId: number) { this._addressId = paddressId; }

    get addressUsage(): string { return this._addressUsage; }

    set addressUsage(paddressUsage: string) { this._addressUsage = paddressUsage; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get address(): Addresses { return this._address; }

    set address(paddress: Addresses) { this._address = paddress; }
    
    get addressUsageTemp(): string { return this._addressUsageTemp; }

    set addressUsageTemp(paddressUsageTemp: string) { this._addressUsageTemp = paddressUsageTemp; }

    toJSON(): any {
        return {
            'addressId': this._addressId,
            'addressUsage': this._addressUsage,
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'address': this._address,
            'addressUsageTemp': this._addressUsageTemp
        };
    }
}
