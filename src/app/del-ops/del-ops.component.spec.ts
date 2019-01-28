import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelOpsComponent } from './del-ops.component';
import { By } from '@angular/platform-browser';

describe('DelOpsComponent', () => {
  let component: DelOpsComponent;
  let fixture: ComponentFixture<DelOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Test should invoke button click, bubble it up and call the OnDelRequest()
      SpyOn() is chained to callThrough() to track all implementation calls of the specified function.

      unless there's a (click) handler in the element don't use debugElement.callEventHandler()
      instead use debugElement.nativeElement.click(). It supports event bubbling.

      once the method is called, make sure to detectChanges(). Then check the hidden/ngIf elements
      as shown.
  */

  it('should call OnDelRequest()', async(()=>{
    spyOn(component, 'OnDelRequest').and.callThrough();

    const delReqbtn = fixture.debugElement.query(By.css('.btn-del'));
    
    delReqbtn.nativeElement.click();

    fixture.whenStable().then(()=>{
      expect(component.OnDelRequest).toHaveBeenCalled();
      fixture.detectChanges();
      expect(delReqbtn.nativeElement.disabled).toBe(true);
      const confDialog = fixture.debugElement.query(By.css('.confirm'));
      expect(confDialog).toBeTruthy();
    });
  }));

  /* Here I'm checking the whole process through invoking methods by button clicks
    when Delete button is clicked, it should call respective methods and show the Div with cancel button
    Delete button should be disabled until Cancel button is clicked.
    and when the Cancel button is clicked it should hide the div again and should enable the Delete button.
  */
 
  
  it('should call OnCancelRequest()', async(()=>{
    spyOn(component, 'OnDelRequest').and.callThrough();
    spyOn(component, 'OnCancelRequest').and.callThrough();

    const delReqbtn = fixture.debugElement.query(By.css('.btn-del'));
    
    delReqbtn.nativeElement.click();

    fixture.whenStable().then(()=>{

      fixture.detectChanges();

      expect(component.OnDelRequest).toHaveBeenCalled();      

      expect(component.isDelRequested).toBe(true);
      expect(delReqbtn.nativeElement.disabled).toBe(true);
      const confDialog = fixture.debugElement.query(By.css('.confirm'));
      expect(confDialog).toBeTruthy();

      const cancelReqbtn = fixture.debugElement.query(By.css('.btn-cancel-del'));
      expect(cancelReqbtn).toBeTruthy();

      cancelReqbtn.nativeElement.click();
      expect(component.OnCancelRequest).toHaveBeenCalled();

      fixture.detectChanges();

      const confDialogAfter = fixture.debugElement.query(By.css('.confirm'));
      const cancelReqbtnAfter = fixture.debugElement.query(By.css('.btn-cancel-del'));
      const delReqbtnAfter = fixture.debugElement.query(By.css('.btn-del'));
      expect(confDialogAfter).toBeFalsy();
      expect(cancelReqbtnAfter).toBeFalsy();
      expect(component.isDelRequested).toBe(false);
      expect(delReqbtnAfter.nativeElement.disabled).toBe(false);
    });

  }));

});
