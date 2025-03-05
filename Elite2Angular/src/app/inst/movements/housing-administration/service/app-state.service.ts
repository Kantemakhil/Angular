import { Injectable, EventEmitter } from '@angular/core';
import { Agency, Facility, LivingUnit } from './backend.service';
import { Observable } from 'rxjs';



/**
 * General data regardin application. Population in/out. Unit selected, etc
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private selectedAgency$: EventEmitter<Agency> = new EventEmitter();
  private selectedFacility$: EventEmitter<Facility> = new EventEmitter();
  private selectedLevel1Unit$: EventEmitter<LivingUnit> = new EventEmitter(); // typically these are the floors
  private selectedLevel2Unit$: EventEmitter<LivingUnit> = new EventEmitter(); // typically these are the actual units

  agency: Agency;
  facility: Facility;
  level1Unit: LivingUnit;
  level2Unit: LivingUnit;


  constructor() {
    
  }

  public setAgency(agency: Agency): void {
    this.agency = agency;
    this.selectedAgency$.emit(agency);
  }

  public getAgency(): Observable<Agency> {
    return this.selectedAgency$.asObservable();
  }

  public setFacility(newFacility: Facility): void {
    this.facility = newFacility;
    this.level1Unit = null;
    this.level2Unit = null;
    this.selectedFacility$.emit(newFacility);
  }

  public getFacility(): Observable<Facility> {
    return this.selectedFacility$.asObservable();
  }

  public setLevel1Unit(newUnit: LivingUnit): void {
    this.level2Unit = null;
    this.level1Unit = newUnit;
    this.selectedLevel1Unit$.emit(newUnit);
  }

  public getLevel1Unit(): Observable<LivingUnit> {
    return this.selectedLevel1Unit$.asObservable();
  }

  public setLevel2Unit(newUnit: LivingUnit): void {
    this.level2Unit = newUnit;
    this.selectedLevel2Unit$.emit(newUnit);
  }

  public getLevel2Unit(): Observable<LivingUnit> {
    return this.selectedLevel2Unit$.asObservable();
  }

  public getCurrentLevel(): 'none' | 'facility' | 'level1Unit' | 'level2Unit' {
    if (this.level2Unit) {
      return 'level2Unit';
    } else if (this.level1Unit) {
      return 'level1Unit';
    } else if (this.facility) {
      return 'facility';
    }
    return 'none';
  }

}
