import { OffenderProceedingsCommitBean } from '@inst/legal-screens/sentenceadministration/beans/OffenderProceedingsCommitBean';
import { VOffenderProceedingSentsCommitBean } from '@inst/legal-screens/sentenceadministration/beans/VOffenderProceedingSentsCommitBean';

export class OcdenforCommitBean {
    private _offprcsCommitBean: OffenderProceedingsCommitBean = new OffenderProceedingsCommitBean();
    private _voffsntCommitBean: VOffenderProceedingSentsCommitBean = new VOffenderProceedingSentsCommitBean();

    public get offprcsCommitBean(): OffenderProceedingsCommitBean {
        return this._offprcsCommitBean;
    }
    public set offprcsCommitBean(value: OffenderProceedingsCommitBean) {
        this._offprcsCommitBean = value;
    }
    public get voffsntCommitBean(): VOffenderProceedingSentsCommitBean {
        return this._voffsntCommitBean;
    }
    public set voffsntCommitBean(value: VOffenderProceedingSentsCommitBean) {
        this._voffsntCommitBean = value;
    }

    toJSON(): any {
        return {
            'offprcsCommitBean': this._offprcsCommitBean,
            'voffsntCommitBean': this._voffsntCommitBean,
        };
    }

}