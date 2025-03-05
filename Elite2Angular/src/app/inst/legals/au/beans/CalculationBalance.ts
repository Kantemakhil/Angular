import { BaseModel } from '@commonbeans/BaseModel';
import { VCbCustodyPeriod } from './VCbCustodyPeriod';
import { VCbSentTerms } from './VCbSentTerms';
import { VOffBalCals } from './VOffBalCals';
export class CalculationBalance extends BaseModel {
    private _offBalSentDtl: Array<VCbSentTerms>;
    private _vCbCustodyPeriod: Array<VCbCustodyPeriod>;
    private _vOffBalCals: VOffBalCals;

    get offBalSentDtl(): Array<VCbSentTerms> { return this._offBalSentDtl; }

    set offBalSentDtl(poffBalSentDtl: Array<VCbSentTerms>) { this._offBalSentDtl = poffBalSentDtl; }

    get vCbCustodyPeriod(): Array<VCbCustodyPeriod> { return this._vCbCustodyPeriod; }

    set vCbCustodyPeriod(pvCbCustodyPeriod: Array<VCbCustodyPeriod>) { this._vCbCustodyPeriod = pvCbCustodyPeriod; }

    get vOffBalCals(): VOffBalCals { return this._vOffBalCals; }

    set vOffBalCals(pvOffBalCals: VOffBalCals) { this._vOffBalCals = pvOffBalCals; }
    toJSON(): any {
        return {
            'offBalSentDtl': this._offBalSentDtl,
            'vCbCustodyPeriod': this._vCbCustodyPeriod,
            'vOffBalCals': this._vOffBalCals
        };
    }
}