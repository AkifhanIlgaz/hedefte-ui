"use client";

import { Button } from "@/components/ui/button";
import { GoalInfo, PersonalInfo } from "@/src/features/profile/components";
import { profileText } from "@/src/features/profile/profile.text";
import { createClient } from "@/src/lib/supabase/client";
import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import { useAuth } from "@/src/shared/hooks/useAuth";
import { SaveAll } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Personal Info States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Goal Info States
  const [valueUni, setValueUni] = useState("");
  const [valueDepartment, setValueDepartment] = useState("");
  const [selectedField, setSelectedField] = useState("");

  // Initial Values
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    uni: "",
    department: "",
    field: "",
  });

  useEffect(() => {
    if (user) {
      const userMeta = user.user_metadata;
      let initialFirstName = userMeta?.firstName || "";
      let initialLastName = userMeta?.lastName || "";

      if (userMeta?.name && !initialFirstName && !initialLastName) {
        const nameParts = userMeta.name.trim().split(" ");
        if (nameParts.length > 1) {
          initialLastName = nameParts.pop() || "";
          initialFirstName = nameParts.join(" ");
        } else {
          initialFirstName = userMeta.name;
        }
      }

      const initial = {
        firstName: initialFirstName,
        lastName: initialLastName,
        phone: userMeta?.phone || "",
        uni: userMeta?.uni || "",
        department: userMeta?.department || "",
        field: userMeta?.field || "",
      };

      setFirstName(initial.firstName);
      setLastName(initial.lastName);
      setPhone(initial.phone);
      setValueUni(initial.uni);
      setValueDepartment(initial.department);
      setSelectedField(initial.field);
      setInitialValues(initial);
    }
  }, [user]);

  // Check for changes
  useEffect(() => {
    const changed =
      firstName !== initialValues.firstName ||
      lastName !== initialValues.lastName ||
      phone !== initialValues.phone ||
      valueUni !== initialValues.uni ||
      valueDepartment !== initialValues.department ||
      selectedField !== initialValues.field;

    setHasChanges(changed);
  }, [
    firstName,
    lastName,
    phone,
    valueUni,
    valueDepartment,
    selectedField,
    initialValues,
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName,
          lastName,
          phone,
          uni: valueUni,
          department: valueDepartment,
          field: selectedField,
        },
      });

      if (error) throw error;

      setInitialValues({
        firstName,
        lastName,
        phone,
        uni: valueUni,
        department: valueDepartment,
        field: selectedField,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={profileText.pageTitle}
        subtitle={profileText.pageSubtitle}
      />

      <div className="flex gap-4">
        <PersonalInfo
          user={user}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
        />
        <GoalInfo
          user={user}
          valueUni={valueUni}
          setValueUni={setValueUni}
          valueDepartment={valueDepartment}
          setValueDepartment={setValueDepartment}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
        />
      </div>

      {hasChanges && (
        <div className="flex items-center justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="">
            <SaveAll className=" h-4 w-4" />
            {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </div>
      )}
    </div>
  );
}
