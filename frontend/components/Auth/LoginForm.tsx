"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "../../utils/shemas";
import { authService } from "../../services/authService/auth.service";
import { useAuthStore } from "@/store/auth/auth.store";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { setAccessToken } = useAuthStore();
  const onSubmit = async (userLoginData: LoginFormData) => {
    try {
      const response = await authService.login(userLoginData);
      setAccessToken(response.data.accessToken);
      console.log(response.data.accessToken);
      toast.success("Ласкаво просимо!");
    } catch (error) {
      toast.error("Невірний email або пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          {...register("passwordHash")}
          type="password"
          placeholder="Пароль"
        />
        {errors.passwordHash && <span>{errors.passwordHash.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Увійти"}
      </button>
    </form>
  );
}
