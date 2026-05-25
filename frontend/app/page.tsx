import LoginForm from "@/components/Auth/LoginForm";
import Header from "@/components/Header/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
}
