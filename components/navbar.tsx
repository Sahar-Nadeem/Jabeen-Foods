"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About Us", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <img src="/images/JABEEN FOOD-02.png" alt="Jabeen Foods" className="h-25 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-card hover:bg-card/80 border border-border rounded-full transition-all duration-300 hover:border-primary/50"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                asChild
                className="bg-card hover:bg-card/80 text-foreground border border-border rounded-full px-6"
              >
                <Link href="https://wa.me/923372156080" target="_blank">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order on WhatsApp
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                asChild
                className="bg-card hover:bg-card/80 text-foreground border border-border rounded-full w-fit"
              >
                <Link href="https://wa.me/923372156080" target="_blank">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order on WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
