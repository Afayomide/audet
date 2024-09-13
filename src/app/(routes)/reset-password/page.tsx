'use client'
import ResetPassword from "@/app/components/auth/resetPassword"
import { Suspense } from "react"

export default function Page() {
return (
    <Suspense fallback={<div>Loading search results</div>}>
        <ResetPassword/>
    </Suspense>
)
}