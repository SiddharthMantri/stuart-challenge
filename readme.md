# Stuart Frontend Coding Challenge

### Problem statement

Implement a ReactJS app that helps create Stuart jobs.

### Technologies Used

The main library powering the UI:
  - React - 16.12.0

Design library used
  - Material-UI

Note - I have used the Material UI design library purely to implement the flexbox grid system. I have not used any component from that library apart from `Grid`.

Initially, I thought about adding redux but felt that writing my own provider and hooks into GoogleMap would be much simpler given the size of the project.

### Installation

One way to run this locally would be to clone this application using git and then running it with npm
The project requires - Node v10.16 for it to run locally.

```sh
$ git clone https://github.com/SiddharthMantri/stuart-challenge.git
$ cd stuart-challenge
$ npm install
$ npm start
```
This will open a browser at http://localhost:8000/`


### File Structure
The `src` folder is composed of 4 main parts of the app - Api, Components, Domain, Hooks, Models and State. 

- components - contains the reusable components of the UI markup. 
- domain - contains the main views that comprise of multiple components and are put together to form the main UI 
- hooks - contains three custom hooks that hook onto the app state and are used in the state provider.
- models - contains the GoogleMap view model that are used for the UI.
- state - contains the provider and context that use the hooks to provide data throughout the component tree.

### Testing strategy
I remember we spoke about Cypress and integration testing in our call. I wanted to showcase some of the uses of Cypress and why I feel integration testing is much better suited to React apps. 

To run the test suites:

```sh
$ git clone https://github.com/SiddharthMantri/stuart-challenge.git
$ cd stuart-challenge
$ npm install
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
    - Provides stateful hooks into GoogleMap.js that I've used to implement all of the Maps functionality in a React way.
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

### Requisites completed

- Step 1 
    - I have implemented the design as specified in the design specifications
    - Implemented bonus implementation of not using `create-react-app` and I've used my own `webpack` and `babel` config
- Step 2
    - Implemented onBlur of input field as shown in `useDeliveryInput` hook
    - Same hook also provides a 1/2 second debounce to perform a geocode request on stopping type
    - Marker appears on correct address
    - Icon colors change on correct/incorrect address
- Step 3
    - On click, button sends a request to create a Stuart job
    - Bonus completed, while waiting for response label shows `Creating...`
- Step 4
    - On successful submission, a toaster appears and the map resets
    - Toast can be cleared by clicking on it
    - Bonus completed, toast disappears after 5 seconds



### Development choices


- Specifically not used `redux` or `react-redux` in this application. I feel that by writing my own state hooks and provider, i've reduced the size of the application compared to if I'd have used `redux`.
- In interest of time, I've used Material-UI but if I had enough time to implement a flexbox grid, I'd have created my own
- I decided against using a ready-made library for Google Maps in React. This was done more as a challenge to myself as well as showcasing what is possible without adding a whole bunch of boilerplate code.




### Future improvements
- Have a `loading` state that waits for the GMaps API to load completely
- 