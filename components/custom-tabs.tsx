"use client"

import { Store, UtensilsCrossed, Dumbbell, Building2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { WebsitePreview } from "@/components/website-preview"
import { RestaurantWebsite } from "@/components/restaurant-website"
import { GymWebsite } from "@/components/gym-website"
import { RealEstateWebsite } from "@/components/real-estate-website"

export function CustomTabs() {
  return (
    <Tabs defaultValue="ecommerce" className="w-full">
      <div className="container mx-auto py-8">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 p-1 rounded-xl mb-10 ">
          <TabsTrigger
            value="ecommerce"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">E-Commerce</span>
            <span className="text-xs sm:hidden">Shop</span>
          </TabsTrigger>
          <TabsTrigger
            value="restaurant"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span className="hidden sm:inline">Restaurant</span>
            <span className="text-xs sm:hidden">Essen</span>
          </TabsTrigger>
          <TabsTrigger
            value="gym"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Fitness</span>
            <span className="text-xs sm:hidden">Fitnessstudio</span>
          </TabsTrigger>
          <TabsTrigger
            value="realestate"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-sky-300 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Immobilien</span>
            <span className="text-xs sm:hidden">Immobilien</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        <TabsContent value="ecommerce" className="m-0 transition-all duration-500 animate-in fade-in">
          <WebsitePreview />
        </TabsContent>

        <TabsContent value="restaurant" className="m-0 transition-all duration-500 animate-in fade-in">
          <RestaurantWebsite />
        </TabsContent>

        <TabsContent value="gym" className="m-0 transition-all duration-500 animate-in fade-in">
          <GymWebsite />
        </TabsContent>

        <TabsContent value="realestate" className="m-0 transition-all duration-500 animate-in fade-in">
          <RealEstateWebsite />
        </TabsContent>
      </div>
    </Tabs>
  )
}

