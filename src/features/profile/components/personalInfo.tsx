import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { profileText } from "../profile.text";
import ProfileField from "./field";

interface PersonalInfoProps {
  user: User | null;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  let firstName = user?.user_metadata?.firstName || "";
  let lastName = user?.user_metadata?.lastName || "";

  if (user?.user_metadata?.name && !firstName && !lastName) {
    const nameParts = user.user_metadata.name.trim().split(" ");
    if (nameParts.length > 1) {
      lastName = nameParts.pop() || "";
      firstName = nameParts.join(" ");
    } else {
      firstName = user.user_metadata.name;
    }
  }

  const email = user?.email || user?.user_metadata?.email || "";
  const phone = user?.user_metadata?.phone || "";

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">
          {profileText.personalInfo.title}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileField
          label={profileText.personalInfo.firstName}
          value={firstName}
        />
        <ProfileField
          label={profileText.personalInfo.lastName}
          value={lastName}
        />
        <ProfileField label={profileText.personalInfo.email} value={email} />
        <ProfileField label={profileText.personalInfo.phone} value={phone} />
      </CardContent>
    </Card>
  );
}
