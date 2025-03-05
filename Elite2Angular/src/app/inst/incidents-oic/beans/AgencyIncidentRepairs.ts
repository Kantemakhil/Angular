import {BaseModel} from '@commonbeans/BaseModel';
export class AgencyIncidentRepairs extends BaseModel {

    private _agencyIncidentId: number;
    private _repairSeq: number;
    private _repairType: string;
    private _commentText: string;
    private _modifyUserId: string;
    private _modifyDateTime: Date;
    private _repairCost: number;
    private _createDateTime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _repairTypeDes: string;
    private  _code: string;
    private  _repairCostdes: string;
    
     get repairCostdes(): string { return this._repairCostdes; }

    set repairCostdes(prepairCostdes: string) { this._repairCostdes = prepairCostdes; } 
       
        
    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; } 
       
    get agencyIncidentId(): number { return this._agencyIncidentId; }
     
    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get repairSeq(): number { return this._repairSeq; }
    
    set repairSeq(prepairSeq: number) { this._repairSeq = prepairSeq; }

    get repairType(): string { return this._repairType; }
    
    set repairType(prepairType: string) { this._repairType = prepairType; }

    get commentText(): string { return this._commentText; }
    
    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get modifyUserId(): string { return this._modifyUserId; }
    
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get modifyDateTime(): Date { return this._modifyDateTime; }
    
    set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

    get repairCost(): number { return this._repairCost; }
    
    set repairCost(prepairCost: number) { this._repairCost = prepairCost; }

    get createDateTime(): Date { return this._createDateTime; }
    
    set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }
    
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get sealFlag(): string { return this._sealFlag; }
    
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get repairTypeDes(): string { return this._repairTypeDes; }
    
    set repairTypeDes(prepairTypeDes: string) { this._repairTypeDes = prepairTypeDes; }

    toJSON(): any {
        return {
            'agencyIncidentId': this._agencyIncidentId,
            'repairType': this._repairType,
            'repairSeq': this._repairSeq,
            'commentText': this._commentText,
            'modifyUserId': this._modifyUserId,
            'modifyDateTime': this._modifyDateTime,
            'repairCost': this._repairCost,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'sealFlag': this._sealFlag,
            'repairTypeDes': this._repairTypeDes,//repairCostdes
            'code':this._code,
            'repairCostdes':this._repairCostdes,
         };
    }
}
