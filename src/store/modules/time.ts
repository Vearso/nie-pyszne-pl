import {TimeObject, TimeState} from "@/store/interfaces";

const state: TimeState = {
    time: 0,
    calculatedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

const getters = {
    time(state: TimeState): number {
        return state.time;
    },
    calculatedTime(state: TimeState): TimeObject {
        return state.calculatedTime;
    },
    displayedTime(state: TimeState): string {
        const hoursArray = state.calculatedTime.hours.toString().split('');
        const minutesArray = state.calculatedTime.minutes.toString().split('');
        const secondsArray = state.calculatedTime.seconds.toString().split('');

        let timeString = ''

        if (hoursArray.length === 1 && hoursArray[0] !== '0') {
            if (hoursArray.length === 1) {
                timeString = '0' + hoursArray[0] + ':'
            } else {
                timeString = hoursArray[0] + hoursArray[1] + ':';
            }
        }

        if (minutesArray.length === 1) {
            timeString += '0' + minutesArray[0] + ':';
        } else {
            timeString += minutesArray[0] + minutesArray[1] + ':';
        }

        if (secondsArray.length === 1) {
            timeString += '0' + secondsArray[0];
        } else {
            timeString += secondsArray[0] + secondsArray[1];
        }

        return timeString;
    }

}

const actions = {
    async countDown(context: any) {
        setTimeout(() => {
            if (context.state.time !== 0) {
                context.commit('decrementTime');
                context.commit('calculateTime');
                context.dispatch('countDown');
            }
        }, 1000)
    }
}
const mutations = {
    setTime(state: TimeState): void {
        state.time = Math.floor(Math.random() * (70 - 60 + 1) + 60)
    },
    decrementTime(state: TimeState): void {
        state.time -= 1;
    },
    calculateTime(state: TimeState): void {
        const hours = Math.floor((state.time / 3600));
        const minutes = Math.floor((state.time % 3600) / 60);
        const seconds = ((state.time % 3600) % 60);
        state.calculatedTime = {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}