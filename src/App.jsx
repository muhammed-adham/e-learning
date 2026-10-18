import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { GoHome } from "react-icons/go";
import { MdHelpOutline, MdOutlineAssignment, MdOutlineDashboard, MdOutlineExplore, MdOutlineForum, MdOutlineGrade, MdOutlineGroups, MdOutlinePostAdd, MdOutlineQuiz, MdOutlineSchool, MdOutlineSettings, MdOutlineWorkspacePremium } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { AiOutlineNotification } from "react-icons/ai";
import { LuNotebookPen } from "react-icons/lu";
import { FaPowerOff, FaRegCalendarCheck } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { PiBookOpenText } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const App = () => {
  // const [count, setCount] = useState(0);

  return (
    /*     <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </> */

    /*     <>
      <nav className="flex flex-col items-start gap-5 px-4 py-2 bg-white/10 shadow-md backdrop-blur-md py-8">
        <h2>E-Learning</h2>

        <div className="stroke">`</div>

        <section
          id="nav-profile"
          className="flex items-center justify-start gap-4 w-60"
        >
          <img
            src="./src/assets/kwai.svg"
            className="w-10 h-10 rounded-full"
            alt="Profile Picture"
          />
          <div className="profile-link text-start">
            <p>Adham.aoi</p>
            <p className="text-xs text-zinc-500">My Account</p>
          </div>
        </section>

        <div className="stroke">`</div>

        <menu className="flex flex-col gap-2 items-start justify-start w-full text-sm text-zinc-500 capitalize">
          <h3 className="text-xs font-thin text-white">Menu</h3>
          <li className="flex items-center gap-2">
            <GoHome />
            <a href="#">home</a>
          </li>
          <li className="flex items-center gap-2">
            <MdOutlinePostAdd />
            <a href="#">post</a>
          </li>
          <li className="flex items-center gap-2">
            <HiOutlineMail />
            <a href="#">messages</a>
          </li>
          <li className="flex items-center gap-2">
            <AiOutlineNotification />
            <a href="#">notifications</a>
          </li>
          <li className="flex items-center gap-2">
            <LiaUserFriendsSolid />
            <a href="#">friends</a>
          </li>
          <li className="flex items-center gap-2">
            <MdOutlineGroups />
            <a href="#">groups</a>
          </li>

          <div className="stroke">`</div>

          <li className="flex items-center gap-2">
            <SiGitbook />
            <a href="#">curriculum</a>
          </li>
          <li className="flex items-center gap-2">
            <LuNotebookPen />
            <a href="#">assigments</a>
          </li>
          <li className="flex items-center gap-2">
            <TbReport />
            <a href="#">overview</a>
          </li>
          <li className="flex items-center gap-2">
            <FaRegCalendarCheck />
            <a href="#">schedule</a>
          </li>

          <div className="stroke">`</div>

          <li className="flex items-center gap-2">
            <FaPowerOff />
            <a href="#">log out</a>
          </li>
        </menu>
      </nav>
    </> */

    <>
      <nav className="sidebar">
        <div className="logo">
          <MdOutlineSchool />
          <span className="label">AOI - LMS</span>
        </div>

        <div className="nav">
          <a href="#" className="active">
            <MdOutlineDashboard />
            <span className="label">Dashboard</span>
          </a>
          <a href="#">
            <PiBookOpenText />
            <span className="label">My Courses</span>
          </a>
          <a href="#" className="desktop-only">
            <MdOutlineExplore />
            <span className="label">Catalog</span>
          </a>
          <a href="#">
            <MdOutlineAssignment />
            <span className="label">Assignments</span>
          </a>
          <a href="#" className="desktop-only">
            <MdOutlineQuiz />
            <span className="label">Quizzes</span>
          </a>
          <a href="#" className="desktop-only">
            <MdOutlineGrade />
            <span className="label">Grades</span>
          </a>
          <a href="#">
            <FaRegCalendarAlt />
            <span className="label">Calendar</span>
          </a>

          <hr />
          <div className="section-title">Community</div>
          <a href="#">
            <MdOutlineForum />
            <span className="label">Discussions</span>
          </a>
          <a href="#" className="desktop-only">
            <FiMail />
            <span className="label">Messages</span>
          </a>
          <a href="#" className="desktop-only">
            <MdOutlineWorkspacePremium />
            <span className="label">Certificates</span>
          </a>

          <hr />
          <a href="#" className="desktop-only">
            <MdOutlineSettings />
            <span className="label">Settings</span>
          </a>
          <a href="#" className="desktop-only">
            <MdHelpOutline />
            <span className="label">Help</span>
          </a>
        </div>
      </nav>

      <main>
        <h1 className="text-start">Dashboard</h1>
        <p className="mt-4 text-sm text-zinc-500 text-start">
          Hover over the sidebar on the left to expand it. Move the mouse away
          and it collapses back to icons.
        </p>
      </main>
    </>
  );
};

export default App;
