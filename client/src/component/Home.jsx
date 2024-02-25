import LandingPage from "./sideLayout/LandingPage";
import Features from "./Features";
import TopCourses from "./cource/TopCourses";
import ContactUs from "./sideLayout/ContactUs";
import { Helmet } from "react-helmet";
import Stats from "./sideLayout/Stats";
import Content from "./sideLayout/Content";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>LearnUp | Home Page</title>
        <meta name="description" content="LearnUp Home Page" />
        <meta
          name="keywords"
          content="LearnUp, LearnUp, Home, Study, Contest, Education, Learning platform, course, buy courses, courses, intership, web development, app development"
        />
      </Helmet>
      <LandingPage />
      <Features />
      <TopCourses />
      <Content />
      <ContactUs />
      <Stats />
    </div>
  );
}
