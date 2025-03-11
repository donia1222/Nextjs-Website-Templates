"use client"

import { useState } from "react"
import { Store, UtensilsCrossed, Dumbbell, Building2, HardHat } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

import { WebsitePreview } from "@/components/website-preview"
import { RestaurantWebsite } from "@/components/restaurant-website"
import { GymWebsite } from "@/components/gym-website"
import { RealEstateWebsite } from "@/components/real-estate-website"
import { ConstructionWebsite } from "@/components/construction-website"
import DarkRestaurantchina from "@/components/dark-restaurantchina"
import DarkRestaurant from "@/components/dark-restaurant"

export function CustomTabs() {
  const [activeTab, setActiveTab] = useState("restaurant")
  const [activeRestaurantTemplate, setActiveRestaurantTemplate] = useState("template1")
  const [isLoading, setIsLoading] = useState(false)

  // Handle tab change and trigger loading state
  const handleTabChange = (value: string) => {
    setIsLoading(true)
    setActiveTab(value)

    // Reset loading state after 500ms
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleRestaurantTemplateChange = (template: string) => {
    setActiveRestaurantTemplate(template)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="container mx-auto py-8">
        <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 p-1 rounded-xl mb-10">
          <TabsTrigger
            value="restaurant"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span className="hidden sm:inline">Restaurant</span>
            <span className="text-xs sm:hidden"></span>
          </TabsTrigger>
          <TabsTrigger
            value="gym"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Fitness</span>
            <span className="text-xs sm:hidden"></span>
          </TabsTrigger>
          <TabsTrigger
            value="realestate"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-sky-300 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Immobilien</span>
            <span className="text-xs sm:hidden"></span>
          </TabsTrigger>
          <TabsTrigger
            value="construction"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <HardHat className="h-4 w-4" />
            <span className="hidden sm:inline">Bau</span>
            <span className="text-xs sm:hidden"></span>
          </TabsTrigger>
          <TabsTrigger
            value="ecommerce"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
          >
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">E-Commerce</span>
            <span className="text-xs sm:hidden"></span>
          </TabsTrigger>
        </TabsList>
      </div>
      

      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-l-transparent border-r-transparent animate-spin"
                style={{
                  borderTopColor:
                    activeTab === "ecommerce"
                      ? "#a855f7"
                      : activeTab === "restaurant"
                        ? "#991b1b"
                        : activeTab === "gym"
                          ? "#f97316"
                          : activeTab === "realestate"
                            ? "#7dd3fc"
                            : "#d97706",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="ecommerce" className="m-0 transition-all duration-500 animate-in fade-in">
              <WebsitePreview />
            </TabsContent>

            <TabsContent value="restaurant" className="m-0 transition-all duration-500 animate-in fade-in">
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  onClick={() => handleRestaurantTemplateChange("template1")}
                  variant="outline"
                  className={
                    activeRestaurantTemplate === "template1"
                      ? "bg-[#991b1b] text-white hover:bg-[#7f1d1d] hover:text-white"
                      : ""
                  }
                >
                  Template 1
                </Button>
                <Button
                  onClick={() => handleRestaurantTemplateChange("template2")}
                  variant="outline"
                  className={
                    activeRestaurantTemplate === "template2"
                      ? "bg-[#991b1b] text-white hover:bg-[#7f1d1d] hover:text-white"
                      : ""
                  }
                >
                  Template 2
                </Button>
                <Button
                  onClick={() => handleRestaurantTemplateChange("template3")}
                  variant="outline"
                  className={
                    activeRestaurantTemplate === "template3"
                      ? "bg-[#991b1b] text-white hover:bg-[#7f1d1d] hover:text-white"
                      : ""
                  }
                >
                  Template 3
                </Button>
              </div>
              {activeRestaurantTemplate === "template1" && <DarkRestaurant />}
              {activeRestaurantTemplate === "template2" && <DarkRestaurantchina />}
              {activeRestaurantTemplate === "template3" && <RestaurantWebsite />}
            </TabsContent>

            <TabsContent value="gym" className="m-0 transition-all duration-500 animate-in fade-in">
              <GymWebsite />
            </TabsContent>

            <TabsContent value="realestate" className="m-0 transition-all duration-500 animate-in fade-in">
              <RealEstateWebsite />
            </TabsContent>

            <TabsContent value="construction" className="m-0 transition-all duration-500 animate-in fade-in">
              <ConstructionWebsite />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}

