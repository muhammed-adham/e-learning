import React from "react";
import Overview from "./Overview";
import NavTabs from "../components/NavTabs";
import { Outlet } from "react-router";
import NotifacationCenter from "../components/NotifacationCenter";
import CardCourses from "../components/CardCourses";

const Dashboard = () => {
  const user = {
    name: "Vdham",
    email: "",
  };

  const RECOMMENDED_COURSES = [
    {
      id: "c_101",
      slug: "react-state-management",
      title: "React State Management",
      description:
        "Learn when to use local state, Context, Redux, and Zustand. You'll refactor a messy app into a clean, predictable state structure.",
      category: "Frontend",
      level: "intermediate",
      thumbnail: "https://picsum.photos/seed/react-state/400/225",
      instructor: {
        name: "Sara Mahmoud",
        avatar: "https://i.pravatar.cc/80?img=47",
      },
      durationHours: 90,
      lessonsCount: 32,
      projectsCount: 2,
      rating: 4.8,
      reviewsCount: 1240,
      enrolledCount: 8650,
      isFree: false,
      price: 29,
      language: "English",
      tags: ["React", "Redux", "Zustand"],
      startDate: "2026-11-15T10:00:00+02:00",
      capacity: 30,
      seatsTaken: 26,
      enrollmentDeadline: "2026-11-10T23:59:59+02:00",
      matchScore: 94,
      reason: {
        type: "continues_course",
        text: "Next step after React Basics",
      },
    },
    {
      id: "c_102",
      slug: "javascript-async-deep-dive",
      title: "Async JavaScript Deep Dive",
      description:
        "Understand callbacks, promises, and async/await from the inside out. Learn to handle errors, run tasks in parallel, and fetch data reliably.",
      category: "Programming",
      level: "intermediate",
      thumbnail: "https://picsum.photos/seed/async-js/400/225",
      instructor: {
        name: "Omar Khaled",
        avatar: "https://i.pravatar.cc/80?img=12",
      },
      durationHours: 60,
      lessonsCount: 24,
      projectsCount: 1,
      rating: 4.7,
      reviewsCount: 860,
      enrolledCount: 5420,
      isFree: true,
      price: 0,
      language: "English",
      tags: ["JavaScript", "Promises", "Async/Await"],
      startDate: "2026-11-04T10:00:00+02:00",
      capacity: 40,
      seatsTaken: 12,
      enrollmentDeadline: "2026-11-18T23:59:59+02:00",
      matchScore: 88,
      reason: {
        type: "skill_gap",
        text: "Strengthens a concept you struggled with",
      },
    },
    {
      id: "c_103",
      slug: "ui-design-fundamentals",
      title: "UI Design Fundamentals",
      description:
        "Master layout, spacing, typography, and color in Figma. Design three real screens and learn to explain your design decisions.",
      category: "Design",
      level: "beginner",
      thumbnail: "https://picsum.photos/seed/ui-design/400/225",
      instructor: {
        name: "Nour Hassan",
        avatar: "https://i.pravatar.cc/80?img=32",
      },
      durationHours: 50,
      lessonsCount: 18,
      projectsCount: 3,
      rating: 4.9,
      reviewsCount: 2310,
      enrolledCount: 15200,
      isFree: false,
      price: 19,
      language: "Arabic",
      tags: ["Figma", "Layout", "Typography"],
      startDate: "2026-11-08T10:00:00+02:00",
      capacity: 25,
      seatsTaken: 25,
      enrollmentDeadline: "2026-11-05T23:59:59+02:00",
      matchScore: 81,
      reason: { type: "interest", text: "Matches your interest in Design" },
    },
    {
      id: "c_104",
      slug: "typescript-for-react-devs",
      title: "TypeScript for React Developers",
      description:
        "Add type safety to your React apps. Type props, state, hooks, and API responses, and catch bugs before they reach the browser.",
      category: "Frontend",
      level: "intermediate",
      thumbnail: "https://picsum.photos/seed/typescript/400/225",
      instructor: {
        name: "Youssef Adel",
        avatar: "https://i.pravatar.cc/80?img=15",
      },
      durationHours: 70,
      lessonsCount: 28,
      projectsCount: 2,
      rating: 4.6,
      reviewsCount: 540,
      enrolledCount: 3980,
      isFree: false,
      price: 25,
      language: "English",
      tags: ["TypeScript", "React", "Types"],
      startDate: "2026-12-01T10:00:00+02:00",
      capacity: 35,
      seatsTaken: 18,
      enrollmentDeadline: "2026-10-25T23:59:59+02:00",
      matchScore: 79,
      reason: {
        type: "popular_with_peers",
        text: "Popular with learners on your path",
      },
    },
    {
      id: "c_105",
      slug: "git-and-github-essentials",
      title: "Git & GitHub Essentials",
      description:
        "Track your code with Git and collaborate on GitHub. Learn branching, merging, pull requests, and how to fix common mistakes.",
      category: "Tools",
      level: "beginner",
      thumbnail: "https://picsum.photos/seed/git-github/400/225",
      instructor: {
        name: "Mona Fathy",
        avatar: "https://i.pravatar.cc/80?img=45",
      },
      durationHours: 30,
      lessonsCount: 12,
      projectsCount: 1,
      rating: 4.8,
      reviewsCount: 3100,
      enrolledCount: 22400,
      isFree: true,
      price: 0,
      language: "Arabic",
      tags: ["Git", "GitHub", "Version control"],
      startDate: "2026-10-27T10:00:00+03:00",
      capacity: 50,
      seatsTaken: 31,
      enrollmentDeadline: "2026-10-20T23:59:59+03:00",
      matchScore: 72,
      reason: { type: "quick_win", text: "Short course, finish it this week" },
    },
    {
      id: "c_106",
      slug: "build-a-portfolio-site",
      title: "Build a Portfolio Website",
      description:
        "Build and publish a responsive portfolio from scratch with HTML and CSS. Finish with a live site you can share with employers.",
      category: "Projects",
      level: "beginner",
      thumbnail: "https://picsum.photos/seed/portfolio/400/225",
      instructor: {
        name: "Karim Samir",
        avatar: "https://i.pravatar.cc/80?img=8",
      },
      durationHours: 40,
      lessonsCount: 14,
      projectsCount: 1,
      rating: 4.7,
      reviewsCount: 970,
      enrolledCount: 6750,
      isFree: false,
      price: 15,
      language: "English",
      tags: ["HTML", "CSS", "Portfolio"],
      startDate: "2026-11-29T10:00:00+02:00",
      capacity: 20,
      seatsTaken: 17,
      enrollmentDeadline: "2026-11-24T23:59:59+02:00",
      matchScore: 68,
      reason: { type: "goal", text: "Supports your goal: get a frontend job" },
    },
  ];
  return (
    <>
      <div>
        <h5>Welcome back, {user.name}!</h5>
      </div>
      <NotifacationCenter />
      <NavTabs />
      {/* <Overview /> */}
      <Outlet />
      {/* -----------Recommended Section----------- */}
      <h6 className="section-header">Recommended Courses</h6>
      <div className="recommended-cards-container container-inline grid grid-cols-4 gap-4">
        {RECOMMENDED_COURSES.map((el, idx) => (
          <CardCourses key={idx} {...el} />
        )).slice(0, 4)}
      </div>
    </>
  );
};

export default Dashboard;
