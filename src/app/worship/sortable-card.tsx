import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export default function SortableCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardHeader>
        <div className="relative h-48 w-full">
          <Image
            src={`https://img.youtube.com/vi/${props.song.id}/maxresdefault.jpg`}
            alt={props.song.title}
            fill
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium leading-snug">{props.song.title}</p>
        <p className="text-sm text-muted-foreground">{props.song.artist}</p>
        <p className="text-sm text-muted-foreground">{props.song.length}</p>
      </CardContent>
    </Card>
  );
}
