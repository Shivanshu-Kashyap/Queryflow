import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import EditableTabs from "../EditableTabs";
import MenuButton from "../MenuButton";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import FormatSizeIcon from "@mui/icons-material/FormatSize"; // Font size adjustment icon
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

const EditorControls = ({ onRunQuery, onFontSizeChange }) => {
  const navigate = useNavigate();
  const {
    setWorkspaces,
    tabs,
    currentWorkspace,
    setCurrentWorkspace,
    setTabs,
  } = useAppContext();
  
  const [fontSize, setFontSize] = useState(16); // Default font size

  const onSaveWorkspace = () => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === currentWorkspace) {
          return { ...workspace, tabs: tabs };
        }
        return workspace;
      });
    });
    setTabs([]);
    setCurrentWorkspace("");
    navigate("/");
  };

  const handleExport = (format) => {
    let fileType = "";
    let fileExtension = "";

    switch (format) {
      case "CSV File":
        fileType = "text/csv";
        fileExtension = "csv";
        break;
      case "XML File":
        fileType = "application/xml";
        fileExtension = "xml";
        break;
      default:
        fileType = "application/json";
        fileExtension = "json";
    }

    const data = JSON.stringify(tabs, null, 2);
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={styles.editorButton}
            onClick={onRunQuery}
          >
            <PlayArrowRoundedIcon />
          </Button>
        </Tooltip>
        <MenuButton
          title="Export"
          menuItems={["CSV File", "XML File", "JSON File"]}
          onItemClick={(format) => handleExport(format)}
        />
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={styles.editorButton}
            onClick={onSaveWorkspace}
          >
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
};

export default EditorControls;
