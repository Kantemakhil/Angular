import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class HousingAdministrationStateService {

  public administrationType: 'unit_plan_upload' | 'unit_hotspot' | 'bed_hotspot' = 'unit_plan_upload';
  public unitDetails: UnitDetails;


  constructor(private appState: AppStateService) {

    this.unitDetailsBuilder(appState.facility?.id, appState.level1Unit?.id, appState.level2Unit?.id);

    appState.getFacility().subscribe(
      facility => {
        this.administrationType = 'unit_plan_upload'
        this.unitDetailsBuilder(appState.facility?.id, appState.level1Unit?.id, appState.level2Unit?.id);
      }
    );

    appState.getLevel1Unit().subscribe(
      unit => {
        this.administrationType = 'unit_plan_upload';
        this.unitDetailsBuilder(appState.facility?.id, appState.level1Unit?.id, appState.level2Unit?.id);
      }
    );

    appState.getLevel2Unit().subscribe(
      unit => {
        this.administrationType = 'unit_plan_upload';
        this.unitDetailsBuilder(appState.facility?.id, appState.level1Unit?.id, appState.level2Unit?.id);
      }
    );
  }

  public toggleHotspotsConfiguration(): void {
    if (this.appState.level2Unit) {
      this.administrationType = 'bed_hotspot';
    } else {
      this.administrationType = 'unit_hotspot';
    }
  }

  public toggleUnitUploadConfiguration(): void {
    this.administrationType = 'unit_plan_upload';
  }

  public switchAdministrationType(newType: 'unit_plan_upload' | 'unit_hotspot' | 'bed_hotspot'): void {
    this.administrationType = newType;
  }

  private unitDetailsBuilder(facilityId: string, unitLevel1Id: number, unitLevel2Id: number) {
    if (!facilityId && !unitLevel1Id) {
      this.unitDetails = null;
      return
    }

    this.unitDetails = { facilityId: facilityId, unitId: unitLevel2Id ? unitLevel2Id : unitLevel1Id }
  }

}

export class UnitDetails {
  facilityId: string;
  unitId: number;
}
