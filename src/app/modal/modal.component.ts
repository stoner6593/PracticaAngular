import { Component, OnInit, Input, ViewChild, ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  action: Subject<any> = new Subject();

  constructor(public modalRef: MDBModalRef,private resolver : ComponentFactoryResolver) {}
  
  @ViewChild('entry', { static: true, read: ViewContainerRef })entry:ViewContainerRef;

  ngOnInit() {
  }
  
  onYesClick() {
    console.log(this.action);
    this.action.next('yes');
    
  } 

  onNoClick() {
      console.log("No");
      this.action.next('No');
  }

  
  ngAfterContentInit() {
    // Check requirements to show the survey
    //if (this.isSurveyRequired()) {
      // Resolve a factory
      const surveyFormFactory = this.resolver.resolveComponentFactory(FormComponent);
      //console.log(surveyFormFactory.);
      // Create a component
      const component = this.entry.createComponent(surveyFormFactory);
    //}
  }

}
