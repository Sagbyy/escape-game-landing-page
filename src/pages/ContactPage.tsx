import ContactForm from "@/components/contact/contactForm";

export default function ContactPage(){
    
    return(
        <div className="p-6">
            <h1 className="text-2xl text-red-500 mb-4"> Contactez-nous</h1>
            <ContactForm />
        </div>
    )
}