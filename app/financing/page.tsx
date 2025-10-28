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
  CreditCard,
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
  DollarSign,
  Percent,
  Car,
  Building,
  User,
} from 'lucide-react';

export default function Financing() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    monthlyIncome: '',
    creditScore: '',
    downPayment: '',
    vehiclePrice: '',
    loanTerm: '',
    comments: '',
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
      const response = await fetch('/api/financing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          income: formData.monthlyIncome,
          creditScore: formData.creditScore,
          downPayment: formData.downPayment,
          loanAmount: formData.vehiclePrice,
          employmentStatus: formData.employmentStatus,
          additionalInfo: formData.comments,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          employmentStatus: '',
          employer: '',
          jobTitle: '',
          monthlyIncome: '',
          creditScore: '',
          downPayment: '',
          vehiclePrice: '',
          loanTerm: '',
          comments: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting financing application:', error);
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
              Auto Financing
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Get Approved for
              <span className="text-accent block">Auto Financing</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              We work with multiple lenders to get you the best financing rates
              and terms. Whether you have excellent credit or are rebuilding
              your credit, we can help you get approved.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Financing Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Pre-Approval Application
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Get Pre-Approved
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out our quick pre-approval form to get instant financing
                  options. No impact to your credit score and no obligation to
                  buy.
                </p>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange('firstName', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange('lastName', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+9715083633902"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Address Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        placeholder="Enter street address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange('address', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange('city', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) =>
                            handleInputChange('state', value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                            <SelectItem value="NC">North Carolina</SelectItem>
                            <SelectItem value="MI">Michigan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          placeholder="12345"
                          value={formData.zip}
                          onChange={(e) =>
                            handleInputChange('zip', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Employment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus">
                          Employment Status *
                        </Label>
                        <Select
                          value={formData.employmentStatus}
                          onValueChange={(value) =>
                            handleInputChange('employmentStatus', value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self-employed">
                              Self-Employed
                            </SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="unemployed">
                              Unemployed
                            </SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          placeholder="Enter monthly income"
                          value={formData.monthlyIncome}
                          onChange={(e) =>
                            handleInputChange('monthlyIncome', e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employer">Employer</Label>
                        <Input
                          id="employer"
                          placeholder="Enter employer name"
                          value={formData.employer}
                          onChange={(e) =>
                            handleInputChange('employer', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          placeholder="Enter job title"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            handleInputChange('jobTitle', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Credit & Loan Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Credit & Loan Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="creditScore">Credit Score Range</Label>
                        <Select
                          value={formData.creditScore}
                          onValueChange={(value) =>
                            handleInputChange('creditScore', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">
                              750+ (Excellent)
                            </SelectItem>
                            <SelectItem value="good">700-749 (Good)</SelectItem>
                            <SelectItem value="fair">650-699 (Fair)</SelectItem>
                            <SelectItem value="poor">600-649 (Poor)</SelectItem>
                            <SelectItem value="very-poor">
                              Below 600 (Very Poor)
                            </SelectItem>
                            <SelectItem value="unknown">Don't Know</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="downPayment">Down Payment Amount</Label>
                        <Input
                          id="downPayment"
                          type="number"
                          placeholder="Enter down payment"
                          value={formData.downPayment}
                          onChange={(e) =>
                            handleInputChange('downPayment', e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehiclePrice">
                          Vehicle Price Range
                        </Label>
                        <Select
                          value={formData.vehiclePrice}
                          onValueChange={(value) =>
                            handleInputChange('vehiclePrice', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-15k">
                              Under $15,000
                            </SelectItem>
                            <SelectItem value="15k-25k">
                              $15,000 - $25,000
                            </SelectItem>
                            <SelectItem value="25k-35k">
                              $25,000 - $35,000
                            </SelectItem>
                            <SelectItem value="35k-50k">
                              $35,000 - $50,000
                            </SelectItem>
                            <SelectItem value="50k-plus">$50,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanTerm">Preferred Loan Term</Label>
                        <Select
                          value={formData.loanTerm}
                          onValueChange={(value) =>
                            handleInputChange('loanTerm', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                            <SelectItem value="72">72 months</SelectItem>
                            <SelectItem value="84">84 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Tell us about any special circumstances or questions..."
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
                    <CreditCard className="h-5 w-5 mr-2" />
                    Get Pre-Approved
                  </Button>
                </form>
              </Card>
            </div>

            {/* Benefits & Features */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-accent border-accent">
                  Why Choose Our Financing
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Financing Benefits
                </h2>
                <p className="text-lg text-muted-foreground">
                  We work with multiple lenders to get you the best rates and
                  terms. Our financing specialists are here to help you find the
                  perfect loan for your situation.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Percent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Competitive Rates
                      </h3>
                      <p className="text-muted-foreground">
                        We work with multiple lenders to secure competitive
                        interest rates. Rates starting as low as 2.9% APR for
                        qualified buyers.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Quick Approval
                      </h3>
                      <p className="text-muted-foreground">
                        Get pre-approved in minutes with our online application.
                        Most approvals are processed within 24 hours.
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
                        All Credit Types
                      </h3>
                      <p className="text-muted-foreground">
                        We work with customers of all credit types, including
                        first-time buyers, bad credit, and no credit situations.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Expert Guidance
                      </h3>
                      <p className="text-muted-foreground">
                        Our financing specialists will guide you through the
                        entire process and help you understand all your options.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Special Financing</h3>
                </div>
                <p className="text-muted-foreground">
                  First-time buyers get special rates and terms. Military
                  personnel and recent graduates also qualify for exclusive
                  financing programs.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Learn About Special Programs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Financing Options
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Available Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a variety of financing programs to meet your needs and
              budget. Choose the option that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Bank Financing</h3>
                </div>
                <p className="text-muted-foreground">
                  Traditional bank loans with competitive rates and flexible
                  terms. Perfect for customers with good to excellent credit.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Rates from 2.9% APR</li>
                  <li>Terms up to 84 months</li>
                  <li>No prepayment penalties</li>
                  <li>Online account management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Credit Union Loans</h3>
                </div>
                <p className="text-muted-foreground">
                  Credit union financing often offers lower rates and more
                  personalized service. Great option for members.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Lower rates for members</li>
                  <li>Flexible payment options</li>
                  <li>Personalized service</li>
                  <li>Member benefits</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Car className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">
                    Manufacturer Programs
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Special manufacturer financing programs with incentives and
                  promotional rates for qualified buyers.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Promotional rates</li>
                  <li>Cash incentives</li>
                  <li>Extended warranties</li>
                  <li>Special terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Subprime Lending</h3>
                </div>
                <p className="text-muted-foreground">
                  Specialized programs for customers with credit challenges. We
                  work with subprime lenders to get you approved.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Bad credit accepted</li>
                  <li>No credit history OK</li>
                  <li>Higher down payments</li>
                  <li>Credit rebuilding</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">First-Time Buyers</h3>
                </div>
                <p className="text-muted-foreground">
                  Special programs designed for first-time car buyers with
                  educational resources and flexible terms.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Educational resources</li>
                  <li>Lower down payments</li>
                  <li>Flexible terms</li>
                  <li>Mentorship program</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Military & Veterans</h3>
                </div>
                <p className="text-muted-foreground">
                  Exclusive financing programs for active military, veterans,
                  and their families with special rates and benefits.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Special military rates</li>
                  <li>Deployment protection</li>
                  <li>VA loan benefits</li>
                  <li>Military discounts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-accent border-accent">
              Payment Calculator
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Estimate Your Payment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use our payment calculator to estimate your monthly payment based
              on vehicle price, down payment, and loan terms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-primary">
                      Calculate Payment
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="calcPrice">Vehicle Price</Label>
                        <Input
                          id="calcPrice"
                          type="number"
                          placeholder="Enter vehicle price"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calcDown">Down Payment</Label>
                        <Input
                          id="calcDown"
                          type="number"
                          placeholder="Enter down payment"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calcTerm">Loan Term (months)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                            <SelectItem value="72">72 months</SelectItem>
                            <SelectItem value="84">84 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calcRate">Interest Rate (%)</Label>
                        <Input
                          id="calcRate"
                          type="number"
                          step="0.1"
                          placeholder="Enter interest rate"
                        />
                      </div>
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate Payment
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-primary">
                      Payment Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="font-semibold">Monthly Payment</span>
                        <span className="text-2xl font-bold text-primary">
                          $XXX
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="font-semibold">Total Interest</span>
                        <span className="text-lg text-muted-foreground">
                          $XXX
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="font-semibold">Total Amount</span>
                        <span className="text-lg text-muted-foreground">
                          $XXX
                        </span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> This is an estimate. Actual
                          rates and terms may vary based on credit approval and
                          lender requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to Get Pre-Approved?</h2>
            <p className="text-xl text-primary-foreground/90">
              Start your financing application today or contact our financing
              specialists for personalized assistance. We're here to help you
              get the best rates and terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call +9715083633902
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Consultation
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
