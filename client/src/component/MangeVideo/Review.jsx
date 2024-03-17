import React, { useState } from "react";
import axios from "axios";

function Review({ courseDetails, userId }) {
  console.log(courseDetails);
  const courseId = courseDetails && courseDetails._id;

  let doneReview = false;
  let initialRating = 0;
  let initialComment = "";

  if (courseDetails && courseDetails.review) {
    for (let i = 0; i < courseDetails.review.length; i++) {
        const review = courseDetails.review[i];
        if (review.createBy === userId) {
            doneReview = true;
            initialRating = review.star;
            initialComment = review.comment;
            break;
        }
    }
}
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  
  

  console.log(
    doneReview + " ",
    initialRating,
    " ",
    courseDetails.review,
    " ",
    userId
  );
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
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
      console.log(response.data);
      doneReview = true;
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
                {[1, 2, 3, 4, 5].map((value) => (
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
                ))}
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
            <div className="flex items-center gap-x-2 w-full justify-center">
              {[...Array(rating)].map((_, index) => (
                <svg
                  key={index}
                  width="36"
                  height="36"
                  className=" text-yellow-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0c2.8 0 5 2.2 5 5 0 2.5-2.8 7-5 10-2.2-3-5-7.5-5-10 0-2.8 2.2-5 5-5zm0 14.2l3.8 2.8-1.5-4.6 4.1-3.1-5.1-.1-1.3-5-1.3 5-5.1.1 4.1 3.1-1.5 4.6 3.8-2.8z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-gray-800 text-xl font-semibold p-2 text-justify">{comment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
