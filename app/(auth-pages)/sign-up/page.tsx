import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import './styles.css';

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen justify-center bg-black lightning-effect">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="">
      <form
        className="flex flex-col lg:flex-row items-stretch p-8 border border-[#5B5656] rounded-md bg-[#F5EAEA] shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          fontFamily: "Anta, sans-serif",
        }}
      >
        {/* Left Side: Form Inputs */}
        <div className="flex flex-col flex-1 gap-4 pr-8">
          <h1 className="text-3xl font-bold mb-4 text-[#5B5656]">Sign up</h1>
          <div>
            <Label htmlFor="email" className="text-lg text-[#5B5656]">
              Email
            </Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="w-full border border-[#5B5656] rounded-md mt-1 p-2 bg-white text-black"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg text-[#5B5656]">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className="w-full border border-[#5B5656] rounded-md mt-1 p-2 bg-white text-black"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="text-lg text-[#5B5656]">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirm-password"
              placeholder="Confirm your password"
              minLength={6}
              required
              className="w-full border border-[#5B5656] rounded-md mt-1 p-2 bg-white text-black"
            />
          </div>
          <div className="text-sm text-[#7FCD91] mt-4 text-center">
            Already have an account?
            <br />
            <Link
              href="/sign-in"
              className="text-[#7FCD91] font-medium underline"
            >
              Log in.
            </Link>
          </div>
        </div>

        {/* Right Side: Glow Border Next Button */}
        <div
          className="flex flex-col justify-center items-end flex-1"
          style={{
            paddingRight: "8px",
          }}
        >
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="bg-[#7FCD91] text-black text-xl font-medium rounded-lg animate-glow-border px-16 py-8"
          >
            Let's Go! →
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
