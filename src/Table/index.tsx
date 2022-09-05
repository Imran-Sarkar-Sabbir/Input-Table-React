import React from 'react'
import { columns, data } from './data'

const Table = () => {
    const tableRef = React.useRef<any>(null);
    const dataRef = React.useRef<any>({});
    const timeOuts = React.useRef<any>({});

    const [state, setState] = React.useState(data);

    const setValue = (index1: any, index2: any) => {
        const newValue: any = [...state];
        newValue[index1][index2] = dataRef.current?.[index1]?.[index2];
        setState(newValue);
    }

    React.useEffect(() => {

    }, [state])


    const debounce = ({ index1, index2 }: any, value: any) => {

        dataRef.current = {
            ...(dataRef.current || {}),
            [index1]: dataRef.current?.[index1] ? {
                ...dataRef.current?.[index1],
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

    return (
        <table ref={tableRef} className='overflow-scroll'>
            <thead className='sticky top-0 z-index-100 bg-white '>
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
                                columns.map((column: string) => {
                                    const value = row[column];
                                    return <td key={`${index1}${column}`} className="relative" >
                                        <input
                                            id={`${index1}${column}`}
                                            className='outline-none'
                                            onChange={(event: any) => handleChange({ index1, index2: column }, event)}
                                            type={'text'}
                                            value={undefined}
                                            defaultValue={value} />
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