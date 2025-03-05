import {BaseModel} from '@commonbeans/BaseModel'

export class InterestedParties extends BaseModel{
    
    
    private _createDatetime: Date;
    public get createDatetime(): Date {
        return this._createDatetime;
    }
    public set createDatetime(value: Date) {
        this._createDatetime = value;
    }
    private _partyId: number;
    public get partyId(): number {
        return this._partyId;
    }
    public set partyId(value: number) {
        this._partyId = value;
    }
    private _partyType: string;
    public get partyType(): string {
        return this._partyType;
    }
    public set partyType(value: string) {
        this._partyType = value;
    }
    private _partyDescription: string;
    public get partyDescription(): string {
        return this._partyDescription;
    }
    public set partyDescription(value: string) {
        this._partyDescription = value;
    }
    private _partyComment: string;
    public get partyComment(): string {
        return this._partyComment;
    }
    public set partyComment(value: string) {
        this._partyComment = value;
    }
    private _offenderBookId: number;
    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }
    private _recordType: string;
    public get recordType(): string {
        return this._recordType;
    }
    public set recordType(value: string) {
        this._recordType = value;
    }
    private _recordId: string;
    public get recordId(): string {
        return this._recordId;
    }
    public set recordId(value: string) {
        this._recordId = value;
    }
    private _createUserId: string;
    public get createUserId(): string {
        return this._createUserId;
    }
    public set createUserId(value: string) {
        this._createUserId = value;
    }
    private _modifyDatetime: Date;
    public get modifyDatetime(): Date {
        return this._modifyDatetime;
    }
    public set modifyDatetime(value: Date) {
        this._modifyDatetime = value;
    }
    private _modifyUserId: string;
    public get modifyUserId(): string {
        return this._modifyUserId;
    }
    public set modifyUserId(value: string) {
        this._modifyUserId = value;
    }
    private _sealFlag: string;
    public get sealFlag(): string {
        return this._sealFlag;
    }
    public set sealFlag(value: string) {
        this._sealFlag = value;
    }
    
    
    toJSON(): any {
        return {
            
            'offenderBookId': this._offenderBookId,
            'partyId': this._partyId,
            'partyType': this._partyType,
            'partyDescription': this._partyDescription,
            'partyComment': this._partyComment,
            'recordType': this._recordType,
            'recordId': this._recordId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
        
        };
     }

}