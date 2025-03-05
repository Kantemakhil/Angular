export class Teams {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _teamCode: string;
    private _description: string;
    private _queueClusterId: number;
    private _expiryDate: Date;
    private _createDatetime: Date;
    private _areaCode: string;
    private _teamId: number;
    private _listSeq: number;
    private _agyLocId: string;
    private _category: string;
    private _sealFlag: string;
    private _activeFlag: string;
    private _nbtDescription: string;
    private _nbtAtDesc: string;
    private _functionType: string;
    private _returnValue: number;
    private _agyLocType: string;
    private _checkFlag: string;
    private _currentCaseLoad: string;
    private _code: string;
    private _updateDeleteAllowedCount: number;
    private _caseLoadId:string;
    private _button: string;
    private _agyLocList: Array<any>;
    private _functionList: Array<any>;
    private _teamEmail: string;


    get updateDeleteAllowedCount(): number { return this._updateDeleteAllowedCount; }
    set updateDeleteAllowedCount(pupdateDeleteAllowedCount: number) { this._updateDeleteAllowedCount = pupdateDeleteAllowedCount; }
    
    get currentCaseLoad(): string { return this._currentCaseLoad; }
    set currentCaseLoad(pcurrentCaseLoad: string) { this._currentCaseLoad = pcurrentCaseLoad; }
    get checkFlag(): string { return this._checkFlag; }
    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }
    get agyLocType(): string{ return this._agyLocType; }
    set agyLocType(pagyLocType: string){ this._agyLocType = pagyLocType ;}

    get functionType(): string{ return this._functionType; }
set functionType(pfunctionType: string){ this._functionType = pfunctionType ;}
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get teamCode(): string { return this._teamCode; }
    set teamCode(pteamCode: string) { this._teamCode = pteamCode; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get queueClusterId(): number { return this._queueClusterId; }
    set queueClusterId(pqueueClusterId: number) { this._queueClusterId = pqueueClusterId; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get areaCode(): string { return this._areaCode; }
    set areaCode(pareaCode: string) { this._areaCode = pareaCode; }
    get teamId(): number { return this._teamId; }
    set teamId(pteamId: number) { this._teamId = pteamId; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
    get category(): string { return this._category; }
    set category(pcategory: string) { this._category = pcategory; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }
    get nbtDescription(): string { return this._nbtDescription; }
    set nbtDescription(pnbtDescription: string) { this._nbtDescription = pnbtDescription; }
    get nbtAtDesc(): string { return this._nbtAtDesc; }
    set nbtAtDesc(pnbtAtDesc: string) { this._nbtAtDesc = pnbtAtDesc; }
    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get caseLoadId(): string { return this._caseLoadId; }
    set caseLoadId(pcaseLoadId: string) { this._caseLoadId = pcaseLoadId; }
    get button(): string { return  this._button; }
    set button(pbutton: string) { this._button = pbutton; }


    get agyLocList(): Array<any> { return this._agyLocList; }

    set agyLocList(pagyLocList: Array<any>) { this._agyLocList = pagyLocList; }

    get functionList(): Array<any> { return this._functionList; }

    set functionList(pfunctionList: Array<any>) { this._functionList = pfunctionList; }

    get teamEmail(): string { return this._teamEmail; }
    set teamEmail(pteamEmail: string) { this._teamEmail = pteamEmail; }
    
    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'teamCode': this._teamCode,
            'description': this._description,
            'queueClusterId': this._queueClusterId,
            'expiryDate': this._expiryDate,
            'createDatetime': this._createDatetime,
            'areaCode': this._areaCode,
            'teamId': this._teamId,
            'listSeq': this._listSeq,
            'agyLocId': this._agyLocId,
            'category': this._category,
            'sealFlag': this._sealFlag,
            'activeFlag': this._activeFlag,
            'nbtDescription': this._nbtDescription,
            'nbtAtDesc': this._nbtAtDesc,
            'functionType': this._functionType,
            'returnValue': this._returnValue,
            'agyLocType': this._agyLocType,
            'checkFlag': this._checkFlag,
            'currentCaseLoad': this._currentCaseLoad,
            'updateDeleteAllowedCount': this._updateDeleteAllowedCount,
            'code':this._code,
            'caseLoadId':this._caseLoadId,
            'button':this._button,
            'functionList':this._functionList,
            'agyLocList':this._agyLocList,
            'teamEmail': this._teamEmail
        };
    }
}
