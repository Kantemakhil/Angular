import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({providedIn: 'root'})
export class AmountFormatUtil {
  constructor() {}

  avoidKeys(event, value, allowNav?, numLength?) {
    try {
        const amtLength = numLength ? numLength : 9;
    if ((event.keyCode >= 0 && event.keyCode <= 31) || (event.keyCode >= 112 && event.keyCode <= 123)) {
        return true;
    } else if (!value && allowNav) {
        return true;
    } else {
        if (/\d/.test(event.key) || event.key === '.') {
            if (value) {
                if (String(value).includes('.')) {
                    if (event.key === '.') {
                        return false;
                    }
                    if (String(value).split('.').length >= 2) {
                        const floatingPoints = String(value).split('.')[1];
                        if (floatingPoints.length >= 2) {
                            return false;
                        }
                    }
                } else if (String(value).length >= numLength && event.key !== '.') {
                    return false;
                } else if (String(value).split('.').length >= 2) {
                    const floatingPoints = String(value).split('.')[1];
                    if (floatingPoints.length >= 2) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }
    } catch (e) {
        console.log(e);
    }
  }
  precisionFlot(field) {
      try {
    if (field && (field.innerValue || String(field.innerValue) === '0')) {
        if (field.innerValue === '.') {
            field.value = '0.00';
        } else if (isNaN(Number(field.innerValue))) {
            field.value = null;
        } else {
            field.value = Number(field.innerValue).toFixed(2);
        }
    }
    } catch (e) {
        console.log(e);
    }
  }
  amountFormatEvent(field) {
    try {
  if (field && (field.innerValue || String(field.innerValue) === '0')) {
      if (field.innerValue === '.') {
          field.value = '0.00';
      } else if (isNaN(Number(field.innerValue.toString().replace(/,/g, '')))) {
          field.value = null;
      } else {
          const numpipe = new DecimalPipe('en-US');
          const data = field.innerValue.toString().replace(/,/g, '');
          field.value = numpipe.transform(data, '1.2-2');
      }
  } else {
    field.value = '0.00';
  }
  } catch (e) {
      console.log(e);
  }
}
amountFormat(amount) {
 if (amount.innerValue) {
  return Number((amount.innerValue).toString().replace(/,/g, '') );
  } else if(amount){
    const numpipe = new DecimalPipe('en-US');
    const data = amount.toString().replace(/,/g, '');
    const number = numpipe.transform(data, '1.2-2');
    return number.includes('-') ? '(' + number.replace('-', '') + ')' : number;
  } else {
     return '0.00'; 
  }
}
}
