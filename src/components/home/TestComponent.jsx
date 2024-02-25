import { useState } from 'react'
import { isAxiosError } from 'axios'
import { testService } from '../../services/testService'
import './TestComponent.scss'

export const TestComponent = () => {
    const [value, setValue] = useState(0)

    const teacher = async () => {
        try {
            const { data } = await testService.teacher()
            console.log('>>> teacher >>>', data)
            setValue('success')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('>>> error >>>', error)
                setValue(error.message)
            }
        }
    }

    const student = async () => {
        try {
            const { data } = await testService.student()
            console.log('>>> student >>>', data)
            setValue('success')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('>>> error >>>', error)
                setValue(error.message)
            }
        }
    }

    const major = async () => {
        try {
            const { data } = await testService.major()
            console.log('>>> major >>>', data)
            setValue('success')
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('>>> error >>>', error)
                setValue(error.message)
            }
        }
    }

    return (
        <div className="main">
            <h1 className="main-content">{value}</h1>

            <button className="fetch-data-btn" onClick={teacher}>
                teacher
            </button>

            <button className="fetch-data-btn" onClick={student}>
                student
            </button>

            <button className="fetch-data-btn" onClick={major}>
                major
            </button>
        </div>
    )
}
