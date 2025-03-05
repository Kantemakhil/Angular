import { BaseModel } from '@commonbeans/BaseModel';
export class OffIntakeReviewQueue extends BaseModel {
    private _bookingNo: string;
    private _createUserId: string;
    private _intakeReason: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _offenderIdDisplay: string;
    private _agyLocIdTo: string;
    private _agyLocIdFrom: string;
    private _intakeDate: Date;
    private _modifyUserId: string;
    private _acceptedFlag: string;
    private _acceptedDate: Date;
    private _createDatetime: Date;
    private _supStatus: string;
    private _supStatusDatetime: Date;
    private _sealFlag: string;
    private _queuedDate: Date;
    private _billableFlag: string;
    private _caseloadId: string;
    private _offenderId: number;

    get offenderId(): number { return this._offenderId; }
    
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get caseloadId(): string { return this._caseloadId; }
    
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get billableFlag(): string { return this._billableFlag; }
    
    set billableFlag(pbillableFlag: string) { this._billableFlag = pbillableFlag; }

    get bookingNo(): string { return this._bookingNo; }

    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get intakeReason(): string { return this._intakeReason; }

    set intakeReason(pintakeReason: string) { this._intakeReason = pintakeReason; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get agyLocIdTo(): string { return this._agyLocIdTo; }

    set agyLocIdTo(pagyLocIdTo: string) { this._agyLocIdTo = pagyLocIdTo; }

    get agyLocIdFrom(): string { return this._agyLocIdFrom; }

    set agyLocIdFrom(pagyLocIdFrom: string) { this._agyLocIdFrom = pagyLocIdFrom; }

    get intakeDate(): Date { return this._intakeDate; }

    set intakeDate(pintakeDate: Date) { this._intakeDate = pintakeDate; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get acceptedFlag(): string { return this._acceptedFlag; }

    set acceptedFlag(pacceptedFlag: string) { this._acceptedFlag = pacceptedFlag; }

    get acceptedDate(): Date { return this._acceptedDate; }

    set acceptedDate(pacceptedDate: Date) { this._acceptedDate = pacceptedDate; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get supStatus(): string { return this._supStatus; }

    set supStatus(psupStatus: string) { this._supStatus = psupStatus; }

    get supStatusDatetime(): Date { return this._supStatusDatetime; }

    set supStatusDatetime(psupStatusDatetime: Date) { this._supStatusDatetime = psupStatusDatetime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get queuedDate(): Date { return this._queuedDate; }

    set queuedDate(pqueuedDate: Date) { this._queuedDate = pqueuedDate; }


    toJSON(): any {
        return {
            'bookingNo': this._bookingNo,
            'createUserId': this._createUserId,
            'intakeReason': this._intakeReason,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'offenderIdDisplay': this._offenderIdDisplay,
            'agyLocIdTo': this._agyLocIdTo,
            'agyLocIdFrom': this._agyLocIdFrom,
            'intakeDate': this._intakeDate,
            'modifyUserId': this._modifyUserId,
            'acceptedFlag': this._acceptedFlag,
            'acceptedDate': this._acceptedDate,
            'createDatetime': this._createDatetime,
            'supStatus': this._supStatus,
            'supStatusDatetime': this._supStatusDatetime,
            'sealFlag': this._sealFlag,
            'queuedDate': this._queuedDate,
            'billableFlag': this._billableFlag,
            'caseloadId': this._caseloadId,
            'offenderId': this._offenderId,
        };
    }
}
