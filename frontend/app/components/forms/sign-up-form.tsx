"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";

interface SignUpFormData {
  email: string;
  password: string;
  role: string;
}

interface ServerResponse {
  message: string;
  user?: any;
}

export default function SignupForm() {
  const [formdata, setFormdata] = useState<SignUpFormData>({
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post<ServerResponse>(
        "http://localhost:8001/auth/signup",
        formdata,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message);

      // Clearing form on success
      if (!response.data.message.includes("error")) {
        setFormdata({
          email: "",
          password: "",
          role: "",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || "Error while signing up");
      } else {
        setMessage("An unexpected error occurred");
      }
      console.error("Sign-up Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formdata.email}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formdata.password}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="Enter 'ADMIN' for broker access (Optional)"
                onChange={handleChange}
                value={formdata.role}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            {message && (
              <p
                className={`text-sm ${
                  message.includes("error")
                    ? "text-destructive"
                    : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="underline ml-2" href="/signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
