"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"

const frozenPicks = [
  {
    id: "beef-shami-kabab",
    name: "Beef Shami Kabab",
    halfPrice: 425,
    fullPrice: 850,
    priceLabel: "Rs. 425 / 850",
    image: "/images/beef-shami-kabab.jpg",
  },
  {
    id: "chicken-shami-kabab",
    name: "Chicken Shami Kabab",
    halfPrice: 350,
    fullPrice: 700,
    priceLabel: "Rs. 350 / 700",
    image: "/images/chicken-shami-kabab.jpg",
  },
  {
    id: "spring-roll",
    name: "Spring Roll",
    halfPrice: 330,
    fullPrice: 650,
    priceLabel: "Rs. 330 / 650",
    image: "/images/spring-roll.jpg",
  },
  {
    id: "noodles-roll",
    name: "Noodles Roll",
    halfPrice: 350,
    fullPrice: 700,
    priceLabel: "Rs. 350 / 700",
    image: "/images/noodles-roll.jpg",
  },
  {
    id: "chicken-cheese-bread-roll",
    name: "Chicken Cheese Bread Roll",
    halfPrice: 400,
    fullPrice: 800,
    priceLabel: "Rs. 400 / 800",
    image: "/images/chicken-cheese-bread-roll.jpg",
  },
  {
    id: "beef-qeema-samosa",
    name: "Beef Qeema Samosa",
    halfPrice: 330,
    fullPrice: 650,
    priceLabel: "Rs. 330 / 650",
    image: "/images/beef-qeema-samosa.jpg",
  },
  {
    id: "chicken-tikka-samosa",
    name: "Chicken Tikka Samosa",
    halfPrice: 360,
    fullPrice: 720,
    priceLabel: "Rs. 360 / 720",
    image: "/images/chicken-tikka-samosa.jpg",
  },
  {
    id: "malai-boti-patties",
    name: "Malai Boti Box Patties",
    halfPrice: 400,
    fullPrice: 800,
    priceLabel: "Rs. 400 / 800",
    image: "/images/Malai Boti Box Patties.png",
  },
]

const freshChutneys = [
  {
    id: "red-chutney",
    name: "Red Chutney",
    halfPrice: 200,
    fullPrice: 350,
    priceLabel: "Rs. 200 / 350",
    image: "/images/red-chutney.jpg",
  },
  {
    id: "green-chutney",
    name: "Green Chutney",
    halfPrice: 200,
    fullPrice: 350,
    priceLabel: "Rs. 200 / 350",
    image: "/images/green-chutney.jpg",
  },
  {
    id: "khatti-meethi-chutney",
    name: "Khatti Meethi Chutney",
    halfPrice: 300,
    fullPrice: 500,
    priceLabel: "Rs. 300 / 500",
    image: "/images/khatti-meethi-chutney.jpg",
  },
]

interface MenuItemType {
  id: string
  name: string
  halfPrice: number
  fullPrice: number
  priceLabel: string
  image: string
}

interface MenuCardProps {
  item: MenuItemType
}

function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<"half" | "full">("half")
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    const price = selectedSize === "half" ? item.halfPrice : item.fullPrice
    addToCart({
      id: `${item.id}-${selectedSize}`,
      name: item.name,
      price,
      priceLabel: item.priceLabel,
      image: item.image,
      size: selectedSize,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const currentPrice = selectedSize === "half" ? item.halfPrice : item.fullPrice

  return (
    <Card className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1">{item.name}</h3>
          
          {/* Size Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSize("half")}
              className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedSize === "half"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              Half
            </button>
            <button
              onClick={() => setSelectedSize("full")}
              className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedSize === "full"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              Full
            </button>
          </div>

          <p className="text-primary font-bold text-lg">Rs. {currentPrice}</p>
          
          <Button
            onClick={handleAddToCart}
            className={`w-full rounded-full text-sm transition-all duration-300 ${
              isAdded
                ? "bg-green-600 hover:bg-green-600 text-white"
                : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added!
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MenuSection() {
  return (
    <section id="menu" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 sm:w-20 bg-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">OUR MENU</h2>
            <div className="h-px w-12 sm:w-20 bg-primary" />
          </div>
          <p className="text-muted-foreground text-lg">A variety of delicious options just for you</p>
        </div>

        {/* Frozen Picks */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">Frozen Picks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {frozenPicks.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Fresh Chutneys */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">Fresh Chutneys</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {freshChutneys.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
