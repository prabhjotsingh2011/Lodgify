
import {NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface Iparams{
    listingId:string
}

export  async function POST(
    req: Request,
    {params}: {params:Iparams}
)
{
    const currentUser = await getCurrentUser();
    if(!currentUser) return NextResponse.redirect('/login')


    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string')  throw new Error('Invalid listingId')


    let favoriteIds= [...(currentUser.favoriteIds || [])]

    favoriteIds.push(listingId)

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user)
}




export async function DELETE(
    req: Request,
    {params}: {params:Iparams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser) return NextResponse.redirect('/login')


    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string')  throw new Error('Invalid listingId')


    let favoriteIds= [...(currentUser.favoriteIds || [])]
    favoriteIds = favoriteIds.filter(id => id !== listingId)

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user);
}