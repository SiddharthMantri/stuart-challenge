
function GoogleMap(apiKey = '', mapContainer) {
    this.map = null;
    const drawMap = () => {
        this.map = new window.google.maps.Map(mapContainer.current, { zoom: 14, center: { lat: 48.85, lng: 2.35 }, disableDefaultUI: true, draggable: false });
    }
    const loadScript = (key = '') => {
        if (window.google) {
            return;
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=${key}`;
        const tags = document.getElementsByTagName('script')[0];
        tags.parentNode.insertBefore(script, tags);

        script.addEventListener('load', () => {
            drawMap();
        });
    };
    this.drawMarker = ({ icon, lat, lng }) => {
        let marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(lat, lng),
            map: this.map,
            // icon: '../icons/pickUpBadgeBlank.svg',
        });
        this.markers.push(marker);
    }
    const initialize = (key = '') => {
        loadScript(key);
    };
    initialize(apiKey);
    this.apiKey = apiKey;
    this.markers = [];
    this.addMarker = ({ latitude = 0.0, longitude = 0.0 }) => {

    };
    this.clearMarker = () => {
        this.markers = [];
    };
    this.updateMap = ({ map = {} }) => {

    };
    this.clearMap = () => {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    };

}

export default GoogleMap;
