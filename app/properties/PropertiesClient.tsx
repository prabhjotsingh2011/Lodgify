"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { safeReservation, safeUser, safelisting } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    listings?: safelisting[];
    currentUser?: safeUser | null;
}

const PropertiesClient:React.FC<TripsClientProps>=({
    listings,
    currentUser
})=>{
    const router=useRouter();
    const [deletingId, setDeletingId] = useState("");
    

    const onCancel= useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete('/api/listings/'+id)
        .then(()=>{
            toast.success("Listing Deleted");
            router.refresh()
        }).catch((e)=>{
            toast.error(e?.response?.data?.error || "Something went wrong");
        })
        .finally(()=>{
            setDeletingId("");
        })
    },[router])
    return (
        <Container>
            <Heading 
                title='Properties'
                subtitle='All your Properties in one place'
                />

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {
                        listings?.map((listing)=>(
                            <ListingCard
                                key={listing.id}
                                data={listing}
                                actionId={listing.id}
                                onAction={onCancel}
                                disabled={deletingId===listing.id}
                                actionLabel="Delete Property"
                                currentUser={currentUser}
                            />
                        ))
                    }
                </div>
        </Container>
    )
}
export default PropertiesClient;