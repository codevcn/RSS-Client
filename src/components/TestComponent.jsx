import { useState } from 'react'
import { isAxiosError } from 'axios'
import { testService } from '../services/testService'
import appLogo from '../assets/react.svg'
import './TestComponent.scss'

export const TestComponent = () => {
    const [value, setValue] = useState(0)

    const fetchData = async () => {
        try {
            const { data } = await testService.fetchData({
                cid: 909,
                content: 'Han So-Hee, Kim Tae-Ri',
            })
            console.log('>>> fetch data >>>', data)
            setValue(data.msg + '===' + data.cid)
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('>>> error >>>', error)
                setValue(error.message)
            }
        }
    }

    const testException = async () => {
        try {
            const { data } = await testService.testException()
            console.log('>>> exception data >>>', data)
        } catch (error) {
            if (isAxiosError(error)) {
                console.log('>>> error >>>', error)
                setValue(error.message)
            }
        }
    }

    return (
        <div className="main">
            <img className="app-logo" src={appLogo} alt="App Logo" />

            <h1 className="main-content">{value}</h1>

            <button className="fetch-data-btn" onClick={fetchData}>
                fetch data
            </button>

            <button className="fetch-data-btn" onClick={testException}>
                test exception
            </button>
        </div>
    )
}
