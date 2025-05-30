export interface ITour {
  _id: string;
  code: string; // mã tour
  name: string;
  description: string;
  totalDuration: string; // ví dụ: "3 ngày 2 đêm"
  departureDates: Date[]; // các ngày khởi hành cụ thể
  slug: string;
  transport: string ;
  departure: string; // khởi hành từ đâu
  destination: string; // đến đâu

  itinerary: {
    title: string;
    content: string;
  }[];

  price: number | '';
  thumbnail: string;
  images: string[];
  overview: string;
  notes: string;

  createdAt: Date;
  updatedAt: Date;
}