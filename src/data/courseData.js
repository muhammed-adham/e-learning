// Dummy course + student progress. Replace with API responses later.
export const COURSE = {
  id: "c_101",
  slug: "react-state-management",
  title: "React State Management",
  subtitle: "From useState to Redux Toolkit, and when to use each",
  level: "intermediate",
  language: "English",
  navigation: "sequential", // "sequential" = must finish a lesson to unlock the next; "free" = any order
  instructor: {
    name: "Sara Mahmoud",
    title: "Senior Frontend Engineer",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  updatedAt: "2026-09-14T10:00:00+03:00",

  sections: [
    // ─────────────────────────────────────────────── Section 1
    {
      id: "s_1",
      title: "Thinking in state",
      lessons: [
        {
          id: "l_1",
          slug: "what-is-state",
          title: "What is state, really?",
          durationSec: 360,
          isPreview: true,
          blocks: [
            {
              type: "text",
              body: "Every interactive app remembers things: what's in the cart, which tab is open, whether a menu is expanded. In React, anything that changes over time and affects what's on screen is **state**.\n\nIf a value never changes, it isn't state. It's a constant. If you can calculate it from other values, it isn't state either. It's derived data.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "A quick test",
              body: "Ask: does this value change while the user is on the page, and does the UI need to update when it does? If both answers are yes, it's state.",
            },
            {
              type: "text",
              body: "Look at a typical product page. The product name comes from the server and doesn't change, so it's data, not state. The selected size and the quantity change as the user clicks, so those are state. The total price is quantity × price, so it's derived and shouldn't be stored at all.",
            },
            {
              type: "image",
              url: "https://picsum.photos/seed/state-diagram/800/400",
              alt: "Diagram sorting product page values into data, state, and derived values",
              caption:
                "Sorting a product page into data, state, and derived values",
            },
          ],
          checkpoint: {
            question:
              "On a product page, which of these should NOT be stored in state?",
            options: [
              { id: "a", text: "The selected size" },
              { id: "b", text: "The quantity the user picked" },
              { id: "c", text: "The total price (quantity × price)" },
              { id: "d", text: "Whether the size guide is open" },
            ],
            correctOptionId: "c",
            explanation:
              "The total can be calculated from quantity and price every render. Storing it creates a second copy that can fall out of sync.",
          },
        },

        {
          id: "l_2",
          slug: "usestate-in-practice",
          title: "useState in practice",
          durationSec: 720,
          blocks: [
            {
              type: "video",
              url: "https://cdn.example.com/react-state/l_2.m3u8",
              poster: "https://picsum.photos/seed/usestate/1280/720",
              durationSec: 412,
              captions: [
                { lang: "en", label: "English", url: "/captions/l_2.en.vtt" },
                { lang: "ar", label: "العربية", url: "/captions/l_2.ar.vtt" },
              ],
              chapters: [
                { atSec: 0, title: "Intro" },
                { atSec: 48, title: "Declaring state" },
                { atSec: 165, title: "Updating state" },
                { atSec: 290, title: "The stale value trap" },
              ],
            },
            {
              type: "text",
              body: "Here's the counter from the video. `useState` gives you the current value and a function to change it.",
            },
            {
              type: "callout",
              variant: "warning",
              title: "The stale value trap",
              body: "If you call `setCount(count + 1)` three times in one click, the count only goes up by 1. Each call sees the same old `count`. Use the updater form instead: `setCount(c => c + 1)`.",
            },
          ],
          resources: [
            {
              id: "r_1",
              title: "Starter code",
              type: "zip",
              url: "/files/l_2-starter.zip",
              sizeKb: 48,
            },
          ],
          checkpoint: {
            question:
              "A button runs setCount(count + 1) three times in one click. If count starts at 0, what is it after the click?",
            options: [
              { id: "a", text: "0" },
              { id: "b", text: "1" },
              { id: "c", text: "3" },
            ],
            correctOptionId: "b",
            explanation:
              "All three calls read the same count (0) from that render, so each one sets it to 1. Use setCount(c => c + 1) to get 3.",
          },
        },

        {
          id: "l_3",
          slug: "lifting-state-up",
          title: "Lifting state up",
          durationSec: 540,
          blocks: [
            {
              type: "text",
              body: "Sometimes two components need the same piece of state. A search box and a results list both need to know the current search term.\n\nThe fix is to move the state to their closest shared parent, then pass it down as props. This is called **lifting state up**.",
            },
            {
              type: "text",
              body: "Now there's one source of truth. The box and the list can never disagree about what the user searched for.",
            },
          ],
          checkpoint: {
            question:
              "Two sibling components need the same state. Where should it live?",
            options: [
              {
                id: "a",
                text: "In both components, kept in sync with useEffect",
              },
              { id: "b", text: "In their closest shared parent" },
              { id: "c", text: "In a global variable" },
            ],
            correctOptionId: "b",
            explanation:
              "Keeping two copies in sync is fragile. One copy in the shared parent, passed down as props, is the single source of truth.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────── Section 2
    
    {
      id: "s_2",
      title: "Sharing state with Context",
      lessons: [
        {
          id: "l_4",
          slug: "prop-drilling",
          title: "The prop drilling problem",
          durationSec: 300,
          blocks: [
            {
              type: "video",
              url: "https://cdn.example.com/react-state/l_4.m3u8",
              poster: "https://picsum.photos/seed/prop-drilling/1280/720",
              durationSec: 284,
              captions: [
                { lang: "en", label: "English", url: "/captions/l_4.en.vtt" },
              ],
              chapters: [],
            },
          ],
          checkpoint: {
            question: "What is prop drilling?",
            options: [
              {
                id: "a",
                text: "Passing props through components that don't use them, just to reach a deeper child",
              },
              { id: "b", text: "Validating props with PropTypes" },
              { id: "c", text: "Changing a prop inside a child component" },
            ],
            correctOptionId: "a",
            explanation:
              "When the middle components only forward a prop, every one of them breaks if that prop changes. That's the pain Context solves.",
          },
        },

        {
          id: "l_5",
          slug: "building-a-theme-context",
          title: "Building a theme context",
          durationSec: 900,
          blocks: [
            {
              type: "text",
              body: "Context lets any component read a value without it being passed through every level. We'll build a light and dark theme switch, one of the most common uses.",
            },
            {
              type: "text",
              body: "Any component inside `ThemeProvider` can now call `useTheme()`. The header's toggle button and the footer's logo both read the same value, with no props in between.",
            },
            {
              type: "callout",
              variant: "info",
              title: "When not to use Context",
              body: "Every component that reads a context re-renders when its value changes. Context is great for values that change rarely (theme, language, the signed-in user). For fast-changing data like a form, keep state local.",
            },
          ],
          resources: [
            {
              id: "r_2",
              title: "Finished code",
              type: "zip",
              url: "/files/l_5-final.zip",
              sizeKb: 52,
            },
            {
              id: "r_3",
              title: "React docs: useContext",
              type: "link",
              url: "https://react.dev/reference/react/useContext",
            },
          ],
          checkpoint: {
            question: "Which value is the best fit for React Context?",
            options: [
              {
                id: "a",
                text: "The text in a search input, updated on every keystroke",
              },
              { id: "b", text: "The app's language (English or Arabic)" },
              { id: "c", text: "A counter inside one button" },
            ],
            correctOptionId: "b",
            explanation:
              "Language changes rarely and many components need it. Fast-changing values in Context make every reader re-render on each change.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────── Section 3
    {
      id: "s_3",
      title: "Redux Toolkit",
      lessons: [
        {
          id: "l_6",
          slug: "when-you-need-redux",
          title: "When do you actually need Redux?",
          durationSec: 480,
          blocks: [
            {
              type: "text",
              body: "Redux is a tool for one specific problem: lots of state that many parts of the app read and change, where you need to track exactly what changed and why.\n\nMost apps don't start there. Reach for Redux when you notice these signs:\n\n- Many unrelated components update the same data\n- State changes are hard to trace when bugs happen\n- Context is causing performance problems",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Rule of thumb",
              body: "Start with useState. Lift it when siblings need it. Use Context when drilling gets painful. Bring in Redux when Context isn't enough.",
            },
          ],
          checkpoint: {
            question:
              "You're building a small blog with a theme toggle. What should you use for the theme?",
            options: [
              { id: "a", text: "Redux Toolkit" },
              { id: "b", text: "Context" },
              { id: "c", text: "A new state library" },
            ],
            correctOptionId: "b",
            explanation:
              "A theme is one rarely-changing value. Context handles it with far less setup than Redux.",
          },
        },

        {
          id: "l_7",
          slug: "your-first-slice",
          title: "Your first slice",
          durationSec: 1080,
          blocks: [
            {
              type: "text",
              body: "In Redux Toolkit, a **slice** holds one feature's state and the actions that change it. Watch how we build the cart slice, then read through the code below.",
            },
            {
              type: "video",
              url: "https://cdn.example.com/react-state/l_7.m3u8",
              poster: "https://picsum.photos/seed/redux-slice/1280/720",
              durationSec: 618,
              captions: [
                { lang: "en", label: "English", url: "/captions/l_7.en.vtt" },
                { lang: "ar", label: "العربية", url: "/captions/l_7.ar.vtt" },
              ],
              chapters: [
                { atSec: 0, title: "What's a slice?" },
                { atSec: 140, title: "createSlice" },
                { atSec: 330, title: "Connecting the store" },
                { atSec: 495, title: "Reading state with useSelector" },
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Wait, isn't mutating state forbidden?",
              body: "Normally, yes. Redux Toolkit uses a library called Immer behind the scenes, so `state.items.push()` safely creates a new copy for you.",
            },
          ],
          checkpoint: {
            question:
              "Why is state.items.push() allowed inside a Redux Toolkit reducer?",
            options: [
              { id: "a", text: "Redux doesn't care about mutation" },
              {
                id: "b",
                text: "Immer turns the mutation into a safe, immutable update",
              },
              { id: "c", text: "It only works in development mode" },
            ],
            correctOptionId: "b",
            explanation:
              "Immer records your changes on a draft and produces a new state object, so the original is never actually mutated.",
          },
        },

        {
          id: "l_8",
          slug: "project-refactor-the-cart",
          title: "Project: refactor the shopping cart",
          durationSec: 3600,
          isProject: true,
          blocks: [
            {
              type: "text",
              body: "Time to put it together. The starter app passes cart data through five levels of props. Your job is to move it into a Redux Toolkit slice.\n\n**Your app should:**\n\n- Add and remove items from any product card\n- Show the item count in the header\n- Keep the cart total correct (remember: derive it, don't store it)",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Stuck?",
              body: "Re-watch the 'Connecting the store' chapter in the previous lesson, or ask in the course discussion.",
            },
          ],
          resources: [
            {
              id: "r_4",
              title: "Project starter",
              type: "zip",
              url: "/files/l_8-starter.zip",
              sizeKb: 210,
            },
          ],
          submission: {
            type: "link",
            label: "Paste your GitHub or CodeSandbox link",
          },
          exam: {
            title: "Redux Toolkit project exam",
            subtitle: "Answer 3 questions on slices, reducers and selectors.",
            timeLimitSec: 300, // 5 min while building; raise to 1800 later
            passPercent: 70,
            maxViolations: 3,
            questions: [
              {
                id: "q1",
                text: "What does a Redux Toolkit slice contain?",
                options: [
                  { id: "a", text: "Only the initial state" },
                  { id: "b", text: "The state, reducers and generated actions" },
                  { id: "c", text: "Only the UI components" },
                ],
                correctOptionId: "b",
              },
              {
                id: "q2",
                text: "Why can you write state.items.push(item) inside a reducer?",
                options: [
                  { id: "a", text: "Redux allows direct mutation" },
                  { id: "b", text: "Immer turns it into a safe immutable update" },
                  { id: "c", text: "It only works in development mode" },
                ],
                correctOptionId: "b",
              },
              {
                id: "q3",
                text: "Which hook reads a value from the Redux store?",
                options: [
                  { id: "a", text: "useSelector" },
                  { id: "b", text: "useEffect" },
                  { id: "c", text: "useRef" },
                ],
                correctOptionId: "a",
              },
            ],
          },
          checkpoint: {
            question:
              "Your cart shows 3 items at $10 each. Where should the $30 total come from?",
            options: [
              {
                id: "a",
                text: "A total field in the slice, updated in every reducer",
              },
              {
                id: "b",
                text: "Calculated from the items when it's displayed",
              },
              { id: "c", text: "Saved in localStorage" },
            ],
            correctOptionId: "b",
            explanation:
              "Deriving the total from items means it can never disagree with what's actually in the cart.",
          },
        },
      ],
    },
  ],
};

// Static rules shown on the exam start screen. The same for every exam, so they
// live outside the course. Use {placeholders} filled in from the exam object:
//   {timeLimitMin}, {maxViolations}, {passPercent}
export const EXAM_RULES = {
  title: "Before you begin",
  subtitle: "Read these rules carefully. Once you start, the timer cannot be paused.",
  rules: [
    {
      id: "timer",
      text: "You have {timeLimitMin} minutes. The timer keeps running even if you refresh or close the page.",
    },
    {
      id: "one-attempt-window",
      text: "When time runs out, your answers are submitted automatically.",
    },
    {
      id: "stay",
      text: "Stay on this tab. Switching tabs or windows counts as a violation.",
    },
    {
      id: "violations",
      text: "After {maxViolations} violations, your exam is submitted automatically.",
    },
    {
      id: "fullscreen",
      text: "The exam runs in fullscreen. Leaving fullscreen counts as a violation.",
    },
    {
      id: "copy",
      text: "Copying, pasting and right-click are disabled.",
    },
    {
      id: "pass",
      text: "You need at least {passPercent}% to pass.",
    },
  ],
  agreeLabel: "I have read the rules and I am ready to start.",
  startLabel: "Start attempt",
};

// One student's progress in this course.
export const PROGRESS = {
  userId: "u_55",
  courseId: "c_101",
  enrolledAt: "2026-10-12T09:00:00+03:00",
  lastLessonId: "l_8",
  lastActivityAt: "2026-10-31T20:14:00+02:00",
  lessons: {
    l_1: {
      status: "completed",
      completedAt: "2026-10-12T09:18:00+03:00",
      checkpoint: { selectedOptionId: "c", isCorrect: true, attempts: 1 },
    },
    l_2: {
      status: "completed",
      completedAt: "2026-10-14T21:40:00+03:00",
      videoPositionSec: 412,
      checkpoint: { selectedOptionId: "b", isCorrect: true, attempts: 2 },
    },
    l_3: {
      status: "completed",
      completedAt: "2026-10-20T19:05:00+03:00",
      checkpoint: { selectedOptionId: "b", isCorrect: true, attempts: 1 },
    },
    l_4: {
      status: "completed",
      completedAt: "2026-10-27T18:30:00+03:00",
      videoPositionSec: 284,
      checkpoint: { selectedOptionId: "a", isCorrect: true, attempts: 1 },
    },
    l_5: {
      status: "in_progress",
      scrollPct: 60, // how far they read, so the player can scroll back to it
    },
  },
  notes: [
    {
      id: "n_1",
      lessonId: "l_2",
      atSec: 290,
      text: "Stale value trap: always use the updater form inside loops",
      createdAt: "2026-10-14T21:32:00+03:00",
    },
  ],
};
