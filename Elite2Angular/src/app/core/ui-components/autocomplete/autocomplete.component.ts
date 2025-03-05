import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { TranslateService } from '@common/translate/translate.service';
import { HttpService } from '@core/service/http.service';
import { Observable, of } from 'rxjs';

@Component( {
    selector: 's4-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})


export class AutocompleteComponent implements OnInit {

    addressCtrl = new FormControl();
    filteredAddress: any[] = [];
    isLoading = false;
    allowLabel: boolean = true;
    inputValue = '';
    @Output() public sendAddressEvent = new EventEmitter<any>();
    isRequired:boolean = false;
    selectedState:string = '';

    constructor(private http: HttpService,public translateService: TranslateService) {}

    ngOnInit() {
        this.addressCtrl.valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            filter((query: string) => query?.length > 3),
            tap(() => {
              this.isLoading = true;
            }),
            switchMap(value => this.apiCallForAutocomplete(value)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
          )
          .subscribe((data:any[]) => {
            if (this.inputValue == undefined || this.inputValue.length == 0) {
              this.filteredAddress = [];
            } 
            else if(data.length !== 0){
              this.filteredAddress = data;
            }
          });
      }

      filteredBySelectedState(list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let addArr = list[i].split(' ');
          let stateCode = addArr[addArr.length - 2];
          if (stateCode == this.selectedState) {
            arr.push(list[i])
          }
        }
        return arr;
      }

      matAutocompleteOpened(){
        if(this.filteredAddress.length>0){
          this.filteredAddress = this.filteredBySelectedState(this.filteredAddress);
        }
      }
    
      onSearchChange(){
        this.sendAddressEvent.emit(this.inputValue);
      }

      onSelectAddress(option){
        this.apiCallForFullAddress(option.value).subscribe(
            (result) => {
              this.sendAddressEvent.emit(result);
            }
         )
      }

    apiCallForAutocomplete(inputValue) {
        if(inputValue == undefined || inputValue.length < 4){
          return of([]);
        }
        let url = "address/autocomplete";
        let term = "?term=" + inputValue;
        let state = "&state=" + this.selectedState;
        let fullApi = url + term + state;
        return this.http.get(fullApi)
    }

    apiCallForFullAddress(shortAddress){
        if(shortAddress.includes('&')){
          shortAddress = shortAddress.replace(/[&]/g, '');
        }
        let url = "address/info";
        let term = "?term=" + shortAddress;
        let fullApi = url + term;
        return this.http.get(fullApi)
    }


    @Input()
    set disabled(isDisabled: boolean) {
        isDisabled ? this.addressCtrl.disable() : this.addressCtrl.enable();
    }

    @Input()
    set keepLabel(label: boolean) {
        this.allowLabel = label;
    }

    @Input()
    set data(inputData: string) {
        this.inputValue = inputData;
        if(this.inputValue == undefined || this.inputValue == null || this.inputValue == ''){
          this.filteredAddress = [];
        }
    }

    @Input()
    set required(val:boolean) {
        this.isRequired = val;
    }

    @Input()
    set state(val:string) {
        this.selectedState = val;
    }

}

