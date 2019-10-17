import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders: string[] = ['male', 'female'];
  form: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        MyValidators.forbiddenUserNames
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),

      'personalInfo': new FormGroup({
        'identifyCard': new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          MyValidators.validateIdIsNum
        ]),
        'firstName': new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(17),
          MyValidators.validateFirstNameIsString
        ]),
        'lastName': new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          MyValidators.validateLastNameIsString
        ]),
        // TODO: make validations to gender radio choise
        'gender': new FormControl('', Validators.required),
        'email': new FormControl('', [
          Validators.required,
          Validators.email,
          MyValidators.restrictedEmails
        ],
        // async validators are third parameter of FormControl class
        [MyValidators.registeredEmails]
        ),
        'aboutYou': new FormControl(null, [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(150)
        ]),
      }),

      'address': new FormGroup({
        'country': new FormControl('', [Validators.required]),
        'city': new FormControl('', Validators.required),
        'houseNum': new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(999)
        ]),
        'flatNum': new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(250)
        ]),
        'zipCode': new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          MyValidators.validateZIPCodeIsNum
        ])
      }),

      'skills': new FormArray([]),
      'hobbies': new FormArray([])
    });
  }

  
  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form);

      const formData = {...this.form.value};
      console.log('Form Data:', formData);

      this.form.reset();
      this.removeAllSkills();
    }
  }


  setCapital() {
    const countryCityMap = {
      russia: 'Moskow',
      israel: 'Jerusalem',
      usa: 'Washington'
    };

    const country = this.form.get('address').get('country').value;
    const city = countryCityMap[country];

    //this.form.patchValue({address: {city: city}});
    this.form.patchValue( { address: {city} } );
  }


  addSkill(): void {
    const newSkillControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    const skillsArr = <FormArray>this.form.get('skills');
    // const skillsArr = (this.form.get('skills') as FormArray);

    skillsArr.push(newSkillControl);
  }

  removeSkill(idxToDelete): void {
    (this.form.get('skills') as FormArray).removeAt(idxToDelete);
  }

  removeAllSkills(): void {
    const skillsArr = this.form.get('skills') as FormArray;

    if (skillsArr.length === 0) return;

    while (skillsArr.length > 0) {
      skillsArr.removeAt(length-1);
    }
  }

  addHobby(): void {
    const newHobbyControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(2), 
      Validators.maxLength(20)
    ]);

    ( <FormArray>this.form.get('hobbies') ).push(newHobbyControl);
  }

  removeHobby(hobbyIdxToDelete): void {
    ( <FormArray>this.form.get('hobbies') ).removeAt(hobbyIdxToDelete);
  }

  removeAllHobbies(): void {
    const hobbiesArr = <FormArray>this.form.get('hobbies');

    if (hobbiesArr.length === 0) return;

    while (hobbiesArr.length > 0) {
      hobbiesArr.removeAt(length-1);
    }
  }

}

