/**
 * Utility functions for exporting table data in different formats
 */

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert
 * @returns {string} CSV formatted string
 */
const convertToCSV = (data) => {
    if (!data || !data.length) return ""
  
    const headers = Object.keys(data[0])
    const csvRows = []
  
    // Add header row
    csvRows.push(headers.join(","))
  
    // Add data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header] || ""
        // Escape quotes and wrap in quotes if contains comma or newline
        const escaped = String(value).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(","))
    }
  
    return csvRows.join("\n")
  }
  
  /**
   * Download data as a file
   * @param {string} content - Content to download
   * @param {string} fileName - Name of the file
   * @param {string} contentType - MIME type of the file
   */
  const downloadFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  /**
   * Export table data in the specified format
   * @param {Object} tableData - Table data object containing rows and metadata
   * @param {string} format - Export format (csv, excel, json)
   */
  export const exportTableData = (tableData, format) => {
    if (!tableData || !tableData.rows || !tableData.rows.length) {
      console.error("No data to export")
      return
    }
  
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const fileName = `table-export-${timestamp}`
  
    switch (format.toLowerCase()) {
      case "csv":
        const csvContent = convertToCSV(tableData.rows)
        downloadFile(csvContent, `${fileName}.csv`, "text/csv")
        break
  
      case "excel":
        // For Excel, we'll use CSV with BOM for Excel compatibility
        const excelContent = "\ufeff" + convertToCSV(tableData.rows)
        downloadFile(excelContent, `${fileName}.csv`, "text/csv;charset=utf-8")
        break
  
      case "json":
        const jsonContent = JSON.stringify(tableData.rows, null, 2)
        downloadFile(jsonContent, `${fileName}.json`, "application/json")
        break
  
      default:
        console.error(`Unsupported export format: ${format}`)
    }
  }
  
  /**
   * Filter table data based on search term
   * @param {Array} rows - Original table rows
   * @param {string} searchTerm - Search term to filter by
   * @returns {Array} Filtered rows
   */
  export const filterTableData = (rows, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return rows
    }
  
    const term = searchTerm.toLowerCase().trim()
  
    return rows.filter((row) => {
      return Object.values(row).some((value) => String(value).toLowerCase().includes(term))
    })
  }
  
  /**
   * Filter table data by a specific column
   * @param {Array} rows - Original table rows
   * @param {string} column - Column to filter by
   * @param {string} value - Value to filter for
   * @returns {Array} Filtered rows
   */
  export const filterByColumn = (rows, column, value) => {
    if (!column || !value || value.trim() === "") {
      return rows
    }
  
    const term = value.toLowerCase().trim()
  
    return rows.filter((row) => {
      if (row[column] === undefined) return false
      return String(row[column]).toLowerCase().includes(term)
    })
  }
  