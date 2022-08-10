export class AuthApiMock {

    messages(key: string) {
        const messagesList: any = {
            'user.not_found': 'User not found!',
            'user.invalid_password': 'Invalid password!',
            'user.created': 'User created!',
            'user.not_created': 'User not created!',
        }

        return messagesList[key];
    }

    login(email: string, password: string) {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: {
                user: {
                    id: 1,
                    name: 'Test',
                    email: ''
                },
                token: 'test'
            }
        }
    }

    createAccount(data: any) {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: {
                user: {
                    id: 1,
                    name: 'Test',
                    email: ''
                },
                token: 'test'
            }
        }
    }

    save(user: any, token: string) {
        return true;
    }

    isLogged(is: boolean = true) {
        return is;
    }

    logout() {
        return true;
    }
}