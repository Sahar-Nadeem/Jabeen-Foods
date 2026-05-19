"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const frozenPicks = [
  {
    name: "Beef Shami Kabab",
    price: "Rs. 425 / 850",
    image: "/images/beef-shami-kabab.jpg",
  },
  {
    name: "Chicken Shami Kabab",
    price: "Rs. 350 / 700",
    image: "/images/chicken-shami-kabab.jpg",
  },
  {
    name: "Spring Roll",
    price: "Rs. 330 / 650",
    image: "/images/spring-roll.jpg",
  },
  {
    name: "Noodles Roll",
    price: "Rs. 350 / 700",
    image: "/images/noodles-roll.jpg",
  },
  {
    name: "Chicken Cheese Bread Roll",
    price: "Rs. 400 / 800",
    image: "/images/chicken-cheese-bread-roll.jpg",
  },
  {
    name: "Beef Qeema Samosa",
    price: "Rs. 330 / 650",
    image: "/images/beef-qeema-samosa.jpg",
  },
  {
    name: "Chicken Tikka Samosa",
    price: "Rs. 360 / 720",
    image: "/images/chicken-tikka-samosa.jpg",
  },
  {
    name: "Malai Boti Box Patties",
    price: "Rs. 400 / 800",
    image: "/images/Malai Boti Box Patties.png",
  },
]

const freshChutneys = [
  {
    name: "Red Chutney",
    price: "Rs. 200 / 350",
    image: "/images/red-chutney.jpg",
  },
  {
    name: "Green Chutney",
    price: "Rs. 200 / 350",
    image: "/images/green-chutney.jpg",
  },
  {
    name: "Khatti Meethi Chutney",
    price: "Rs. 300 / 500",
    image: "/images/khatti-meethi-chutney.jpg",
  },
]

interface MenuCardProps {
  name: string
  price: string
  image: string
}

function MenuCard({ name, price, image }: MenuCardProps) {
  return (
    <Card className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1">{name}</h3>
          <p className="text-primary font-bold text-lg">{price}</p>
          <Button
            asChild
            className="w-full bg-accent text-accent-foreground hover:bg-accent/80 rounded-full text-sm transition-all duration-300"
          >
            <Link href="https://wa.me/923372156080" target="_blank">
              Order Now
            </Link>
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
            {frozenPicks.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Fresh Chutneys */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">Fresh Chutneys</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {freshChutneys.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
