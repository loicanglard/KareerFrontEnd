import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactSection = (): JSX.Element => {
  // State for contact form
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  // Handle contact form input changes
  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle subject selection
  const handleSubjectChange = (value: string) => {
    setContactForm(prev => ({ ...prev, subject: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! We'll get back to you soon.");
    
    // Reset form
    setContactForm({
      fullName: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  // Handle social media clicks
  const handleSocialClick = (platform: string) => {
    console.log(`Clicked on ${platform} icon`);
    // In a real app, this would navigate to social media pages
  };

  // Contact information data
  const contactInfo = [
    {
      icon: <MailIcon className="w-5 h-5" />,
      title: "Email",
      value: "contact@genkreer.org",
    },
    {
      icon: <PhoneIcon className="w-5 h-5" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <MapPinIcon className="w-5 h-5" />,
      title: "Address",
      value: "123 Innovation Street, Tech City, CA 94103",
    },
  ];

  // Office hours data
  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  // Social media data
  const socialMedia = [
    { icon: <FacebookIcon className="w-5 h-5" />, platform: "Facebook" },
    { icon: <TwitterIcon className="w-5 h-5" />, platform: "Twitter" },
    { icon: <LinkedinIcon className="w-5 h-5" />, platform: "LinkedIn" },
    { icon: <InstagramIcon className="w-5 h-5" />, platform: "Instagram" },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "What is Kareer and how does it work?",
      answer:
        "Kareer is an AI-powered career assistant that helps students create professional CVs, prepare for interviews, and track job applications. It works by conducting an AI interview to understand your background and goals, then generates tailored career documents and provides ongoing feedback.",
    },
    {
      question: "Is Kareer free for students?",
      answer:
        "Kareer offers a free basic plan for all students. Many universities also partner with us to provide premium features to their students at no cost. Check if your school is a partner or contact your career services office.",
    },
    {
      question: "How do I get started with Kareer?",
      answer:
        "Getting started is easy! Simply sign up with your email (preferably your university email), complete the AI interview about your background and career goals, and you'll be ready to generate your first CV or cover letter.",
    },
    {
      question: "How can schools or universities partner with Kareer?",
      answer:
        "We offer special partnership programs for educational institutions. Contact our team at partnerships@genkreer.org to learn about our school integration options, analytics dashboard, and special pricing for educational institutions.",
    },
  ];

  // Footer links data
  const footerLinks = {
    product: ["Features", "How It Works", "Pricing", "For Schools"],
    company: ["About Us", "Careers", "Blog", "Contact"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  };

  return (
    <section id="contact" className="w-full bg-white">
      <div className="container mx-auto py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-5xl text-slate-800 font-['Montserrat',Helvetica] mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-slate-500 font-['Inter',Helvetica] max-w-[700px] mx-auto">
            Have questions or need assistance? We're here to help you with any
            inquiries about Kareer.
          </p>
        </div>

        {/* Contact Form and Information */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Contact Form */}
          <Card className="flex-1 shadow-[0px_16px_60px_#0000000f] rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-800 font-['Montserrat',Helvetica]">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                    Full Name
                  </label>
                  <Input
                    name="fullName"
                    placeholder="Enter your name"
                    className="h-12 bg-slate-50 border-slate-200"
                    value={contactForm.fullName}
                    onChange={handleContactFormChange}
                    required
                  />
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 bg-slate-50 border-slate-200"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    required
                  />
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                    Subject
                  </label>
                  <Select
                    value={contactForm.subject}
                    onValueChange={handleSubjectChange}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    className="h-[120px] bg-slate-50 border-slate-200"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 rounded-lg shadow-[0px_4px_12px_#3b82f640] bg-gradient-to-b from-[rgba(59,130,246,1)] to-[rgba(37,99,235,1)] mt-6"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="w-full md:w-[360px] space-y-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-800 font-['Montserrat',Helvetica]">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#3b82f610] rounded-[20px]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-500 font-['Inter',Helvetica]">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 font-['Montserrat',Helvetica]">
                Office Hours
              </h3>

              <div className="space-y-4">
                {officeHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-slate-800 font-['Inter',Helvetica]">
                      {item.day}
                    </span>
                    <span className="text-sm text-slate-500 font-['Inter',Helvetica]">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 font-['Montserrat',Helvetica]">
                Follow Us
              </h3>

              <div className="flex items-center gap-4">
                {socialMedia.map((item, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-[20px] cursor-pointer hover:bg-slate-100"
                    onClick={() => handleSocialClick(item.platform)}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-10 mb-16">
          <h2 className="text-4xl font-bold text-slate-800 text-center font-['Montserrat',Helvetica] mb-10">
            Frequently Asked Questions
          </h2>

          <Accordion type="multiple" className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-[0px_4px_20px_#0000000a] border-none"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-normal text-slate-800 font-['Inter',Helvetica] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-base text-slate-500 font-['Inter',Helvetica] leading-[25.6px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-[60px] px-[120px] rounded-none w-full">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            {/* Company Info */}
            <div className="w-full md:w-[200px] space-y-4">
              <h3 className="text-lg font-bold font-['Montserrat',Helvetica]">
                Kareer
              </h3>
              <div className="h-[22px]"></div>
              <p className="text-sm text-slate-400 font-['Inter',Helvetica]">
                Your AI-powered career assistant that helps students create
                professional CVs and land their dream jobs.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex gap-20">
              {/* Product Links */}
              <div className="space-y-4">
                <h4 className="text-sm text-white font-['Inter',Helvetica]">
                  Product
                </h4>
                {footerLinks.product.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-slate-400 font-['Inter',Helvetica] hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigating to ${link} page`);
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Company Links */}
              <div className="space-y-4">
                <h4 className="text-sm text-white font-['Inter',Helvetica]">
                  Company
                </h4>
                {footerLinks.company.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-slate-400 font-['Inter',Helvetica] hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigating to ${link} page`);
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="space-y-4">
                <h4 className="text-sm text-white font-['Inter',Helvetica]">
                  Legal
                </h4>
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-slate-400 font-['Inter',Helvetica] hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigating to ${link} page`);
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-5 flex items-center justify-between border-b border-[#ffffff20]">
            <p className="text-sm text-slate-400 font-['Inter',Helvetica]">
              © 2023 Kareer. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialMedia.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-slate-400 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSocialClick(item.platform);
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};