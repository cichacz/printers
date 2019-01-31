import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';
import {MatBottomSheet, MatSort, MatTableDataSource} from '@angular/material';
import {PrinterFormComponent} from '@app/module/printer-manager/form/printer/printer-form.component';
import {filter, take, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss']
})
export class PrinterListComponent implements OnInit, OnDestroy {

  printers$: BehaviorSubject<Printer[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'status', 'inetaddr', 'queueLength', 'inkLevel', 'actions'];
  dataSource = new MatTableDataSource<Printer>();

  @ViewChild(MatSort) sort: MatSort;

  private _unsibscribe$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.printers$.next(this.route.snapshot.data.printers);
    this.dataSource.sort = this.sort;

    this.printers$.pipe(takeUntil(this._unsibscribe$)).subscribe(printers => {
      this.dataSource.data = printers;
    });
  }

  ngOnDestroy() {
    this._unsibscribe$.next();
    this._unsibscribe$.complete();
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

  downloadReport(printer: Printer) {
    const blob = new Blob([printer.log], { type: 'text/csv' });
    saveAs(blob, printer.name + '.csv');
  }
}
