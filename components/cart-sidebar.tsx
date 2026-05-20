"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export function CartSidebar() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    openCheckout,
  } = useCart()

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isCartOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
              {totalItems > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-card rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm">
                  Add some delicious items from our menu!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-card rounded-xl border border-border animate-in slide-in-from-right duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground capitalize mb-1">
                        {item.size === "half" ? "Half Pack" : "Full Pack"}
                      </p>
                      <p className="text-primary font-bold">Rs. {item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-destructive/20 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                      <div className="flex items-center gap-2 bg-background rounded-full border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-card rounded-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-foreground" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-card rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-primary">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Delivery charges will be calculated at checkout
              </p>
              <Button
                onClick={openCheckout}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 rounded-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
