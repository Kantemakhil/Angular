import { Component, Input } from '@angular/core';
import { LoaderService } from '@core/loader/loader.service';

/**
 * @title Configurable progress spinner
 */
@Component({
  selector: 's4-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {

  @Input() value : number = 100;
  @Input() diameter: number = 10;
  @Input() mode : string ="indeterminate";
  @Input() strokeWidth : number = 6;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";

  constructor(
    public loaderService: LoaderService
  ) {
  }

  ngOnInit() {

  }
}