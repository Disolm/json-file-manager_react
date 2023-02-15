import {rootReducerFun} from '../redux/rootReducer'
export function createStore (rootReducer: any, initialState: any) {
    let state = rootReducerFun(initialState, {type: '__INIT__'})
    const subscribers: any[] =[]
    return {
        //action = {type: 'SAVE'}
        dispatch(action: any) {
            state = rootReducerFun(state, action)
            subscribers.forEach(sub => sub())
        },
        subscribe(callback: any) {
            subscribers.push(callback)
        },
        getState() {
            return state
        }
    }
}