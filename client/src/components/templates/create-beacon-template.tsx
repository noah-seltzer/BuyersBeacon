import { Beacon } from "@/types/beacon"
import Title from "../atoms/text/title"
import BeaconForm from "../organisms/forms/beacon-form"
import { FormikErrors, FormikTouched } from "formik";

interface CreateBeaconTemplateProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (e: React.ChangeEvent) => void
    values: Beacon,
    errors: FormikErrors<Beacon>
    touched: FormikTouched<Beacon>
}

const CreateBeaconTemplate: React.FC<CreateBeaconTemplateProps> = ({ handleSubmit, handleChange, values, errors, touched }) => {
    return (
        <div className="w-full min-h-screen py-8">
            <div className="container mx-auto rounded-lg px-4 py-4 border-radius-5 bg-surface">
                <Title>Post Beacon</Title>
                <BeaconForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
            </div>
        </div>
    )
}

export default CreateBeaconTemplate