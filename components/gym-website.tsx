"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Phone,
  Clock,
  Calendar,
  User,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Check,
  Loader2,
  Dumbbell,
  Play,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Definición de interfaces para evitar "any"
interface ScheduleItem {
  day: string
  time: string
}

interface TrainingProgram {
  id: number
  name: string
  description: string
  duration: string
  intensity: string
  image: string
  popular: boolean
  beginner: boolean
  schedule: ScheduleItem[]
}

interface MembershipPlan {
  id: number
  name: string
  price: number
  duration: string
  features: string[]
  popular: boolean
}

interface Trainer {
  id: number
  name: string
  specialty: string
  bio: string
  image: string
  certifications: string[]
}

// Datos de programas de entrenamiento
const trainingPrograms: TrainingProgram[] = [
  {
    id: 1,
    name: "Krafttraining",
    description: "Bauen Sie Muskeln auf und verbessern Sie Ihre Kraft mit unserem umfassenden Krafttrainingsprogramm",
    duration: "60 min",
    intensity: "Mittel bis Hoch",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop",
    popular: true,
    beginner: false,
    schedule: [
      { day: "Montag", time: "10:00, 16:00, 19:00" },
      { day: "Mittwoch", time: "10:00, 16:00, 19:00" },
      { day: "Freitag", time: "10:00, 16:00, 19:00" },
    ],
  },
  {
    id: 2,
    name: "Cardio-Fitness",
    description: "Verbessern Sie Ihre Ausdauer und verbrennen Sie Kalorien mit unserem hochintensiven Cardio-Programm",
    duration: "45 min",
    intensity: "Hoch",
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=200&auto=format&fit=crop",
    popular: true,
    beginner: false,
    schedule: [
      { day: "Dienstag", time: "09:00, 17:00, 20:00" },
      { day: "Donnerstag", time: "09:00, 17:00, 20:00" },
      { day: "Samstag", time: "10:00, 14:00" },
    ],
  },
  {
    id: 3,
    name: "Yoga & Flexibilität",
    description: "Verbessern Sie Ihre Flexibilität, Balance und mentale Klarheit mit unseren geführten Yoga-Kursen",
    duration: "50 min",
    intensity: "Niedrig bis Mittel",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=200&auto=format&fit=crop",
    popular: false,
    beginner: true,
    schedule: [
      { day: "Montag", time: "08:00, 18:00" },
      { day: "Mittwoch", time: "08:00, 18:00" },
      { day: "Freitag", time: "08:00, 18:00" },
    ],
  },
  {
    id: 4,
    name: "Funktionelles Training",
    description:
      "Verbessern Sie Ihre Alltagsbewegungen und Körperfunktionalität mit diesem ganzheitlichen Trainingsprogramm",
    duration: "55 min",
    intensity: "Mittel",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&auto=format&fit=crop",
    popular: false,
    beginner: true,
    schedule: [
      { day: "Dienstag", time: "11:00, 15:00" },
      { day: "Donnerstag", time: "11:00, 15:00" },
      { day: "Samstag", time: "09:00" },
    ],
  },
  {
    id: 5,
    name: "HIIT",
    description:
      "Maximieren Sie Ihre Fettverbrennung mit unserem hochintensiven Intervalltraining in kurzen, effektiven Einheiten",
    duration: "30 min",
    intensity: "Sehr Hoch",
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=200&auto=format&fit=crop",
    popular: true,
    beginner: false,
    schedule: [
      { day: "Montag", time: "12:00, 17:00" },
      { day: "Mittwoch", time: "12:00, 17:00" },
      { day: "Freitag", time: "12:00, 17:00" },
    ],
  },
  {
    id: 6,
    name: "Anfänger Fitness",
    description: "Der perfekte Einstieg in Ihre Fitnessreise mit grundlegenden Übungen und persönlicher Betreuung",
    duration: "45 min",
    intensity: "Niedrig",
    image: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=200&auto=format&fit=crop",
    popular: false,
    beginner: true,
    schedule: [
      { day: "Montag", time: "14:00" },
      { day: "Mittwoch", time: "14:00" },
      { day: "Freitag", time: "14:00" },
    ],
  },
]

// Datos de planes de membresía
const membershipPlans: MembershipPlan[] = [
  {
    id: 1,
    name: "Basis",
    price: 29.99,
    duration: "monatlich",
    features: [
      "Zugang zu allen Geräten",
      "Grundlegende Fitnesskurse",
      "Umkleideschränke und Duschen",
      "Fitness-App-Zugang",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Premium",
    price: 49.99,
    duration: "monatlich",
    features: [
      "Alles im Basis-Plan",
      "Unbegrenzte Kurse",
      "1 persönliches Training pro Monat",
      "Wellness-Bereich-Zugang",
      "Ernährungsberatung",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Elite",
    price: 79.99,
    duration: "monatlich",
    features: [
      "Alles im Premium-Plan",
      "4 persönliche Trainings pro Monat",
      "Fortgeschrittene Leistungsanalyse",
      "Exklusive Elite-Kurse",
      "Prioritäre Buchung",
      "Gästepässe",
    ],
    popular: false,
  },
]

// Datos de entrenadores
const trainers: Trainer[] = [
  {
    id: 1,
    name: "Markus Weber",
    specialty: "Krafttraining & Bodybuilding",
    bio: "Ehemaliger Wettkampf-Bodybuilder mit über 15 Jahren Erfahrung im Krafttraining und Muskelaufbau.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=200&auto=format&fit=crop",
    certifications: ["IFBB Pro", "Zertifizierter Krafttrainer", "Ernährungsberater"],
  },
  {
    id: 2,
    name: "Julia Schneider",
    specialty: "Yoga & Pilates",
    bio: "Internationale Yoga-Lehrerin mit Ausbildung in Indien und über 10 Jahren Unterrichtserfahrung.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop",
    certifications: ["RYT 500", "Pilates-Instruktorin", "Meditation Coach"],
  },
  {
    id: 3,
    name: "Thomas Müller",
    specialty: "Funktionelles Training & HIIT",
    bio: "Ehemaliger Leistungssportler und CrossFit-Athlet mit Spezialisierung auf hochintensives Intervalltraining.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop",
    certifications: ["CrossFit Level 2", "Funktioneller Trainingsexperte", "TRX-Trainer"],
  },
  {
    id: 4,
    name: "Sarah Fischer",
    specialty: "Cardio & Gewichtsmanagement",
    bio: "Spezialistin für Gewichtsmanagement und Cardio-Training mit einem Hintergrund in Sportwissenschaften.",
    image: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=200&auto=format&fit=crop",
    certifications: ["Sportwissenschaftlerin", "Gewichtsmanagement-Spezialistin", "Lauftrainerin"],
  },
]

// Datos de testimonios
const testimonials = [
  {
    id: 1,
    name: "Michael Bauer",
    text: "Seit ich vor 6 Monaten mit dem Training begonnen habe, habe ich 15 kg abgenommen und fühle mich besser als je zuvor. Die Trainer sind erstklassig!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    membership: "Premium-Mitglied",
  },
  {
    id: 2,
    name: "Anna Schmidt",
    text: "Die Yoga-Kurse haben meine Rückenschmerzen komplett beseitigt. Die Atmosphäre ist entspannt und die Trainer sehr aufmerksam.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    membership: "Elite-Mitglied",
  },
  {
    id: 3,
    name: "David Wagner",
    text: "Als Anfänger war ich anfangs eingeschüchtert, aber das Team hat mich perfekt betreut. Die App zur Buchung von Kursen ist auch super praktisch!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    membership: "Basis-Mitglied",
  },
]

// Imágenes para la galería
const galleryImages = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=300&auto=format&fit=crop",
]

// Componente contador animado
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

// Componente para estrellas de calificación
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-amber-500 fill-amber-500" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  )
}

// Componente para la tarjeta del programa
const ProgramCard = ({
  program,
  onBookClass,
}: {
  program: TrainingProgram
  onBookClass: (program: TrainingProgram) => void
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={program.image || "/placeholder.svg?height=200&width=200"}
          alt={program.name}
          className="object-cover"
          fill
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {program.popular && (
            <Badge variant="default" className="bg-amber-500 text-white">
              Beliebt
            </Badge>
          )}
          {program.beginner && (
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">
              Anfängerfreundlich
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{program.name}</h3>
          <Badge variant="outline" className="text-gray-600">
            {program.duration}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{program.description}</p>

        <div className="mt-3 flex items-center text-sm text-gray-600">
          <span className="font-medium">Intensität:</span>
          <div className="ml-2 flex items-center">
            <span className="mr-2">{program.intensity}</span>
            {program.intensity === "Niedrig" && <Progress value={30} className="h-1.5 w-16" />}
            {program.intensity === "Niedrig bis Mittel" && <Progress value={40} className="h-1.5 w-16" />}
            {program.intensity === "Mittel" && <Progress value={50} className="h-1.5 w-16" />}
            {program.intensity === "Mittel bis Hoch" && <Progress value={70} className="h-1.5 w-16" />}
            {program.intensity === "Hoch" && <Progress value={85} className="h-1.5 w-16" />}
            {program.intensity === "Sehr Hoch" && <Progress value={95} className="h-1.5 w-16" />}
          </div>
        </div>

        <Button
          onClick={() => onBookClass(program)}
          className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
          size="sm"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Kurs buchen
        </Button>
      </div>
    </motion.div>
  )
}

// Componente para la tarjeta de membresía
const MembershipCard = ({
  plan,
  onSelectPlan,
}: {
  plan: MembershipPlan
  onSelectPlan: (plan: MembershipPlan) => void
}) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-lg overflow-hidden border p-6 shadow-sm transition-all",
        plan.popular ? "border-amber-500 shadow-amber-100" : "border-gray-200",
      )}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1">Beliebt</div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-gray-500 ml-1">/{plan.duration}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSelectPlan(plan)}
        className={cn(
          "w-full",
          plan.popular ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900",
        )}
      >
        Jetzt auswählen
      </Button>
    </motion.div>
  )
}

// Componente para la tarjeta del entrenador
const TrainerCard = ({ trainer }: { trainer: Trainer }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trainer.image || "/placeholder.svg?height=200&width=200"}
          alt={trainer.name}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{trainer.name}</h3>
        <p className="text-amber-600 font-medium text-sm mb-2">{trainer.specialty}</p>
        <p className="text-gray-600 text-sm mb-3">{trainer.bio}</p>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Zertifizierungen:</p>
          <div className="flex flex-wrap gap-1">
            {trainer.certifications.map((cert: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function GymWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [membershipOpen, setMembershipOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [membershipSuccess, setMembershipSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Manejar efecto scroll para el header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Alternar menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  // Reservar un curso
  const bookClass = (program: TrainingProgram) => {
    setSelectedProgram(program)
    setBookingOpen(true)
  }

  // Seleccionar plan de membresía
  const selectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan)
    setMembershipOpen(true)
  }

  // Manejar envío de reserva
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de llamada a API
    setTimeout(() => {
      setIsSubmitting(false)
      setBookingSuccess(true)

      // Reiniciar formulario después del éxito
      setTimeout(() => {
        setBookingOpen(false)
        setBookingSuccess(false)
        setSelectedProgram(null)
      }, 2000)
    }, 1500)
  }

  // Manejar envío de membresía
  const handleMembershipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de llamada a API
    setTimeout(() => {
      setIsSubmitting(false)
      setMembershipSuccess(true)

      // Reiniciar formulario después del éxito
      setTimeout(() => {
        setMembershipOpen(false)
        setMembershipSuccess(false)
        setSelectedPlan(null)
      }, 2000)
    }, 1500)
  }

  // Removing unused animation variants to fix TypeScript errors
  // The fadeIn, slideUp, and staggerContainer variables were defined but never used

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
            <Dumbbell className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold tracking-tight">FitnessPro</h1>
          </motion.div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex gap-8">
            <motion.a
              href="#home"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Startseite
            </motion.a>
            <motion.a
              href="#programs"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Programme
            </motion.a>
            <motion.a
              href="#membership"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mitgliedschaft
            </motion.a>
            <motion.a
              href="#trainers"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trainer
            </motion.a>
            <motion.a
              href="#about"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Über uns
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-amber-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontakt
            </motion.a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setMembershipOpen(true)}
              className="hidden md:flex items-center gap-1 bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-md text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="h-4 w-4" />
              <span>Mitglied werden</span>
            </motion.button>

            {/* Botón menú móvil */}
            <motion.button className="md:hidden text-gray-900" onClick={toggleMobileMenu} whileTap={{ scale: 0.9 }}>
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Menú Móvil */}
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
                  <Dumbbell className="h-5 w-5 text-amber-500" />
                  <h2 className="font-bold">FitnessPro</h2>
                </div>
                <button className="text-gray-900" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Startseite
                </a>
                <a
                  href="#programs"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Programme
                </a>
                <a
                  href="#membership"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Mitgliedschaft
                </a>
                <a
                  href="#trainers"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Trainer
                </a>
                <a
                  href="#about"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Über uns
                </a>
                <a
                  href="#contact"
                  className="text-gray-900 hover:text-amber-500 transition-colors py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  Kontakt
                </a>
              </nav>

              <div className="mt-auto">
                <Button
                  onClick={() => {
                    setMembershipOpen(true)
                    toggleMobileMenu()
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Mitglied werden
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sección Hero */}
      <section id="home" className="relative h-[700px] overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 bg-black/40 z-10" style={{ opacity: heroOpacity }}></motion.div>
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
            alt="Fitness training"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Erreiche deine Fitnessziele</h2>
            <p className="text-lg md:text-xl mb-8">
              Modernste Ausrüstung, professionelle Trainer und maßgeschneiderte Programme für jeden Fitnessgrad. Starte
              deine Transformation heute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setMembershipOpen(true)}
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Jetzt starten
              </Button>
              <Button
                onClick={() => setVideoOpen(true)}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white"
              >
                <Play className="h-4 w-4 mr-2" />
                Tour ansehen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Quick Info */}
      <section className="py-12 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-amber-50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Öffnungszeiten</h3>
                <p className="text-gray-600 text-sm">Mo-Fr: 6:00 - 23:00 Uhr | Sa-So: 8:00 - 20:00 Uhr</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-amber-50 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Standort</h3>
                <p className="text-gray-600 text-sm">Fitnessstraße 42, 10115 Berlin</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-amber-50 p-3 rounded-full">
                <Phone className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Kontakt</h3>
                <p className="text-gray-600 text-sm">+49 (0) 30 123 45678</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección Programas */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unsere Trainingsprogramme</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entdecke unsere vielfältigen Trainingsprogramme, die für alle Fitnesslevel geeignet sind. Von Anfängern
              bis zu Fortgeschrittenen - wir haben das richtige Programm für dich.
            </p>
          </motion.div>

          <Tabs defaultValue="Alle" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-12 bg-white p-1 border border-gray-200 rounded-lg">
              <TabsTrigger value="Alle" className="rounded-md">
                Alle Programme
              </TabsTrigger>
              <TabsTrigger value="Anfänger" className="rounded-md">
                Anfänger
              </TabsTrigger>
              <TabsTrigger value="Fortgeschritten" className="rounded-md">
                Fortgeschritten
              </TabsTrigger>
              <TabsTrigger value="Beliebt" className="rounded-md">
                Beliebt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Alle" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} onBookClass={bookClass} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Anfänger" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms
                  .filter((program) => program.beginner)
                  .map((program) => (
                    <ProgramCard key={program.id} program={program} onBookClass={bookClass} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="Fortgeschritten" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms
                  .filter((program) => !program.beginner)
                  .map((program) => (
                    <ProgramCard key={program.id} program={program} onBookClass={bookClass} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="Beliebt" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms
                  .filter((program) => program.popular)
                  .map((program) => (
                    <ProgramCard key={program.id} program={program} onBookClass={bookClass} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sección Membresías */}
      <section id="membership" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Mitgliedschaften</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wähle die Mitgliedschaft, die am besten zu deinen Zielen und deinem Budget passt. Alle Pläne beinhalten
              Zugang zu unseren erstklassigen Einrichtungen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipPlans.map((plan) => (
              <MembershipCard key={plan.id} plan={plan} onSelectPlan={selectPlan} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección Entrenadores */}
      <section id="trainers" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unsere Trainer</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unsere zertifizierten Trainer sind Experten auf ihrem Gebiet und helfen dir, deine Fitnessziele zu
              erreichen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Über FitnessPro</h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Seit 2010 bietet FitnessPro erstklassige Fitnesseinrichtungen und professionelle Betreuung für Menschen
                aller Fitnesslevel. Unser Ziel ist es, jeden Einzelnen auf seinem Weg zu einem gesünderen und aktiveren
                Lebensstil zu unterstützen.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Mit modernster Ausrüstung, einer Vielzahl von Kursen und einem Team aus erfahrenen Trainern bieten wir
                alles, was du brauchst, um deine persönlichen Fitnessziele zu erreichen.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="text-center border-r border-gray-200">
                  <div className="text-4xl font-bold text-amber-500 mb-2">
                    <AnimatedCounter value={12} />+
                  </div>
                  <p className="text-gray-600">Jahre Erfahrung</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">
                    <AnimatedCounter value={5000} />+
                  </div>
                  <p className="text-gray-600">Zufriedene Mitglieder</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[500px] overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop"
                alt="Modernes Fitnessstudio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold mb-2 text-white">Modernste Ausstattung</h3>
                <p className="text-gray-200">Für optimale Trainingsergebnisse</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Was unsere Mitglieder sagen</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Erfahrungen unserer zufriedenen Mitglieder</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-50 p-8 rounded-lg border border-gray-100"
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
                      <p className="text-amber-500 text-sm">{testimonial.membership}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="mt-4">
                    <RatingStars rating={testimonial.rating} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección Galería */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Galerie</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Einblicke in unser modernes Fitnessstudio</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={image || "/placeholder.svg?height=300&width=300"}
                  alt="Galeriebild"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Kontaktiere uns</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600">Wir freuen uns, von dir zu hören</p>
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
                  <MapPin className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Fitnessstraße 42, 10115 Berlin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+49 (0) 30 123 45678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">E-Mail</h4>
                    <p className="text-gray-600">info@fitnesspro.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Öffnungszeiten</h4>
                    <p className="text-gray-600">Mo-Fr: 6:00 - 23:00 Uhr</p>
                    <p className="text-gray-600">Sa-So: 8:00 - 20:00 Uhr</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4 text-gray-900">Folge uns</h4>
                <div className="flex gap-4">
                  {[
                    <Facebook key="fb" size={20} />,
                    <Instagram key="ig" size={20} />,
                    <Twitter key="tw" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-colors"
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
              className="bg-gray-50 p-8 rounded-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900">Sende uns eine Nachricht</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Dein Name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" placeholder="Deine E-Mail" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Betreff</Label>
                  <Input id="subject" placeholder="Betreff" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea id="message" placeholder="Deine Nachricht" rows={4} className="mt-2" />
                </div>

                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Nachricht senden</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diálogo para reservar clase */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Kurs buchen</DialogTitle>
            <DialogDescription>{selectedProgram && `Buche deinen Platz für ${selectedProgram.name}`}</DialogDescription>
          </DialogHeader>

          {bookingSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Buchung bestätigt!</h3>
              <p className="text-gray-600">
                Wir haben eine Bestätigung an deine E-Mail gesendet. Wir freuen uns, dich im Kurs zu sehen!
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {selectedProgram && (
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">{selectedProgram.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedProgram.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Verfügbare Zeiten:</p>
                    {selectedProgram.schedule.map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{item.day}:</span> {item.time}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Datum</Label>
                  <Input id="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Zeit</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Zeit auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "08:00",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                      ].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time} Uhr
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Dein vollständiger Name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" placeholder="Deine E-Mail" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="Deine Telefonnummer" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Anmerkungen (Optional)</Label>
                <Textarea id="notes" placeholder="Besondere Anforderungen oder Fragen" />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verarbeitung...
                    </>
                  ) : (
                    "Buchung bestätigen"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para membresía */}
      <Dialog open={membershipOpen} onOpenChange={setMembershipOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Mitgliedschaft starten</DialogTitle>
            <DialogDescription>
              {selectedPlan
                ? `Wähle den ${selectedPlan.name}-Plan für $${selectedPlan.price}/${selectedPlan.duration}`
                : "Wähle einen Mitgliedschaftsplan und starte deine Fitnessreise"}
            </DialogDescription>
          </DialogHeader>

          {membershipSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mitgliedschaft bestätigt!</h3>
              <p className="text-gray-600">
                Wir haben eine Bestätigung an deine E-Mail gesendet. Willkommen in der FitnessPro-Familie!
              </p>
            </div>
          ) : (
            <form onSubmit={handleMembershipSubmit} className="space-y-4">
              {!selectedPlan && (
                <div className="space-y-2 mb-4">
                  <Label>Wähle einen Plan</Label>
                  <RadioGroup defaultValue="premium">
                    {membershipPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-start space-x-2 p-3 rounded-lg border border-gray-200 mb-2"
                      >
                        <RadioGroupItem value={plan.name.toLowerCase()} id={`plan-${plan.id}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`plan-${plan.id}`} className="font-bold flex items-center">
                            {plan.name}
                            {plan.popular && <Badge className="ml-2 bg-amber-500 text-white">Beliebt</Badge>}
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            ${plan.price}/{plan.duration}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {plan.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                {feature}
                              </li>
                            ))}
                            {plan.features.length > 3 && (
                              <li className="text-sm text-gray-600">+{plan.features.length - 3} weitere Vorteile</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input id="firstName" placeholder="Dein Vorname" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input id="lastName" placeholder="Dein Nachname" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" placeholder="Deine E-Mail" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="Deine Telefonnummer" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" placeholder="Deine Adresse" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Zahlungsmethode</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Zahlungsmethode auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Kreditkarte</SelectItem>
                    <SelectItem value="debit">Lastschrift</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm">
                  Ich stimme den{" "}
                  <a href="#" className="text-amber-500 hover:underline">
                    Nutzungsbedingungen
                  </a>{" "}
                  und der{" "}
                  <a href="#" className="text-amber-500 hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu
                </Label>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verarbeitung...
                    </>
                  ) : (
                    "Mitgliedschaft bestätigen"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para video */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden max-h-[90vh]">
          <div className="relative aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

