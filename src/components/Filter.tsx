// Imports
import * as React from "react";
// Types
// UI Component Primitives
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Interface
interface FilterProps {
  name: string;
  states: string[] | undefined;
  setCurrentState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Component
const Filter: React.FC<FilterProps> = ({ name, states, setCurrentState }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );
  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        {name}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[120px] justify-start"
          >
            {selectedStatus ? (
              <div className="w-full text-center">{selectedStatus}</div>
            ) : (
              <div className="w-full text-center">Set {name}</div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {states ? (
                  states.map((status) => (
                    <CommandItem
                      key={status}
                      onSelect={(status) => {
                        setSelectedStatus(status);
                        status === "all"
                          ? setCurrentState(undefined)
                          : setCurrentState(status);

                        setOpen(false);
                      }}
                    >
                      <span>{status}</span>
                    </CommandItem>
                  ))
                ) : (
                  <div>Loading</div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
