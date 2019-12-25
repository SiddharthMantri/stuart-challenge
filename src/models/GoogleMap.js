function GoogleMap(apiKey = '', mapContainer) {
    this.map = null;
    this.markerMap = {};
    const icons = {
        pickup: '../icons/pickUpMarker.svg',
        dropoff: '../icons/dropOffMarker.svg',
    };

    // private method to draw a map given a map ref
    const drawMap = () => {
        this.map = new window.google.maps.Map(
            mapContainer.current, {
                zoom: 14,
                center: { lat: 48.85, lng: 2.35 },
                disableDefaultUI: true,
                draggable: false,
            },
        );
    };

    // private method to load google maps api into a script tag
    const loadScript = (key = '') => {
        if (window.google || this.map !== null) {
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

    this.drawMarker = ({ type, icon, lat, lng }) => {
        const marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(lat, lng),
            map: this.map,
            icon: {
                url: icons[type],
            },
        });
        this.markers.push(marker);
        this.markerMap[type] = marker;
    };

    const initialize = (key = '') => {
        loadScript(key);
    };
    initialize(apiKey);
    this.apiKey = apiKey;
    this.markers = [];

    this.clearMarker = ({ lat = 0.0, lng = 0.0 }) => {

    };
    this.updateMap = ({ map = {} }) => {

    };
    this.clearMap = () => {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    };
    this.clearByType = ({ type }) => {
        const marker = this.markerMap[type];
        if (marker) {
            marker.setMap(null);
            delete this.markerMap[type];
        }
    };
}

export default GoogleMap;