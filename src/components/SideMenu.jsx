import "../styles/components/sideMenu.css";
import {
  MdHelpOutline,
  MdOutlineAssignment,
  MdOutlineDashboard,
  MdOutlineExplore,
  MdOutlineForum,
  MdOutlineGrade,
  MdOutlineQuiz,
  MdOutlineSchool,
  MdOutlineSettings,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { PiBookOpenText } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const SideMenu = () => {
  // const [count, setCount] = useState(0);

  return (
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
    </>
  );
};

export default SideMenu;
