import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
const PrivacyPolicy = () => {
  return <Layout title="Privacy Policy">
      <div className="space-y-6">
        <Card className="glass-dark p-8">
          <div className="space-y-6 text-white">
            <div>
              <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-white/80">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-4">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                <p className="text-white/90 leading-relaxed">
                  GPC Performance collects information you provide directly to us, such as when you create an account, 
                  log wellness data, complete assessments, or contact us for support. This may include your name, 
                  email address, fitness data, recovery metrics, and other health-related information you choose to share.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                <p className="text-white/90 leading-relaxed mb-2">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-white/90 space-y-1 ml-4">
                  <li>Provide and improve our fitness and wellness tracking services</li>
                  <li>Generate personalized recommendations and insights</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Ensure the security and integrity of our platform</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
                <p className="text-white/90 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this policy. We may share your information with trusted service providers who assist 
                  us in operating our platform, conducting our business, or serving our users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                <p className="text-white/90 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
                <p className="text-white/90 leading-relaxed mb-2">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-white/90 space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Opt out of certain communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
                <p className="text-white/90 leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
                <p className="text-white/90 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                <p className="text-white/90 leading-relaxed">
                  If you have any questions about this privacy policy or our data practices, please contact us at:
                </p>
                <div className="mt-2 text-white/90">
                  <p>Email: info@gpc-performance.com</p>
                  <p></p>
                </div>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </Layout>;
};
export default PrivacyPolicy;