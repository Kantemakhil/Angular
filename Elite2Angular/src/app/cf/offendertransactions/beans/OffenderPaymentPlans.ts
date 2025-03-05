import  {     BaseModel } from "@common/beans/BaseModel";

export class OffenderPaymentPlans  extends BaseModel  {
        private _originalOwingAmount: number;
        private _createUserId: string;
        private _endDate: Date;
        private _modifyDatetime: Date;
        private _groupId: number;
        private _modifyUserId: string;
        private _paymentCompletionDate: Date;
        private _frequency: string;
        private _serialVersionUID: number;
        private _leniencyFlag: string;
        private _caseId: number;
        private _paymentClosedFlag: string;
        private _sealFlag: string;
        private _offenderDeductionId: number;
        private _amount: number;
        private _regenerationFlag: string;
        private _paymentClosedDate: Date;
        private _paymentPlanSeq: number;
        private _regenerationDate: Date;
        private _informationNumber: string;
        private _createDatetime: Date;
        private _twiceMonthly2: number;
        private _twiceMonthly1: number;
        private _monthly: number;
        private _offenderId: number;
        private _biWeekly: string;
        private _weekly: string;
        private _paymentPlanId: number;
        private _startDate: Date;
        private _code: string;
        private  _paidFlag: string;
        private  _jSFlag: string;
        private  _caseLoadId: string;
        private _caseloadType: string;

        private _closedFlag: string;

       private  _groupUnpaidAmount: number;

       private  _totalArrears: number;

       private  _groupDifference: number;

       private _distribute: string;
       private _searchAmount: string;
       private _id: string;
       private _parentInfoId: string;
       private _grpId: string;
       private _rootOffenderId: number;

       get caseLoadId(): string  {     return this._caseLoadId ; }
      set caseLoadId(pcaseLoadId: string)  {     this._caseLoadId = pcaseLoadId; }
      get caseloadType(): string  {     return this._caseloadType ; }
      set caseloadType(pcaseloadType: string)  {     this._caseloadType = pcaseloadType; }
       get closedFlag(): string  {     return this._closedFlag ; }

        set closedFlag(pclosedFlag: string)  {     this._closedFlag = pclosedFlag; }

        get code(): string  {     return this._code ; }
        set code(pcode: string)  {     this._code = pcode; }

        get rootOffenderId(): number  {     return this.rootOffenderId ; }
        set rootOffenderId(prootOffenderId: number)  {     this._rootOffenderId = prootOffenderId; }

        get grpId(): string  {     return this._grpId ; }
        set grpId(pgrpId: string)  {     this._grpId = pgrpId; }


        set parentInfoId(pparentInfoId: string)  {     this._code = pparentInfoId; }

        get parentInfoId(): string  {     return this._parentInfoId ; }


        get id(): string  {     return this._id ; }

        set id(pid: string)  {     this._id = pid; }
        get searchAmount(): string  {     return this._searchAmount ; }

        set searchAmount(psearchAmount: string)  {     this._searchAmount = psearchAmount; }

        get distribute(): string  {     return this._distribute ; }

        set distribute(pdistribute: string)  {     this._distribute = pdistribute; }

        get paidFlag(): string  {     return this._paidFlag ; }

        set paidFlag(ppaidFlag: string)  {     this._paidFlag = ppaidFlag; }

        get jSFlag(): string  {     return this._jSFlag ; }

        set jSFlag(pjSFlag: string)  {     this._jSFlag = pjSFlag; }

        get groupUnpaidAmount(): number  {     return this._groupUnpaidAmount ; }

        set groupUnpaidAmount(pgroupUnpaidAmount: number)  {     this._groupUnpaidAmount = pgroupUnpaidAmount; }

        get totalArrears(): number  {     return this._totalArrears ; }

        set totalArrears(ptotalArrears: number)  {     this._totalArrears = ptotalArrears; }

        get groupDifference(): number  {     return this._groupDifference ; }

        set groupDifference(pgroupDifference: number)  {     this._groupDifference = pgroupDifference; }

        get originalOwingAmount(): number {     return this._originalOwingAmount; }
        set originalOwingAmount(poriginalOwingAmount: number) {     this._originalOwingAmount = poriginalOwingAmount ;}
        get createUserId(): string {     return this._createUserId; }
        set createUserId(pcreateUserId: string) {     this._createUserId = pcreateUserId ;}
        get endDate(): Date {     return this._endDate; }
        set endDate(pendDate: Date) {     this._endDate = pendDate ;}
        get modifyDatetime(): Date {     return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date) {     this._modifyDatetime = pmodifyDatetime ;}
        get groupId(): number {     return this._groupId; }
        set groupId(pgroupId: number) {     this._groupId = pgroupId ;}
        get modifyUserId(): string {     return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string) {     this._modifyUserId = pmodifyUserId ;}
        get paymentCompletionDate(): Date {     return this._paymentCompletionDate; }
        set paymentCompletionDate(ppaymentCompletionDate: Date) {     this._paymentCompletionDate = ppaymentCompletionDate ;}
        get weekly(): string {     return this._weekly; }
        set weekly(pweekly: string)  {     this._weekly = pweekly ; }
        get frequency(): string {     return this._frequency; }
        set frequency(pfrequency: string) {     this._frequency = pfrequency ;}
        get serialVersionUID(): number {     return this._serialVersionUID; }
        set serialVersionUID(pserialVersionUID: number) {     this._serialVersionUID = pserialVersionUID ;}
        get leniencyFlag(): string {     return this._leniencyFlag; }
        set leniencyFlag(pleniencyFlag: string) {     this._leniencyFlag = pleniencyFlag ;}
        get caseId(): number {     return this._caseId; }
        set caseId(pcaseId: number) {     this._caseId = pcaseId ;}
        get paymentClosedFlag(): string {     return this._paymentClosedFlag; }
        set paymentClosedFlag(ppaymentClosedFlag: string) {     this._paymentClosedFlag = ppaymentClosedFlag ;}
        get sealFlag(): string {     return this._sealFlag; }
        set sealFlag(psealFlag: string) {     this._sealFlag = psealFlag ;}
        get offenderDeductionId(): number {     return this._offenderDeductionId; }
        set offenderDeductionId(poffenderDeductionId: number) {     this._offenderDeductionId = poffenderDeductionId ;}
        get amount(): number {     return this._amount; }
        set amount(pamount: number) {     this._amount = pamount ;}
        get regenerationFlag(): string {     return this._regenerationFlag; }
        set regenerationFlag(pregenerationFlag: string) {     this._regenerationFlag = pregenerationFlag ;}
        get paymentClosedDate(): Date {     return this._paymentClosedDate; }
        set paymentClosedDate(ppaymentClosedDate: Date) {     this._paymentClosedDate = ppaymentClosedDate ;}
        get paymentPlanSeq(): number {     return this._paymentPlanSeq; }
        set paymentPlanSeq(ppaymentPlanSeq: number) {     this._paymentPlanSeq = ppaymentPlanSeq ;}
        get regenerationDate(): Date {     return this._regenerationDate; }
        set regenerationDate(pregenerationDate: Date) {     this._regenerationDate = pregenerationDate ;}
        get informationNumber(): string {     return this._informationNumber; }
        set informationNumber(pinformationNumber: string) {     this._informationNumber = pinformationNumber ;}
        get createDatetime(): Date {     return this._createDatetime; }
        set createDatetime(pcreateDatetime: Date) {     this._createDatetime = pcreateDatetime ;}
        get twiceMonthly2(): number {     return this._twiceMonthly2; }
        set twiceMonthly2(ptwiceMonthly2: number) {     this._twiceMonthly2 = ptwiceMonthly2 ;}
        get twiceMonthly1(): number {     return this._twiceMonthly1; }
        set twiceMonthly1(ptwiceMonthly1: number) {     this._twiceMonthly1 = ptwiceMonthly1 ;}
        get monthly(): number {     return this._monthly; }
        set monthly(pmonthly: number) {     this._monthly = pmonthly ;}
        get offenderId(): number {     return this._offenderId; }
        set offenderId(poffenderId: number) {     this._offenderId = poffenderId ;}
        get biWeekly(): string {     return this._biWeekly; }
        set biWeekly(pbiWeekly: string) {     this._biWeekly = pbiWeekly ;}
        get paymentPlanId(): number {     return this._paymentPlanId; }
        set paymentPlanId(ppaymentPlanId: number) {     this._paymentPlanId = ppaymentPlanId ;}
        get startDate(): Date {     return this._startDate; }
        set startDate(pstartDate: Date) {     this._startDate = pstartDate ;}

    toJSON(): any  {
        return  {
           'originalOwingAmount': this._originalOwingAmount,
           'createUserId': this._createUserId,
           'endDate': this._endDate,
           'modifyDatetime': this._modifyDatetime,
           'groupId': this._groupId,
           'modifyUserId': this._modifyUserId,
           'paymentCompletionDate': this._paymentCompletionDate,
           'weekly': this._weekly,
           'frequency': this._frequency,
           'serialVersionUID': this._serialVersionUID,
           'leniencyFlag': this._leniencyFlag,
           'caseId': this._caseId,
           'paymentClosedFlag': this._paymentClosedFlag,
           'sealFlag': this._sealFlag,
           'offenderDeductionId': this._offenderDeductionId,
           'amount': this._amount,
           'regenerationFlag': this._regenerationFlag,
           'paymentClosedDate': this._paymentClosedDate,
           'paymentPlanSeq': this._paymentPlanSeq,
           'regenerationDate': this._regenerationDate,
           'informationNumber': this._informationNumber,
           'createDatetime': this._createDatetime,
           'twiceMonthly2': this._twiceMonthly2,
           'twiceMonthly1': this._twiceMonthly1,
           'monthly': this._monthly,
           'offenderId': this._offenderId,
           'biWeekly': this._biWeekly,
           'paymentPlanId': this._paymentPlanId,
           'startDate': this._startDate,
           'code': this._code,
          'paidFlag': this._paidFlag,
           'jSFlag': this._jSFlag,

           'groupUnpaidAmount':  this._groupUnpaidAmount,

           'totalArrears':  this._totalArrears,

           'groupDifference':  this._groupDifference,
           'distribute':  this._distribute,
           'caseLoadId': this._caseLoadId,
           'caseloadType': this._caseloadType,
           'id': this._id
            };
        }
}
