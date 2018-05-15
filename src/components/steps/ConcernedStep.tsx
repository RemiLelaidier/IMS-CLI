import * as React from 'react';

import './Step.css';

/*
<h2>Responsables</h2>
            <hr>
            <h3>Encadreur dans l'entreprise</h3>
            <paper-dropdown-menu id="ent_tutor_gender" label="Genre" data-concerning="Encadreur dans l'entreprise">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>M</paper-item>
                <paper-item>Mme</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-input id="ent_tutor_surname" required auto-validate pattern="[/\D+/]*" error-message="Ne peut contenir que des lettres"
              class="shortInput" label="Prénom"></paper-input>
            <paper-input id="ent_tutor_name" required auto-validate pattern="[/\D+/]*" error-message="Ne peut contenir que des lettres"
              class="longInput" label="Nom"></paper-input>
            <br>
            <paper-input id="ent_tutor_email" required auto-validate pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              class="longInput" error-message="E-mail invalide" label="E-mail"></paper-input>
            <br>
            <paper-input id="ent_tutor_phone" required class="longInput" auto-validate pattern="^\+(?:[0-9]●?){6,14}[0-9]$" label="Téléphone"
              error-message="Doit être au format international. Ex : +33612233445"></paper-input>
            <paper-input id="ent_tutor_quality" required class="longInput" label="En qualité de"></paper-input>
            <br>
            <h3>Tuteur enseignant</h3>
            <paper-dropdown-menu id="unice_tutor_gender" label="Genre" data-concerning="Tuteur enseignant">
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>M</paper-item>
                <paper-item>Mme</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-input id="unice_tutor_surname" required auto-validate pattern="[/\D+/]*" error-message="Ne peut contenir que des lettres"
              class="shortInput" label="Prénom"></paper-input>
            <paper-input id="unice_tutor_name" required auto-validate pattern="[/\D+/]*" error-message="Ne peut contenir que des lettres"
              class="longInput" label="Nom"></paper-input>
            <br>
            <paper-input id="unice_tutor_email" required auto-validate class="longInput" pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              error-message="E-mail invalide" label="E-mail"></paper-input>
            <br>
            <paper-input id="unice_tutor_phone" required class="longInput" auto-validate pattern="^\+(?:[0-9]●?){6,14}[0-9]$" label="Téléphone"
              error-message="Doit être au format international. Ex : +33612233445"></paper-input>
            <paper-input id="unice_tutor_quality" required class="longInput" label="En qualité de"></paper-input>
*/
export default class ConcernedStep extends React.Component {
    public render() {
        return (
            <div>Responsables</div>
        );
    }
}