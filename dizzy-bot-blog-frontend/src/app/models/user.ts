import { Blog } from "./blog";
import { Experience } from "./experience";

export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  blogs: Blog[],
  experiences: Experience[],
  linkedInURL?: string,
  phone?: string,
  university?: string
}