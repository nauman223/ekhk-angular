export class Login {
    email?: string;
    password?: string;
}

export class LoginInfo {
    user?: User
}

export class User {
    id?: number;
    full_name?: string;
    email?: string;
    password?: string;
    role?: string;
    image?: string;
    gender?: string;
    phone?: string;
    token?: string;
}
