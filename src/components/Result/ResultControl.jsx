
import { useState } from "react"
import PropTypes from "prop-types"
import { Box, TextField, Button, Menu, MenuItem, IconButton, InputAdornment, Tooltip } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import FilterListIcon from "@mui/icons-material/FilterList"
import { exportTableData } from "../../utils/upload"

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginRight: "16px",
  },
  searchField: {
    width: "100%",
    maxWidth: "400px",
    "& .MuiInputBase-root": {
      fontFamily: "Mukta",
    },
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    fontFamily: "Mukta",
    textTransform: "none",
  },
}

const ResultControl = ({ tableData, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [exportAnchorEl, setExportAnchorEl] = useState(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)

  const exportOpen = Boolean(exportAnchorEl)
  const filterOpen = Boolean(filterAnchorEl)

  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleExport = (format) => {
    exportTableData(tableData, format)
    handleExportClose()
  }

  const handleFilterApply = (column) => {
    onFilter(column)
    handleFilterClose()
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchContainer}>
        <TextField
          sx={styles.searchField}
          placeholder="Search in results..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={styles.actionsContainer}>
        <Tooltip title="Filter results">
          <IconButton
            aria-label="filter results"
            onClick={handleFilterClick}
            aria-controls={filterOpen ? "filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={filterOpen ? "true" : undefined}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        <Button
          sx={styles.button}
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportClick}
          aria-controls={exportOpen ? "export-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={exportOpen ? "true" : undefined}
        >
          Export
        </Button>

        <Menu
          id="export-menu"
          anchorEl={exportAnchorEl}
          open={exportOpen}
          onClose={handleExportClose}
          MenuListProps={{
            "aria-labelledby": "export-button",
          }}
        >
          <MenuItem onClick={() => handleExport("csv")}>CSV</MenuItem>
          <MenuItem onClick={() => handleExport("excel")}>Excel</MenuItem>
          <MenuItem onClick={() => handleExport("json")}>JSON</MenuItem>
        </Menu>

        <Menu
          id="filter-menu"
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={handleFilterClose}
          MenuListProps={{
            "aria-labelledby": "filter-button",
          }}
        >
          {tableData.metaData &&
            tableData.metaData.columns &&
            tableData.metaData.columns.map((column) => (
              <MenuItem key={`filter-${column.name}`} onClick={() => handleFilterApply(column.name)}>
                {column.name}
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </Box>
  )
}

ResultControl.propTypes = {
  tableData: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default ResultControl