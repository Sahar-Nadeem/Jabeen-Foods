import { Phone, MapPin, Mail, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+923372156080",
    href: "tel:+923372156080",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+923372156080",
    href: "https://wa.me/923372156080",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Nagori Al Ghaffar Housing Society Malir, Block-C, Anaya Heights, Flat No. S-6, Karachi",
    href: "https://maps.app.goo.gl/vZCgZVtvdJh5aR3EA",
  },
  {
    icon: Mail,
    title: "Email",
    value: "jabeenfoods@gmail.com",
    href: "mailto:jabeenfoods@gmail.com",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 sm:w-20 bg-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">CONTACT US</h2>
            <div className="h-px w-12 sm:w-20 bg-primary" />
          </div>
          <p className="text-muted-foreground text-lg">Get in touch with us</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{info.title}</h3>
                <Link
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {info.value}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Opening Hours & CTA */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl mb-2">Opening Hours</h3>
                <p className="text-muted-foreground">Monday - Sunday</p>
                <p className="text-primary font-semibold text-lg">12:00 PM - 12:00 AM</p>
              </div>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/80 rounded-full px-8 py-6 transition-all duration-300"
              >
                <Link href="https://wa.me/923372156080" target="_blank">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order on WhatsApp
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
