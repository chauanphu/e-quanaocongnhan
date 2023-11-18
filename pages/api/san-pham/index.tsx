import type { NextApiRequest, NextApiResponse } from 'next'
import data from "data.json"
import Category from 'interfaces/category';
import prisma from 'lib/prisma';

type ResponseData = {
  categories: any[]
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
        }
      });
      // cast categories to Category[]
  res.status(200).json({ categories })
}