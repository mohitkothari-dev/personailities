"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data: session} = authClient.useSession();

  const onSubmit = () => {
  authClient.signUp.email({
    email,
    password, 
    name,
  }, {
        onRequest: () => {
            //show loading
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
        onError: () => {
            // display the error message
            window.alert("Something went wrong");
        },
    });
}


  const onLogin = () => {
  authClient.signIn.email({
    email,
    password,
  }, {
        onRequest: () => {
            //show loading
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
        onError: () => {
            // display the error message
            window.alert("Something went wrong");
        },
    });
}

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Welcome, {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onLogin}>Login</Button>
    </div>
    </div>
  )
}