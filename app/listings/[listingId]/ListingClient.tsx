
'use client';
import Container from "@/app/components/Container";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { safeReservation, safeUser, safelisting } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

interface ListingClientProps {
    reservations?: safeReservation[];
    listing: safelisting & {
        user: safeUser;
    };
    currentUser?: safeUser | null;
}
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}


const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser,

}) => {

    const loginModal = useLoginModal();
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),

            })

            dates = [...dates, ...range];

        })
        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);


    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        })
            .then(() => {
                toast.success('Listing booked successfully');
                setDateRange(initialDateRange);

                router.push('/trips');
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            })


    }, [totalPrice, dateRange, currentUser, listing?.id, router, loginModal])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            }
            else setTotalPrice(listing.price);

        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        const foundCategory = categories?.find(item => item.label === listing.category);
        return foundCategory;
    }, [categories, listing.category]);


    return (
        <Container>
            <div
                className="
          max-w-screen-lg 
          mx-auto
        "
            >
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
                    >
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div
                            className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
                        >
                            <ListingReservation
                                isLoading={isLoading}
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;