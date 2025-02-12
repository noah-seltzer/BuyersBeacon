'use client'
import { FC } from 'react'
import { useFormik } from 'formik'
// import { useCreateBeaconMutation } from '@/redux/api'

const CreateBeaconPage: FC = () => {

    // const [createBeacon] = useCreateBeaconMutation()

    const formik = useFormik({
        initialValues: {
            itemName: 'Auto Part',
            itemDescription: 'The exhaust to a new chevy'
        },
        onSubmit: (result) => {
            console.log('result', result)
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <input
                    id="itemName"
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                    onKeyUp={formik.handleBlur}
                    />

            </form>
        </div>
    )
}
export default CreateBeaconPage