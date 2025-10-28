import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Calendar,
  Scale,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function TermsConditions() {
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
              Terms & Conditions
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Terms of Service
              <span className="text-accent block">& Conditions</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Please read these terms and conditions carefully before using our
              services. By using Khalifa Auto's services, you agree to be bound
              by these terms.
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

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <span>Agreement to Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions ("Terms") govern your use of
                  Khalifa Auto's website, services, and any transactions you
                  enter into with us. By accessing our website, using our
                  services, or purchasing a vehicle from us, you agree to be
                  bound by these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If you do not agree to these Terms, please do not use our
                  services. We reserve the right to modify these Terms at any
                  time, and your continued use of our services constitutes
                  acceptance of any changes.
                </p>
              </CardContent>
            </Card>

            {/* Definitions */}
            <Card>
              <CardHeader>
                <CardTitle>Definitions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  For the purposes of these Terms, the following definitions
                  apply:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-primary">
                        "Company" or "We"
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Refers to Khalifa Auto, its officers, directors,
                        employees, and agents.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">
                        "Customer" or "You"
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Refers to any individual or entity using our services or
                        purchasing vehicles from us.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">"Services"</h4>
                      <p className="text-sm text-muted-foreground">
                        Includes vehicle sales, financing, service, and all
                        related activities provided by Khalifa Auto.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-accent">"Vehicle"</h4>
                      <p className="text-sm text-muted-foreground">
                        Any automobile, truck, SUV, or other motor vehicle sold
                        or serviced by Khalifa Auto.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">"Website"</h4>
                      <p className="text-sm text-muted-foreground">
                        Refers to khalifaauto.com and all associated web pages
                        and digital platforms.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">"Agreement"</h4>
                      <p className="text-sm text-muted-foreground">
                        These Terms and Conditions and any additional agreements
                        entered into between the parties.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Sales Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Vehicle Condition and Description
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      All vehicles are sold "as is" unless otherwise specified
                      in writing
                    </li>
                    <li>
                      Vehicle descriptions and specifications are provided in
                      good faith but may contain errors
                    </li>
                    <li>
                      Customers are encouraged to inspect vehicles thoroughly
                      before purchase
                    </li>
                    <li>
                      Test drives are available by appointment and subject to
                      availability
                    </li>
                    <li>
                      Vehicle history reports are provided when available but
                      may not be complete
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Pricing and Payment
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>All prices are subject to change without notice</li>
                    <li>
                      Prices do not include taxes, registration fees, or other
                      government charges
                    </li>
                    <li>
                      Payment methods accepted include cash, certified check,
                      and approved financing
                    </li>
                    <li>
                      Financing is subject to credit approval and lender terms
                    </li>
                    <li>
                      Down payments and trade-in values are subject to
                      verification
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Title and Registration
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Title transfer is the responsibility of the customer
                    </li>
                    <li>
                      We will assist with title transfer process but cannot
                      guarantee timelines
                    </li>
                    <li>
                      Registration fees and taxes are the customer's
                      responsibility
                    </li>
                    <li>Temporary tags may be provided for a limited period</li>
                    <li>Customers must maintain valid insurance coverage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Financing Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Credit Application and Approval
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      All financing is subject to credit approval by third-party
                      lenders
                    </li>
                    <li>
                      Credit applications require accurate and complete
                      information
                    </li>
                    <li>
                      We may verify income, employment, and other financial
                      information
                    </li>
                    <li>
                      Approval is not guaranteed and depends on lender criteria
                    </li>
                    <li>
                      Interest rates and terms are determined by the lender, not
                      Khalifa Auto
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Loan Terms and Conditions
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Loan terms are subject to lender approval and policies
                    </li>
                    <li>
                      Monthly payments must be made on time to avoid late fees
                    </li>
                    <li>
                      Default on loan payments may result in vehicle
                      repossession
                    </li>
                    <li>
                      Early payoff penalties may apply depending on lender terms
                    </li>
                    <li>
                      Insurance requirements must be maintained throughout loan
                      term
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Trade-In Vehicles
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Trade-in values are subject to inspection and verification
                    </li>
                    <li>
                      Outstanding loans on trade-in vehicles must be satisfied
                    </li>
                    <li>
                      Trade-in vehicles must have clear title or proper lien
                      release
                    </li>
                    <li>We reserve the right to refuse trade-in vehicles</li>
                    <li>
                      Trade-in values may change based on market conditions
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Warranties and Service */}
            <Card>
              <CardHeader>
                <CardTitle>Warranties and Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Vehicle Warranties
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Warranty coverage varies by vehicle and is detailed in
                      purchase agreement
                    </li>
                    <li>
                      Certified pre-owned vehicles include extended manufacturer
                      warranties
                    </li>
                    <li>
                      Warranty repairs must be performed by authorized service
                      centers
                    </li>
                    <li>
                      Warranty claims are subject to inspection and approval
                    </li>
                    <li>
                      Normal wear and tear items are not covered under warranty
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Service and Maintenance
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Service appointments are subject to availability</li>
                    <li>
                      Service estimates are provided but final costs may vary
                    </li>
                    <li>We use genuine parts when available and appropriate</li>
                    <li>Service work is performed by certified technicians</li>
                    <li>
                      Warranty on service work is limited to parts and labor
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Return Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Return and Exchange Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-accent">
                    3-Day Return Policy
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Vehicles may be returned within 3 days of purchase</li>
                    <li>Vehicle must be returned in same condition as sold</li>
                    <li>Maximum 300 miles may be added to odometer</li>
                    <li>Return is subject to inspection and approval</li>
                    <li>Financing fees and taxes are non-refundable</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Return Conditions
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Vehicle must not have been damaged or modified</li>
                    <li>
                      All original documents and accessories must be returned
                    </li>
                    <li>
                      Customer is responsible for any damage beyond normal wear
                    </li>
                    <li>Return processing may take 5-10 business days</li>
                    <li>
                      Refunds will be issued in same form as original payment
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                  <span>Limitation of Liability</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Khalifa Auto's
                  liability is limited as follows:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    Our total liability shall not exceed the purchase price of
                    the vehicle
                  </li>
                  <li>
                    We are not liable for consequential, indirect, or punitive
                    damages
                  </li>
                  <li>
                    We disclaim liability for third-party actions or products
                  </li>
                  <li>
                    Force majeure events relieve us of performance obligations
                  </li>
                  <li>
                    Some jurisdictions may not allow limitation of liability
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Customer Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Required Actions</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>
                          Provide accurate information in all applications
                        </li>
                        <li>Maintain valid insurance coverage</li>
                        <li>Make timely payments on financing</li>
                        <li>Follow recommended maintenance schedules</li>
                        <li>Comply with all applicable laws and regulations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-accent flex items-center space-x-2">
                        <XCircle className="h-4 w-4" />
                        <span>Prohibited Actions</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>Misrepresenting information or identity</li>
                        <li>Using vehicles for illegal purposes</li>
                        <li>Modifying vehicles in ways that void warranties</li>
                        <li>Failing to maintain required insurance</li>
                        <li>Reselling vehicles without proper disclosure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card>
              <CardHeader>
                <CardTitle>Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
                  <p className="text-muted-foreground">
                    These Terms are governed by the laws of the State of
                    [State], without regard to conflict of law principles. Any
                    disputes arising from these Terms or our services shall be
                    resolved in the courts of [County], [State].
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Dispute Resolution Process
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Contact our customer service department to attempt
                      resolution
                    </li>
                    <li>
                      If unresolved, disputes may be submitted to binding
                      arbitration
                    </li>
                    <li>
                      Arbitration will be conducted by a neutral third party
                    </li>
                    <li>Each party is responsible for their own legal fees</li>
                    <li>
                      Class action lawsuits are waived to the extent permitted
                      by law
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our collection, use, and
                  protection of your personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by
                  reference.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our services, you consent to our collection and use
                  of your information as described in our Privacy Policy. We may
                  share your information with third parties as necessary to
                  provide our services and as permitted by law.
                </p>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardHeader>
                <CardTitle>Modifications to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. Your continued use of our services after changes are
                  posted constitutes acceptance of the modified Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will notify customers of material changes by email or
                  through prominent notices on our website. It is your
                  responsibility to review these Terms periodically for updates.
                </p>
              </CardContent>
            </Card>

            {/* Severability */}
            <Card>
              <CardHeader>
                <CardTitle>Severability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be invalid or
                  unenforceable, the remaining provisions will remain in full
                  force and effect. The invalid provision will be replaced with
                  a valid provision that most closely reflects the original
                  intent.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions,
                  please contact us:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold">Khalifa Auto</div>
                      <div className="text-sm text-muted-foreground">
                        1-20-7 SHIMOUMA
                        <br />
                        SETAGAYA-KU, TOKYO JAPAN
                        <br />
                        Phone: +9715083633902
                        <br />
                        Email: legal@khalifaauto.com
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold">Business Hours</div>
                      <div className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 7:00 PM
                        <br />
                        Saturday: 9:00 AM - 6:00 PM
                        <br />
                        Sunday: 11:00 AM - 5:00 PM
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
