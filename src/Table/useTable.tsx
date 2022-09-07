import React, { useCallback } from 'react'

const useTable = (data: any, setTableData: any) => {

    const tableRef = React.useRef<any>(null);
    const dataRef = React.useRef<any>({});
    const timeOuts = React.useRef<any>({});

    // const [state] = React.useState(data);

    const setValue = (index1: any, index2: any) => {
        const newValue: any = [...data];
        newValue[index1][index2] = dataRef.current?.[index1]?.[index2];
        setTableData(newValue);
    }

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

    // when input recieve a "Enter Key" 
    const handleEnter = ({ index1, index2 }: any, event: any) => {
        if (event.keyCode === 13) {
            const inputElem = document.getElementById(`${index1}${index2}`);
            // if (inputElem)
            //     inputElem.blur();
        }
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

    const controller = React.useMemo(() => ({
        controller: { tableRef, tableData: data, handleChange, handleEnter }
    }), [data])

    return controller;
}

export default useTable