export interface AuthenticatedUser {
    id: string;
    email: string;
    role: string;

}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResult {
    user: AuthenticatedUser;
    accessToken: string;
}

