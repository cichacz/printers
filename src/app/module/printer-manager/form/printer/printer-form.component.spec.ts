import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterFormComponent } from './printer-form.component';
import {Printer} from '@app/module/printer-manager/model/printer';
import {FormsModule} from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule, MatBottomSheetRef,
  MatButtonModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatProgressBarModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PrinterManagerRoutingModule} from '@app/module/printer-manager/printer-manager-routing.module';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';
import {PrinterListComponent} from '@app/module/printer-manager/view/printer-list/printer-list.component';
import {AppRoutingModule} from '@app/app-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {by, element} from 'protractor';

describe('PrinterFormComponent', () => {
  let component: PrinterFormComponent;
  let fixture: ComponentFixture<PrinterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterFormComponent, PrinterListComponent ],
      imports: [
        NoopAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        PrinterManagerRoutingModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        MatBottomSheetModule,
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        PrintersService,
        {
          provide: MatBottomSheetRef,
          useValue: {}
        },
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: new Printer()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have printer model`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.printer).toEqual(new Printer());
  });

  it(`should fill printer model`, async () => {
    await fixture.whenStable();

    component.printerForm.setValue({name: 'printer test', inetaddr: '255.255.255.0', description: 'Tested!'});

    expect(component.printer.name).toEqual('printer test');
    expect(component.printer.inetaddr).toEqual('255.255.255.0');
  });
});
