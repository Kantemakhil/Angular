import { BaseModel } from '@commonbeans/BaseModel';
export class TransStatementBean extends BaseModel {
    private _fTotOnw: number;
    private _subAccountBalancesBean: number;
    private _subAccountTransactionsBean: number;
    private _fDateOne: Date;
    private _fCaseloadNameOne: string;
    private _fLivingUnitDescription: string;
    private _debsObligationsBean: number;
    private _fHoldBalance: number;
    private _fCurrentBalance: number;
    private _serialVersionUID: number;
    private _fBirthDate: Date;
    private _fName: string;
    private _fLoc: string;
    private _fReportHeaderLabelName: string;
    private _fPageOne: number;
    private _fOffenderId: string;
    private _fTotal: number;
    private _fDoc: string;
    private _fUserOne: string;
    private _fDob: string;
    private _cfCur: string;
    private _caseloadId: string;
    private _offenderId: number;
    private _caseloadType: string;
    private _beginDate: Date;
    private _endDate: Date;
    private _subAccountType: string;
    private _disclosureFlag: string;


    get fTotOnw(): number { return this._fTotOnw; }
    set fTotOnw(pfTotOnw: number) { this._fTotOnw = pfTotOnw; }
    get subAccountBalancesBean(): number { return this._subAccountBalancesBean; }
    set subAccountBalancesBean(psubAccountBalancesBean: number) { this._subAccountBalancesBean = psubAccountBalancesBean; }
    get subAccountTransactionsBean(): number { return this._subAccountTransactionsBean; }
    set subAccountTransactionsBean(psubAccountTransactionsBean: number) { this._subAccountTransactionsBean = psubAccountTransactionsBean; }
    get fDateOne(): Date { return this._fDateOne; }
    set fDateOne(pfDateOne: Date) { this._fDateOne = pfDateOne; }
    get fCaseloadNameOne(): string { return this._fCaseloadNameOne; }
    set fCaseloadNameOne(pfCaseloadNameOne: string) { this._fCaseloadNameOne = pfCaseloadNameOne; }
    get fLivingUnitDescription(): string { return this._fLivingUnitDescription; }
    set fLivingUnitDescription(pfLivingUnitDescription: string) { this._fLivingUnitDescription = pfLivingUnitDescription; }
    get debsObligationsBean(): number { return this._debsObligationsBean; }
    set debsObligationsBean(pdebsObligationsBean: number) { this._debsObligationsBean = pdebsObligationsBean; }
    get fHoldBalance(): number { return this._fHoldBalance; }
    set fHoldBalance(pfHoldBalance: number) { this._fHoldBalance = pfHoldBalance; }
    get fCurrentBalance(): number { return this._fCurrentBalance; }
    set fCurrentBalance(pfCurrentBalance: number) { this._fCurrentBalance = pfCurrentBalance; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get fBirthDate(): Date { return this._fBirthDate; }
    set fBirthDate(pfBirthDate: Date) { this._fBirthDate = pfBirthDate; }
    get fName(): string { return this._fName; }
    set fName(pfName: string) { this._fName = pfName; }
    get fLoc(): string { return this._fLoc; }
    set fLoc(pfLoc: string) { this._fLoc = pfLoc; }
    get fReportHeaderLabelName(): string { return this._fReportHeaderLabelName; }
    set fReportHeaderLabelName(pfReportHeaderLabelName: string) { this._fReportHeaderLabelName = pfReportHeaderLabelName; }
    get fPageOne(): number { return this._fPageOne; }
    set fPageOne(pfPageOne: number) { this._fPageOne = pfPageOne; }
    get fOffenderId(): string { return this._fOffenderId; }
    set fOffenderId(pfOffenderId: string) { this._fOffenderId = pfOffenderId; }
    get fTotal(): number { return this._fTotal; }
    set fTotal(pfTotal: number) { this._fTotal = pfTotal; }
    get fDoc(): string { return this._fDoc; }
    set fDoc(pfDoc: string) { this._fDoc = pfDoc; }
    get fUserOne(): string { return this._fUserOne; }
    set fUserOne(pfUserOne: string) { this._fUserOne = pfUserOne; }
    get fDob(): string { return this._fDob; }
    set fDob(pfDob: string) { this._fDob = pfDob; }
    get cfCur(): string { return this._cfCur; }
    set cfCur(pcfCur: string) { this._cfCur = pcfCur; }
    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get beginDate(): Date { return this._beginDate; }
    set beginDate(p_beginDate: Date) { this._beginDate = p_beginDate; }
    get endDate(): Date { return this._endDate; }
    set endDate(pendDate: Date) { this._endDate = pendDate; }
    get subAccountType(): string { return this._subAccountType; }
    set subAccountType(psubAccountType: string) { this._subAccountType = psubAccountType; }
    get disclosureFlag(): string { return this._disclosureFlag; }
    set disclosureFlag(pdisclosureFlag: string) { this._disclosureFlag = pdisclosureFlag; }

    toJSON(): any {
        return {
            'fTotOnw': this._fTotOnw,
            'subAccountBalancesBean': this._subAccountBalancesBean,
            'subAccountTransactionsBean': this._subAccountTransactionsBean,
            'fDateOne': this._fDateOne,
            'fCaseloadNameOne': this._fCaseloadNameOne,
            'fLivingUnitDescription': this._fLivingUnitDescription,
            'debsObligationsBean': this._debsObligationsBean,
            'fHoldBalance': this._fHoldBalance,
            'fCurrentBalance': this._fCurrentBalance,
            'serialVersionUID': this._serialVersionUID,
            'fBirthDate': this._fBirthDate,
            'fName': this._fName,
            'fLoc': this._fLoc,
            'fReportHeaderLabelName': this._fReportHeaderLabelName,
            'fPageOne': this._fPageOne,
            'fOffenderId': this._fOffenderId,
            'fTotal': this._fTotal,
            'fDoc': this._fDoc,
            'fUserOne': this._fUserOne,
            'fDob': this._fDob,
            'cfCur': this._cfCur,
            'caseloadId': this._caseloadId,
            'offenderId': this._offenderId,
            'caseloadType': this._caseloadType,
            'beginDate': this._beginDate,
            'endDate': this._endDate,
            'subAccountType': this._subAccountType,
            'disclosureFlag': this._disclosureFlag,
        };
    }
}
