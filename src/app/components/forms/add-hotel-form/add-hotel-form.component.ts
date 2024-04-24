import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel-form.component.html',
  styleUrls: ['./add-hotel-form.component.css']
})
export class AddHotelFormComponent implements OnInit {
  hotelForm: FormGroup;
  hotelImages!: FileList;

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService, private toastr: ToastrService) {
    this.hotelForm = new FormGroup({
      name: new FormControl('', Validators.required), // Initialize as FormControl
      no: new FormControl('', Validators.required), // Initialize as FormControl
      street: new FormControl('', Validators.required), // Initialize as FormControl
      city: new FormControl('', Validators.required), // Initialize as FormControl
      description: new FormControl('', Validators.required), // Initialize as FormControl
      email: new FormControl('', [Validators.required, Validators.email]), // Initialize as FormControl
      contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]) // Initialize as FormControl
    });
  }

  ngOnInit(): void {
  }

  // Convenience getter for easy access to form controls
  get f() {
    return this.hotelForm.controls;
  }

  onSubmit(): void {
    if (this.hotelForm.valid && this.hotelImages && this.hotelImages.length > 0) {
      const formData = new FormData();
      formData.append('hotelData', JSON.stringify(this.hotelForm.value));
      for (let i = 0; i < this.hotelImages.length; i++) {
        formData.append('hotelImages', this.hotelImages[i]);
      }

      this.hotelService.addHotel(formData).subscribe(
        response => {
          console.log('Hotel added successfully:', response);
          this.hotelForm.reset();
          // Optionally, you can reset the file input too
          const fileInput = document.getElementById('images') as HTMLInputElement;
          fileInput.value = '';
          this.toastr.success('Hotel added successfully', 'Success');
        },
        error => {
          console.error('Error adding hotel:', error);
          this.toastr.error(`${error.error.message}`, 'Error');
        }
      );
    } else {
      this.toastr.error('Error while adding hotel, Form must be valid','Error');
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.hotelImages = files;
  }
}
