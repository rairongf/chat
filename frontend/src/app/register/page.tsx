"use client";

import { RegisterPageContent, RegisterProvider } from "@/modules/register";

export default function RegisterPage() {
  return (
    <>
      <RegisterProvider>
        <RegisterPageContent />
      </RegisterProvider>
    </>
  );
}
