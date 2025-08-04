const authTexts = {
  welcomeBack: "Tekrar hoşgeldiniz !",
  google: "Google ile giriş yap",
  dontHaveAccount: "Henüz üye değil misin ?",
  alreadyHaveAccount: "Zaten üye misin ?",
  withEmail: "veya e-posta ile devam et",
  forgotPassword: "Şifreni mi unuttun ?",
  createNewPassword: "Yeni şifre oluştur",
  passwordUpdated: "Şifre güncellendi!",
  passwordUpdatedSubtitle:
    "Şifren başarıyla güncellendi. Artık yeni şifrenle giriş yapabilirsin.",
  createNewPasswordSubtitle:
    "Yeni şifren, eski şifrelerinden farklı olmalıdır.",
  enterEmail:
    "Sorun değil! E-posta adresini gir, sana bir sıfırlama bağlantısı gönderelim.",
  checkEmail: "E-postanı kontrol et",
  checkSpam: `E-postayı almadın mı? Spam klasörünü kontrol et veya birkaç dakika sonra tekrar dene.`,
  signInSubtitle: "Devam etmek için giriş yapın",
  registerTitle: "Hesap Oluştur",
  registerSubtitle: "Bize katıl ve yolculuğuna başla",
  updatingPassword: "Şifre güncelleniyor...",
  signingIn: "Giriş yapılıyor...",
  sendingLink: "Bağlantı gönderiliyor...",
  creatingAccount: "Hesap oluşturuluyor...",
  buttons: {
    login: "Giriş Yap",
    register: "Hesap oluştur",
    sendResetLink: "Sıfırlama bağlantısını gönder",
    returnLogin: "Giriş ekranına dön",
    updatePassword: "Şifreyi güncelle",
  },
  labels: {
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-posta adresi",
    password: "Şifre",
    confirmPassword: "Şifre tekrar",
    rememberMe: "Beni hatırla",
    forgotPassword: "Şifremi unuttum ?",
    createAccount: "Hesap oluştur",
  },
  placeholders: {
    email: "zozak@gmail.com",
    password: "********",
    confirmPassword: "Şifrenizi tekrar girin",
    firstName: "Adınızı girin",
    lastName: "Soyadınızı girin",
  },
};

const analizTexts = {
  common: {
    buttons: {
      save: "Kaydet",
      cancel: "İptal",
      back: "Geri",
      details: "Ayrıntılar",
      addTopic: "Konu Ekle",
    },
    stats: {
      wrong: "Yanlış",
      empty: "Boş",
      total: "Toplam",
      progress: "İlerleme",
    },
    messages: {
      noMistakes: {
        title: "Hiç yanlış veya boş cevabınız yok!",
        subtitle: "Tüm soruları doğru cevapladınız. Tebrikler! 🎉",
      },
      onlyMistakesShown:
        "Sadece yanlış veya boş bıraktığınız dersler gösteriliyor",
    },
  },
  modal: {
    addTopic: {
      title: "Konu Ekle",
      description: "Hangi konulardan kaç yanlış yaptığınızı belirtin.",
      selectPlaceholder: "Yanlış yaptığınız konuyu seçin.",
    },
    details: {
      title: "Konu Detayları",
      description: "Hangi konulardan kaç yanlış yaptığınızı belirtin.",
    },
  },
  firstStep: {
    subtitle: "Deneme sonuçlarınızı derse göre girin.",
    label: "Temel Sonuçlar",
  },
  secondStep: {
    title: "Konu Bazında Yanlışlar",
    subtitle: "Hangi konulardan kaç yanlış yaptığınızı belirtin.",
    label: "Konu Bazında Yanlışlar",
  },
  tyt: {
    title: "TYT Deneme Sonucu Ekle",
  },
  ayt: {
    title: "AYT Deneme Sonucu Ekle",
  },
};

export const text = {
  auth: authTexts,
  analysis: analizTexts,
};
