import { type FormEvent, useState, useRef } from "react";
import { useStore } from "./useStore";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const App = () => {
  const { getState, updateState } = useStore<FormState>(initialState);
  const { email, password, confirmPassword } = getState();

  const [errors, setErrors] = useState<{ [key in keyof FormState]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const validateFields = () => {
    const newErrors: { [key in keyof FormState]: string } = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!email) {
      newErrors.email = "Пожалуйста, введите email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Неверный формат email";
      }
    }

    if (!password) {
      newErrors.password = "Пожалуйста, введите пароль";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Пожалуйста, подтвердите пароль";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleBlur = () => {
    if (email && password && confirmPassword) {
      const errs = validateFields();

      if (!errs.email && !errs.password && !errs.confirmPassword) {
        buttonRef.current?.focus();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateFields();

    if (errs.email || errs.password || errs.confirmPassword) {
      return;
    }
    console.log(getState());
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => updateState("email", e.target.value)}
          onBlur={handleBlur}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email}</p>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => updateState("password", e.target.value)}
          onBlur={handleBlur}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.password}</p>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="confirmPassword">Повтор пароля</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => updateState("confirmPassword", e.target.value)}
          onBlur={handleBlur}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        ref={buttonRef}
        style={{ padding: "0.75rem 1.5rem" }}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
