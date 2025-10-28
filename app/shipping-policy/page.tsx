import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Phone,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function ShippingPolicy() {
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
              Shipping & Delivery Policy
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Vehicle Delivery
              <span className="text-accent block">& Transportation</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              We offer comprehensive vehicle delivery and transportation
              services to make your car buying experience as convenient as
              possible. Learn about our delivery options, costs, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Service Overview */}
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-accent">
                  <Truck className="h-6 w-6" />
                  <span>Delivery Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent">
                    Convenient Vehicle Delivery
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We understand that picking up your new vehicle isn't always
                    convenient. That's why we offer professional vehicle
                    delivery services to bring your car directly to your home or
                    office.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">50</div>
                      <div className="text-sm text-muted-foreground">
                        Mile Radius
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        24-48
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hours Delivery
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">100%</div>
                      <div className="text-sm text-muted-foreground">
                        Insured
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                      <li>Professional driver with clean driving record</li>
                      <li>Fully insured transportation</li>
                      <li>Vehicle inspection upon delivery</li>
                      <li>All documentation and keys</li>
                      <li>Fuel tank topped off</li>
                      <li>Clean vehicle presentation</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-accent flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Delivery Process</span>
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                      <li>Schedule delivery appointment</li>
                      <li>Confirm delivery address and time</li>
                      <li>Prepare vehicle for transport</li>
                      <li>Professional delivery service</li>
                      <li>Final inspection and handover</li>
                      <li>Complete documentation transfer</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Delivery Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Local Delivery (Free)
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Free delivery is available within our local service area:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">
                        Primary Areas
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Tokyo (all districts)</li>
                        <li>Downtown Metro</li>
                        <li>Metro Heights</li>
                        <li>Riverside District</li>
                        <li>Business District</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">
                        Extended Areas
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Metro Suburbs (within 15 miles)</li>
                        <li>Airport Area</li>
                        <li>University District</li>
                        <li>Industrial Zone</li>
                        <li>Residential Communities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Extended Delivery (Fee Required)
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Delivery beyond our local area is available for a fee:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-lg font-semibold text-primary">
                        15-30 Miles
                      </div>
                      <div className="text-sm text-muted-foreground">
                        $2.50 per mile
                      </div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <div className="text-lg font-semibold text-accent">
                        30-50 Miles
                      </div>
                      <div className="text-sm text-muted-foreground">
                        $2.00 per mile
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-lg font-semibold text-primary">
                        50+ Miles
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Quote Required
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-accent" />
                  <span>Delivery Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Our streamlined delivery process ensures your vehicle arrives
                  safely and on time. Here's what to expect:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Schedule Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact us to schedule your delivery. We'll confirm your
                        address, preferred delivery time, and any special
                        requirements. Delivery can typically be scheduled within
                        24-48 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
                    <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Vehicle Preparation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare your vehicle for delivery by cleaning it,
                        checking all systems, topping off fluids, and ensuring
                        all documentation is ready. The vehicle will be fueled
                        and ready to drive.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Professional Transport
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Our certified driver will transport your vehicle using
                        professional equipment. The driver will contact you 30
                        minutes before arrival to confirm the delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
                    <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Delivery & Inspection
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Upon arrival, we'll conduct a final inspection with you,
                        transfer all keys and documentation, and ensure you're
                        comfortable with your new vehicle. Any questions will be
                        answered on-site.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Delivery Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Customer Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>What You Need</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>Valid driver's license for inspection</li>
                        <li>Proof of insurance (if required)</li>
                        <li>Payment completion or financing approval</li>
                        <li>Accessible delivery location</li>
                        <li>Someone available to receive delivery</li>
                        <li>Valid contact information</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Delivery Restrictions</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                        <li>No delivery to restricted areas</li>
                        <li>Weather conditions may delay delivery</li>
                        <li>Inaccessible locations not serviced</li>
                        <li>Delivery person must verify identity</li>
                        <li>Vehicle must be accepted upon delivery</li>
                        <li>Additional fees for special requests</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Weather and Safety
                  </h3>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Weather Policy:</strong> We prioritize safety and
                      may delay or reschedule deliveries due to severe weather
                      conditions including heavy rain, snow, ice, or extreme
                      temperatures.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Safety First:</strong> Our drivers are trained in
                      safe vehicle transport and will not compromise safety for
                      delivery schedules. We'll work with you to reschedule if
                      needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Fees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <span>Delivery Fees</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2">
                        Free Delivery
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Within 15 miles of our showroom</li>
                        <li>Standard business hours (Mon-Fri 9AM-5PM)</li>
                        <li>Regular delivery locations</li>
                        <li>Standard vehicle types</li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-2">
                        Additional Fees
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>After-hours delivery: $50</li>
                        <li>Weekend delivery: $75</li>
                        <li>Holiday delivery: $100</li>
                        <li>Express delivery (same day): $150</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2">
                        Special Vehicle Fees
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Luxury vehicles: $100</li>
                        <li>Large trucks/SUVs: $75</li>
                        <li>Commercial vehicles: Quote required</li>
                        <li>Modified vehicles: Quote required</li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-2">
                        Location Fees
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Gated communities: $25</li>
                        <li>High-rise buildings: $50</li>
                        <li>Restricted access areas: $75</li>
                        <li>Remote locations: Quote required</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance and Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Insurance & Liability</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Transportation Insurance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Your vehicle is fully insured during transport. We maintain
                    comprehensive insurance coverage for all delivery
                    operations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Full coverage during transport</li>
                    <li>Liability protection for our drivers</li>
                    <li>Property damage coverage</li>
                    <li>Comprehensive and collision coverage</li>
                    <li>Uninsured motorist protection</li>
                    <li>Professional liability insurance</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Customer Responsibilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">
                        Before Delivery
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Ensure delivery location is accessible</li>
                        <li>Have valid identification ready</li>
                        <li>Complete all purchase requirements</li>
                        <li>Arrange for someone to receive delivery</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">
                        Upon Delivery
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                        <li>Inspect vehicle thoroughly</li>
                        <li>Verify all documentation</li>
                        <li>Test all vehicle functions</li>
                        <li>Report any issues immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling and Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-accent" />
                  <span>Schedule Your Delivery</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Ready to Schedule Your Delivery?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Contact us to schedule your vehicle delivery. Our team will
                    work with you to find the most convenient time and ensure
                    everything is ready for your new vehicle.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-semibold">Call Us</div>
                      <div className="text-sm text-muted-foreground">
                        (555) 123-4567
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
                      <div className="font-semibold">Schedule Online</div>
                      <div className="text-sm text-muted-foreground">
                        24/7 Available
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white/50 rounded-lg">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-semibold">Visit Us</div>
                      <div className="text-sm text-muted-foreground">
                        1-20-7 SHIMOUMA, SETAGAYA-KU, TOKYO JAPAN
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">
                      Business Hours
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Monday - Friday: 9:00 AM - 7:00 PM</div>
                      <div>Saturday: 9:00 AM - 6:00 PM</div>
                      <div>Sunday: 11:00 AM - 5:00 PM</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-accent">
                      Delivery Hours
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                      <div>Saturday: 9:00 AM - 4:00 PM</div>
                      <div>Sunday: By appointment only</div>
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
