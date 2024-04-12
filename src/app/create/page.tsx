"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createProduct } from "@/lib/data"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export const productSchema = z.object({
    name: z.string().min(3, { message: "Please enter name." }),
    description: z.string().min(3, { message: "Please enter description." }),
    price: z.coerce.number({ invalid_type_error: "Please enter only number." }).gte(1, { message: "Please enter price grater than 1." }),
    stock: z.coerce.number({ invalid_type_error: "Please enter only number." }).gte(1, { message: "Please enter stock greater than 1." })
});

export default function CreateProductPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0
        }
    });
    async function handleSubmit(values: z.infer<typeof productSchema>) {
        const { error } = await createProduct(values);
        if (error !== "") {
            toast({
                title: "ERROR",
                description: error,
                variant: "destructive"
            })
        } else {
            router.push('/');
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product price" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product stock" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
};
