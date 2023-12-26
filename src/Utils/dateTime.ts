export function getStandatedDateWithTime(dateString : string) {

    const date = new Date(dateString);
    const options : any= { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options );
    return formattedDate
}

export function getStandatedDate(dateString : string) {

    const date = new Date(dateString);
    const options : any= { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options );
    return formattedDate
}