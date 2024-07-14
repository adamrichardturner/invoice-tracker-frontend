export interface User {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    google_id?: string;
    twitter_id?: string;
    profile_image_url?: string;
    created_at?: Date;
}
