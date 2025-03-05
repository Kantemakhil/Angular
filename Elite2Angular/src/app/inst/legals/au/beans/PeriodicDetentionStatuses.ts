import { BaseModel } from "@common/beans/BaseModel";

export class PeriodicDetentionStatuses extends BaseModel {

    private _peroidDetentionStatus: string;
    private _description: string;
    private _updateAllowedFlag: string;
    private _numberOfAwol: number;
    private _activeFlag: string;
    private _numberOfPenalty: number;
    private _modifyUserId: string;
    private _expiredDate: Date;


    get peroidDetentionStatus(): string { return this._peroidDetentionStatus; }
    set peroidDetentionStatus(pperoidDetentionStatus: string) { this._peroidDetentionStatus = pperoidDetentionStatus; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }

    get numberOfAwol(): number { return this._numberOfAwol; }
    set numberOfAwol(pnumberOfAwol: number) { this._numberOfAwol = pnumberOfAwol; }

    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get numberOfPenalty(): number { return this._numberOfPenalty; }
    set numberOfPenalty(pnumberOfPenalty: number) { this._numberOfPenalty = pnumberOfPenalty; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get expiredDate(): Date { return this._expiredDate; }
    set expiredDate(pexpiredDate: Date) { this._expiredDate = pexpiredDate; }


    toJSON(): any {
        return {
           'expiredDate': this._expiredDate,
           'modifyUserId': this._modifyUserId,
           'numberOfPenalty': this._numberOfPenalty,
           'activeFlag': this._activeFlag,
           'numberOfAwol': this._numberOfAwol,
           'updateAllowedFlag': this._updateAllowedFlag,
           'description': this._description,
           'peroidDetentionStatus': this._peroidDetentionStatus


        };
    }
}
