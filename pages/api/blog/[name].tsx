import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

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
  const fullPath = path.join(process.cwd(), 'data', '_posts', `${name}.md`);
  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    // Read the file
    const fileContents = await fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Respond with contentHtml as text/html
    res.status(200).json({ contentHtml, ...matterResult.data });
  } else {
    res.status(404).json({ message: 'Blogs not found' });
  }
}