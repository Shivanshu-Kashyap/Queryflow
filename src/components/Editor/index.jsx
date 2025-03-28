import React, { Suspense, useState } from "react";
import Toast from "../Toast";
import useToast from "../../hooks/useToast";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import EditorControls from "./EditorControls";
import EditorLoader from "./EditorLoader";
import { Box } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { ResizableBox } from "react-resizable"; // Importing resizable box component
import "react-resizable/css/styles.css"; // Import styles for resizing

const LazyEditor = React.lazy(() => import("./LazyEditor"));

const styles = {
  editorStyles: {
    border: `1px solid rgba(0, 0, 0, 0.12)`,
    borderRight: "0",
  },
};

const QueryEditor = ({ onRunQuery }) => {
  const { currentTab, setCurrentTab, setTabs } = useAppContext();
  const [currentQuery, setCurrentQuery] = useState(currentTab.query);
  const { isToastVisible, showToast, toastType, toastMessage } = useToast();
  const [fontSize, setFontSize] = useState(16); // Default font size

  const handleRunQuery = () => {
    if (!currentQuery) {
      showToast("error", "Please Enter Query");
      return;
    }
    onRunQuery();
    showToast(
      "success",
      `Query Ran Successfully in ${Math.random().toFixed(2)}s`
    );
  };

  const handleQueryChange = (value) => {
    setCurrentQuery(value);
    const tempTab = currentTab;
    tempTab.query = value;
    setCurrentTab({ ...tempTab });
    setTabs((prevTabs) => {
      return prevTabs.map((tab) => {
        if (tab.id === currentTab.id) {
          return { ...tab, query: value };
        }
        return tab;
      });
    });
  };

  return (
    <Box>
      <EditorControls onRunQuery={handleRunQuery} onFontSizeChange={setFontSize} />
      <Suspense fallback={<EditorLoader />}>
        <ResizableBox
          width={"100%"}
          height={200} // Default height
          minConstraints={[100, 100]}
          maxConstraints={[Infinity, 600]} // Limit the maximum size
          axis="y" // Allow vertical resizing only
          resizeHandles={["s"]} // Allow resizing from the bottom
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}
        >
          <LazyEditor
  aria-label="query editor input"
  mode="mysql"
  theme="tomorrow"
  name={uuid()}
  fontSize={fontSize}
  maxLines={Infinity}
  minLines={6}
  width="100%"
  showPrintMargin={false}
  showGutter
  highlightActiveLine={false}
  placeholder={"Write Query Here ..."}
  value={currentTab.query}
  onChange={handleQueryChange}
  style={styles.editorStyles}
  showLineNumbers
  setOptions={{
    enableBasicAutocompletion: true,  // Enables basic autocomplete
    enableLiveAutocompletion: true,   // Enables live autocomplete while typing
    enableSnippets: true,             // Enables SQL snippets
    showLineNumbers: true,
    tabSize: 2,
  }}
/>
        </ResizableBox>
      </Suspense>
      <Toast show={isToastVisible} type={toastType} message={toastMessage} />
    </Box>
  );
};

QueryEditor.propTypes = {
  onRunQuery: PropTypes.func.isRequired,
};

export default QueryEditor;
