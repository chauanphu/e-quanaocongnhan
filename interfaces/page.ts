import { CategoryWithSub } from "lib/prisma";

export default interface Page {
    name: string;
    link: string;
    image?: string;
    subPages?: CategoryWithSub[];
}