import React from 'react'

const Table = ({
    columns,
    controller,
}: any) => {

    const { tableRef, tableData: data, handleChange, handleEnter } = controller;

    return (

        <table ref={tableRef} className='overflow-scroll'>
            <thead className='sticky top-0 z-index-100 bg-white '>
                <tr className='' >
                    {
                        columns.map((column: any, index: any) => {
                            return <th key={index} className="thtr" >
                                {column}
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row: any, index1: any) => {
                        return <tr key={index1} >
                            {
                                columns.map((column: string) => {
                                    const value = row[column];
                                    return <td key={`${index1}${column}`} className="relative" >
                                        <input
                                            id={`${index1}${column}`}
                                            className='outline-none'
                                            onChange={(event: any) => handleChange({ index1, index2: column }, event)}
                                            onKeyUp={(event: any) => handleEnter({ index1, index2: column }, event)}
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

export default React.memo(Table);