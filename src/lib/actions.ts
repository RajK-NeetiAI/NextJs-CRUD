"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./db";
import { createProduct, updateProductById } from "@/lib/data";
import { productSchema } from "@/lib/schemas";
import { z } from "zod";

export const handleDeleteProductAction = async (id: number) => {
    await prisma.product.delete({
        where: {
            id: id
        }
    });
    revalidatePath('/products');
    redirect('/products');
};

export const handleCreateProductAction = async (product: z.infer<typeof productSchema>) => {
    await createProduct(product);
    revalidatePath('/products');
    redirect('/products');
};

export const handleEditProductAction = async (id: number, product: z.infer<typeof productSchema>) => {
    await updateProductById(id, product);
    revalidatePath('/products');
    redirect('/products');
};
