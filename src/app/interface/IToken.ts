export default interface IToken {
  username: string,
  authenticated: boolean,
  created: Date,
  expiration: Date,
  accessToken: string,
  refreshToken: string
}
