import {
  REGISTER_PROGRESSBAR,
  SET_PROGRESSBAR_ALL_STEPS,
  SET_PROGRESSBAR_CURRENT_STEP,
  PROGRESSBAR_NEXT_STEP,
  PROGRESSBAR_PREV_STEP
} from '../constants';


export function registerProgressbar(id, allSteps, currentStep = 0) {
    return {
        type: REGISTER_PROGRESSBAR,
        payload: { id, allSteps, currentStep }
    };
}

export function changeProgressbarCurrentStep(id, currentStep) {
  return {
    type: SET_PROGRESSBAR_CURRENT_STEP,
    payload: { id, currentStep }
  };
}

export function progressbarNextStep(id) {
    return {
        type: PROGRESSBAR_NEXT_STEP,
        payload: { id }
    };
}

export function progressbarPrevStep(id) {
    return {
        type: PROGRESSBAR_PREV_STEP,
        payload: { id }
    };
}

export function changeProgressbarAllSteps(id, allSteps) {
  return {
    type: SET_PROGRESSBAR_ALL_STEPS,
    payload: { id, allSteps }
  };
}
