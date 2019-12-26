function GoogleMap(apiKey = '', mapContainer) {
    this.map = null;
    this.markerMap = {};
    this.apiKey = apiKey;
    this.markers = [];

    const icons = {
        pickup: '../icons/pickUpMarker.svg',
        dropoff: '../icons/dropOffMarker.svg',
    };
    /**
     * Private method to draw a map given a map ref
     */
    const drawMap = () => {
        const [lat, lng] = [48.8642127, 2.3227858];
        // Hard-coded map options which can also be passed as options if needed
        this.map = new window.google.maps.Map(
            mapContainer.current, {
                zoom: 15,
                center: { lat, lng },
                disableDefaultUI: true,
                draggable: false,
            },
        );
    };

    // private method to load google maps api into a script tag into the main html
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
    const initialize = (key = '') => {
        loadScript(key);
    };

    this.drawMarker = ({ type, lat, lng }) => {
        const index = this.markers.findIndex((marker) => marker.get('type') === type);
        if (index < 0) {
            const marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(lat, lng),
                map: this.map,
                icon: {
                    url: icons[type],
                },
            });
            marker.setValues({ type });
            this.markers = [...this.markers, marker];
            this.markerMap = { ...this.markerMap, [type]: marker };
        }
        return this.status(this);
    };

    this.clearMap = () => {
        this.markers.forEach((marker) => {
            marker.setMap(null);
        });
        this.markers = [];
        return this.status(this);
    };
    this.clearByType = ({ type }) => {
        const index = this.markers.findIndex((marker) => marker.get('type') === type);
        if (index > -1) {
            let marker = this.markers[index];
            marker.setMap(null);
            marker = null;
            this.markers.splice(index, 1);
            this.markers = [...this.markers];
            delete this.markerMap[type];
            this.markerMap = { ...this.markerMap };
        }
        return this.status(this);
    };
    this.status = (mapState = {}) => {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        return clone;
    };
    initialize(apiKey);
}

export default GoogleMap;
