import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CancelDialog } from './cancel-dialog';

describe('CancelDialog', () => {
  let component: CancelDialog;
  let fixture: ComponentFixture<CancelDialog>;
  let dialogRefSpy: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CancelDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            fund: {
              id: 1,
              name: 'FPV_TEST',
              category: 'FPV',
              minimumAmount: 75000
            }
          }
        },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes with confirmed=true', () => {
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ confirmed: true });
  });
});
