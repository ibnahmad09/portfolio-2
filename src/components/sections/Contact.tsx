"use client";
import { useState } from "react";
import { socialLinks } from "@/lib/data";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "instagram":
        return Instagram;
      case "mail":
        return Mail;
      default:
        return Mail;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent! Thank you for reaching out.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Hubungi Saya</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                 Nama 
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border form-input text-foreground"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border form-input text-foreground"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Pesan  
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border form-input text-foreground resize-none"
                placeholder="Tulis pesanmu di sini..."
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary px-8 py-4 rounded-lg font-medium text-white focus-ring"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-muted mb-6">Or connect with me on:</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => {
                const IconComponent = getIconComponent(link.icon);
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className="group relative p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}