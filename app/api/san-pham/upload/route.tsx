import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import path from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

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


  return NextResponse.json({ success: true })
}