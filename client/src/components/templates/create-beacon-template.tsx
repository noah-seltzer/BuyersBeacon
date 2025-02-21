import { Beacon } from "@/types/beacon";
import BeaconForm from "../organisms/forms/beacon-form";
import { FormikErrors, FormikTouched } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button } from "../atoms/button";
import Link from "next/link";

interface CreateBeaconTemplateProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent) => void;
  values: Beacon;
  errors: FormikErrors<Beacon>;
  touched: FormikTouched<Beacon>;
  categoryOptions: { label: string; value: string }[];
  submitting: boolean;
}

export function CreateBeaconTemplate({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  categoryOptions,
  submitting,
}: CreateBeaconTemplateProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground/80 hover:text-foreground"
            >
              <Link href="/browse">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Post a Beacon
              </h1>
              <p className="text-foreground/60 mt-1">
                Let sellers know what you're looking for
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <BeaconForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              categoryOptions={categoryOptions}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBeaconTemplate;
