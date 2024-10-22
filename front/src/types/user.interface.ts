export interface User {
    id: number,
    user_name: string,
    user_password: string,
    profile_picture: string,
    is_admin: boolean,
    hashedRT: string
}