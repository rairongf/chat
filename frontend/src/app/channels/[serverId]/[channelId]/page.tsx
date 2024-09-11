"use client";

import { usePathname } from "next/navigation";

export default function ServerChannelPage() {
  const pathname = usePathname();

  return <p>Pathname: {pathname}</p>;
}
