// Auth types
export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

// Data types
export interface Item {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface ItemsResponse {
    items: Item[];
}

// Form types
export interface ItemFormData {
    name: string;
    description: string;
}

// Auth response types
export interface LoginResponse {
    detail: string;
}

// Form types
export interface LoginFormData {
    username: string;
    password: string;
}
