import prisma from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    /**
     * TODO
     * [ ] add user authentication
     */
    try {
        const id = params.id;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        });
        return Response.json({ product: product });
    } catch (error) {
        console.log(`Error at getAllProducts -> ${error}`);
        return Response.json({ product: null });
    }
};