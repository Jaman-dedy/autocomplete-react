1. **What is the difference between Component and PureComponent? Give an example where it might break my app.**


The main difference between `Component` and `PureComponent` in React is how they handle `ShouldComponent` update lifecycle method.
Component is the base class to create class component in React, and does not implement by default `shouldComponentUpdate`. This means that every time a state, props changes or when the parent component re-renders all its child will also re-render.
On the other hand, a `PureComponent` implements `ShouldComponentUpdate` by default and does a shallow comparison of the current and next state and props. With this mechanism the PureComponent renders only if it has detected some changes in props or states, which improve the performance by avoiding un-necessary re-renders.

However the shallow comparison does not perform deep comparison of nested objects and arrays, it's only checks for for equality of primitive types and object references. For example if a PureComponent receives an array of object from a parent component and a new object is added to the array, the `PureComponent` will not be updated because the reference to the array remains the same.


2. **Context + ShouldComponentUpdate might be dangerous. Why is that?**

The danger of using `Context` together with `ShouldComponentUpdate` arises when `ShouldComponentUpdate` return `false` in some components that consume a `Context`, even if the `Context` value changes, these components will not re-render.
As a result the component may continue to render stale data from the previous `Context` value.

3. **Describe 3 ways to pass information from a component to its PARENT.**

A call back function can be passed as a prop to the child component then be used to pass data as argument, The parent component will then receive the data through the call back function and update the state or perform other actions.
A state that should be shared between the parent and the child can be defined in the parent component, then together with the function to update this given state can be passed down to the child component. The child component has the possibility to update the value of the state.
A context can be created from the parent component, in the child component with `useContext` access the value and the method to update the `Context` value.

4. **Give 2 ways to prevent components from re-rendering.**
`React.memo` can be used to wrap a functional component and memoizes the result of the component render method. This component can then only re-render if its props change.
`ShouldComponentUpdate` as a lifecycle method for class component can allow to control manually wether a component can re-render based on the changes of props or states.

5. **What is a fragment and why do we need it? Give an example where it might break my app.**

A fragment is a component that allows to group multiple elements together without adding any extra node to the DOM. The main reason to use fragment is to avoid un-necessary DOM nesting and keeping the DOM structure clean. However as a fragment is not creating any node on the DOM, it can not be styled of an event handler can not be applied on it, if the jsx in a child component are wrapped into a fragment, trying to style it of using an event handler will not work.

6. **Give 3 examples of the HOC pattern.**

High order component are used to share, reuse functionalities or inject props into other components. 
`react-redux connect()`, `react-router withRouter`, `withStyles from material-ui`, are among the most used HOC/HOF in React.
Custom HOC can only be implemented for instance `withAuth` to check if the user is authenticated, `withLoading` to manage to loading state until the data is available, `withErrorBoundary` to catch javascript errors.

7. **What's the difference in handling exceptions in promises, callbacks and async…await?**

Promises have a built-in mechanism for handling exceptions using the `.catch()` method, when an exception is thrown within a promise or if the promise is rejected the error will be handle by the `.catch()`. The callback function takes an error object as the first parameter followed by the result or data. Whenever the error parameter is truthy the exception should be handled accordingly.
Lastly for async and await exceptions are handled using `try/catch` block.

8. **How many arguments does setState take and why is it async.**

The `setState` takes two arguments, the first one is an object that represents the state update or a function that returns an object representing the state update. The second argument is an optional callback function that execute after the state has been updated and the component has re-rendered. the `setState` is asynchronous because, react batches multiple `setState` calls into a single update for performance reasons, with this react can optimize and batch state update efficiently to avoid un-necessary re-renders of the component. By making the `setState` asynchronous, React can also ensure that the state are applied in a predictable and consistent manner.

9. **List the steps needed to migrate a Class to Function Component.**

First replace the class declaration with the function by removing `class` keyword and `extends React.Component` syntax, and replace it with a function declaration or an arrow function, remove the `render` method and return directly the `jsx` block of code, if the class component has state properties convert it to `useState` hook then convert all the lifecycle methods to hooks by replacing for instance `componentDidMount, componentDidUpdate, or componentWillUnmount` with `useEffect` hook. in function component the `props` can be directly accessed so remove `this.props`. the same goes for event handler, `this` should be removed while accessing them. the last thing to do should be to test and verify if everything is working properly.

10. **.List a few ways styles can be used with components.**

Inline styles can be applied directly to the element using the `style` props which takes an object where keys are camelCased css properties and the values are the corresponding style values. The other way could be to create a separate `CSS` file for each component or a global `CSS` for the entire application then apply the style element using the `classNames` after importing the file into the component. `CSS modules` allows to write scoped CSS styles for each component by importing the CSS file as an object and using the class names as keys to access the corresponding styles. `Styled components` is a popular library that allows to write css directly in the component file, tagged template literals are used to define styles and create a new component with those styles. there are also several `CSS-in-JS` libraries such as React-Material, AntD, Semantic-ui... that provide a way to write css using javascript, often with additional features like dynamic styles, theming...

11. **How to render an HTML string coming from the server.**

`dangerouslySetInnerHTML` attribute can be used to render HTML string coming from the server. However it's important to know that this approach can be potentially dangerous if the HTML string is not properly sanitized or trusted because it can expose the application to cross-site scripting (XSS) attacks. There other more safer react dependencies that can also help to achieve the same purpose like `html-react-parser` or others...