
export class TeamMembers {
       private _createUserId: string;
       private _role: string;
       private _noOfTasks: number;
       private _teamMemberId: number;
       private _modifyUserId: string;
       private _createDateTime: Date;
       private _expiryDate: Date;
       private _serialVersionUID: number;
       private _modifyDateTime: Date;
       private _agyLocId: string;
       private _locRoleFromDate: Date;
       private _position: string;
       private _sealFlag: string;
       private _staffId: number;
       private _activeFlag: string;
       private _lastName: string;
       private _firstName: string;
       private _gender: string;
       private _teamId: number;
       private _assignFlag: boolean;
      private _scheduleType: string;
      private _hoursPerWeek: number;
      private _returnValue: number;
      private _modifyDatetime: Date;
      private _createDatetime: Date;
      private _checkFlag: string;

      private _teamFlag: boolean;
      private _intakeAgyLocId: string; 
      private _offenderBookId: number;
      private _staffName: string;
      private _agencyLocationType: string;
      private _subType: boolean;
      private _omTeam: string;
      private _userId: string;
      


       public get subType(): boolean {
              return this._subType;
       }
       public set subType(value: boolean) {
              this._subType = value;
       }

      public get offenderBookId(): number {
       return this._offenderBookId;
       }
       public set offenderBookId(value: number) {
       this._offenderBookId = value;
       }
       public get staffName(): string {
       return this._staffName;
       }
       public set staffName(value: string) {
       this._staffName = value;
       }
       public get agencyLocationType(): string {
              return this._agencyLocationType;
       }
       public set agencyLocationType(value: string) {
              this._agencyLocationType = value;
       }
       public get intakeAgyLocId(): string {
              return this._intakeAgyLocId;
       }
       public set intakeAgyLocId(value: string) {
              this._intakeAgyLocId = value;
       }
       public get teamFlag(): boolean {
              return this._teamFlag;
       }
       public set teamFlag(value: boolean) {
              this._teamFlag = value;
       }



      get checkFlag(): string { return this._checkFlag; }
    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }
      get modifyDatetime(): Date { return this._modifyDatetime; }
      set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
      get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
       get assignFlag(): boolean { return this._assignFlag; }

       set assignFlag(passignFlag: boolean) { this._assignFlag = passignFlag; }

       get teamId(): number { return this._teamId; }

       set teamId(pteamId: number) { this._teamId = pteamId; }

       get lastName(): string { return this._lastName; }

       set lastName(plastName: string) { this._lastName = plastName; }

       get firstName(): string { return this._firstName; }

       set firstName(pfirstName: string) { this._firstName = pfirstName; }

       get gender(): string { return this._gender; }

       set gender(pgender: string) { this._gender = pgender; }

       get createUserId(): string { return this._createUserId; }

       set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

       get role(): string { return this._role; }

       set role(prole: string) { this._role = prole; }

       get noOfTasks(): number { return this._noOfTasks; }

       set noOfTasks(pnoOfTasks: number) { this._noOfTasks = pnoOfTasks; }

       get teamMemberId(): number { return this._teamMemberId; }

       set teamMemberId(pteamMemberId: number) { this._teamMemberId = pteamMemberId; }

       get modifyUserId(): string { return this._modifyUserId; }

       set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

       get createDateTime(): Date { return this._createDateTime; }

       set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

       get expiryDate(): Date { return this._expiryDate; }

       set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }

       get serialVersionUID(): number { return this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get modifyDateTime(): Date { return this._modifyDateTime; }

       set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

       get agyLocId(): string { return this._agyLocId; }

       set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

       get locRoleFromDate(): Date { return this._locRoleFromDate; }

       set locRoleFromDate(plocRoleFromDate: Date) { this._locRoleFromDate = plocRoleFromDate; }

       get position(): string { return this._position; }

       set position(pposition: string) { this._position = pposition; }

       get sealFlag(): string { return this._sealFlag; }

       set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

       get staffId(): number { return this._staffId; }

       set staffId(pstaffId: number) { this._staffId = pstaffId; }

       get activeFlag(): string { return this._activeFlag; }

       set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

       get hoursPerWeek(): number { return this._hoursPerWeek; }

       set hoursPerWeek(phoursPerWeek: number) { this._hoursPerWeek = phoursPerWeek; }

       get scheduleType(): string { return this._scheduleType; }

       set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }
       get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }

    get omTeam(): string { return this._omTeam; }

       set omTeam(pomTeam: string) { this._omTeam = pomTeam; }

       get userId(): string { return this._userId; }

       set userId(puserId: string) { this._userId = puserId; }

       

       toJSON(): any {
              return {
                     'createUserId': this._createUserId,
                     'role': this._role,
                     'noOfTasks': this._noOfTasks,
                     'teamMemberId': this._teamMemberId,
                     'modifyUserId': this._modifyUserId,
                     'createDateTime': this._createDateTime,
                     'expiryDate': this._expiryDate,
                     'serialVersionUID': this._serialVersionUID,
                     'modifyDateTime': this._modifyDateTime,
                     'agyLocId': this._agyLocId,
                     'locRoleFromDate': this._locRoleFromDate,
                     'position': this._position,
                     'sealFlag': this._sealFlag,
                     'staffId': this._staffId,
                     'activeFlag': this._activeFlag,
                     'teamId': this._teamId,
                     'assignFlag': this._assignFlag,
                     'hoursPerWeek': this._hoursPerWeek,
                     'scheduleType': this._scheduleType,
                     'returnValue': this._returnValue,
                     'modifyDatetime': this._modifyDatetime,
                     'createDatetime': this._createDatetime,
                     'checkFlag': this._checkFlag,


                     'offenderBookId':this._offenderBookId,
                     'staffName':this._staffName,
                     'agencyLocationType' :this._agencyLocationType,
                     'intakeAgyLocId':this._intakeAgyLocId,
                     'teamFlag':this._teamFlag,
                     'subType':this._subType,
                     'omTeam':this._omTeam,
                     'userId':this._userId

              };
       }
}
