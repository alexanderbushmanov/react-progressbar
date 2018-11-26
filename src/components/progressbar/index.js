import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerProgressbar, changeProgressbarCurrentStep, progressbarNextStep, progressbarPrevStep } from '../../ac';
import { createProgressbarSelector } from '../../selectors';

import './style.css'

class Progressbar extends Component {

    static propTypes = {
        allSteps: PropTypes.arrayOf(PropTypes.string).isRequired,
        id: PropTypes.string.isRequired
    };
    static defaultProps = {
        currentStep: 0
    };

    componentDidMount = () => {
        const { registerProgressbar, id, allSteps, currentStep } = this.props;

        if(id && allSteps) registerProgressbar(id, allSteps, currentStep);

    };

    nextStep = () => {
        const { currentStep, progressbarNextStep, id } = this.props;

        if(this.inRange(currentStep + 1)) progressbarNextStep(id);
        else console.warn('Too big step value', `Progressbar ID: ${id}`);
    };
    prevStep = () => {
        const { currentStep, progressbarPrevStep, id } = this.props;

        if(this.inRange(currentStep - 1)) progressbarPrevStep(id);
        else console.warn('Negative step value', `Progressbar ID: ${id}`);
    };
    changeStep = (newCurrentStep) => {
        const { changeProgressbarCurrentStep, id } = this.props;

        if(this.inRange(newCurrentStep)) changeProgressbarCurrentStep(id, newCurrentStep);
        else console.warn('Step value out of range', `Progressbar ID: ${id}`);
    };
    inRange = (newStep) => newStep >= 0 && newStep < this.props.allSteps.length;

    render() {
        const { currentStep, allSteps, id } = this.props;

        if(!id) return null;
        if(allSteps.length < 2 || allSteps.length > 5) return <b style={{color:'red'}}>Progressbar length error</b>;

        const steps = allSteps.map((step, i) => <div key={`${id}_${step}`} className={`progressbar_step ${i <= currentStep ? "progressbar_step-active" : ""}`}>{step}</div>);

        return (
            <div className="progressbar">
                <div className="progressbar_header">{steps}</div>
                <div className="progressbar_controls">
                    <button className="progressbar_button" onClick={this.prevStep.bind(this)}>prev</button>
                    <button className="progressbar_button" onClick={()=>this.changeStep(0)}>reset</button>
                    <button className="progressbar_button" onClick={this.nextStep.bind(this)}>next</button>
                </div>
            </div>
        );
    };

}

const createMapStateToProps = () => {
    const progressbarSelector = createProgressbarSelector();

    return (state, ownProps) => {

        const { allSteps, currentStep } = progressbarSelector(state, ownProps) || ownProps;

        return { allSteps, currentStep }
    };
};

export default connect(
    createMapStateToProps,
    {
        registerProgressbar,
        changeProgressbarCurrentStep,
        progressbarNextStep,
        progressbarPrevStep
    }
)(Progressbar);
