export interface Brewery {
    address_1?: string;
    address_2?: string;
    address_3?: string;
    brewery_type: string;
    city: string;
    country: string;
    id: string;
    latitude?: string;
    longitude?: string;
    name: string;
    phone?: string;
    postal_code?: string;
    state?: string;
    state_province?: string;
    street?: string;
    website_url?: string;
}
export interface BreweryLoadMatch {
    id: string;
}
export interface BreweryListMatch {
    by_city?: string;
    by_country?: string;
    by_name?: string;
    by_postal?: string;
    by_state?: string;
    by_type?: string;
    page?: number;
    per_page?: number;
}
