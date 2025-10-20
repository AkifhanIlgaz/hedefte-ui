import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFieldProps = {
  label: string;
  value: string;
};

export default function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={label}
        value={value}
        disabled
        className=" disabled:opacity-100"
      />
    </div>
  );
}
