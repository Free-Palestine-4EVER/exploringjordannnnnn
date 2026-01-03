"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookingSearch() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="shadow-lg border-none overflow-hidden">
      <Tabs defaultValue="tours" className="w-full">
        <TabsList className="w-full rounded-none h-12 md:h-14 bg-muted/50 overflow-x-auto flex-nowrap">
          <TabsTrigger
            value="tours"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            Tour Packages
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            Custom Tours
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tours" className="m-0">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jordan</SelectItem>
                    <SelectItem value="petra">Petra</SelectItem>
                    <SelectItem value="wadi-rum">Wadi Rum</SelectItem>
                    <SelectItem value="dead-sea">Dead Sea</SelectItem>
                    <SelectItem value="amman">Amman</SelectItem>
                    <SelectItem value="aqaba">Aqaba</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Duration</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="9">9 Days</SelectItem>
                    <SelectItem value="11">11 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Travelers</label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Traveler</SelectItem>
                    <SelectItem value="2">2 Travelers</SelectItem>
                    <SelectItem value="3">3 Travelers</SelectItem>
                    <SelectItem value="4">4 Travelers</SelectItem>
                    <SelectItem value="5+">5+ Travelers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-4 md:mt-6" size="lg">
              <Search className="mr-2 h-4 w-4" />
              <span className="text-sm md:text-base">Search Tours</span>
            </Button>
          </CardContent>
        </TabsContent>

        <TabsContent value="custom" className="m-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Interests</label>
                <Select defaultValue="cultural">
                  <SelectTrigger>
                    <SelectValue placeholder="Select interests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="historical">Historical</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="9">9 Days</SelectItem>
                    <SelectItem value="11">11 Days</SelectItem>
                    <SelectItem value="custom">Custom Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Budget</label>
                <Select defaultValue="mid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="mid">Mid-range</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Travelers</label>
                <div className="flex items-center h-10 w-full rounded-md border border-input bg-background px-3">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="w-full h-full focus:outline-none"
                    placeholder="Number of travelers"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              Request Custom Tour
            </Button>
          </CardContent>
        </TabsContent>

        <TabsContent value="activities" className="m-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Type</label>
                <Select defaultValue="hiking">
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiking">Hiking</SelectItem>
                    <SelectItem value="desert-safari">Desert Safari</SelectItem>
                    <SelectItem value="cultural-tour">Cultural Tour</SelectItem>
                    <SelectItem value="cooking-class">Cooking Class</SelectItem>
                    <SelectItem value="diving">Diving</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="petra">Petra</SelectItem>
                    <SelectItem value="wadi-rum">Wadi Rum</SelectItem>
                    <SelectItem value="dead-sea">Dead Sea</SelectItem>
                    <SelectItem value="amman">Amman</SelectItem>
                    <SelectItem value="aqaba">Aqaba</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select defaultValue="half-day">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-day">Half Day</SelectItem>
                    <SelectItem value="full-day">Full Day</SelectItem>
                    <SelectItem value="multi-day">Multi-Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              Find Activities
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
