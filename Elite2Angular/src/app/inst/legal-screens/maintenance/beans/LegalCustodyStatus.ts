
export class LegalCustodyStatus {
	private _statusDescription: string;
	private _statusCode: string;
	private  _createDatetime:Date;
	private  _createUserId:String;
	private  _modifyDatetime:Date;
	private  _modifyUserId:string;
	private  _sealFlag:string;
	private _releaseFlag: string;
	private _intakeFlag: string;
    private _alwaysDisplayFlag: string;
    private _activeFlag: string;
    public get activeFlag(): string {
        return this._activeFlag;
    }
    public set activeFlag(value: string) {
        this._activeFlag = value;
    }
    private _expiryDate: Date;
    private _statusRank: number;
   
    public get releaseFlag(): string {
        return this._releaseFlag;
    }
    public set releaseFlag(value: string) {
        this._releaseFlag = value;
    }

    public get statusCode(): string {
        return this._statusCode;
    }
    public set statusCode(value: string) {
        this._statusCode = value;
    }
    public get statusDescription(): string {
        return this._statusDescription;
    }
    public set statusDescription(value: string) {
        this._statusDescription = value;
    }
    public get intakeFlag(): string {
        return this._intakeFlag;
    }
    public set intakeFlag(value: string) {
        this._intakeFlag = value;
    }
    public get alwaysDisplayFlag(): string {
        return this._alwaysDisplayFlag;
    }
    public set alwaysDisplayFlag(value: string) {
        this._alwaysDisplayFlag = value;
    }
	
    public get statusOrder(): number {
        return this._statusRank;
    }
    public set statusOrder(value: number) {
        this._statusRank = value;
    }
	
    public get expiryDate(): Date {
        return this._expiryDate;
    }
    public set expiryDate(value: Date) {
        this._expiryDate = value;
    }


    
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
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

  


    toJSON(): any {
        return {
            'statusDescription': this._statusDescription,
            'statusCode': this._statusCode,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'releaseFlag': this._releaseFlag,
            'intakeFlag': this._intakeFlag,
            'alwaysDisplayFlag': this._alwaysDisplayFlag,
            'activeFlag': this._activeFlag,
            'statusOrder': this._statusRank,
            'expiryDate': this._expiryDate,
        };
    }

}