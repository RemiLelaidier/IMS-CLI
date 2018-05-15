import * as React from 'react';

import './Step.css';

interface RecapProps {
    onError: (any);
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