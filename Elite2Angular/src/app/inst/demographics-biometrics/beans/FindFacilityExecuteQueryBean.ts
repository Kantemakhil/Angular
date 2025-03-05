import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderAttributes } from '@inst/demographics-biometrics/beans/OffenderAttributes';

export class FindFacilityExecuteQueryBean extends BaseModel {

    private _personalAttributeSet: Array<OffenderAttributes>;
    private _caseType: string
    private _sentenceType: string;;
    private _pLivingUnitType:string;

  get personalAttributeSet(): Array<OffenderAttributes> { return this._personalAttributeSet; }

  set personalAttributeSet(pPersonalAttributeSet: Array<OffenderAttributes>){ this._personalAttributeSet = pPersonalAttributeSet; }

  get caseType(): string { return this._caseType; }

  set caseType( caseType: string ) { this._caseType = caseType; }

  get sentenceType(): string { return this._sentenceType; }

  set sentenceType( sentenceType: string ) { this._sentenceType = sentenceType; }

  get pLivingUnitType(): string { return this._pLivingUnitType; }

  set pLivingUnitType( pLivingUnitType: string ) { this._pLivingUnitType = pLivingUnitType; }



  toJSON(): any {
    return {
      'personalAttributeSet': this._personalAttributeSet,
      'caseType': this._caseType,
      'sentenceType': this._sentenceType,
      'pLivingUnitType': this.pLivingUnitType
    }

  }
}
