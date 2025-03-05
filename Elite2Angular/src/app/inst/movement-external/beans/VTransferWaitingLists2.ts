export class VTransferWaitingLists2 {
           private _eventId: number;
           private _lastName: string;
           private _waitListStatus: string;
           private _offenderBookId: number;
           private _offenderIdDisplay: string;
           private _errorMessage: string;
           private _transferPriority: string;
           private _agencyLocationTo: string;
           private _outcomeReasonCode: string;
           private _serialVersionUID: number;
           private _approvedFlag: string;
           private _checkSum: number;
           private _requestedDate: Date;
           private _activeFlag: string;
           private _rootOffenderId: number;
           private _firstName: string;
           private _agyLocId: string;

           get eventId(): number { return  this._eventId; }

           set eventId(peventId: number) {   this._eventId = peventId; }

           get lastName(): string {   return  this._lastName; }

           set lastName(plastName: string) {   this._lastName = plastName; }

           get waitListStatus(): string {   return  this._waitListStatus; }

           set waitListStatus(pwaitListStatus: string) {   this._waitListStatus = pwaitListStatus; }

           get offenderBookId(): number {   return  this._offenderBookId; }

           set offenderBookId(poffenderBookId: number) {   this._offenderBookId = poffenderBookId; }

           get offenderIdDisplay(): string {   return  this._offenderIdDisplay; }

           set offenderIdDisplay(poffenderIdDisplay: string) {   this._offenderIdDisplay = poffenderIdDisplay; }

           get errorMessage(): string {   return  this._errorMessage; }

           set errorMessage(perrorMessage: string) {   this._errorMessage = perrorMessage; }

           get transferPriority(): string {   return  this._transferPriority; }

           set transferPriority(ptransferPriority: string) {   this._transferPriority = ptransferPriority; }

           get agencyLocationTo(): string {   return  this._agencyLocationTo; }

           set agencyLocationTo(pagencyLocationTo: string) {   this._agencyLocationTo = pagencyLocationTo; }

           get outcomeReasonCode(): string {   return  this._outcomeReasonCode; }

           set outcomeReasonCode(poutcomeReasonCode: string) {   this._outcomeReasonCode = poutcomeReasonCode; }

           get serialVersionUID(): number {   return  this._serialVersionUID; }

           set serialVersionUID(pserialVersionUID: number) {   this._serialVersionUID = pserialVersionUID; }

           get approvedFlag(): string {   return  this._approvedFlag; }

           set approvedFlag(papprovedFlag: string) {   this._approvedFlag = papprovedFlag; }

           get checkSum(): number {   return  this._checkSum; }

           set checkSum(pcheckSum: number) {   this._checkSum = pcheckSum; }

           get requestedDate(): Date {   return  this._requestedDate; }

           set requestedDate(prequestedDate: Date) {   this._requestedDate = prequestedDate; }

           get activeFlag(): string {   return  this._activeFlag; }

             set activeFlag(pactiveFlag: string) {   this._activeFlag = pactiveFlag; }

             get rootOffenderId(): number {   return  this._rootOffenderId; }

             set rootOffenderId(prootOffenderId: number) {   this._rootOffenderId = prootOffenderId; }

             get firstName(): string {   return  this._firstName; }

             set firstName(pfirstName: string) {   this._firstName = pfirstName; }

             get agyLocId(): string {   return  this._agyLocId; }

             set agyLocId(pagyLocId: string) {   this._agyLocId = pagyLocId; }


      toJSON(): any {
           return {
               'eventId': this._eventId,
               'lastName': this._lastName,
               'waitListStatus': this._waitListStatus,
               'offenderBookId': this._offenderBookId,
               'offenderIdDisplay': this._offenderIdDisplay,
               'errorMessage': this._errorMessage,
               'transferPriority': this._transferPriority,
               'agencyLocationTo': this._agencyLocationTo,
               'outcomeReasonCode': this._outcomeReasonCode,
               'serialVersionUID': this._serialVersionUID,
               'approvedFlag': this._approvedFlag,
               'checkSum': this._checkSum,
               'requestedDate': this._requestedDate,
               'activeFlag': this._activeFlag,
               'rootOffenderId': this._rootOffenderId,
               'firstName': this._firstName,
               'agyLocId': this._agyLocId,

                };
           }
 }
