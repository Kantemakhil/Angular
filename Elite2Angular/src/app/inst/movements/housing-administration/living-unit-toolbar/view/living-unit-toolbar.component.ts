import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Facility, LivingUnit, Backend } from '../../service/backend.service';
import { AppStateService } from '../../service/app-state.service';
import { UserSessionManager } from '@core/classes/userSessionManager';


@Component({
  selector: 'app-living-unit-toolbar',
  templateUrl: './living-unit-toolbar.component.html',
  styleUrls: ['./living-unit-toolbar.component.scss']
})
export class LivingUnitToolbarComponent implements OnDestroy {

  private agency$: Subscription;

  facilities$: Observable<Facility[]>;
  level1Units: Observable<LivingUnit[]>; // typically these are the floors
  level2Units: Observable<LivingUnit[]>; // typically these are the actual units
  selectedFacility: Facility;
  currentDate: Date;
  populationNr: number;
  capacityNr: number;
  inNr: number;
  outNr: number;
  selectedAgency : string;
  showAllChild = false;
  disableChild = false;


  constructor(public appState: AppStateService, public api: Backend,private sessionManager: UserSessionManager) {
    /* this.api.showAllChild.next(this.showAllChild); */
      this.newAgencySelected();
    
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.agency$ && !this.agency$.closed) {
      this.agency$.unsubscribe();
    }
  }

  private newAgencySelected(): void {

    this.facilities$ = this.api.getFacilities(this.sessionManager.currentCaseLoad).pipe(
      tap(facilities => {
        if (facilities && facilities.length > 0) {
          this.appState.setFacility(facilities[0]);
          this.selectedFacility = facilities[0];
          this.getLevel1Units();
        } else {
          this.appState.setFacility(null);
          this.selectedFacility = null;
        }
      })
    );
  }

  private getLevel1Units(): void {
    this.level1Units = this.api.getLivingUnits(this.selectedFacility.id).pipe(
      tap(l1Units => {
        this.calculatePopulationStatistics(l1Units);
      })
    );
  }

  private getLevel2Units(): void {
    this.level2Units = this.api.getChildLivingUnits(this.selectedFacility.id, this.appState.level1Unit.id);
  }

  newSelectedFacility(newFacility: any): void {
    if (!newFacility.value) {
      return;
    }
    this.appState.setFacility(newFacility.value);
    //this.showAllChild=false;
    //this.disableChild = false;
    //this.showAllDataChange();
    this.getLevel1Units();
  }

  newLevel1UnitSelected(event: any): void {
    const newUnit = event.value;
    if (!newUnit) {
      return;
    }
    //this.showAllChild=false;
    //this.disableChild = false;
   // this.showAllDataChange();
    this.appState.setLevel1Unit(newUnit);
    this.setPopulation(newUnit.allocated, newUnit.capacity, newUnit.offenderCount.cell, newUnit.offenderCount.out);
    this.getLevel2Units();
  }

  newLevel2UnitSelected(event: any): void {
    const newUnit = event.value;
    if (!newUnit) {
      return;
    }
    //.showAllChild=true;
    //this.disableChild = true;
    //this.showAllDataChange();
    this.appState.setLevel2Unit(newUnit);
    this.setPopulation(newUnit.allocated, newUnit.capacity, newUnit.offenderCount.cell, newUnit.offenderCount.out);
  }

  idComparator(item1: any, item2: any): boolean {
    if (!item2) {
      return false;
    }
    return item1.id === item2.id;
  }

  private calculatePopulationStatistics(units: LivingUnit[]): void {
    let populationNr = 0;
    let capacityNr = 0;
    let inNr = 0;
    let outNr = 0;

    if (!units) {
      this.setPopulation(populationNr, capacityNr, inNr, outNr);
    }

    units.forEach(unit => {
      populationNr = populationNr + unit.allocated;
      capacityNr = capacityNr + unit.capacity;
      inNr = inNr + unit.offenderCount.cell;
      outNr = outNr + unit.offenderCount.out;
    });
    this.setPopulation(populationNr, capacityNr, inNr, outNr);
  }

  private setPopulation(populationNr: number, capacityNr: number, inNr: number, outNr: number): void {
    this.populationNr = populationNr;
    this.capacityNr = capacityNr;
    this.inNr = inNr;
    this.outNr = outNr;

  }

  showAllDataChange(){
    this.api.showAllChildData = this.showAllChild;
    this.api.showAllChild.next(this.showAllChild);
  }

}
