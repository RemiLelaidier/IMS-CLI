export function unCrappify(forName: string) {
    const accents = [/[\310-\313]/g, /[\350-\353]/g];
    const noaccent = ['E','e'];

    for(let i = 0; i < accents.length; i++){
        forName = forName.toLowerCase().replace(accents[i], noaccent[i]);
    }
     
    return forName;
}
