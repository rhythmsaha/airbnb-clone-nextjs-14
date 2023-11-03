import EmptyState from "@/components/EmptyState";
import Link from "next/link";

export default function NotFound() {
    return <EmptyState title="404 Not Found" subtitle="Could not find requested resource!" />;
}
