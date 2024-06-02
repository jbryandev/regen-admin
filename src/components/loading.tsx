import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-1 gap-4 p-4 md:gap-8 md:p-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
