"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import {
  fields,
  lisansDepartments,
  onLisansDepartments,
  universities,
} from "@/src/features/profile/data";
import { profileText } from "@/src/features/profile/profile.text";
import { User } from "@supabase/supabase-js";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface GoalInfoProps {
  user: User | null;
  valueUni: string;
  setValueUni: (value: string) => void;
  valueDepartment: string;
  setValueDepartment: (value: string) => void;
  selectedField: string;
  setSelectedField: (value: string) => void;
}

export default function GoalInfo({
  valueUni,
  setValueUni,
  valueDepartment,
  setValueDepartment,
  selectedField,
  setSelectedField,
}: GoalInfoProps) {
  const [openUni, setOpenUni] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">{profileText.goals.title}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Popover open={openUni} onOpenChange={setOpenUni}>
          <div className="space-y-2">
            <Label>{profileText.goals.university}</Label>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openUni}
                className="w-full justify-between text-xs"
              >
                {valueUni || profileText.goals.universityPlaceholder}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
          </div>

          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder={profileText.goals.searchPlaceholder}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>
                  {profileText.goals.universityNotFound}
                </CommandEmpty>
                {Object.entries(universities).map(([key, values]) => (
                  <CommandGroup
                    heading={
                      profileText.universityGroups[
                        key as keyof typeof profileText.universityGroups
                      ]
                    }
                    key={key}
                  >
                    {values.map((uni) => (
                      <CommandItem
                        key={uni}
                        value={uni}
                        onSelect={(currentValue) => {
                          setValueUni(
                            currentValue === valueUni ? "" : currentValue
                          );
                          setOpenUni(false);
                        }}
                      >
                        {uni}
                        <Check
                          className={cn(
                            "ml-auto",
                            valueUni === uni ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
          <div className="space-y-2">
            <Label>{profileText.goals.department}</Label>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDepartment}
                className="w-full justify-between text-xs"
              >
                {valueDepartment || profileText.goals.departmentPlaceholder}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
          </div>

          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder={profileText.goals.searchPlaceholder}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>
                  {profileText.goals.departmentNotFound}
                </CommandEmpty>

                <CommandGroup
                  heading={profileText.departmentGroups.undergraduate}
                >
                  {lisansDepartments.map((department) => (
                    <CommandItem
                      key={department}
                      value={department}
                      onSelect={(currentValue) => {
                        setValueDepartment(
                          currentValue === valueDepartment ? "" : currentValue
                        );
                        setOpenDepartment(false);
                      }}
                    >
                      {department}
                      <Check
                        className={cn(
                          "ml-auto",
                          valueDepartment === department
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandGroup heading={profileText.departmentGroups.associate}>
                  {onLisansDepartments.map((department) => (
                    <CommandItem
                      key={department}
                      value={department}
                      onSelect={(currentValue) => {
                        setValueDepartment(
                          currentValue === valueDepartment ? "" : currentValue
                        );
                        setOpenDepartment(false);
                      }}
                    >
                      {department}
                      <Check
                        className={cn(
                          "ml-auto",
                          valueDepartment === department
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="space-y-2">
          <Label>{profileText.goals.field}</Label>
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <Badge
                key={field}
                variant={selectedField === field ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer transition-colors text-sm",
                  selectedField === field ? "" : "hover:bg-secondary/80"
                )}
                onClick={() => setSelectedField(field)}
              >
                {field}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
