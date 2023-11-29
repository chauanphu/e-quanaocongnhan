import { NextRequest, NextResponse } from "next/server"

import { writeFile } from 'fs/promises'
import path from "path"

export async function POST(request: NextRequest) {
    const data = await request.formData()
    try {
        const files: File[] | null = data.getAll('images') as unknown as File[]
        if (!files) {
            return NextResponse.json({ success: false, message: "No file selected" },{status: 400})
        }
        for (var i = 0; i < files.length; i++) {
            console.log(files[i])
            const bytes = await files[i].arrayBuffer()
            const buffer = Buffer.from(bytes)
            const imagePath = path.join(process.cwd(), 'data', '_images', 'san-pham', files[i].name)
            await writeFile(imagePath, buffer)
        }

        return NextResponse.json({ success: true }, {status: 200})

    } catch (e: any) {
        console.error(e)
        return NextResponse.json({ success: false, message: e }, {status: 500})
    }
}

export const dynamic = "force-dynamic";