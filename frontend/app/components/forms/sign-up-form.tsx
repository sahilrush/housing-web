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

export default function SignupForm() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8001/auth/signup",
        formdata
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error("Sign-up Error", err);
      setMessage("error while signup");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your Details to sign Up to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email"> Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Role">Want to become Broker</Label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="Enter role (Optional)"
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </CardFooter>
        </Card>
        {message && <p className="mt-4 text-center">{message}</p>}
        <div className="mt-4 text-center text-sm">
          Already have an account
          <Link className="underline ml-2" href="/signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
