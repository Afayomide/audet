import Search from "@/app/components/search/search"
import { Suspense } from "react"

export default function Page () {
    return(
<Suspense fallback={<div>Loading search results...</div>}>

<Search/>
</Suspense>
    )
}