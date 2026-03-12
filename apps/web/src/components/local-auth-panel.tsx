"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import styles from "./local-auth-panel.module.css";

export function LocalAuthPanel() {
  const router = useRouter();
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signInPending, setSignInPending] = useState(false);
  const [signUpPending, setSignUpPending] = useState(false);

  async function handleSignIn(formData: FormData) {
    setSignInPending(true);
    setSignInError(null);

    const result = await authClient.signIn.email({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      rememberMe: true,
    });

    setSignInPending(false);

    if (result.error) {
      setSignInError(result.error.message ?? "Unable to sign in.");
      return;
    }

    router.push("/app");
    router.refresh();
  }

  async function handleSignUp(formData: FormData) {
    setSignUpPending(true);
    setSignUpError(null);

    const result = await authClient.signUp.email({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    setSignUpPending(false);

    if (result.error) {
      setSignUpError(result.error.message ?? "Unable to create account.");
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <div className={styles.grid}>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.label}>Sign in</p>
          <h2>Use an existing local account.</h2>
        </div>
        <form
          className={styles.form}
          action={async (formData) => {
            await handleSignIn(formData);
          }}
        >
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
            />
          </label>
          {signInError ? <p className={styles.error}>{signInError}</p> : null}
          <button className={styles.primary} type="submit" disabled={signInPending}>
            {signInPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.label}>Create account</p>
          <h2>Keep auth lightweight and app-owned.</h2>
        </div>
        <form
          className={styles.form}
          action={async (formData) => {
            await handleSignUp(formData);
          }}
        >
          <label className={styles.field}>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          {signUpError ? <p className={styles.error}>{signUpError}</p> : null}
          <button className={styles.primary} type="submit" disabled={signUpPending}>
            {signUpPending ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </div>
  );
}
