import {BaseModel} from '@commonbeans/BaseModel';

export class OmsRoles extends BaseModel {

    private _roleId: number;
    private _roleName: string;
    private _roleSeq: number;
    private _createDateTime: Date;
    private _createUserId: string;
    private _modifyDateTime: Date;
    private _modifyUserId: string;
    private _roleCode: string;
    private _parentRoleCode: string;
    private _sealflag: string;
    private _roleIdCode: boolean;

    
    set roleId(proleId: number){ this._roleId = proleId;}
    
     get roleId(): number { return this._roleId; }
    
    set roleName(proleName: string){ this._roleName = proleName;}
    
     get roleName(): string { return this._roleName; }
    
    set roleSeq(proleSeq: number){ this._roleSeq = proleSeq; }
   
     get roleSeq(): number { return this._roleSeq; }
    
    set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }
    
     get createDateTime(): Date { return this._createDateTime; }
    
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }
   
     get createUserId(): string { return this._createUserId; }
    
    set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }
    
     get modifyDateTime(): Date { return this._modifyDateTime; }
    
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }
    
     get modifyUserId(): string { return this._modifyUserId; }
    
    set roleCode(proleCode: string){ this._roleCode = proleCode; }
    
     get roleCode(): string { return this._roleCode; }
    
    set parentRoleCode(pparentRoleCode: string){ this._parentRoleCode = pparentRoleCode; }
    
     get parentRoleCode(): string { return this._parentRoleCode; }
    
    set sealflag(psealflag: string){ this._sealflag = psealflag; }
    
     get sealflag(): string { return this._sealflag; }
    
    
        toJSON(): any {
        return {
            'roleId': this._roleId,             
            'roleName': this._roleName,
            'roleSeq': this._roleSeq,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'roleCode': this._roleCode,
            'parentRoleCode': this._parentRoleCode,
            'sealflag': this._sealflag,
            };
    
    }
    }
   
   