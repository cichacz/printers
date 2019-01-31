import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Printer} from '@app/module/printer-manager/model/printer';
import {ActivatedRoute} from '@angular/router';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {PrinterStatus} from '@app/module/printer-manager/enum/printer-status.enum';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-printer',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {
  printer: Printer;

  @ViewChild('printerForm') printerForm: NgForm;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Printer,
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<PrinterFormComponent>
  ) { }

  ngOnInit() {
    this.printer = this.route.snapshot.data.printer || this.data || new Printer();
  }

  save() {
    console.log(this.data);
    if(!this.data) {
      // new item
      const statusCount = Object.keys(PrinterStatus).length / 2;
      this.printer.status = Math.floor(Math.random() * statusCount) + 1;
      this.printer.inkLevel = Math.floor(Math.random() * 100) / 100;
    }
    this.bottomSheetRef.dismiss(this.printer);
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }
}
