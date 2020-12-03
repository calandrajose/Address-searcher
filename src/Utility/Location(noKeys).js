const APIKEY = ""; //GET A GOOGLE CLOUD API KEY
const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";

export async function getCoordinatesFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(`${baseURL}address=${urlAddress}&key=${APIKEY}`);

    if (!response.ok) {
        throw new Error("Failed to fetch address, please try again");
    }
    const data = await response.json();

    if (data.error_message) {
        throw new Error(data.error_message);
    }
    return data.results[0].geometry.location;
}

export async function getAddressFromCoordinates(coords) {
    const response = await fetch(
        `${baseURL}latlng=${coords.lat},${coords.lng}&key=${APIKEY}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch address, please try again");
    }
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    return data.results[0].formatted_address;
}
