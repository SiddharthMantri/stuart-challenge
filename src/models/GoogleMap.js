function GoogleMap(apiKey = "", elementId = "") {
    const initialize = (apiKey = "") => {
        apiKey.split();
    };
    initialize(apiKey);
    this.apiKey = apiKey;
    this.markers = [];
    this.addMarker = (latitude = 0.0, longitude = 0.0) => {
        this.markers.push({ latitude, longitude });
    };
    this.clearMarker = () => {
        this.markers = [];
    };
    this.updateMap = (map = {}) => {

    };

}

export default GoogleMap;
