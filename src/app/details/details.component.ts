import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" >
        <div *ngIf="submitted && applyForm.controls.firstName.errors" class="invalid-feedback">
          <div *ngIf="applyForm.controls.firstName.errors['required']">First Name is required</div>
          <div *ngIf="applyForm.controls.firstName.errors['minlength']">First Name should be of length greater than 1</div>
        </div>
        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName" >
        <div *ngIf="submitted && applyForm.controls.lastName.errors" class="invalid-feedback">
          <div *ngIf="applyForm.controls.lastName.errors['required']">Last Name is required</div>
          <div *ngIf="applyForm.controls.lastName.errors['minlength']">Last Name should be of length greater than 1</div>
        </div>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
        <div *ngIf="submitted && applyForm.controls.email.errors" class="invalid-feedback">
          <div *ngIf="applyForm.controls.email.errors['required']">Email is required</div>
          <div *ngIf="applyForm.controls.email.errors['email']">Email should be valid</div>
        </div>
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>    
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  submitted = false;

  applyForm = new FormGroup({
    firstName: new FormControl<string>('',[Validators.minLength(2),
      Validators.required]),
    lastName: new FormControl<string>('', [Validators.minLength(2),
    Validators.required]),
    email: new FormControl<string>('', [Validators.required,Validators.email])
  });


  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    //this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.submitted = true;
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
