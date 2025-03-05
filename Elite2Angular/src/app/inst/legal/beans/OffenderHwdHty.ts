import { BaseModel } from '@commonbeans/BaseModel'

export class OffenderHwdHty extends BaseModel {


    private _hwdId: number;

    private _hwdHtyId: number;

    private _eventType: string;

    private _eventComment: string;

    private _createUserId: string;

    private _modifyUserId: string;

    private _sealFlag: string;

    private _eventDatetime: Date;

    private _evenTimeTemp: Date;

    private _createDatetime: Date;

    private _modifyDatetime: Date;
    private _eventTime: number;



    get hwdId(): number { return this._hwdId; }
    set hwdId(phwdId: number) { this._hwdId = phwdId; }

    get hwdHtyId(): number { return this._hwdHtyId; }
    set hwdHtyId(phwdHtyId: number) { this._hwdHtyId = phwdHtyId; }


    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(sealFlag: string) { this._sealFlag = sealFlag; }

    get eventComment(): string { return this._eventComment; }
    set eventComment(eventComment: string) { this._eventComment = eventComment; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(createUserId: string) { this._createUserId = createUserId; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

    get eventType(): string { return this._eventType; }
    set eventType(eventType: string) { this._eventType = eventType; }


    get eventDatetime(): Date { return this._eventDatetime; }
    set eventDatetime(peventDatetime: Date) { this._eventDatetime = peventDatetime; }

    get evenTimeTemp(): Date { return this._evenTimeTemp; }
    set evenTimeTemp(pevenTimeTemp: Date) { this._evenTimeTemp = pevenTimeTemp; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyDateTime(): Date { return this._modifyDatetime; }
    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDatetime = pmodifyDateTime; }

    get eventTime(): number { return this._eventTime; }
    set eventTime(peventTime: number) { this._eventTime = peventTime; }



    toJSON(): any {
        return {

            'hwdId': this._hwdId,
            'hwdHtyId': this._hwdHtyId,
            'sealFlag': this._sealFlag,
            'eventComment': this._eventComment,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'eventType': this._eventType,
            'eventDatetime': this._eventDatetime,
            'evenTimeTemp': this._evenTimeTemp,
            'createDatetime': this._createDatetime,
            'modifyDatetime': this._modifyDatetime,
            'eventTime': this._eventTime,
        };
    }
}
