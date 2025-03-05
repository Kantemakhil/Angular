export class CaseloadDedBeneficiaries {

    private _caseloadDedBeneficiaryId: number;

    private _caseloadId: string;

    private _deductionType: string;

    private _amount: number;

    private _corporateId: number;

    private _corporateIdTemp: number;
    private _createDatetime: Date;

    private _createUserId: string;

    private _modifyDate: Date;

    private _modifyDatetime: Date;

    private _modifyUserId: string;

    private _percent: number;

    private _personId: number;

    private _personIdTemp: number;
    private _priority: number;

    private _sealFlag: string;

    private _personFlag: boolean;
    private _corporateFlag: boolean;

    private _maxTotalAmount: number;

    private _caseloadType: string;

    private _offenderFeeId: number;
    private _offenderBookId: number;

    private _offFeeDedBeneficiaryId: number;


    public get corporateFlag(): boolean {
        return this._corporateFlag;
    }
    public set corporateFlag(value: boolean) {
        this._corporateFlag = value;
    }
    public get personFlag(): boolean {
        return this._personFlag;
    }
    public set personFlag(value: boolean) {
        this._personFlag = value;
    }
    get caseloadDedBeneficiaryId(): number {
        return this._caseloadDedBeneficiaryId;
    }

    set caseloadDedBeneficiaryId(pcaseloadDedBeneficiaryId: number) {
        this._caseloadDedBeneficiaryId = pcaseloadDedBeneficiaryId;
    }


    get caseloadId(): string {
        return this._caseloadId;
    }

    set caseloadId(pcaseloadId: string) {
        this._caseloadId = pcaseloadId;
    }


    get deductionType(): string {
        return this._deductionType;
    }

    set deductionType(pdeductionType: string) {
        this._deductionType = pdeductionType;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(pamount: number) {
        this._amount = pamount;
    }

    get corporateId(): number {
        return this._corporateId;
    }

    set corporateId(pcorporateId: number) {
        this._corporateId = pcorporateId;
    }
    get createDatetime(): Date {
        return this._createDatetime;
    }

    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }

    get createUserId(): string {
        return this._createUserId;
    }

    set createUserId(pcreateUserId: string) {
        this._createUserId = pcreateUserId;
    }

    get modifyDate(): Date {
        return this._modifyDate;
    }

    set modifyDate(pmodifyDate: Date) {
        this._modifyDate = pmodifyDate;
    }
    get modifyDatetime(): Date {
        return this._modifyDatetime;
    }

    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }

    get modifyUserId(): string {
        return this._modifyUserId;
    }

    set modifyUserId(pmodifyUserId: string) {
        this._modifyUserId = pmodifyUserId;
    }

    get percent(): number {
        return this._percent;
    }

    set percent(ppercent: number) {
        this._percent = ppercent;
    }
    get personId(): number {
        return this._personId;
    }

    set personId(ppersonId: number) {
        this._personId = ppersonId;
    }
    get priority(): number {
        return this._priority;
    }

    set priority(ppriority: number) {
        this._priority = ppriority;
    }
    get sealFlag(): string {
        return this._sealFlag;
    }

    set sealFlag(psealFlag: string) {
        this._sealFlag = psealFlag;
    }

    public get corporateIdTemp(): number {
        return this._corporateIdTemp;
    }
    public set corporateIdTemp(value: number) {
        this._corporateIdTemp = value;
    }

    public get personIdTemp(): number {
        return this._personIdTemp;
    }
    public set personIdTemp(value: number) {
        this._personIdTemp = value;
    }


    get maxTotalAmount(): number { return this._maxTotalAmount; }
    set maxTotalAmount(pmaxTotalAmount: number) { this._maxTotalAmount = pmaxTotalAmount; }

    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get offenderFeeId(): number { return this._offenderFeeId; }
    set offenderFeeId(poffenderFeeId: number) { this._offenderFeeId = poffenderFeeId ; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get offFeeDedBeneficiaryId(): number { return this._offFeeDedBeneficiaryId; }
    set offFeeDedBeneficiaryId(poffFeeDedBeneficiaryId: number) { this._offFeeDedBeneficiaryId = poffFeeDedBeneficiaryId; }

    toJSON(): any {
        return {
            'caseloadDedBeneficiaryId': this._caseloadDedBeneficiaryId,
            'caseloadId': this._caseloadId,
            'deductionType': this._deductionType,
            'amount': this._amount,
            'corporateId': this._corporateId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'percent': this._percent,
            'personId': this._personId,
            'priority': this._priority,
            'sealFlag': this._sealFlag,
            'maxTotalAmount': this._maxTotalAmount,
            'caseloadType': this._caseloadType,
            'offenderBookId': this._offenderBookId,
            'offenderFeeId': this._offenderFeeId,
            'offFeeDedBeneficiaryId': this._offFeeDedBeneficiaryId
        };
    }
}
