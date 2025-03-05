    export class VGrievanceInquiry {
         private _grievLevel: string;
         private _offenderBookId: number;
         private _offenderIdDisplay: string;
         private _toDate: Date;
         private _assignedStaffId: number;
         private _daysRem: number;
         private _fromDate: Date;
         private _serialVersionUID: number;
         private _grievType: string;
         private _reportDate: Date;
         private _agyLocId: string;
         private _grievanceId: number;
         private _offenderId: number;
         private _offName: string;
         private _userInvolvement: string;
         private _supervisorReviewed: string;
         private _noSupervisorReviewed: string;
         private _grievReasonCode: string;
         private _grievReasonCodeDesc: string;
         private _txnType: string;
         private _txnTypeDesc: string;
         
         
         get grievLevel(): string { return  this._grievLevel; }

         set grievLevel(pgrievLevel: string) { this._grievLevel = pgrievLevel; }

         get offenderBookId(): number { return  this._offenderBookId; }

         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

         get offenderIdDisplay(): string { return  this._offenderIdDisplay; }

         set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

         get toDate(): Date { return  this._toDate; }

         set toDate(ptoDate: Date) { this._toDate = ptoDate; }

         get assignedStaffId(): number { return  this._assignedStaffId; }

         set assignedStaffId(passignedStaffId: number) { this._assignedStaffId = passignedStaffId; }

         get daysRem(): number { return  this._daysRem; }

         set daysRem(pdaysRem: number) { this._daysRem = pdaysRem; }

         get fromDate(): Date { return  this._fromDate; }

         set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get grievType(): string { return  this._grievType; }

         set grievType(pgrievType: string) { this._grievType = pgrievType; }

         get reportDate(): Date { return  this._reportDate; }

         set reportDate(preportDate: Date) { this._reportDate = preportDate; }

         get agyLocId(): string { return  this._agyLocId; }

         set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

         get grievanceId(): number { return  this._grievanceId; }

         set grievanceId(pgrievanceId: number) { this._grievanceId = pgrievanceId; }

         get offenderId(): number { return  this._offenderId; }

         set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

         get offName(): string { return  this._offName; }

         set offName(poffName: string) { this._offName = poffName; }

         get userInvolvement(): string  { return  this._userInvolvement; }

         set userInvolvement(puserInvolvement: string)  { this._userInvolvement = puserInvolvement; }

         get supervisorReviewed(): string  { return  this._supervisorReviewed; }

         set supervisorReviewed(psupervisorReviewed: string)  { this._supervisorReviewed = psupervisorReviewed; }

         get noSupervisorReviewed(): string  { return  this._noSupervisorReviewed; }

         set noSupervisorReviewed(pnoSupervisorReviewed: string)  { this._noSupervisorReviewed = pnoSupervisorReviewed; }

         get grievReasonCode(): string { return this._grievReasonCode; }
        set grievReasonCode(pgrievReasonCode: string) { this._grievReasonCode = pgrievReasonCode; }

        get grievReasonCodeDesc(): string { return this._grievReasonCodeDesc; }
        set grievReasonCodeDesc(pgrievReasonCodeDesc: string) { this._grievReasonCodeDesc = pgrievReasonCodeDesc; }

        get txnType(): string { return this._txnType; }
        set txnType(ptxnType: string) { this._txnType = ptxnType; }

        get txnTypeDesc(): string { return this._txnTypeDesc; }
        set txnTypeDesc(ptxnTypeDesc: string) { this._txnTypeDesc = ptxnTypeDesc; }

     toJSON(): any {
         return {
            'grievLevel': this._grievLevel,
            'offenderBookId': this._offenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'toDate': this._toDate,
            'assignedStaffId': this._assignedStaffId,
            'daysRem': this._daysRem,
            'fromDate': this._fromDate,
            'serialVersionUID': this._serialVersionUID,
            'grievType': this._grievType,
            'reportDate': this._reportDate,
            'agyLocId': this._agyLocId,
            'grievanceId': this._grievanceId,
            'offenderId': this._offenderId,
            'offName': this._offName,
            'userInvolvement': this._userInvolvement,
            'supervisorReviewed': this._supervisorReviewed,
            'noSupervisorReviewed': this._noSupervisorReviewed,
            'grievReasonCode': this._grievReasonCode,
            'grievReasonCodeDesc':this._grievReasonCodeDesc,
            'txnType': this._txnType,
            'txnTypeDesc': this._txnTypeDesc
             };
         }
 }
