"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

interface SignOutButtonProps {
  className: string;
  label: string;
}

export function SignOutButton({ className, label }: SignOutButtonProps) {
  const router = useRouter();

  return (
    <button
      className={className}
      type="button"
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
    >
      {label}
    </button>
  );
}
