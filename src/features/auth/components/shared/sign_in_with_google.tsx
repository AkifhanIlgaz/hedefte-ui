import { Button } from "@/components/ui/button";
import { createClient } from "@/src/lib/supabase/client";
import { IconBrandGoogle } from "@tabler/icons-react";
import { authText } from "../../auth.text";

export default function SignInWithGoogle() {
  return (
    <Button
      variant="outline"
      className="w-full h-11 bg-background border-default-200 hover:bg-default-50"
      onClick={() => {
        createClient().auth.signInWithOAuth({
          provider: "google",
        });
      }}
    >
      <IconBrandGoogle />
      {authText.signInWithGoogle}
    </Button>
  );
}
