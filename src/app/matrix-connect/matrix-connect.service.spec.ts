import { TestBed } from '@angular/core/testing';

import { MatrixConnectService } from './matrix-connect.service';

describe('MatrixConnectService', () => {
  let service: MatrixConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
