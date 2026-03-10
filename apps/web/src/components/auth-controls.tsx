"use client";

import { signIn, signOut } from "next-auth/react";

interface AuthControlProps {
  className: string;
  callbackUrl?: string;
  label: string;
}

export function SignInButton({
  className,
  callbackUrl = "/app",
  label,
}: AuthControlProps) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => signIn("azure-ad", { callbackUrl })}
    >
      {label}
    </button>
  );
}

export function SignOutButton({
  className,
  callbackUrl = "/",
  label,
}: AuthControlProps) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => signOut({ callbackUrl })}
    >
      {label}
    </button>
  );
}
