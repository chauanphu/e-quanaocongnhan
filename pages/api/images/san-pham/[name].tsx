import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {name} = req.query;
  if (!name) {
    res.status(400).json({ message: 'Missing parameters' });
    return;
  }
  // Construct the path to the image file
  const filePath = path.join(process.cwd(), 'data', '_images', 'san-pham', name as string);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the file
    const file = fs.readFileSync(filePath);

    // Set the Content-Type header to image/webp
    res.setHeader('Content-Type', 'image/webp');

    // Send the file
    res.send(file);
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
}