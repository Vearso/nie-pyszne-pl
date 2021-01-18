import {TimeObject, TimeState} from "@/store/interfaces";

const state : TimeState = {
    time: 0,
    calculatedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

const getters = {
    time(state: TimeState):number {
     return state.time;
    },
    calculatedTime(state:TimeState): TimeObject {
        return state.calculatedTime;
    }
}

const actions = {

}
const mutations = {

}