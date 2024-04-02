export interface Booking {
    bookingId: number;
    totalAmount: number;
    status: BookingStatus;
    checkInDate: Date;
    checkOutDate: Date;
    dateOfBooking: Date;
    roomType: RoomType;
    userId: number;
    type: string;
    roomTypePrice: number;
    saveDiscounts: SaveDiscount[];
    selectedSupplements: SaveSupplements[];
    saveRoomType: SaveRoomType;
    payment: Payment;
  }

  export interface RoomType {
    // Define properties of RoomType here if necessary
  }
  
  export interface SaveDiscount {
    // Define properties of SaveDiscount here if necessary
  }
  
  export interface SaveSupplements {
    // Define properties of SaveSupplements here if necessary
  }
  
  export interface SaveRoomType {
    // Define properties of SaveRoomType here if necessary
  }
  
  export interface Payment {
    // Define properties of Payment here if necessary
  }
  
  export enum BookingStatus {
    // Define booking status enum values if necessary
  }