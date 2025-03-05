export class VCoursePhaseOfferings {

    private _programListSeq: number;
    private _providerPartyClass: string;
    private _crsInternalLocationId: number;
    private _programModuleFlag: string;
    private _cpCaseLoadType: string;
    private _offeringFlag: string;
    private _courseCaseLoadType: string;
    private _cpStartDate: Date;
    private _cpCommentText: string;
    private _serialVersionUID: number;
    private _programSessionLength: number;
    private _cpCaseLoadTypeDesc: string;
    private _phNoOfSessions: number;
    private _courseId: number;
    private _providerPartyId: number;
    private _phModuleFlag: string;
    private _cpCapacity: number;
    private _coursePhaseId: number;
    private _cpEndDate: Date;
    private _crsServicesAddressId: number;
    private _cpInternalLocationDesc: string;
    private _cpPlacementCorporateId: number;
    private _cpNoOfSessions: number;
    private _providerPartyCode: string;
    private _caseloadType: string;
    private _programNoOfSessions: number;
    private _cpExpiryDate: Date;
    private _phCapacity: number;
    private _cpSessionLength: number;
    private _programDescription: string;
    private _phListSeq: number;
    private _programCapacity: number;
    private _programPhaseId: number;
    private _phDescription: string;
    private _cpCourseActivityType: string;
    private _phSessionLength: number;
    private _cpCheckSum: number;
    private _programId: number;
    private _cpActiveFlag: string;
    private _cpListSeq: number;
    private _house: number;
    private _country: string;
    private _postalCode: string;
    private _cpServicesAddressId: number;
    private _cpInternalLocationId: number;

    private _agyLocId: string;
    private _caseloadId: string;
    private _phSessionLengthTemp: number;



    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }


    get cpInternalLocationId(): number { return this._cpInternalLocationId; }
    set cpInternalLocationId(pcpInternalLocationId: number) { this._cpInternalLocationId = pcpInternalLocationId; }

    get cpServicesAddressId(): number { return this._cpServicesAddressId; }
    set cpServicesAddressId(pcpServicesAddressId: number) { this._cpServicesAddressId = pcpServicesAddressId; }

    get house(): number { return this._house; }
    set house(phouse: number) { this._house = phouse; }

    get country(): string { return this._country; }
    set country(pcountry: string) { this._country = pcountry; }

    get postalCode(): string { return this._postalCode; }
    set postalCode(ppostalCode: string) { this._postalCode = ppostalCode; }

    get programListSeq(): number { return this._programListSeq; }
    set programListSeq(pprogramListSeq: number) { this._programListSeq = pprogramListSeq; }
    get providerPartyClass(): string { return this._providerPartyClass; }
    set providerPartyClass(pproviderPartyClass: string) { this._providerPartyClass = pproviderPartyClass; }
    get crsInternalLocationId(): number { return this._crsInternalLocationId; }
    set crsInternalLocationId(pcrsInternalLocationId: number) { this._crsInternalLocationId = pcrsInternalLocationId; }
    get programModuleFlag(): string { return this._programModuleFlag; }
    set programModuleFlag(pprogramModuleFlag: string) { this._programModuleFlag = pprogramModuleFlag; }
    get cpCaseLoadType(): string { return this._cpCaseLoadType; }
    set cpCaseLoadType(pcpCaseLoadType: string) { this._cpCaseLoadType = pcpCaseLoadType; }
    get offeringFlag(): string { return this._offeringFlag; }
    set offeringFlag(pofferingFlag: string) { this._offeringFlag = pofferingFlag; }
    get courseCaseLoadType(): string { return this._courseCaseLoadType; }
    set courseCaseLoadType(pcourseCaseLoadType: string) { this._courseCaseLoadType = pcourseCaseLoadType; }
    get cpStartDate(): Date { return this._cpStartDate; }
    set cpStartDate(pcpStartDate: Date) { this._cpStartDate = pcpStartDate; }
    get cpCommentText(): string { return this._cpCommentText; }
    set cpCommentText(pcpCommentText: string) { this._cpCommentText = pcpCommentText; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get programSessionLength(): number { return this._programSessionLength; }
    set programSessionLength(pprogramSessionLength: number) { this._programSessionLength = pprogramSessionLength; }
    get cpCaseLoadTypeDesc(): string { return this._cpCaseLoadTypeDesc; }
    set cpCaseLoadTypeDesc(pcpCaseLoadTypeDesc: string) { this._cpCaseLoadTypeDesc = pcpCaseLoadTypeDesc; }
    get phNoOfSessions(): number { return this._phNoOfSessions; }
    set phNoOfSessions(pphNoOfSessions: number) { this._phNoOfSessions = pphNoOfSessions; }
    get courseId(): number { return this._courseId; }
    set courseId(pcourseId: number) { this._courseId = pcourseId; }
    get providerPartyId(): number { return this._providerPartyId; }
    set providerPartyId(pproviderPartyId: number) { this._providerPartyId = pproviderPartyId; }
    get phModuleFlag(): string { return this._phModuleFlag; }
    set phModuleFlag(pphModuleFlag: string) { this._phModuleFlag = pphModuleFlag; }
    get cpCapacity(): number { return this._cpCapacity; }
    set cpCapacity(pcpCapacity: number) { this._cpCapacity = pcpCapacity; }
    get coursePhaseId(): number { return this._coursePhaseId; }
    set coursePhaseId(pcoursePhaseId: number) { this._coursePhaseId = pcoursePhaseId; }
    get cpEndDate(): Date { return this._cpEndDate; }
    set cpEndDate(pcpEndDate: Date) { this._cpEndDate = pcpEndDate; }
    get crsServicesAddressId(): number { return this._crsServicesAddressId; }
    set crsServicesAddressId(pcrsServicesAddressId: number) { this._crsServicesAddressId = pcrsServicesAddressId; }
    get cpInternalLocationDesc(): string { return this._cpInternalLocationDesc; }
    set cpInternalLocationDesc(pcpInternalLocationDesc: string) { this._cpInternalLocationDesc = pcpInternalLocationDesc; }
    get cpPlacementCorporateId(): number { return this._cpPlacementCorporateId; }
    set cpPlacementCorporateId(pcpPlacementCorporateId: number) { this._cpPlacementCorporateId = pcpPlacementCorporateId; }
    get cpNoOfSessions(): number { return this._cpNoOfSessions; }
    set cpNoOfSessions(pcpNoOfSessions: number) { this._cpNoOfSessions = pcpNoOfSessions; }
    get providerPartyCode(): string { return this._providerPartyCode; }
    set providerPartyCode(pproviderPartyCode: string) { this._providerPartyCode = pproviderPartyCode; }
    get caseloadType(): string { return this._caseloadType; }
    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
    get programNoOfSessions(): number { return this._programNoOfSessions; }
    set programNoOfSessions(pprogramNoOfSessions: number) { this._programNoOfSessions = pprogramNoOfSessions; }
    get cpExpiryDate(): Date { return this._cpExpiryDate; }
    set cpExpiryDate(pcpExpiryDate: Date) { this._cpExpiryDate = pcpExpiryDate; }
    get phCapacity(): number { return this._phCapacity; }
    set phCapacity(pphCapacity: number) { this._phCapacity = pphCapacity; }
    get cpSessionLength(): number { return this._cpSessionLength; }
    set cpSessionLength(pcpSessionLength: number) { this._cpSessionLength = pcpSessionLength; }
    get programDescription(): string { return this._programDescription; }
    set programDescription(pprogramDescription: string) { this._programDescription = pprogramDescription; }
    get phListSeq(): number { return this._phListSeq; }
    set phListSeq(pphListSeq: number) { this._phListSeq = pphListSeq; }
    get programCapacity(): number { return this._programCapacity; }
    set programCapacity(pprogramCapacity: number) { this._programCapacity = pprogramCapacity; }
    get programPhaseId(): number { return this._programPhaseId; }
    set programPhaseId(pprogramPhaseId: number) { this._programPhaseId = pprogramPhaseId; }
    get phDescription(): string { return this._phDescription; }
    set phDescription(pphDescription: string) { this._phDescription = pphDescription; }
    get cpCourseActivityType(): string { return this._cpCourseActivityType; }
    set cpCourseActivityType(pcpCourseActivityType: string) { this._cpCourseActivityType = pcpCourseActivityType; }
    get phSessionLength(): number { return this._phSessionLength; }
    set phSessionLength(pphSessionLength: number) { this._phSessionLength = pphSessionLength; }
    get cpCheckSum(): number { return this._cpCheckSum; }
    set cpCheckSum(pcpCheckSum: number) { this._cpCheckSum = pcpCheckSum; }
    get programId(): number { return this._programId; }
    set programId(pprogramId: number) { this._programId = pprogramId; }
    get cpActiveFlag(): string { return this._cpActiveFlag; }
    set cpActiveFlag(pcpActiveFlag: string) { this._cpActiveFlag = pcpActiveFlag; }
    get cpListSeq(): number { return this._cpListSeq; }
    set cpListSeq(pcpListSeq: number) { this._cpListSeq = pcpListSeq; }

    get phSessionLengthTemp(): number { return this._phSessionLengthTemp; }
    set phSessionLengthTemp(pphSessionLengthTemp: number) { this._phSessionLengthTemp = pphSessionLengthTemp; }

    toJSON(): any {
        return {
            'programListSeq': this._programListSeq,
            'providerPartyClass': this._providerPartyClass,
            'crsInternalLocationId': this._crsInternalLocationId,
            'programModuleFlag': this._programModuleFlag,
            'cpCaseLoadType': this._cpCaseLoadType,
            'offeringFlag': this._offeringFlag,
            'courseCaseLoadType': this._courseCaseLoadType,
            'cpStartDate': this._cpStartDate,
            'cpCommentText': this._cpCommentText,
            'serialVersionUID': this._serialVersionUID,
            'programSessionLength': this._programSessionLength,
            'cpCaseLoadTypeDesc': this._cpCaseLoadTypeDesc,
            'phNoOfSessions': this._phNoOfSessions,
            'courseId': this._courseId,
            'providerPartyId': this._providerPartyId,
            'phModuleFlag': this._phModuleFlag,
            'cpCapacity': this._cpCapacity,
            'coursePhaseId': this._coursePhaseId,
            'cpEndDate': this._cpEndDate,
            'crsServicesAddressId': this._crsServicesAddressId,
            'cpInternalLocationDesc': this._cpInternalLocationDesc,
            'cpPlacementCorporateId': this._cpPlacementCorporateId,
            'cpNoOfSessions': this._cpNoOfSessions,
            'providerPartyCode': this._providerPartyCode,
            'caseloadType': this._caseloadType,
            'programNoOfSessions': this._programNoOfSessions,
            'cpExpiryDate': this._cpExpiryDate,
            'phCapacity': this._phCapacity,
            'cpSessionLength': this._cpSessionLength,
            'programDescription': this._programDescription,
            'phListSeq': this._phListSeq,
            'programCapacity': this._programCapacity,
            'programPhaseId': this._programPhaseId,
            'phDescription': this._phDescription,
            'cpCourseActivityType': this._cpCourseActivityType,
            'phSessionLength': this._phSessionLength,
            'cpCheckSum': this._cpCheckSum,
            'programId': this._programId,
            'cpActiveFlag': this._cpActiveFlag,
            'cpListSeq': this._cpListSeq,
            'postalCode': this._postalCode,
            'country': this._country,
            'house': this._house,
            'cpServicesAddressId': this._cpServicesAddressId,
            'cpInternalLocationId': this._cpInternalLocationId,
            'agyLocId': this._agyLocId,
            'caseloadId' : this.caseloadId,
            'phSessionLengthTemp': this._phSessionLengthTemp


        };
    }





}