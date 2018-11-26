import React, { Component } from 'react';
import ProgressBar from './components/progressbar';

import { connect } from 'react-redux';
import { progressbarNextStep, progressbarPrevStep, changeProgressbarCurrentStep, changeProgressbarAllSteps } from './ac';

class App extends Component {
  render() {

    const { progressbarPrevStep, progressbarNextStep, changeProgressbarCurrentStep, changeProgressbarAllSteps } = this.props;

    return (
      <div>
        <ProgressBar id={"test1"} allSteps={["Design", "Production", "Launch"]} />
        <ProgressBar id={"test2"} allSteps={["Step 1", "Step 2", "Step 3", "Step 4"]} currentStep={2}/>
        <br/>
        <button onClick={()=>progressbarPrevStep("test1")}>-1 first</button>
        <button onClick={()=>progressbarNextStep("test1")}>+1 first</button>
        <br/>
        <button onClick={()=>progressbarPrevStep("test2")}>-1 second</button>
        <button onClick={()=>progressbarNextStep("test2")}>+1 second</button>
        <br/>
        <button onClick={()=>changeProgressbarCurrentStep("test1", 1)}>Set step 2 on first</button>
        <button onClick={()=>changeProgressbarCurrentStep("test2", 2)}>Set step 3 on second</button>
        <br/>
        <button onClick={()=>changeProgressbarAllSteps("test1", ["Design", "Testing", "Production", "Launch"])}>Change first progressbar</button>
        <button onClick={()=>changeProgressbarAllSteps("test1", ["Design", "Production", "Launch"])}>Return original first progressbar</button>
      </div>
    )
  }
}


export default connect(
    null,
    {
        progressbarNextStep,
        progressbarPrevStep,
        changeProgressbarCurrentStep,
        changeProgressbarAllSteps
    }
)(App);
