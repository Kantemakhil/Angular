import { BaseModel } from '@commonbeans/BaseModel';	


export class AssessmentSupervisions  extends BaseModel {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _effectiveDate: Date;
    private _expiryDate: Date;
    private _listSeq: number;
    private _maxScore: number;
    private _miniScore: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _assessmentId: number;
    private _supervisionLevelType: string;
    private _score: number;
    private _superVsnCode: string;
    private _parentAssessmentId: number;


    get parentAssessmentId(): number{ return  this._parentAssessmentId }
    
    set parentAssessmentId(pparentAssessmentId: number){ this._parentAssessmentId = pparentAssessmentId }

    get activeFlag(): string{ return  this._activeFlag }

    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag }

    get superVsnCode(): string{ return  this._superVsnCode }

    set superVsnCode(psuperVsnCode: string){ this._superVsnCode = psuperVsnCode }

     get createDatetime(): Date{ return  this._createDatetime }

     set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime }


       get createUserId(): string{ return  this._createUserId }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }


     get effectiveDate(): Date{ return  this._effectiveDate }

    set effectiveDate(peffectiveDate: Date){ this._effectiveDate = peffectiveDate }


       get expiryDate(): Date{ return  this._expiryDate }

     set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate }


       get listSeq(): number{ return  this._listSeq }

    set listSeq(plistSeq: number){ this._listSeq = plistSeq }


      get maxScore(): number{ return  this._maxScore }

     set maxScore(pmaxScore: number){ this._maxScore = pmaxScore }



      get miniScore(): number{ return  this._miniScore }

    set miniScore(pminiScore: number){ this._miniScore = pminiScore }


      get modifyDatetime(): Date{ return  this._modifyDatetime }

     set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime }


       get modifyUserId(): string{ return  this._modifyUserId }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

      get sealFlag(): string{ return  this._sealFlag }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }


      get updateAllowedFlag(): string{ return  this._updateAllowedFlag }

    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag }


     get assessmentId(): number{ return  this._assessmentId }

    set assessmentId(passessmentId: number){ this._assessmentId = passessmentId }


       get supervisionLevelType(): string{ return  this._supervisionLevelType }

    set supervisionLevelType(psupervisionLevelType: string){ this._supervisionLevelType = psupervisionLevelType }


       get score(): number{ return  this._score }

     set score(pscore: number){ this._score = pscore }
   
        toJSON(): any {
            return {
 'activeFlag': this._activeFlag ,          
'createDatetime ': this._createDatetime,       
'createUserId': this._createUserId,         
'expiryDate': this._expiryDate,           
'listSeq': this._listSeq,             
'maxScore': this._maxScore,             
'miniScore': this._miniScore,            
'modifyDatetime': this._modifyDatetime,      
'_modifyUserId': this._modifyUserId,         
'sealFlag': this._sealFlag,             
'updateAllowedFlag': this._updateAllowedFlag,    
'assessmentId': this._assessmentId,         
'supervisionLevelType': this._supervisionLevelType, 
'score': this._score,
'parentAssessmentId': this._parentAssessmentId,               
    }
        }

	


}