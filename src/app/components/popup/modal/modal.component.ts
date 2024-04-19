import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { environment } from 'src/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  private backendUrl = environment.baseUrl;
  // Define an output property to emit the hotelId obtained from the modal
  @Output() hotelIdObtained: EventEmitter<number> = new EventEmitter<number>();
  email: string = '';
  errorOccurred: boolean = false;
  errorMessage: string = '';
  
  constructor(private http: HttpClient, private elementRef: ElementRef, private renderer: Renderer2) {}

  // Function to emit the hotelId value to the parent component
  addHotelEmail(): void {
    const url = `${this.backendUrl}/hotel/getIdByEmail/${this.email}`;
    this.http.get<number>(url)
      .subscribe(
        (response: any) => {
          if (response !== null) {
            const hotelId = response.data;
            this.hotelIdObtained.emit(hotelId);
            console.log(hotelId);
            
          } else {
            // Handle the case where hotel ID does not exist
            console.error('Hotel not found for email:', this.email);
            // Display an error message or perform any other action
          }
        },
        (error) => {
          console.error('Error:', error);
                    // Set error flag and message
                    this.errorOccurred = true;
                    this.errorMessage = 'An error occurred while adding the hotel email.';
        }
    );
  }


  closeModal(): void {
    // Close the modal by removing it from the DOM
    this.errorOccurred = false;
    this.renderer.removeChild(document.body, this.elementRef.nativeElement);
  }
}
