import {BaseModel} from '@commonbeans/BaseModel';
export class OicHearingNotices extends BaseModel {
    private _createDatetime: Date;
    private _createUserId: string;
    private _deliveryStaffId: number;
    private _deliveryTime: Date;
    private _deliveryTimeTemp: string;
    private _modifyDatetime: Date;
    private _oicHearingId: number;
    private _oicNoticeSeq: number;
    private _modifyUserId: string;
    private _deliveryDate: Date;
    private _sealFlag: string;
    private _commentText: string;
    private _deliveryStaffIdDes: string;

    get createDatetime(): Date { return  this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return  this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get deliveryStaffId(): number { return  this._deliveryStaffId; }

    set deliveryStaffId(pdeliveryStaffId: number) { this._deliveryStaffId = pdeliveryStaffId; }

    get deliveryTime(): Date { return  this._deliveryTime; }

    set deliveryTime(pdeliveryTime: Date) { this._deliveryTime = pdeliveryTime; }

    get deliveryTimeTemp(): string { return  this._deliveryTimeTemp; }

    set deliveryTimeTemp(deliveryTimeTemp: string) { this._deliveryTimeTemp = deliveryTimeTemp; }

    get modifyDatetime(): Date { return  this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get oicHearingId(): number { return  this._oicHearingId; }

    set oicHearingId(poicHearingId: number) { this._oicHearingId = poicHearingId; }

    get oicNoticeSeq(): number { return  this._oicNoticeSeq; }

    set oicNoticeSeq(poicNoticeSeq: number) { this._oicNoticeSeq = poicNoticeSeq; }

    get modifyUserId(): string { return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get deliveryDate(): Date { return  this._deliveryDate; }

    set deliveryDate(pdeliveryDate: Date) { this._deliveryDate = pdeliveryDate; }

    get sealFlag(): string { return  this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get commentText(): string { return  this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get deliveryStaffIdDes(): string { return  this._deliveryStaffIdDes; }

    set deliveryStaffIdDes(pdeliveryStaffIdDes: string) { this._deliveryStaffIdDes = pdeliveryStaffIdDes; }


toJSON(): any {
        return {
                'createDatetime': this._createDatetime,
                'createUserId': this._createUserId,
                'deliveryStaffId': this._deliveryStaffId,
                'deliveryTime': this._deliveryTime,
                'modifyDatetime': this._modifyDatetime,
                'oicHearingId': this._oicHearingId,
                'oicNoticeSeq': this._oicNoticeSeq,
                'modifyUserId': this._modifyUserId,
                'deliveryDate': this._deliveryDate,
                'sealFlag': this._sealFlag,
                'commentText': this._commentText,
            'deliveryStaffIdDes': this._deliveryStaffIdDes
                          };
       }
 }
