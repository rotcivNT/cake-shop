"use client";
import { SignIn } from "@clerk/nextjs";

function SignInWrapper() {
  return (
    <div className="flex justify-center items-center py-10">
      <SignIn />
    </div>
  );
}

export default SignInWrapper;
