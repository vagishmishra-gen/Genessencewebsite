import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      expertise: "Machine Learning & Neural Networks",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
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
      name: "Marcus Rodriguez",
      role: "Head of Implementation",
      expertise: "Enterprise Integration & DevOps",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
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
      name: "Emily Watson",
      role: "Data Science Director",
      expertise: "Predictive Analytics & Business Intelligence",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
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
      name: "David Kim",
      role: "Customer Success Lead",
      expertise: "Client Relations & Training",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers?.map((member, index) => (
            <motion.div
              key={member?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMember(member?.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={member?.image}
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="flex space-x-2">
                      <a
                        href={member?.linkedin}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <Icon name="Linkedin" size={16} color="white" />
                      </a>
                      <a
                        href={member?.twitter}
                        className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Icon name="Twitter" size={16} color="white" />
                      </a>
                    </div>
                  </motion.div>
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
                  <div className="flex items-center justify-center space-x-2 text-xs text-secondary">
                    <Icon name="Award" size={14} />
                    <span>{member?.experience}</span>
                  </div>
                </div>

                {/* Hover Details */}
                <motion.div
                  className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-2xl p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
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
                </motion.div>
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
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {[
            { number: "50+", label: "Years Combined Experience", icon: "Clock" },
            { number: "200+", label: "Successful Projects", icon: "CheckCircle" },
            { number: "15+", label: "Industry Certifications", icon: "Award" },
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
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Hear what our clients say about working with our expert team
            </p>
            <button
              onClick={scrollToTestimonials}
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors cta-shadow"
            >
              <span>Read Client Stories</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;