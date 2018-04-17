import * as React from 'react';

import { Step, StepLabel, Stepper } from 'material-ui/Stepper';

interface IStudentPageProps {
    onChangePage: (any);
    onSubmit: (any);
}

interface IStudentPageState {
    stepIndex: number;
}

export class StudentPage extends React.Component<IStudentPageProps, IStudentPageState> {
    constructor(props: IStudentPageProps) {
        super(props);
        this.state = { stepIndex: 0 }
    }

    public render (){
        return (
        <Stepper activeStep={this.state.stepIndex} >
            <Step>
                <StepLabel>Step1</StepLabel>
            </Step>
            <Step>
                <StepLabel>Step2</StepLabel>
            </Step>
        </Stepper>
        );
    }
}