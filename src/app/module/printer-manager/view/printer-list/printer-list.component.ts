import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';
import {MatBottomSheet} from '@angular/material';
import {PrinterFormComponent} from '@app/module/printer-manager/form/printer/printer-form.component';
import {filter, take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss']
})
export class PrinterListComponent implements OnInit {

  printers$: BehaviorSubject<Printer[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'status', 'inetaddr', 'queueLength', 'inkLevel', 'actions'];

  constructor(private route: ActivatedRoute, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.printers$.next(this.route.snapshot.data.printers);
  }

  openPrinterForm(printerData?: Printer) {
    this.bottomSheet.open(PrinterFormComponent, {disableClose: true, data: new Printer(printerData)})
    .afterDismissed()
    .pipe(filter(newPrinter => !!newPrinter), take(1))
    .subscribe(newPrinter => {
      let printers = this.printers$.getValue();
      if(printerData) {
        const printerIndex = printers.indexOf(printerData);
        printers.splice(printerIndex, 1, newPrinter);
      } else {
        printers = printers.concat([newPrinter]);
      }
      this.printers$.next(printers);
    });
  }
}
