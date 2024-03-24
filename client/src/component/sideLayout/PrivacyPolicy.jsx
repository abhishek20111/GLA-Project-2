import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <div className="prose">
        <p>
          This Privacy Policy describes how [Your Platform Name] collects, uses,
          maintains, and discloses information collected from users (each, a
          "User") of the [Your Website URL] website ("Site"). This privacy
          policy applies to the Site and all products and services offered by
          [Your Platform Name].
        </p>
        <h2>1. Personal Identification Information</h2>
        <p>
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, register on the site, place an order, subscribe to the
          newsletter, respond to a survey, fill out a form, and in connection
          with other activities, services, features, or resources we make
          available on our Site.
        </p>
        <h2>2. Non-Personal Identification Information</h2>
        <p>
          We may collect non-personal identification information about Users
          whenever they interact with our Site. Non-personal identification
          information may include the browser name, the type of computer, and
          technical information about Users' means of connection to our Site,
          such as the operating system and the Internet service providers
          utilized and other similar information.
        </p>
        {/* Add more sections as needed */}
        <h2>3. How We Use Collected Information</h2>
        <p>
          [Your Platform Name] may collect and use Users' personal information
          for the following purposes:
        </p>
        <ul>
          <li>- To improve customer service</li>
          <li>- To personalize user experience</li>
          <li>- To process payments</li>
          <li>- To send periodic emails</li>
          <li>- And more...</li>
        </ul>
        <h2>4. Sharing Your Personal Information</h2>
        <p>
          We do not sell, trade, or rent Users' personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates, and advertisers for the purposes outlined above.
        </p>
        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          [Your Platform Name] has the discretion to update this privacy policy
          at any time. When we do, we will revise the updated date at the bottom
          of this page. We encourage Users to frequently check this page for any
          changes to stay informed about how we are helping to protect the
          personal information we collect.
        </p>
        <h2>6. Contacting Us</h2>
        <p>
          If you have any questions about this Privacy Policy, the practices of
          this site, or your dealings with this site, please contact us at:
        </p>
        <p>
          [Your Platform Name]
          <br />
          [Your Address]
          <br />
          [Your City, State, Zip]
          <br />
          [Your Email]
          <br />
          [Your Phone Number]
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
