import { Printer } from './printer';

describe('Printer', () => {
  it('should create an instance', () => {
    expect(new Printer()).toBeTruthy();
  });
  it('should have empty queue', () => {
    expect(new Printer().inkLevel).toEqual(0);
  });
});
