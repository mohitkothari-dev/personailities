"use client";

import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
export const SignUpView = () => {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError(null)
        authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        }, {
            onSuccess: () => {
                setIsLoading(false);
                router.push("/");
            },
            onError: (error) => {
                setIsLoading(false)
                setError(error.error.message)
            }
        })
    }

const onSocial = async (provider: "google" | "github") => {
        setIsLoading(true)
        setError(null)
        authClient.signIn.social({
          provider: provider,  
          callbackURL: "/",
        }, {
            onSuccess: () => {
                setIsLoading(false)
            },
            onError: (error) => {
                setIsLoading(false)
                setError(error.error.message)
            }
        })
    }

  return (
    <div className="flex flex-col gap-6">
    <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Let's get started</h1>
                        <p className="text-muted-foreground text-balanced">
                            Create your account
                        </p>
              </div>
              <div className="grid gap-3">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              {!!error &&
                <Alert className="bg-destructive/10">
                  <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              }
              
              <Button disabled={isLoading} type="submit" className="w-full">Sign Up</Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                <Button 
                disabled={isLoading}
                onClick={() => onSocial("google")}
                variant={"outline"} 
                type="button" 
                className="w-full">
                  Google
                </Button>
                <Button 
                disabled={isLoading} 
                onClick={() => onSocial("github")}
                variant={"outline"} 
                type="button" 
                className="w-full">
                  GitHub
                </Button>
               </div>
               <div className="text-center text-sm">
                <p>
                    Already have an account? <Link href="/sign-in" className="font-medium underline underline-offset-4">Sign in</Link>
                </p>
                <p>Forgot password? <Link href="#" className="font-medium underline underline-offset-4">Reset it</Link></p>
               </div>
              </div>
            </form>
          </Form>
        </CardContent>
    </Card>
    <div className="text-muted-foreground text-center text-xs *:[a]:hover:text-primary text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking Sign in, you agree to our <Link href="#" className="font-medium underline underline-offset-4">Terms of Service</Link> and <Link href="#" className="font-medium underline underline-offset-4">Privacy Policy</Link>.
    </div>
    </div>
  )
}