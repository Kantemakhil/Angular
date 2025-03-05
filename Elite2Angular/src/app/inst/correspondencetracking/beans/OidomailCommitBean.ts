import { OffenderMailLogCommitBean } from "./OffenderMailLogCommitBean";
import { OffenderMailRestrictionsCommitBean } from "./OffenderMailRestrictionsCommitBean";

export class OidomailCommitBean {
    private _offenderMailLogCommitBean: OffenderMailLogCommitBean = new OffenderMailLogCommitBean();
    private _offenderMailRestrictionCommitBean: OffenderMailRestrictionsCommitBean = new OffenderMailRestrictionsCommitBean();
    
    get offenderMailLogCommitBean(): OffenderMailLogCommitBean {  return this._offenderMailLogCommitBean; }
    set offenderMailLogCommitBean(value: OffenderMailLogCommitBean) { this._offenderMailLogCommitBean = value; }
    
    get offenderMailRestrictionCommitBean(): OffenderMailRestrictionsCommitBean {  return this._offenderMailRestrictionCommitBean; }
    set offenderMailRestrictionCommitBean(value: OffenderMailRestrictionsCommitBean) { this._offenderMailRestrictionCommitBean = value; }

    toJSON(): any {
        return {
            'offenderMailLogCommitBean': this._offenderMailLogCommitBean,
            'offenderMailRestrictionCommitBean': this._offenderMailRestrictionCommitBean,
        };
    }
}