export class UserFavoriteApiMock {

    getUserFavorite() {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: ['test', 'test2']
        }
    }

    addUserFavorite() {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: {}
        }
    }

    deleteUserFavorite() {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: {}
        }
    }
}