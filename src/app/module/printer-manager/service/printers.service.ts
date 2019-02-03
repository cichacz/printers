import {ApplicationRef, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable()
export class PrintersService implements Resolve<Printer[]> {

  constructor(private http: HttpClient, private applicationRef: ApplicationRef) { }

  getPrinters() {
    return this.http.get<Printer[]>(environment.printersFile).pipe(
      map(list => {
        const printers = list.map(item => new Printer(item));

        this.applicationRef.isStable.pipe(first(stable => !!stable)).subscribe(() => {
          printers.forEach(printer => printer.enableLogging());
        });

        return printers;
      })
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Printer[]> | Promise<Printer[]> | Printer[] {
    return this.getPrinters();
  }
}
