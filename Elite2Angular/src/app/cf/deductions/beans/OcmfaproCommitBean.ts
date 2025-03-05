import { CaseloadDeductionDetailsCommitBean } from "@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean";
import { CaseloadDeductionProfilesCommitBean } from "@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean";
import { CaseloadDedBeneficiariesCommitBean } from "@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean";

export class OcmfaproCommitBean {
    private _cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
    private _cslddbenCommitModel: CaseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
    private _csldddCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();

    public get csldddCommitModel(): CaseloadDeductionDetailsCommitBean {
        return this._csldddCommitModel;
    }
    public set csldddCommitModel(value: CaseloadDeductionDetailsCommitBean) {
        this._csldddCommitModel = value;
    }


    public get cslddpCommitModel(): CaseloadDeductionProfilesCommitBean {
        return this._cslddpCommitModel;
    }
    public set cslddpCommitModel(value: CaseloadDeductionProfilesCommitBean) {
        this._cslddpCommitModel = value;
    }

    public get cslddbenCommitModel(): CaseloadDedBeneficiariesCommitBean {
        return this._cslddbenCommitModel;
    }
    public set cslddbenCommitModel(value: CaseloadDedBeneficiariesCommitBean) {
        this._cslddbenCommitModel = value;
    }

    toJSON(): any {
        return {
            'csldddCommitModel': this._csldddCommitModel,
            'cslddbenCommitModel': this._cslddbenCommitModel,
            'cslddpCommitModel': this._cslddpCommitModel
        };
    }
}