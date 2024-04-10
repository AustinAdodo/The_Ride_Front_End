import {Payload} from "./Payload";

export class UserDataPayload extends Payload {
  firstName: string = "Driver";
  middleName: string = "";
  lastName: string = "";
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
