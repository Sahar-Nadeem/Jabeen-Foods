"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle, MapPin, User, Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/context/cart-context"

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Gujranwala",
  "Other",
]

export function CheckoutModal() {
  const { items, isCheckoutOpen, closeCheckout, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  })

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isCheckoutOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }))
  }

  const isFormValid = formData.name && formData.phone && formData.address && formData.city

  const handlePlaceOrder = () => {
    if (!isFormValid) return
    
    setIsSubmitting(true)

    // Build WhatsApp message
    let message = `*New Order from Jabeen Foods Website*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${formData.name}\n`
    message += `Phone: ${formData.phone}\n`
    message += `City: ${formData.city}\n`
    message += `Address: ${formData.address}\n\n`
    message += `*Order Details:*\n`
    message += `────────────────\n`

    items.forEach((item) => {
      const packType = item.size === "half" ? "Half Pack" : "Full Pack"
      message += `${item.name} (${packType})\n`
      message += `Qty: ${item.quantity} x Rs. ${item.price} = Rs. ${item.price * item.quantity}\n\n`
    })

    message += `────────────────\n`
    message += `*Total: Rs. ${totalPrice.toLocaleString()}*\n`
    message += `────────────────\n\n`
    message += `Please confirm this order. Thank you!`

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/923372156080?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form and cart after a short delay
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      closeCheckout()
      setFormData({ name: "", phone: "", address: "", city: "" })
    }, 1000)
  }

  if (!isCheckoutOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={closeCheckout}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Checkout</h2>
            <button
              onClick={closeCheckout}
              className="p-2 hover:bg-card rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} ({item.size === "half" ? "Half" : "Full"}) x{item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Delivery Details</h3>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-card border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX"
                  className="bg-card border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  City
                </Label>
                <Select value={formData.city} onValueChange={handleCityChange}>
                  <SelectTrigger className="bg-card border-border focus:border-primary">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete delivery address"
                  rows={3}
                  className="bg-card border-border focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/80 rounded-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Place Order via WhatsApp
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By placing this order, you will be redirected to WhatsApp to confirm your order with our team.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
