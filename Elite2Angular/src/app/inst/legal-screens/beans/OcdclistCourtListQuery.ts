
export class OcdclistCourtListQuery {
        private _pCheckSum: number;
        private _pStartTime: Date;
        private _pOffBkgId: number;
        private _pCaseInfoprefix: string;
        private _pCaseId: number;
        private _errorMessage: string;
        private _pCourtDate: Date;
        private _pLastName: string;
        private _pEventId: number;
        private _pStartDate: Date;
        private _inserted: number;
        private _pCourtEventType: string;
        private _pMiddleName: string;
        private _pAgyLocId: string;
        private _pBirthDate: Date;
        private _pOffDisplay: string;
        private _pCaseInfoNumber: string;
        private _pFirstName: string;
        private _pCourtEventTypeDesc: string;
        private _pEventStatus: string;
        private _matter: string;
        private _appearanceType: string;
        private _appearanceLocation: string;

        private _outcomeReasonCode: string;
		 private _cancelFlag: boolean;
    

        get pEventStatus(): string { return  this._pEventStatus; }

       set pEventStatus(ppEventStatus: string) { this._pEventStatus = ppEventStatus ; }

        get pCheckSum(): number { return  this._pCheckSum; }

        set pCheckSum(ppCheckSum: number) { this._pCheckSum = ppCheckSum ; }

        get pStartTime(): Date { return  this._pStartTime; }

        set pStartTime(ppStartTime: Date) { this._pStartTime = ppStartTime; }

        get pOffBkgId(): number { return  this._pOffBkgId; }

        set pOffBkgId(ppOffBkgId: number) { this._pOffBkgId = ppOffBkgId; }

        get pCaseInfoprefix(): string { return  this._pCaseInfoprefix; }

        set pCaseInfoprefix(ppCaseInfoprefix: string) { this._pCaseInfoprefix = ppCaseInfoprefix; }

        get pCaseId(): number { return  this._pCaseId; }

        set pCaseId(ppCaseId: number) { this._pCaseId = ppCaseId; }

        get errorMessage(): string { return  this._errorMessage; }

        set errorMessage(perrorMessage: string) { this._errorMessage = perrorMessage; }

        get pCourtDate(): Date { return  this._pCourtDate; }

        set pCourtDate(ppCourtDate: Date) { this._pCourtDate = ppCourtDate; }

        get pLastName(): string { return  this._pLastName; }

        set pLastName(ppLastName: string) { this._pLastName = ppLastName; }

        get pEventId(): number { return  this._pEventId; }

        set pEventId(ppEventId: number) { this._pEventId = ppEventId; }

        get pStartDate(): Date { return  this._pStartDate; }

        set pStartDate(ppStartDate: Date) { this._pStartDate = ppStartDate; }

        get inserted(): number { return  this._inserted; }

        set inserted(pinserted: number) { this._inserted = pinserted; }

        get pCourtEventType(): string { return  this._pCourtEventType; }

        set pCourtEventType(ppCourtEventType: string) { this._pCourtEventType = ppCourtEventType; }

        get pMiddleName(): string { return  this._pMiddleName; }

        set pMiddleName(ppMiddleName: string) { this._pMiddleName = ppMiddleName; }

        get pAgyLocId(): string { return  this._pAgyLocId; }

        set pAgyLocId(ppAgyLocId: string) { this._pAgyLocId = ppAgyLocId; }

        get pBirthDate(): Date { return  this._pBirthDate; }

        set pBirthDate(ppBirthDate: Date) { this._pBirthDate = ppBirthDate; }

        get pOffDisplay(): string { return  this._pOffDisplay; }

        set pOffDisplay(ppOffDisplay: string) { this._pOffDisplay = ppOffDisplay; }

        get pCaseInfoNumber(): string { return  this._pCaseInfoNumber; }

        set pCaseInfoNumber(ppCaseInfoNumber: string) { this._pCaseInfoNumber = ppCaseInfoNumber; }

        get pFirstName(): string { return  this._pFirstName; }

        set pFirstName(ppFirstName: string) { this._pFirstName = ppFirstName; }

        get pCourtEventTypeDesc(): string { return  this._pCourtEventTypeDesc; }

        set pCourtEventTypeDesc(ppCourtEventTypeDesc: string) { this._pCourtEventTypeDesc = ppCourtEventTypeDesc; }

        get matter(): string { return this._matter; }

        set matter(value: string) {  this._matter = value;  }

        public get appearanceType(): string { return this._appearanceType; }

        public set appearanceType(value: string) { this._appearanceType = value; }

        public get appearanceLocation(): string { return this._appearanceLocation;    }

        public set appearanceLocation(value: string) { this._appearanceLocation = value;  }
        public get cancelFlag(): boolean {
            return this._cancelFlag;
        }
        public set cancelFlag(value: boolean) {
            this._cancelFlag = value;
        }
        public get outcomeReasonCode(): string {
            return this._outcomeReasonCode;
        }
        public set outcomeReasonCode(value: string) {
            this._outcomeReasonCode = value;
        }

    toJSON(): any {
        return {
            'pCheckSum': this._pCheckSum,
            'pStartTime': this._pStartTime,
            'pOffBkgId': this._pOffBkgId,
            'pCaseInfoprefix': this._pCaseInfoprefix,
            'pCaseId': this._pCaseId,
            'errorMessage': this._errorMessage,
            'pCourtDate': this._pCourtDate,
            'pLastName': this._pLastName,
            'pEventId': this._pEventId,
            'pStartDate': this._pStartDate,
            'inserted': this._inserted,
            'pCourtEventType': this._pCourtEventType,
            'pMiddleName': this._pMiddleName,
            'pAgyLocId': this._pAgyLocId,
            'pBirthDate': this._pBirthDate,
            'pOffDisplay': this._pOffDisplay,
            'pCaseInfoNumber': this._pCaseInfoNumber,
            'pFirstName': this._pFirstName,
            'pCourtEventTypeDesc': this._pCourtEventTypeDesc,
            'pEventStatus': this._pEventStatus,
            'matter': this._matter,
            'appearanceType': this._appearanceType,
            'appearanceLocation': this._appearanceLocation,
            'cancelFlag': this._cancelFlag,
            'outcomeReasonCode': this._outcomeReasonCode
        };
    }
 }
