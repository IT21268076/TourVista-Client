import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service'; 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  card: boolean = false;
  bookingId: any;
  prepaymentPercentage: any;
  totalAmount: any;
  prePaymentAmount: any;
  payAmount: any;
  payMethod: string = 'CARD'; // Default to 'CARD'

  constructor(
    private route: ActivatedRoute, 
    private bookingService: BookingService, 
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize parameters passed from the proceedToPayment method
    this.route.params.subscribe(params => {
      this.bookingId = params['bookingId'];
      console.log(this.bookingId)
    });
    this.route.queryParams.subscribe(params => {
      this.prepaymentPercentage = params['prepaymentPercentage'];
      this.totalAmount = params['totalAmount'];
    });

    this.calculatePrepaymentAmount(this.prepaymentPercentage);
    
  }

  //calculate Prepayment amount
  calculatePrepaymentAmount(prepaymentPercentage: any){
    this.prePaymentAmount = this.totalAmount * prepaymentPercentage/100;
  }

  makePayment(): void {
    if(this.payAmount >= this.prePaymentAmount){
      // Use this.bookingId, this.prepaymentPercentage, this.totalAmount to make payment
      this.bookingService.makePayment(this.bookingId, { prepaymentPercentage: this.prepaymentPercentage, totalAmount: this.totalAmount, payAmount: this.payAmount, payMethod: this.payMethod })
        .subscribe((response: any) => {
      // Handle the response from the backend service if needed
        console.log(response);
        console.log('Selected payment method:', this.payMethod);
        this.toastr.success('Payment successful !');
        this.router.navigate(['/my-bookings']);
      });
    } else {
      this.toastr.error('please do 10% of total payment', 'Error');
    }
    
  }

  payWithCard() {
    this.card = true;
    // Add any additional logic here
  }

  payWithPayPal() {
    this.card = false;
    // Add any additional logic here
  }
}


