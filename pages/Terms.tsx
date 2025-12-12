import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-luxe-black mb-8">Terms & Conditions</h1>
        <div className="prose prose-slate max-w-none">
          <p className="lead">Last Updated: October 12, 2024</p>

          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using Burhani Creations, you agree to comply with and be bound by these Terms and Conditions.</p>

          <h3>2. Intellectual Property</h3>
          <p>All content published and made available on our site is the property of Burhani Creations and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>

          <h3>3. User Accounts</h3>
          <p>When you create an account on our site, you agree to the following:
             <ul>
               <li>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account.</li>
               <li>All personal information you provide to us through your account is up to date, accurate, and truthful.</li>
             </ul>
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>Burhani Creations and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.</p>

          <h3>5. Changes to Terms</h3>
          <p>We reserve the right to modify these terms at any time. Your continued use of the site will signify your acceptance of any adjustment to these terms.</p>
        </div>
      </div>
    </div>
  );
};