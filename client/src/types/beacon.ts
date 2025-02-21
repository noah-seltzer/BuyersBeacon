import { User } from "@/types/user"

export interface Beacon {
    title: string;
    category: string;
    description: string;
}

export interface Category {
    category_id: string
    category_name: string
}