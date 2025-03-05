import { CaseloadDeductionDetailsCommitBean } from "@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean";
import { CaseloadDedBeneficiariesCommitBean } from "@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean";
import { FeeAccountProfiles } from "./FeeAccountProfiles";
import { FeeAccountProfilesCommitBean } from "./FeeAccountProfilesCommitBean";

export class OcmofaccCommitBean {
    private _offdedCommitBean: FeeAccountProfilesCommitBean = new FeeAccountProfilesCommitBean();
    private _cslddbenCommitBean: CaseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
    private _csldddCommitBean: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
    private _longSupvModelUpdate: FeeAccountProfiles =new FeeAccountProfiles();

    public get csldddCommitBean(): CaseloadDeductionDetailsCommitBean {
        return this._csldddCommitBean;
    }
    public set csldddCommitBean(value: CaseloadDeductionDetailsCommitBean) {
        this._csldddCommitBean = value;
    }


    public get offdedCommitBean(): FeeAccountProfilesCommitBean {
        return this._offdedCommitBean;
    }
    public set offdedCommitBean(value: FeeAccountProfilesCommitBean) {
        this._offdedCommitBean = value;
    }

    public get cslddbenCommitBean(): CaseloadDedBeneficiariesCommitBean {
        return this._cslddbenCommitBean;
    }
    public set cslddbenCommitBean(value: CaseloadDedBeneficiariesCommitBean) {
        this._cslddbenCommitBean = value;
    }


    public get longSupvModelUpdate(): FeeAccountProfiles {
        return this._longSupvModelUpdate;
    }
    public set longSupvModelUpdate(value: FeeAccountProfiles) {
        this._longSupvModelUpdate = value;
    }

    toJSON(): any {
        return {
            'csldddCommitBean': this._csldddCommitBean,
            'cslddbenCommitBean': this._cslddbenCommitBean,
            'offdedCommitBean': this._offdedCommitBean,
            'longSupvModelUpdate': this._longSupvModelUpdate
        };
    }

}