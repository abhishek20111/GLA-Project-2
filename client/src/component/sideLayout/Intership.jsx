import { useState } from "react";
import backend from "../../assets/backend.gif";
import { Zoom, Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Internship = () => {
  const isLogin = useSelector((state) => state.userData.isLogin);

  const sections = [
    {
      title: "Web Development (Front-End)",
      content:
        "Learn the art of creating stunning user interfaces and engaging user experiences using HTML, CSS, and JavaScript.",
      src: "https://media.licdn.com/dms/image/D4D12AQE1ioPOFoNVCw/article-cover_image-shrink_600_2000/0/1679083748046?e=2147483647&v=beta&t=6pAfb6fO3GI0uXsLmzKqlZNtlv8FZrswVQODH-prBvY",
      link: "https://forms.gle/6eFXQrGdzKHch1bD7",
    },
    {
      title: "App Development (Front-End)",
      content:
        "Master the skills to build responsive and interactive mobile applications for iOS and Android platforms using React Native.",
      src: "https://www.existus.com/assets/images/image-mbl-development.gif",
      link: "https://forms.gle/dJSwE2f4oBYyYusA9",
    },
    {
      title: "Web Development (Back-End)",
      content:
        "Delve into the world of server-side programming and database management to create robust and scalable web applications.",
      src: "https://globaleducation.s3.ap-south-1.amazonaws.com/globaledu/gif/backend-dev.gif",
      link: "https://forms.gle/3MJR7AnhnvN7etWCA",
    },
    {
      title: "App Development (Back-End)",
      content:
        "Explore the server-side technologies and APIs required to support and power mobile applications on various platforms.",
      src: "https://www.vkreate.in/storage/services_image/2019-10-01-13-58-44-5d935b94dd6b5-app-development.gif",
      link: "https://forms.gle/gftSwYf5F9gsddk18",
    },
    {
      title: "Web Development (Full-Stack)",
      content:
        "Combine the skills of front-end and back-end development to become a versatile full-stack web developer.",
      src: "https://www.wingstechsolutions.com/wp-content/uploads/2022/03/full-stack-development.gif",
      link: "https://forms.gle/ec9GHrn9kevej5XV7",
    },
    {
      title: "App Development (Full-Stack)",
      content:
        "Become proficient in both front-end and back-end technologies to develop end-to-end solutions for mobile applications.",
      src: "https://media.tenor.com/2WarV9tQYVcAAAAC/mobile-app-architecture-mobile-app-development.gif",
      link: "https://forms.gle/EP95DNrC8BTWwefo9",
    },
    {
      title: "Artificial Intelligence / Machine Learning",
      content:
        "Immerse yourself in the world of AI and ML algorithms, and gain insights into building smart and predictive applications.",
      src: "https://jnnce.ac.in/jnndemo/aiml.gif",
      link: "https://forms.gle/zHCKr5N1ZZo85BWr6",
    },
    {
      title: "Database Management",
      content:
        "Learn the fundamentals of database design, querying, and management for organizing and analyzing large datasets.",
      src: "https://www.connecting-software.com/wp-content/uploads/2018/04/how-it-works-opt.gif",
      link: "https://forms.gle/i686QtC6HmRRWJkR6",
    },
    {
      title: "Java (Data Structures and Algorithms)",
      content:
        "Get hands-on experience in implementing data structures and algorithms using the Java programming language.",
      src: "https://files.codingninjas.in/article_images/java-developers-application-settings-1-1660983825.jpg",
      link: "https://forms.gle/zEL8jX7WpaEyXe3m6",
    },
    {
      title: "Java (Development)",
      content:
        "Develop expertise in Java programming to create powerful applications for various domains and industries.",
      src: "https://i.makeagif.com/media/11-29-2017/DW588u.gif",
      link: "https://forms.gle/AoWDuQa7L2SF12yF7",
    },
    {
      title: "C Programming",
      content:
        "Master the fundamentals of C programming and algorithms to build efficient and scalable software applications.",
      src: "https://res.cloudinary.com/practicaldev/image/fetch/s--xVCufn18--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5nnkrcc3kixypm642opg.gif",
      link: "https://forms.gle/NjXY7Ersf4Rki5jZA",
    },
    {
      title: "Python Programming",
      content:
        "Explore the versatility of Python and its applications in data analysis, automation, and web development.",
      src: "https://media.giphy.com/media/coxQHKASG60HrHtvkt/giphy.gif",
      link: "https://forms.gle/NjXY7Ersf4Rki5jZA",
    },
    {
      title: "Python (Development)",
      content:
        "Dive deeper into Python development, learning to build robust applications and web services using popular frameworks.",
      src: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/04/animation--2--1.gif",
      link: "https://forms.gle/1irK1bwX8dhgmQwo7",
    },
    {
      title: "Digital Marketing",
      content:
        "Gain expertise in digital marketing strategies, social media management, SEO, and online advertising.",
      src: "https://media.licdn.com/dms/image/C4E12AQFva6uNkZrDbQ/article-cover_image-shrink_600_2000/0/1592585405954?e=1695859200&v=beta&t=o_-GpwUhNC9mqGTxH6Ij9zmqGjyk9RJYJZo_QgElsys",
      link: "https://forms.gle/Dk49tqxtcYGXZeoQ7",
    },
    {
      title: "Human Resources (HR)",
      content:
        "Learn essential HR skills, such as talent acquisition, performance management, and organizational development.",
      src: "https://i.gifer.com/7eK3.gif",
      link: "https://forms.gle/erUbtxk6cThJSNJ56",
    },
    {
      title: "3D Modelling and Designing",
      content:
        "Unleash your creativity with 3D modelling tools and design captivating visual elements for various applications.",
      src: "https://3dprint.com/wp-content/uploads/2016/12/VECTARY_cat.gif",
      link: "https://forms.gle/BU6AMtYJruKhZhLx8",
    },
    {
      title: "Graphic Designing",
      content:
        "Get creative with 2D modelling tools and softwares for various niches.",
      src: "https://media.itsnicethat.com/original_images/yiting-nan-YN_SVA_Motion_Screening_2022_02.gif",
      link: "https://forms.gle/YZqWzTbp8Hvko9Hu7",
    },
  ];

  return (
    <Fade>
      <Helmet>
        <title>LearnUp | Intership Page</title>
        <meta name="description" content="LearnUp Intership Page" />
        <meta
          name="keywords"
          content="LearnUp, intership, LearnUp, Home, Study, Contest, Education, Learning platform, course, buy courses, courses"
        />
      </Helmet>
      <div className="flex justify-center my-5 w-full">
        <div className="flex flex-wrap min-h-screen m-2">
          <Zoom cascade damping={0.1} triggerOnce={true}>
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex justify-center max-w-[400px] m-12"
              >
                <div
                  className={`duration-500 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-800 w-full cursor-pointer transition-all transform ease-in-out flex flex-col  hover:translate-y-2 hover:my-2 hover:translate-x-2 pb-3`}
                >
                  <img
                    alt="Placeholder"
                    className="block h-[300px] object-cover overflow-clipped rounded-md"
                    src={section.src}
                  ></img>
                  <h2 className="text-2xl mx-4 font-bold mt-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 mx-4 py-2">{section.content}</p>
                  <div className="flex justify-center mt-4">
                    {isLogin ? (
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="rounded-full py-2 px-2 text-blue-700 font-semibold border-blue-700 transition-all duration-500 border-2 text-lg bg-white hover:bg-blue-700 hover:text-white w-[150px]">
                          Apply Now
                        </button>
                      </a>
                    ) : (
                      <Link
                        to={"/signin"}
                        className="flex justify-center rounded-full py-2 px-2 text-blue-700 font-semibold border-blue-700 transition-all duration-500 border-2 text-lg bg-white hover:bg-blue-700 hover:text-white w-[150px]"
                      >
                        <p>Sign In</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Zoom>
        </div>
      </div>
    </Fade>
  );
};

export default Internship;
