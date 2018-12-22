import isEqual from 'lodash'

export default function localStorageMiddleware(key) {
    return ({ getState }) => next => action => {
        const previousState = Object.assign({}, getState())

        const result = next(action)

        const nextState = Object.assign({}, getState())

        if (!isEqual(previousState, nextState)) {
            const storageValue = JSON.stringify(nextState)
            window.localStorage.setItem(key, storageValue)
        }

        return result
    }
}

