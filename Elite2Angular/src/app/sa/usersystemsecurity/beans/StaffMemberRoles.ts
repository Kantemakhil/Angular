import {BaseModel} from '@commonbeans/BaseModel';

export class StaffMemberRoles extends BaseModel {

  private _staffId: number;
  private _roleId: number;
  private _createDatetime: Date;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _roleCode: string;
  private _sealFlag: string;
  private _inserted: boolean;
  private _description: string;
  private _userId: string;
  private _lastName: string;
  private _firstName: string;
  private _middleName: string;
  private _rowId: string;
  private _liReturn: number;
  private _totalRecords: number;
  private _updateAllowedFlag: boolean;
  private _roleName: string;

  get liReturn(): number {return this._liReturn;}

  set liReturn(pliReturn: number) {this._liReturn = pliReturn;}

  get totalRecords(): number {return this._totalRecords;}

  set totalRecords(ptotalRecords: number) {this._totalRecords = ptotalRecords;}

  get rowId(): string {return this._rowId;}

  set rowId(prowId: string) {this._rowId = prowId;}

  get staffId(): number {return this._staffId;}

  set staffId(pstaffId: number) {this._staffId = pstaffId;}

  get roleId(): number {return this._roleId;}

  set roleId(proleId: number) {this._roleId = proleId;}

  get createDatetime(): Date {return this._createDatetime;}

  set createDatetime(pcreateDatetime: Date) {this._createDatetime = pcreateDatetime;}

  get createUserId(): string {return this._createUserId;}

  set createUserId(pcreateUserId: string) {this._createUserId = pcreateUserId;}


  get modifyDatetime(): Date {return this._modifyDatetime;}

  set modifyDatetime(pmodifyDatetime: Date) {this._modifyDatetime = pmodifyDatetime;}


  get modifyUserId(): string {return this._modifyUserId;}

  set modifyUserId(pmodifyUserId: string) {this._modifyUserId = pmodifyUserId;}


  get roleCode(): string {return this._roleCode;}

  set roleCode(proleCode: string) {this._roleCode = proleCode;}


  get sealFlag(): string {return this._sealFlag;}

  set sealFlag(psealFlag: string) {this._sealFlag = psealFlag;}

  get inserted(): boolean {return this._inserted;}

  set inserted(pinserted: boolean) {this._inserted = pinserted;}

  get description(): string {return this._description;}

  set description(pdescription: string) {this._description = pdescription;}

  get lastName(): string { return this._lastName; }

	set lastName(plastName: string) { this._lastName = plastName; }

	get firstName(): string { return this._firstName; }

	set firstName(pfirstName: string) { this._firstName = pfirstName; }

	get middleName(): string { return this._middleName; }

  set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
  
  get userId(): string { return this._userId; }

	set userId(puserId: string) { this._userId = puserId; }
	
  get updateAllowedFlag(): boolean { return this._updateAllowedFlag; }

  set updateAllowedFlag(pupdateAllowedFlag: boolean) { this._updateAllowedFlag = pupdateAllowedFlag; }
  
  get roleName(): string { return this._roleName; }

	set roleName(proleName: string) { this._roleName = proleName; }


  toJSON(): any {
    return {
      'staffId': this._staffId,
      'roleId': this._roleId,
      'createDatetime': this._createDatetime,
      'createUserId': this._createUserId,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'roleCode': this._roleCode,
      'sealFlag': this._sealFlag,
      'inserted': this._inserted,
      'description': this._description,
      'lastName': this._lastName,
	  'firstName': this._firstName,
      'middleName': this._middleName,
      'userId': this._userId,
      'rowId': this._rowId,
      'liReturn': this._liReturn,
      'totalRecords': this._totalRecords,
	  'updateAllowedFlag': this._updateAllowedFlag,
    'roleName': this._roleName
    };
  }

}