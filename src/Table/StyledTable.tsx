import React from 'react'

const StyledTable = ({
    columns,
    controller,

}: any) => {

    const { tableRef, tableData: data, handleChange, handleEnter } = controller;

    return (
        <div className="overflow-x-scroll">
            {/* <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6"> */}
            <table className="min-w-max w-full  sticky top-0" ref={tableRef}>
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0">
                        <th className="py-3 px-6 text-left">Index</th>
                        {
                            columns.map((column: any, index: any) => {
                                return (
                                    <th key={index} className="py-3 px-6 text-left">{column}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {
                        data.map((row: any, index1: any) => {
                            return <tr key={index1} className="border-b border-[.3px] border-gray-200 hover:bg-white">
                                <td className="relative">
                                    <div className='text-center'>{index1}</div>
                                </td>
                                {
                                    columns.map((column: string) => {
                                        const value = row[column];
                                        return <td key={`${index1}${column}`} className="relative text-left whitespace-nowrap" >
                                            <textarea
                                                id={`${index1}${column}`}
                                                className='outline-none bg-transparent py-3 px-6'
                                                onChange={(event: any) => handleChange({ index1, index2: column }, event)}
                                                onKeyUp={(event: any) => handleEnter({ index1, index2: column }, event)}
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
        </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default React.memo(StyledTable);