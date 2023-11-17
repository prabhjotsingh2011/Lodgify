

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>

                <EmptyState 
                    title="You are not logged in"
                    subtitle="Please login to view your reservations"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if(reservations.length===0 || !reservations){
        return (
            <ClientOnly>
                <EmptyState 
                    title="You have no reservations on your property"
                    subtitle="Looks like you have no reservation on your property."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
            </ClientOnly>
    )



}
export default ReservationPage;