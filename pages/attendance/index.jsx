import React, { useState, useEffect } from "react";
import XLSX from "xlsx";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import BTable from "react-bootstrap/Table";
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "@helper/arrayMove";

const Attendance = () => {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const [defaultColumn, setDefaultColumn] = useState({
        minWidth: 100,
        width: 180,
        maxWidth: 400,
    });

    const handleFile = (file /*:File*/) => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            const accKey = make_header(data[0]);
            console.log("accKey", accKey);
            data.shift();
            const tempData = data.filter((item) => item.length !== 0);
            const formattedTempData = [];
            tempData.map((datum, i) => {
                let objTempAcc = {};
                datum.forEach((item, j) => {
                    objTempAcc[accKey[j]] = item;
                });
                formattedTempData.push(objTempAcc);
            });
            console.log("formattedTempData", formattedTempData);
            setData(formattedTempData);
            // setCols(make_cols(ws["!ref"]));
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    };

    const make_header = (firstArray) => {
        const headerTable = [];
        const accessorHeader = [];
        firstArray.forEach((element, i) => {
            let tempAccessor = element.replace(/\s/g, "");
            tempAccessor = tempAccessor.split(".").join("");
            console.log("tempAccessor", tempAccessor);
            headerTable.push({
                Header: element,
                accessor: tempAccessor,
            });
            accessorHeader.push(tempAccessor);
        });
        setCols(headerTable);
        return accessorHeader;
    };

    useEffect(() => {
        console.log("data", data);
        console.log("cols", cols);
    }, [data, cols]);

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
    };

    const onSortEnd = React.useCallback(({ oldIndex, newIndex }) => {
        setData((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
    }, []);

    const onSortEndHead = React.useCallback(({ oldIndex, newIndex }) => {
        setCols((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
    }, []);
    console.log(Object.entries(defaultColumn));
    console.log(defaultColumn);

    const onChangeDefCols = (e) => {
        setDefaultColumn((prevState) => ({
            ...prevState,
            [e.target.name]: Number(e.target.value),
        }));
    };
    return (
        <>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="file">Spreadsheet</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept={".xlsx,.xls"}
                        onChange={handleChange}
                    />
                    {Object.entries(defaultColumn).map((item, i) => (
                        <input
                            key={`${item[0] + i}`}
                            type="number"
                            name={item[0]}
                            value={item[1]}
                            onChange={(e) => onChangeDefCols(e)}
                            className="form-control"
                        />
                    ))}
                </div>
                {data.length > 0 && cols.length > 0 && (
                    <Table
                        data={data}
                        columns={cols}
                        onSortEnd={onSortEnd}
                        onSortEndHead={onSortEndHead}
                        defaultColumn={defaultColumn}
                    />
                )}
            </form>
        </>
    );
};

const Table = (props) => {
    const { data, columns, defaultColumn, onSortEnd, onSortEndHead } = props;

    var {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        resetResizing,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout,
        useResizeColumns,
    );

    const SortableContBody = SortableContainer(({ children }) => {
        return <tbody {...getTableBodyProps()}>{children}</tbody>;
    });
    const SortableItem = SortableElement((props) => {
        return (
            <tr key={props.key} {...props.row.getRowProps()} className="tr">
                <RowHandler />
                {props.row.cells.map((cell) => {
                    return (
                        <td {...cell.getCellProps()} className="td">
                            {cell.render("Cell")}
                        </td>
                    );
                })}
            </tr>
        );
    });

    const SortableContHead = SortableContainer(({ children }) => {
        return <thead>{children}</thead>;
    });
    const SortableHeader = SortableElement((props) => {
        return (
            <th {...props.column.getHeaderProps()} className="th">
                {props.column.render("Header")}
                <HeadHandler />
                {/* Use column.getResizerProps to hook up the events correctly */}
                <div
                    {...props.column.getResizerProps()}
                    className={`resizer ${
                        props.column.isResizing ? "isResizing" : ""
                    }`}
                />
            </th>
        );
    });

    const RowHandler = SortableHandle(() => (
        <td className="handle cursor-move">
            <i className="bx bxs-sort-alt"></i>
        </td>
    ));

    const HeadHandler = SortableHandle(() => (
        <div>
            <i className="bx bx-move-horizontal cursor-move"></i>
        </div>
    ));

    return (
        <>
            <div>
                <BTable
                    striped
                    bordered
                    hover
                    size="sm"
                    variant="dark"
                    {...getTableProps()}
                >
                    <SortableContHead
                        onSortEnd={onSortEndHead}
                        axis="x"
                        lockAxis="x"
                        lockToContainerEdges={true}
                        lockOffset={["30%", "50%"]}
                        useDragHandle={true}
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="tr"
                            >
                                <th>
                                    <i className="bx bx-sort-alt-2"></i>
                                </th>
                                {headerGroup.headers.map((column, i) => (
                                    <SortableHeader
                                        column={column}
                                        key={`head-${i}`}
                                        index={i}
                                    />
                                ))}
                            </tr>
                        ))}
                    </SortableContHead>

                    <SortableContBody
                        onSortEnd={onSortEnd}
                        axis="y"
                        lockAxis="y"
                        lockToContainerEdges={true}
                        lockOffset={["30%", "50%"]}
                        useDragHandle={true}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <SortableItem
                                    index={i}
                                    key={`item-${i}`}
                                    row={row}
                                />
                            );
                        })}
                    </SortableContBody>
                </BTable>
            </div>
        </>
    );
};

export default Attendance;
