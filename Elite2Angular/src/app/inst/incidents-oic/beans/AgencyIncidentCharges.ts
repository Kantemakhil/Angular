import {BaseModel} from '@commonbeans/BaseModel';

export class AgencyIncidentCharges extends BaseModel {

    private _agencyIncidentId: number;
    private _chargeSeq: number;
    private _partySeq: number;
    private _oicChargeId: string;
    private _findingCode: string;
    private _guiltyEvidenceText: string;
    private _reportText: string;
    private _evidenceDisposeText: string;
    private _createDateTime: Date;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _lidsChargeNumber: number;
    private _chargedOicOffenceId: number;
    private _resultOicOffenceId: number;
    private _sealFlag: string;
    private _chargedOicOffenceCode: string;
    private _offenceType: string;
    private _offenceDesc: string;
    private _dspCategory: string;
    private _button: string;
    private _incidentDate: Date;
    private _oicOffenceType: string;

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get chargeSeq(): number { return this._chargeSeq; }

    set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }

    get partySeq(): number { return this._partySeq; }

    set partySeq(ppartySeq: number) { this._partySeq = ppartySeq; }

    get oicChargeId(): string { return this._oicChargeId; }

    set oicChargeId(poicChargeId: string) { this._oicChargeId = poicChargeId; }

    get findingCode(): string { return this._findingCode; }

    set findingCode(pfindingCode: string) { this._findingCode = pfindingCode; }

    get guiltyEvidenceText(): string { return this._guiltyEvidenceText; }

    set guiltyEvidenceText(pguiltyEvidenceText: string) { this._guiltyEvidenceText = pguiltyEvidenceText; }

    get reportText(): string { return this._reportText; }

    set reportText(preportText: string) { this._reportText = preportText; }

    get evidenceDisposeText(): string { return this._evidenceDisposeText; }

    set evidenceDisposeText(pevidenceDisposeText: string) { this._evidenceDisposeText = pevidenceDisposeText; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime(pcreateDatetime: Date) { this._createDateTime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get lidsChargeNumber(): number { return this._lidsChargeNumber; }

    set lidsChargeNumber(plidsChargeNumber: number) { this._lidsChargeNumber = plidsChargeNumber; }

    get chargedOicOffenceId(): number { return this._chargedOicOffenceId; }

    set chargedOicOffenceId(pchargedOicOffenceId: number) { this._chargedOicOffenceId = pchargedOicOffenceId; }

    get resultOicOffenceId(): number { return this._resultOicOffenceId; }

    set resultOicOffenceId(presultOicOffenceId: number) { this._resultOicOffenceId = presultOicOffenceId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get chargedOicOffenceCode(): string { return this._chargedOicOffenceCode; }

    set chargedOicOffenceCode(pchargedOicOffenceCode: string) { this._chargedOicOffenceCode = pchargedOicOffenceCode; }

    get offenceType(): string { return this._offenceType; }

    set offenceType(poffenceType: string) { this._offenceType = poffenceType; }

    get offenceDesc(): string { return this._offenceDesc; }

    set offenceDesc(poffenceDesc: string) { this._offenceDesc = poffenceDesc; }

    get dspCategory(): string { return this._dspCategory; }

    set dspCategory(pdspCategory: string) { this._dspCategory = pdspCategory; }

    get button(): string { return this._button; }

    set button( pbutton: string ) { this._button = pbutton; }

    get incidentDate(): Date { return this._incidentDate; }

    set incidentDate( pincidentDate: Date ) { this._incidentDate = pincidentDate; }


    toJSON(): any {
     return {
            'agencyIncidentId': this._agencyIncidentId,
            'chargeSeq': this._chargeSeq,
            'partySeq': this._partySeq,
            'oicChargeId': this._oicChargeId,
            'guiltyEvidenceText': this._guiltyEvidenceText,
            'reportText': this._reportText,
            'evidenceDisposeText': this._evidenceDisposeText,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'lidsChargeNumber': this._lidsChargeNumber,
            'chargedOicOffenceId': this._chargedOicOffenceId,
            'resultOicOffenceId': this._resultOicOffenceId,
            'sealFlag': this._sealFlag,
            'chargedOicOffenceCode': this._chargedOicOffenceCode,
            'offenceType': this._offenceType,
            'offenceDesc': this._offenceDesc,
            'dspCategory': this._dspCategory,
            'button': this._button,
            'incidentDate': this.incidentDate,
            'findingCode': this._findingCode,
            };
    }
}

