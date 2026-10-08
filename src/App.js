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
  const [focused, setFocused] = useState(false);

  const [bubbleMessage, setBubbleMessage] = useState(
    "Click the child button"
  );

  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const totalSlides = 15;

  // -----------------------------
  // NEXT SLIDE
  // -----------------------------
  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous < totalSlides - 1 ? previous + 1 : previous
    );
  };

  // -----------------------------
  // PREVIOUS SLIDE
  // -----------------------------
  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous > 0 ? previous - 1 : previous
    );
  };

  // -----------------------------
  // KEYBOARD NAVIGATION
  // -----------------------------
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowRight") {
        setCurrentSlide((previous) =>
          previous < totalSlides - 1 ? previous + 1 : previous
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentSlide((previous) =>
          previous > 0 ? previous - 1 : previous
        );
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
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
  // SLIDE CONTENT
  // -----------------------------
  const slides = [

    // 1
    {
      number: "01",
      title: "Events in React",
      type: "title",
      content: (
        <>
          <p className="big-description">
            Frontend Application with React.js
          </p>

          <p>
            An interactive presentation explaining how React
            handles user events and interactions.
          </p>

          <div className="presentation-info">
            <span>Kigarama TSS</span>
            <span>L5 Software Development</span>
            <span>Teacher Steven</span>
          </div>
        </>
      ),
    },

    // 2
    {
      number: "02",
      title: "What is an Event in React?",
      content: (
        <>
          <div className="definition">
            <strong>Definition</strong>

            <p>
              An event is an action or occurrence that happens
              because of the user or the system.
            </p>
          </div>

          <div className="examples">
            <div>🖱️ Click</div>
            <div>⌨️ Keyboard</div>
            <div>📝 Form</div>
            <div>🖱️ Mouse</div>
            <div>🎯 Focus</div>
          </div>

          <div className="explanation">
            <h3>Simple idea</h3>

            <p>
              When a user does something, React can detect that
              action and execute a function.
            </p>

            <p className="formula">
              User Action → Event → Handler → UI Update
            </p>
          </div>
        </>
      ),
    },

    // 3
    {
      number: "03",
      title: "Types of React Events",
      content: (
        <>
          <div className="event-types">

            <div>
              <span>🖱️</span>
              <h3>Mouse Events</h3>
              <p>
                onClick, onDoubleClick,
                onMouseEnter, onMouseLeave
              </p>
            </div>

            <div>
              <span>⌨️</span>
              <h3>Keyboard Events</h3>
              <p>
                onKeyDown, onKeyUp
              </p>
            </div>

            <div>
              <span>📝</span>
              <h3>Form Events</h3>
              <p>
                onChange, onSubmit,
                onFocus, onBlur
              </p>
            </div>

            <div>
              <span>⚛️</span>
              <h3>React Events</h3>
              <p>
                Synthetic events and
                event propagation
              </p>
            </div>

          </div>
        </>
      ),
    },

    // 4
    {
      number: "04",
      title: "onClick Event",
      content: (
        <>
          <div className="definition">
            <strong>What is onClick?</strong>

            <p>
              onClick runs a function when the user clicks
              an element such as a button.
            </p>
          </div>

          <div className="code-box">
            <code>
              {`function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}`}
            </code>
          </div>

          <div className="demo-area">
            <button
              className="main-button"
              onClick={() => setClicks(clicks + 1)}
            >
              Click Me
            </button>

            <p>
              Button clicked: <strong>{clicks}</strong> times
            </p>
          </div>
        </>
      ),
    },

    // 5
    {
      number: "05",
      title: "Form Events",
      content: (
        <>
          <div className="definition">
            <strong>Important Form Events</strong>

            <p>
              React provides events for handling user input
              and forms.
            </p>
          </div>

          <div className="event-list">
            <div>
              <strong>onChange</strong>
              <span>Detects changes in an input.</span>
            </div>

            <div>
              <strong>onSubmit</strong>
              <span>Handles form submission.</span>
            </div>

            <div>
              <strong>onFocus</strong>
              <span>Runs when an input gets focus.</span>
            </div>

            <div>
              <strong>onBlur</strong>
              <span>Runs when an input loses focus.</span>
            </div>
          </div>

          <input
            className="presentation-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type your name..."
          />

          <p className="live-result">
            Current value: {name || "Waiting..."}
          </p>

          <button
            className="main-button"
            onClick={() => setSubmitted(name)}
          >
            Submit
          </button>

          {submitted && (
            <p className="success">
              Submitted successfully: {submitted}
            </p>
          )}
        </>
      ),
    },

    // 6
    {
      number: "06",
      title: "Mouse Events",
      content: (
        <>
          <div className="definition">
            <strong>Mouse Events</strong>

            <p>
              Mouse events allow React applications to respond
              to different mouse actions.
            </p>
          </div>

          <div className="event-types small">

            <div>
              <h3>onClick</h3>
              <p>When the element is clicked.</p>
            </div>

            <div>
              <h3>onDoubleClick</h3>
              <p>When the element is clicked twice.</p>
            </div>

            <div>
              <h3>onMouseEnter</h3>
              <p>When the mouse enters.</p>
            </div>

            <div>
              <h3>onMouseLeave</h3>
              <p>When the mouse leaves.</p>
            </div>

          </div>

          <div
            className="mouse-demo"
            onMouseEnter={() =>
              setMouseStatus("Mouse entered the box")
            }
            onMouseLeave={() =>
              setMouseStatus("Mouse left the box")
            }
          >
            <span>MOVE YOUR MOUSE HERE</span>
            <small>{mouseStatus}</small>
          </div>
        </>
      ),
    },

    // 7
    {
      number: "07",
      title: "Keyboard Events",
      content: (
        <>
          <div className="definition">
            <strong>Keyboard Events</strong>

            <p>
              Keyboard events happen when a user presses or
              releases a key.
            </p>
          </div>

          <div className="event-types small">

            <div>
              <h3>onKeyDown</h3>
              <p>Runs when a key is pressed down.</p>
            </div>

            <div>
              <h3>onKeyUp</h3>
              <p>Runs when a key is released.</p>
            </div>

          </div>

          <input
            className="presentation-input"
            onKeyDown={(event) =>
              setKey(`Key Down: ${event.key}`)
            }
            onKeyUp={(event) =>
              setKey(`Key Up: ${event.key}`)
            }
            placeholder="Press any keyboard key..."
          />

          <div className="key-result">
            {key}
          </div>
        </>
      ),
    },

    // 8
    {
      number: "08",
      title: "Synthetic Event",
      content: (
        <>
          <div className="definition">
            <strong>What is a Synthetic Event?</strong>

            <p>
              A SyntheticEvent is React's wrapper around the
              browser's native event.
            </p>
          </div>

          <div className="explanation">

            <h3>Why does React use it?</h3>

            <p>
              It gives developers a consistent way to work
              with events across different browsers.
            </p>

          </div>

          <div className="code-box">
            <code>
              {`function handleClick(event) {
  console.log(event.type);
  console.log(event.target);
}

<button onClick={handleClick}>
  Test Event
</button>`}
            </code>
          </div>

          <button
            className="main-button"
            onClick={(event) =>
              alert(
                `Event Type: ${event.type}\nTarget: ${event.target.tagName}`
              )
            }
          >
            Test Synthetic Event
          </button>
        </>
      ),
    },

    // 9
    {
      number: "09",
      title: "Event Bubbling",
      content: (
        <>
          <div className="definition">
            <strong>What is Event Bubbling?</strong>

            <p>
              Event bubbling means an event starts at the
              target element and then moves upward through
              its parent elements.
            </p>
          </div>

          <div className="bubble-diagram">
            <div className="parent-box">
              Parent

              <div className="child-box">
                Child

                <button
                  onClick={() =>
                    setBubbleMessage(
                      "Child clicked → event can bubble to Parent"
                    )
                  }
                >
                  Click Child
                </button>
              </div>
            </div>
          </div>

          <div className="explanation">

            <h3>Stopping bubbling</h3>

            <p>
              We can stop an event from moving to the parent
              using:
            </p>

            <div className="inline-code">
              event.stopPropagation()
            </div>

          </div>

          <p className="live-result">
            {bubbleMessage}
          </p>
        </>
      ),
    },

    // 10
    {
      number: "10",
      title: "Debouncing",
      content: (
        <>
          <div className="definition">
            <strong>What is Debouncing?</strong>

            <p>
              Debouncing waits until the user stops performing
              an action before running a function.
            </p>
          </div>

          <div className="formula">
            User types → wait → user stops → function runs
          </div>

          <div className="code-box">
            <code>
              {`useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(value);
  }, 600);

  return () => clearTimeout(timer);
}, [value]);`}
            </code>
          </div>

          <input
            className="presentation-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type quickly..."
          />

          <div className="debounce-result">
            <span>Debounced value:</span>
            <strong>
              {debouncedValue || "Waiting..."}
            </strong>
          </div>

          <p className="tip">
            Easy memory: <strong>STOP → RUN</strong>
          </p>
        </>
      ),
    },

    // 11
    {
      number: "11",
      title: "Throttling",
      content: (
        <>
          <div className="definition">
            <strong>What is Throttling?</strong>

            <p>
              Throttling limits how often a function can run
              during a period of time.
            </p>
          </div>

          <div className="formula">
            Event → RUN → WAIT → RUN → WAIT
          </div>

          <div className="code-box">
            <code>
              {`if (Date.now() - lastTime >= 500) {
  handleEvent();
  lastTime = Date.now();
}`}
            </code>
          </div>

          <div className="throttle-demo">
            <span>THROTTLING</span>
            <p>
              Useful for scroll, resize and mouse movement.
            </p>
          </div>

          <p className="tip">
            Easy memory: <strong>RUN → WAIT → RUN</strong>
          </p>
        </>
      ),
    },

    // 12
    {
      number: "12",
      title: "React Event Flow",
      content: (
        <>
          <div className="event-flow-large">

            <div>
              <span>01</span>
              <strong>User Action</strong>
              <p>Click, type or move.</p>
            </div>

            <div className="arrow">→</div>

            <div>
              <span>02</span>
              <strong>React Event</strong>
              <p>React detects it.</p>
            </div>

            <div className="arrow">→</div>

            <div>
              <span>03</span>
              <strong>Handler</strong>
              <p>Function executes.</p>
            </div>

            <div className="arrow">→</div>

            <div>
              <span>04</span>
              <strong>State/UI</strong>
              <p>Interface updates.</p>
            </div>

          </div>

          <div className="final-message">
            React makes user interaction easier by connecting
            events with components and state.
          </div>
        </>
      ),
    },

    // 13
    {
      number: "13",
      title: "Project Team",
      content: (
        <>
          <p className="center-text">
            This React project was developed by:
          </p>

          <div className="team">

            <div className="member">
              <div>IP</div>
              <h3>Izere Prince</h3>
              <p>Software Development Student</p>
            </div>

            <div className="member">
              <div>RJ</div>
              <h3>Rutayisire Jackson</h3>
              <p>Software Development Student</p>
            </div>

            <div className="member">
              <div>MN</div>
              <h3>Muganga Nelson</h3>
              <p>Software Development Student</p>
            </div>

          </div>

          <div className="teacher">
            <span>TEACHER</span>
            <h3>Steven</h3>
            <p>Kigarama TSS — L5 Software Development</p>
          </div>
        </>
      ),
    },

    // 14
    {
      number: "14",
      title: "Advertisement",
      content: (
        <>
          <div className="iptech">

            <span>ADVERTISEMENT</span>

            <h2>IPTECH</h2>

            <h3>
              Technology, Software & AI Solutions
            </h3>

            <p>
              Discover technology, software development and
              AI solutions.
            </p>

            <a
              href="https://iptech-1.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Visit IPTECH →
            </a>

          </div>
        </>
      ),
    },

    // 15
    {
      number: "15",
      title: "Thank You",
      type: "title",
      content: (
        <>
          <div className="thank-you">
            <h2>Thank You!</h2>

            <p>
              We hope this presentation helped you understand
              Events in React.
            </p>

            <div className="presentation-info">
              <span>Izere Prince</span>
              <span>Rutayisire Jackson</span>
              <span>Muganga Nelson</span>
            </div>

            <p className="school">
              Kigarama TSS • L5 Software Development
              <br />
              Teacher Steven
            </p>
          </div>
        </>
      ),
    },
  ];

  const slide = slides[currentSlide];

  return (
    <div className="presentation">

      {/* TOP BAR */}
      <header className="topbar">

        <div className="logo">
          <span>R</span>
          <div>
            <strong>React Events</strong>
            <small>Frontend Application with React.js</small>
          </div>
        </div>

        <div className="counter">
          {String(currentSlide + 1).padStart(2, "0")}
          {" / "}
          {String(totalSlides).padStart(2, "0")}
        </div>

      </header>

      {/* SLIDE */}
      <main className={`slide ${slide.type === "title" ? "title-slide" : ""}`}>

        <div className="slide-number">
          {slide.number}
        </div>

        <div className="slide-content">

          <span className="topic-label">
            EVENTS IN REACT
          </span>

          <h1>{slide.title}</h1>

          <div className="content">
            {slide.content}
          </div>

        </div>

      </main>

      {/* NAVIGATION */}
      <div className="navigation">

        <button
          onClick={previousSlide}
          disabled={currentSlide === 0}
          title="Previous slide"
        >
          ←
        </button>

        <div className="progress">

          <div
            className="progress-bar"
            style={{
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            }}
          />

        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          title="Next slide"
        >
          →
        </button>

      </div>

      {/* KEYBOARD HINT */}
      <div className="keyboard-hint">
        Use <kbd>←</kbd> <kbd>→</kbd> Arrow Keys to navigate
      </div>

      {/* FOOTER */}
      <footer>

        <span>Kigarama TSS</span>

        <span>•</span>

        <span>L5 Software Development</span>

        <span>•</span>

        <span>Teacher Steven</span>

        <span>•</span>

        <span>
          Developed by Izere Prince, Rutayisire Jackson &
          Muganga Nelson
        </span>

      </footer>

    </div>
  );
}

export default App;