import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";

interface Props {
  conversationId: string;
}

export const ActiveState = ({
  conversationId,
}: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <div className="flex lg:flex-row lg:justify-center items-center gap-2">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${conversationId}`}>
            <VideoIcon />
            Join conversation
          </Link>
        </Button>
      </div>
    </div>
  );
};