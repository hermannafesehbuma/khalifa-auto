import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Calendar, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              Privacy Policy
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Privacy is
              <span className="text-accent block">Our Priority</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              At Khalifa Auto, we are committed to protecting your privacy and
              personal information. This policy explains how we collect, use,
              and safeguard your data.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: December 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Effective Date: January 1, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Introduction</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Khalifa Auto ("we," "our," or "us") respects your privacy and
                  is committed to protecting your personal information. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website, use our
                  services, or interact with us in any way.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. If you do not
                  agree with our policies and practices, please do not use our
                  services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We may collect the following types of personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Name, email address, phone number, and mailing address
                    </li>
                    <li>
                      Driver's license number and other identification documents
                    </li>
                    <li>Financial information for financing applications</li>
                    <li>Employment information and income verification</li>
                    <li>Vehicle preferences and purchase history</li>
                    <li>Insurance information</li>
                    <li>Credit score and credit history (with your consent)</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    When you visit our website, we automatically collect certain
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Location data (if you enable location services)</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Third-Party Information
                  </h3>
                  <p className="text-muted-foreground">
                    We may receive information about you from third parties,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                    <li>Credit reporting agencies</li>
                    <li>Financial institutions</li>
                    <li>Insurance companies</li>
                    <li>Vehicle history report providers</li>
                    <li>Marketing partners</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground mb-4">
                  We use your personal information for the following purposes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">
                        Vehicle Sales & Services
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Process vehicle purchases and sales</li>
                        <li>Provide financing options</li>
                        <li>Schedule test drives and appointments</li>
                        <li>Handle trade-in evaluations</li>
                        <li>Provide warranty and service support</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">
                        Customer Service
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Respond to inquiries and requests</li>
                        <li>Provide customer support</li>
                        <li>Send important updates and notifications</li>
                        <li>Handle complaints and feedback</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-accent">
                        Marketing & Communications
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Send promotional offers and newsletters</li>
                        <li>Notify about new inventory</li>
                        <li>Conduct surveys and market research</li>
                        <li>Personalize your experience</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-accent">
                        Legal & Compliance
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Comply with legal obligations</li>
                        <li>Prevent fraud and ensure security</li>
                        <li>Maintain business records</li>
                        <li>Enforce our terms and conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your
                  information in the following circumstances:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Service Providers</h4>
                    <p className="text-sm text-muted-foreground">
                      We share information with trusted third-party service
                      providers who assist us in operating our business, such as
                      financing partners, insurance companies, and vehicle
                      history providers.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold">Legal Requirements</h4>
                    <p className="text-sm text-muted-foreground">
                      We may disclose information when required by law, court
                      order, or to protect our rights, property, or safety, or
                      that of others.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Business Transfers</h4>
                    <p className="text-sm text-muted-foreground">
                      In the event of a merger, acquisition, or sale of assets,
                      your information may be transferred as part of the
                      transaction.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold">Consent</h4>
                    <p className="text-sm text-muted-foreground">
                      We may share information with your explicit consent for
                      specific purposes not covered in this policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection</li>
                  <li>Secure data centers and infrastructure</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure. While we strive to protect
                  your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground mb-4">
                  You have certain rights regarding your personal information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">
                        Access & Portability
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Request access to your personal information and receive
                        a copy in a portable format.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Correction</h4>
                      <p className="text-sm text-muted-foreground">
                        Request correction of inaccurate or incomplete personal
                        information.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Deletion</h4>
                      <p className="text-sm text-muted-foreground">
                        Request deletion of your personal information, subject
                        to legal and business requirements.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-accent">
                        Marketing Opt-Out
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Opt out of marketing communications while maintaining
                        essential service communications.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-accent">Restriction</h4>
                      <p className="text-sm text-muted-foreground">
                        Request restriction of processing of your personal
                        information in certain circumstances.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-accent">Objection</h4>
                      <p className="text-sm text-muted-foreground">
                        Object to processing of your personal information for
                        certain purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>To exercise these rights:</strong> Contact us at
                    <a
                      href="mailto:privacy@khalifaauto.com"
                      className="text-primary hover:underline ml-1"
                    >
                      privacy@khalifaauto.com
                    </a>{' '}
                    or call (555) 123-4567. We will respond to your request
                    within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. Cookies are small text files
                  stored on your device that help us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You can control cookie settings through your browser
                  preferences. However, disabling cookies may affect website
                  functionality.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If we become aware that we have collected
                  personal information from a child under 13, we will take steps
                  to delete such information promptly.
                </p>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or applicable laws. We will notify
                  you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices on our website</li>
                  <li>
                    Updating the "Last Updated" date at the top of this policy
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We encourage you to review this Privacy Policy periodically to
                  stay informed about how we protect your information.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-sm text-muted-foreground">
                          privacy@khalifaauto.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-sm text-muted-foreground">
                          (555) 123-4567
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold">Mail</div>
                        <div className="text-sm text-muted-foreground">
                          Khalifa Auto
                          <br />
                          Attn: Privacy Officer
                          <br />
                          1-20-7 SHIMOUMA
                          <br />
                          SETAGAYA-KU, TOKYO JAPAN
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
