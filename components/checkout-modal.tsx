"use client"

import { useState, useEffect, useMemo } from "react"
import { X, MessageCircle, MapPin, User, Phone, Loader2, Truck, Info } from "lucide-react"
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

// Karachi delivery areas with pricing based on distance from Malir
const deliveryAreas = {
  // Nearby areas - Rs. 100
  nearby: {
    charge: 100,
    areas: [
      "Malir",
      "Malir Cantt",
      "Saudabad",
      "Model Colony",
      "Quaidabad",
      "Landhi",
      "Korangi",
      "Shah Faisal Colony",
      "Drigh Road",
      "Kala Board",
      "Malir Halt",
      "Jinnah Intl Airport Area",
    ],
  },
  // Medium distance - Rs. 200
  medium: {
    charge: 200,
    areas: [
      "Gulshan-e-Iqbal",
      "Gulistan-e-Johar",
      "PECHS",
      "Tariq Road",
      "Bahadurabad",
      "Gulshan-e-Maymar",
      "Federal B Area",
      "Nazimabad",
      "North Nazimabad",
      "Liaquatabad",
      "Ancholi",
      "Buffer Zone",
      "Safoora Goth",
      "University Road",
      "Karachi University",
      "NED University Area",
      "Rashid Minhas Road",
    ],
  },
  // Far areas - Rs. 300
  far: {
    charge: 300,
    areas: [
      "DHA Phase 1",
      "DHA Phase 2",
      "DHA Phase 4",
      "DHA Phase 5",
      "DHA Phase 6",
      "DHA Phase 7",
      "DHA Phase 8",
      "Clifton",
      "Bath Island",
      "Sea View",
      "Zamzama",
      "Khayaban-e-Seher",
      "Boat Basin",
      "North Karachi",
      "Surjani Town",
      "Orangi Town",
      "New Karachi",
      "Sachal Goth",
      "Scheme 33",
      "Gadap Town",
      "Superhighway",
      "Bin Qasim",
      "Port Qasim",
      "Mauripur",
      "Kemari",
      "Lyari",
      "Saddar",
      "I.I. Chundrigar Road",
      "Burns Garden",
      "Garden",
      "Soldier Bazaar",
    ],
  },
  // Very far - Rs. 500
  veryFar: {
    charge: 500,
    areas: [
      "Bahria Town Karachi",
      "Bahria Paradise",
      "Bahria Midway Commercial",
      "Super Highway (Beyond Toll Plaza)",
      "ASF City",
      "DHA City Karachi",
    ],
  },
}

// Flatten all areas into a single array with their charges
const allAreas = [
  ...deliveryAreas.nearby.areas.map((area) => ({ name: area, charge: deliveryAreas.nearby.charge, zone: "nearby" })),
  ...deliveryAreas.medium.areas.map((area) => ({ name: area, charge: deliveryAreas.medium.charge, zone: "medium" })),
  ...deliveryAreas.far.areas.map((area) => ({ name: area, charge: deliveryAreas.far.charge, zone: "far" })),
  ...deliveryAreas.veryFar.areas.map((area) => ({ name: area, charge: deliveryAreas.veryFar.charge, zone: "veryFar" })),
].sort((a, b) => a.name.localeCompare(b.name))

export function CheckoutModal() {
  const { items, isCheckoutOpen, closeCheckout, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
  })

  // Calculate delivery charge based on selected area
  const deliveryCharge = useMemo(() => {
    if (!formData.area) return 0
    const selectedArea = allAreas.find((a) => a.name === formData.area)
    return selectedArea?.charge || 0
  }, [formData.area])

  // Calculate grand total
  const grandTotal = totalPrice + deliveryCharge

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

  const handleAreaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, area: value }))
  }

  const isFormValid = formData.name && formData.phone && formData.address && formData.area

  const handlePlaceOrder = () => {
    if (!isFormValid) return

    setIsSubmitting(true)

    // Build WhatsApp message
    let message = `*New Order from Jabeen Foods Website*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${formData.name}\n`
    message += `Phone: ${formData.phone}\n`
    message += `Area: ${formData.area}, Karachi\n`
    message += `Address: ${formData.address}\n\n`
    message += `*Order Details:*\n`
    message += `────────────────\n`

    items.forEach((item) => {
      const packType = item.size === "half" ? "Half Pack" : "Full Pack"
      message += `${item.name} (${packType})\n`
      message += `Qty: ${item.quantity} x Rs. ${item.price} = Rs. ${item.price * item.quantity}\n\n`
    })

    message += `────────────────\n`
    message += `Subtotal: Rs. ${totalPrice.toLocaleString()}\n`
    message += `Delivery (${formData.area}): Rs. ${deliveryCharge}\n`
    message += `────────────────\n`
    message += `*Grand Total: Rs. ${grandTotal.toLocaleString()}*\n`
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
      setFormData({ name: "", phone: "", address: "", area: "" })
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
            {/* Delivery Notice */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary">Delivery Available Only in Karachi</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We deliver from Nagori Al Ghaffar Housing Society, Malir Block-C, Karachi
                </p>
              </div>
            </div>

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

              {/* Pricing Breakdown */}
              <div className="border-t border-border mt-3 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Delivery Charges
                  </span>
                  <span className={`font-medium transition-all duration-300 ${deliveryCharge > 0 ? "text-accent" : "text-muted-foreground"}`}>
                    {deliveryCharge > 0 ? `Rs. ${deliveryCharge}` : "Select area"}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold text-foreground">Grand Total</span>
                  <span className="font-bold text-primary text-lg">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
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
                <Label htmlFor="area" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Area (Karachi)
                </Label>
                <Select value={formData.area} onValueChange={handleAreaChange}>
                  <SelectTrigger className="bg-card border-border focus:border-primary">
                    <SelectValue placeholder="Select your area in Karachi" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border max-h-60">
                    <div className="px-2 py-1.5 text-xs font-semibold text-accent bg-accent/10 sticky top-0">
                      Nearby Areas - Rs. 100
                    </div>
                    {deliveryAreas.nearby.areas.map((area) => (
                      <SelectItem key={area} value={area} className="pl-4">
                        {area}
                      </SelectItem>
                    ))}
                    <div className="px-2 py-1.5 text-xs font-semibold text-accent bg-accent/10 sticky top-0 mt-1">
                      Medium Distance - Rs. 200
                    </div>
                    {deliveryAreas.medium.areas.map((area) => (
                      <SelectItem key={area} value={area} className="pl-4">
                        {area}
                      </SelectItem>
                    ))}
                    <div className="px-2 py-1.5 text-xs font-semibold text-accent bg-accent/10 sticky top-0 mt-1">
                      Far Areas - Rs. 300
                    </div>
                    {deliveryAreas.far.areas.map((area) => (
                      <SelectItem key={area} value={area} className="pl-4">
                        {area}
                      </SelectItem>
                    ))}
                    <div className="px-2 py-1.5 text-xs font-semibold text-accent bg-accent/10 sticky top-0 mt-1">
                      Extended Areas - Rs. 500
                    </div>
                    {deliveryAreas.veryFar.areas.map((area) => (
                      <SelectItem key={area} value={area} className="pl-4">
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.area && (
                  <p className="text-xs text-accent animate-in fade-in slide-in-from-top-1 duration-200">
                    Delivery charge for {formData.area}: Rs. {deliveryCharge}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Complete Delivery Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House/Flat No, Street, Block, Landmark..."
                  rows={3}
                  className="bg-card border-border focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Delivery Charges Info */}
            <div className="bg-card/50 rounded-xl p-4 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                Delivery Charges Guide
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nearby (Malir area)</span>
                  <span className="text-accent font-medium">Rs. 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medium (Gulshan, Johar)</span>
                  <span className="text-accent font-medium">Rs. 200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Far (DHA, Clifton)</span>
                  <span className="text-accent font-medium">Rs. 300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extended (Bahria)</span>
                  <span className="text-accent font-medium">Rs. 500</span>
                </div>
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
                  Place Order - Rs. {grandTotal.toLocaleString()}
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
