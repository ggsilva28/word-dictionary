export class wordsApiMock {

    get() {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: {
                results: ['test', 'test2']
            }
        }
    }

    getWord() {
        return {
            isOk: true,
            code: 200,
            message: 'OK',
            data: { word: 'test' }
        }
    }

    saveToHistory() { }

    updateOnWordAPIHistory() { }

    getHistory() {
        return {
            isOk: true,
            data: {
                results: ['test']
            }
        }
    }
}