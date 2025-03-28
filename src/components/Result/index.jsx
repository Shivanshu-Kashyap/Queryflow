
import { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import TableHeader from "./TableHeader"
import TableRowDialog from "./TableRowDialog"
import ResultControl from "./ResultControl" 
import { filterTableData, filterByColumn } from "../../utils/upload"
import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"

const styles = {
  paper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  tableContainer: {
    flex: "1",
    position: "relative",
    overflowY: "auto",
  },
  tableRowItem: {
    cursor: "pointer",
    "&:nth-of-type(odd)": {
      backgroundColor: "#f0f4f7",
    },
  },
  tableCell: {
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Mukta",
  },
}

const getTableHeaderCells = (metaData) => {
  return (
    metaData &&
    metaData.columns &&
    metaData.columns.map((column) => ({
      id: column.name,
      numeric: false,
      label: `${column.name}`,
    }))
  )
}

const ResultTable = ({ tableData = {} }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState({ column: "", value: "" })

  const { rows: tableRows = [], metaData } = tableData

  useEffect(() => {
    setPage(0)
    setSearchTerm("")
    setActiveFilter({ column: "", value: "" })
  }, [tableData])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const [showTableRowDialog, setShowTableRowDialog] = useState(false)
  const [currSelectedRow, setCurrSelectedRow] = useState()

  const toggleTableRowDialogState = () => {
    setShowTableRowDialog((val) => !val)
  }

  const handleTableRowDialogSuccess = () => {
    toggleTableRowDialogState()
    setTimeout(() => {
      setCurrSelectedRow({})
    }, 500)
  }

  const handleTableRowClick = (row) => {
    setCurrSelectedRow(row)
    toggleTableRowDialogState()
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setPage(0)
  }

  const handleFilter = (column) => {
    // For simplicity, we're just setting the column to filter by
    // In a real implementation, you'd show a dialog to enter filter value
    const value = prompt(`Enter value to filter ${column} by:`)
    if (value !== null) {
      setActiveFilter({ column, value })
      setPage(0)
    }
  }

  const filteredData = useMemo(() => {
    let filtered = [...tableRows]

    // Apply search filter
    if (searchTerm) {
      filtered = filterTableData(filtered, searchTerm)
    }

    // Apply column filter
    if (activeFilter.column && activeFilter.value) {
      filtered = filterByColumn(filtered, activeFilter.column, activeFilter.value)
    }

    return filtered
  }, [tableRows, searchTerm, activeFilter])

  const paginatedRows = useMemo(() => {
    return filteredData.length > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : []
  }, [filteredData, page, rowsPerPage])

  return (
    <Paper sx={styles.paper}>
      <ResultControl tableData={tableData} onSearch={handleSearch} onFilter={handleFilter} />
      <TableContainer sx={styles.tableContainer}>
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          aria-label="Query result table"
          sx={{
            "& > *": {
              fontFamily: "Mukta !important",
            },
          }}
        >
          {/* Table Header */}
          <TableHeader headerCells={getTableHeaderCells(metaData)} rowCount={paginatedRows.length} />

          {/* Table Body */}
          <TableBody>
            {paginatedRows.map((row, rowIndex) => {
              return (
                <TableRow
                  sx={styles.tableRowItem}
                  hover
                  tabIndex={-1}
                  key={`result-row-${rowIndex}`}
                  onClick={() => {
                    handleTableRowClick(row)
                  }}
                >
                  {Object.keys(row).map((key, cellIndex) => (
                    <TableCell sx={styles.tableCell} key={`result-cell-${key}-${rowIndex}-${cellIndex}`}>
                      {row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Table Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-selectLabel": {
            fontFamily: "Mukta",
          },
          "& .MuiSelect-select": {
            fontFamily: "Mukta",
          },
          "& .MuiTablePagination-displayedRows": {
            fontFamily: "Mukta",
          },
        }}
      />
      <TableRowDialog
        row={currSelectedRow}
        showDialog={showTableRowDialog}
        handleCancelAction={toggleTableRowDialogState}
        handleSuccessAction={handleTableRowDialogSuccess}
      />
    </Paper>
  )
}

ResultTable.propTypes = {
  tableData: PropTypes.object.isRequired,
}

export default ResultTable