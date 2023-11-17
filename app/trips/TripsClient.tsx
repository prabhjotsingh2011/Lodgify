"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { safeReservation, safeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations?: safeReservation[];
    currentUser?: safeUser | null;
}

const TripsClient:React.FC<TripsClientProps>=({
    reservations,
    currentUser
})=>{
    const router=useRouter();
    const [deletingId, setDeletingId] = useState("");
    

    const onCancel= useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete('/api/reservations/'+id)
        .then(()=>{
            toast.success("Reservation cancelled");
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
                title='Trips'
                subtitle='All your trips in one place'
                />

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {
                        reservations?.map((reservation)=>(
                            <ListingCard
                                key={reservation.id}
                                data={reservation.listing}
                                reservation={reservation}
                                actionId={reservation.id}
                                onAction={onCancel}
                                disabled={deletingId===reservation.id}
                                actionLabel="Cancel Reservation"
                                currentUser={currentUser}
                            />
                        ))
                    }
                </div>
        </Container>
    )
}
export default TripsClient;