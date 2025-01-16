import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getFolderMarkups = (
  directory: string
): matter.GrayMatterFile<string>[] | null => {
  /* Converts all files in a directory to gray-matter objects */
  try {
    const directoryPath = path.join(process.cwd(), directory);
    const files = fs.readdirSync(directoryPath);

    return files.map((filename) => {
      const filePath = path.join(directoryPath, filename);
      const data = matter.read(filePath);
      return data;
    });
  } catch (error) {
    return null;
  }
};

export const getMarkup = (
  directory: string,
  filename: string
): matter.GrayMatterFile<string> | null => {
  /* Converts specific file to a gray-matter object */
  try {
    const filePath = path.join(process.cwd(), directory, filename);

    const file = matter.read(filePath);
    console.log({ filePath, file });
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string; // Use Date type if you want to work with Date objects
  thumbnail?: string; // Optional
  author: string;
  body: string; // The actual content of the post
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
    } as PostData;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""), // Removing .md extension
    },
  }));
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    ...matterResult.data,
    date:
      matterResult.data.date instanceof Date
        ? new Date(matterResult.data.date).toISOString()
        : matterResult.data.date,
    body: matterResult.content,
  } as PostData;
}
