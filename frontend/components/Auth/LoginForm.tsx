"use client";
import api from "../../services/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "../../utils/shemas";
import { authService } from "../../services/authService/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth/auth.store";
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const onSubmit = async (userLoginData: LoginFormData) => {
    try {
      const response = await authService.login(userLoginData);
      const userResponse = await api.get("/user");
      console.log(userResponse.data);
      toast.success("Ласкаво просимо!");
      setIsAuthenticated(true);
      router.push("/quests");
    } catch (error) {
      toast.error("Невірний email або пароль");
    }
  };

  return (
    <div
      className="
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-72 flex flex-col gap-6
    bg-[var(--color-surface)] rounded-2xl
    border border-[var(--color-border)]
    shadow-xl shadow-black/10
    p-8
  "
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)] flex items-center justify-center mb-1">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <h1 className="text-base font-semibold text-[var(--color-text-primary)]">
          Вхід в акаунт
        </h1>
        <p className="text-xs text-[var(--color-text-muted)]">
          Раді бачити вас знову
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-text-body)] pl-0.5">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="
          w-full px-3 py-2.5 rounded-lg text-sm
          bg-[var(--color-surface-raised)] text-[var(--color-text-primary)]
          border border-[var(--color-border)]
          placeholder:text-[var(--color-text-disabled)]
          outline-none transition-colors duration-200
          hover:border-[var(--color-border-hover)]
          focus:border-[var(--color-border-focus)]
          focus:ring-2 focus:ring-[var(--color-brand)]/20
        "
          />
          {errors.email && (
            <span className="text-[11px] text-[var(--color-danger)] pl-0.5 flex items-center gap-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between pl-0.5">
            <label className="text-xs font-medium text-[var(--color-text-body)]">
              Пароль
            </label>
            {/* пізніше додам відновлення <a
              href="#"
              className="text-[11px] text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] transition-colors"
            >
              Забули пароль?
            </a> */}
          </div>
          <input
            {...register("passwordHash")}
            type="password"
            placeholder="••••••••"
            className="
          w-full px-3 py-2.5 rounded-lg text-sm
          bg-[var(--color-surface-raised)] text-[var(--color-text-primary)]
          border border-[var(--color-border)]
          placeholder:text-[var(--color-text-disabled)]
          outline-none transition-colors duration-200
          hover:border-[var(--color-border-hover)]
          focus:border-[var(--color-border-focus)]
          focus:ring-2 focus:ring-[var(--color-brand)]/20
        "
          />
          {errors.passwordHash && (
            <span className="text-[11px] text-[var(--color-danger)] pl-0.5 flex items-center gap-1">
              {errors.passwordHash.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
        mt-1 w-full py-2.5 rounded-lg text-sm font-medium text-white
        bg-[var(--color-brand)]
        transition-all duration-200 cursor-pointer
        hover:bg-[var(--color-brand-dark)]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        shadow-sm shadow-[var(--color-brand)]/30
      "
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Завантаження...
            </span>
          ) : (
            "Увійти"
          )}
        </button>
      </form>

      <p className="text-center text-[11px] text-[var(--color-text-muted)]">
        Немає акаунту?{" "}
        <Link
          href="/register"
          className="text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] font-medium transition-colors"
        >
          Зареєструватись
        </Link>
      </p>
    </div>
  );
}
