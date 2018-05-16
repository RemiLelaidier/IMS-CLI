import * as React from 'react';

// tslint:disable-next-line:no-empty-interface
interface AdminPageState {}
// tslint:disable-next-line:no-empty-interface
interface AdminPageProps {}

export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    constructor(props: AdminPageProps) {
        super(props);

        this.state = {}
    }

    public render (){
        return (
        <div>
            Administration           
        </div>
        );
    }
}