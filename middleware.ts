import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getShoppingCart } from "./services/shoppingService";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/checkout(.*)", "/account(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userId = auth().userId;

  if (req.nextUrl.pathname === "/checkout" && userId) {
    const hasItems = await getShoppingCart(`get-cart/${userId}`);

    if (!hasItems || (Array.isArray(hasItems) && hasItems.length === 0)) {
      // Nếu giỏ hàng trống, chuyển hướng về trang giỏ hàng
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
