
import { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';
import prisma from 'lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const categoryWorksheet = workbook.addWorksheet('Category');
    const productCategory = workbook.addWorksheet('Product');
    // Get all products and categories from prisma
    const categories = await prisma.category.findMany({});
    const products = await prisma.product.findMany({});

    // Add column headers and define column keys and widths for categories
    categoryWorksheet.columns = [
      { header: 'Slug', key: 'slug', width: 32 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Parent Slug', key: 'categorySlug', width: 32 },
    ];
    // Add column headers and define column keys and widths for products
    productCategory.columns = [
      { header: 'Slug', key: 'slug', width: 32 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'SKU', key: 'sku', width: 32 },
      { header: 'Price', key: 'price', width: 32 },
      { header: 'Image', key: 'image', width: 32 },
      { header: 'Short Description', key: 'short_description', width: 32 },
      { header: 'Long Description', key: 'long_description', width: 32 },
      { header: 'Category', key: 'categorySlug', width: 32 },
    ];
    // Add data to categories
    categories.forEach((category) => {
      categoryWorksheet.addRow(category);
    });
    // Add data to products
    products.forEach((product) => {
      productCategory.addRow(product);
    });

    // Set the response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="quanaocongnhan.xlsx"');

    // Write the workbook to the response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
