import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const api = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
})

export const getPosts = async (): Promise<User[]> => {
   const res = await api.get<User[]>('/users'); 
   return res.data;
}