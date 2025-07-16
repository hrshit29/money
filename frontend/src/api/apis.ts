// Define your base URL here
const BASE_URL = import.meta.env.VITE_API_URL;
;

// Auth endpoints
export const AUTH_API = {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    PROFILE: `${BASE_URL}/auth/profile`,
};

// Income endpoints
export const INCOME_API = {
    ADD: `${BASE_URL}/add-income`,
    GET: `${BASE_URL}/get-incomes`,
    DELETE: (id: any) => `${BASE_URL}/delete-income/${id}`, // Use function for dynamic segments
};

// Expense endpoints
export const EXPENSE_API = {
    ADD: `${BASE_URL}/add-expense`,
    GET: `${BASE_URL}/get-expenses`,
    DELETE: (id: any) => `${BASE_URL}/delete-expense/${id}`, // Use function for dynamic segments
};
