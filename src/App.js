import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [key, setKey] = useState("No key pressed");

  const [mouseStatus, setMouseStatus] = useState(
    "Move your mouse into the box"
  );

  const [bubbleMessage, setBubbleMessage] = useState(
    "Click the child button"
  );

  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const totalSlides = 15;

  // -----------------------------
  // SLIDE NAVIGATION
  // -----------------------------

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev < totalSlides - 1 ? prev + 1 : prev
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // -----------------------------
  // KEYBOARD NAVIGATION
  // -----------------------------

  useEffect(() => {
    const handleKeyboardNavigation = (event) => {
      if (event.key === "ArrowRight") {
        setCurrentSlide((prev) =>
          prev < totalSlides - 1 ? prev + 1 : prev
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentSlide((prev) =>
          prev > 0 ? prev - 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyboardNavigation);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboardNavigation
      );
    };
  }, []);

  // -----------------------------
  // DEBOUNCING
  // -----------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  // -----------------------------
  // FORM
  // -----------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(name);
  };

  // -----------------------------
  // KEYBOARD EVENT
  // -----------------------------

  const handleKeyDown = (event) => {
    setKey(`Key Down: ${event.key}`);
  };

  const handleKeyUp = (event) => {
    setKey(`Key Up: ${event.key}`);
  };

  // -----------------------------
  // EVENT BUBBLING
  // -----------------------------

  const handleParentClick = () => {
    setBubbleMessage("Parent clicked!");
  };

  const handleChildClick = (event) => {
    event.stopPropagation();
    setBubbleMessage("Child clicked — propagation stopped!");
  };

  // -----------------------------
  // SLIDES
  // -----------------------------

  const slides = [
    {
      type: "title",
      title: "Events in React",
      subtitle: "Interactive React Presentation",
      content: (
        <div className="title-content">
          <h1>Events in React</h1>

          <p>
            Learn how React responds to user interactions
            and creates interactive applications.
          </p>

          <div className="student-info">
            <span>Kigarama TSS</span>
            <span>L5 Software Development</span>
            <span>Teacher: Steven</span>
          </div>
        </div>
      ),
    },

    {
      title: "What is an Event?",
      content: (
        <div>
          <p>
            An event is an action that happens in a web
            application because of the user or the browser.
          </p>

          <div className="cards">
            <div className="card">
              <h3>🖱️ Mouse</h3>
              <p>Click, hover, move, enter and leave.</p>
            </div>

            <div className="card">
              <h3>⌨️ Keyboard</h3>
              <p>Pressing and releasing keyboard keys.</p>
            </div>

            <div className="card">
              <h3>📝 Form</h3>
              <p>Typing, submitting, focusing and blurring.</p>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Types of Events",
      content: (
        <div className="cards">
          <div className="card">
            <h3>Mouse Events</h3>
            <p>onClick, onMouseEnter, onMouseLeave</p>
          </div>

          <div className="card">
            <h3>Keyboard Events</h3>
            <p>onKeyDown, onKeyUp</p>
          </div>

          <div className="card">
            <h3>Form Events</h3>
            <p>onChange, onSubmit, onFocus, onBlur</p>
          </div>

          <div className="card">
            <h3>React Events</h3>
            <p>
              React provides a consistent event system
              across browsers.
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "onClick Event",
      content: (
        <div className="demo">
          <h2>Click the button</h2>

          <button
            onClick={() => setClicks(clicks + 1)}
            className="primary-button"
          >
            Click Me
          </button>

          <div className="counter">
            Clicks: <strong>{clicks}</strong>
          </div>

          <button
            onClick={() => setClicks(0)}
            className="secondary-button"
          >
            Reset
          </button>

          <p>
            The <code>onClick</code> event runs when the
            user clicks an element.
          </p>
        </div>
      ),
    },

    {
      title: "Form Events",
      content: (
        <div className="demo">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <button
              type="submit"
              className="primary-button"
            >
              Submit
            </button>
          </form>

          <p>
            <strong>Typed value:</strong>{" "}
            {name || "Nothing yet"}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {submitted || "Nothing submitted"}
          </p>

          <div className="event-list">
            <p>• onChange → detects input changes</p>
            <p>• onSubmit → handles form submission</p>
            <p>• onFocus → input becomes active</p>
            <p>• onBlur → input loses focus</p>
          </div>
        </div>
      ),
    },

    {
      title: "Mouse Events",
      content: (
        <div className="demo">
          <div
            className="mouse-box"
            onMouseEnter={() =>
              setMouseStatus("Mouse entered the box!")
            }
            onMouseLeave={() =>
              setMouseStatus("Mouse left the box!")
            }
          >
            Move your mouse here
          </div>

          <h3>{mouseStatus}</h3>

          <p>
            Common mouse events include:
          </p>

          <ul>
            <li>onClick</li>
            <li>onDoubleClick</li>
            <li>onMouseEnter</li>
            <li>onMouseLeave</li>
            <li>onMouseMove</li>
          </ul>
        </div>
      ),
    },

    {
      title: "Keyboard Events",
      content: (
        <div className="demo">
          <input
            type="text"
            placeholder="Press any key"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />

          <div className="key-display">
            {key}
          </div>

          <p>
            <code>onKeyDown</code> happens when a key is
            pressed.
          </p>

          <p>
            <code>onKeyUp</code> happens when a key is
            released.
          </p>
        </div>
      ),
    },

    {
      title: "SyntheticEvent",
      content: (
        <div>
          <p>
            React uses a system called{" "}
            <strong>SyntheticEvent</strong>.
          </p>

          <div className="card">
            <h3>Why SyntheticEvent?</h3>

            <ul>
              <li>Provides a consistent event interface.</li>
              <li>Works across different browsers.</li>
              <li>Uses normal event properties.</li>
              <li>Makes event handling easier in React.</li>
            </ul>
          </div>

          <pre>
{`function handleClick(event) {
  console.log(event.type);
  console.log(event.target);
}`}
          </pre>
        </div>
      ),
    },

    {
      title: "Event Bubbling",
      content: (
        <div className="demo">
          <div
            className="parent-box"
            onClick={handleParentClick}
          >
            <h3>Parent</h3>

            <button
              className="primary-button"
              onClick={handleChildClick}
            >
              Child Button
            </button>
          </div>

          <h3>{bubbleMessage}</h3>

          <p>
            Events normally move from the target element
            upward through its parents.
          </p>

          <p>
            <code>stopPropagation()</code> can stop this
            behavior.
          </p>
        </div>
      ),
    },

    {
      title: "Debouncing",
      content: (
        <div className="demo">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <div className="search-results">
            <p>
              <strong>Current:</strong>{" "}
              {search || "Empty"}
            </p>

            <p>
              <strong>Debounced:</strong>{" "}
              {debouncedValue || "Waiting..."}
            </p>
          </div>

          <p>
            Debouncing waits until the user stops typing
            before running an action.
          </p>

          <p>
            In this example the delay is{" "}
            <strong>600 milliseconds</strong>.
          </p>
        </div>
      ),
    },

    {
      title: "Throttling",
      content: (
        <div>
          <p>
            Throttling controls how frequently a function
            can run.
          </p>

          <div className="cards">
            <div className="card">
              <h3>Debouncing</h3>
              <p>
                Waits until the activity stops.
              </p>
            </div>

            <div className="card">
              <h3>Throttling</h3>
              <p>
                Runs at a controlled interval.
              </p>
            </div>
          </div>

          <div className="card">
            <h3>Example Uses</h3>

            <ul>
              <li>Scroll events</li>
              <li>Window resize</li>
              <li>Mouse movement</li>
              <li>Search optimization</li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      title: "Event Flow",
      content: (
        <div>
          <div className="flow">
            <div className="flow-item">
              1. User Action
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              2. Browser Event
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              3. React Handler
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              4. State Update
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              5. UI Update
            </div>
          </div>

          <div className="card">
            <h3>Simple Example</h3>

            <pre>
{`User clicks button
        ↓
onClick runs
        ↓
setState()
        ↓
React re-renders
        ↓
UI changes`}
            </pre>
          </div>
        </div>
      ),
    },

    {
      title: "Team",
      content: (
        <div className="team">
          <div className="card">
            <h3>Izere Prince</h3>
            <p>Software Developer</p>
          </div>

          <div className="card">
            <h3>Rutayisire Jackson</h3>
            <p>Software Developer</p>
          </div>

          <div className="card">
            <h3>Muganga Nelson</h3>
            <p>Software Developer</p>
          </div>

          <div className="teacher">
            <h3>Teacher</h3>
            <p>Steven</p>
          </div>
        </div>
      ),
    },

    {
      title: "Advertisement",
      content: (
        <div className="advertisement">
          <h1>IPTECH</h1>

          <h2>Technology • Innovation • Development</h2>

          <p>
            Building modern digital solutions through
            software development and technology.
          </p>

          <a
            href="https://iptech-1.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            Visit IPTECH →
          </a>
        </div>
      ),
    },

    {
      title: "Thank You",
      content: (
        <div className="thank-you">
          <h1>Thank You!</h1>

          <p>
            Thank you for listening to our presentation.
          </p>

          <p>
            We hope you now understand how events work
            in React.
          </p>

          <div className="card">
            <h3>Key Takeaways</h3>

            <ul>
              <li>React events make applications interactive.</li>
              <li>Event handlers respond to user actions.</li>
              <li>State can be updated through events.</li>
              <li>Events can bubble through components.</li>
              <li>Debouncing and throttling improve performance.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  // -----------------------------
  // CURRENT SLIDE
  // -----------------------------

  const slide = slides[currentSlide];

  return (
    <div className="app">
      {/* TOP BAR */}

      <header className="top-bar">
        <div className="brand">
          <span className="brand-logo">R</span>
          <span>React Events</span>
        </div>

        <div className="slide-counter">
          {currentSlide + 1} / {totalSlides}
        </div>
      </header>

      {/* PROGRESS BAR */}

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${
              ((currentSlide + 1) / totalSlides) * 100
            }%`,
          }}
        />
      </div>

      {/* MAIN PRESENTATION */}

      <main className="presentation">
        <section
          className={`slide ${
            slide.type === "title" ? "title-slide" : ""
          }`}
        >
          <div className="slide-content">
            {!slide.type && (
              <h1 className="slide-title">
                {slide.title}
              </h1>
            )}

            {slide.content}
          </div>
        </section>
      </main>

      {/* NAVIGATION */}

      <div className="navigation">
        <button
          onClick={previousSlide}
          disabled={currentSlide === 0}
          className="nav-button"
        >
          ← Previous
        </button>

        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="nav-button"
        >
          Next →
        </button>
      </div>

      {/* FOOTER */}

      <footer className="footer">
        <span>React Events Presentation</span>

        <span>
          Use ← → arrow keys to navigate
        </span>

        <span>IPTECH</span>
      </footer>
    </div>
  );
}

export default App;