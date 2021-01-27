import { TimeObject, TimeState } from "@/store/interfaces";

const getters = {
  time(state: TimeState): number {
    return state.time;
  },
  calculatedTime(state: TimeState): TimeObject {
    return state.calculatedTime;
  },
  displayedTime(state: TimeState): string {
    const hoursArray = state.calculatedTime.hours.toString().split("");
    const minutesArray = state.calculatedTime.minutes.toString().split("");
    const secondsArray = state.calculatedTime.seconds.toString().split("");

    let timeString = "";

    if (hoursArray.length === 1 && hoursArray[0] !== "0") {
      if (hoursArray.length === 1) {
        timeString = "0" + hoursArray[0] + ":";
      } else {
        timeString = hoursArray[0] + hoursArray[1] + ":";
      }
    }

    if (minutesArray.length === 1) {
      timeString += "0" + minutesArray[0] + ":";
    } else {
      timeString += minutesArray[0] + minutesArray[1] + ":";
    }

    if (secondsArray.length === 1) {
      timeString += "0" + secondsArray[0];
    } else {
      timeString += secondsArray[0] + secondsArray[1];
    }

    return timeString;
  }
};

const actions = {
  countDown: jest.fn()
};
const mutations = {
  setTime: jest.fn(),
  decrementTime: jest.fn(),
  calculateTime: jest.fn()
};

export default {
  namespaced: true,
  getters,
  actions,
  mutations
};
