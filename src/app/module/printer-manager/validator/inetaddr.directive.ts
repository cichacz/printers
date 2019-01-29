import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appInetaddr]',
  providers: [{provide: NG_VALIDATORS, useExisting: InetaddrDirective, multi: true}]
})
export class InetaddrDirective implements Validator {
  constructor() {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.match(/((^|\.)(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])){4}$/) ?
      null : {inetaddr_invalid: 'Adres IP jest nieprawidłowy'};
  }

}
