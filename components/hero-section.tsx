import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Eye } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />
      
      {/* Background image */}
     <div className="relative w-full h-[300px] md:absolute md:inset-0 md:-z-10 md:h-full">
  <Image
    src="/images/hero-food.jpg"
    alt="Delicious food"
    fill
    className="object-cover object-center opacity-90 md:opacity-60"
    priority
  />
</div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="space-y-8 py-12">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">WHERE EVERY</span>
                <br />
                <span className="text-foreground">BITE FEELS</span>
                <br />
                <span className="text-primary italic">LIKE HOME</span>
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-md leading-relaxed">
                Delicious, freshly made food crafted with love and the finest ingredients.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Link href="#menu">
                  <Eye className="w-5 h-5 mr-2" />
                  View Menu
                </Link>
              </Button>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 transition-all duration-300"
              >
                <Link href="https://wa.me/923372156080" target="_blank">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-xl aspect-square">
              <Image
                src="/images/hero-food.jpg"
                alt="Featured dish"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
