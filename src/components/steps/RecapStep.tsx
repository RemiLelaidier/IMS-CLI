import * as React from 'react';

interface RecapProps {
    onError: (any);
    onFieldChange: (any);
}

interface RecapState {
    errors: {

    }
}
export default class RecapStep extends React.Component<RecapProps, RecapState> {
    public render() {
        return (
            <div>Récapitulatif</div>
        );
    }
}