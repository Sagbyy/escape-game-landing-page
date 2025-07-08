import About from "@/components/about/about";
import Introduction from "@/components/introduction";
import SessionsPreview from "@/components/sessions-preview";

export default function MainContent() {
    return (
        <>
            <Introduction />
            <About />
            <SessionsPreview />
        </>
    )
}