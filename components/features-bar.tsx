import { Beef, ShieldCheck, Truck, Heart } from "lucide-react"

const features = [
  {
    icon: Beef,
    title: "Fresh Ingredients",
    description: "We use only the finest and freshest ingredients.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Preparation",
    description: "Prepared with care in a clean and safe environment.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery at your doorstep.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is cooked with passion and love.",
  },
]

export function FeaturesBar() {
  return (
    <section className="bg-accent/10 border-y border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
