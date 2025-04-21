"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SimpleCommand,
  SimpleCommandEmpty,
  SimpleCommandGroup,
  SimpleCommandInput,
  SimpleCommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/lib/utils";

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    console.log("Updated selection:", newSelected);
    onChange(newSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between text-black", className)}
        >
          {selected.length > 0
            ? selected
                .map((v) => options.find((o) => o.value === v)?.label)
                .join(", ")
            : "Select days..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 text-black/50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white/50 backdrop-blur-md rounded-md shadow-lg">
        <SimpleCommand>
          <SimpleCommandInput
            placeholder="Search days..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-black placeholder:text-gray-600"
          />
          <SimpleCommandEmpty className="text-black">
            No days found.
          </SimpleCommandEmpty>
          <SimpleCommandGroup>
            {filteredOptions.map((option) => (
              <SimpleCommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
                onClick={() => handleSelect(option.value)}
                className="text-black cursor-pointer hover:bg-gray-100 flex items-center"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-black transition-opacity",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </SimpleCommandItem>
            ))}
          </SimpleCommandGroup>
        </SimpleCommand>
      </PopoverContent>
    </Popover>
  );
}