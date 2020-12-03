
import { Map } from "./UI/Map";


class LoadedPlace {
    constructor(coordinates, address){
        new Map(coordinates);
        const headerTitleEl = document.querySelector('header h1');
        headerTitleEl.textContent = address
    }

    
}
const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
    lat: +queryParams.get('lat'),
    lng: +queryParams.get('lng')
}
const address = queryParams.get('address') //this already decodes de data into human readeable string

new LoadedPlace(coordinates, address);