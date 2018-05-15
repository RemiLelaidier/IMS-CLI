import * as Joi from 'joi';

// tslint:disable-next-line:interface-name
export interface ValidatedStep {
    schema: any;
    showSchema: (any);
}

export function _handleField(this: any, event: any) {
    const newFields = Object.assign({}, this.state.fields);
    newFields[event.target.id] = event.target.value;
    this.setState({fields: newFields});

    const result = Joi.validate({[event.target.id]: event.target.value}, this.schema);
    if(result.error){
        this.setState({errors: {
            [event.target.id]: true
        }});
        this.props.onError(true);
    } else {
        this.setState({errors: {
            [event.target.id]: false
        }});

        let isEverythingFilled = true;
        for(const field in this.state.fields){
            if(this.state.fields[field] === null){
                isEverythingFilled = false;
            }
        }

        if(isEverythingFilled){
            this.props.onError(false);
        } else {
            this.props.onError(true);
        }
    }
}