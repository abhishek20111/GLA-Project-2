import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Cancellation & Refund Policy</h1>
      <div className="prose">
        <h2>Cancellation Policy</h2>
        <p>
          You have the right to cancel your course purchase within 14 days of
          registration. If you decide to cancel, please contact our support team
          at support@[Your Platform Name].com.
        </p>
        <p>
          Refunds for cancellations made within this 14-day period will be processed
          in full and credited back to the original payment method used for the purchase.
        </p>
        <h2>Refund Policy</h2>
        <p>
          We offer refunds under the following circumstances:
        </p>
        <ul>
          <li>- If the course content is significantly different from what was advertised.</li>
          <li>- If technical issues prevent access to course materials for an extended period.</li>
          <li>- If a duplicate purchase was made in error.</li>
        </ul>
        <p>
          Refunds for eligible cases will be processed within 5 business days of approval
          and will be credited back to the original payment method used for the purchase.
        </p>
        <p>
          To request a refund, please contact our support team with your order details
          and the reason for your refund request.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about our Cancellation & Refund Policy or need
          further assistance, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> support@[Your Platform Name].com
        </p>
        <p>
          <strong>Phone:</strong> +1 (XXX) XXX-XXXX
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
