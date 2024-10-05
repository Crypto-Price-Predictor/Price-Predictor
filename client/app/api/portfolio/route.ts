// app/api/portfolio/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req : any) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get('userID');

    // Validate userID
    if (!userID) {
        return NextResponse.json({ error: 'Missing userID' }, { status: 400 });
    }

    try {
        // Fetch the portfolio based on userID
        const portfolio = await prisma.portfolioUser.findUnique({
            where: { id: Number(userID) },  // Ensure the ID is a number
        });

        // Check if portfolio is found
        if (!portfolio) {
            return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }

        return NextResponse.json(portfolio); // Return the portfolio details
    } catch (error) {
        console.error('Error fetching portfolio:', error); // Log the error
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
