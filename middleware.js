export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/delivery/:path*", "/profile/:path*"],
};
