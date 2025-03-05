export class OrdersHty {

    private _orderHtyId: number;
    private _orderId: number;
    private _orderType: string;
    private _issuingAgyLocId: string;
    private _requestingOfficer: string;
    private _requestDate: Date;
    private _dueDate: Date;
    private _teamId: string;
    private _staffMemberId: string;
    private _orderStatus: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _defenceSolicitor: any;


    public get orderHtyId(): number {
        return this._orderHtyId;
    }
    public set orderHtyId(value: number) {
        this._orderHtyId = value;
    }

    public get orderId(): number {
        return this._orderId;
    }
    public set orderId(value: number) {
        this._orderId = value;
    }

    public get orderType(): string {
        return this._orderType;
    }
    public set orderType(value: string) {
        this._orderType = value;
    }

    public get issuingAgyLocId(): string {
        return this._issuingAgyLocId;
    }
    public set issuingAgyLocId(value: string) {
        this._issuingAgyLocId = value;
    }

    public get requestingOfficer(): string {
        return this._requestingOfficer;
    }
    public set requestingOfficer(value: string) {
        this._requestingOfficer = value;
    }

    public get requestDate(): Date {
        return this._requestDate;
    }
    public set requestDate(value: Date) {
        this._requestDate = value;
    }

    public get dueDate(): Date {
        return this._dueDate;
    }
    public set dueDate(value: Date) {
        this._dueDate = value;
    }

    public get teamId(): string {
        return this._teamId;
    }
    public set teamId(value: string) {
        this._teamId = value;
    }

    public get staffMemberId(): string {
        return this._staffMemberId;
    }
    public set staffMemberId(value: string) {
        this._staffMemberId = value;
    }

    public get orderStatus(): string {
        return this._orderStatus;
    }
    public set orderStatus(value: string) {
        this._orderStatus = value;
    }

    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }

    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }

    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }

    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }

    public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }
    get defenceSolicitor(): any { return this._defenceSolicitor; }
    set defenceSolicitor(value: any) { this._defenceSolicitor = value; }


    toJSON(): any {
        return {
            'orderHtyId': this._orderHtyId,
            'orderId': this._orderId,
            'orderType': this._orderType,
            'issuingAgyLocId': this._issuingAgyLocId,
            'requestingOfficer': this._requestingOfficer,
            'requestDate': this._requestDate,
            'dueDate': this._dueDate,
            'teamId': this._teamId,
            'staffMemberId': this._staffMemberId,
            'orderStatus': this._orderStatus,
            'modifyDatetime': this._modifyDatetime,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'defenceSolicitor': this._defenceSolicitor
        };
    }

}