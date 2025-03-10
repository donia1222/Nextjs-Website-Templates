"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Search,
  Home,
  Building,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  CheckCircle2,
  Filter,
  SlidersHorizontal,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Check,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Properties data
const properties = [
  {
    id: 1,
    title: "Moderne Villa mit Meerblick",
    description: "Luxuriöse Villa mit atemberaubendem Meerblick, privatem Pool und großzügigem Garten.",
    price: 1250000,
    type: "Kaufen",
    category: "Villa",
    location: "Costa del Sol, Spanien",
    bedrooms: 4,
    bathrooms: 3,
    size: 320,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-4a9a32f9734e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-fc5a7d2a4130?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Meerblick", "Privater Pool", "Garten", "Terrasse", "Garage", "Klimaanlage"],
    featured: true,
    new: true,
  },
  {
    id: 2,
    title: "Penthouse im Stadtzentrum",
    description: "Luxuriöses Penthouse mit Dachterrasse und Panoramablick über die Stadt.",
    price: 850000,
    type: "Kaufen",
    category: "Wohnung",
    location: "Berlin, Deutschland",
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Dachterrasse", "Panoramablick", "Aufzug", "Tiefgarage", "Smart Home", "Fußbodenheizung"],
    featured: true,
    new: false,
  },
  {
    id: 3,
    title: "Modernes Stadthaus",
    description: "Neu gebautes Stadthaus mit modernem Design und energieeffizienter Bauweise.",
    price: 580000,
    type: "Kaufen",
    category: "Haus",
    location: "Hamburg, Deutschland",
    bedrooms: 4,
    bathrooms: 2,
    size: 160,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7f34b5e0f01?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Garten", "Terrasse", "Energieeffizient", "Offener Wohnbereich", "Keller", "Stellplatz"],
    featured: false,
    new: true,
  },
  {
    id: 4,
    title: "Luxuriöse Stadtwohnung",
    description: "Elegante Wohnung in zentraler Lage mit hochwertiger Ausstattung und Balkon.",
    price: 3500,
    type: "Mieten",
    category: "Wohnung",
    location: "München, Deutschland",
    bedrooms: 2,
    bathrooms: 1,
    size: 95,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Balkon", "Einbauküche", "Parkett", "Aufzug", "Keller", "Tiefgarage"],
    featured: true,
    new: false,
  },
  {
    id: 5,
    title: "Landhaus mit großem Grundstück",
    description: "Charmantes Landhaus mit weitläufigem Grundstück, ideal für Naturliebhaber und Familien.",
    price: 450000,
    type: "Kaufen",
    category: "Haus",
    location: "Schwarzwald, Deutschland",
    bedrooms: 5,
    bathrooms: 2,
    size: 210,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Großes Grundstück", "Kamin", "Scheune", "Garten", "Terrasse", "Ruhige Lage"],
    featured: false,
    new: false,
  },
  {
    id: 6,
    title: "Moderne Bürofläche",
    description: "Flexible Bürofläche in zentraler Lage mit moderner Ausstattung und guter Verkehrsanbindung.",
    price: 2800,
    type: "Mieten",
    category: "Gewerbe",
    location: "Frankfurt, Deutschland",
    bedrooms: 0,
    bathrooms: 2,
    size: 150,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=500&auto=format&fit=crop",
    ],
    features: ["Aufzug", "Klimaanlage", "Teeküche", "Konferenzraum", "Tiefgarage", "Glasfaser-Internet"],
    featured: false,
    new: true,
  },
]

// Define property type
interface Property {
  id: number
  title: string
  description: string
  price: number
  type: string
  category: string
  location: string
  bedrooms: number
  bathrooms: number
  size: number
  images: string[]
  features: string[]
  featured: boolean
  new: boolean
}

// Define testimonial type
interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  image: string
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Julia Müller",
    role: "Käuferin",
    text: "Dank ImmoVision habe ich mein Traumhaus gefunden. Der Service war erstklassig und die Beratung kompetent. Besonders beeindruckt hat mich die persönliche Betreuung während des gesamten Kaufprozesses.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Thomas Schmidt",
    role: "Verkäufer",
    text: "Der Verkauf meiner Immobilie verlief reibungslos und schneller als erwartet. Das Team von ImmoVision hat sich um alle Details gekümmert und einen hervorragenden Preis erzielt.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sarah Wagner",
    role: "Mieterin",
    text: "Die Wohnungssuche mit ImmoVision war angenehm und effizient. Die Online-Plattform ist benutzerfreundlich und die Besichtigungstermine wurden flexibel nach meinen Bedürfnissen organisiert.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
  },
]

// Define team member type
interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
}

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Michael Weber",
    role: "Geschäftsführer",
    bio: "Mit über 20 Jahren Erfahrung in der Immobilienbranche leitet Dr. Weber unser Unternehmen mit Expertise und Vision.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Anna Schneider",
    role: "Leiterin Verkauf",
    bio: "Anna ist spezialisiert auf Luxusimmobilien und hat ein ausgezeichnetes Gespür für die Bedürfnisse anspruchsvoller Kunden.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Markus Bauer",
    role: "Immobilienberater",
    bio: "Markus kennt den lokalen Markt wie kein anderer und findet für jeden Kunden die passende Immobilie.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sophie Klein",
    role: "Marketing Managerin",
    bio: "Sophie sorgt mit innovativen Strategien dafür, dass unsere Immobilien optimal präsentiert werden.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
]

// Define location type
interface Location {
  id: number
  name: string
  count: number
  image: string
}

// Locations data
const locations: Location[] = [
  {
    id: 1,
    name: "Berlin",
    count: 42,
    image: "https://images.unsplash.com/photo-1560930950-5cc20e80e392?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "München",
    count: 38,
    image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Hamburg",
    count: 29,
    image: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Frankfurt",
    count: 24,
    image: "https://images.unsplash.com/photo-1577185816322-21f2a92b1342?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Köln",
    count: 21,
    image: "https://images.unsplash.com/photo-1588796388882-a12b747f288e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Stuttgart",
    count: 18,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Düsseldorf",
    count: 15,
    image: "https://images.unsplash.com/photo-1589021998083-8b5f2f962b4c?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Leipzig",
    count: 12,
    image: "https://images.unsplash.com/photo-1572876755407-ad1387944ca8?q=80&w=300&auto=format&fit=crop",
  },
]

// Property card component
const PropertyCard = ({
  property,
  onViewDetails,
}: { property: Property; onViewDetails: (property: Property) => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(property)}
    >
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg?height=500&width=500"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {property.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10 hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10 hover:bg-white transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {property.featured && <Badge className="bg-teal-500 text-white border-0">Empfohlen</Badge>}
          {property.new && <Badge className="bg-blue-500 text-white border-0">Neu</Badge>}
        </div>

        <div className="absolute top-2 right-2 flex gap-1">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
            <Share2 className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <Badge className="bg-white text-gray-800 border-0">{property.type}</Badge>
          <span className="ml-2 text-white font-medium">{property.category}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{property.title}</h3>
          <div className="text-teal-600 font-bold">
            {property.type === "Kaufen" ? `€${property.price.toLocaleString()}` : `€${property.price}/mo`}
          </div>
        </div>

        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

        <div className="flex justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center text-gray-600">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.size} m²</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

// Team member card component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg?height=200&width=200"}
          alt={member.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 relative -mt-16 bg-white/90 backdrop-blur-sm mx-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
        <p className="text-teal-600 font-medium text-sm mb-2">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
        <div className="flex gap-2 mt-3">
          {[<Linkedin key="li" size={16} />, <Mail key="mail" size={16} />].map((icon, index) => (
            <a key={index} href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
              {icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Location card component
const LocationCard = ({ location }: { location: Location }) => {
  return (
    <motion.div
      className="relative h-40 rounded-xl overflow-hidden group"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Image
        src={location.image || "/placeholder.svg?height=300&width=300"}
        alt={location.name}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="font-bold text-lg">{location.name}</h3>
        <p className="text-sm text-white/80">{location.count} Immobilien</p>
      </div>
      <div className="absolute inset-0 bg-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
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

export function RealEstateWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("Alle")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [sizeRange, setSizeRange] = useState([0, 500])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [propertyDetailsOpen, setPropertyDetailsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100])

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

  // Filter properties based on active tab and search query
  const filteredProperties = properties.filter((property) => {
    const matchesTab =
      activeTab === "Alle" ||
      (activeTab === "Kaufen" && property.type === "Kaufen") ||
      (activeTab === "Mieten" && property.type === "Mieten") ||
      (activeTab === "Empfohlen" && property.featured)

    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesSize = property.size >= sizeRange[0] && property.size <= sizeRange[1]

    return matchesTab && matchesSearch && matchesPrice && matchesSize
  })

  // View property details
  const viewPropertyDetails = (property: Property) => {
    setSelectedProperty(property)
    setPropertyDetailsOpen(true)
  }

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setContactSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setContactOpen(false)
        setContactSuccess(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <motion.header
 
        className={cn(
          "bg-white text-gray-900 p-4 sticky top-0 z-30 transition-all duration-300",
          scrolled ? "shadow-md" : "",
        )}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Building2 className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">
              ImmoVision
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <motion.a
              href="#home"
              className="hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Startseite
            </motion.a>
            <motion.a
              href="#properties"
              className="hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Immobilien
            </motion.a>
            <motion.a
              href="#locations"
              className="hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Standorte
            </motion.a>
            <motion.a
              href="#about"
              className="hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Über uns
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontakt
            </motion.a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setContactOpen(true)}
              className="hidden md:flex items-center gap-1 bg-gradient-to-r from-teal-600 to-blue-500 px-6 py-2 rounded-full text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>Kontakt aufnehmen</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden text-gray-900" onClick={toggleMobileMenu} whileTap={{ scale: 0.9 }}>
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
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-white z-50 flex flex-col p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-teal-600" />
                  <h2 className="font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent">
                    ImmoVision
                  </h2>
                </div>
                <button className="text-gray-900" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Startseite
                </a>
                <a
                  href="#properties"
                  className="text-gray-900 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Immobilien
                </a>
                <a
                  href="#locations"
                  className="text-gray-900 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Standorte
                </a>
                <a
                  href="#about"
                  className="text-gray-900 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Über uns
                </a>
                <a
                  href="#contact"
                  className="text-gray-900 hover:text-teal-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Kontakt
                </a>
              </nav>

              <div className="mt-auto">
                <Button
                  onClick={() => {
                    setContactOpen(true)
                    toggleMobileMenu()
                  }}
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-500 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Kontakt aufnehmen
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[700px] overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 bg-black/30 z-10" style={{ opacity: heroOpacity }}></motion.div>
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
            alt="Luxuriöse Immobilie"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center p-4 text-white">
          <motion.div
            className="max-w-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ y: heroTextY }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Finden Sie Ihr Traumzuhause</h2>
            <p className="text-lg md:text-xl mb-8">
              Entdecken Sie exklusive Immobilien an den begehrtesten Standorten. Wir begleiten Sie auf dem Weg zu Ihrem
              neuen Zuhause.
            </p>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row gap-3 mb-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Ort, Adresse oder Keyword"
                      className="pl-10 bg-transparent text-gray-400 border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select defaultValue="Alle" onValueChange={(value) => setActiveTab(value)}>
                  <SelectTrigger className="w-full md:w-40 bg-transparent text-gray-700 border-gray-200">
                    <SelectValue placeholder="Typ wählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md">
                    <SelectItem value="Alle">Alle Immobilien</SelectItem>
                    <SelectItem value="Kaufen">Kaufen</SelectItem>
                    <SelectItem value="Mieten">Mieten</SelectItem>
                    <SelectItem value="Empfohlen">Empfohlen</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="bg-gradient-to-r from-teal-600 to-blue-500 text-white"
                  onClick={() => setFilterOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-blue-500 text-white"
                onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}
              >
                Immobilien suchen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-teal-50 p-3 rounded-full mb-3">
                <Home className="h-6 w-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={1500} />+
              </div>
              <p className="text-gray-600">Immobilien verkauft</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-teal-50 p-3 rounded-full mb-3">
                <Building className="h-6 w-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={250} />+
              </div>
              <p className="text-gray-600">Aktuelle Angebote</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-teal-50 p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={20} />+
              </div>
              <p className="text-gray-600">Städte</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-teal-50 p-3 rounded-full mb-3">
                <CheckCircle2 className="h-6 w-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={98} />%
              </div>
              <p className="text-gray-600">Zufriedene Kunden</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unsere Immobilien</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere sorgfältig ausgewählten Immobilien. Von luxuriösen Villen bis hin zu modernen
              Stadtwohnungen - für jeden Geschmack und jedes Budget.
            </p>
          </motion.div>

          <Tabs defaultValue="Alle" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex justify-between items-center mb-8">
              <TabsList className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full p-4">
                <TabsTrigger
                  value="Alle"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Alle
                </TabsTrigger>
                <TabsTrigger
                  value="Kaufen"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Kaufen
                </TabsTrigger>
                <TabsTrigger
                  value="Mieten"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Mieten
                </TabsTrigger>
                <TabsTrigger
                  value="Empfohlen"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Empfohlen
                </TabsTrigger>
              </TabsList>

              <Button
                variant="outline"
                className="hidden md:flex items-center gap-1"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filter & Sortierung
              </Button>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} onViewDetails={viewPropertyDetails} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Keine Immobilien gefunden</h3>
                  <p className="text-gray-500 mb-4">
                    Versuchen Sie es mit anderen Suchkriterien oder Filter-Einstellungen.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveTab("Alle")
                      setPriceRange([0, 2000000])
                      setSizeRange([0, 500])
                    }}
                  >
                    Filter zurücksetzen
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Beliebte Standorte</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie Immobilien in den begehrtesten Lagen Deutschlands. Von pulsierenden Metropolen bis hin zu
              idyllischen Vororten.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Über ImmoVision</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mb-8"></div>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Seit 2005 ist ImmoVision Ihr vertrauensvoller Partner für Immobilien in ganz Deutschland. Unser Ziel ist
                es, für jeden Kunden die perfekte Immobilie zu finden oder den bestmöglichen Verkaufspreis zu erzielen.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Mit unserem Team aus erfahrenen Immobilienexperten bieten wir einen umfassenden Service von der ersten
                Beratung bis zum erfolgreichen Abschluss. Wir verstehen, dass der Kauf oder Verkauf einer Immobilie eine
                der wichtigsten Entscheidungen im Leben ist.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Persönliche Betreuung</h4>
                    <p className="text-gray-600 text-sm">
                      Individuelle Beratung und Betreuung während des gesamten Prozesses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Marktexpertise</h4>
                    <p className="text-gray-600 text-sm">
                      Fundierte Kenntnisse lokaler Immobilienmärkte für optimale Ergebnisse.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Transparente Prozesse</h4>
                    <p className="text-gray-600 text-sm">
                      Klare Kommunikation und transparente Abläufe für Ihre Sicherheit.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[500px] overflow-hidden rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=600&auto=format&fit=crop"
                alt="Immobilienbüro"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2 text-white">Unser Team</h3>
                <p className="text-gray-200">Erfahrene Experten für Ihre Immobilienwünsche</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unser Team</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lernen Sie unsere erfahrenen Immobilienexperten kennen, die Sie auf dem Weg zu Ihrer Traumimmobilie
              begleiten.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Was unsere Kunden sagen</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Erfahrungen unserer zufriedenen Kunden</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-50 p-8 rounded-xl border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
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
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-teal-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{`"${testimonial.text}"`}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Kontaktieren Sie uns</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Wir freuen uns, von Ihnen zu hören</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-8 text-gray-900">Kontaktdaten</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Immobilienstraße 42, 10115 Berlin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+49 (0) 30 123 45678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">E-Mail</h4>
                    <p className="text-gray-600">info@immovision.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Öffnungszeiten</h4>
                    <p className="text-gray-600">Mo-Fr: 9:00 - 18:00 Uhr</p>
                    <p className="text-gray-600">Sa: Nach Vereinbarung</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4 text-gray-900">Folgen Sie uns</h4>
                <div className="flex gap-4">
                  {[
                    <Facebook key="fb" size={20} />,
                    <Instagram key="ig" size={20} />,
                    <Twitter key="tw" size={20} />,
                    <Linkedin key="li" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 border border-gray-200 hover:border-teal-600 transition-colors"
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
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900">Senden Sie uns eine Nachricht</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Ihr Name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" placeholder="Ihre E-Mail" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Betreff</Label>
                  <Input id="subject" placeholder="Betreff" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea id="message" placeholder="Ihre Nachricht" rows={4} className="mt-2" />
                </div>

                <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-500 text-white">
                  Nachricht senden
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Details Dialog */}
      <Dialog open={propertyDetailsOpen} onOpenChange={setPropertyDetailsOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <button
            className="absolute right-4 top-4 z-50 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => setPropertyDetailsOpen(false)}
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          {selectedProperty && (
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative h-[400px]">
                <Image
                  src={selectedProperty.images[0] || "/placeholder.svg?height=500&width=900"}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <Badge className="bg-white text-gray-800 border-0 mb-2">{selectedProperty.type}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedProperty.title}</h2>
                  <div className="flex items-center text-white/90 mt-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-teal-600">
                    {selectedProperty.type === "Kaufen"
                      ? `€${selectedProperty.price.toLocaleString()}`
                      : `€${selectedProperty.price}/mo`}
                  </div>
                  <div className="flex gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-1" />
                      <span>{selectedProperty.bedrooms} Schlafzimmer</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-1" />
                      <span>{selectedProperty.bathrooms} Badezimmer</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-1" />
                      <span>{selectedProperty.size} m²</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Beschreibung</h3>
                  <p className="text-gray-600">{selectedProperty.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Merkmale</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProperty.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Galerie</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedProperty.images.map((image: string, index: number) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg?height=300&width=500"}
                          alt={`${selectedProperty.title} - Bild ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Button
                    className="flex-1 bg-gradient-to-r from-teal-600 to-blue-500 text-white"
                    onClick={() => {
                      setPropertyDetailsOpen(false)
                      setContactOpen(true)
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Kontakt aufnehmen
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setPropertyDetailsOpen(false)}>
                    Zurück zur Suche
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-gray-50">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Kontakt aufnehmen</DialogTitle>
            <DialogDescription>
              {selectedProperty
                ? `Interesse an "${selectedProperty.title}"? Füllen Sie das Formular aus, und wir melden uns bei Ihnen.`
                : "Füllen Sie das Formular aus, und wir melden uns bei Ihnen."}
            </DialogDescription>
          </DialogHeader>

          {contactSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nachricht gesendet!</h3>
              <p className="text-gray-600">
                Vielen Dank für Ihre Anfrage. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {selectedProperty && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={selectedProperty.images[0] || "/placeholder.svg?height=200&width=200"}
                      alt={selectedProperty.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedProperty.title}</h4>
                    <p className="text-sm text-gray-500">{selectedProperty.location}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input id="firstName" placeholder="Ihr Vorname" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input id="lastName" placeholder="Ihr Nachname" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" placeholder="Ihre E-Mail" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="Ihre Telefonnummer" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  placeholder="Ihre Nachricht"
                  rows={4}
                  defaultValue={
                    selectedProperty
                      ? `Ich interessiere mich für "${selectedProperty.title}" und hätte gerne weitere Informationen.`
                      : ""
                  }
                />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" id="privacy" className="rounded border-gray-300" required />
                <Label htmlFor="privacy" className="text-sm">
                  Ich stimme der{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu
                </Label>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    "Nachricht senden"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Filter & Sortierung</DialogTitle>
            <DialogDescription>Passen Sie Ihre Suche an, um die perfekte Immobilie zu finden.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label className="text-base font-bold">Preisspanne</Label>
              <div className="mt-6 px-2">
                <Slider defaultValue={priceRange} min={0} max={2000000} step={10000} onValueChange={setPriceRange} />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>€{priceRange[0].toLocaleString()}</span>
                  <span>€{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-bold">Wohnfläche</Label>
              <div className="mt-6 px-2">
                <Slider defaultValue={sizeRange} min={0} max={500} step={10} onValueChange={setSizeRange} />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{sizeRange[0]} m²</span>
                  <span>{sizeRange[1]} m²</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-bold">Immobilientyp</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Haus", "Wohnung", "Grundstück", "Gewerbe"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input type="checkbox" id={type} className="rounded border-gray-300" />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-bold">Zimmer</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {[1, 2, 3, 4, "5+"].map((room) => (
                  <Button
                    key={room}
                    variant="outline"
                    className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-600"
                  >
                    {room}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-bold">Sortierung</Label>
              <Select defaultValue="newest">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sortierung wählen" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="newest">Neueste zuerst</SelectItem>
                  <SelectItem value="price_asc">Preis: aufsteigend</SelectItem>
                  <SelectItem value="price_desc">Preis: absteigend</SelectItem>
                  <SelectItem value="size_asc">Größe: aufsteigend</SelectItem>
                  <SelectItem value="size_desc">Größe: absteigend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => {
                setPriceRange([0, 2000000])
                setSizeRange([0, 500])
                setFilterOpen(false)
              }}
            >
              Zurücksetzen
            </Button>
            <Button
              className="sm:flex-1 bg-gradient-to-r from-teal-600 to-blue-500 text-white"
              onClick={() => setFilterOpen(false)}
            >
              Filter anwenden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

