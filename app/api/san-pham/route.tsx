import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";
import { getManyCategoriesWithSub } from "lib/query";

export async function GET(request: NextRequest) {
  const categories = await getManyCategoriesWithSub();

  // Response categoryies with status code 200
  return NextResponse.json({ categories }, { status: 200 });
}

export const dynamic = "force-dynamic";
