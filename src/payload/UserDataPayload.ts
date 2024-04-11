import {Payload} from "./Payload";

export class UserDataPayload extends Payload {
  firstName: string = "Driver";
  middleName: string = "";
  lastName: string = "";
  recentTrips: { destination: string, date: string }[] = [{
    destination: 'No destinations yet',
    date: '2024-06-01'
  }];
  incomingPayments: { amount: number, date: string }[] = [{amount: 0, date: '2024-06-01'}];
  email: string = "";
  carColor: string = "";
  carPlateNumber: string = "";
  carModel: string = "No Message";
  address: string = "address";
  taxID: string = "";
  Usertype: string = "";

  constructor(init?: Partial<UserDataPayload>) {
    super();
    Object.assign(this, init);
  }
}
