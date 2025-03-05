import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderSampleSubstances extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _resultCode: string;
    private _modifyUserId: string;
    private _offenderSampleId: number;
    private _substanceCode: string;
    private _sealFlag: string;
    private _offenderSampleSubstanceId: number;
    private _dispositionCode: string;
    private _commentText: string;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get resultCode(): string { return this._resultCode; }

    set resultCode( presultCode: string ) { this._resultCode = presultCode; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get offenderSampleId(): number { return this._offenderSampleId; }

    set offenderSampleId( poffenderSampleId: number ) { this._offenderSampleId = poffenderSampleId; }

    get substanceCode(): string { return this._substanceCode; }

    set substanceCode( psubstanceCode: string ) { this._substanceCode = psubstanceCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get offenderSampleSubstanceId(): number { return this._offenderSampleSubstanceId; }

    set offenderSampleSubstanceId( poffenderSampleSubstanceId: number ) { this._offenderSampleSubstanceId = poffenderSampleSubstanceId; }

    get dispositionCode(): string { return this._dispositionCode; }

    set dispositionCode( pdispositionCode: string ) { this._dispositionCode = pdispositionCode; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }


    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'resultCode': this._resultCode,
            'modifyUserId': this._modifyUserId,
            'offenderSampleId': this._offenderSampleId,
            'substanceCode': this._substanceCode,
            'sealFlag': this._sealFlag,
            'offenderSampleSubstanceId': this._offenderSampleSubstanceId,
            'dispositionCode': this._dispositionCode,
            'commentText': this._commentText,
        };
    }
 }