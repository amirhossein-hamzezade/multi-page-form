import * as Popover from "@radix-ui/react-popover";
import { Dispatch, SetStateAction, useState } from "react";

import { format } from "date-fns";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { CalendarDays } from "lucide-react";
import Input from "./Input";
import { LocalStorageFormData } from "../types";

interface DatePickerProps {
  data: LocalStorageFormData;
  setData: Dispatch<SetStateAction<LocalStorageFormData>>;
  errorMessage?: string;
}

export default function DatePicker({
  data,
  setData,
  errorMessage,
}: DatePickerProps) {
  const [selected, setSelected] = useState<Date>();

  const [IsOpen, setIsOpen] = useState(false);
  const handleCalenderSelection = (date: Date | undefined) => {
    if (!date) {
    }
    if (date) {
      const formatedDate = format(date, "dd/MM/yyyy");
      setSelected(date);
      const updatedData: LocalStorageFormData = {
        ...data,
        birthDate: formatedDate,
      };
      setData(updatedData);
      localStorage.setItem("sectionTwoData", JSON.stringify(updatedData));
      console.log(updatedData);
      setIsOpen(false);
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
    localStorage.setItem("sectionTwoData", JSON.stringify(updatedData));
  };

  return (
    <div className="flex justify-center items-center min-w-2 gap-2">
      <Input
        label="Date of birth"
        id="birthDate"
        type="text"
        name="birthDate"
        errorMessage={errorMessage ?? ""}
        onChange={handleInputChange}
        value={data.birthDate ?? ""}
      />
      <div className="self-end">
        <Popover.Root open={IsOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <button type="button">{<CalendarDays />}</button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="bg-background">
              <DayPicker
                animate
                mode="single"
                selected={selected}
                onSelect={handleCalenderSelection}
                footer={
                  selected
                    ? `Selected: ${selected.toLocaleDateString()}`
                    : "Pick a day."
                }
              />
              <Popover.Close> click here to close</Popover.Close>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}
