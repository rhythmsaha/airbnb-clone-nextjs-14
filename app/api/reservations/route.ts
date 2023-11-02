import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return NextResponse.error();
    }

    const body = await request.json();

    const { listingId, totalPrice, startDate, endDate } = body;

    if (!listingId || !totalPrice || !startDate || !endDate) {
        // return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },

        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
