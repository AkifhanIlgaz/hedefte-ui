interface HeaderProps {
  currentStep: number;
}

export function Header({ currentStep }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        TYT Deneme Sonucu Ekle
      </h1>
      <p className="text-lg text-muted-foreground">
        {currentStep === 1
          ? "Deneme sonuçlarınızı derse göre girin."
          : "Hangi konulardan kaç yanlış yaptığınızı belirtin."}
      </p>
    </div>
  );
}
