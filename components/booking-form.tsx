"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import BubbleButton from "@/components/bubble-button"
import { useTranslations } from "@/lib/i18n/language-context"

export default function BookingForm() {
  const t = useTranslations()
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.bookingSearch.date}</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : t.bookingSearch.selectDate}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
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
            <SelectItem value="1">{t.bookingSearch.adult1}</SelectItem>
            <SelectItem value="2">{t.bookingSearch.adults2}</SelectItem>
            <SelectItem value="3">{t.bookingSearch.adults3}</SelectItem>
            <SelectItem value="4">{t.bookingSearch.adults4}</SelectItem>
            <SelectItem value="5">{t.bookingSearch.adults5}</SelectItem>
            <SelectItem value="6">{t.bookingSearch.adults6plus}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.bookingSearch.tourOption}</label>
        <Select defaultValue="standard">
          <SelectTrigger>
            <SelectValue placeholder={t.bookingSearch.selectOption} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">{t.bookingSearch.standard}</SelectItem>
            <SelectItem value="comfort">{t.bookingSearch.comfort}</SelectItem>
            <SelectItem value="luxury">{t.bookingSearch.luxuryOption}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BubbleButton className="w-full" size="lg">
        {t.common.bookNow}
      </BubbleButton>
    </div>
  )
}
