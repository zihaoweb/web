export namespace Login {
  export interface ReqLoginFrom {
    user_name: string,
    user_password: string
  }

  export interface ResLogin {
    token: string
  }

  export interface ResAuthButtons {
    [key: string]: string[]
  }
}