export class HealthRecordDetails {

    private _offHealthRecDtlId: number;

    private _offHealthRecId: number;

    private _healthTreatType: String;

    private _healthProvider: string;

    private _description: string;

    private _fromDate: Date;

    private _commentText: string;

    private _createDatetime: Date;

    private _createUserId: string;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _sealFlag: string;
    private _returnedOutput: number;

    private _toDate: Date;

    public get offHealthRecDtlId(): number {
        return this._offHealthRecDtlId;
    }
    public set offHealthRecDtlId(value: number) {
        this._offHealthRecDtlId = value;
    }


    public get returnedOutput(): number {
        return this._returnedOutput;
    }
    public set returnedOutput(value: number) {
        this._returnedOutput = value;
    }


    public get offHealthRecId(): number {
        return this._offHealthRecId;
    }
    public set offHealthRecId(value: number) {
        this._offHealthRecId = value;
    }

    public get healthTreatType(): String {
        return this._healthTreatType;
    }
    public set healthTreatType(value: String) {
        this._healthTreatType = value;
    }

    public get healthProvider(): string {
        return this._healthProvider;
    }
    public set healthProvider(value: string) {
        this._healthProvider = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get fromDate(): Date {
        return this._fromDate;
    }
    public set fromDate(value: Date) {
        this._fromDate = value;
    }

    public get commentText(): string {
        return this._commentText;
    }
    public set commentText(value: string) {
        this._commentText = value;
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

    public get toDate(): Date {
        return this._toDate;
    }
    public set toDate(value: Date) {
        this._toDate = value;
    }

    toJSON(): any {
        return {
            'offHealthRecDtlId': this._offHealthRecDtlId,
            'offHealthRecId': this._offHealthRecId,
            'healthTreatType': this.healthTreatType,
            'healthProvider': this._healthProvider,
            'fromDate': this._fromDate,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'toDate': this._toDate,
        };
    }






}