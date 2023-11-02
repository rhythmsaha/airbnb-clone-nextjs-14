"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & { user: SafeUser };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const category = useMemo(() => {
        return categories.find((items) => items.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />

                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                            // price={listing.price}
                            // totalPrice={totalPrice}
                            // onChangeDate={(value) => setDateRange(value)}
                            // dateRange={dateRange}
                            // onSubmit={onCreateReservation}
                            // disabled={isLoading}
                            // disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
