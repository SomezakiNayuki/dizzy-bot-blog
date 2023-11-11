import { Blog } from "./blog";
import { Experience } from "./experience";

export interface User {
  id: number,
  username: string,
  email: string,
  blogs: Blog[],
  experiences: Experience[]
}