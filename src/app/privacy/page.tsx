import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-primary text-brand-black dark:text-brand-white">
      <h1 className="headline mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mb-4">
            Welcome to Plateful! We are committed to protecting your privacy and
            ensuring you have a positive experience when using our recipe
            sharing platform.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name and email address (when you create an account)</li>
                <li>Profile information including bio and avatar</li>
                <li>Authentication data (securely managed through Supabase)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Content You Create</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Recipes you post including ingredients, instructions, and
                  photos
                </li>
                <li>Comments and interactions with other users</li>
                <li>Your favorite recipes and following relationships</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our recipe sharing service</li>
            <li>To enable you to create, share, and discover recipes</li>
            <li>To allow social features like following other users</li>
            <li>To improve our platform and user experience</li>
            <li>To communicate with you about your account and our services</li>
          </ul>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. Your information may be shared only in
            these limited circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Public content (recipes, profile information) is visible to other
              users
            </li>
            <li>When required by law or to protect our rights</li>
            <li>
              With service providers who help us operate our platform (like
              Supabase for data storage)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure authentication through Supabase</li>
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Regular security updates and monitoring</li>
            <li>Limited access to personal data by our team</li>
          </ul>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Control the visibility of your recipes and profile</li>
            <li>Opt out of communications from us</li>
          </ul>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Cookies and Tracking</h2>
          <p>
            We use essential cookies to maintain your login session and
            preferences. We do not use tracking cookies for advertising
            purposes.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Children&apos;s Privacy</h2>
          <p>
            Our service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our
            practices, please contact us:
          </p>
          <div className="bg-brand-white/5 dark:bg-brand-black/5 p-4 rounded border">
            <p>Email: lei.dev@outlook.com</p>
            <p>For general inquiries: lei.dev@outlook.com</p>
          </div>
        </section>

        <section className="pt-8 border-t border-brand-black/10 dark:border-brand-white/10">
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
            This privacy policy is effective as of the date listed above and
            applies to all information collected through our recipe sharing
            platform.
          </p>
        </section>
      </div>
    </div>
  );
}
