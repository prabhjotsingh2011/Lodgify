import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListing from "../actions/getFavouriteListing";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";


const FavouritesPage = async () => {
    const listings = await getFavouriteListing();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {

        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorites"
                    subtitle="Go to the home page and add some favorites!"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default FavouritesPage;