import { BaseModel } from '@commonbeans/BaseModel'
export class PriorHistory extends BaseModel {
    private _priorHistoryDate: Date;
    private _type: string;
    private _offenseDescription: string;
    private _status: string;
    private _source: string;
    private _country: string;
    private _state: string;
    private _verified: string;
    private _comment: string;
    private _offenderBookId: number;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _createUserId: string;
    private _createDateTime: Date;
    private _offenseSeq: number;

    get priorHistoryDate(): Date { return this._priorHistoryDate; }

    set priorHistoryDate( priorHistoryDate: Date ) { this._priorHistoryDate = priorHistoryDate; }

    get type(): string { return this._type; }

    set type( type: string ) { this._type = type; }

    get offenseDescription(): string { return this._offenseDescription; }

    set offenseDescription( offenseDescription: string ) { this._offenseDescription = offenseDescription; }

    get status(): string { return this._status; }

    set status( status: string ) { this._status = status; }

    get source(): string { return this._source; }

    set source( source: string ) { this._source = source; }

    get country(): string { return this._country; }

    set country( country: string ) { this._country = country; }

    get state(): string { return this._state; }

    set state( state: string ) { this._state = state; }

    get verified(): string { return this._verified; }

    set verified( verified: string ) { this._verified = verified; }

    get comment(): string { return this._comment; }

    set comment( comment: string ) { this._comment = comment; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }
    get modifyDateTime(): Date { return this._modifyDateTime; }

    set modifyDateTime( modifyDateTime: Date ) { this._modifyDateTime = modifyDateTime; }

    get createDateTime(): Date { return this._createDateTime; }

    set createDateTime( createDateTime: Date ) { this._createDateTime = createDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( modifyUserId: string ) { this._modifyUserId = modifyUserId; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( createUserId: string ) { this._createUserId = createUserId; }
    get offenseSeq(): number { return this._offenseSeq; }

    set offenseSeq( offenseSeq: number ) { this._offenseSeq = offenseSeq; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'priorHistoryDate': this._priorHistoryDate,
            'type': this._type,
            'offenseDescription': this._offenseDescription,
            'status': this._status,
            'source': this._source,
            'country': this._country,
            'state': this._state,
            'verified': this._verified,
            'comment': this._comment,
            'createUserId': this._createUserId,
            'createDateTime': this._createDateTime,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'offenseSeq': this._offenseSeq



        }
    }}