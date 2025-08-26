import Link from "next/link";
import React from "react";

export default function DataDeletion() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-primary text-brand-black dark:text-brand-white">
      <h1 className="headline mb-8">Data Deletion Instructions</h1>

      <div className="space-y-8">
        <section>
          <p className="mb-6">
            If you want to delete your data from Plateful, you have several
            options available. We are committed to helping you control your
            personal information.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">
            Delete Your Account Through the App
          </h2>
          <div className="bg-brand-white/5 dark:bg-brand-black/5 p-6 rounded border mb-4">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log into your Plateful account</li>
              <li>Go to your Profile page</li>
              <li>
                Click on &quot;Account Settings&quot; or &quot;Profile
                Options&quot;
              </li>
              <li>Look for &quot;Delete Account&quot; option</li>
              <li>Follow the confirmation steps</li>
            </ol>
          </div>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
            Note: This will permanently delete your account, recipes, and all
            associated data.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Request Manual Deletion</h2>
          <p className="mb-4">
            If you&apos;re unable to delete your account through the app, or if
            you logged in through Facebook and want to ensure all data is
            removed, you can contact us directly:
          </p>

          <div className="bg-brand-white/5 dark:bg-brand-black/5 p-6 rounded border">
            <h3 className="font-semibold mb-3">Contact Information:</h3>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong> lei.dev@outlook.com
              </li>
              <li>
                <strong>Subject:</strong> Data Deletion Request
              </li>
              <li>
                <strong>Include:</strong> Your account email and any additional
                details
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">What Gets Deleted</h2>
          <p className="mb-4">
            When you delete your account, the following data will be permanently
            removed:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your profile information (name, email, bio, avatar)</li>
            <li>All recipes you&apos;ve created</li>
            <li>Your recipe favorites and following lists</li>
            <li>Comments and interactions</li>
            <li>Any uploaded images</li>
            <li>Authentication data and login information</li>
          </ul>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Processing Time</h2>
          <div className="bg-brand-white/5 dark:bg-brand-black/5 p-4 rounded border">
            <ul className="space-y-2">
              <li>
                <strong>Automatic deletion:</strong> Immediate when done through
                the app
              </li>
              <li>
                <strong>Manual requests:</strong> Within 30 days of receiving
                your request
              </li>
              <li>
                <strong>Confirmation:</strong> We&apos;ll send you an email once
                deletion is complete
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Facebook Login Users</h2>
          <p className="mb-4">
            If you signed up using Facebook Login, you can also request data
            deletion through Facebook:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to your Facebook Settings</li>
            <li>Navigate to &quot;Apps and Websites&quot;</li>
            <li>Find &quot;Plateful&quot; in your connected apps</li>
            <li>Click &quot;Remove&quot; or &quot;Delete App Data&quot;</li>
          </ol>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70 mt-4">
            This will also trigger deletion of your Plateful account data.
          </p>
        </section>

        <section>
          <h2 className="headlineTwo mb-4">Questions or Concerns</h2>
          <p className="mb-4">
            If you have any questions about data deletion or need assistance,
            please contact us:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Data Protection:</strong> lei.dev@outlook.com
            </p>
            <p>
              <strong>General Support:</strong> lei.dev@outlook.com
            </p>
          </div>
        </section>

        <section className="pt-8 border-t border-brand-black/10 dark:border-brand-white/10">
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
            This page satisfies Facebook&apos;s data deletion requirements for
            apps using Facebook Login. For more information, see our{" "}
            <Link href="/privacy" className="underline hover:text-brand-orange">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
