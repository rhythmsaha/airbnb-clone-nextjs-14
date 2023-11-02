import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import { SafeReservation } from "@/types";
import TripsClient from "@/components/trips/TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = ((await getReservations({ userId: currentUser.id })) as SafeReservation[]) || [];

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips." />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default TripsPage;
