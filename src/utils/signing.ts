export function unCrappify(forName: string) {
    const accents = [/[\310-\313]/g, /[\350-\353]/g];
    const noaccent = ['E','e'];

    for(let i = 0; i < accents.length; i++){
        forName = forName.toLowerCase().replace(accents[i], noaccent[i]);
    }
     
    return forName;
}

export function downloadBlobData(blob: any, filename: string, contentType: string = 'application/pdf') {
    const url = window.URL.createObjectURL(new Blob([blob], {type: contentType}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
}

export function makeSignersDatasource(row: any) {
    const signers = [
        "Étudiant",
        "Entreprise",
        "Université",
        "Enseignant",
        "Tuteur"
    ];

    const signersState = {
        etudiant: {
            done: false,
            link: null
        },
        entreprise: {
            done: false,
            link: null
        },
        universite: {
            done: false,
            link: null
        },
        enseignant: {
            done: false,
            link: null
        },
        tuteur: {
            done: false,
            link: null
        }
    }

    if(row.signLinks && row.signLinks.length > 0) {
        row.signLinks.map((link: any) => {
            const uncrappy = unCrappify(link.for);
            signersState[uncrappy].done = link.isDone ? true : false;
            signersState[uncrappy].crappy = link.for;
            signersState[uncrappy].name = link.name;
            signersState[uncrappy].location = link.location;
            if (signers.indexOf(link.for) !== -1) {
                signersState[uncrappy].link = `${window.location.origin}/link/${link.shortId}`;
            }
        });
    }

    return signersState;
}