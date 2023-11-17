import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import TripsClient from "./PropertiesClient";

const propertiesPage = async () => {
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

    const listings= await getListings({
        userId: currentUser.id
    });

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No Properties found"
                    subtitle="You have not created any properties yet"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
    


}

export default propertiesPage;