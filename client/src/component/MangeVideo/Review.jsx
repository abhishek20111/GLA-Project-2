import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Star from "../../assets/logo/star.png";

function Review({ courseDetails, userId }) {
  console.log(courseDetails, userId);
  const notify1 = (info) => toast.success(info);
  const courseId = courseDetails && courseDetails._id;

  const [doneReview, setDoneReview] = useState(false);

  useEffect(() => {
    if (courseDetails && courseDetails.review.length > 0) {
      for (let i = 0; i < courseDetails.review.length; i++) {
        const review = courseDetails.review[i];
        if (review.createBy === userId) {
          setDoneReview(true);
          console.log(review.star, review.comment);
          setRating(review.star);
          setComment(review.comment);
          break;
        }
      }
    }
  }, [courseDetails, userId]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/cource/setReview/${courseId}`,
        {
          star: rating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify1("Thanks for Review...");
      setDoneReview(true); // Update doneReview state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-[100vw] mt-3">
      <div className="ring-2 w-fit p-5 flex flex-col mx-auto bg-white gap-y-8">
        <h1 className="underline justify-center flex w-full text-xl text-gray-300 font-bold mt-11">
          Review
        </h1>
        {!doneReview ? (
          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full flex justify-center">
              <div className="flex gap-x-1 flex-row-reverse justify-end items-center">
                {[1, 2, 3, 4, 5]
                  .map((value) => (
                    <React.Fragment key={value}>
                      <input
                        id={`hs-ratings-readonly-${value}`}
                        type="radio"
                        className="peer h-[2rem] -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                        name="hs-ratings-readonly"
                        value={value}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                      />
                      <label
                        htmlFor={`hs-ratings-readonly-${value}`}
                        className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                      >
                        <svg
                          className="flex-shrink-0 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </label>
                    </React.Fragment>
                  ))
                  .reverse()}
              </div>
            </div>
            <div>
              <textarea
                rows={3}
                cols={40}
                placeholder="Type Your Review Here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              className="bg-indigo-700 rounded hover:bg-indigo-600 text-white font-medium px-6 py-3"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-2 w-full  justify-center">
              {[...Array(rating)].map((_, index) => (
                <img src={Star} className="h-5" alt="Star" srcset="" />
              ))}
            </div>
            <div>
              <p className="text-gray-800 text-xl font-semibold p-2 text-justify">
                {comment}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full mt-3">
        <div className="  p-5  bg-white gap-y-8">
          <h1 className="underline m-auto justify-center flex w-full text-xl text-gray-300 font-bold mt-11">
            Some Reviews
          </h1>
          <div className="flex flex-wrap gap-7  mt-12">
            {courseDetails &&
              courseDetails.review.map((review, index) => {
                if (review.createBy._id !== userId) {
                  return (
                    <div
                      key={index}
                      className="ring-2 p-4  sm:w-[20%]  flex flex-col gap-y-3 "
                    >
                      <div className="flex gap-x-5 items-center">
                        <img
                          src={
                            review.createBy.profileImage ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlPViCqVyGRxdQtmHT-5rBlQoa1XJsMwkOdQ3A-hEWfkYMRLG-S-LRYCLcGteHqbSF4Kk&usqp=CAU"
                          }
                          className=" h-12 w-12 rounded-full"
                          alt="Profile"
                        />
                        <span className="text-xl font-semibold text-gray-800">
                          {review.createBy.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        {[...Array(review.star)].map((_, index) => (
                          <img
                            src={Star}
                            className="h-5"
                            alt="Start"
                            srcset=""
                          />
                        ))}
                      </div>
                      <p className="text-gray-800 text-lg font-semibold">
                        {review.comment}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
