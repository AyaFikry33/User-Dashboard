export interface IUser {
  data: IUserData[],
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  support: {
    text : string,
    url: string
  }
}
export interface IUserData {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
export interface IUserDetails {
  data : IUserData;
  support: {}
}
