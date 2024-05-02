"use server";

import { productSchema } from "@/lib/schemas";
import { z } from "zod";

export const getAllProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        next: { revalidate: 0 },
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const products = await res.json();
    return products.products;
};

export const createProduct = async (product: z.infer<typeof productSchema>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: JSON.stringify(product)
    });
    const error = await res.json();
    return error.error;
};

export const getProductById = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
        next: { revalidate: 0 },
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const product = await res.json();
    return product.product;
};

export const updateProductById = async (id: number, product: z.infer<typeof productSchema>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        next: { revalidate: 0 },
        method: "PUT",
        headers: {
            Accept: "application/json"
        },
        body: JSON.stringify({
            id: id,
            product: product
        })
    });
    const error = await res.json();
    return error.error;
};

export const deleteProductById = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        next: { revalidate: 0 },
        method: "PUT",
        headers: {
            Accept: "application/json"
        },
        body: JSON.stringify({ id: id })
    });
    const error = await res.json();
    return error.error;
};
