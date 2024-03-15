import { Blog } from 'src/app/models/blog';
import { Experience } from 'src/app/models/experience';

export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  blogs: Blog[],
  experiences: Experience[],
  linkedInURL?: string,
  phone?: string,
  university?: string,
  archivedBlogs: Blog[]
}