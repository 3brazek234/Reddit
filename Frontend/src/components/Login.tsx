import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { formSchema } from "@/lib/validation";
import { userApi } from "@/services/api";
import toast from "react-hot-toast";
import useAuthStore from "@/store/store";
const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await userApi.login(values.email, values.password);
    if (response.success) {
      toast.success(response.message);
      useAuthStore.setState({ isAuthenticated: true });
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded w-full"
          >
            Log In
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
