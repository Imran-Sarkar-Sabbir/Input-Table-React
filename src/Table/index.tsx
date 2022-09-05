import React, { useEffect } from 'react'
import { columns, data } from './data'

const Table = () => {

    const tableRef = React.useRef<any>({});
    const timeOuts = React.useRef<any>({});

    const [state, setState] = React.useState(data);

    const setValue = (index1: any, index2: any) => {
        const newValue: any = [...state];
        newValue[index1][index2] = tableRef.current?.[index1]?.[index2];
        setState(newValue);
    }

    React.useEffect(() => {
        console.log('State Update...')

    }, [state])


    const debounce = ({ index1, index2 }: any, value: any) => {

        tableRef.current = {
            ...(tableRef.current || {}),
            [index1]: tableRef.current?.[index1] ? {
                ...tableRef.current?.[index1],
                [index2]: value
            } : { [index2]: value }
        }

        const timeOut: any = setTimeout(() => {
            setValue(index1, index2);
            delete timeOuts.current?.[index1]?.[index2]
        }, 600)

        if (timeOuts.current?.[index1]?.[index2]) {
            clearTimeout(timeOuts.current?.[index1]?.[index2])
            delete timeOuts.current?.[index1]?.[index2]
        }

        timeOuts.current = {
            ...(timeOuts.current || {}),
            [index1]: timeOuts.current?.[index1] ? {
                ...timeOuts.current?.[index1],
                [index2]: timeOut
            } : { [index2]: timeOut }
        }
    }

    // handle onChange on text editor
    const handleChange = ({ index1, index2 }: any, event: any) => {
        debounce({ index1, index2 }, event.target.value)
    }

    // when destroy, time out will be cleared.
    React.useEffect(() => {
        return () => {
            Object.keys(timeOuts.current)?.forEach((index1: any) => {
                Object.keys(timeOuts.current[index1]).forEach((index2: any) => {
                    clearTimeout(timeOuts.current[index1][index2]);

                })
            })
        }
    })

    console.log('rendering...');


    return (
        <table className='overflow-scroll'>
            <thead className='sticky top-0  bg-white'>
                <tr className='' >
                    {
                        columns.map((column, index) => {
                            return <th key={index} className="thtr" >
                                {column}
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row: any, index1) => {
                        return <tr key={index1} >
                            {
                                columns.map((column: string, index2) => {
                                    const value = row[column];
                                    return <td key={index1 + index2} >
                                        <input className='outline-none' onChange={(e) => handleChange({ index1, index2: column }, e)} type={'text'} value={undefined} defaultValue={value} />
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>

        </table>
    )
}

export default Table