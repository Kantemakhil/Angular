import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class NameFormatUtil {
  constructor() { }

  customizeName(firstName, lastName,middleName ) : string {
       var name:string ="";
  
      if ( lastName != "" && lastName != undefined ) {
          name = lastName;

      }


      if ( firstName != "" && firstName != undefined ) {
          if ( lastName != "" && lastName != undefined ) {
              name = name + ", " + firstName;
          }
          else
              name = firstName;

      }
      if ( middleName != "" && middleName != undefined ) {
          if ( ( lastName != "" && lastName != undefined ) || ( firstName != "" && firstName != undefined ) ) {
              name = name + " " + middleName;
          }
          else
              name = name + middleName;

      }
      return name;
  }

}
