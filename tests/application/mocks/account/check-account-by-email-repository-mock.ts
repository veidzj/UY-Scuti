export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepositorySpy {
  public email: string
  public output: boolean = false

  public async check(email: string): Promise<boolean> {
    this.email = email
    return this.output
  }
}
