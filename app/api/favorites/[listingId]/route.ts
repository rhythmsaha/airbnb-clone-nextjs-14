import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") throw new Error("Invalid listing id");

    const favoriteIds = [...(currentUser.favouriteIds || [])];

    favoriteIds.push(listingId);

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds: favoriteIds,
        },
    });

    return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") throw new Error("Invalid listing id");

    let favoriteIds = [...(currentUser.favouriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds: favoriteIds,
        },
    });

    return NextResponse.json(updatedUser);
}
