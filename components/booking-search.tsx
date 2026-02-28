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
import { useTranslations } from "@/lib/i18n/language-context"

export default function BookingSearch() {
  const t = useTranslations()
  const [date, setDate] = useState<Date>()

  return (
    <Card className="shadow-lg border-none overflow-hidden">
      <Tabs defaultValue="tours" className="w-full">
        <TabsList className="w-full rounded-none h-12 md:h-14 bg-muted/50 overflow-x-auto flex-nowrap">
          <TabsTrigger
            value="tours"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            {t.bookingSearch.tourPackages}
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            {t.bookingSearch.customTours}
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="flex-1 h-full data-[state=active]:bg-background rounded-none text-xs sm:text-sm md:text-base"
          >
            {t.bookingSearch.activitiesTab}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tours" className="m-0">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.destination}</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.selectDestination} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.bookingSearch.allJordan}</SelectItem>
                    <SelectItem value="petra">{t.destinations.petra.name}</SelectItem>
                    <SelectItem value="wadi-rum">{t.destinations.wadiRum.name}</SelectItem>
                    <SelectItem value="dead-sea">{t.destinations.deadSea.name}</SelectItem>
                    <SelectItem value="amman">{t.destinations.amman.name}</SelectItem>
                    <SelectItem value="aqaba">{t.destinations.aqaba.name}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.duration}</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.duration} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t.bookingSearch.anyDuration}</SelectItem>
                    <SelectItem value="5">5 {t.common.days}</SelectItem>
                    <SelectItem value="7">7 {t.common.days}</SelectItem>
                    <SelectItem value="9">9 {t.common.days}</SelectItem>
                    <SelectItem value="11">11 {t.common.days}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.date}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : t.bookingSearch.pickDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.travelers}</label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.numberOfTravelers} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t.bookingSearch.traveler1}</SelectItem>
                    <SelectItem value="2">{t.bookingSearch.travelers2}</SelectItem>
                    <SelectItem value="3">{t.bookingSearch.travelers3}</SelectItem>
                    <SelectItem value="4">{t.bookingSearch.travelers4}</SelectItem>
                    <SelectItem value="5+">{t.bookingSearch.travelers5plus}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-4 md:mt-6" size="lg">
              <Search className="mr-2 h-4 w-4" />
              <span className="text-sm md:text-base">{t.bookingSearch.searchTours}</span>
            </Button>
          </CardContent>
        </TabsContent>

        <TabsContent value="custom" className="m-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.interests}</label>
                <Select defaultValue="cultural">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.selectInterests} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">{t.bookingSearch.cultural}</SelectItem>
                    <SelectItem value="adventure">{t.bookingSearch.adventure}</SelectItem>
                    <SelectItem value="relaxation">{t.bookingSearch.relaxation}</SelectItem>
                    <SelectItem value="historical">{t.bookingSearch.historical}</SelectItem>
                    <SelectItem value="culinary">{t.bookingSearch.culinary}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.duration}</label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.duration} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 {t.common.days}</SelectItem>
                    <SelectItem value="7">7 {t.common.days}</SelectItem>
                    <SelectItem value="9">9 {t.common.days}</SelectItem>
                    <SelectItem value="11">11 {t.common.days}</SelectItem>
                    <SelectItem value="custom">{t.bookingSearch.customDuration}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.budget}</label>
                <Select defaultValue="mid">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.selectBudget} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">{t.bookingSearch.budgetOption}</SelectItem>
                    <SelectItem value="mid">{t.bookingSearch.midRange}</SelectItem>
                    <SelectItem value="luxury">{t.bookingSearch.luxury}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.travelers}</label>
                <div className="flex items-center h-10 w-full rounded-md border border-input bg-background px-3">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="w-full h-full focus:outline-none"
                    placeholder={t.bookingSearch.numberOfTravelers}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              {t.bookingSearch.requestCustomTour}
            </Button>
          </CardContent>
        </TabsContent>

        <TabsContent value="activities" className="m-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.activityType}</label>
                <Select defaultValue="hiking">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.selectActivity} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiking">{t.bookingSearch.hiking}</SelectItem>
                    <SelectItem value="desert-safari">{t.bookingSearch.desertSafari}</SelectItem>
                    <SelectItem value="cultural-tour">{t.bookingSearch.culturalTour}</SelectItem>
                    <SelectItem value="cooking-class">{t.bookingSearch.cookingClass}</SelectItem>
                    <SelectItem value="diving">{t.bookingSearch.diving}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.location}</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.selectLocation} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t.bookingSearch.anyLocation}</SelectItem>
                    <SelectItem value="petra">{t.destinations.petra.name}</SelectItem>
                    <SelectItem value="wadi-rum">{t.destinations.wadiRum.name}</SelectItem>
                    <SelectItem value="dead-sea">{t.destinations.deadSea.name}</SelectItem>
                    <SelectItem value="amman">{t.destinations.amman.name}</SelectItem>
                    <SelectItem value="aqaba">{t.destinations.aqaba.name}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.bookingSearch.activityDuration}</label>
                <Select defaultValue="half-day">
                  <SelectTrigger>
                    <SelectValue placeholder={t.bookingSearch.activityDuration} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-day">{t.bookingSearch.halfDay}</SelectItem>
                    <SelectItem value="full-day">{t.bookingSearch.fullDay}</SelectItem>
                    <SelectItem value="multi-day">{t.bookingSearch.multiDay}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              {t.bookingSearch.findActivities}
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
