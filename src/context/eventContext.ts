export interface Event {
   eventId: number;
   eventTitle: string;
   eventDate: Date;
   eventTime: string;
   eventAddress: string;
   eventType: "Family" | "Youth" | "Young Adults" | "Single" | "Senior";
   description: string;
}
