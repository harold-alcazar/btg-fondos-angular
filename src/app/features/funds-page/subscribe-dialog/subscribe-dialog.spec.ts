import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscribeDialog } from './subscribe-dialog';

describe('SubscribeDialog', () => {
  let component: SubscribeDialog;
  let fixture: ComponentFixture<SubscribeDialog>;
  let dialogRefSpy: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [SubscribeDialog],
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

    fixture = TestBed.createComponent(SubscribeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not close when notification method is missing', () => {
    component.confirm();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.notificationMethodControl.invalid).toBe(true);
  });

  it('returns notification method when confirmation is valid', () => {
    component.notificationMethodControl.setValue('sms');

    component.confirm();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      confirmed: true,
      notificationMethod: 'sms'
    });
  });
});
