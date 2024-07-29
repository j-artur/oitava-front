import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { cn } from "~/lib/utils";

type Props = {
  path: { route: string; label: string }[];
};

export default function Breadcrumbs({ path }: Props) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-1 pt-4 lg:pt-8">
      <Link href="/home" className="pb-0.5 text-xs font-bold text-white hover:text-primary-light">
        Home
      </Link>
      {path.map((segment, i) => (
        <Fragment key={i}>
          <HiOutlineChevronRight size={14} className="text-white" strokeWidth={2} />
          <Link
            href={segment.route}
            className={cn("pb-0.5 text-xs font-bold text-white hover:text-primary-light", {
              underline: i === path.length - 1,
            })}
          >
            {segment.label}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
