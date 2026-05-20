import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Phone, MapPin, Mail } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About Us", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1Hyomb8Swe/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jabeen_foods?igsh=MnhtaWN5b200MWg5&utm_source=qr", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/923372156080", label: "WhatsApp" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-auto h-21 rounded-full bg-primary/20 flex items-center justify-center">
                <img src="/images/JABEEN FOOD-02.png" alt="Jabeen Foods" className="h-21 w-auto" />
              </div>
              <h3 className="text-primary font-bold text-xl">JABEEN FOODS</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Serving delicious food with love. Thank you for choosing us!
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">CONTACT US</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>03372156080</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>03372156080</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Nagori Al Ghaffar Housing Society Malir, Block-C, Anaya Heights, Flat No. S-6, Karachi</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>jabeenfoods@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">OPENING HOURS</h4>
            <p className="text-muted-foreground text-sm mb-2">Monday - Sunday</p>
            <p className="text-primary font-semibold">12:00 PM - 12:00 AM</p>
            <Link
              href="https://wa.me/923372156080"
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 bg-accent text-accent-foreground px-6 py-3 rounded-full hover:bg-accent/80 transition-all duration-300 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Jabeen Foods. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
