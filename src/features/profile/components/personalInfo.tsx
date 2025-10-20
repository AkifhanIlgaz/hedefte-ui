"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@supabase/supabase-js";
import { profileText } from "../profile.text";

interface PersonalInfoProps {
  user: User | null;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export default function PersonalInfo({
  user,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
}: PersonalInfoProps) {
  const email = user?.email || user?.user_metadata?.email || "";

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">
          {profileText.personalInfo.title}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{profileText.personalInfo.firstName}</Label>
          <Input
            placeholder={profileText.personalInfo.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>{profileText.personalInfo.lastName}</Label>
          <Input
            placeholder={profileText.personalInfo.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>{profileText.personalInfo.email}</Label>
          <Input
            placeholder={profileText.personalInfo.email}
            value={email}
            disabled
            className="disabled:opacity-100"
          />
        </div>

        <div className="space-y-2">
          <Label>{profileText.personalInfo.phone}</Label>
          <Input
            placeholder={profileText.personalInfo.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
