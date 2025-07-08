import LoginForm from "@/components/login/loginForm";

export default function LoginPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl text-red-500 mb-4">Se connecter</h1>
            <LoginForm />
        </div>
    )
}