"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTranslations } from "@/lib/i18n/language-context"

export default function ReviewForm() {
  const t = useTranslations()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [ticketId, setTicketId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      // Always decline the review for now
      setDialogMessage(
        t.reviewForm.verificationMessage,
      )
      setShowDialog(true)

      // Reset form (commented out since we're showing an error)
      // setRating(0)
      // setReviewText("")
      // setName("")
      // setEmail("")
      // setTicketId("")
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-sky-700">{t.reviewForm.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <Label htmlFor="rating" className="block mb-2 font-medium text-sm md:text-base">
            {t.reviewForm.yourRating}
          </Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 md:h-8 md:w-8 ${
                    star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="review" className="block mb-2 font-medium">
            {t.reviewForm.yourReview}
          </Label>
          <Textarea
            id="review"
            placeholder={t.reviewForm.reviewPlaceholder}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <Label htmlFor="name" className="block mb-1 md:mb-2 font-medium text-sm md:text-base">
              {t.reviewForm.yourName}
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-10 md:h-auto"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-1 md:mb-2 font-medium text-sm md:text-base">
              {t.reviewForm.yourEmail}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 md:h-auto"
            />
          </div>
        </div>

        <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
          <Label htmlFor="ticketId" className="block mb-2 font-medium text-sky-700">
            {t.reviewForm.ticketId}
          </Label>
          <Input
            id="ticketId"
            placeholder={t.reviewForm.ticketIdPlaceholder}
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="mb-2"
            required
          />
          <p className="text-sm text-muted-foreground">
            {t.reviewForm.ticketIdHelp}
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t.reviewForm.submitting : t.reviewForm.submitReview}
        </Button>
      </form>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.reviewForm.verificationFailed}</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
