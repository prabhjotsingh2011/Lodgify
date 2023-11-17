import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="You must be signed in to view this page"
                />
            </ClientOnly>
        )
    }

    const reservations= await getReservations({
        userId: currentUser.id
    });

    if(reservations.length===0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips"
                    subtitle="You haven't booked any trips yet"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
    


}

export default TripsPage;