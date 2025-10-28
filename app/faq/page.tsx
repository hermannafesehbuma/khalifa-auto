import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  Car,
  CreditCard,
  Shield,
  Wrench,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function FAQ() {
  const faqCategories = [
    {
      title: 'General Questions',
      icon: HelpCircle,
      questions: [
        {
          question: 'What makes Khalifa Auto different from other dealerships?',
          answer:
            'Khalifa Auto stands out through our commitment to transparency, quality, and customer service. Every vehicle undergoes our rigorous 150-point inspection, we provide full vehicle history reports, offer competitive pricing with no hidden fees, and maintain a 98% customer satisfaction rate. Our experienced team is dedicated to helping you find the perfect vehicle within your budget.',
        },
        {
          question: 'Do you offer warranties on used vehicles?',
          answer:
            'Yes! All our vehicles come with warranties. Our certified pre-owned vehicles include extended manufacturer warranties, while other vehicles come with our comprehensive warranty coverage. We also offer extended warranty options for additional peace of mind. All warranty details are clearly explained before purchase.',
        },
        {
          question: 'What is your return policy?',
          answer:
            'We offer a 3-day return policy on all vehicles, subject to mileage and condition restrictions. The vehicle must be returned in the same condition as when purchased, with no more than 300 miles added. This policy gives you peace of mind and confidence in your purchase decision.',
        },
        {
          question: 'Do you provide vehicle history reports?',
          answer:
            'Absolutely! We provide free CarFax or AutoCheck reports for every vehicle in our inventory. These reports include accident history, service records, previous owners, and more. We believe in complete transparency and want you to make an informed decision.',
        },
      ],
    },
    {
      title: 'Vehicle Inventory',
      icon: Car,
      questions: [
        {
          question: 'How often do you update your inventory?',
          answer:
            'We update our inventory daily with new arrivals. Our website is refreshed every few hours to show the most current selection. We typically have 500+ vehicles in stock across all categories including sedans, SUVs, trucks, and luxury vehicles.',
        },
        {
          question: 'Do you have vehicles under $15,000?',
          answer:
            'Yes! We maintain a dedicated section of quality vehicles under $15,000. These vehicles undergo the same rigorous inspection process and come with warranties. We believe everyone deserves access to reliable transportation regardless of budget.',
        },
        {
          question: 'What brands do you carry?',
          answer:
            'We carry vehicles from all major manufacturers including Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz, Audi, Lexus, Nissan, Hyundai, Kia, and many more. Our inventory includes both domestic and import vehicles across all price ranges.',
        },
        {
          question: 'Can I reserve a vehicle before visiting?',
          answer:
            'Yes! You can place a 24-hour hold on any vehicle by calling us or using our online reservation system. This ensures the vehicle is available when you visit. We recommend scheduling a test drive appointment for the best experience.',
        },
      ],
    },
    {
      title: 'Financing & Payment',
      icon: CreditCard,
      questions: [
        {
          question: 'What financing options do you offer?',
          answer:
            'We work with multiple lenders to offer competitive financing options for all credit situations. Options include traditional bank financing, credit union loans, manufacturer financing programs, and special promotions. We also offer pre-approval online to streamline your visit.',
        },
        {
          question: 'Do you work with bad credit or no credit?',
          answer:
            "Yes! We specialize in helping customers with various credit situations. Our finance team works with subprime lenders and has programs specifically designed for customers with bad credit, no credit, or bankruptcy. We're committed to finding solutions that work for you.",
        },
        {
          question: 'What down payment is required?',
          answer:
            'Down payment requirements vary based on credit score, vehicle price, and lender requirements. We offer programs with low or no down payment options for qualified buyers. Our finance team will work with you to find the best terms based on your situation.',
        },
        {
          question: 'Can I get pre-approved for financing?',
          answer:
            'Absolutely! You can get pre-approved online in minutes or by calling our finance department. Pre-approval gives you a clear budget and makes the buying process faster. It also helps us prepare the best financing options before you visit.',
        },
        {
          question: 'Do you accept trade-ins?',
          answer:
            'Yes! We accept trade-ins for all makes and models, regardless of where you purchased them. We offer competitive trade-in values and can provide an instant appraisal online or in-person. Your trade-in can be used as a down payment.',
        },
      ],
    },
    {
      title: 'Service & Maintenance',
      icon: Wrench,
      questions: [
        {
          question: 'Do you have an on-site service center?',
          answer:
            'Yes! Our full-service automotive center is staffed with certified technicians who can service all makes and models. We offer routine maintenance, repairs, warranty work, and use only genuine parts. Our service center is open Monday through Saturday.',
        },
        {
          question: 'What maintenance services do you provide?',
          answer:
            'We provide comprehensive automotive services including oil changes, brake service, tire rotation, engine diagnostics, transmission service, air conditioning repair, and more. We also offer extended service plans for ongoing maintenance needs.',
        },
        {
          question: 'Do you offer roadside assistance?',
          answer:
            'Yes! We provide 24/7 roadside assistance for all our customers. This includes towing, jump starts, lockout service, flat tire changes, and emergency fuel delivery. Coverage details are provided with every vehicle purchase.',
        },
        {
          question: 'How do I schedule a service appointment?',
          answer:
            'You can schedule service appointments online through our website, by calling our service department at (555) 123-4567, or by visiting our service center. We also offer same-day appointments when available.',
        },
      ],
    },
    {
      title: 'Purchase Process',
      icon: FileText,
      questions: [
        {
          question: 'How long does the buying process take?',
          answer:
            "The entire process typically takes 2-4 hours, depending on financing requirements and paperwork. We've streamlined our process to be as efficient as possible while ensuring you understand everything about your purchase.",
        },
        {
          question: 'What documents do I need to bring?',
          answer:
            "Required documents include a valid driver's license, proof of insurance, proof of income (pay stubs or tax returns), and proof of residence. If trading in a vehicle, bring the title and registration. We'll provide a complete checklist when you schedule your visit.",
        },
        {
          question: 'Can I test drive vehicles?',
          answer:
            'Absolutely! We encourage test drives for all vehicles. You can schedule a test drive appointment or walk in during business hours. Our sales team will accompany you and answer any questions about the vehicle during the test drive.',
        },
        {
          question: 'Do you offer delivery services?',
          answer:
            'Yes! We offer delivery services within a 50-mile radius for a small fee. This is especially convenient for customers who have completed the purchase process and want their vehicle delivered to their home or office.',
        },
      ],
    },
  ];

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
              Frequently Asked Questions
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Find Answers to
              <span className="text-accent block">Your Questions</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Get quick answers to common questions about our vehicles,
              financing options, services, and policies. Can't find what you're
              looking for? Contact us directly!
            </p>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Quick Help
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help
              with any questions about our vehicles, financing, or services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-muted-foreground">
                  Speak directly with our team
                </p>
                <div className="text-lg font-semibold text-primary">
                  (555) 123-4567
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
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">Send us your questions</p>
                <div className="text-sm font-semibold text-accent">
                  info@khalifaauto.com
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Live Chat</h3>
                <p className="text-muted-foreground">Chat with us online</p>
                <div className="text-sm text-muted-foreground">
                  Available Mon-Fri 9AM-7PM
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">Come see us in person</p>
                <div className="text-sm text-muted-foreground">
                  Mon-Fri: 9AM-7PM
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Browse by Category
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers organized by topic. Click on any question to expand
              the answer and get detailed information.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <category.icon className="h-6 w-6 text-primary" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/50">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-accent border-accent">
              Additional Resources
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              More Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore these additional resources for more detailed information
              about our policies, services, and processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">
                    Warranty Information
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Learn about our comprehensive warranty coverage, extended
                  warranty options, and what's included with every vehicle
                  purchase.
                </p>
                <Button variant="outline" className="w-full">
                  View Warranty Details
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Financing Guide</h3>
                </div>
                <p className="text-muted-foreground">
                  Get detailed information about our financing options, credit
                  requirements, and tips for getting approved.
                </p>
                <Button variant="outline" className="w-full">
                  Read Financing Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                </div>
                <p className="text-muted-foreground">
                  Read reviews from our satisfied customers and learn about
                  their experiences with Khalifa Auto.
                </p>
                <Button variant="outline" className="w-full">
                  Read Reviews
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Car className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Vehicle Inspection</h3>
                </div>
                <p className="text-muted-foreground">
                  Learn about our 150-point inspection process and what makes
                  our vehicles reliable and safe.
                </p>
                <Button variant="outline" className="w-full">
                  Learn About Inspection
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Service Center</h3>
                </div>
                <p className="text-muted-foreground">
                  Discover our full-service automotive center, services offered,
                  and how to schedule maintenance appointments.
                </p>
                <Button variant="outline" className="w-full">
                  View Services
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold">Safety Tips</h3>
                </div>
                <p className="text-muted-foreground">
                  Important safety information, maintenance tips, and guidelines
                  for safe vehicle operation.
                </p>
                <Button variant="outline" className="w-full">
                  Safety Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Still Have Questions?</h2>
            <p className="text-xl text-primary-foreground/90">
              Our friendly team is here to help! Contact us directly for
              personalized assistance with any questions about our vehicles,
              financing, or services.
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
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
