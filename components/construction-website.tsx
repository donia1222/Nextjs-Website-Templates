"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Hammer,
  HardHat,
  Building,
  Ruler,
  CheckCircle2,
  Clock,
  Users,
  Award,
  ChevronRight,
  ArrowRight,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  Check,
  Share2,
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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Projects data
const projects = [
  {
    id: 1,
    title: "Moderne Wohnüberbauung Zürichsee",
    description:
      "Luxuriöser Wohnkomplex mit 45 Einheiten und Blick auf den Zürichsee. Nachhaltiges Design mit Solarenergie und Wärmepumpen.",
    location: "Zürich, Schweiz",
    category: "Wohnbau",
    year: 2023,
    size: 12500,
    client: "Zürich Immobilien AG",
    services: ["Architektur", "Baumanagement", "Innenausbau"],
    images: [
      "https://images.unsplash.com/photo-1613977257592-4a9a32f9734e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-fc5a7d2a4130?q=80&w=500&auto=format&fit=crop",
    ],
    featured: true,
    new: true,
  },
  {
    id: 2,
    title: "Geschäftszentrum Bern City",
    description:
      "Modernes Geschäftszentrum mit flexiblen Büroflächen, Konferenzräumen und nachhaltiger Bauweise im Herzen von Bern.",
    location: "Bern, Schweiz",
    category: "Gewerbebau",
    year: 2022,
    size: 8700,
    client: "Bern Business Development",
    services: ["Projektentwicklung", "Baumanagement", "Facility Management"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=500&auto=format&fit=crop",
    ],
    featured: true,
    new: false,
  },
  {
    id: 3,
    title: "Alpenresort Grindelwald",
    description:
      "Exklusives Bergresort mit 30 Chalets, Wellnessbereich und Restaurant. Traditionelle Architektur trifft auf moderne Annehmlichkeiten.",
    location: "Grindelwald, Schweiz",
    category: "Hotellerie",
    year: 2022,
    size: 15000,
    client: "Alpine Resorts AG",
    services: ["Architektur", "Innenausbau", "Landschaftsgestaltung"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500&auto=format&fit=crop",
    ],
    featured: false,
    new: true,
  },
  {
    id: 4,
    title: "Infrastrukturprojekt Gotthard",
    description:
      "Umfangreiche Infrastrukturarbeiten zur Verbesserung der Verkehrsanbindung im Gotthardgebiet mit Fokus auf Nachhaltigkeit.",
    location: "Kanton Uri, Schweiz",
    category: "Infrastruktur",
    year: 2021,
    size: 25000,
    client: "Schweizerische Bundesbahnen",
    services: ["Tiefbau", "Projektmanagement", "Umweltplanung"],
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=500&auto=format&fit=crop",
    ],
    featured: true,
    new: false,
  },
  {
    id: 5,
    title: "Schulcampus Luzern",
    description:
      "Moderner Bildungscampus mit nachhaltiger Bauweise, flexiblen Lernräumen und umfangreichen Sportanlagen für 800 Schüler.",
    location: "Luzern, Schweiz",
    category: "Bildungsbau",
    year: 2021,
    size: 18000,
    client: "Kanton Luzern",
    services: ["Architektur", "Baumanagement", "Innenausbau"],
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop",
    ],
    featured: false,
    new: false,
  },
  {
    id: 6,
    title: "Medizinisches Zentrum Basel",
    description:
      "Hochmodernes medizinisches Zentrum mit Spezialkliniken, Forschungseinrichtungen und Patientenzimmern nach neuesten Standards.",
    location: "Basel, Schweiz",
    category: "Gesundheitswesen",
    year: 2020,
    size: 22000,
    client: "Gesundheit Schweiz AG",
    services: ["Projektentwicklung", "Baumanagement", "Medizintechnik-Integration"],
    images: [
      "https://images.unsplash.com/photo-1629136571575-e7e5c6681a26?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop",
    ],
    featured: false,
    new: false,
  },
]

// Define project type
interface Project {
  id: number
  title: string
  description: string
  location: string
  category: string
  year: number
  size: number
  client: string
  services: string[]
  images: string[]
  featured: boolean
  new: boolean
}

// Define service type
interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

// Services data
const services: Service[] = [
  {
    id: 1,
    title: "Architektur & Planung",
    description:
      "Von der ersten Skizze bis zum detaillierten Bauplan - wir gestalten Räume, die begeistern und funktionieren.",
    icon: <Ruler className="h-10 w-10" />,
    features: [
      "Architektonische Entwürfe",
      "Detailplanung",
      "3D-Visualisierung",
      "Baugesuche und Bewilligungen",
      "Nachhaltige Baukonzepte",
    ],
  },
  {
    id: 2,
    title: "Baumanagement",
    description:
      "Professionelle Steuerung aller Bauprozesse für termingerechte und kosteneffiziente Projektabwicklung.",
    icon: <HardHat className="h-10 w-10" />,
    features: ["Projektleitung", "Terminplanung", "Kostenmanagement", "Qualitätssicherung", "Baustellenkoordination"],
  },
  {
    id: 3,
    title: "Generalunternehmung",
    description:
      "Wir übernehmen die Gesamtverantwortung für Ihr Bauprojekt - von der Planung bis zur schlüsselfertigen Übergabe.",
    icon: <Building className="h-10 w-10" />,
    features: [
      "Schlüsselfertige Lösungen",
      "Koordination aller Gewerke",
      "Festpreis-Garantie",
      "Termingarantie",
      "Qualitätsgarantie",
    ],
  },
  {
    id: 4,
    title: "Renovierung & Sanierung",
    description: "Fachgerechte Modernisierung und Sanierung von Bestandsbauten mit Respekt für die Bausubstanz.",
    icon: <Hammer className="h-10 w-10" />,
    features: [
      "Energetische Sanierung",
      "Denkmalgerechte Renovierung",
      "Umbau und Erweiterung",
      "Fassadensanierung",
      "Innenraummodernisierung",
    ],
  },
]

// Define testimonial type
interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  text: string
  image: string
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Thomas Müller",
    role: "Projektleiter",
    company: "Zürich Immobilien AG",
    text: "Die Zusammenarbeit mit BauSchweiz war von Anfang bis Ende professionell und zielorientiert. Das Team hat unser komplexes Wohnbauprojekt termingerecht und im Budgetrahmen umgesetzt. Besonders beeindruckt hat uns die innovative Herangehensweise an nachhaltige Baulösungen.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Berger",
    role: "Geschäftsführerin",
    company: "Alpine Resorts AG",
    text: "Unser Alpenresort-Projekt stellte besondere Herausforderungen durch die Lage und klimatischen Bedingungen. BauSchweiz hat mit Expertise und Flexibilität alle Hürden gemeistert und ein außergewöhnliches Ergebnis erzielt, das unsere Erwartungen übertroffen hat.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Marco Rossi",
    role: "Bauherr",
    company: "Kanton Luzern",
    text: "Der neue Schulcampus ist ein Vorzeigeprojekt für moderne Bildungsarchitektur. Die enge Zusammenarbeit mit BauSchweiz ermöglichte es uns, pädagogische Konzepte direkt in die Raumgestaltung einfließen zu lassen. Das Ergebnis ist ein inspirierender Lernort für Generationen.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
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
    name: "Ing. Martin Schmid",
    role: "Geschäftsführer",
    bio: "Mit über 25 Jahren Erfahrung im Bauwesen leitet Martin unser Unternehmen mit Expertise und Weitblick.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Anna Weber",
    role: "Leiterin Architektur",
    bio: "Anna verbindet innovative Designansätze mit praktischer Bauexpertise und leitet unser Architekturteam.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Lukas Meier",
    role: "Projektmanager",
    bio: "Lukas sorgt mit präziser Planung und Koordination für die reibungslose Umsetzung unserer Großprojekte.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sophie Brunner",
    role: "Nachhaltigkeitsexpertin",
    bio: "Sophie entwickelt innovative Konzepte für umweltfreundliches und energieeffizientes Bauen.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
]

// Project card component
const ProjectCard = ({ project, onViewDetails }: { project: Project; onViewDetails: (project: Project) => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [project.images.length])

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
      onClick={() => onViewDetails(project)}
    >
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={project.images[currentImageIndex] || "/placeholder.svg?height=500&width=500"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {project.featured && <Badge className="bg-amber-500 text-white border-0">Ausgewählt</Badge>}
          {project.new && <Badge className="bg-blue-600 text-white border-0">Neu</Badge>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <Badge className="bg-white text-gray-800 border-0">{project.category}</Badge>
          <span className="ml-2 text-white font-medium">{project.year}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{project.title}</h3>

        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{project.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center text-gray-600">
            <Ruler className="h-4 w-4 mr-1" />
            <span className="text-sm">{project.size.toLocaleString()} m²</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 -mr-2 group-hover:translate-x-1 transition-transform"
          >
            Details <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

// Service card component
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="p-6">
        <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center mb-4 text-amber-600">
          {service.icon}
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-800">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>

        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Team member card component
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg?height=200&width=200"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 relative -mt-16 bg-white/90 backdrop-blur-sm mx-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
        <p className="text-amber-600 font-medium text-sm mb-2">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
        <div className="flex gap-2 mt-3">
          {[<Linkedin key="li" size={16} />, <Mail key="mail" size={16} />].map((icon, idx) => (
            <a key={idx} href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
              {icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Animated counter component
const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = "",
}: { value: number; duration?: number; suffix?: string }) => {
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

  return (
    <span ref={nodeRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function ConstructionWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("Alle")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Handle tab change and trigger loading state
  const handleTabChange = (value: string) => {
    setIsLoading(true)
    setActiveTab(value)

    // Reset loading state after 500ms
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

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

  // Filter projects based on active tab and search query
  const filteredProjects = projects.filter((project) => {
    const matchesTab =
      activeTab === "Alle" ||
      (activeTab === "Wohnbau" && project.category === "Wohnbau") ||
      (activeTab === "Gewerbebau" && project.category === "Gewerbebau") ||
      (activeTab === "Infrastruktur" && project.category === "Infrastruktur") ||
      (activeTab === "Ausgewählt" && project.featured)

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  // View project details
  const viewProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setProjectDetailsOpen(true)
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
            <HardHat className="h-6 w-6 text-amber-600" />
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              BauSchweiz
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <motion.a
              href="#home"
              className="hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Startseite
            </motion.a>
            <motion.a
              href="#projects"
              className="hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projekte
            </motion.a>
            <motion.a
              href="#services"
              className="hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Leistungen
            </motion.a>
            <motion.a
              href="#about"
              className="hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Über uns
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontakt
            </motion.a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setContactOpen(true)}
              className="hidden md:flex items-center gap-1 bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-2 rounded-full text-white transition-colors"
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
                  <HardHat className="h-5 w-5 text-amber-600" />
                  <h2 className="font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    BauSchweiz
                  </h2>
                </div>
                <button className="text-gray-900" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Startseite
                </a>
                <a
                  href="#projects"
                  className="text-gray-900 hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Projekte
                </a>
                <a
                  href="#services"
                  className="text-gray-900 hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Leistungen
                </a>
                <a
                  href="#about"
                  className="text-gray-900 hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Über uns
                </a>
                <a
                  href="#contact"
                  className="text-gray-900 hover:text-amber-600 transition-colors py-2 border-b border-gray-100"
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
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white"
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
        <motion.div className="absolute inset-0 bg-black/40 z-10" style={{ opacity: heroOpacity }}></motion.div>
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
            alt="Bauprojekt in den Schweizer Alpen"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Wir bauen Ihre Vision</h2>
            <p className="text-lg md:text-xl mb-8">
              Qualität, Präzision und Innovation – Schweizer Baukunst für anspruchsvolle Projekte jeder Größenordnung.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                Projekte entdecken
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                size="lg"
                onClick={() => setContactOpen(true)}
              >
                Beratungsgespräch
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
              <div className="bg-amber-50 p-3 rounded-full mb-3">
                <Building className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={250} />+
              </div>
              <p className="text-gray-600">Abgeschlossene Projekte</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-amber-50 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={35} />
              </div>
              <p className="text-gray-600">Jahre Erfahrung</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-amber-50 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={120} />+
              </div>
              <p className="text-gray-600">Mitarbeiter</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-amber-50 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={15} />
              </div>
              <p className="text-gray-600">Auszeichnungen</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unsere Projekte</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere vielfältigen Bauprojekte in der ganzen Schweiz. Von Wohngebäuden über
              Gewerbeimmobilien bis hin zu Infrastrukturprojekten.
            </p>
          </motion.div>

          <Tabs defaultValue="Alle" className="w-full" onValueChange={handleTabChange} value={activeTab}>
            <div className="flex justify-between items-center mb-8">
              <TabsList className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full p-4">
                <TabsTrigger
                  value="Alle"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-800 data-[state=active]:text-white"
                >
                  Alle
                </TabsTrigger>
                <TabsTrigger
                  value="Wohnbau"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-800 data-[state=active]:text-white"
                >
                  Wohnbau
                </TabsTrigger>
                <TabsTrigger
                  value="Gewerbebau"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-800 data-[state=active]:text-white"
                >
                  Gewerbebau
                </TabsTrigger>
                <TabsTrigger
                  value="Infrastruktur"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-800 data-[state=active]:text-white"
                >
                  Infrastruktur
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Projekte suchen..."
                  className="pl-10 bg-white border-gray-200 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
                    <div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-l-transparent border-r-transparent animate-spin"
                      style={{ borderTopColor: "#d97706" }}
                    ></div>
                  </div>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} onViewDetails={viewProjectDetails} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Keine Projekte gefunden</h3>
                  <p className="text-gray-500 mb-4">
                    Versuchen Sie es mit anderen Suchkriterien oder Filter-Einstellungen.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveTab("Alle")
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unsere Leistungen</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Von der ersten Idee bis zur schlüsselfertigen Übergabe bieten wir umfassende Dienstleistungen für Ihr
              Bauprojekt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Über BauSchweiz</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mb-8"></div>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Seit 1988 steht BauSchweiz für Qualität und Innovation im Schweizer Bauwesen. Als familiengeführtes
                Unternehmen mit Sitz in Zürich haben wir uns auf anspruchsvolle Bauprojekte in der gesamten Schweiz
                spezialisiert.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Unser Team aus erfahrenen Architekten, Ingenieuren und Handwerkern verbindet traditionelles Handwerk mit
                modernster Technologie. Wir legen besonderen Wert auf Nachhaltigkeit und energieeffizientes Bauen.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Schweizer Qualität</h4>
                    <p className="text-gray-600 text-sm">Höchste Qualitätsstandards und Präzision in jedem Detail.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Nachhaltigkeit</h4>
                    <p className="text-gray-600 text-sm">
                      Umweltfreundliche Materialien und energieeffiziente Bauweise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-50 p-2 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Innovation</h4>
                    <p className="text-gray-600 text-sm">Modernste Technologien und innovative Baulösungen.</p>
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
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
                alt="Baustelle mit Arbeitern"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2 text-white">Unser Team</h3>
                <p className="text-gray-200">Erfahrene Experten für Ihr Bauprojekt</p>
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
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lernen Sie die Experten kennen, die Ihre Bauprojekte zum Erfolg führen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Kundenstimmen</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
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
                      <p className="text-amber-600 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{`"${testimonial.text}"`}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Häufig gestellte Fragen</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Antworten auf die wichtigsten Fragen zu unseren Dienstleistungen und Bauprojekten.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4 hover:text-amber-600">
                  Wie läuft der Bauprozess mit BauSchweiz ab?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    Unser Bauprozess beginnt mit einem ausführlichen Beratungsgespräch, in dem wir Ihre Anforderungen
                    und Wünsche erfassen. Anschließend erstellen wir ein detailliertes Konzept mit Kostenvoranschlag.
                    Nach Ihrer Zustimmung beginnt die Planungsphase, gefolgt von der Bauausführung. Während des gesamten
                    Prozesses steht Ihnen ein persönlicher Projektleiter zur Verfügung, der Sie regelmäßig über den
                    Fortschritt informiert.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4 hover:text-amber-600">
                  Welche Garantien bietet BauSchweiz?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    Wir bieten umfassende Garantien für unsere Bauleistungen gemäß den Schweizer Normen und
                    Vorschriften. Dies umfasst eine 5-jährige Garantie auf alle Bauarbeiten sowie spezifische Garantien
                    für einzelne Bauteile und Materialien. Zusätzlich sind wir durch eine umfassende
                    Berufshaftpflichtversicherung abgesichert, die Ihnen zusätzliche Sicherheit bietet.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4 hover:text-amber-600">
                  Wie berücksichtigt BauSchweiz Nachhaltigkeitsaspekte?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    Nachhaltigkeit ist ein zentraler Bestandteil unserer Unternehmensphilosophie. Wir setzen auf
                    energieeffiziente Bauweisen, umweltfreundliche Materialien und innovative Technologien zur
                    Reduzierung des ökologischen Fußabdrucks. Unsere Projekte werden nach den neuesten Energiestandards
                    geplant und umgesetzt, und wir beraten Sie gerne zu Fördermöglichkeiten für nachhaltige
                    Baumaßnahmen.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4 hover:text-amber-600">
                  Arbeitet BauSchweiz in der gesamten Schweiz?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    Ja, wir sind in der gesamten Schweiz tätig. Mit unserem Hauptsitz in Zürich und regionalen Büros in
                    Bern, Basel und Luzern können wir Projekte in allen Kantonen effizient betreuen. Unser Team ist mit
                    den lokalen Bauvorschriften und Gegebenheiten vertraut und arbeitet eng mit lokalen Behörden und
                    Partnern zusammen.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 hover:text-amber-600">
                  Wie werden die Kosten für ein Bauprojekt kalkuliert?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    Die Kosten für ein Bauprojekt werden auf Basis Ihrer spezifischen Anforderungen, der Projektgröße,
                    der gewünschten Materialien und der baulichen Gegebenheiten kalkuliert. Wir erstellen einen
                    detaillierten Kostenvoranschlag, der alle Positionen transparent aufschlüsselt. Während des Projekts
                    informieren wir Sie regelmäßig über den Kostenstand und besprechen eventuelle Änderungen frühzeitig
                    mit Ihnen.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Kontaktieren Sie uns</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-6"></div>
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
                  <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Baustrasse 42, 8001 Zürich, Schweiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+41 44 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">E-Mail</h4>
                    <p className="text-gray-600">info@bauschweiz.ch</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Öffnungszeiten</h4>
                    <p className="text-gray-600">Mo-Fr: 8:00 - 17:00 Uhr</p>
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
                    <Linkedin key="li" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-amber-600 border border-gray-200 hover:border-amber-600 transition-colors"
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

              <form className="space-y-6" onSubmit={handleContactSubmit}>
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

                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white">
                  Nachricht senden
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HardHat className="h-6 w-6 text-amber-500" />
                <h3 className="text-xl font-bold">BauSchweiz</h3>
              </div>
              <p className="text-gray-400 mb-4">Qualität, Präzision und Innovation – Schweizer Baukunst seit 1988.</p>
              <div className="flex gap-4">
                {[
                  <Facebook key="fb" size={18} />,
                  <Instagram key="ig" size={18} />,
                  <Linkedin key="li" size={18} />,
                ].map((icon, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Leistungen</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Architektur & Planung
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Baumanagement
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Generalunternehmung
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Renovierung & Sanierung
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Unternehmen</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Über uns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Karriere
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Referenzen
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Kontakt</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">Baustrasse 42, 8001 Zürich</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">+41 44 123 45 67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">info@bauschweiz.ch</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} BauSchweiz AG. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Project Details Dialog */}
      <Dialog open={projectDetailsOpen} onOpenChange={setProjectDetailsOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <button
            className="absolute right-4 top-4 z-50 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => setProjectDetailsOpen(false)}
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          {selectedProject && (
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative h-[400px]">
                <Image
                  src={selectedProject.images[0] || "/placeholder.svg?height=500&width=900"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <Badge className="bg-white text-gray-800 border-0 mb-2">{selectedProject.category}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <div className="flex items-center text-white/90 mt-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <div className="text-xl font-bold text-amber-600">{selectedProject.year}</div>
                  <div className="flex gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Ruler className="h-5 w-5 mr-1" />
                      <span>{selectedProject.size.toLocaleString()} m²</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Beschreibung</h3>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Leistungen</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProject.services.map((service: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Galerie</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedProject.images.map((image: string, index: number) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg?height=300&width=500"}
                          alt={`${selectedProject.title} - Bild ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Button
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-800 text-white"
                    onClick={() => {
                      setProjectDetailsOpen(false)
                      setContactOpen(true)
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Kontakt aufnehmen
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setProjectDetailsOpen(false)}>
                    Zurück zur Übersicht
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
              {selectedProject
                ? `Interesse an "${selectedProject.title}"? Füllen Sie das Formular aus, und wir melden uns bei Ihnen.`
                : "Füllen Sie das Formular aus, und wir melden uns bei Ihnen."}
            </DialogDescription>
          </DialogHeader>

          {contactSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nachricht gesendet!</h3>
              <p className="text-gray-600">
                Vielen Dank für Ihre Anfrage. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {selectedProject && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={selectedProject.images[0] || "/placeholder.svg?height=200&width=200"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedProject.title}</h4>
                    <p className="text-sm text-gray-500">{selectedProject.location}</p>
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
                    selectedProject
                      ? `Ich interessiere mich für das Projekt "${selectedProject.title}" und hätte gerne weitere Informationen.`
                      : ""
                  }
                />
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" id="privacy" className="rounded border-gray-300" required />
                <Label htmlFor="privacy" className="text-sm">
                  Ich stimme der{" "}
                  <a href="#" className="text-amber-600 hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu
                </Label>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white"
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
    </div>
  )
}

