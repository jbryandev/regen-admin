export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="sm:hidden block">xs</div>
      <div className="sm:block md:hidden hidden">sm</div>
      <div className="md:block lg:hidden hidden">md</div>
      <div className="lg:block hidden xl:hidden">lg</div>
      <div className="2xl:hidden hidden xl:block">xl</div>
      <div className="2xl:block hidden">2xl</div>
    </div>
  );
}
