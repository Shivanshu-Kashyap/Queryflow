
import { useState } from "react"
import PropTypes from "prop-types"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material"

const styles = {
  formControl: {
    minWidth: 200,
    marginBottom: 2,
  },
  dialogContent: {
    paddingTop: 2,
  },
  button: {
    fontFamily: "Mukta",
    textTransform: "none",
  },
}

const FilterDialog = ({ open, columns, onClose, onApply }) => {
  const [selectedColumn, setSelectedColumn] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [operator, setOperator] = useState("contains")

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value)
  }

  const handleOperatorChange = (event) => {
    setOperator(event.target.value)
  }

  const handleValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleApply = () => {
    onApply({
      column: selectedColumn,
      operator,
      value: filterValue,
    })
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setSelectedColumn("")
    setOperator("contains")
    setFilterValue("")
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "Mukta" }}>Filter Results</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl sx={styles.formControl}>
            <InputLabel id="column-select-label">Column</InputLabel>
            <Select
              labelId="column-select-label"
              id="column-select"
              value={selectedColumn}
              onChange={handleColumnChange}
              label="Column"
              sx={{ fontFamily: "Mukta" }}
            >
              {columns.map((column) => (
                <MenuItem key={`filter-column-${column.name}`} value={column.name} sx={{ fontFamily: "Mukta" }}>
                  {column.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={styles.formControl}>
            <InputLabel id="operator-select-label">Operator</InputLabel>
            <Select
              labelId="operator-select-label"
              id="operator-select"
              value={operator}
              onChange={handleOperatorChange}
              label="Operator"
              sx={{ fontFamily: "Mukta" }}
            >
              <MenuItem value="contains" sx={{ fontFamily: "Mukta" }}>
                Contains
              </MenuItem>
              <MenuItem value="equals" sx={{ fontFamily: "Mukta" }}>
                Equals
              </MenuItem>
              <MenuItem value="startsWith" sx={{ fontFamily: "Mukta" }}>
                Starts with
              </MenuItem>
              <MenuItem value="endsWith" sx={{ fontFamily: "Mukta" }}>
                Ends with
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Filter Value"
            value={filterValue}
            onChange={handleValueChange}
            fullWidth
            InputProps={{
              sx: { fontFamily: "Mukta" },
            }}
            InputLabelProps={{
              sx: { fontFamily: "Mukta" },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" sx={styles.button}>
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          color="primary"
          variant="contained"
          disabled={!selectedColumn || !filterValue}
          sx={styles.button}
        >
          Apply Filter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
}

export default FilterDialog