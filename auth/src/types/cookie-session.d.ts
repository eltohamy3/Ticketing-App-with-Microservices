import "cookie-session";

declare module "cookie-session" {
  interface Session {
    JWT : string
  }
}