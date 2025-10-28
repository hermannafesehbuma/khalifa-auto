import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  Shield,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  Users,
  Award,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Wrench,
  Zap,
  Heart,
  TrendingUp,
  Building,
  Target,
  Handshake,
  Globe,
  Award as AwardIcon,
  CheckCircle2,
  Quote,
} from 'lucide-react';

export default function About() {
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
              About Khalifa Auto
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Trusted Partner in
              <span className="text-accent block">Automotive Excellence</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              For over 15 years, Khalifa Auto has been committed to providing
              exceptional automotive experiences. We combine traditional values
              with modern innovation to deliver quality vehicles and outstanding
              customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Our Story
                </Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Building Trust Since 2008
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Khalifa Auto was founded with a simple yet powerful vision: to
                  revolutionize the used car buying experience. What started as
                  a small family business has grown into one of the region's
                  most trusted automotive dealerships.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our founder, Ahmed Khalifa, began with just a handful of
                  vehicles and an unwavering commitment to honesty and quality.
                  Today, we maintain those same core values while serving
                  thousands of satisfied customers across the region.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">
                    Years in Business
                  </div>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-3xl font-bold text-accent">10,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Cars Sold Annually
                  </div>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-3xl font-bold text-accent">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Our Showroom</h3>
                </div>
                <p className="text-muted-foreground">
                  Visit our state-of-the-art showroom featuring over 500
                  vehicles across all categories. Our modern facility includes:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">
                      Climate-controlled indoor display
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">
                      Professional detailing center
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">
                      Customer lounge with refreshments
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">On-site financing office</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">
                      Full-service maintenance center
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Our Mission & Values
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our mission and values guide every decision we make and every
              interaction we have with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide exceptional automotive experiences by offering
                  quality vehicles, transparent pricing, and outstanding
                  customer service that builds lasting relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Integrity</h3>
                <p className="text-muted-foreground">
                  We conduct business with complete honesty and transparency.
                  Every vehicle comes with full disclosure of its history,
                  condition, and pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality</h3>
                <p className="text-muted-foreground">
                  Every vehicle undergoes our rigorous 150-point inspection
                  process. We stand behind the quality of every car we sell with
                  comprehensive warranties.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Customer Care</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. We're
                  committed to providing personalized service that exceeds
                  expectations at every touchpoint.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and processes to improve our
                  service delivery while maintaining the personal touch that
                  sets us apart.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  We're proud to be part of our local community and actively
                  support local charities, events, and initiatives that make our
                  area a better place to live.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Meet Our Team
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              The People Behind Khalifa Auto
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced team of automotive professionals is dedicated to
              helping you find the perfect vehicle and providing exceptional
              service throughout your ownership experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Ahmed Khalifa</CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With over 20 years in the automotive industry, Ahmed founded
                  Khalifa Auto with a vision to provide honest, transparent car
                  sales. His leadership continues to drive our commitment to
                  excellence.
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Certified Master Technician
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Sarah Johnson</CardTitle>
                <CardDescription>Sales Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sarah leads our sales team with 12 years of experience in
                  automotive sales. She's passionate about helping customers
                  find the perfect vehicle and ensuring a smooth buying process.
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Top Sales Performer 2023
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Mike Rodriguez</CardTitle>
                <CardDescription>Service Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mike oversees our service department with 15 years of
                  automotive repair experience. He ensures every vehicle meets
                  our high standards before it reaches our showroom.
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    ASE Certified Master Technician
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Awards Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-accent border-accent">
              Certifications & Awards
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Recognized Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry
              leaders and satisfied customers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <AwardIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">
                  Better Business Bureau
                </h3>
                <p className="text-sm text-muted-foreground">
                  A+ Rating for 10 consecutive years
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Certified Pre-Owned</h3>
                <p className="text-sm text-muted-foreground">
                  Authorized dealer for major manufacturers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Customer Choice Award</h3>
                <p className="text-sm text-muted-foreground">
                  Local Business Excellence 2023
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  ISO 9001:2015 Certified
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Customer Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about their experience with Khalifa Auto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground">
                  "Khalifa Auto made buying my first car an amazing experience.
                  The team was patient, honest, and helped me find exactly what
                  I was looking for within my budget. I couldn't be happier!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Jennifer Martinez</div>
                    <div className="text-sm text-muted-foreground">
                      First-time Buyer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground">
                  "I've been a customer for over 5 years now. They've sold me
                  three cars and serviced all of them. The quality and service
                  are consistently excellent. Highly recommend!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">David Thompson</div>
                    <div className="text-sm text-muted-foreground">
                      Returning Customer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground">
                  "The financing process was smooth and transparent. No hidden
                  fees, no surprises. They worked with my credit situation and
                  got me approved quickly. Great experience!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Verified Buyer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Experience the Khalifa Auto Difference
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Ready to experience our commitment to excellence? Visit our
              showroom today or contact us to learn more about how we can help
              you find your perfect vehicle.
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
                <MapPin className="h-5 w-5 mr-2" />
                Visit Our Showroom
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
