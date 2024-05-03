import prisma from "@/lib/db";

export async function GET(request: Request) {
    /**
     * TODO
     * [ ] add user authentication
     */
    try {
        const products = await prisma.product.findMany();
        return Response.json({ products: products });
    } catch (error) {
        console.log(`Error at getAllProducts -> ${error}`);
        return Response.json({ products: null });
    }
};

export async function POST(request: Request) {
    /**
     * TODO
     * [ ] add user authentication
     */
    try {
        const data = await request.json();
        await prisma.product.create({
            data: data
        });
        return Response.json({ error: "" });
    } catch (error) {
        console.log(`Error at createProduct -> ${error}`);
        return Response.json({ error: "We are facing an issue at this moment." });
    }
};

export async function PUT(request: Request) {
    /**
     * TODO
     * [ ] add user authentication
     */
    try {
        const data = await request.json();
        await prisma.product.update({
            where: {
                id: data.id
            },
            data: data.product
        });
        return Response.json({ error: "" });
    } catch (error) {
        console.log(`Error at updateProductById -> ${error}`);
        return Response.json({ error: "We are facing an issue at this moment." });
    }
};

export async function DELETE(request: Request) {
    /**
     * TODO
     * [ ] add user authentication
     */
    try {
        const data = await request.json();
        await prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                isDeleted: true
            }
        });
        return Response.json({ error: "" });
    } catch (error) {
        console.log(`Error at deleteProductById -> ${error}`);
        return Response.json({ error: "We are facing an issue at this moment." });
    }
};
