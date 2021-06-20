import React, { useState, useEffect } from "react";
import XLSX from "xlsx";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";

const Attendance = () => {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);

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
            headerTable.push({
                Header: element,
                accessor: tempAccessor,
            });
            accessorHeader.push(tempAccessor);
        });
        setCols(headerTable);
        return accessorHeader;
    };

    const make_cols = (refstr) => {
        let o = [],
            C = XLSX.utils.decode_range(refstr).e.c + 1;
        for (var i = 0; i < C; ++i)
            console.log("XLSX.utils.encode_col(i)", XLSX.utils.encode_col(i));
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
        return o;
    };

    useEffect(() => {
        console.log("data", data);
        console.log("cols", cols);
    }, [data, cols]);

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
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
                </div>
            </form>
        </>
    );
};

export default Attendance;
