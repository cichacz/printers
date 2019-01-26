import {PrinterStatus} from '@app/module/printer-manager/enum/printer-status.enum';

export class Printer {
  private _name: string;
  private _status: PrinterStatus;
  private _inetaddr: string;
  private _description: string;
  private _inkLevel: number;
  private _queueLength: number = 0;

  constructor(data: any = {}) {
    // map JSOn to the class props, safe check for private props
    Object.assign(this, Object.keys(data).reduce((mapped, key) => {
      let mappedKey = key;
      if (!this.hasOwnProperty(key)) {
        mappedKey = '_' + mappedKey;
      }
      mapped[mappedKey] = data[key];
      return mapped;
    }, {}));
  }

  get name(): string {
    return this._name;
  }

  get status(): PrinterStatus {
    return this._status;
  }

  get statusName(): string {
    return PrinterStatus[this.status];
  }

  get inetaddr(): string {
    return this._inetaddr;
  }

  get description(): string {
    return this._description;
  }

  get queueLength(): number {
    return this._queueLength;
  }

  get inkLevel(): number {
    return this._inkLevel;
  }
}
