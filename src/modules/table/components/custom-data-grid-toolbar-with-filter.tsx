import { GridToolbarContainer } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar-with-filter.css";

interface ICustomDataGridToolbarWithFilterProps {
  buttons: JSX.Element;
}

export default function CustomDataGridToolbarWithFilter(props: ICustomDataGridToolbarWithFilterProps) {
  return <GridToolbarContainer className="grid-toolbar">{props.buttons}</GridToolbarContainer>;
}
