import { TestBed } from '@angular/core/testing';

import { PrintersService } from './printers.service';
import {HttpClientModule} from '@angular/common/http';

describe('PrintersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      PrintersService,
    ]
  }));

  it('should be created', () => {
    const service: PrintersService = TestBed.get(PrintersService);
    expect(service).toBeTruthy();
  });
});
