# Build Your Own Reddit App

BareDit (Bare Reddit) is a web application that allows users to browse Reddit posts, search through them, and view detailed comments, all powered by Reddit's public JSON API. The app utilizes React and Redux for its UI and state management, with a focus on responsive design, animations, and testing. The project will give users an enjoyable and seamless experience while browsing content from Reddit. The application is styled using **Tailwind CSS**, a utility-first CSS framework, for rapid and customizable UI development.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

- **Browse Posts**: Users can view Reddit posts from different subreddits.
- **Search Posts**: Users can search posts using keywords or phrases.
- **Detailed View**: Users can view a detailed post along with comments in a modal.
- **Responsive Design**: The app is fully responsive, offering an optimized experience on both desktop and mobile devices.
- **Animations & Transitions**: Smooth animations for transitions and UI elements, enhancing user experience.
- **Error Handling**: App gracefully handles error states (e.g., no posts found or API errors).
- **Tailwind CSS**: Tailwind CSS is used for a customizable, utility-first approach to styling the application.

## Demo

Check out the live demo of the app at [https://baredit.netlify.app/](https://baredit.netlify.app/).

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Redux**: State management for the application.
- **Reddit JSON API**: Used to fetch posts, comments, subreddits from Reddit.
- **Axios**: HTTP client for making requests to the Reddit API.
- **Tailwind CSS**: Utility-first CSS framework used for styling the application.
- **Jest**: Testing framework for unit and integration tests.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vlrnsnk/baredit.git
   cd baredit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will start the app and open it in your default browser at `http://localhost:3000`.

4. **Build the project**:
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `build` directory.

## Usage

- **Browse Posts**: Upon loading, users will see a list of posts from the Reddit API.
- **Search**: Use the search bar to find posts based on keywords.
- **Detailed View**: Click on any post to view detailed comments in a modal.
- **Responsive Design**: The app is fully responsive and adapts to different screen sizes.
- **Tailwind CSS**: The app leverages the utility-first Tailwind CSS classes to style components quickly and consistently.

## Running Tests

To run the tests using Jest, follow these steps:

1. **Run unit tests**:
   ```bash
   npm test
   ```
   This will run all the unit tests in the project.

2. **Watch test changes**:
   ```bash
   npm run test:watch
   ```
   This will keep Jest running and automatically rerun tests when files are modified.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -am 'Add your changes'`
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Open a pull request** to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Reddit API](https://www.reddit.com/dev/api/)
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contact

Feel free to reach out to me with any questions or for collaborations.

- **Email**: [vlrnsnk\@proton.me](mailto:vlrnsnk@proton.me?subject=BareDit)
- **LinkedIn**: [https://linkedin.com/in/vlrnsnk/](https://linkedin.com/in/vlrnsnk/)
- **GitHub**: [https://github.com/vlrnsnk](https://github.com/vlrnsnk/)
