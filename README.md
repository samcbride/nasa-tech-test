# Nasa Tech-Test - Epic README!

This project was an introduction to tech-tests using React. It built upon concepts we had covered in the weather-app, including props and hooks, as well as testing in React.

## Screenshots - Desktop vs Mobile

- Screenshots to be added

### Technologies

- React

### Testing Utilities

- Jest
- React Testing Library

### Packages Used

- Axios
- PropTypes

---

## How to run the app

Firstly, clone down the repo to your local machine. To run the tests to ensure they are functioning correctly, run `npm test`. To start up the app, run `npm start`. This will then load a localhost webpage, which will load the app and allow you to interact with it.

## Explaining what it's all about

- App contains everything

  - Search Component
  - SearchResult Component
  - getImages Request

- App

  - Contains the asset (or Nasa logo), nested within a `img` tag
  - Contains the components <Search /> and <SearchResults />
  - See below for more information regarding App and components

- Search Component

  - When we first created the Search component it was a _stateless functional component_ (e.g., not a _class (or stateful) component_ - it simply accepts data and displays it in some form. It is mainly responsible to rendering the UI.)
  - Firstly, we created an _input_ and nested it within a Fragment (<></>). Fragments can be used to wrap code in when it needs to be wrapped. It means we don't end up with unneseccary nested `div`'s.
  - We then imported my _Search_ component into _App.js_ and into the _App_ component
  - We then created an event handler method for our input (in the search bar) - this allows us to collect the user's query and use that to search for results
    - We added a `useState()` hook for a `value` (`const [value, setValue = useState()];`), then added an event handler to our `input` => `onChange={(e) => setValue(e.target.value)}` - this saves the users search query every time there is a change in the search bar (e.g., "s", then "st", then "sta", then "star")
    - By doing this we're collecting data and storing it in state
      - I believe this also means the component is no longer a **stateless functional component**, but is now a **stateful component**?? Is there a name for it?
  - We added a button (so a user can submit their search query) by creating a form and wrapping it around `input` and `button`

- getImages Request

  - We used `axios` with out requests as it automatically parses data for us
  - We then wrote a getImages function, that took `query` as a parameter
  - First we tell the function what to do if there is no query present - return an empty promise if the function runs without a query being entered. This helps prevent any unexpected errors
  - In our `else` statement we return the GET request - giving it the _route_ / _endpoint_ for our request: `https://images-api.nasa.gov/search?q=${query}`
    - **Note**: We added in _${query}_ to the end of the route - this allows us to be able to search for anything (e.g., when we originally set it up, our route was: `https://images-api.nasa.gov/search?q=moon`, but this would only ever allow us to return results for `moon`. Therefore we give it _placeholder_ that can be changed: _${query}_)
    - We added logic to the `.then(response)`, which firstly created a variable `imageResults`, which collected all the data related to the query (e.g., star)
    - We then put this variable into another variable `parsedImages`, which filtered over the data and only returned the data that matched a _media-type_ of `image` (e.g., another type of media was `video`, but we didn't want any of those)
      - Further explanation: we put in `result.data[0]` because this targets the `result` of the `filter` method as well as the first section (`[0]`) of `data`, which contains the `media_type`. Then we want the `media_type` to equal `image` (hence: `result.data[0].media_type === "image"`)
    - Finally we put `parsedImages` into another variable called `images`, which maps over all the items in the array and returns/logs the `href` (or web address) of the image
      - Further explanation: the results of `parsedImage.map` goes into `image` inside the brackets, then we target that information with `.links[0]`, which pulls in the first (`[0]`) information from the `links` section, which contains the `href` that we're looking for (hence: `parsedImages.map((image) => image.links[0].href)`)
    - Firstly we're finding all the information that matches the query, then we're making sure that the query only returns images, and then we pull in the `href`'s or web addresses of those images. Finally we `return images`, which is the result of all the images (and `href`'s associated with the query)
    - The `.catch()` block at the bottom triggers if there is a bad request

- Connecting things together

  - Orginally this task had me import getImages into my Search.js file, but after discussions with a tutor I instead decided to import getImages into my App.js file to better separate things
    - This way App.js can take care of all of the API calls and the individual components are only responsible for what they need to be responsible for (e.g., Search.js is only responsible for the input area and the Submit button). This makes more sense as Search.js doesn't really care about the API call, it just cares about the value being fed into it (e.g., the search term) and firing the `onSubmit` function when the button is clicked
  - In App.js we added state (`const [searchResults, setSearchResults] = useState();`)
  - We then created an asychronous function `getSearchResults` that took a parameter `searchTerm`, creates a variable called `images` that calls our `getImages` function with the argument `searchTerm`. Our App state is also called via `setSearchResults`. It takes an argument of `images` (the above variable we just created that called the `getImages` function). This all essentially means that we've created a variable that performs an asychronous function, which takes in the value entered into the input box, puts it into the `getImages` function, which parses down the data to ensure only images are found and then looks for and returns the `href` of the images that match the query. As well, the state of App is updated: `setSearchResults` takes in the `images` variable (which has returned the users search request) and now, on display in our app webpage, are the results of the search/query

- Returning to Search Component

  - I decided not to put the `getImages` function within this component, but it still needs to know how to handle an event (e.g., when a user clicks the `Submit` button)
  - We created an event handler `onSubmit`, which takes an `event` as an argument (the event being the search input by the user)
  - We then call `event.preventDefault()` - `preventDefault()` is a method of the `Event interface` (which represents an event that takes place in the DOM) that tells the user agent that if the event does not get handled, it's default action should not be taken (it stops the app re-rendering on submit)
  - Below this `handleSubmit` is called - `handleSubmit` is the prop passed into _Search.js_ and is the asychronous `getSearchResults` function from _App.js_, which ultimately takes in the search query, handles it, and updates the state of _App_ - essentially our state is set as whatever the return value of `getImages()` is
    - Here `handleSubmit` is called with a value of `value` - this is referring to the `value` of our `state`, defined above in the Hook
  - We then add an `onSubmit` prop to our form tag within the component body, which calls the `onSubmit` function on submit

- SearchResults Component

  - This component is what will render our search results on the page
  - We orginally created a _stateless functional component_, which contained a Fragment with the text "Search Results"
  - We then imported the component into our _App.js_ file and rendered <SearchResults /> beneath the <Search /> component
  - We updated our App state so that the default value was an empty array: `const [searchResults, setSearchResults] = useState([]);` - so that the app does not crash before we do a search
  - The <SearchResults /> component in _App_ takes in the state `searchResults`
  - Back in _SearchResults_, we take the prop passed in (`searchResults`, which is the `state`) and map over it to get each item individually instead of one big array (it returns every image as its own entity on a search)
    - Because our function back in _App.js_ is asychronous, map works well here (originally we had not added the asychronous functionality to this function and therefore map could not return anything (or was returning `undefined`), because our Promise was empty for the few seconds that it took to return the images - it was too fast!)
    - Adding asynchronicity to our function tells the function not to return anything until this action has been performed and will stop it returning `undefined` before the promise is resolved
    - `{searchResults.map((image) => (`
      `<img`
      `key={image}`
      `className="card-image"`
      `src={image}`
      `alt="spaceImage"`
      `/>`
      `))}`
    - In the above, we are mapping over the state provided (which is the brought in from the search input, put through a function (`getImages`) to find the corresponding data, then put into the `setSearchResults` to update the state and finally we're mapping over the results of all of that and putting it into a placeholder called `image`, which returns an <img /> tag that contains a `src` which contains the data). Really this is only all happening (ie: this function is being called) because a query was entered into the input bar in the Search component and a button was clicked. Phew! That's a lot of work!

- Conditional Rendering

  - We added some conditional rendering to our _SearchResults_ component to ensure that nothing renders on the page if a search hasn't been done
  - We added `if (!searchResults) {`
    `return <p>No results</p>;`
  - The `else` part of our `if` statement returned the image results

- PropTypes

  - We added in proptypes at the end for the components that required them. In this case it was the _Search.js_ and _SearchResults.js_ files as they were the two components that had props passed into them
  - Props (or properties) are the parameters that we pass into the React component functions (because React components are functions - therefore they can take parameters)
  - Props are used to make our components more re-usable and they allow us to control how our components get rendered. Using them we can make more generic components, which can be configured by passing in props from the parent context
  - PropTypes (which comes from the `prop-types` library of React) tells React what type of thing each prop should be (function, number, etc) and whether the prop is required or optional - this can be useful for other developers who are using your components (they can see how they should be used). PropTypes can also help debug as they throw error messages if they are not used correctly
  - PropTypes can also set _default props_, which can be very useful as if nothing is provided the default prop will take over

- Components - what are they?
  - They are the building blocks in React. It is part of the user interface. Instead of building am entire page, in React, we break the page and the entire application down into smaller, reusable pieces, and think about them in isolation
  - Essentially, a component is a JavaScript function that returns a React element

## Testing

- I followed similar testing patterns to what we used in the weather-app. I decided to conduct snapshot testing again. Snapshot testing allows us to see a 'snapshot' of our components and compare them to the last time our tests were successfully run. While not a robust test of how our code functions, they can be useful for highlighting any changes (unintentional and intentional) as well as giving us a visual of what the component looks like on a page
- We also used the React Testing Library, which allowed us to render our components into a virtual DOM
- _App.js_
  - We only have a snapshot test. This is taking a 'snapshot' of our code at the time we run the tests. If the snapshot differs from what it was before the test will fail. This can be good for catching intentional (where you will then update the snapshot to reflect the new code) or unintentional changes (where you may need to do some debugging to see what's gone wrong / changed)
- _Search.js_
  - We have a snapshot test (see above for explanation)
  - I also added a test checking whether the button (which contains a certain text: "Go") is in the document. For the button test I used the query `getByRole` and in the render section passed in the <Search /> component. As the Search component has a prop passed into it, I had to mock this data, which I did in the `describe` block above all the tests: `const stub = () => {};` - an empty function was used here to mock the data, as in the code it is a real function. For testing purposes it doesn't matter if a real function is used or not, it just needs to know that it is dealing with a function. Below this another variable (button) is created which takes the `getByRole` query and looks for the role (in this case `button`) and also tells it that the `name` or `text` on the button that it's looking for will be `Go`. We then assert or `expect` that button will be in the document: `expect(button).toBeInTheDocument();`
  - I also tested the functionality of the onSubmit function and whether it is called with the correct values
    - Similar to the above test, I used `getByRole` and rendered the <Search /> component. This time however I used `const mock = jest.fn();` to mock the function. Therefore, the mock function was passed into the prop value: `const { getByRole } = render(<Search handleSubmit={mock} />);`. I then created two other variables, `input` (which represents the _textbox_ seen on the webpage) and `button` (which represents the button that the user clicks) and used the `getByRole` query to search for them. (The `input` and `button` tags contained within the <Search /> `div` have _pre-assigned_ roles already so when you use `getByRole` in the testing, it knows that `input` is a textbox and `button` is a button). I used the `fireEvent` action to test the input and the button. For the _input_ I used `fireEvent.change(input, { target: { value: "Nebula" } });` - this is essentially similating `onChange={(e) => setValue(e.target.value)}`. `input` in the test represents `(e)` in the code (which is the value that has been typed into the textbox and is now updating the state with every keystroke), `target` represents `target` and `value` represents `value` (which is the state. `value` is contained within the `setValue` function and is updated with every keystroke and becomes the new state until it is updated again). Here I gave the `value: "Nebula"` as a mock search the user might make
      - Quick aside: `target` - when an event is dispatched on an element, the event has the subjected element on a property called `target`. If you provide a `target` property in the `eventProperties`, then those properties will be assigned to the node which is receiving the event
    - I also used `fireEvent.click(button)` to test the _button_ functionality. At the end I made the assertion `expect(mock).toHaveBeenCalledWith("Nebula");` - meaning when the mock function is being called, we're expecting it to have _"Nebula"_ as the `value` within the textbox.
- In _SearchResults.js_ we have a snapshot test
  - I created a stub with some fake image files to represent the value of the `searchResults` prop (which is also the `state`)
  - I also tested whether the _alt text_ for the _searchResults_ was being rendered correctly. This test lets us know that the element is rendering correctly in the user interface. The stub is again passed in as the value of the prop (`searchResults={stub}`). The assertion we're making is `getAllByAltText` and telling it to look for the text (`spaceImage`). The [0] is targetting the first item in the array. Then we're matching the alt text to the class name of the component, which is `card-image`.

### What I would do if I had more time

- Make the styling of the app a little better
- Look at the tests section in more detail - are there more tests that can be added?
  - Also look into more detail regarding the difference between fireEvent and userEvent in the React Testing Library

---

### Acknowledgements

Thank you to Manchester Codes for the excellent platform tutorials and thank you to all the teachers and tutors for your support, namely: Martyna, Dan, Diego, and Whitney.

### Author

Shona McBride
