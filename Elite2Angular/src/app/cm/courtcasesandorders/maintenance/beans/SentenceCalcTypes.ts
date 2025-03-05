

export class SentenceCalcTypes {
    private _activeFlag: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _description: string;
    private _expiryDate: Date;
    private _functionType: string;
    private _nbtFunctionType: string;
    private _headerLabel: string;
    private _headerSeq: number;
    private _listSeq: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _programMethod: string;
    private _sealFlag: string;
    private _sentenceType: string;
    private _sentenceCategory: string;
    private _sentenceCalcType: string;
    private _nbtProgMethod: string;

    private _aggregateFlag: string;
    private _vclObligationFlag: string;
    private _hoursSummaryFlag: string;
    private _supervisionExpiryDateFlag: string;
    private _generateHours: string;
    private _sentenceCalc: string;
    private _instDescription: string;
    private _expiryMonths: number;
    private _programHoursMin: number;
    private _programHoursMax: number;
    private _workHoursMin: number;
    private _workHoursMax: number;
    private _aggregateFlagBolean: boolean;
    private _vclObligationFlagBolean: boolean;
    private _hoursSummaryFlagBolean: boolean;
    private _supervisionExpiryDateFlagBolean: boolean;
    private _generateHoursBolean: boolean;
    private _sentenceCalcFlagBolean: boolean;

    private _aggregateFlagBoleanTemp: boolean;
    private _vclObligationFlagBoleanTemp: boolean;
    private _hoursSummaryFlagBoleanTemp: boolean;
    private _supervisionExpiryDateFlagBoleanTemp: boolean;
    private _generateHoursBoleanTemp: boolean;
    private _sentenceCalcFlagBoleanTemp: boolean;


    private _instDescriptionTemp: string;
    private _expiryMonthsTemp: number;
    private _programHoursMinTemp: number;
    private _programHoursMaxTemp: number;
    private _workHoursMinTemp: number;
    private _workHoursMaxTemp: number;

    private _aggregateFlagTemp: string;
    private _vclObligationFlagTemp: string;
    private _hoursSummaryFlagTemp: string;
    private _supervisionExpiryDateFlagTemp: string;
    private _sanctionsFlag: string;
    private _chargesFlag: any;

    get aggregateFlagTemp(): string { return this._aggregateFlagTemp; }
    set aggregateFlagTemp(paggregateFlagTemp: string) { this._aggregateFlagTemp = paggregateFlagTemp; }
    get vclObligationFlagTemp(): string { return this._vclObligationFlagTemp; }
    set vclObligationFlagTemp(pvclObligationFlagTemp: string) { this._vclObligationFlagTemp = pvclObligationFlagTemp; }
    get hoursSummaryFlagTemp(): string { return this._hoursSummaryFlagTemp; }
    set hoursSummaryFlagTemp(phoursSummaryFlagTemp: string) { this._hoursSummaryFlagTemp = phoursSummaryFlagTemp; }
    get supervisionExpiryDateFlagTemp(): string { return this._supervisionExpiryDateFlagTemp; }
    set supervisionExpiryDateFlagTemp(psupervisionExpiryDateFlagTemp: string) { this._supervisionExpiryDateFlagTemp = psupervisionExpiryDateFlagTemp; }

    get instDescriptionTemp(): string { return this._instDescriptionTemp; }
    set instDescriptionTemp(pinstDescriptionTemp: string) { this._instDescriptionTemp = pinstDescriptionTemp; }

    get expiryMonthsTemp(): number { return this._expiryMonthsTemp; }
    set expiryMonthsTemp(pexpiryMonthsTemp: number) { this._expiryMonthsTemp = pexpiryMonthsTemp; }
    get programHoursMinTemp(): number { return this._programHoursMinTemp; }
    set programHoursMinTemp(pprogramHoursMinTemp: number) { this._programHoursMinTemp = pprogramHoursMinTemp; }
    get programHoursMaxTemp(): number { return this._programHoursMaxTemp; }
    set programHoursMaxTemp(pprogramHoursMaxTemp: number) { this._programHoursMaxTemp = pprogramHoursMaxTemp; }
    get workHoursMinTemp(): number { return this._workHoursMinTemp; }
    set workHoursMinTemp(pworkHoursMinTemp: number) { this._workHoursMinTemp = pworkHoursMinTemp; }
    get workHoursMaxTemp(): number { return this._workHoursMaxTemp; }
    set workHoursMaxTemp(pworkHoursMaxTemp: number) { this._workHoursMaxTemp = pworkHoursMaxTemp; }





    get aggregateFlagBoleanTemp(): boolean { return this._aggregateFlagBoleanTemp; }
    set aggregateFlagBoleanTemp(paggregateFlagBoleanTemp: boolean) { this._aggregateFlagBoleanTemp = paggregateFlagBoleanTemp; }

    get vclObligationFlagBoleanTemp(): boolean { return this._vclObligationFlagBoleanTemp; }
    set vclObligationFlagBoleanTemp(pvclObligationFlagBoleanTemp: boolean) { this._vclObligationFlagBoleanTemp = pvclObligationFlagBoleanTemp; }
    get hoursSummaryFlagBoleanTemp(): boolean { return this._hoursSummaryFlagBoleanTemp; }
    set hoursSummaryFlagBoleanTemp(phoursSummaryFlagBoleanTemp: boolean) { this._hoursSummaryFlagBoleanTemp = phoursSummaryFlagBoleanTemp; }
    get supervisionExpiryDateFlagBoleanTemp(): boolean { return this._supervisionExpiryDateFlagBoleanTemp; }
    set supervisionExpiryDateFlagBoleanTemp(psupervisionExpiryDateFlagBoleanTemp: boolean) {
        this._supervisionExpiryDateFlagBoleanTemp = psupervisionExpiryDateFlagBoleanTemp;
    }
    get generateHoursBoleanTemp(): boolean { return this._generateHoursBoleanTemp; }
    set generateHoursBoleanTemp(pgenerateHoursBoleanTemp: boolean) { this._generateHoursBoleanTemp = pgenerateHoursBoleanTemp; }
    get sentenceCalcFlagBoleanTemp(): boolean { return this._sentenceCalcFlagBoleanTemp; }
    set sentenceCalcFlagBoleanTemp(psentenceCalcFlagBoleanTemp: boolean) { this._sentenceCalcFlagBoleanTemp = psentenceCalcFlagBoleanTemp; }


    get aggregateFlagBolean(): boolean { return this._aggregateFlagBolean; }
    set aggregateFlagBolean(paggregateFlagBolean: boolean) { this._aggregateFlagBolean = paggregateFlagBolean; }

    get vclObligationFlagBolean(): boolean { return this._vclObligationFlagBolean; }
    set vclObligationFlagBolean(pvclObligationFlagBolean: boolean) { this._vclObligationFlagBolean = pvclObligationFlagBolean; }
    get hoursSummaryFlagBolean(): boolean { return this._hoursSummaryFlagBolean; }
    set hoursSummaryFlagBolean(phoursSummaryFlagBolean: boolean) { this._hoursSummaryFlagBolean = phoursSummaryFlagBolean; }
    get supervisionExpiryDateFlagBolean(): boolean { return this._supervisionExpiryDateFlagBolean; }
    set supervisionExpiryDateFlagBolean(psupervisionExpiryDateFlagBolean: boolean) {
        this._supervisionExpiryDateFlagBolean = psupervisionExpiryDateFlagBolean;
    }
    get generateHoursBolean(): boolean { return this._generateHoursBolean; }
    set generateHoursBolean(pgenerateHoursBolean: boolean) { this._generateHoursBolean = pgenerateHoursBolean; }
    get sentenceCalcFlagBolean(): boolean { return this._sentenceCalcFlagBolean; }
    set sentenceCalcFlagBolean(psentenceCalcFlagBolean: boolean) { this._sentenceCalcFlagBolean = psentenceCalcFlagBolean; }

    get aggregateFlag(): string { return this._aggregateFlag; }
    set aggregateFlag(paggregateFlag: string) { this._aggregateFlag = paggregateFlag; }
    get vclObligationFlag(): string { return this._vclObligationFlag; }
    set vclObligationFlag(pvclObligationFlag: string) { this._vclObligationFlag = pvclObligationFlag; }
    get hoursSummaryFlag(): string { return this._hoursSummaryFlag; }
    set hoursSummaryFlag(phoursSummaryFlag: string) { this._hoursSummaryFlag = phoursSummaryFlag; }
    get supervisionExpiryDateFlag(): string { return this._supervisionExpiryDateFlag; }
    set supervisionExpiryDateFlag(psupervisionExpiryDateFlag: string) { this._supervisionExpiryDateFlag = psupervisionExpiryDateFlag; }
    get generateHours(): string { return this._generateHours; }
    set generateHours(pgenerateHours: string) { this._generateHours = pgenerateHours; }
    get sentenceCalc(): string { return this._sentenceCalc; }
    set sentenceCalc(psentenceCalc: string) { this._sentenceCalc = psentenceCalc; }
    get instDescription(): string { return this._instDescription; }
    set instDescription(pinstDescription: string) { this._instDescription = pinstDescription; }

    get expiryMonths(): number { return this._expiryMonths; }
    set expiryMonths(pexpiryMonths: number) { this._expiryMonths = pexpiryMonths; }
    get programHoursMin(): number { return this._programHoursMin; }
    set programHoursMin(pprogramHoursMin: number) { this._programHoursMin = pprogramHoursMin; }
    get programHoursMax(): number { return this._programHoursMax; }
    set programHoursMax(pprogramHoursMax: number) { this._programHoursMax = pprogramHoursMax; }
    get workHoursMin(): number { return this._workHoursMin; }
    set workHoursMin(pworkHoursMin: number) { this._workHoursMin = pworkHoursMin; }
    get workHoursMax(): number { return this._workHoursMax; }
    set workHoursMax(pworkHoursMax: number) { this._workHoursMax = pworkHoursMax; }

    // private _sentenceTerms: Array<SentenceTerms>;
    // private _sentenceUpdateReasons: Array<SentenceUpdateReasons>;

    // private List<SentenceTerms> sentenceTerms;

    // // bi-directional many-to-one association to SentenceUpdateReason
    // private List<SentenceUpdateReasons> sentenceUpdateReasons;

    get nbtProgMethod(): string { return this._nbtProgMethod; }
    set nbtProgMethod(pnbtProgMethod: string) { this._nbtProgMethod = pnbtProgMethod; }


    get activeFlag(): string { return this._activeFlag; }
    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) {
        this._createDatetime = pcreateDatetime;
    }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }


    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) {
        this._expiryDate = pexpiryDate;
    }

    get functionType(): string { return this._functionType; }
    set functionType(pfunctionType: string) { this._functionType = pfunctionType; }

    get nbtFunctionType(): string { return this._nbtFunctionType; }
    set nbtFunctionType(pnbtFunctionType: string) { this._nbtFunctionType = pnbtFunctionType; }

    get headerLabel(): string { return this._headerLabel; }
    set headerLabel(pheaderLabel: string) { this._headerLabel = pheaderLabel; }

    get headerSeq(): number { return this._headerSeq; }
    set headerSeq(pheaderSeq: number) { this._headerSeq = pheaderSeq; }

    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) {
        this._modifyDatetime = pmodifyDatetime;
    }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get programMethod(): string { return this._programMethod; }
    set programMethod(pprogramMethod: string) { this._programMethod = pprogramMethod; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get sentenceType(): string { return this._sentenceType; }
    set sentenceType(psentenceType: string) { this._sentenceType = psentenceType; }

    get sentenceCategory(): string { return this._sentenceCategory; }
    set sentenceCategory(psentenceCategory: string) { this._sentenceCategory = psentenceCategory; }

    get sentenceCalcType(): string { return this._sentenceCalcType; }
    set sentenceCalcType(psentenceCalcType: string) { this._sentenceCalcType = psentenceCalcType; }

    get sanctionsFlag(): string { return this._sanctionsFlag; }
    set sanctionsFlag(psanctionsFlag: string) { this._sanctionsFlag = psanctionsFlag; }

    get chargesFlag(): any { return this._chargesFlag; }
    set chargesFlag(pchargesFlag: any) { this._chargesFlag = pchargesFlag; }

    toJSON(): any {
        return {
            'activeFlag': this._activeFlag,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'description': this._description,
            'expiryDate': this._expiryDate,
            'functionType': this._functionType,
            'headerLabel': this._headerLabel,
            'headerSeq': this._headerSeq,
            'listSeq': this._listSeq,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'programMethod': this._programMethod,
            'sealFlag': this._sealFlag,
            'sentenceType': this._sentenceType,
            'sentenceCategory': this._sentenceCategory,
            'sentenceCalcType': this._sentenceCalcType,
            'nbtProgMethod': this._nbtProgMethod,
            'nbtFunctionType': this._nbtFunctionType,
            'aggregateFlag': this._aggregateFlag,
            'vclObligationFlag': this._vclObligationFlag,
            'hoursSummaryFlag': this._hoursSummaryFlag,
            'supervisionExpiryDateFlag': this._supervisionExpiryDateFlag,
            'generateHours': this._generateHours,
            'sentenceCalc': this._sentenceCalc,
            'instDescription': this._instDescription,
            'expiryMonths': this._expiryMonths,
            'programHoursMin': this._programHoursMin,
            'programHoursMax': this._programHoursMax,
            'workHoursMin': this._workHoursMin,
            'workHoursMax': this._workHoursMax,
            'aggregateFlagBolean': this._aggregateFlagBolean,
            'vclObligationFlagBolean': this._vclObligationFlagBolean,
            'hoursSummaryFlagBolean': this._hoursSummaryFlagBolean,
            'supervisionExpiryDateFlagBolean': this._supervisionExpiryDateFlagBolean,
            'generateHoursBolean': this._generateHoursBolean,
            'sentenceCalcFlagBolean': this._sentenceCalcFlagBolean,
            'aggregateFlagBoleanTemp': this._aggregateFlagBoleanTemp,
            'vclObligationFlagBoleanTemp': this._vclObligationFlagBoleanTemp,
            'hoursSummaryFlagBoleanTemp': this._hoursSummaryFlagBoleanTemp,
            'supervisionExpiryDateFlagBoleanTemp': this._supervisionExpiryDateFlagBoleanTemp,
            'generateHoursBoleanTemp': this._generateHoursBoleanTemp,
            'sentenceCalcFlagBoleanTemp': this._sentenceCalcFlagBoleanTemp,
            'instDescriptionTemp': this._instDescriptionTemp,
            'expiryMonthsTemp': this._expiryMonthsTemp,
            'programHoursMinTemp': this._programHoursMinTemp,
            'programHoursMaxTemp': this._programHoursMaxTemp,
            'workHoursMinTemp': this._workHoursMinTemp,
            'workHoursMaxTemp': this._workHoursMaxTemp,
            'aggregateFlagTemp': this._aggregateFlagTemp,
            'vclObligationFlagTemp': this._vclObligationFlagTemp,
            'hoursSummaryFlagTemp': this._hoursSummaryFlagTemp,
            'supervisionExpiryDateFlagTemp': this._supervisionExpiryDateFlagTemp,
            'sanctionsFlag': this._sanctionsFlag,
            'chargesFlag': this._chargesFlag,
        };
    }
}
