'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Car,
  MessageSquare,
  Send,
  CheckCircle,
  Users,
  Calendar,
  CreditCard,
  Wrench,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: '',
    vehicleInterest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredContact: '',
          vehicleInterest: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
              Contact Us
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Get in Touch with
              <span className="text-accent block">Khalifa Auto</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Ready to find your perfect vehicle? Have questions about our
              inventory or services? We're here to help! Contact us today and
              let our experienced team assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Contact Information
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our team.
              We're available Monday through Sunday to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-muted-foreground">
                  Call us directly for immediate assistance
                </p>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-primary">
                    +9715083633902
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mon-Fri: 9AM-7PM
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sat: 9AM-6PM | Sun: 11AM-5PM
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  Send us a message anytime
                </p>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-accent">
                    info@khalifaauto.com
                  </div>
                  <div className="text-sm text-muted-foreground">
                    We respond within 2 hours
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">
                  Come see our showroom in person
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold">1-20-7 SHIMOUMA</div>
                  <div className="text-sm font-semibold">
                    SETAGAYA-KU, TOKYO JAPAN
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Free parking available
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Schedule</h3>
                <p className="text-muted-foreground">
                  Book an appointment online
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Test drives, consultations, and service appointments
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Send Us a Message
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have questions about our vehicles, financing options, or
                  services? Fill out the form below and we'll get back to you
                  within 2 hours during business hours.
                </p>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+9715083633902"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredContact">
                        Preferred Contact Method
                      </Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) =>
                          handleInputChange('preferredContact', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange('subject', value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="vehicle">
                          Vehicle Information
                        </SelectItem>
                        <SelectItem value="financing">
                          Financing Questions
                        </SelectItem>
                        <SelectItem value="trade-in">Trade-In Value</SelectItem>
                        <SelectItem value="service">
                          Service & Maintenance
                        </SelectItem>
                        <SelectItem value="warranty">
                          Warranty Information
                        </SelectItem>
                        <SelectItem value="appointment">
                          Schedule Appointment
                        </SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleInterest">
                      Vehicle Interest (Optional)
                    </Label>
                    <Select
                      value={formData.vehicleInterest}
                      onValueChange={(value) =>
                        handleInputChange('vehicleInterest', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV/Crossover</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="luxury">Luxury Vehicle</SelectItem>
                        <SelectItem value="certified">
                          Certified Pre-Owned
                        </SelectItem>
                        <SelectItem value="under-15k">Under $15,000</SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-green-800 font-medium">
                          Thank you! Your message has been sent successfully.
                          We'll get back to you within 2 hours during business
                          hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-red-800 font-medium">
                          Sorry, there was an error sending your message. Please
                          try again or contact us directly at +9715083633902.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-accent border-accent">
                  Quick Help
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find quick answers to common questions about our vehicles,
                  financing, and services.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Do you offer test drives?
                      </h3>
                      <p className="text-muted-foreground">
                        Yes! We encourage test drives for all our vehicles.
                        Schedule an appointment or walk in during business
                        hours.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        What financing options do you offer?
                      </h3>
                      <p className="text-muted-foreground">
                        We work with multiple lenders to offer competitive rates
                        for all credit situations. Pre-approval available
                        online.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Do you provide vehicle warranties?
                      </h3>
                      <p className="text-muted-foreground">
                        All our vehicles come with warranties. Certified
                        pre-owned vehicles include extended manufacturer
                        warranties.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        What's your return policy?
                      </h3>
                      <p className="text-muted-foreground">
                        We offer a 3-day return policy on all vehicles, subject
                        to mileage and condition restrictions.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">
                    Need Immediate Help?
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  For urgent inquiries or immediate assistance, call us directly
                  at +9715083633902. Our sales team is standing by to help you
                  find your perfect vehicle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-accent hover:text-accent-foreground"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Visit Our Showroom
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Business Hours & Location
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit our showroom to see our vehicles in person and meet our
              friendly team. We're conveniently located with free parking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Khalifa Auto Showroom
                    </h3>
                    <p className="text-muted-foreground">
                      1-20-7 SHIMOUMA
                      <br />
                      SETAGAYA-KU, TOKYO JAPAN
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Parking Information:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Free customer parking available</li>
                      <li>• Covered parking for test drives</li>
                      <li>• Handicap accessible spaces</li>
                      <li>• Electric vehicle charging stations</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Nearby Landmarks:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 2 minutes from Shimouma Station</li>
                      <li>• 5 minutes from Setagaya Park</li>
                      <li>• Next to Setagaya University</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-accent" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Monday - Friday</span>
                    <span className="text-accent font-semibold">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Saturday</span>
                    <span className="text-accent font-semibold">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Sunday</span>
                    <span className="text-accent font-semibold">
                      11:00 AM - 5:00 PM
                    </span>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-accent">Special Hours:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Extended hours during holiday seasons</li>
                    <li>• Service department: Mon-Fri 8AM-6PM</li>
                    <li>• Parts department: Mon-Sat 8AM-5PM</li>
                    <li>• Emergency service: 24/7 roadside assistance</li>
                  </ul>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">
                    Holiday Schedule:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We're closed on major holidays including New Year's Day,
                    Independence Day, Thanksgiving, and Christmas Day. Check our
                    website for specific holiday hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
