import React from 'react'
import { columns, data } from './data'
import StyledTable from './StyledTable'
import useTable from './useTable'

const Index = () => {

    const [tableData, setTableData] = React.useState(data);
    const { controller } = useTable(tableData, setTableData)

    const myColums = React.useMemo(() => columns, []);

    return (
        // <Table columns={columns} controller={controller} data={data} />
        <StyledTable columns={myColums} controller={controller} />
    )

}

export default Index