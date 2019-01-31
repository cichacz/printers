import { InetaddrDirective } from './inetaddr.directive';
import {FormControl} from '@angular/forms';

describe('InetaddrDirective', () => {
  it('should create an instance', () => {
    const directive = new InetaddrDirective();
    expect(directive).toBeTruthy();
  });
  it('should accept valid IP', () => {
    const directive = new InetaddrDirective();
    const control = new FormControl();
    control.setValue('127.0.0.1');
    expect(directive.validate(control)).toBeNull();
  });
  it('should reject invalid IP', () => {
    const directive = new InetaddrDirective();
    const control = new FormControl();
    control.setValue('123.456.789.0');
    expect(directive.validate(control)).toEqual({inetaddr_invalid: 'Adres IP jest nieprawidłowy'});
  });
});
