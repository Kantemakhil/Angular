import { BaseModel } from '@commonbeans/BaseModel';

export class OicHearingResults extends BaseModel {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _resultSeq: number;
    private _createDatetime: Date;
    private _oicHearingId: number;
    private _agencyIncidentId: number;
    private _oicOffenceId: number;
    private _oicResultOffenceId: number;
    private _chargeSeq: number;
    private _pleaFindingCode: string;
    private _findingCode: string;
    private _sealFlag: string;
    private _oicOffenceCode: string;
    private _type: string;
    private _chargeDescription: string;
    private _resultOicOffenceCode: string;
    private _typeResult: string;
    private _chargeDescriptionResult: string;
    private ocuoicawinDisable: boolean;
    private _button: string;
    private _disp: string;
    private _incidentDate: Date;
    private _partySeq: number;
    private _oicIncidentId: number;
    private _code: number;
    private _description: string;
    private _hearingDate: Date;

    get hearingDate(): Date{ return this._hearingDate; }
    
    set hearingDate(phearingDate: Date){ this._hearingDate = phearingDate ;}

    get oicIncidentId(): number { return this._oicIncidentId; }

    set oicIncidentId( poicIncidentId: number ) { this._oicIncidentId = poicIncidentId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get resultSeq(): number { return this._resultSeq; }

    set resultSeq( presultSeq: number ) { this._resultSeq = presultSeq; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get oicHearingId(): number { return this._oicHearingId; }

    set oicHearingId( poicHearingId: number ) { this._oicHearingId = poicHearingId; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId( pagencyIncidentId: number ) { this._agencyIncidentId = pagencyIncidentId; }

    get oicOffenceId(): number { return this._oicOffenceId; }

    set oicOffenceId( poicOffenceId: number ) { this._oicOffenceId = poicOffenceId; }

    get oicResultOffenceId(): number { return this._oicResultOffenceId; }

    set oicResultOffenceId( poicResultOffenceId: number ) { this._oicResultOffenceId = poicResultOffenceId; }

    get chargeSeq(): number { return this._chargeSeq; }

    set chargeSeq( pchargeSeq: number ) { this._chargeSeq = pchargeSeq; }

    get pleaFindingCode(): string { return this._pleaFindingCode; }

    set pleaFindingCode( ppleaFindingCode: string ) { this._pleaFindingCode = ppleaFindingCode; }

    get findingCode(): string { return this._findingCode; }

    set findingCode( pfindingCode: string ) { this._findingCode = pfindingCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get oicOffenceCode(): string { return this._oicOffenceCode; }

    set oicOffenceCode( poicOffenceCode: string ) { this._oicOffenceCode = poicOffenceCode; }

    get type(): string { return this._type; }

    set type( ptype: string ) { this._type = ptype; }

    get chargeDescription(): string { return this._chargeDescription; }

    set chargeDescription( pchargeDescription: string ) { this._chargeDescription = pchargeDescription; }

    get resultOicOffenceCode(): string { return this._resultOicOffenceCode; }

    set resultOicOffenceCode( presultOicOffenceCode: string ) { this._resultOicOffenceCode = presultOicOffenceCode; }

    get typeResult(): string { return this._typeResult; }

    set typeResult( ptypeResult: string ) { this._typeResult = ptypeResult; }

    get chargeDescriptionResult(): string { return this._chargeDescriptionResult; }

    set chargeDescriptionResult( pchargeDescriptionResult: string ) { this._chargeDescriptionResult = pchargeDescriptionResult; }

    get isOcuoicawinDisable(): boolean { return this.ocuoicawinDisable; }

    set isOcuoicawinDisable( pocuoicawinDisable: boolean ) { this.ocuoicawinDisable = pocuoicawinDisable; }

    set button( pbutton: string ) { this._button = pbutton; }

    get button(): string { return this._button; }

    set disp( pdisp: string ) { this._disp = pdisp; }

    get disp(): string { return this._disp; }

    get incidentDate(): Date { return this._incidentDate; }

    set incidentDate( pincidentDate: Date ) { this._incidentDate = pincidentDate; }
    
    get partySeq(): number { return this._partySeq; }

    set partySeq( ppartySeq: number ) { this._partySeq = ppartySeq; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }


    get code(): number { return this._code; }

    set code( pcode: number ) { this._code = pcode; }

    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'resultSeq': this._resultSeq,
            'createDatetime': this._createDatetime,
            'oicHearingId': this._oicHearingId,
            'agencyIncidentId': this._agencyIncidentId,
            'oicResultOffenceId': this._oicResultOffenceId,
            'chargeSeq': this._chargeSeq,
            'pleaFindingCode': this._pleaFindingCode,
            'findingCode': this._findingCode,
            'sealFlag': this._sealFlag,
            'oicOffenceCode': this._oicOffenceCode,
            'type': this._type,
            'chargeDescription': this._chargeDescription,
            'resultOicOffenceCode': this._resultOicOffenceCode,
            'typeResult': this._typeResult,
            'chargeDescriptionResult': this._chargeDescriptionResult,
            'oicOffenceId': this._oicOffenceId,
            'button': this._button,
            'disp': this._disp,
            'incidentDate': this._incidentDate,
            'partySeq': this._partySeq,
            'description': this._description,
            'code': this._code,
            'oicIncidentId': this._oicIncidentId,
            'hearingDate': this._hearingDate,
        };
    }
 }
