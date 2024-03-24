import React from 'react';

const TnC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
      <div className="prose">
        <h2>1. Introduction</h2>
        <p>
          Welcome to [Your Platform Name]! These terms and conditions outline
          the rules and regulations for the use of [Your Platform Name]'s
          Website, located at [Your Website URL].
        </p>
        <h2>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these terms, [Your Platform
          Name] and/or its licensors own all the intellectual property rights
          and materials contained in this Website.
        </p>
        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>Publishing any Website material in any other media.</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
          <li>Publicly performing and/or showing any Website material.</li>
          <li>Using this Website in any way that is or may be damaging to this Website.</li>
          <li>Using this Website in any way that impacts user access to this Website.</li>
          <li>
            Using this Website contrary to applicable laws and regulations, or
            in any way may cause harm to the Website, or to any person or
            business entity.
          </li>
        </ul>
        {/* Add more sections as needed */}
        <h2>4. Governing Law & Jurisdiction</h2>
        <p>
          These Terms will be governed by and interpreted in accordance with
          the laws of India, and you submit to the non-exclusive
          jurisdiction of the state and federal courts located in New Delhi
          for the resolution of any disputes.
        </p>
      </div>
    </div>
  );
};

export default TnC;
