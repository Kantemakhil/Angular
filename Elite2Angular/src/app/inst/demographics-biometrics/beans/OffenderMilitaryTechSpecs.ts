

export class OffenderMilitaryTechSpecs {
    private _mltyTechSeq: number;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _militarySeq: number;
    private _modifyDateTime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _techSpecCode: string;
    private _sealFlag: string;
    private _createDateTime: Date;

    get mltyTechSeq(): number { return this._mltyTechSeq; }
    set mltyTechSeq( pmltyTechSeq: number ) { this._mltyTechSeq = pmltyTechSeq; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }
    get militarySeq(): number { return this._militarySeq; }
    set militarySeq( pmilitarySeq: number ) { this._militarySeq = pmilitarySeq; }
    get modifyDateTime(): Date { return this._modifyDateTime; }
    set modifyDateTime( pmodifyDateTime: Date ) { this._modifyDateTime = pmodifyDateTime; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get techSpecCode(): string { return this._techSpecCode; }
    set techSpecCode( ptechSpecCode: string ) { this._techSpecCode = ptechSpecCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    toJSON(): any {
        return {
            'mltyTechSeq': this._mltyTechSeq,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'militarySeq': this._militarySeq,
            'modifyDateTime': this._modifyDateTime,
            'offenderBookId': this._offenderBookId,
            'modifyUserId': this._modifyUserId,
            'techSpecCode': this._techSpecCode,
            'sealFlag': this._sealFlag,
            'createDateTime': this._createDateTime,
        };
    }
 }