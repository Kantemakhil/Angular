export class OffHealthRecordsData {

    private _offHealthRecId: number;
    
    private _offenderBookId: number;

    private _healthType: string;

    private _healthSubType: string;

    private _description: string;

    private _fromDate: Date;

    private _toDate: Date;

    private _healthStatus: string;

    private _createDatetime: Date;

    private _createUserId: string;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _sealFlag: string;
    private _returnedOutput: number;

    private _recordCreateDatetime: Date;

    public get offHealthRecId(): number {
        return this._offHealthRecId;
    }
    public set offHealthRecId(value: number) {
        this._offHealthRecId = value;
    }
    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }
    public get healthType(): string {
        return this._healthType;
    }
    public set healthType(value: string) {
        this._healthType = value;
    } public get healthSubType(): string {
        return this._healthSubType;
    }
    public set healthSubType(value: string) {
        this._healthSubType = value;
    } public get description(): string {
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
    } public get toDate(): Date {
        return this._toDate;
    }
    public set toDate(value: Date) {
        this._toDate = value;
    } public get healthStatus(): string {
        return this._healthStatus;
    }
    public set healthStatus(value: string) {
        this._healthStatus = value;
    }
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    } public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    } public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    } public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    } public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }

    public get returnedOutput(): number {
        return this._returnedOutput;
    }
    public set returnedOutput(value: number) {
        this._returnedOutput = value;
    }

    public get recordCreateDatetime(): Date {
        return this._recordCreateDatetime;
    }
    public set recordCreateDatetime(value: Date) {
        this._recordCreateDatetime = value;
    } 

    toJSON(): any {
        return {
            'offHealthRecId':this.offHealthRecId,
            'offenderBookId': this._offenderBookId,
            'healthType': this._healthType,
            'healthSubType': this._healthSubType,
            'description': this._description,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'healthStatus': this._healthStatus,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'returnedOutput': this._returnedOutput,
            'recordCreateDatetime': this._recordCreateDatetime
        };
    }

}