import { RefObject } from "react";

function GoogleMaps(apiKey = "", mapContainer) {
  this.map = null;
  this.markerMap = {};
  this.apiKey = apiKey;
  this.markers = [];

  const icons = {
    pickup: "../icons/pickUpMarker.svg",
    dropoff: "../icons/dropOffMarker.svg",
  };
  /**
   * Private method to draw a map given a map ref
   */
  const drawMap = () => {
    const [lat, lng] = [48.8642127, 2.3227858];
    // Hard-coded map options which can also be passed as options if needed
    this.map = new window.google.maps.Map(mapContainer.current, {
      zoom: 14,
      center: { lat, lng },
      disableDefaultUI: true,
      draggable: false,
    });
  };

  // private method to load google maps api into a script tag into the main html
  const loadScript = (key = "") => {
    if (window.google || this.map !== null) {
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.google.com/maps/api/js?key=${key}`;
    const tags = document.getElementsByTagName("script")[0];
    tags.parentNode.insertBefore(script, tags);

    script.addEventListener("load", () => {
      drawMap();
    });
  };
  const initialize = (key = "") => {
    loadScript(key);
  };

  this.drawMarker = ({ type, lat, lng }) => {
    const index = this.markers.findIndex(
      (marker) => marker.get("type") === type
    );
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
      map: this.map,
      icon: {
        url: icons[type],
      },
    });
    marker.setValues({ type });
    if (index > -1) {
      this.clearByType({ type });
    }
    this.markers = [...this.markers, marker];
    this.markerMap = { ...this.markerMap, [type]: marker };
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
    const index = this.markers.findIndex(
      (marker) => marker.get("type") === type
    );
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
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    return clone;
  };
  initialize(apiKey);
}

const icons = {
  pickup: "../icons/pickUpMarker.svg",
  dropoff: "../icons/dropOffMarker.svg",
};

class GoogleMap {
  map;
  markerMap: Map<string, any>;
  apiKey: string;
  markers: Array<any>;
  mapContainer: RefObject<any>;

  constructor(apiKey: string, mapContainer: RefObject<any>) {
    this.map = null;
    this.markerMap = new Map();
    this.apiKey = apiKey;
    this.markers = [];
    this.mapContainer = mapContainer;
    this.loadScript(this.apiKey);
  }

  private drawMap() {
    const [lat, lng] = [48.8642127, 2.3227858];
    // Hard-coded map options which can also be passed as options if needed
    this.map = new window.google.maps.Map(this.mapContainer.current, {
      zoom: 14,
      center: { lat, lng },
      disableDefaultUI: true,
      draggable: false,
    });
  }

  private loadScript(key: string) {
    if (window.google || this.map !== null) {
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.google.com/maps/api/js?key=${key}`;
    const tags = document.getElementsByTagName("script")[0];
    tags.parentNode.insertBefore(script, tags);

    script.addEventListener("load", () => {
      this.drawMap();
    });
  }

  drawMarker({ type, lat, lng }: { type: string; lat: number; lng: number }) {
    const index = this.markers.findIndex(
      (marker) => marker.get("type") === type
    );
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
      map: this.map,
      icon: {
        url: icons[type],
      },
    });
    marker.setValues({ type });
    if (index > -1) {
      this.clearByType({ type });
    }
    this.markers = [...this.markers, marker];
    this.markerMap = { ...this.markerMap, [type]: marker };
    return this.status();
  }

  clearMap() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
    return this.status();
  }

  clearByType({ type }: { type: string }) {
    const index = this.markers?.findIndex(
      (marker) => marker.get("type") === type
    );
    if (index > -1) {
      let marker = this.markers[index];
      marker.setMap(null);
      marker = null;
      this.markers.splice(index, 1);
      this.markers = [...this.markers];
      delete this.markerMap[type];
      this.markerMap = { ...this.markerMap };
    }
    return this.status();
  }

  status() {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    return clone;
  }
}

export default GoogleMap;
