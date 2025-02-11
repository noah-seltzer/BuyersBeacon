'use client'
import { FC } from 'react'
import { useFormik } from 'formik'
import { useCreateBeaconMutation } from '../../../redux/api'

const CreateBeaconPage: FC = () => {

    const [createBeacon] = useCreateBeaconMutation()

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
                <div >

                <input
                    id="itemName"
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                    onKeyUp={formik.handleBlur}
                    />
                <input
                    id="itemDescription"
                    name="itemDescription"
                    value={formik.values.itemDescription}
                    onChange={formik.handleChange}
                    onKeyUp={formik.handleBlur}
                    />
                </div>
            </form>
        </div>
    )
}
export default CreateBeaconPage