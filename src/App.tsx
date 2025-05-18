import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Пожалуйста, введите email")
    .email("Неверный формат email"),
  password: Yup.string()
    .required("Пожалуйста, введите пароль")
    .min(6, "Пароль должен содержать не менее 6 символов"),
  confirmPassword: Yup.string()
    .required("Пожалуйста, подтвердите пароль")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormState>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      isValid
    ) {
      buttonRef.current?.focus();
    }
  }, [email, password, confirmPassword, isValid]);

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Введите email"
          {...register("email")}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.email && touchedFields.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          placeholder="Введите пароль"
          {...register("password")}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.password && touchedFields.password && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="confirmPassword">Повтор пароля</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          {...register("confirmPassword")}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.confirmPassword && touchedFields.confirmPassword && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        ref={buttonRef}
        disabled={!isValid}
        style={{ padding: "0.75rem 1.5rem" }}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
