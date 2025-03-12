"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Star,
  Calendar,
  ChevronDown,
  ArrowRight,
  Check,
  Loader2,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"

// Types
interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
  spicy?: boolean
  vegan?: boolean
  vegetarian?: boolean
  gluten_free?: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

// Menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Black Garlic Ramen",
    description: "Tonkotsu broth, chashu pork, black garlic oil, soft-boiled egg, green onions",
    price: 16.5,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=200&auto=format&fit=crop",
    category: "Ramen",
    featured: true,
  },
  {
    id: 2,
    name: "Spicy Miso Ramen",
    description: "Chicken broth, spicy miso paste, ground pork, bean sprouts, corn, butter",
    price: 15.5,
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=200&auto=format&fit=crop",
    category: "Ramen",
    spicy: true,
  },
  {
    id: 3,
    name: "Vegetable Ramen",
    description: "Vegetable broth, tofu, mushrooms, corn, bamboo shoots, seaweed",
    price: 14.5,
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?q=80&w=200&auto=format&fit=crop",
    category: "Ramen",
    vegetarian: true,
    vegan: true,
  },
  {
    id: 4,
    name: "Gyoza",
    description: "Pan-fried pork and vegetable dumplings, served with dipping sauce",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1534422646206-10d6564395c5?q=80&w=200&auto=format&fit=crop",
    category: "Appetizers",
    featured: true,
  },
  {
    id: 5,
    name: "Karaage",
    description: "Japanese fried chicken, marinated in soy, ginger, and garlic",
    price: 9.5,
    image: "https://images.unsplash.com/photo-1678794744154-3faf95b13986?q=80&w=200&auto=format&fit=crop",
    category: "Appetizers",
  },
  {
    id: 6,
    name: "Kimchi",
    description: "Spicy fermented napa cabbage with Korean seasonings",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1583224964978-2d1a9675e5d8?q=80&w=200&auto=format&fit=crop",
    category: "Appetizers",
    spicy: true,
    vegan: true,
    vegetarian: true,
    gluten_free: true,
  },
  {
    id: 7,
    name: "Matcha Ice Cream",
    description: "Premium green tea ice cream",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1561845730-208ad5910553?q=80&w=200&auto=format&fit=crop",
    category: "Desserts",
    vegetarian: true,
    gluten_free: true,
  },
  {
    id: 8,
    name: "Mochi Ice Cream",
    description: "Assorted flavors of ice cream wrapped in soft rice dough",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200&auto=format&fit=crop",
    category: "Desserts",
    vegetarian: true,
  },
  {
    id: 9,
    name: "Sake",
    description: "Premium Japanese rice wine, served warm or cold",
    price: 12.0,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=200&auto=format&fit=crop",
    category: "Drinks",
  },
  {
    id: 10,
    name: "Japanese Craft Beer",
    description: "Rotating selection of imported Japanese craft beers",
    price: 8.0,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=200&auto=format&fit=crop",
    category: "Drinks",
  },
  {
    id: 11,
    name: "Matcha Latte",
    description: "Ceremonial grade matcha green tea with steamed milk",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=200&auto=format&fit=crop",
    category: "Drinks",
    vegetarian: true,
  },
  {
    id: 12,
    name: "Tonkatsu",
    description: "Breaded and deep-fried pork cutlet with tonkatsu sauce and cabbage",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1632707531698-37df7d36cb04?q=80&w=200&auto=format&fit=crop",
    category: "Main Dishes",
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Akira Tanaka",
    text: "The most authentic ramen I've had outside of Japan. The broth is rich and flavorful, and the noodles have the perfect texture.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Emily Wong",
    text: "Incredible atmosphere and even better food. The black garlic ramen is a must-try! Staff is very knowledgeable and attentive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "James Park",
    text: "I'm obsessed with their karaage and gyoza. Perfect crispy texture on the outside, juicy on the inside. Great sake selection too!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop",
  },
]

// Gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562158074-d60fbfc00b88?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599028267346-4cb90f37cc0e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584224568533-da65f6e7d4f8?q=80&w=300&auto=format&fit=crop",
]

// Menu categories
const categories = ["All", "Ramen", "Appetizers", "Main Dishes", "Desserts", "Drinks"]

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const totalFrames = Math.min(end, duration * 60)
    const counter = setInterval(() => {
      start += 1
      const progress = start / totalFrames
      setCount(Math.floor(progress * end))

      if (start === totalFrames) {
        clearInterval(counter)
        setCount(end)
      }
    }, 1000 / 60)

    return () => clearInterval(counter)
  }, [value, duration, isInView])

  return <span ref={nodeRef}>{count.toLocaleString()}</span>
}

// Menu item card component
const FoodItemCard = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    onAddToCart(item)

    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <motion.div
      className="group relative bg-zinc-900 border border-zinc-800 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity z-10",
            isHovered ? "opacity-100" : "",
          )}
        >
          <Button
            onClick={handleAddToCart}
            className={cn(
              "bg-orange-600 hover:bg-orange-700 text-white",
              isAdded ? "bg-green-600 hover:bg-green-700" : "",
            )}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Order
              </>
            )}
          </Button>
        </div>
        <Image
          src={item.image || "/placeholder.svg?height=200&width=200"}
          alt={item.name}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          fill
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-medium">{item.name}</h3>
          <span className="text-orange-500 font-medium">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {item.featured && (
            <Badge variant="secondary" className="bg-orange-900/50 text-orange-400 hover:bg-orange-900/70">
              Featured
            </Badge>
          )}
          {item.spicy && (
            <Badge variant="outline" className="text-red-400 border-red-800">
              Spicy
            </Badge>
          )}
          {item.vegetarian && (
            <Badge variant="outline" className="text-green-400 border-green-800">
              Vegetarian
            </Badge>
          )}
          {item.vegan && (
            <Badge variant="outline" className="text-green-400 border-green-800">
              Vegan
            </Badge>
          )}
          {item.gluten_free && (
            <Badge variant="outline" className="text-yellow-400 border-yellow-800">
              Gluten-Free
            </Badge>
          )}
        </div>

        {/* Add permanent button below product details */}
        <Button
          onClick={handleAddToCart}
          className={cn(
            "w-full mt-4 transition-colors duration-300",
            isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "bg-orange-600 hover:bg-orange-700 text-white",
          )}
          disabled={isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={cn(i < rating ? "text-orange-500 fill-orange-500" : "text-zinc-700")} />
      ))}
    </div>
  )
}

export default function DarkRestaurantchina() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [reservationSuccess, setReservationSuccess] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const noodleRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  // Filter menu items by category
  const filteredMenuItems =
    activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Handle reservation submission
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setReservationSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setReservationOpen(false)
        setReservationSuccess(false)
      }, 2000)
    }, 1500)
  }

  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderSuccess(true)

      // Reset form and cart after success
      setTimeout(() => {
        setOrderOpen(false)
        setOrderSuccess(false)
        setCartItems([])
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans">
      {/* Floating Noodles Animation */}
      <motion.div
        className="fixed bottom-10 right-10 z-50 hidden lg:block"
        style={{ rotate: noodleRotate }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.5)]">
          <Image
            src="https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=200&auto=format&fit=crop"
            alt="Ramen"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Header */}
      <motion.header
        className={cn(
          "bg-zinc-900/80 backdrop-blur-md text-white p-4 sticky top-0 z-30 transition-all duration-300",
          scrolled ? "shadow-lg shadow-black/20" : "",
        )}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-2xl font-bold tracking-tight text-white">
              UMAMI<span className="text-orange-500">.</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {["Home", "Menu", "About", "Gallery", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setReservationOpen(true)}
              className="hidden md:flex items-center gap-1 bg-orange-600 hover:bg-orange-700 px-6 py-2 text-sm font-medium text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="h-4 w-4" />
              <span>Reserve Table</span>
            </motion.button>

            <motion.button
              onClick={() => setOrderOpen(true)}
              className="hidden md:flex items-center gap-1 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 px-6 py-2 text-sm font-medium transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Order Now</span>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden text-white" onClick={toggleMobileMenu} whileTap={{ scale: 0.9 }}>
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-zinc-900 z-50 flex flex-col p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-orange-500 font-bold">UMAMI.</h2>
                <button className="text-white" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {["Home", "Menu", "About", "Gallery", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white hover:text-orange-500 transition-colors py-2 border-b border-zinc-800"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setReservationOpen(true)
                    toggleMobileMenu()
                  }}
                  className="bg-orange-600 hover:bg-orange-700 w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reserve Table
                </Button>
                <Button
                  onClick={() => {
                    setOrderOpen(true)
                    toggleMobileMenu()
                  }}
                  variant="outline"
                  className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 w-full"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Order Now
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 bg-black/60 z-10" style={{ opacity: heroOpacity }} />
        <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
          <Image
            src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200&auto=format&fit=crop"
            alt="Ramen"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center p-4 text-white">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.span
              className="text-orange-500 font-bold mb-4 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              AUTHENTIC JAPANESE CUISINE
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Savor the <span className="text-orange-500">Essence</span> of Japan
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-zinc-300 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Experience the art of traditional ramen, crafted with authentic methods and the finest ingredients for an
              unforgettable culinary journey.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Button
                onClick={() => setReservationOpen(true)}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Reserve a Table
              </Button>
              <Button
                onClick={() => setOrderOpen(true)}
                size="lg"
                variant="outline"
                className="bg-zinc-800/70 backdrop-blur-sm text-white hover:bg-zinc-700 border-zinc-600"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Takeout
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-0 right-0 z-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#menu" className="flex flex-col items-center text-white hover:text-orange-500 transition-colors">
            <span className="text-sm mb-2">Explore Our Menu</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Quick Info Section */}
      <section className="py-12 bg-zinc-900 border-t border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-zinc-800 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Hours</h3>
                <p className="text-zinc-400 text-sm">Mon-Sun: 11:00 AM - 10:00 PM</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-zinc-800 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Location</h3>
                <p className="text-zinc-400 text-sm">123 Ramen St., Noodle District</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-zinc-800 p-3 rounded-full">
                <Phone className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Reservations</h3>
                <p className="text-zinc-400 text-sm">+1 (555) 123-4567</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-orange-500 font-medium mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              DISCOVER OUR FLAVORS
            </motion.span>
            <h2 className="text-4xl font-bold mb-4 text-white">Our Menu</h2>
            <div className="w-20 h-0.5 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore our carefully crafted selection of authentic Japanese dishes made with traditional recipes and the
              freshest ingredients
            </p>
          </motion.div>

          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="flex gap-2 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 whitespace-nowrap transition-colors",
                    activeCategory === category
                      ? "bg-orange-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredMenuItems.map((item) => (
              <FoodItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Button
              onClick={() => setOrderOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8"
              size="lg"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="text-orange-500 font-medium mb-2 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                OUR STORY
              </motion.span>
              <h2 className="text-3xl font-bold mb-6 text-white">The UMAMI Experience</h2>
              <div className="w-20 h-0.5 bg-orange-600 mb-8"></div>
              <p className="mb-6 text-zinc-300 leading-relaxed">
                Founded in 2010 by Master Chef Takashi Yamamoto, UMAMI brings the authentic taste of Japanese ramen to
                your neighborhood. Our recipes have been perfected over generations, preserving traditional cooking
                methods and flavors from various regions of Japan.
              </p>
              <p className="mb-8 text-zinc-300 leading-relaxed">
                We source the finest ingredients, including imported Japanese products and locally grown organic
                produce, to create dishes that capture the essence of Japanese cuisine. Every bowl is prepared with
                passion and attention to detail.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="text-center border-r border-zinc-800">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    <AnimatedCounter value={12} />+
                  </div>
                  <p className="text-zinc-400">Years of Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    <AnimatedCounter value={20000} />+
                  </div>
                  <p className="text-zinc-400">Happy Customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[500px] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1511689736575-02865d287c70?q=80&w=600&auto=format&fit=crop"
                alt="Chef preparing ramen"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2 text-white">Chef Takashi Yamamoto</h3>
                <p className="text-zinc-300">Head Chef & Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-orange-500 font-medium mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              TESTIMONIALS
            </motion.span>
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <div className="w-20 h-0.5 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-zinc-400">Hear from our satisfied guests</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-zinc-900 p-8 border border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{testimonial.name}</h4>
                      <RatingStars rating={testimonial.rating} />
                    </div>
                  </div>
                  <p className="text-zinc-300 italic">&quot;{testimonial.text}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-orange-500 font-medium mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              OUR GALLERY
            </motion.span>
            <h2 className="text-3xl font-bold mb-4 text-white">Visual Experience</h2>
            <div className="w-20 h-0.5 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-zinc-400">Take a look at our restaurant and dishes</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={image || "/placeholder.svg?height=300&width=300"}
                  alt="Gallery image"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="bg-orange-600 rounded-full p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-orange-500 font-medium mb-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              GET IN TOUCH
            </motion.span>
            <h2 className="text-3xl font-bold mb-4 text-white">Contact Us</h2>
            <div className="w-20 h-0.5 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-zinc-400">We&apos;d love to hear from you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-8 text-white">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Address</h4>
                    <p className="text-zinc-400">123 Ramen St., Noodle District, ND 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-zinc-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-zinc-400">info@umamiramen.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Hours</h4>
                    <p className="text-zinc-400">Monday - Sunday: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-medium mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    <Facebook key="fb" size={20} />,
                    <Instagram key="ig" size={20} />,
                    <Twitter key="tw" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900 p-8 border border-zinc-800"
            >
              <h3 className="text-xl font-bold mb-6 text-white">Send Us a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-zinc-300 mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-zinc-300 mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-zinc-300 mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-zinc-300 mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                  />
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Send Message</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Reservation Dialog */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reserve a Table</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Fill out the form below to reserve a table at UMAMI Ramen.
            </DialogDescription>
          </DialogHeader>

          {reservationSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Reservation Confirmed!</h3>
              <p className="text-zinc-400">
                We&apos;ve sent a confirmation to your email. We look forward to serving you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-zinc-300">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-zinc-300">
                    Time
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-orange-500">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      {["11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((time) => (
                        <SelectItem key={time} value={time} className="focus:bg-zinc-700 focus:text-white">
                          {time} {Number.parseInt(time) >= 12 ? "PM" : "AM"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-zinc-300">
                  Number of Guests
                </Label>
                <Select required>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-orange-500">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="focus:bg-zinc-700 focus:text-white">
                        {num} {num === 1 ? "Person" : "People"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-requests" className="text-zinc-300">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any special requests or dietary needs"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Reservation"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white w-full max-w-md mx-auto max-h-[85vh] overflow-hidden flex flex-col p-4 sm:p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold">Your Order</DialogTitle>
            <DialogDescription className="text-zinc-400">Review your items and complete your order.</DialogDescription>
          </DialogHeader>

          {orderSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Order Confirmed!</h3>
              <p className="text-zinc-400">
                We&apos;ve sent a confirmation to your email. Your food will be ready for pickup in about 30 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-4 flex-1 overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-white">Your cart is empty</h3>
                  <p className="text-zinc-400 mb-4">Add some delicious dishes from our menu!</p>
                  <Button onClick={() => setOrderOpen(false)} className="bg-orange-600 hover:bg-orange-700 text-white">
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-zinc-800">
                        <div className="h-16 w-16 overflow-hidden flex-shrink-0 rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">{item.name}</h4>
                          <p className="text-sm text-zinc-400">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-6 text-center text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-orange-500 hover:text-orange-400 hover:bg-zinc-800"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-300">Subtotal</span>
                      <span className="font-medium text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-300">Tax</span>
                      <span className="font-medium text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white">Total</span>
                      <span className="text-orange-500">${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-zinc-300">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-zinc-300">
                        Special Instructions (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requests or instructions"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

