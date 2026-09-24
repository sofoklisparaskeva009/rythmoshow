import { createFileRoute } from "@tanstack/react-router";
import RythmoShowApp from "@/components/RythmoShowApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rythmoShow — Live Percussion Duo Cyprus | Party Experience" },
      { name: "description", content: "Live percussion duo available exclusively in Cyprus for weddings, private parties, corporate events and unforgettable celebrations." },
      { property: "og:title", content: "rythmoShow — Live Percussion Duo Cyprus" },
      { property: "og:description", content: "Explosive live percussion and party energy for events exclusively across Cyprus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <RythmoShowApp />;
}
