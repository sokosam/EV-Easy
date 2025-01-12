import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import "./LoginAnimate.css"; // Import the updated CSS
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        position: "relative", // Establish stacking context
        zIndex: 3, // Higher than background lines
        height: "100vh",
        margin: 0,
        padding: 0,
        fontFamily: "Anta, sans-serif",
      }}
    >
      {/* Black Backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          zIndex: 0, // Lowest layer
        }}
      />

      {/* Background Animation */}
      <BackgroundLines />

      {/* Left Section: Login */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F5EAEA",
          zIndex: 4, // Higher than background lines
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          border: "2px solid #CCCCCC", // Added grey border
        }}
      >
        <h1 className="text-3xl font-bold" style={{ color: "#4D4646", zIndex: 5 }}>
          Login to Your Account
        </h1>
        <p className="text-sm mt-2" style={{ color: "#4D4646" }}>
          Enter your email and password to log in.
        </p>
        <form
          className="flex flex-col gap-4 mt-8"
          style={{
            zIndex: 5,
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Label htmlFor="email" style={{ color: "#4D4646" }}>
            Email
          </Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            style={{
              zIndex: 5,
              backgroundColor: "#FFFFFF",
              border: "1px solid #CCCCCC",
              padding: "10px",
              color: "#4D4646",
            }}
          />
          <Label htmlFor="password" style={{ color: "#4D4646" }}>
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            style={{
              zIndex: 5,
              backgroundColor: "#FFFFFF",
              border: "1px solid #CCCCCC",
              padding: "10px",
              color: "#4D4646",
            }}
          />
          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            style={{
              zIndex: 5,
              backgroundColor: "#7FCD91",
              color: "#4D4646",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Sign In
          </SubmitButton>
        </form>
      </div>

      {/* Right Section: Sign Up */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#7FCD91",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          padding: "20px",
          border: "2px solid #CCCCCC", // Added grey border
        }}
      >
        <h1 className="text-3xl font-bold">New Here?</h1>
        <p className="text-lg mt-4 text-center" style={{ maxWidth: "300px", zIndex: 5 }}>
          Sign up and let's get going places.
        </p>
        <Link
          href="/sign-up"
          style={{
            zIndex: 5,
            backgroundColor: "#FFFFFF",
            color: "#7FCD91",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            marginTop: "20px",
            textDecoration: "none",
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
