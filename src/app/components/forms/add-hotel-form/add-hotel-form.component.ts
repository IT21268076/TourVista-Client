import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel-form.component.html',
  styleUrls: ['./add-hotel-form.component.css']
})
export class AddHotelFormComponent implements OnInit {
  hotelForm: FormGroup;
  hotelImages!: FileList;

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService) {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      no: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
          alert("Hotel Added Successfully!!");
        },
        error => {
          console.error('Error adding hotel:', error);
          // Handle error here (e.g., display an error message to the user)
        }
      );
    } else {
      // Form is invalid or no images selected, handle accordingly (e.g., display an error message)
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.hotelImages = files;
  }
}
