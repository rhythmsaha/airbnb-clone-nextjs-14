import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listings/ListingClient";
import { SafeReservation } from "@/types";
import React from "react";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const listing = await getListingById(params);
    const reservations = (await getReservations(params)) as SafeReservation[];

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient currentUser={currentUser} listing={listing} reservations={reservations} />
        </ClientOnly>
    );
};

export default ListingPage;
