export interface Event {
   eventId: number;
   eventTitle: string;
   churchName: string;
   eventDate: string;
   eventTime: string;
   eventAddress: string;
   eventType: "Family" | "Youth" | "Young Adults" | "Single" | "Senior";
   description: string;
}