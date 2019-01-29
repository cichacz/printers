import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';
import {MatBottomSheet} from '@angular/material';
import {PrinterFormComponent} from '@app/module/printer-manager/form/printer/printer-form.component';
import {filter, take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import Swal from 'sweetalert2';

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
      if (printerData) {
        const printerIndex = printers.indexOf(printerData);
        printers.splice(printerIndex, 1, newPrinter);
      } else {
        printers = printers.concat([newPrinter]);
      }
      this.printers$.next(printers);
    });
  }

  removePrinter(printer: Printer) {
    Swal.fire({
      title: 'Jesteś pewien?',
      text: 'Tej akcji nie da się cofnąć',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d5150d',
      confirmButtonText: 'Usuń',
      cancelButtonText: 'Anuluj',
    }).then((result) => {
      if (result.value) {
        const printers = this.printers$.getValue();
        const printerIndex = printers.indexOf(printer);
        printers.splice(printerIndex, 1);
        this.printers$.next(printers);

        Swal.fire(
          'Zrobione!',
          '',
          'success'
        );
      }
    });
  }

  downloadReport(data: Printer) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    console.log(url);
  }
}
