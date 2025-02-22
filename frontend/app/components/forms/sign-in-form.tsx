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
import { useState } from "react";
import axios from "axios";

interface SignInFormData {
  email: string;
  password: string;
}

interface ServerResponse {
  message: string;
  user?: any;
  token?: string;
}

export default function Signin() {
  const [formdata, setFormdata] = useState<SignInFormData>({
    email: "",
    password: "",
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
        "http://localhost:8001/auth/signin",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);

      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || "Error while signing in");
      } else {
        setMessage("An unexpected error occurred");
      }
      console.error("Sign-in Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
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
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
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
          Don&apos;t have an account?{" "}
          <Link className="underline ml-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
