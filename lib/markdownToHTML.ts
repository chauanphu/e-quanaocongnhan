import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
import matter from 'gray-matter';

export default async function markdownToHtml(path: string) {
  if (fs.existsSync(path)) {
    // Read the file
    const fileContents = await fs.readFileSync(path, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return contentHtml
  }
  return ''
}