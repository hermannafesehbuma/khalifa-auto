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
  Car,
  DollarSign,
  Calculator,
  CheckCircle,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Phone,
  Mail,
  Calendar,
  FileText,
  Award,
  Users,
  Zap,
} from 'lucide-react';

export default function TradeIn() {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    mileage: '',
    condition: '',
    vin: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    comments: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trade-in form submitted:', formData);
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
              Trade-In Value
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Get Your Vehicle's
              <span className="text-accent block">Trade-In Value</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Get an instant trade-in estimate for your vehicle. Our fair and
              competitive valuations help you maximize the value of your
              trade-in toward your next vehicle purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Trade-In Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trade-In Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Vehicle Information
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Trade-In Calculator
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below to get an instant trade-in estimate.
                  Our experienced appraisers will provide you with a fair market
                  value for your vehicle.
                </p>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Select
                        value={formData.year}
                        onValueChange={(value) =>
                          handleInputChange('year', value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 25 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="make">Make *</Label>
                      <Select
                        value={formData.make}
                        onValueChange={(value) =>
                          handleInputChange('make', value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="chevrolet">Chevrolet</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">
                            Mercedes-Benz
                          </SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="lexus">Lexus</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                          <SelectItem value="kia">Kia</SelectItem>
                          <SelectItem value="subaru">Subaru</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          <SelectItem value="acura">Acura</SelectItem>
                          <SelectItem value="infiniti">Infiniti</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        placeholder="Enter model"
                        value={formData.model}
                        onChange={(e) =>
                          handleInputChange('model', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage *</Label>
                      <Input
                        id="mileage"
                        type="number"
                        placeholder="Enter mileage"
                        value={formData.mileage}
                        onChange={(e) =>
                          handleInputChange('mileage', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) =>
                          handleInputChange('condition', value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN Number (Optional)</Label>
                    <Input
                      id="vin"
                      placeholder="Enter VIN number"
                      value={formData.vin}
                      onChange={(e) => handleInputChange('vin', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Tell us about any modifications, recent repairs, or other details..."
                      className="min-h-[100px]"
                      value={formData.comments}
                      onChange={(e) =>
                        handleInputChange('comments', e.target.value)
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Get Trade-In Value
                  </Button>
                </form>
              </Card>
            </div>

            {/* Benefits & Process */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-accent border-accent">
                  Why Trade With Us
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Fair & Competitive Values
                </h2>
                <p className="text-lg text-muted-foreground">
                  We offer competitive trade-in values and make the process
                  simple and transparent. Here's why customers choose us for
                  their trade-ins.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Competitive Pricing
                      </h3>
                      <p className="text-muted-foreground">
                        We offer fair market values based on current market
                        conditions and vehicle condition. Our appraisers are
                        experienced and knowledgeable.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Quick Process
                      </h3>
                      <p className="text-muted-foreground">
                        Get an instant estimate online, then schedule an
                        in-person appraisal. Most appraisals take less than 30
                        minutes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        No Pressure
                      </h3>
                      <p className="text-muted-foreground">
                        Our appraisals are free with no obligation to buy. We'll
                        give you a fair value whether you purchase from us or
                        not.
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
                        All Makes & Models
                      </h3>
                      <p className="text-muted-foreground">
                        We accept trade-ins for all makes and models, regardless
                        of where you purchased them. Even vehicles with loans or
                        leases.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Trade-In Bonus</h3>
                </div>
                <p className="text-muted-foreground">
                  Get up to $2,000 extra on your trade-in when you purchase any
                  vehicle from our inventory this month. Limited time offer!
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Learn More About Bonus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-In Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Trade-In Process
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our simple 4-step process makes trading in your vehicle easy and
              stress-free.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Get Online Estimate</h4>
                <p className="text-sm text-muted-foreground">
                  Fill out our trade-in form to get an instant estimate based on
                  your vehicle's information. This gives you a starting point
                  for negotiations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Schedule Appraisal</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule a convenient time to bring your vehicle in for a
                  professional appraisal. Our certified appraisers will inspect
                  your vehicle thoroughly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Receive Final Offer</h4>
                <p className="text-sm text-muted-foreground">
                  After the inspection, we'll provide you with a final trade-in
                  offer. This offer is valid for 7 days and can be used toward
                  any vehicle in our inventory.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Complete Transaction</h4>
                <p className="text-sm text-muted-foreground">
                  If you accept our offer, we'll handle all the paperwork and
                  transfer your trade-in value toward your new vehicle purchase.
                  We'll even pay off your existing loan if applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-In Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-accent border-accent">
              Trade-In Tips
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Maximize Your Trade-In Value
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these tips to get the best possible value for your trade-in
              vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Car className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Clean Your Vehicle</h3>
                </div>
                <p className="text-muted-foreground">
                  A clean vehicle makes a better impression and can increase
                  your trade-in value. Consider professional detailing for
                  maximum impact.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">
                    Gather Documentation
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Bring service records, maintenance receipts, and any warranty
                  information. Well-documented maintenance history increases
                  value.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Fix Minor Issues</h3>
                </div>
                <p className="text-muted-foreground">
                  Address minor cosmetic issues like scratches or dents. Small
                  repairs can significantly improve your vehicle's appraisal
                  value.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Time Your Trade</h3>
                </div>
                <p className="text-muted-foreground">
                  Consider market timing. Some vehicles have seasonal value
                  fluctuations. Research current market trends for your vehicle
                  type.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Compare Offers</h3>
                </div>
                <p className="text-muted-foreground">
                  Get multiple trade-in estimates to ensure you're getting fair
                  market value. We're confident our offers are competitive.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Be Honest</h3>
                </div>
                <p className="text-muted-foreground">
                  Provide accurate information about your vehicle's condition
                  and history. Honesty helps build trust and ensures fair
                  appraisal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Trade In Your Vehicle?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Get started with our trade-in calculator or contact us directly
              for a personalized appraisal. Our team is ready to help you
              maximize your trade-in value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (555) 123-4567
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Appraisal
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
