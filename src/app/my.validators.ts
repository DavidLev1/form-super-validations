import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class MyValidators {

  static forbiddenUserNames(control: FormControl): {[key: string]: boolean} {
    const forbiddenUserNames = ['David', 'Katiusha'];

    if (forbiddenUserNames.indexOf(control.value) !== -1) {
      return {isUsernameForbidden: true};
    }

    // Validator returns null when the form control is valid
    return null;
  }


  static validateFirstNameIsString(control: FormControl): {[key: string]: boolean} {
    const controlValArr = control.value.split('');
    // console.log(control.value, controlValArr);
    if (!controlValArr.every(isNaN)) {return {firstNameHasDigit: true};}

    // for(let i = 0; i < control.value.length; i++) {
    //   if ( !isNaN( Number(control.value[i]) ) ) {
    //     return {firstNameHasDigit: true};
    //   }
    // }
    return null;
  }

  static validateLastNameIsString(control: FormControl): {[key: string]: boolean} {
    for(let i = 0; i < control.value.length; i++) {
      if ( !isNaN( Number(control.value[i]) ) ) {
        return {lastNameHasDigit: true};
      }
    }
    return null;
  }


  static validateIdIsNum(control: FormControl): {[key: string]: boolean} {
    if (isNaN(control.value))  {
      return {isIdNotANum: true};
    }
    return null;
  }


  static restrictedEmails(control: FormControl): {[key: string]: boolean} {
    // Array of not allowed emails
    const forbiddenEmails = ['trial@gmail.com', 'test@gmail.com'];

    if (forbiddenEmails.includes(control.value)) {
      return {restrictedEmail: true};
    }

    // Validator returns null when there is no error
    return null;
  }


  static registeredEmails(control: FormControl): Promise<any> | Observable<any> {
    const busyEmails = ['registered1@walla.com', 'registered2@yahoo.com'];

    return new Promise( resolve => {
      setTimeout( () => {
        if (control.value === 'async@gmail.com' || busyEmails.includes(control.value)) {
          resolve({registeredEmail: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }


  static validateZIPCodeIsNum(control: FormControl): {[key: string]: boolean} {
    if (isNaN(control.value)) { return {isZIPCodeNotANum: true} ; }
    return null;
  }


}
