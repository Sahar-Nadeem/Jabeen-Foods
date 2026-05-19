"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    name: "Ayesha Khan",
    review: "The Beef Shami Kababs are absolutely delicious! Tastes just like homemade. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Ahmed Ali",
    review: "Best frozen samosas in town! The Chicken Tikka Samosa is our family favorite. Great quality and taste.",
    rating: 5,
  },
  {
    name: "Fatima Malik",
    review: "Love the chutneys! The Khatti Meethi Chutney goes perfectly with everything. Highly recommended!",
    rating: 5,
  },
  {
    name: "Omar Hassan",
    review: "Quick delivery and excellent packaging. The Malai Boti Patties are to die for!",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 sm:w-20 bg-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">CUSTOMER REVIEWS</h2>
            <div className="h-px w-12 sm:w-20 bg-primary" />
          </div>
          <p className="text-muted-foreground text-lg">What our customers say about us</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-primary/40" />
                <p className="text-muted-foreground text-sm leading-relaxed">{review.review}</p>
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-foreground">{review.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
