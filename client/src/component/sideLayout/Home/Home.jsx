import LandingPage from "./LandingPage";
import Features from "./Features";
import TopCourses from "./TopCourses";
import ContactUs from "./ContactUs";
import { Helmet } from "react-helmet";
import Stats from "./Stats";
import Content from "./Content";

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
