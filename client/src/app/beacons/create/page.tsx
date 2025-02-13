'use client'
import { FC } from 'react'
import { useFormik } from 'formik'
import CreateBeaconTemplate from '@/components/templates/create-beacon-template'
import { Beacon } from '@/types/beacon'
// import { useCreateBeaconMutation } from '@/redux/api'

const DEFAULT_CATEGORY_OPTIONS: { label: string, value: string }[] = [
    { label: 'Automotive', value: 'automotive' },
    { label: 'Comics', value: 'comics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Heavy Duty', value: 'heavy duty' },
    { label: 'watches', value: 'watches' },
]

const CreateBeaconPage: FC = () => {

    // const [createBeacon] = useCreateBeaconMutation()

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            category: DEFAULT_CATEGORY_OPTIONS[0].value
        } as unknown as Beacon,
        onSubmit: (result) => {
            console.log('result', result)
        }
    })

    return <CreateBeaconTemplate
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        categoryOptions={DEFAULT_CATEGORY_OPTIONS}
    />
}
export default CreateBeaconPage