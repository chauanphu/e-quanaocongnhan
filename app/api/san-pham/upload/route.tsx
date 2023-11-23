import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { createCategory, createProduct, updateCategoryById, updateOrCreateCategory, updateOrCreateProduct, updateProductById } from 'lib/query'

const mapExcel2Category = async (worksheet: ExcelJS.Worksheet, handleCategory) => {
  // Update prisma database with the data from the excel file
  for (let i = 2; i <= worksheet.rowCount; i++) {
    const id = worksheet.getCell(`A${i}`).value?.toString()
    const name = worksheet.getCell(`B${i}`).value?.toString()
    const slug = worksheet.getCell(`C${i}`).value?.toString()
    const parentID = worksheet.getCell(`D${i}`).value?.toString()
    const data = {
      name: name,
      slug: slug,
      parentID: parentID,
    }
    
    await handleCategory(id, data)
  }
}

const mapExcel2Product = async (worksheet: ExcelJS.Worksheet, handleProducts) => {
  // Iterate through each row, skip the first row (header row)


  for (let i = 2; i <= worksheet.rowCount; i++) {
    const id = worksheet.getCell(`A${i}`).value?.toString()
    const name = worksheet.getCell(`B${i}`).value?.toString()
    const sku = worksheet.getCell(`C${i}`).value?.toString()
    const slug = worksheet.getCell(`D${i}`).value?.toString()
    const _price = worksheet.getCell(`E${i}`).value?.toString()
    const price = _price ? parseInt(_price) : 0
    const image = worksheet.getCell(`F${i}`).value?.toString()
    const short_description = worksheet.getCell(`G${i}`).value?.toString()
    const long_description = worksheet.getCell(`H${i}`).value?.toString()
    const categoryId = worksheet.getCell(`I${i}`).value?.toString()
    const data = {
      name: name,
      slug: slug,
      sku: sku,
      price: price,
      image: image,
      short_description: short_description,
      long_description: long_description,
      categoryId: categoryId,
    }
    
    await handleProducts(id,data)
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
    return NextResponse.json({ success: false })
  }
  if (target === 'categories') {
    const categoryWorksheet = workbook.getWorksheet('Category')
    if (!categoryWorksheet) {
      return NextResponse.json({ success: false })
    }
    await mapExcel2Category(categoryWorksheet, handleCategory)
  } else if (target === 'products') {
    const productWorksheet = workbook.getWorksheet('Product')
    if (!productWorksheet) {
      return NextResponse.json({ success: false })
    }
    await mapExcel2Product(productWorksheet, handleProducts)
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