

export class OffenderMilitaryDiscActions {
    private _serialVersionUID: number;
    private _createUserId: string;
    private _militarySeq: number;
    private _modifyDateTime: Date;
    private _offenderBookId: number;
    private _mltyDiscpCode: string;
    private _modifyUserId: string;
    private _mltyDiscpSeq: number;
    private _sealFlag: string;
    private _createDateTime: Date;

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
    get mltyDiscpCode(): string { return this._mltyDiscpCode; }
    set mltyDiscpCode( pmltyDiscpCode: string ) { this._mltyDiscpCode = pmltyDiscpCode; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }
    get mltyDiscpSeq(): number { return this._mltyDiscpSeq; }
    set mltyDiscpSeq( pmltyDiscpSeq: number ) { this._mltyDiscpSeq = pmltyDiscpSeq; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }

    toJSON(): any {
        return {
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'militarySeq': this._militarySeq,
            'modifyDateTime': this._modifyDateTime,
            'offenderBookId': this._offenderBookId,
            'mltyDiscpCode': this._mltyDiscpCode,
            'modifyUserId': this._modifyUserId,
            'mltyDiscpSeq': this._mltyDiscpSeq,
            'sealFlag': this._sealFlag,
            'createDateTime': this._createDateTime,
        };
    }
 }