export default function ChannelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex md:flex-row w-full h-full">
      {/* <LeftNavigationBar /> */}
      {children}
    </div>
  );
}
