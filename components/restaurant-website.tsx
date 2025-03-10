"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Clock,
  Calendar,
  ShoppingBag,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Definición de interfaces para tipado
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  byGlass?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// Food menu items
const menuItems: { category: string; items: MenuItem[] }[] = [
  {
    category: "Vorspeisen",
    items: [
      {
        id: 1,
        name: "Bruschetta",
        description:
          "Geröstetes Brot mit Knoblauch, Olivenöl, Salz, Tomaten und Basilikum",
        price: 8.95,
        image:
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegan: true,
      },
      {
        id: 2,
        name: "Arancini",
        description: "Gefüllte Reisbällchen mit Paniermehl und frittiert",
        price: 10.95,
        image:
          "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 3,
        name: "Caprese Salat",
        description:
          "Frischer Mozzarella, Tomaten und Basilikum mit Salz und Olivenöl gewürzt",
        price: 12.95,
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
    ],
  },
  {
    category: "Hauptgerichte",
    items: [
      {
        id: 4,
        name: "Pizza Margherita",
        description:
          "Klassische Pizza mit Tomatensauce, Mozzarella und Basilikum",
        price: 14.95,
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegetarian: true,
      },
      {
        id: 5,
        name: "Spaghetti Carbonara",
        description:
          "Spaghetti mit einer cremigen Sauce aus Eiern, Käse, Pancetta und schwarzem Pfeffer",
        price: 16.95,
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Risotto ai Funghi",
        description:
          "Cremiges Risotto mit Waldpilzen und Parmesan",
        price: 18.95,
        image:
          "https://images.unsplash.com/photo-1633964913849-96bb09add3f5?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 7,
        name: "Osso Buco",
        description:
          "Kalbshaxe geschmort mit Gemüse, Weißwein und Brühe",
        price: 24.95,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        id: 8,
        name: "Tiramisu",
        description:
          "Kaffeegetränktes italienisches Dessert aus Löffelbiskuits und Mascarpone-Creme",
        price: 8.95,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegetarian: true,
      },
      {
        id: 9,
        name: "Panna Cotta",
        description:
          "Italienisches Dessert aus gesüßter Sahne mit Gelatine",
        price: 7.95,
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 10,
        name: "Cannoli",
        description:
          "Röhrenförmige Schalen aus frittiertem Teig gefüllt mit süßer, cremiger Füllung",
        price: 6.95,
        image:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
    ],
  },
  {
    category: "Getränke",
    items: [
      {
        id: 11,
        name: "Italienische Weinauswahl",
        description:
          "Auswahl an feinen italienischen Weinen - rot, weiß und prickelnd",
        price: 9.95,
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=200&auto=format&fit=crop",
        byGlass: true,
      },
      {
        id: 12,
        name: "Aperol Spritz",
        description: "Prosecco, Aperol und Sodawasser",
        price: 8.95,
        image:
          "https://images.unsplash.com/photo-1527761939622-933c972ea2fb?q=80&w=200&auto=format&fit=crop",
        popular: true,
      },
      {
        id: 13,
        name: "Espresso",
        description: "Starker italienischer Kaffee",
        price: 3.95,
        image:
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop",
        vegan: true,
      },
    ],
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    text: "Das beste italienische Essen außerhalb Italiens! Die Atmosphäre ist authentisch und der Service tadellos.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sophie Laurent",
    text: "Ihre hausgemachte Pasta ist zum Sterben. Ich komme seit Jahren hierher und die Qualität enttäuscht nie.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "James Wilson",
    text: "Das Reservierungssystem ist so bequem und ihr Takeaway-Service ist prompt. Tolles Essen, toller Service!",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
];

// Gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560611588-163f49a6cbe9?q=80&w=300&auto=format&fit=crop",
];

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.min(end, duration * 60);
    const counter = setInterval(() => {
      start += 1;
      const progress = start / totalFrames;
      setCount(Math.floor(progress * end));

      if (start === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-rose-700 fill-rose-700" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  );
};

// Food item card component
const FoodItem = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(item);

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      className="bg-white rounded-none overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=200&width=200"}
          alt={item.name}
          className="object-cover"
          fill
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {item.popular && (
            <Badge variant="default" className="bg-rose-700 rounded-none">
              Beliebt
            </Badge>
          )}
          {item.vegetarian && (
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 rounded-none">
              Vegetarisch
            </Badge>
          )}
          {item.vegan && (
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 rounded-none">
              Vegan
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg">{item.name}</h3>
          <span className="font-serif text-rose-700">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 font-light">{item.description}</p>
        <motion.button
          onClick={handleAddToCart}
          className={`w-full mt-4 rounded-none text-white flex items-center justify-center py-2 px-4 text-sm ${
            isAdded ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-800"
          }`}
          whileTap={{ scale: 0.95 }}
          animate={isAdded ? { x: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          disabled={isAdded}
        >
          <ShoppingBag className={`h-4 w-4 mr-2 ${isAdded ? "animate-bounce" : ""}`} />
          {isAdded ? "Añadido al carrito" : "Zum Warenkorb hinzufügen"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export function RestaurantWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle reservation submission
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReservationSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setReservationOpen(false);
        setReservationSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);

      // Reset form and cart after success
      setTimeout(() => {
        setOrderOpen(false);
        setOrderSuccess(false);
        setCartItems([]);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-cream-50 min-h-screen font-sans">
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
            <h1 className="text-2xl font-serif tracking-wide text-rose-800">Trattoria Milano</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <motion.a
              href="#home"
              className="hover:text-rose-700 transition-colors font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Startseite
            </motion.a>
            <motion.a
              href="#menu"
              className="hover:text-rose-700 transition-colors font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Speisekarte
            </motion.a>
            <motion.a
              href="#about"
              className="hover:text-rose-700 transition-colors font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Über uns
            </motion.a>
            <motion.a
              href="#gallery"
              className="hover:text-rose-700 transition-colors font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Galerie
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-rose-700 transition-colors font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontakt
            </motion.a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setReservationOpen(true)}
              className="hidden md:flex items-center gap-1 bg-red-700 hover:bg-gray-800 px-6 py-2 rounded-none text-sm font-light tracking-wide text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="h-4 w-4" />
              <span>Tisch reservieren</span>
            </motion.button>

            <motion.button
              onClick={() => setOrderOpen(true)}
              className="hidden md:flex items-center gap-1 bg-white text-gray-800 hover:bg-gray-100 border border-gray-700 px-6 py-2 rounded-none text-sm font-light tracking-wide transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Jetzt bestellen</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
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
                <h2 className="text-rose-800 font-serif">Trattoria Milano</h2>
                <button className="text-gray-900" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-rose-700 transition-colors py-2 border-b border-gray-100 font-light tracking-wide"
                  onClick={toggleMobileMenu}
                >
                  Startseite
                </a>
                <a
                  href="#menu"
                  className="text-gray-900 hover:text-rose-700 transition-colors py-2 border-b border-gray-100 font-light tracking-wide"
                  onClick={toggleMobileMenu}
                >
                  Speisekarte
                </a>
                <a
                  href="#about"
                  className="text-gray-900 hover:text-rose-700 transition-colors py-2 border-b border-gray-100 font-light tracking-wide"
                  onClick={toggleMobileMenu}
                >
                  Über uns
                </a>
                <a
                  href="#gallery"
                  className="text-gray-900 hover:text-rose-700 transition-colors py-2 border-b border-gray-100 font-light tracking-wide"
                  onClick={toggleMobileMenu}
                >
                  Galerie
                </a>
                <a
                  href="#contact"
                  className="text-gray-900 hover:text-rose-700 transition-colors py-2 border-b border-gray-100 font-light tracking-wide"
                  onClick={toggleMobileMenu}
                >
                  Kontakt
                </a>
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setReservationOpen(true);
                    toggleMobileMenu();
                  }}
                  className="bg-red-700 hover:bg-gray-800 w-full rounded-none text-white"
                >
                  <Calendar className="h-4 w-4 mr-2 text-white" />
                  Tisch reservieren
                </Button>
                <Button
                  onClick={() => {
                    setOrderOpen(true);
                    toggleMobileMenu();
                  }}
                  variant="outline"
                  className="bg-white text-gray-800 hover:bg-gray-100 border-gray-700 w-full rounded-none"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Jetzt bestellen
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
      <section id="home" className="relative h-[700px] overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 bg-black/30 z-10" style={{ opacity: heroOpacity }}></motion.div>
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Italienische Küche"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center p-4 text-white">
          <motion.div
            className="max-w-xl bg-black/30 p-8 backdrop-blur-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ y: heroTextY }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-4 tracking-wide">
              Authentische Italienische Küche
            </h2>
            <p className="text-lg md:text-xl mb-8 font-light tracking-wide">
              Erleben Sie den Geschmack Italiens im Herzen der Stadt. Frische Zutaten, traditionelle Rezepte und eine elegante Atmosphäre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setReservationOpen(true)}
                size="lg"
                className="bg-gray-700 hover:bg-gray-800 rounded-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Tisch reservieren
              </Button>
              <Button
                onClick={() => setOrderOpen(true)}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white rounded-none"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Zum Mitnehmen bestellen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
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
              <div className="bg-rose-50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-rose-800" />
              </div>
              <div>
                <h3 className="font-serif text-gray-900">Öffnungszeiten</h3>
                <p className="text-gray-600 text-sm font-light">Mo-So: 11:00 - 22:00 Uhr</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-rose-50 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-rose-800" />
              </div>
              <div>
                <h3 className="font-serif text-gray-900">Standort</h3>
                <p className="text-gray-600 text-sm font-light">123 Pasta Straße, Foodville</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-rose-50 p-3 rounded-full">
                <Phone className="h-6 w-6 text-rose-800" />
              </div>
              <div>
                <h3 className="font-serif text-gray-900">Reservierungen</h3>
                <p className="text-gray-600 text-sm font-light">+1 (555) 123-4567</p>
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
            <h2 className="text-3xl font-serif mb-4 text-gray-900">Unsere Speisekarte</h2>
            <div className="w-20 h-0.5 bg-rose-700 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              Entdecken Sie unsere sorgfältig zusammengestellte Speisekarte mit authentischen italienischen Gerichten aus frischesten Zutaten
            </p>
          </motion.div>

          <Tabs defaultValue="Vorspeisen" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-12 bg-white p-1 border-b border-gray-200">
              {menuItems.map((category) => (
                <TabsTrigger
                  key={category.category}
                  value={category.category}
                  className="data-[state=active]:text-rose-700 data-[state=active]:border-b-2 data-[state=active]:border-rose-700 data-[state=active]:bg-transparent rounded-none px-6"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuItems.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <FoodItem key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-16">
            <Button
              onClick={() => setOrderOpen(true)}
              className="bg-gray-300 hover:bg-gray-500 rounded-none px-8"
              size="lg"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Jetzt bestellen
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif mb-6 text-gray-900">Unsere Geschichte</h2>
              <div className="w-20 h-0.5 bg-rose-700 mb-8"></div>
              <p className="mb-6 font-light text-gray-700 leading-relaxed">
                Gegründet im Jahr 1985 von der Familie Rossi, bringt Trattoria Milano die authentischen Aromen Italiens auf Ihren Tisch. Unsere Rezepte wurden über Generationen weitergegeben und bewahren die traditionellen Kochmethoden und Aromen Norditaliens.
              </p>
              <p className="mb-8 font-light text-gray-700 leading-relaxed">
                Wir beziehen die feinsten Zutaten, darunter importierte italienische Produkte und lokal angebaute Bio-Produkte, um Gerichte zu kreieren, die das Wesen der italienischen Küche einfangen. Jede Mahlzeit wird mit Leidenschaft und Liebe zum Detail zubereitet.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="text-center border-r border-gray-200">
                  <div className="text-4xl font-serif text-rose-800 mb-2">
                    <AnimatedCounter value={35} />+
                  </div>
                  <p className="text-gray-600 font-light">Jahre Erfahrung</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-serif text-rose-800 mb-2">
                    <AnimatedCounter value={15000} />+
                  </div>
                  <p className="text-gray-600 font-light">Zufriedene Kunden</p>
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
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop"
                alt="Koch bei der Zubereitung"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-serif mb-2 text-white">Chef Antonio Rossi</h3>
                <p className="text-gray-200 font-light">Chefkoch &amp; Gründer</p>
              </div>
            </motion.div>
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
            <h2 className="text-3xl font-serif mb-4 text-gray-900">Was unsere Kunden sagen</h2>
            <div className="w-20 h-0.5 bg-rose-700 mx-auto mb-6"></div>
            <p className="text-gray-600 font-light">Hören Sie von unseren zufriedenen Gästen</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-50 p-8 border border-gray-100"
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
                      <h4 className="font-serif">{testimonial.name}</h4>
                      <RatingStars rating={testimonial.rating} />
                    </div>
                  </div>
                  <p className="text-gray-700 italic font-light">
                    &quot;{testimonial.text}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif mb-4 text-gray-900">Galerie</h2>
            <div className="w-20 h-0.5 bg-rose-700 mx-auto mb-6"></div>
            <p className="text-gray-600 font-light">Werfen Sie einen Blick auf unser Restaurant und unsere Gerichte</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden group"
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
            <h2 className="text-3xl font-serif mb-4 text-gray-900">Kontaktieren Sie uns</h2>
            <div className="w-20 h-0.5 bg-rose-700 mx-auto mb-6"></div>
            <p className="text-gray-600 font-light">Wir freuen uns, von Ihnen zu hören</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-serif mb-8 text-gray-900">Kontaktdaten</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-rose-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-gray-900">Adresse</h4>
                    <p className="text-gray-600 font-light">123 Pasta Straße, Foodville, FC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-rose-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-gray-900">Telefon</h4>
                    <p className="text-gray-600 font-light">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-rose-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-gray-900">E-Mail</h4>
                    <p className="text-gray-600 font-light">info@trattoriamilano.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-rose-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-gray-900">Öffnungszeiten</h4>
                    <p className="text-gray-600 font-light">Montag - Sonntag: 11:00 - 22:00 Uhr</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-serif mb-4 text-gray-900">Folgen Sie uns</h4>
                <div className="flex gap-4">
                  {[
                    <Facebook key="fb" size={20} />,
                    <Instagram key="ig" size={20} />,
                    <Twitter key="tw" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-rose-700 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-rose-800 transition-colors"
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
              className="bg-gray-50 p-8 border border-gray-100"
            >
              <h3 className="text-xl font-serif mb-6 text-gray-900">Senden Sie uns eine Nachricht</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="font-light">
                      Name
                    </Label>
                    <Input id="name" placeholder="Ihr Name" className="rounded-none mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-light">
                      E-Mail
                    </Label>
                    <Input id="email" type="email" placeholder="Ihre E-Mail" className="rounded-none mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="font-light">
                    Betreff
                  </Label>
                  <Input id="subject" placeholder="Betreff" className="rounded-none mt-2" />
                </div>

                <div>
                  <Label htmlFor="message" className="font-light">
                    Nachricht
                  </Label>
                  <Textarea id="message" placeholder="Ihre Nachricht" rows={4} className="rounded-none mt-2" />
                </div>

                <Button className="w-full bg-gray-300 hover:bg-gray500 rounded-none">Nachricht senden</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reservation Dialog */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-none bg-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Tisch reservieren</DialogTitle>
            <DialogDescription className="font-light">
              Füllen Sie das Formular aus, um einen Tisch bei Trattoria Milano zu reservieren.
            </DialogDescription>
          </DialogHeader>

          {reservationSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-serif mb-2">Reservierung bestätigt!</h3>
              <p className="text-gray-600 font-light">
                Wir haben eine Bestätigung an Ihre E-Mail gesendet. Wir freuen uns auf Ihren Besuch!
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="font-light">
                    Datum
                  </Label>
                  <Input id="date" type="date" required className="rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="font-light">
                    Zeit
                  </Label>
                  <Select required>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Zeit auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {["11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time} Uhr
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="font-light">
                  Anzahl der Gäste
                </Label>
                <Select required>
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Anzahl auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Person" : "Personen"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="font-light">
                  Name
                </Label>
                <Input id="name" placeholder="Ihr vollständiger Name" required className="rounded-none" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-light">
                  E-Mail
                </Label>
                <Input id="email" type="email" placeholder="Ihre E-Mail" required className="rounded-none" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-light">
                  Telefon
                </Label>
                <Input id="phone" placeholder="Ihre Telefonnummer" required className="rounded-none" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-requests" className="font-light">
                  Besondere Wünsche (Optional)
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Besondere Wünsche oder Ernährungsbedürfnisse"
                  className="rounded-none"
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gray-300 hover:bg-gray-500 rounded-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verarbeitung...
                    </>
                  ) : (
                    "Reservierung bestätigen"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none bg-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Ihre Bestellung</DialogTitle>
            <DialogDescription className="font-light">
              Überprüfen Sie Ihre Artikel und schließen Sie Ihre Bestellung ab.
            </DialogDescription>
          </DialogHeader>

          {orderSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-serif mb-2">Bestellung bestätigt!</h3>
              <p className="text-gray-600 font-light">
                Wir haben eine Bestätigung an Ihre E-Mail gesendet. Ihr Essen wird in etwa 30 Minuten zur Abholung bereit sein.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-serif mb-2">Ihr Warenkorb ist leer</h3>
                  <p className="text-gray-500 mb-4 font-light">
                    Fügen Sie einige köstliche Gerichte aus unserem Menü hinzu!
                  </p>
                  <Button onClick={() => setOrderOpen(false)} className="bg-gray-300 hover:bg-gray-500 rounded-none">
                    Speisekarte durchsuchen
                  </Button>
                </div>
              ) : (
                <>
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b">
                        <div className="h-16 w-16 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif">{item.name}</h4>
                          <p className="text-sm text-gray-500 font-light">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-right w-20">
                          <div className="font-serif">${(item.price * item.quantity).toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-rose-700 hover:text-rose-800 hover:bg-rose-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Entfernen
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-light">Zwischensumme</span>
                      <span className="font-serif">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-light">Steuer</span>
                      <span className="font-serif">${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="font-serif">Gesamtsumme</span>
                      <span className="font-serif">${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-serif">Abholung oder Lieferung</Label>
                      <RadioGroup defaultValue="pickup" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="font-light">
                            Abholung (Fertig in 30 Min.)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="font-light">
                            Lieferung (45-60 Min.)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-light">
                          Name
                        </Label>
                        <Input id="name" placeholder="Ihr Name" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-light">
                          Telefon
                        </Label>
                        <Input id="phone" placeholder="Ihre Telefonnummer" required className="rounded-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-light">
                        E-Mail
                      </Label>
                      <Input id="email" type="email" placeholder="Ihre E-Mail" required className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-light">
                        Adresse (für Lieferung)
                      </Label>
                      <Input id="address" placeholder="Lieferadresse" className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="font-light">
                        Besondere Anweisungen (Optional)
                      </Label>
                      <Textarea id="notes" placeholder="Besondere Wünsche oder Hinweise" className="rounded-none" />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-gray-700 hover:bg-gray-800 rounded-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verarbeitung...
                        </>
                      ) : (
                        "Bestellung aufgeben"
                      )}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

