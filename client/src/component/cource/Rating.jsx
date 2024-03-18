import React from 'react';
import Star from '../../assets/logo/star.png'; 
import NotStar from '../../assets/logo/Notstar.png'; 

function Rating({ review }) {
  // Calculate the average review rating
  let totalStars = 0;
  let averageRating = 0;

  if (review.length > 0) {
    review.forEach(item => {
      totalStars += item.star;
    });
    averageRating = totalStars / review.length;
  }

  return (
    <div className='w-[40%] bg-white p-8 rounded-xl'>
      <div className="flex items-center mb-2">
        {[...Array(Math.floor(averageRating))].map((_, index) => (
          <img key={index} src={Star} className="w-4 h-4" alt="Star" />
        ))}
        {averageRating % 1 !== 0 && (
          <img src={NotStar} className="w-4 h-4" alt="NotStar" />
        )}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {averageRating.toFixed(2)}
        </p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {review.length > 0 ? review.length : 0} Total Review
      </p>
      {/* Display star ratings */}
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        let percentage = 0;
        if (review.length > 0) {
          percentage = review.filter(item => item.star === starRating).length / review.length * 100;
        }
        return (
          <div className="flex items-center mt-4" key={index}>
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
              {starRating} star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-300 rounded" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {percentage}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Rating;
