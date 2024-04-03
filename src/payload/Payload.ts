/**
 * payload request types (General Message, New trip, None)
 */
export class Payload {
  name: string = "Driver";
  phoneNumber: string = "xxx";
  rating: number = 5.0;
  hasAccepted: boolean = true;
  message: string = "No Message";
  photoUrl: string = "";
  sex: string = "";
  type: string = 'General Message';
  topic: string = '';
  status: string = 'Front-End';
  location: string = '';

  constructor(init?: Partial<Payload>) {
    Object.assign(this, init);
  }
}
