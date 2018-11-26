import {
  REGISTER_PROGRESSBAR,
  SET_PROGRESSBAR_ALL_STEPS,
  SET_PROGRESSBAR_CURRENT_STEP,
  PROGRESSBAR_NEXT_STEP,
  PROGRESSBAR_PREV_STEP
} from '../constants';

import { arrToMap } from './utils'
import { Record } from 'immutable'


const ProgressbarRecord = Record({
    id: null,
    allSteps: null,
    currentStep: null
});

const settings = {
    min: 2,
    max: 5
};

const inRange = (progressbars, id, currentStep) => currentStep > -1 && progressbars.get(id).allSteps.length > currentStep;

export default (progressbars = arrToMap([], ProgressbarRecord), action) => {
  const { type, payload } = action;

  switch (type) {

    case REGISTER_PROGRESSBAR:
      return progressbars.set(payload.id, new ProgressbarRecord(payload));

    case SET_PROGRESSBAR_ALL_STEPS:
      return progressbars
          .updateIn([payload.id, 'allSteps'], (allSteps) => payload.allSteps.length <= settings.max && payload.allSteps.length >= settings.min ? payload.allSteps : allSteps)
          .updateIn([payload.id, 'currentStep'], (currentStep) => currentStep > payload.allSteps.length - 1 ? payload.allSteps.length - 1 : currentStep);

    case SET_PROGRESSBAR_CURRENT_STEP:
      return progressbars.updateIn([payload.id, 'currentStep'], (currentStep) => inRange(progressbars, payload.id, payload.currentStep) ? payload.currentStep : currentStep);

    case PROGRESSBAR_NEXT_STEP: {
        return progressbars.updateIn([payload.id, 'currentStep'], (currentStep) => inRange(progressbars, payload.id, currentStep + 1) ? currentStep + 1 : currentStep);
    }

    case PROGRESSBAR_PREV_STEP:
      return progressbars.updateIn([payload.id, 'currentStep'], (currentStep) => inRange(progressbars, payload.id, currentStep - 1) ? currentStep - 1 : currentStep);

    default:
      return progressbars;
  }
}