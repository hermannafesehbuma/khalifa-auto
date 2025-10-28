import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  RefreshCw,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
} from 'lucide-react';

export default function ReturnRefundPolicy() {
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
              Return & Refund Policy
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Satisfaction is
              <span className="text-accent block">Our Guarantee</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              We stand behind every vehicle we sell. Our comprehensive return
              and refund policy ensures you can purchase with confidence,
              knowing we'll work with you if you're not completely satisfied.
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

      {/* Policy Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 3-Day Return Policy */}
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-accent">
                  <RefreshCw className="h-6 w-6" />
                  <span>3-Day Return Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent">
                    Our Promise to You
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We offer a comprehensive 3-day return policy on all vehicles
                    to ensure your complete satisfaction. If you're not happy
                    with your purchase for any reason, we'll work with you to
                    make it right.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">3</div>
                      <div className="text-sm text-muted-foreground">
                        Days to Return
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">300</div>
                      <div className="text-sm text-muted-foreground">
                        Max Miles
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">100%</div>
                      <div className="text-sm text-muted-foreground">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Return Conditions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>What's Required</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>Return within 3 calendar days of purchase</li>
                        <li>Vehicle in same condition as sold</li>
                        <li>Maximum 300 miles added to odometer</li>
                        <li>All original documents and accessories</li>
                        <li>Valid reason for return</li>
                        <li>Inspection and approval required</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent flex items-center space-x-2">
                        <XCircle className="h-4 w-4" />
                        <span>What's Not Covered</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>Damage beyond normal wear and tear</li>
                        <li>Missing accessories or documents</li>
                        <li>Excessive mileage over 300 miles</li>
                        <li>Modifications made to the vehicle</li>
                        <li>Accidents or incidents</li>
                        <li>Change of mind after 3 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>Return Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Returning a vehicle is simple and straightforward. Follow
                  these steps to initiate your return:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Contact Us Immediately
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Call us at (555) 123-4567 or visit our showroom within 3
                        days of purchase to initiate the return process. The
                        sooner you contact us, the smoother the process will be.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
                    <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Schedule Inspection
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We'll schedule a thorough inspection of the vehicle to
                        ensure it meets our return criteria. This inspection
                        typically takes 30-60 minutes and can be done at our
                        showroom.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Complete Documentation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Provide all original purchase documents, vehicle
                        registration, insurance information, and any accessories
                        that came with the vehicle. Complete return paperwork
                        will be provided.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
                    <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Process Refund</h4>
                      <p className="text-sm text-muted-foreground">
                        Once approved, we'll process your refund within 5-10
                        business days. Refunds will be issued in the same form
                        as the original payment method used for the purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <span>Refund Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    What's Refundable
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">
                            Vehicle Purchase Price
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Full refund of vehicle cost
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">
                            Extended Warranties
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Pro-rated refund if unused
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Service Contracts</div>
                          <div className="text-sm text-muted-foreground">
                            Pro-rated refund if unused
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Gap Insurance</div>
                          <div className="text-sm text-muted-foreground">
                            Pro-rated refund if unused
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Accessories</div>
                          <div className="text-sm text-muted-foreground">
                            If returned in original condition
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">
                            Documentation Fees
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Processing fees refunded
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    What's Not Refundable
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">Sales Tax</div>
                          <div className="text-sm text-muted-foreground">
                            Handled by state tax authority
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">Registration Fees</div>
                          <div className="text-sm text-muted-foreground">
                            Paid to DMV, not refundable
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">Financing Fees</div>
                          <div className="text-sm text-muted-foreground">
                            Lender processing fees
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">
                            Insurance Premiums
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Contact insurance company
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">Damage Costs</div>
                          <div className="text-sm text-muted-foreground">
                            Repair costs deducted
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold">Excessive Mileage</div>
                          <div className="text-sm text-muted-foreground">
                            $0.50 per mile over 300
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exchange Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Vehicle Exchange Option
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Instead of a full return, you may choose to exchange your
                    vehicle for another one in our inventory. This option
                    provides more flexibility and may be more convenient for
                    your needs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">
                        Exchange Benefits:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>No waiting period for refund processing</li>
                        <li>Flexible pricing adjustments</li>
                        <li>Transfer of warranties and services</li>
                        <li>Simplified paperwork process</li>
                        <li>Immediate availability of new vehicle</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">
                        Exchange Process:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Same 3-day timeframe applies</li>
                        <li>Vehicle inspection still required</li>
                        <li>Price difference handled at time of exchange</li>
                        <li>New financing may be required</li>
                        <li>Updated documentation provided</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Circumstances */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                  <span>Special Circumstances</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Extended Return Period
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    In certain circumstances, we may extend the return period
                    beyond 3 days. These situations are evaluated on a
                    case-by-case basis:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Vehicle defects discovered after purchase</li>
                    <li>Financing approval issues beyond customer control</li>
                    <li>
                      Medical emergencies affecting ability to complete purchase
                    </li>
                    <li>Job loss or significant financial hardship</li>
                    <li>Family emergencies or unexpected circumstances</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Lemon Law Protection
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If your vehicle qualifies under state lemon law provisions,
                    you may have additional rights beyond our return policy. We
                    fully comply with all applicable lemon law requirements and
                    will work with you to resolve any qualifying issues.
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Lemon law protections vary by state
                      and typically apply to vehicles with recurring defects
                      that cannot be repaired after multiple attempts. Contact
                      us for specific information about your state's lemon law
                      protections.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frequently Asked Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Q: Can I return a vehicle if I change my mind?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A: Yes, within the 3-day return period, you can return a
                      vehicle for any reason, including change of mind. However,
                      the vehicle must meet all return conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Q: What if I find a defect after the 3-day period?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A: Defects discovered after the return period are covered
                      under our warranty policy. We'll repair or replace
                      defective parts according to warranty terms.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Q: How long does it take to process a refund?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A: Refunds are typically processed within 5-10 business
                      days after approval. The exact timing depends on your
                      payment method and financial institution.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Q: Can I return a vehicle if I've already registered it?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A: Yes, registration doesn't affect your return rights.
                      However, registration fees paid to the DMV are not
                      refundable through us.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Q: What if I can't return the vehicle within 3 days?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A: Contact us immediately to discuss your situation. We
                      may be able to work with you on a case-by-case basis for
                      special circumstances.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help with a Return?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our customer service team is here to help with any questions
                  about returns or refunds. Contact us immediately if you need
                  to initiate a return or have questions about our policy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold">Phone Support</div>
                      <div className="text-sm text-muted-foreground">
                        (555) 123-4567
                        <br />
                        Available during business hours
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold">Email Support</div>
                      <div className="text-sm text-muted-foreground">
                        returns@khalifaauto.com
                        <br />
                        Response within 2 hours
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold">In-Person Support</div>
                      <div className="text-sm text-muted-foreground">
                        Visit our showroom
                        <br />
                        1-20-7 SHIMOUMA, SETAGAYA-KU, TOKYO JAPAN
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold">Business Hours</div>
                      <div className="text-sm text-muted-foreground">
                        Mon-Fri: 9AM-7PM
                        <br />
                        Sat: 9AM-6PM | Sun: 11AM-5PM
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
