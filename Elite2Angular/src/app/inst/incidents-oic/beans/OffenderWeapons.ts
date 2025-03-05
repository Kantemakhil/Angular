import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderWeapons extends BaseModel {

    private _weaponsUsed: string;
    private _weaponsDetail: string;
    private _agencyIncidentId :number;
    private _offenderBookId :number;
    private _partySeq :number;

    get weaponsUsed(): string{ return this._weaponsUsed;}

    set  weaponsUsed( sweaponeused: string ) { this._weaponsUsed= sweaponeused; }

    get weaponsDetail(): string { return this. _weaponsDetail; }

    set weaponsDetail( sDetails: string ) { this. _weaponsDetail =  sDetails; }
    
    get agencyIncidentId(): number { return this. _agencyIncidentId; }

    set agencyIncidentId( sagencyIncidentId: number ) { this. _agencyIncidentId =  sagencyIncidentId; }
    
    get offenderBookId(): number { return this. _offenderBookId; }

    set offenderBookId( oOffInvolve: number ) { this. _offenderBookId =  oOffInvolve; }
    
    get partySeq(): number { return this. _partySeq; }

    set partySeq( spartySeq: number ) { this. _partySeq =  spartySeq; }

    
    toJSON(): any {
        return {          
            'weaponsUsed': this._weaponsUsed,
            'weaponsDetail': this. _weaponsDetail,
            'agencyIncidentId':this._agencyIncidentId,
            'offenderBookId':this._offenderBookId,
            'partySeq': this._partySeq           
        };
    }
}