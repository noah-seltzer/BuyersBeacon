import { Beacon } from "@/types/beacon";
import BeaconForm from "../organisms/forms/beacon-form";
import { BeaconPreview } from "../organisms/beacon-preview";
import { FormikErrors, FormikTouched } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button } from "../atoms/button";
import Link from "next/link";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FC } from "react";
import PageHeading from "../atoms/text/page-heading";

interface CreateBeaconTemplateProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent) => void;
  values: Beacon;
  errors: FormikErrors<Beacon>;
  touched: FormikTouched<Beacon>;
  categoryOptions: { label: string; value: string }[];
  categoryOptionsIsLoading: boolean;
  categoryOptionsError: FetchBaseQueryError | SerializedError | undefined;
  submitting: boolean;
  setFieldValue: (field: string, value: any) => void;
  onSaveDraft?: () => void;
  draftSaved?: boolean;
  draftError?: string | null;
  isEditing?: boolean;
}

const CreateBeaconTemplate: FC<CreateBeaconTemplateProps> = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  categoryOptions,
  categoryOptionsIsLoading,
  categoryOptionsError,
  submitting,
  setFieldValue,
  onSaveDraft,
  draftSaved,
  draftError,
  isEditing = false,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground/80 hover:text-foreground"
            >
              <Link href="/beacons/browse">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <PageHeading
              title={isEditing ? "Edit Beacon" : "Create New Beacon"}
              subtitle="Let sellers know what you're looking for"
              className="mb-0"
            />
          </div>

          {/* Form and Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <BeaconForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                categoryOptions={categoryOptions}
                categoryOptionsIsLoading={categoryOptionsIsLoading}
                categtorOptionsError={categoryOptionsError}
                submitting={submitting}
                setFieldValue={setFieldValue}
                onSaveDraft={onSaveDraft}
                draftSaved={draftSaved}
                draftError={draftError}
              />
            </div>

            {/* Preview Section - Sticky on desktop */}
            <div className="lg:sticky lg:top-8">
              <BeaconPreview beacon={values} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBeaconTemplate;
