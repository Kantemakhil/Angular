import { BaseModel } from '@commonbeans/BaseModel';
export class NonAdmittedInmateMvmts extends BaseModel {
        private _lastName: string;
        private _createUserId: string;
        private _ssnId: string;
        private _modifyDatetime: Date;
        private _tmpGroupId: number;
        private _modifyUserId: string;
        private _responsibleAgency: string;
        private _toAgySeq: number;
        private _movementCommentText: string;
        private _alternateAgyLocId: string;
        private _sealFlag: string;
        private _toAgyLocId: string;
        private _mvmtType: string;
        private _algoComment: string;
        private _fromAgySeq: number;
        private _nonAdmInmateId: number;
        private _emergencyContact: string;
        private _scheduledTripId: number;
        private _birthDate: Date;
        private _inmateCommentText: string;
        private _createDatetime: Date;
        private _firstName: string;
        private _sexCode: string;
        private _inmateId: string;
        private _mvmtReasonCode: string;
        private _fromAgyLocId: string;
        private _raceCode: string;
        private _eventDate: Date;
        private _offenderId: string;
        private  _sex: string;
        private _stgAff: string;
        private _alerts: string;
        private _sanct: string;
        private _ethn: string;
        private _secLev: string;
        private _impSts: string;
        private _ssn: string;
        private _NonAss:string;
        private _poteSch:string;


        get lastName(): string{ return this._lastName; }
        set lastName(plastName: string){ this._lastName = plastName ;}
        get createUserId(): string{ return this._createUserId; }
        set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
        get ssnId(): string{ return this._ssnId; }
        set ssnId(pssnId: string){ this._ssnId = pssnId ;}
        get modifyDatetime(): Date{ return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
        get tmpGroupId(): number{ return this._tmpGroupId; }
        set tmpGroupId(ptmpGroupId: number){ this._tmpGroupId = ptmpGroupId ;}
        get modifyUserId(): string{ return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
        get responsibleAgency(): string{ return this._responsibleAgency; }
        set responsibleAgency(presponsibleAgency: string){ this._responsibleAgency = presponsibleAgency ;}
        get toAgySeq(): number{ return this._toAgySeq; }
        set toAgySeq(ptoAgySeq: number){ this._toAgySeq = ptoAgySeq ;}
        get movementCommentText(): string{ return this._movementCommentText; }
        set movementCommentText(pmovementCommentText: string){ this._movementCommentText = pmovementCommentText ;}
        get alternateAgyLocId(): string{ return this._alternateAgyLocId; }
        set alternateAgyLocId(palternateAgyLocId: string){ this._alternateAgyLocId = palternateAgyLocId ;}
        get sealFlag(): string{ return this._sealFlag; }
        set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
        get toAgyLocId(): string{ return this._toAgyLocId; }
        set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
        get mvmtType(): string{ return this._mvmtType; }
        set mvmtType(pmvmtType: string){ this._mvmtType = pmvmtType ;}
        get algoComment(): string{ return this._algoComment; }
        set algoComment(palgoComment: string){ this._algoComment = palgoComment ;}
        get fromAgySeq(): number{ return this._fromAgySeq; }
        set fromAgySeq(pfromAgySeq: number){ this._fromAgySeq = pfromAgySeq ;}
        get nonAdmInmateId(): number{ return this._nonAdmInmateId; }
        set nonAdmInmateId(pnonAdmInmateId: number){ this._nonAdmInmateId = pnonAdmInmateId ;}
        get emergencyContact(): string{ return this._emergencyContact; }
        set emergencyContact(pemergencyContact: string){ this._emergencyContact = pemergencyContact ;}
        get scheduledTripId(): number{ return this._scheduledTripId; }
        set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
        get birthDate(): Date{ return this._birthDate; }
        set birthDate(pbirthDate: Date){ this._birthDate = pbirthDate ;}
        get inmateCommentText(): string{ return this._inmateCommentText; }
        set inmateCommentText(pinmateCommentText: string){ this._inmateCommentText = pinmateCommentText ;}
        get createDatetime(): Date{ return this._createDatetime; }
        set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
        get firstName(): string{ return this._firstName; }
        set firstName(pfirstName: string){ this._firstName = pfirstName ;}
        get sexCode(): string{ return this._sexCode; }
        set sexCode(psexCode: string){ this._sexCode = psexCode ;}
        get inmateId(): string{ return this._inmateId; }
        set inmateId(pinmateId: string){ this._inmateId = pinmateId ;}
        get mvmtReasonCode(): string{ return this._mvmtReasonCode; }
        set mvmtReasonCode(pmvmtReasonCode: string){ this._mvmtReasonCode = pmvmtReasonCode ;}
        get fromAgyLocId(): string{ return this._fromAgyLocId; }
        set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId ;}
        get raceCode(): string{ return this._raceCode; }
        set raceCode(praceCode: string){ this._raceCode = praceCode ;}
        get eventDate(): Date{ return this._eventDate; }
        set eventDate(peventDate: Date){ this._eventDate = peventDate ;}
        get offenderId(): string { return this._offenderId;  }
        set offenderId(value: string) { this._offenderId = value; }
        get sex(): string{ return this._sex; }
        set sex(psex: string){ this._sex = psex ;}
        get stgAff(): string{ return this._stgAff; }
        set stgAff(pstgAff: string){ this._stgAff = pstgAff;}
        get alerts(): string{ return this._alerts; }
        set alerts(palerts: string){ this._alerts= palerts;}
        get sanct(): string{ return this._sanct; }
        set sanct(psanct: string){ this._sanct= psanct;}
        get ethn(): string{ return this._ethn; }
        set ethn(pethn: string){ this._ethn= pethn;}
        get secLev(): string{ return this._secLev; }
        set secLev(psecLev: string){ this._secLev= psecLev;}
        
        get impSts(): string{ return this._impSts; }
        set impSts(pimpSts: string){ this._impSts= pimpSts;}
        get ssn(): string{ return this._ssn; }
        set ssn(pssn: string){ this._ssn= pssn;}
        get NonAss(): string{ return this._NonAss; }
        set NonAss(pNonAss: string){ this._NonAss= pNonAss;}
        get poteSch(): string{ return this._poteSch; }
        set poteSch(ppoteSch: string){ this._poteSch= ppoteSch;}

    toJSON(): any {
        return { 
           'lastName': this._lastName,
           'createUserId': this._createUserId,
           'ssnId': this._ssnId,
           'modifyDatetime': this._modifyDatetime,
           'tmpGroupId': this._tmpGroupId,
           'modifyUserId': this._modifyUserId,
           'responsibleAgency': this._responsibleAgency,
           'toAgySeq': this._toAgySeq,
           'movementCommentText': this._movementCommentText,
           'alternateAgyLocId': this._alternateAgyLocId,
           'sealFlag': this._sealFlag,
           'toAgyLocId': this._toAgyLocId,
           'mvmtType': this._mvmtType,
           'algoComment': this._algoComment,
           'fromAgySeq': this._fromAgySeq,
           'nonAdmInmateId': this._nonAdmInmateId,
           'emergencyContact': this._emergencyContact,
           'scheduledTripId': this._scheduledTripId,
           'birthDate': this._birthDate,
           'inmateCommentText': this._inmateCommentText,
           'createDatetime': this._createDatetime,
           'firstName': this._firstName,
           'sexCode': this._sexCode,
           'inmateId': this._inmateId,
           'mvmtReasonCode': this._mvmtReasonCode,
           'fromAgyLocId': this._fromAgyLocId,
           'raceCode': this._raceCode,
           'eventDate': this._eventDate,
           'offenderId': this._offenderId,
            'sex': this._sex,
           'stgAff': this._stgAff,
           'alerts': this._alerts,
           'sanct': this._sanct,
           'ethn': this._ethn,
           'secLev': this._secLev,
           'impSts': this._impSts,
           'ssn': this._ssn,
           'NonAss': this._NonAss,
           'poteSch': this._poteSch
            };
        } 
}