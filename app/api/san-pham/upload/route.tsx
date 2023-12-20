import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { updateCategoryById, updateOrCreateCategory, updateOrCreateProduct, updateProductById } from 'lib/query'
import { Category, Product } from '@prisma/client'

const mapExcel2Category = async (worksheet: ExcelJS.Worksheet, handleCategory: (slug, data) => Promise<null>) => {
  // Update prisma database with the data from the excel file
  for (let i = 2; i <= worksheet.rowCount; i++) {
    const slug = worksheet.getCell(`A${i}`).value?.toString()
    const name = worksheet.getCell(`B${i}`).value?.toString()
    const parentID = worksheet.getCell(`C${i}`).value?.toString()
    if (!slug || !name) {
      return null
    }
    const data: Category = {
      name: name,
      slug: slug,
      parentSlug: parentID as string | null,
    }
    const result = await handleCategory(slug, data)
    if (result === null) return null
  }
}

const mapExcel2Product = async (worksheet: ExcelJS.Worksheet, handleProducts) => {
  // Iterate through each row, skip the first row (header row)

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const slug = worksheet.getCell(`A${i}`).value?.toString()
    const name = worksheet.getCell(`B${i}`).value?.toString()
    const sku = worksheet.getCell(`C${i}`).value?.toString()
    const _price = worksheet.getCell(`D${i}`).value?.toString()
    const price = _price ? parseInt(_price) : 0
    const image = worksheet.getCell(`E${i}`).value?.toString()
    const short_description = worksheet.getCell(`F${i}`).value?.toString()
    const long_description = worksheet.getCell(`G${i}`).value?.toString()
    const categorySlug = worksheet.getCell(`H${i}`).value?.toString()
    if (!name || !slug || !sku !! || !categorySlug) {
      return null
    }

    const data: Product = {
      name: name,
      slug: slug,
      sku: sku,
      // Random 1 digit decimal from 4 to 5
      rating: Math.floor(Math.random() * 10) / 10 + 4,
      price: price,
      image: image as string | null,
      short_description: short_description as string | null,
      long_description: long_description as string | null,
      categorySlug: categorySlug
    }
    
    const result = await handleProducts(slug ,data)
    if (result === null) return null
  }
}

const cvt2Workbook = async (data: FormData) => {
  try {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
      return null
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
  
    // With the file data in the buffer, you can do whatever you want with it.
    // Parse buffer to excel file using exceljs and save it to the file system
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    // const fullPath = path.join(process.cwd(), 'data', 'quanaocongnhan.xlsx')
    // await workbook.xlsx.writeFile(fullPath)
    return workbook
  } catch (e: any) {
    return null
  }
}

const handler = async (request: NextRequest, handleCategory, handleProducts) => {
  const data = await request.formData()
  const workbook = await cvt2Workbook(data)
  // Get _target from query string
  const target = request.nextUrl.searchParams.get('target')
  if (!workbook) {
    return NextResponse.json({ success: false }, {status: 400, statusText: 'Excel file Not found'})
  }
  if (target === 'categories') {
    const categoryWorksheet = workbook.getWorksheet('Category')
    if (!categoryWorksheet) {
      return NextResponse.json({ success: false }, {status: 400, statusText: 'Category Sheet Not found'})
    }
    const result = await mapExcel2Category(categoryWorksheet, handleCategory)
    if (result === null) return NextResponse.json({ success: false }, {status: 500, statusText: 'Internal Server Error'})
  } else if (target === 'products') {
    const productWorksheet = workbook.getWorksheet('Product')
    if (!productWorksheet) {
      return NextResponse.json({ success: false }, {status: 400, statusText: 'Product Sheet Not found'})
    }
    const result = await mapExcel2Product(productWorksheet, handleProducts)
    if (result === null) return NextResponse.json({ success: false }, {status: 500, statusText: 'Internal Server Error'})
  } else {
    return NextResponse.json({ success: false }, {status: 400, statusText: 'Bad request'})
  }
  return NextResponse.json({ success: true })
} 

export async function PUT(request: NextRequest) {
  return await handler(request, updateCategoryById, updateProductById)
}

export async function PATCH(request: NextRequest) {
  return await handler(request, updateOrCreateCategory, updateOrCreateProduct)
}

// export async function POST(request: NextRequest) {
//   return await handler(request, createCategory, createProduct)
// }

export const dynamic = "force-dynamic";
