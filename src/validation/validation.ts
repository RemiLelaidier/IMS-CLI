import * as Joi from 'joi';

export interface ValidatedStep {
    schema: any;
    state: any;
    props: any;
    setState: (any);
}

export function _handleField(this: ValidatedStep, event: any) {
    // clone current fields to apply user modification
    const newFields = Object.assign({}, this.state.fields);
    newFields[event.target.id] = event.target.value;
    this.setState({ fields: newFields });

    const errors = Object.assign({}, this.state.errors);

    // pass through Joi with Component schema
    const result = Joi.validate({ [event.target.id]: event.target.value }, this.schema);
    // if an error is found, the object evaluates, else error === null
    if (result.error) {
        errors[event.target.id] = true;
        this.setState({ errors });
        this.props.onError(true);
    } else {
        errors[event.target.id] = false;
        // setting error on this form control
        this.setState({ errors });

        // check if our friends are filled or not
        let isEverythingFilled = true;
        for (const field in this.state.fields) {
            if (this.state.fields[field] === null) {
                isEverythingFilled = false;
            }
        }

        // tell it to my mother (Page) !
        this.props.onFieldChange(event, this.constructor.name);
        if (isEverythingFilled) {
            this.props.onError(false);
        } else {
            this.props.onError(true);
        }
    }
}