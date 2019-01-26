import {PrinterStatus} from '@app/module/printer-manager/enum/printer-status.enum';

export class Printer {
  public name: string;
  public description: string;
  public status: PrinterStatus;
  public inetaddr: string;

  private _inkLevel: number;
  private _queueLength = 0;

  constructor(data: any = {}) {
    // map JSOn to the class props
    Object.assign(this, Object.keys(data).reduce((mapped, key) => {
      let mappedKey = key;

      const propDescriptor = Object.getOwnPropertyDescriptor(Printer.prototype, key);
      // allow for assigning private props
      if (propDescriptor && !propDescriptor.writable && !propDescriptor.set) {
        mappedKey = '_' + mappedKey;
      }

      mapped[mappedKey] = data[key];
      return mapped;
    }, {}));
  }

  get statusName(): string {
    return PrinterStatus[this.status];
  }

  get queueLength(): number {
    return this._queueLength;
  }

  get inkLevel(): number {
    return this._inkLevel || 0;
  }

  set inkLevel(level: number) {
    this._inkLevel = Math.max(0, Math.min(1, level));
  }

  get inkLevelPercentage(): number {
    return this.inkLevel * 100;
  }
}
