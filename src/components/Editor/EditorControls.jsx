import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import EditableTabs from "../EditableTabs";
import MenuButton from "../MenuButton";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import PropTypes from "prop-types";
import { Box, Button, Paper, Tooltip } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = {
  "& .MuiPaper-root": {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(254,252,254)",
  },
  editorButton: {
    marginRight: "8px",
    minWidth: "fit-content",
  },
  editorButtonsWrapper: {
    marginRight: "8px",
    marginLeft: "8px",
  },
};

const EditorControls = ({ onRunQuery, onFontSizeChange, tableData }) => {
  const navigate = useNavigate();
  const { setWorkspaces, tabs, currentWorkspace, setCurrentWorkspace, setTabs } = useAppContext();
  const [fontSize, setFontSize] = useState(16);

  const onSaveWorkspace = () => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === currentWorkspace ? { ...workspace, tabs } : workspace
      )
    );
    setTabs([]);
    setCurrentWorkspace("");
    navigate("/");
  };

  const formatDataForExport = (format) => {
    if (!tableData || !tableData.rows || tableData.rows.length === 0) return "";

    const { rows, metaData } = tableData;

    switch (format) {
      case "CSV File":
        const csvHeaders = metaData.columns.map((col) => col.name).join(",");
        const csvRows = rows.map((row) => Object.values(row).join(",")).join("\n");
        return `${csvHeaders}\n${csvRows}`;

      case "XML File":
        return (
          `<rows>\n` +
          rows.map((row) =>
            `  <row>\n` +
            Object.entries(row)
              .map(([key, value]) => `    <${key}>${value}</${key}>`)
              .join("\n") +
            `\n  </row>`
          ).join("\n") +
          `\n</rows>`
        );

      default: // JSON File
        return JSON.stringify(rows, null, 2);
    }
  };

  const handleExport = (format) => {
    const data = formatDataForExport(format);
    if (!data) return;

    let fileType = format === "CSV File" ? "text/csv" :
                   format === "XML File" ? "application/xml" :
                   "application/json";

    let fileExtension = format === "CSV File" ? "csv" :
                        format === "XML File" ? "xml" : "json";

    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `query_export.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Paper square sx={styles["& .MuiPaper-root"]}>
      <EditableTabs />
      <Box sx={styles.editorButtonsWrapper} display="flex">
        <Tooltip title="Run">
          <Button variant="outlined" color="secondary" size="small" sx={styles.editorButton} onClick={onRunQuery}>
            <PlayArrowRoundedIcon />
          </Button>
        </Tooltip>
        <MenuButton title="Export" menuItems={["CSV File", "XML File", "JSON File"]} onItemClick={handleExport} />
        <Tooltip title="Increase Font Size">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={styles.editorButton}
            onClick={() => {
              if (fontSize < 24) {
                setFontSize((prev) => prev + 2);
                onFontSizeChange(fontSize + 2);
              }
            }}
          >
            <FormatSizeIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Decrease Font Size">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={styles.editorButton}
            onClick={() => {
              if (fontSize > 10) {
                setFontSize((prev) => prev - 2);
                onFontSizeChange(fontSize - 2);
              }
            }}
          >
            <FormatSizeIcon style={{ transform: "rotate(180deg)" }} />
          </Button>
        </Tooltip>
        <Tooltip title="Save">
          <Button variant="outlined" color="secondary" size="small" sx={styles.editorButton} onClick={onSaveWorkspace}>
            <SaveRoundedIcon />
          </Button>
        </Tooltip>
        <MenuButton title="Import" menuItems={["CSV File", "XML File", "JSON File"]} />
      </Box>
    </Paper>
  );
};

EditorControls.propTypes = {
  onRunQuery: PropTypes.func.isRequired,
  onFontSizeChange: PropTypes.func.isRequired,
  tableData: PropTypes.object.isRequired, // Pass the query result table data
};

export default EditorControls;
