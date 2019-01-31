import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class PrintersService implements Resolve<Printer[]> {

  constructor(private http: HttpClient) { }

  getPrinters() {
    return this.http.get<Printer[]>(environment.printersFile).pipe(
      map(list => {
        return list.map(item => {
          const printer = new Printer(item);
          printer.enableLogging();
          return printer;
        });
      })
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Printer[]> | Promise<Printer[]> | Printer[] {
    return this.getPrinters();
  }
}
