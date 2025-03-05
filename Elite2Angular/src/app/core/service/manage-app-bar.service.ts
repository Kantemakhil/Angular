import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ManageAppBarService {

    searchElement: any;

    constructor() { }
    
    manageIcon(showHeader :boolean){
        
        this.searchElement = <HTMLBaseElement>document.getElementsByClassName( 's4-search-icon' )[0];
        if( this.searchElement ) {
		if ( showHeader ) {
		    this.searchElement.style.display = 'block';
		} else {
		    this.searchElement.style.display = 'none';
		}
	}
    }
    
    private innerShowSearchBlock = false;
    
    @Output()
    get showSearchBlock(): boolean {
        return this.innerShowSearchBlock;
    }
    
    set showSearchBlock(v:boolean) {
        if(this.innerShowSearchBlock != v){
            this.innerShowSearchBlock = v;
            this.messageSource.next(v)
        }
    }
    
    private messageSource = new BehaviorSubject(false);
    showSearchBlockChanged = this.messageSource.asObservable();
}