import { createFileRoute } from "@tanstack/react-router";
import RythmoShowApp from "@/components/RythmoShowApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rythmoShow — Live Percussion & Greek Party Experience" },
      { name: "description", content: "Live percussion duo for weddings, private parties, corporate events and unforgettable Greek celebrations." },
      { property: "og:title", content: "rythmoShow — Live Percussion Experience" },
      { property: "og:description", content: "Explosive live percussion and Greek party energy for unforgettable events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <RythmoShowApp />;
}
