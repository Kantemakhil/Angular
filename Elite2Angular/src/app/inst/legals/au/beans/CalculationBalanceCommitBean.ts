import { BaseModel } from '@commonbeans/BaseModel';
import { VCbCustodyPeriodCommitBean } from './VCbCustodyPeriodCommitBean';
import { VCbSentTermsCommitBean } from './VCbSentTermsCommitBean';
import { VOffBalCalsCommitBean } from './VOffBalCalsCommitBean';
export class CalculationBalanceCommitBean extends BaseModel {
    private _hearings: VOffBalCalsCommitBean;
    private _sentences: VCbSentTermsCommitBean;
    private _custodyPeriods: VCbCustodyPeriodCommitBean;

    get hearings(): VOffBalCalsCommitBean { return this._hearings; }

    set hearings(phearings: VOffBalCalsCommitBean) { this._hearings = phearings; }

    get sentences(): VCbSentTermsCommitBean { return this._sentences; }

    set sentences(psentences: VCbSentTermsCommitBean) { this._sentences = psentences; }

    get custodyPeriods(): VCbCustodyPeriodCommitBean { return this._custodyPeriods; }

    set custodyPeriods(pcustodyPeriods: VCbCustodyPeriodCommitBean) { this._custodyPeriods = pcustodyPeriods; }

    toJSON(): any {
        return {
            'hearings': this._hearings,
            'sentences': this._sentences,
            'custodyPeriods': this._custodyPeriods
        };
    }
}