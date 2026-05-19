import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">ABOUT US</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Jabeen Foods is all about serving delicious, hygienic and quality food that you love. 
              We believe in great taste, generous portions, and happy customers.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our frozen picks are carefully crafted with premium ingredients, ensuring you get restaurant-quality 
              taste in the comfort of your home. From our signature Shami Kababs to our flavorful Samosas, 
              every bite is a testament to our commitment to quality.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 transition-all duration-300"
            >
              <Link href="#contact">
                Learn More About Us
              </Link>
            </Button>
          </div>

          {/* Right Content - Logo/Brand Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-card via-card to-secondary rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl border border-primary/20" />
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                {/* Logo Circle */}
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <img src="/images/jabeenlogo.jpeg" alt="Jabeen Foods" className="h-32 w-32" />    
                </div>
                {/* Brand Text */}
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold text-primary tracking-wide">JABEEN FOODS</h3>
                  <p className="text-muted-foreground text-sm tracking-widest mt-2">{'"WHERE EVERY BITE FEELS LIKE HOME"'}</p>
                </div>
                {/* Decorative elements */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
