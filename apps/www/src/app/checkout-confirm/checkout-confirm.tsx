import React from "react";

// types/ConfirmationTypes.ts

export interface BuyerInfo {
  name: string;
  idCard: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
}

export interface TicketInfo {
  id: number;
  passengerName: string;
  journey: string;
  date: string;
  seat: string;
  ticketNumber: string;
  price: number;
}

export interface ConfirmationData {
  buyerInfo: BuyerInfo;
  tickets: TicketInfo[];
}

const Checkout = () => {
  return (
    <div className="max-w-7xl">
      <div>
        <h1>Buying Confirmation</h1>
        <div>
          <h3>Buyer Information</h3>
          <p>Name: </p>
          <p>CitizenID / Passport: </p>
          <p>Phone Number: </p>
          <p>Email: </p>
          <p>Payment Type: </p>
        </div>
      </div>
      <div>
        <h3 />
      </div>
      <div />
    </div>
  );
};

export default Checkout;
