import { useCallback } from "react";

import "./App.css";
import {
  tableFilters,
  Anchor,
  Table,
  ThemeProvider,
} from "@itwin/itwinui-react";
import { CellProps } from "@itwin/itwinui-react/react-table";
import React from "react";

export const LazyLoading = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>
  ) => console.log(props.row.original.name);

  const columns = React.useMemo(
    () => [
      {
        id: "name",
        Header: "Name",
        accessor: "name",
        Filter: tableFilters.TextFilter(),
      },
      {
        id: "description",
        Header: "Description",
        accessor: "description",
        maxWidth: 200,
      },
      {
        id: "click-me",
        Header: "Click",
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as="button" onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    []
  );

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => ({
        name: `Name${start + index}`,
        description: `Description${start + index}`,
      }));
  };

  const [data, setData] = React.useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = React.useState(false);

  const onBottomReached = useCallback(() => {
    console.log("Bottom reached!");
    setIsLoading(true);
    // Simulating request
    setTimeout(() => {
      setData(() => [...data, ...generateData(data.length, data.length + 100)]);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  return (
    <Table
      // enableVirtualization // seems to work even worse with virtualization enabled
      columns={columns}
      emptyTableContent="No data."
      onBottomReached={onBottomReached}
      isLoading={isLoading}
      isSortable
      style={{ height: 440, maxHeight: "90vh" }}
      data={data}
      // Prevents from resetting filters and sorting when more data is loaded
      autoResetFilters={false}
      autoResetSortBy={false}
    />
  );
};

function App() {
  return (
    <ThemeProvider>
      <LazyLoading />
    </ThemeProvider>
  );
}

export default App;
