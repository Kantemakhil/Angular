export class ReleasePlans {
     private _sponsor: string;
     private _createUserId: string;
     private _offenderBookId: number;
     private _employSeq: number;
     private _modifyUserId: string;
     private _planStatus: string;
     private _employmentStatus: string;
     private _employmentComment: string;
     private _addressId: number;
     private _assessmentSeq: number;
     private _serialVersionUID: number;
     private _proposedStartDate: Date;
     private _housingComment: string;
     private _paroleAgentId: number;
     private _sealFlag: string;
     private _createDate: Date;
     private _updatedBy: string;
     private _addressType: string;
     private _proposedEndDate: Date;
     private _createDateTime: Date;
     private _proposedHousing: string;
     private _proposedEmployment: string;
     private _modifyDateTime: Date;
     private _taType: string;
     private _releasePlanId: number;
     private _agentRecommend: string;
     private _memoText: string;
     private _caseManagerId: number;
     private _nbtCaseManagerId: string;
     private _nbtParoleAgentId: string;
     private _rootOffenderId: number;
     private _assessmentDate: Date;
     private _reviewSupLevelType: string;
     private _conditions: string;


     get sponsor(): string { return this._sponsor; }
     set sponsor(psponsor: string) { this._sponsor = psponsor; }
     get createUserId(): string { return this._createUserId; }
     set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
     get offenderBookId(): number { return this._offenderBookId; }
     set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
     get employSeq(): number { return this._employSeq; }
     set employSeq(pemploySeq: number) { this._employSeq = pemploySeq; }
     get modifyUserId(): string { return this._modifyUserId; }
     set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
     get planStatus(): string { return this._planStatus; }
     set planStatus(pplanStatus: string) { this._planStatus = pplanStatus; }
     get employmentStatus(): string { return this._employmentStatus; }
     set employmentStatus(pemploymentStatus: string) { this._employmentStatus = pemploymentStatus; }
     get employmentComment(): string { return this._employmentComment; }
     set employmentComment(pemploymentComment: string) { this._employmentComment = pemploymentComment; }
     get addressId(): number { return this._addressId; }
     set addressId(paddressId: number) { this._addressId = paddressId; }
     get assessmentSeq(): number { return this._assessmentSeq; }
     set assessmentSeq(passessmentSeq: number) { this._assessmentSeq = passessmentSeq; }
     get serialVersionUID(): number { return this._serialVersionUID; }
     set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
     get proposedStartDate(): Date { return this._proposedStartDate; }
     set proposedStartDate(pproposedStartDate: Date) { this._proposedStartDate = pproposedStartDate; }
     get housingComment(): string { return this._housingComment; }
     set housingComment(phousingComment: string) { this._housingComment = phousingComment; }
     get paroleAgentId(): number { return this._paroleAgentId; }
     set paroleAgentId(pparoleAgentId: number) { this._paroleAgentId = pparoleAgentId; }
     get sealFlag(): string { return this._sealFlag; }
     set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
     get createDate(): Date { return this._createDate; }
     set createDate(pcreateDate: Date) { this._createDate = pcreateDate; }
     get updatedBy(): string { return this._updatedBy; }
     set updatedBy(pupdatedBy: string) { this._updatedBy = pupdatedBy; }
     get addressType(): string { return this._addressType; }
     set addressType(paddressType: string) { this._addressType = paddressType; }
     get proposedEndDate(): Date { return this._proposedEndDate; }
     set proposedEndDate(pproposedEndDate: Date) { this._proposedEndDate = pproposedEndDate; }
     get createDateTime(): Date { return this._createDateTime; }
     set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }
     get proposedHousing(): string { return this._proposedHousing; }
     set proposedHousing(pproposedHousing: string) { this._proposedHousing = pproposedHousing; }
     get proposedEmployment(): string { return this._proposedEmployment; }
     set proposedEmployment(pproposedEmployment: string) { this._proposedEmployment = pproposedEmployment; }
     get modifyDateTime(): Date { return this._modifyDateTime; }
     set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }
     get taType(): string { return this._taType; }
     set taType(ptaType: string) { this._taType = ptaType; }
     get releasePlanId(): number { return this._releasePlanId; }
     set releasePlanId(preleasePlanId: number) { this._releasePlanId = preleasePlanId; }
     get agentRecommend(): string { return this._agentRecommend; }
     set agentRecommend(pagentRecommend: string) { this._agentRecommend = pagentRecommend; }
     get memoText(): string { return this._memoText; }
     set memoText(pmemoText: string) { this._memoText = pmemoText; }
     get caseManagerId(): number { return this._caseManagerId; }
     set caseManagerId(pcaseManagerId: number) { this._caseManagerId = pcaseManagerId; }
     get nbtCaseManagerId(): string { return this._nbtCaseManagerId; }
     set nbtCaseManagerId(pnbtCaseManagerId: string) { this._nbtCaseManagerId = pnbtCaseManagerId; }
     get nbtParoleAgentId(): string { return this._nbtParoleAgentId; }
     set nbtParoleAgentId(pnbtParoleAgentId: string) { this._nbtParoleAgentId = pnbtParoleAgentId; }
     get rootOffenderId(): number { return this._rootOffenderId; }
     set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId; }
     get assessmentDate(): Date{ return  this._assessmentDate }
     set assessmentDate(passessmentDate: Date){ this._assessmentDate = passessmentDate }
     get reviewSupLevelType(): string{ return  this._reviewSupLevelType }
     set reviewSupLevelType(previewSupLevelType: string){ this._reviewSupLevelType = previewSupLevelType }
     get conditions(): string{ return  this._conditions }
     set conditions(pconditions: string){ this._conditions = pconditions }

     toJSON(): any {
          return {
               'sponsor': this._sponsor,
               'createUserId': this._createUserId,
               'offenderBookId': this._offenderBookId,
               'employSeq': this._employSeq,
               'modifyUserId': this._modifyUserId,
               'planStatus': this._planStatus,
               'employmentStatus': this._employmentStatus,
               'employmentComment': this._employmentComment,
               'addressId': this._addressId,
               'assessmentSeq': this._assessmentSeq,
               'serialVersionUID': this._serialVersionUID,
               'proposedStartDate': this._proposedStartDate,
               'housingComment': this._housingComment,
               'paroleAgentId': this._paroleAgentId,
               'sealFlag': this._sealFlag,
               'createDate': this._createDate,
               'updatedBy': this._updatedBy,
               'addressType': this._addressType,
               'proposedEndDate': this._proposedEndDate,
               'createDateTime': this._createDateTime,
               'proposedHousing': this._proposedHousing,
               'proposedEmployment': this._proposedEmployment,
               'modifyDateTime': this._modifyDateTime,
               'taType': this._taType,
               'releasePlanId': this._releasePlanId,
               'agentRecommend': this._agentRecommend,
               'memoText': this._memoText,
               'caseManagerId': this._caseManagerId,
               'nbtCaseManagerId': this._nbtCaseManagerId,
               'nbtParoleAgentId': this._nbtParoleAgentId,
               'rootOffenderId': this._rootOffenderId,
               'assessmentDate': this._assessmentDate,
               'reviewSupLevelType': this._reviewSupLevelType,
               'conditions': this._conditions,
          };
     }
}
