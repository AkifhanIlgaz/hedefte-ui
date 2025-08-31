"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "../analiz/_components/header";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Header
        title={`Ayarlar`}
        subtitle={"Hesap ve uygulama ayarlarını yönetin"}
      />

      <div className="flex gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Profil Bilgileri</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileField label="Ad" value="Enayi" />
            <ProfileField label="Soyad" value="Zozak" />
            <ProfileField label="E-posta" value="zozak@example.com" />
            <ProfileField label="Telefon" value="(123) 456-7890" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Hedefleriniz</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileField
              label="Universite"
              value="Istanbul Teknik Universitesi"
            />
            <ProfileField label="Bolum" value="Elektrik Mühendisliği" />
            <ProfileField label="Siralama" value="5k" />
            <ProfileField label="Sinif" value="EA - MF" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={label}
        value={value}
        disabled
        className="  disabled:opacity-100"
      />
    </div>
  );
}
