import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SlidingCTA from '../../../components/ui/SlidingCTA';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Krishna Saxena",
      role: "Founder",
      expertise: "Strategy Management",
      experience: "4+ years",
      image: "/assets/images/krishna.jpeg",
      credentials: [
        "PhD in Computer Science, Stanford",
        "Former Google AI Research Lead",
        "50+ published research papers",
        "TED Speaker on AI Ethics"
      ],
      achievements: [
        "Led AI transformation for Fortune 500 companies",
        "Developed proprietary ML algorithms",
        "Winner of AI Innovation Award 2023"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 2,
      name: "Shrey Mishra",
      role: "Founder",
      expertise: "Data Scientist",
      experience: "3+ Years",
      image: "/assets/images/shrey.jpeg",
      credentials: [
        "MS in Software Engineering, MIT",
        "AWS Certified Solutions Architect",
        "Kubernetes Expert Certification",
        "Agile & Scrum Master"
      ],
      achievements: [
        "Zero-downtime deployments for 100+ clients",
        "Reduced implementation time by 60%",
        "Built scalable AI infrastructure"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 3,
      name: "Sagar Maurya",
      role: "Founder",
      expertise: "Operation Management",
      experience: "4+ years",
      image: "/assets/images/sagar.jpeg",
      credentials: [
        "PhD in Statistics, Harvard",
        "Former McKinsey Data Consultant",
        "Certified Data Scientist",
        "Published author on AI applications"
      ],
      achievements: [
        "Delivered $50M+ in measurable ROI",
        "Created predictive models with 95% accuracy",
        "Keynote speaker at Data Science Summit"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 4,
      name: "Vagish Mishra",
      role: "Developer",
      expertise: "FullStack developer",
      experience: "3+ Years",
      image: "/assets/images/vagish.jpeg",
      credentials: [
        "MBA in Business Strategy, Wharton",
        "Certified Customer Success Manager",
        "Six Sigma Black Belt",
        "Fluent in 4 languages"
      ],
      achievements: [
        "Maintained 95% client satisfaction rate",
        "Reduced onboarding time by 40%",
        "Built comprehensive training programs"
      ],
      linkedin: "#",
      twitter: "#"
    }
  ];

  const scrollToTestimonials = () => {
    const element = document.getElementById('testimonials');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            World-class AI experts with proven track records in transforming enterprise operations
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16 items-stretch">
          {teamMembers?.map((member, index) => (
            <motion.div
              key={member?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={member?.image}
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Hover Overlay removed */}
                  <div
                    className="hidden"
                  >
                    <div className="flex space-x-2">
                      <a
                        href={member?.linkedin}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Icon name="Linkedin" size={16} color="white" />
                      </a>
                      <a
                        href={member?.twitter}
                        className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center"
                      >
                        <Icon name="Twitter" size={16} color="white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member?.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member?.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {member?.expertise}
                  </p>
                  {/* Experience hidden as requested */}
                </div>

                {/* Hover Details removed */}
                <div
                  className="hidden mt-auto"
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Credentials</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground mb-4">
                        {member?.credentials?.slice(0, 3)?.map((credential, idx) => (
                          <li key={idx} className="flex items-start">
                            <Icon name="Check" size={12} className="text-primary mr-1 mt-0.5 flex-shrink-0" />
                            {credential}
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold text-foreground mb-2">Key Achievements</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {member?.achievements?.slice(0, 2)?.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <Icon name="Star" size={12} className="text-secondary mr-1 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {[
            { number: "10+", label: "Successful Projects", icon: "CheckCircle" },
            { number: "24/7", label: "Support Coverage", icon: "Headphones" }
          ]?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Work with Industry Leaders?
            </h3>
            {/* <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Hear what our clients say about working with our expert team
            </p>
            <SlidingCTA label="Read Client Stories" onClick={scrollToTestimonials} size="md" /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;