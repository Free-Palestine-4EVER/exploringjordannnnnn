"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import BubbleButton from "@/components/bubble-button"

export default function BookingForm() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Departure Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
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
        <label className="text-sm font-medium">Travelers</label>
        <Select defaultValue="2">
          <SelectTrigger>
            <SelectValue placeholder="Number of travelers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Adult</SelectItem>
            <SelectItem value="2">2 Adults</SelectItem>
            <SelectItem value="3">3 Adults</SelectItem>
            <SelectItem value="4">4 Adults</SelectItem>
            <SelectItem value="5">5 Adults</SelectItem>
            <SelectItem value="6">6+ Adults</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tour Option</label>
        <Select defaultValue="standard">
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard (3-star hotels)</SelectItem>
            <SelectItem value="comfort">Comfort (4-star hotels)</SelectItem>
            <SelectItem value="luxury">Luxury (5-star hotels)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BubbleButton className="w-full" size="lg">
        Book Now
      </BubbleButton>
    </div>
  )
}
