import Search from "@/app/components/search/search"
import { Suspense } from "react"
import CustomLoader from "@/app/customLoader"

export default function Page () {
    return(
<Suspense fallback={<CustomLoader/>}>

<Search/>
</Suspense>
    )
}