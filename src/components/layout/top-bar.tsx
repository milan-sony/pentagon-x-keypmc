import { Clock, MapPin } from "lucide-react";
import { home } from "@/content/home";

export function TopBar() {
  const { contactDetails } = home;
  return (
    <div className="hidden bg-brown-950 text-[0.8rem] text-cream/80 lg:block">
      <div className="container-site flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-gold-400" aria-hidden="true" />
            {contactDetails.office[0]}, Abu Dhabi
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5 text-gold-400" aria-hidden="true" />
            {contactDetails.hoursShort}
          </span>
        </div>
        <span>A member of United National Holding</span>
      </div>
    </div>
  );
}
