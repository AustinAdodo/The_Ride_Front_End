export class Payload {
  name: string = "Driver";
  phoneNumber: string = "xxx";
  rating: number = 5.0;
  hasAccepted: boolean = true;
  message: string = "Your Driver is on his way";
  photoUrl: string = '';
  sex: string = '';
  type:string='General Message';

  constructor(init?: Partial<Payload>) {
    Object.assign(this, init);
  }
}
