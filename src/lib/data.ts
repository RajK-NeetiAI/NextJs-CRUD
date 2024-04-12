"use server";

import prisma from "@/lib/db";
import { productSchema } from "@/app/create/page";
import { z } from "zod"
import { revalidatePath } from "next/cache";

export const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    revalidatePath('/');
    return products;
};

export const createProduct = async (values: z.infer<typeof productSchema>) => {
    try {
        await prisma.product.create({
            data: values
        });
        return { error: "" };
    } catch (error) {
        return { error: "We are facing an issue at this moment." };
    }
};
