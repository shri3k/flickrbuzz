import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import type { Maybe, Mode } from "@/types.ts";
import { APIError } from "@/libs/errors.ts";

import { Toaster } from "@/components/ui/sonner";

import api from "@/libs/api.ts";
import { Preview } from "@/components/Preview";
import { SearchBar } from "@/components/SearchBar";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: (search) => searchSchema.parse(search),
  loader: async ({ location }) => {
    const search = new URLSearchParams(location.search);
    const query = search.get("q") || "";
    const mode = search.get("mode") as Mode;
    return getFeed(query, mode);
  },
  shouldReload: false,
});

function App() {
  const { data, error } = Route.useLoaderData();
  const [feed, setFeed] = useState(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const handleOnSearchSubmit = async (query: string, mode: Maybe<Mode>) => {
    setIsLoading(true);
    const { data: _data, error: _error } = await getFeed(query, mode);

    setFeed(_data);
    setCurrentQuery(query);
    setIsLoading(false);
    if (_error) {
      toast.error(_error, { position: "top-center" });
    }
  };

  useEffect(() => {
    let toasty = undefined;
    if (error) {
      toasty = toast.error(error, { position: "top-center" });
    }
    return () => {
      toast.dismiss(toasty);
    };
  }, [error]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full lg:w-xl m-auto">
          <SearchBar
            onSearchSubmit={handleOnSearchSubmit}
            isLoading={isLoading}
          />
        </div>
        <div>
          <Preview feed={feed} query={currentQuery} />
        </div>
      </div>
      <Toaster />
    </>
  );
}

const searchSchema = z.object({
  q: z.string().optional(),
  mode: z.enum(["all", "any"]).optional(),
});

async function getFeed(query: string, mode: Maybe<Mode>) {
  let items = null;
  try {
    if (query) {
      items = await api.search(query, mode);
    } else {
      items = await api.feed();
    }
    return { data: items, error: null };
  } catch (e) {
    let error = "Something went wrong";
    console.log(e);
    if (e instanceof APIError) {
      error = e.message;
    }
    return { data: null, error };
  }
}
