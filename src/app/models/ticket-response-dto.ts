
export interface TicketResponseDTO {
  ticketHash: string;
  qrCodeBase64: string;
  eventName: string;
  eventDate: string;
  location: string;
  sector: string;
  price: number;
}
