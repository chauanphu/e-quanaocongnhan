import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import path from 'path'
import prisma from 'lib/prisma'
import { updateCategoryById, updateProductById } from 'lib/query'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  try {
  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // Parse buffer to excel file using exceljs and save it to the file system
  const workbook = new ExcelJS.Workbook()
  const fullPath = path.join(process.cwd(), 'data', 'quanaocongnhan.xlsx')
  
  await workbook.xlsx.load(buffer)
  await workbook.xlsx.writeFile(fullPath)

  // Get the data of the "Category" sheet
  const categoryWorksheet = workbook.getWorksheet('Category')
  if (!categoryWorksheet) {
    return NextResponse.json({ success: false })
  }
  // Update prisma database with the data from the excel file
  for (let i = 2; i <= categoryWorksheet.rowCount; i++) {
    const id = categoryWorksheet.getCell(`A${i}`).value?.toString()
    const name = categoryWorksheet.getCell(`B${i}`).value?.toString()
    const slug = categoryWorksheet.getCell(`C${i}`).value?.toString()
    const parentID = categoryWorksheet.getCell(`D${i}`).value?.toString()
    const data = {
      name: name,
      slug: slug,
      parentID: parentID,
    }
    
    console.log(await updateCategoryById(id,data))
  }
  // Similarly with the "Product" sheet
  const productWorksheet = workbook.getWorksheet('Product')
  if (!productWorksheet) {
    return NextResponse.json({ success: false })
  }
  // Update prisma database with the data from the excel file
  for (let i = 2; i <= productWorksheet.rowCount; i++) {
    const id = productWorksheet.getCell(`A${i}`).value?.toString()
    const name = productWorksheet.getCell(`B${i}`).value?.toString()
    const slug = productWorksheet.getCell(`C${i}`).value?.toString()
    const price = productWorksheet.getCell(`D${i}`).value?.toString()
    const quantity = productWorksheet.getCell(`E${i}`).value?.toString()
    const description = productWorksheet.getCell(`F${i}`).value?.toString()
    const categoryID = productWorksheet.getCell(`G${i}`).value?.toString()
    const data = {
      name: name,
      slug: slug,
      price: price,
      quantity: quantity,
      description: description,
      categoryID: categoryID,
    }
    
    console.log(await updateProductById(id,data))
  }
  return NextResponse.json({ success: true })
  } catch (e: any) {
    // Handle errors here
    console.error(e)
    // Return a 500 error 
    return NextResponse.json({ success: false}, {status: 500 })
  }
}