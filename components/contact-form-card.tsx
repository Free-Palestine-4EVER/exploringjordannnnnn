"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n/language-context"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(6, "Phone number is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

interface ContactFormCardProps {
    tourTitle: string
}

export default function ContactFormCard({ tourTitle }: ContactFormCardProps) {
    const t = useTranslations()
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: `I am interested in: ${tourTitle}`,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, tourTitle }),
            })

            if (!response.ok) throw new Error("Failed to send message")

            setIsSuccess(true)
        } catch (error) {
            console.error("Error submitting form:", error)
            form.setError("root", {
                message: "Something went wrong. Please try again or contact us via WhatsApp."
            })
        }
    }

    if (isSuccess) {
        return (
            <Card className="border-none shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t.contactFormCard.messageSent}</h3>
                        <p className="text-green-100">
                            {t.contactFormCard.weWillGetBack}
                        </p>
                    </div>
                </div>
                <CardContent className="p-6 bg-white text-center">
                    <p className="text-gray-600 mb-6">
                        {t.contactFormCard.thankYouInquiry} <strong className="text-amber-700">{tourTitle}</strong>
                    </p>
                    <Button
                        variant="outline"
                        className="border-amber-600 text-amber-700 hover:bg-amber-50"
                        onClick={() => setIsSuccess(false)}
                    >
                        {t.contactFormCard.sendAnother}
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-none shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{t.contactFormCard.getInTouch}</h3>
                <p className="text-amber-100">{t.contactFormCard.subtitle}</p>
            </div>
            <CardContent className="p-6 bg-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold text-gray-900">{t.contactFormCard.fullName}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t.contactFormCard.namePlaceholder}
                                            className="h-11 bg-white border-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold text-gray-900">{t.contactFormCard.emailAddress}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={t.contactFormCard.emailPlaceholder}
                                            className="h-11 bg-white border-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold text-gray-900">{t.contactFormCard.phoneWhatsApp}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+1 (555) 000-0000"
                                            className="h-11 bg-white border-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold text-gray-900">{t.contactFormCard.messageLabel}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t.contactFormCard.messagePlaceholder}
                                            className="min-h-[120px] bg-white border-gray-300 resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.root && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-red-600">
                                    {form.formState.errors.root.message}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-12 text-base font-semibold shadow-lg"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {t.contactFormCard.sending}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-5 w-5" />
                                    {t.contactFormCard.sendInquiry}
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
