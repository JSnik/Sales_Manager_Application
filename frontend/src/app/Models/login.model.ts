export interface LoginModel {
  status: string,
  token: string,
  user: {
    _id: string
  }
}

export interface LoginModelParams {
  email: string,
  password: string,
}
