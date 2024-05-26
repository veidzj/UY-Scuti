export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<string>
}

export namespace AddAccount {
  export interface Input {
    username: string
    email: string
    password: string
    birthdate: string
    profileImage?: string
  }
}
