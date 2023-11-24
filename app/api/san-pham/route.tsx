import { NextRequest, NextResponse } from "next/server";
import prisma from 'lib/prisma';

export async function GET(request: NextRequest) {
    const categories = await prisma.category.findMany({
        select: {
          name: true,
          slug: true,
        }
      });

    // Response categoryies with status code 200
    return NextResponse.json({ categories }, { status: 200 })
}
