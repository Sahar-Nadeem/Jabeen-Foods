import { Award, DollarSign, Users, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reasons = [
  {
    icon: Award,
    title: "Quality Food",
    description: "We never compromise on food quality.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description: "Great taste at prices that fit your budget.",
  },
  {
    icon: Users,
    title: "Happy Customers",
    description: "Customer satisfaction is our top priority.",
  },
  {
    icon: RotateCcw,
    title: "Repeat Orders",
    description: "Our customers love us and come back again!",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 sm:w-20 bg-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">WHY CHOOSE US?</h2>
            <div className="h-px w-12 sm:w-20 bg-primary" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <reason.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
