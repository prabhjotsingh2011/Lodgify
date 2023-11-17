import bcrypt from 'bcryptjs';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function POST(request:Request) {
    console.log('register route');  
    const body =await request.json();
    const {email,name,password}=body;

    const userExists=await prisma.user.findUnique({
        where: {email: email}
    });

    if(userExists) return NextResponse.json({error: 'User already exists'});

    const hashedPassword=await bcrypt.hash(password, 10);

    const newUser=await prisma.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword
        }
    });

    return NextResponse.json(newUser)

}