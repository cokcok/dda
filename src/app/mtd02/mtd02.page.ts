import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mtd02',
  templateUrl: './mtd02.page.html',
  styleUrls: ['./mtd02.page.scss'],
})
export class Mtd02Page implements OnInit {
  imageURL: string;
  uploadForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })

   }

  ngOnInit() {
  }

   // Image Preview
   showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // Submit Form
  submit() {
    console.log(this.uploadForm.value)
  }

}
