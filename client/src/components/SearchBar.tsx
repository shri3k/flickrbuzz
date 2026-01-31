import React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { Maybe, Mode } from "@/types.ts";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldDescription } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  onSearchSubmit: (query: string, mode?: Maybe<Mode>) => void;
  isLoading: boolean;
};

const hasMultipleQueries = (query: Maybe<string>): boolean => {
  if (!query) return false;
  const queries = query.trim().split(",");
  return queries.length > 1;
};

export function SearchBar({ onSearchSubmit, isLoading }: Props) {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    const query = formValues.get("search") as string;
    const mode = formValues.get("mode") as Maybe<Mode>;

    onSearchSubmit(query, mode);
  };

  const handleModeChange = (mode: Mode) => {
    navigate({
      search: {
        ...search,
        mode,
      },
      replace: true,
    });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;
    let newSearch = {};
    if (!query && "q" in search) {
      newSearch = { ...search };
      if ("q" in newSearch) {
        delete newSearch.q;
      }
    } else {
      newSearch = {
        ...search,
        q: query,
      };
    }
    navigate({
      search: newSearch,
      replace: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field className="w-auto">
        <InputGroup>
          <InputGroupInput
            name="search"
            placeholder="Search..."
            defaultValue={search.q}
            onChange={handleQueryChange}
          />
          <InputGroupAddon>
            <Button type="submit" size="icon" variant="ghost">
              {isLoading ? <Spinner className="size-3" /> : <Search />}
            </Button>
          </InputGroupAddon>
          {hasMultipleQueries(search.q) && (
            <RadioGroup defaultValue="any" onValueChange={handleModeChange}>
              <div className="flex items-center gap-2 mr-3">
                <RadioGroupItem
                  id="match-all"
                  value="all"
                  defaultChecked={search.mode === "all" || !search.mode}
                />
                <Label htmlFor="match-all">all</Label>
                <RadioGroupItem
                  id="match-one"
                  value="any"
                  defaultChecked={search.mode === "any"}
                />
                <Label htmlFor="match-one">any</Label>
              </div>
            </RadioGroup>
          )}
        </InputGroup>

        <FieldDescription className="text-center">
          Search tags separated by spaces
        </FieldDescription>
      </Field>
    </form>
  );
}
