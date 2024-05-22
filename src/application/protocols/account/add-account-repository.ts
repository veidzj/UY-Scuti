export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<string>
}

export namespace AddAccountRepository {
  export interface Input {
    username: string
    email: string
  }
}
