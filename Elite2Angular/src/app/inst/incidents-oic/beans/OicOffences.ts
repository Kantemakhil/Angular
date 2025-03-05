import {BaseModel} from '@commonbeans/BaseModel';

    export class OicOffences extends BaseModel {
         private _createUserId: string;
         private _modifyDatetime: Date;
         private _endDate: Date;
         private _oicOffenceCode: string;
         private _modifyUserId: string;
         private _description: string;
         private _oicOffenceType: string;
         private _oicOffenceId: number;
         private _createDatetime: Date;
         private _oicOffenceCategory: string;
         private _inserted: number;
         private _listSeq: number;
         private _expireDate: Date;
         private _updateAllowedFlag: string;
         private _maxPenaltyMonths: number;
         private _sealFlag: string;
         private _maxPenaltyDays: number;
         private _startDate: Date;
         private _activeFlag: string;
         private _chargeSeq: number;
         private  _code: string;
         private  _decsription: string;
         private _reportText: string;
         private _findingCode: string;
         private _offenceType: string;
         private _pEndDate: Date;
         private _pStartDate: Date;
         private _showStartDate: string;
         private _showEndDate: string;
         get reportText(): string { return this._reportText; }

         set reportText(preportText: string) { this._reportText = preportText; }
        
         get findingCode(): string { return this._findingCode; }

         set findingCode(pfindingCode: string) { this._findingCode = pfindingCode; }
        
         get offenceType(): string { return this._offenceType; }

         set offenceType(poffenceType: string) { this._offenceType = poffenceType; }

        
         get decsription(): string { return this._decsription; }

         set decsription(pdecsription: string) { this._decsription = pdecsription; }

        get code(): string { return this._code; }

         set code(pcode: string) { this._code = pcode; }

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get modifyDatetime(): Date { return  this._modifyDatetime; }

         set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

         get endDate(): Date { return  this._endDate; }

         set endDate(pendDate: Date) { this._endDate = pendDate; }

         get oicOffenceCode(): string { return  this._oicOffenceCode; }

         set oicOffenceCode(poicOffenceCode: string) { this._oicOffenceCode = poicOffenceCode; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get description(): string { return  this._description; }

         set description(pdescription: string) { this._description = pdescription; }

         get oicOffenceType(): string { return  this._oicOffenceType; }

         set oicOffenceType(poicOffenceType: string) { this._oicOffenceType = poicOffenceType; }

         get oicOffenceId(): number { return  this._oicOffenceId; }

         set oicOffenceId(poicOffenceId: number) { this._oicOffenceId = poicOffenceId; }

         get createDatetime(): Date { return  this._createDatetime; }

         set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

         get oicOffenceCategory(): string { return  this._oicOffenceCategory; }

         set oicOffenceCategory(poicOffenceCategory: string) { this._oicOffenceCategory = poicOffenceCategory; }

         get inserted(): number { return  this._inserted; }

         set inserted(pinserted: number) { this._inserted = pinserted; }

         get listSeq(): number { return  this._listSeq; }

         set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

         get expireDate(): Date { return  this._expireDate; }

         set expireDate(pexpireDate: Date) { this._expireDate = pexpireDate; }

         get updateAllowedFlag(): string { return  this._updateAllowedFlag; }

         set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }

         get maxPenaltyMonths(): number { return  this._maxPenaltyMonths; }

         set maxPenaltyMonths(pmaxPenaltyMonths: number) { this._maxPenaltyMonths = pmaxPenaltyMonths; }

         get sealFlag(): string { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get maxPenaltyDays(): number { return  this._maxPenaltyDays; }

         set maxPenaltyDays(pmaxPenaltyDays: number) { this._maxPenaltyDays = pmaxPenaltyDays; }

         get startDate(): Date { return  this._startDate; }

         set startDate(pstartDate: Date) { this._startDate = pstartDate; }

         get activeFlag(): string { return  this._activeFlag; }

        set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

        get chargeSeq(): number { return  this._chargeSeq; }

         set chargeSeq(pchargeSeq: number) { this._chargeSeq = pchargeSeq; }

         get pEndDate(): Date { return  this._pEndDate; }

         set pEndDate(ppEndDate: Date) { this._pEndDate = ppEndDate; }

         get pStartDate(): Date { return  this._pStartDate; }

         set pStartDate(ppStartDate: Date) { this._pStartDate = ppStartDate; }

         get showStartDate(): string { return this._showStartDate; }

         set showStartDate(pshowStartDate: string) { this._showStartDate = pshowStartDate; }

         get showEndDate(): string { return this._showEndDate; }

         set showEndDate(pshowEndDate: string) { this._showEndDate = pshowEndDate; }

         
    toJSON(): any {
         return {
                     'createUserId': this._createUserId,
                     'modifyDatetime': this._modifyDatetime,
                     'endDate': this._endDate,
                     'oicOffenceCode': this._oicOffenceCode,
                     'modifyUserId': this._modifyUserId,
                     'description': this._description,
                     'oicOffenceType': this._oicOffenceType,
                     'oicOffenceId': this._oicOffenceId,
                     'createDatetime': this._createDatetime,
                     'oicOffenceCategory': this._oicOffenceCategory,
                     'inserted': this._inserted,
                     'listSeq': this._listSeq,
                     'expireDate': this._expireDate,
                     'updateAllowedFlag': this._updateAllowedFlag,
                     'maxPenaltyMonths': this._maxPenaltyMonths,
                     'sealFlag': this._sealFlag,
                     'maxPenaltyDays': this._maxPenaltyDays,
                     'startDate': this._startDate,
                     'activeFlag': this._activeFlag,
                     'chargeSeq': this._chargeSeq,
                     'code':this._code,
                      'reportText': this._reportText,
                      'offenceType': this._offenceType,
                      'pEndDate': this._pEndDate,
                      'pStartDate': this._pStartDate,
                      'showStartDate': this._showStartDate,
                      'showEndDate': this._showEndDate
                      };
        }
 }
