# Stuart Frontend Coding Challenge

### Problem statement

Implement a ReactJS app that helps create Stuart jobs.

### Technologies Used

The main library powering the UI:
  - React - 16.12.0

Design library used
  - Material-UI

##### Note - I have used the Material UI design library purely to implement the flexbox grid system. I have not used any component from that library apart from `Grid`.

Initially, I thought about adding redux but felt that writing my own provider and hooks into GoogleMap would be much simpler given the size of the project.

### Installation

One way to run this locally would be to clone this application using git and then running it with npm.
The project requires - Node v10.16 or greater for it to run locally.

```sh
$ git clone https://github.com/SiddharthMantri/stuart-challenge.git
$ cd stuart-challenge
$ npm install
$ npm start
```
This will open a browser at http://localhost:8000/

You could also run: `npx serve -s dist` to run this on http://localhost:5000/


### File Structure
The `src` folder is composed of the main parts of the app - Api, Components, Domain, Hooks, Models and State. 

- api - contains the XHR requests for the UI
- components - contains the reusable components of the UI markup. 
- domain - contains the main views that comprise of multiple components and are put together to form the main UI 
- hooks - contains three custom hooks that hook onto the app state and are used in the state provider.
- models - contains the GoogleMap view model that is used for the UI.
- state - contains the provider and context that use the hooks to provide data throughout the component tree.

### App Structure

Since I've used the Provider pattern, the App structure is pretty simple

```sh
<ReactContextProvider value={mapState, toastState}>
    <DeliveryHome>
        <MapContainer /> 
        <MapOverlay>
            <AddressBox />
            <Toast />
        </MapOverlay>
    </DeliveryHome>
</ReactContextProvider>
```

- The ContextProvider provides the state information of the app to the entire structure where I have used `useContext` wherever required to access this state.
- MapContainer is a standalone component that renders the Google Map canvas a fullscreen absolute positioned div.
    - The markers are directly drawn on the canvas using the useMap hook
- The MapOverlay is a div positioned on top of the MapContainer that will contain the address box and toast
- AddressBox contains the inputs and button which accesses the map state in order to draw on it if the input is valid
- Toast is the success message on job creation and is also accessing the state of the app because it needs to know when the job is created successfully.

### Requisites completed

- Step 1 
    - I have implemented the design as specified in the design specifications
    - Implemented bonus implementation of not using `create-react-app` and I've used my own `webpack` and `babel` config
- Step 2
    - Implemented onBlur of input field as shown in `useDeliveryInput` hook
    - Implemented bonus: same hook also provides a 1 second debounce to perform a geocode request on stopping to type
    - Marker appears on correct address
    - Icon colors change on correct/incorrect address
    - ##### Note - I noticed that the API also validates all requests if the initial string is correct. For example,
        - ##### 15 rue de Bourgogne and 15 rue de bourgogneaaaa are both valid responses from the API.
- Step 3
    - On click, button sends a request to create a Stuart job
    - Bonus completed, while waiting for response label shows `Creating...`
- Step 4
    - On successful submission, a toaster appears and the map resets
    - Toast can be cleared by clicking on it
    - Bonus completed, toast disappears after 5 seconds
- Step 5
    - Expanded on this below in the last section


### Development choices / Creative liberties

- Specifically not used `redux` or `react-redux` in this application. I feel that by writing my own state hooks and provider, I've reduced the size of the application compared to if I'd have used `redux`.
- In interest of time, I've used Material-UI but if I had enough time to implement a flexbox grid, I'd have created my own
- I decided against using a ready-made library for Google Maps in React. This was done more as a challenge to myself as well as showcasing what is possible without adding a whole bunch of boilerplate code.
- The design specifications did not specify a width for the address card. So I have set it as 25% of the container on large screens with it scaling up to 100% of the container on smaller screens.
- The Map itself has been centered to roughly the center of the two addresses that are valid for this scenario. To expand this app, I would keep the map to scale between the two points when added to the map.
- Disabled all interaction with the map for a user. Did this as it isn't required in this case but it could be added without issues


### Testing strategy
I remember we spoke about Cypress and integration testing in our call. I wanted to showcase some of the uses of Cypress and why I feel integration testing is much better suited to React apps. 

All tests are available under `cypress/integration`

To run the test suites:

```sh
$ git clone https://github.com/SiddharthMantri/stuart-challenge.git
$ cd stuart-challenge
$ npm install
$ npm start
$ npx cypress open
```

This will open the Cypress application and run the tests in cypress/integration. Cypress can also run in the command line and to see this, you can run `npx cypress run`

##### Note
I have not tested the Google Maps API. As per Cypress, it is Anti-Pattern to try and interact with sites or servers we do not control. Since the map is rendered as a frame, I haven't specifically tested the map but I have tested if the map loads correctly. 

### Main Ideas
I feel that I should explain my coding choices for creating this app.
 
- GoogleMap.js
    - I consider this as the main class that I've used for implementing the Google Maps JS API
- useMap.js
    - Provides stateful hooks into GoogleMap.js that I've used to implement all of the required Maps functionality in a React way.
- useDeliveryInput.js
    - From the specifications, the input fields for the user both perform the same set of tasks
        - Search on finishing to type
        - Search on blur
        - Set address on map if correct
    - By definition of a custom hook, I've extracted the reusable behavior of the two inputs into a custom hook that does all of this for me. 
    - I have created a 'useConstant' hook that creates a memo-ized hook that guarantees a value just once, which is something that isn't guaranteed by useMemo.
    - I used some inspirations from AwesomeDebounce to create a debounced hook that performs the search, validates the input, validates the address as well as returns the geocoded address to the map
- useToast.js
    - Really simple stateful hook to display and hide the toast on success. 
    - I use it to pass the state of the toast to the general app and then access it wherever needed.
- ErrorBoundary
    - I have created specific ErrorBoundary components for the map and for the AddressBox and I've used these to create error message handling if any error arises.


### Future improvements (Step 5)
- Have a `loading` state that waits for the GMaps API to load completely
- Improve the useMaps hook to extend almost all GMaps functionality in to a usable React hook.
    - In general, I would package the MapContainer and useMap hook into a single package and use that in place of any currently available react libraries as that would give me full control over the application and its code
- Improve Error handling. I would create specific error boundary components for each component as well as larger domain level components that I can then use to have the correct state of the app and any errors be handled correctly.
- Allow users to interact with the map if required for onClick geocoding of addresses