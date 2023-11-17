import { Listing, Reservation, User } from "@prisma/client";

export type safelisting= Omit<Listing, "createdAt"> &{
    createdAt: string;
}

export type safeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified">
&{
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null | undefined;
};  

export type safeReservation =Omit<
    Reservation,
    "createdAt" | "updatedAt" | "startDate" | "endDate" | "listing"
>&{
    createdAt: string;
    updatedAt: string;
    startDate: string;
    endDate: string;
    listing: safelisting;
}
