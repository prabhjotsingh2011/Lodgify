
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
){
    const currentUser= await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body= await request.json();
    const { title, description,category,roomCount,imageSrc,bathroomCount,guestCount, price, location }= body;

    Object.keys(body).forEach((key)=>{
        if(!body[key]){
            return NextResponse.error();
        }
    })

    const listing= await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc:imageSrc?imageSrc:"https://via.placeholder.com/300x200",
            category,
            roomCount:parseInt(roomCount,10),
            bathroomCount:parseInt(bathroomCount,10),
            guestCount:parseInt(guestCount,10),
            price:parseInt(price,10),
            locationValue:location.value,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);


}