import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-luxe-black mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="lead">Last Updated: October 12, 2024</p>
          
          <h3>1. Introduction</h3>
          <p>Welcome to Burhani Creations ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, and share your information when you visit our website.</p>

          <h3>2. Information We Collect</h3>
          <p>We may collect personal information such as your name, email address, and browsing behavior when you interact with our site, subscribe to our newsletter, or make a purchase.</p>

          <h3>3. How We Use Your Information</h3>
          <ul>
            <li>To provide and manage the services you request.</li>
            <li>To communicate with you regarding updates or offers.</li>
            <li>To improve our website functionality and user experience.</li>
          </ul>

          <h3>4. Sharing of Information</h3>
          <p>We do not sell your personal information. We may share data with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users.</p>

          <h3>5. Cookies</h3>
          <p>Our website uses cookies to enhance your experience. You can choose to disable cookies through your browser settings.</p>

          <h3>6. Contact Us</h3>
          <p>If you have questions about this policy, please contact us at privacy@burhanicreations.com.</p>
        </div>
      </div>
    </div>
  );
};