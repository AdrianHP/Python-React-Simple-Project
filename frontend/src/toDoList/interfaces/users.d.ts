import { Address } from "./address";

export interface User{
    id: string;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    address: Address;
  }
  