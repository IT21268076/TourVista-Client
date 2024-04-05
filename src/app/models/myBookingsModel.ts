export interface MyBookings {
    bookingId: number;
    totalAmount: number;
    checkInDate: Date;
    checkOutDate: Date;
    dateOfBooking: string; // Change type to string if it's received as a string from backend
    saveRoomType: SaveRoomType;
    saveDiscounts: SaveDiscount[];
    saveSupplements: SaveSupplements[];
  }
  
  export interface SaveRoomType {
    // Define properties based on backend DTO
  }
  
  export interface SaveDiscount {
    // Define properties based on backend DTO
  }
  
  export interface SaveSupplements {
    // Define properties based on backend DTO
  }
  