"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesBar } from "@/components/features-bar"
import { MenuSection } from "@/components/menu-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { CheckoutModal } from "@/components/checkout-modal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesBar />
      <MenuSection />
      <AboutSection />
      <WhyChooseUs />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <CartSidebar />
      <CheckoutModal />
    </main>
  )
}
