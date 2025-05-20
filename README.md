# Typerr - Typing Practice for Programmers

## Overview

Typerr is a specialized typing practice web application designed specifically for programmers. Unlike traditional typing tutors, Typerr focuses on improving your typing speed and accuracy when writing code in various programming languages.

## Features

- **Language-specific Practice**: Train with real code samples from multiple programming languages including JavaScript, Python, Java, C++, C#, PHP, Ruby, and Swift.
- **Multiple Difficulty Levels**: Progress from easy snippets to expert-level code as your skills improve.
- **Practice Modes**:
  - **Standard**: Regular typing practice without special conditions
  - **Time Attack**: Race against the clock to finish typing
  - **Error Penalty**: Practice restarts if you make too many errors
- **Customizable Time Limits**: Practice with time constraints ranging from 30 seconds to 5 minutes, or without any time limit.
- **Real-time Performance Metrics**: Track your Words Per Minute (WPM), accuracy, time taken, and error count as you type.
- **Progress Tracking**: View your practice history to monitor improvement over time.
- **Code Syntax Highlighting**: Visual indication of correct and incorrect keystrokes.
- **Local Storage**: Your settings and practice history are saved between sessions.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required after initial load (works offline)

### Installation

1. Clone the repository or download the ZIP file:
   ```
   git clone https://github.com/yourusername/typerr.git
   ```

2. Open the `index.html` file in your web browser:
   ```
   cd typerr
   open index.html  # or double-click the file in your file explorer
   ```

### Using Typerr

1. **Select your preferences**:
   - Choose your programming language
   - Set the difficulty level
   - Select a time limit
   - Choose a practice mode

2. **Click "Start"** to begin typing practice

3. **Type the displayed code** as quickly and accurately as possible

4. **View your results** after completing the snippet or when the time runs out

5. **Track your progress** in the Practice History section

## Project Structure

- `index.html` - The main HTML document
- `styles.css` - CSS styling for the application
- `script.js` - Application logic and functionality
- `snippets.js` - Collection of code snippets for practice (required but not included)

## Adding Custom Code Snippets

The application requires a `snippets.js` file that contains code samples for practice. This file should define a global `codeSnippets` object with the following structure:

```javascript
const codeSnippets = {
  javascript: {
    easy: [
      "function greet() {\n  console.log('Hello world');\n}",
      // More snippets...
    ],
    medium: [
      // Medium difficulty snippets
    ],
    hard: [
      // Hard difficulty snippets
    ],
    expert: [
      // Expert difficulty snippets
    ]
  },
  python: {
    // Python snippets organized by difficulty
  },
  // Other programming languages...
};
```

## Features to Add

Here are some features that could be added to enhance Typerr:

- User accounts and cloud syncing
- Code snippet contributions
- Custom themes/syntax highlighting
- Keyboard layout customization
- Typing pattern analysis
- Multiplayer competitions
- Achievements and badges

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT License](LICENSE) - Feel free to use, modify, and distribute this code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with vanilla JavaScript
- Inspired by typing practice applications like TypingTest.com, Keybr, and MonkeyType
