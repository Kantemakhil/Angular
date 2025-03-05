import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../service/app-state.service';
import { HousingAdministrationStateService } from '../service/housing-administration-state.service';

@Component({
  selector: 'app-housing-administration',
  templateUrl: './housing-administration.component.html',
  styleUrls: ['./housing-administration.component.scss']
})
export class HousingAdministrationComponent implements OnInit {

  constructor(
    public appState: AppStateService,
    public moduleState: HousingAdministrationStateService
  ) { }

  ngOnInit(): void {
    
  }

}
