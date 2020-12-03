import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import {
    getAddressFromCoordinates,
    getCoordinatesFromAddress,
} from "./Utility/Location";

class PlaceFinder {
    constructor() {
        const locateUsrBtn = document.getElementById("locate-btn");
        const addressForm = document.querySelector("form");
        this.sharedLinkInputElement = document.getElementById('share-link');
        this.shareBtn = document.getElementById('share-btn');
        this.modal = new Modal(
            "loading-modal-content",
            "Loading Location, please wait"
        );
        // const placeInput = document.getElementById('share-link');
        // const addressInput = document.getElementById('address');    }

        locateUsrBtn.addEventListener("click", this.locateUserHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    }

    sharePlaceHandler() {
        if (!navigator.clipboard) {
            this.sharedLinkInputElement.select();
            return;
        }

        navigator.clipboard.writeText(this.sharedLinkInputElement.value)
            .then(() => alert('Copied into clipboard!'))
            .catch(error => {
                console.log(error);
                this.sharedLinkInputElement.select();
            });
    }

    selectPlace(coordinates, address) {
        this.modal.hide();
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }

        this.shareBtn.disabled = false;
        this.sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert(
                "This feature is not available in your browser, please use a more modern browser or version"
            );
            return;
        }

        this.modal.show();

        navigator.geolocation.getCurrentPosition(
            async succesResult => {
                const coordinates = {
                    lat: succesResult.coords.latitude,
                    lng: succesResult.coords.longitude,
                };
                const address = await getAddressFromCoordinates(coordinates);
                this.selectPlace(coordinates, address);
            },
            (error) => {
                this.modal.hide();
                alert(
                    "Unfortunately we couldn't locate you. Please enter an address manually"
                );
            }
        );
    }

    async findAddressHandler(e) {
        e.preventDefault();
        this.modal.show();
        const address = document.getElementById("address").value;
        const coordinates = await getCoordinatesFromAddress(address);
        this.selectPlace(coordinates, address);
    }
}

new PlaceFinder();

//Getting address with geocoder

/*     const geocoder = new google.maps.Geocoder();
geocoder.geocode({ 'address': address }, (results, status)=> {
    if (status == 'OK') {
        this.modal.hide()
        this.selectPlace(results[0].geometry.location, results[0].formatted_address);

    } else {
        alert('Please check if your spelling is correct or try to narrow the search ' + status);
    }
}); */