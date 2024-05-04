const TailwindIndicator = () => {
  return (
    <div className="flex items-center justify-center rounded-sm bg-primary px-2 py-1 text-xs text-primary-foreground">
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">2XL</div>
    </div>
  );
};

export default TailwindIndicator;
