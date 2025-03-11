// API utility functions

// Get the backend URL, ensuring it works both client and server side
export function getBackendUrl(): string {
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
}

// Get CSRF token from cookie
export function getCsrfToken(): string | null {
    if (typeof document !== 'undefined') {
        const csrfCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='));

        if (csrfCookie) {
            return csrfCookie.split('=')[1];
        }
    }
    return null;
}

// Base fetch function with authentication and CSRF token
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const url = `${getBackendUrl()}${endpoint}`;

    // For unsafe methods, make sure we have a CSRF token
    const method = options.method || 'GET';
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
        // Now get the token from cookie (should be set after fetchCsrfToken)
        const token = getCsrfToken();

        // Add CSRF token to headers
        options.headers = {
            ...options.headers,
            'X-CSRFToken': token || '',
        };
    }

    // Ensure credentials are included for auth cookies
    const fetchOptions: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        }
    };

    return fetch(url, fetchOptions);
}

// Get items from the API
export async function getItems() {
    const response = await fetchWithAuth('/api/items/');

    if (response.status === 401) {
        throw new Error('Authentication required');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    return response.json();
}

// Get a single item by ID
export async function getItem(id: number) {
    const response = await fetchWithAuth(`/api/items/${id}/`);

    if (response.status === 401) {
        throw new Error('Authentication required');
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch item with id ${id}`);
    }

    return response.json();
}

// Update an item
export async function updateItem(id: number, data: { name: string; description: string }) {
    const response = await fetchWithAuth(`/api/items/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        throw new Error('Authentication required');
    }

    if (response.status === 403) {
        throw new Error('CSRF verification failed');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || 'Failed to update item');
    }

    return response.json();
}

// Login to the API
export async function login(username: string, password: string) {
    const response = await fetchWithAuth('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

// Logout from the API
export async function logout() {
    const response = await fetchWithAuth('/api/auth/logout/', {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    return response.json();
}

// Check if user is authenticated
export async function checkAuth() {
    const response = await fetchWithAuth('/api/auth/user/');
    return response.ok;
}
