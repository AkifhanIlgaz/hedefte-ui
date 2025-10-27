import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { text } from "@/lib/constants/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Resource, resourceSchema } from "../validations/resource.validation";

interface AddResourceModalProps {
  lessonId: string;
  addResource: (resource: Resource) => void;
}

export default function AddResourceModal({
  lessonId,
  addResource,
}: AddResourceModalProps) {
  const resourceForm = useForm<Resource>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      lessonId: "",
      userId: "",
      name: "",
    },
  });

  const {
    formState: { errors },
  } = { ...resourceForm };

  const onSubmit = async (req: Resource) => {
    addResource(req);

    // try {
    //   // Access token'ı al
    //   const {
    //     data: { session },
    //   } = await createClient().auth.getSession();

    //   // API'ye POST isteği gönder
    //   const response = await fetch("http://localhost:8080/api/resources", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${session?.access_token}`,
    //     },
    //     body: JSON.stringify(req),
    //   });
    //   console.log(response);

    //   const result = await response.json();

    //   console.log("Resource added:", result);

    //   // Form'u sıfırla veya yönlendirme yap
    //   // router.push(`/dashboard/analiz/${examType.toLowerCase()}`);
    // } finally {
    // }
  };

  console.log(errors);

  return (
    <Dialog>
      <DialogTrigger className="gap-2" asChild>
        <Button
          variant="default"
          size="sm"
          className="group-hover:shadow-md transition-all duration-300"
        >
          <Plus className="size-4" />
          Kaynak Ekle
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="">{lessonId} için kaynak ekle</DialogTitle>
        </DialogHeader>

        <Form {...resourceForm}>
          <form
            onSubmit={resourceForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={resourceForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Kaynak Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="HG Yayınları" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {text.analysis.common.buttons.cancel}
                </Button>
              </DialogClose>
              <Button type="submit" className="gap-2">
                <Plus className="w-4 h-4" />
                {text.analysis.common.buttons.save}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
