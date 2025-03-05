

export class AssessmentSectionScoresV1 {
    private _score: number;
    private _serialVersionUID: number;
    private _offenderBookId: number;
    private _description: string;
    private _parentAssessmentId: number;
    private _section: string;
    private _assessmentId: number;
    private _effectiveDate: Date;
    private _assessmentSeq: number;
    private _securityLevelDesc: string;

    get securityLevelDesc(): string { return this._securityLevelDesc }

    set securityLevelDesc( psecurityLevelDesc: string ) { this._securityLevelDesc = psecurityLevelDesc }

    get score(): number { return this._score }

    set score( pscore: number ) { this._score = pscore }

    get serialVersionUID(): number { return this._serialVersionUID }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID }

    get offenderBookId(): number { return this._offenderBookId }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId }

    get description(): string { return this._description }

    set description( pdescription: string ) { this._description = pdescription }

    get parentAssessmentId(): number { return this._parentAssessmentId }

    set parentAssessmentId( pparentAssessmentId: number ) { this._parentAssessmentId = pparentAssessmentId }

    get section(): string { return this._section }

    set section( psection: string ) { this._section = psection }

    get assessmentId(): number { return this._assessmentId }

    set assessmentId( passessmentId: number ) { this._assessmentId = passessmentId }

    get effectiveDate(): Date { return this._effectiveDate }

    set effectiveDate( peffectiveDate: Date ) { this._effectiveDate = peffectiveDate }

    get assessmentSeq(): number { return this._assessmentSeq }

    set assessmentSeq( passessmentSeq: number ) { this._assessmentSeq = passessmentSeq }


    toJSON(): any {
        return {
            'score': this._score,
            'serialVersionUID': this._serialVersionUID,
            'offenderBookId': this._offenderBookId,
            'description': this._description,
            'parentAssessmentId': this._parentAssessmentId,
            'section': this._section,
            'assessmentId': this._assessmentId,
            'effectiveDate': this._effectiveDate,
            'assessmentSeq': this._assessmentSeq,
            'securityLevelDesc': this._securityLevelDesc
        };
    }
 }