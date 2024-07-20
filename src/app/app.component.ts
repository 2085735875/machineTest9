import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from './shared/const/country';
import { Icountry } from './shared/model/country';
import { CustomRegex } from './shared/const/validationPattern';
import { EmpIdValidator } from './shared/validation/empIdValidators';
import { NoSpaceValidator } from './shared/validation/noSpace';
import { AsynEmailValidators } from './shared/validation/asynEmailValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  
  signUpForm !: FormGroup

  countryData : Array<Icountry> = []

  constructor() {}

  ngOnInit(): void {
    this.countryData = countries;
    this.createSignUpForm();
    this.validateCurrAdd();
    this.patchPermAdd();
    this. passAndConfirmPassSame();
    this.enableConfirmPass()
    // this.temp()
  }

  createSignUpForm(){
    this.signUpForm = new FormGroup({
      fname : new FormControl(null, [Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),
        NoSpaceValidator.npSpace
      ]),
      lname : new FormControl(null, [Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),
        NoSpaceValidator.npSpace
      ]),
      email : new FormControl(null, [Validators.required,
        Validators.pattern(CustomRegex.email),
        NoSpaceValidator.npSpace],
        [AsynEmailValidators.isEmailAvailable]),
      
      contact : new FormControl(null, [Validators.required,
        Validators.pattern(CustomRegex.number),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      skills : new FormArray([new FormControl(null, [Validators.required])]),
      empID : new FormControl(null, [Validators.required, EmpIdValidator.isEmpIdValid]),
      gender : new FormControl(null),
      currentAdd : new FormGroup({
        country : new FormControl('India', [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required])
      }),
      permanentAdd: new FormGroup({
        country : new FormControl('India', [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required])
      }),
      isAddSame : new FormControl({value : null, disabled: true}),
      password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl({value : null, disabled : true}, [Validators.required])
    })
  }

  get f(){
    return this.signUpForm.controls
  }

  get skillsFormArray(){
    return this.signUpForm.get('skills') as FormArray
  }
  onSignUp(){
   if(this.signUpForm.valid){
    console.log(this.signUpForm.value); 
    this.f['currentAdd'].getRawValue().value
    this.f['permanentAdd'].getRawValue().value
    this.signUpForm.reset() 

   }
   
    
  }

  enableConfirmPass(){
    this.f['password'].valueChanges
        .subscribe(res => {
          if(this.f['password'].valid){
            this.f['confirmPassword'].enable()
          }
          else{
            this.f['confirmPassword'].disable()
          }
        })
  }
  passAndConfirmPassSame(){
    this.f['confirmPassword'].valueChanges
        .subscribe(res => {
          if(res !== this.f['password'].value){
            this.f['confirmPassword'].setErrors({
              'passAndConfErr' : ' Password and confirm password must be same'
            })
          }
        })
  }

  validateCurrAdd(){
    this.f['currentAdd'].valueChanges
      .subscribe(res => {
        if(this.f['currentAdd'].valid){
          this.f['isAddSame'].enable()
        }
        else{
          this.f['isAddSame'].disable()
          this.f['isAddSame'].patchValue(false)
        }
      })
  }
  patchPermAdd(){
    this.f['isAddSame'].valueChanges
        .subscribe(res => {
          if(res){
            this.f['permanentAdd'].patchValue(this.f['currentAdd'].value);
            this.f['permanentAdd'].disable();
          }
          else{
            this.f['permanentAdd'].reset();
            this.f['permanentAdd'].enable();
          }
        })
  }

  // temp(){
  //   this.f['permanentAdd'].valueChanges
  //   .subscribe(res => {
  //     if(res){
  //       this.f['permanentAdd'].patchValue(this.f['currentAdd'].value);
  //       this.f['permanentAdd'].disable();
  //     }
  //     else{
  //       this.f['permanentAdd'].reset();
  //       this.f['permanentAdd'].enable();
  //     }
  //   })
  // }

  onSkillRemove(i : number){
    const confir = confirm('Do you want to remove this skill set')
    if(confir){

      this.skillsFormArray.removeAt(i)
    }

  }
  onSkillAdd(){
    if(this.skillsFormArray.length < 5 && this.skillsFormArray.controls[this.skillsFormArray.length - 1].valid ){
      let skillControl = new FormControl(null, [Validators.required])
      this.skillsFormArray.push(skillControl)
    }
  }
}
