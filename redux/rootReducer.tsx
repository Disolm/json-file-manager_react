import {SAVE} from  './types'
export function rootReducerFun(state: any, action: any) {
    if (action.type === SAVE){
        // console.log(action.jsonNew)
        return action.jsonNew
    }
    return state
}