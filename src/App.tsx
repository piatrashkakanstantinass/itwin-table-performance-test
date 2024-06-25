import { useCallback, useState } from "react";

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
      {
        id: "test1",
        Header: "test1",
        accessor: "test1",
      },
      {
        id: "test2",
        Header: "test2",
        accessor: "test2",
      },
      {
        id: "test3",
        Header: "test3",
        accessor: "test3",
      },
      {
        id: "test4",
        Header: "test4",
        accessor: "test4",
      },
      {
        id: "test5",
        Header: "test5",
        accessor: "test5",
      },
      {
        id: "test6",
        Header: "test6",
        accessor: "test6",
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
        test1: "test",
        test2: "test",
        test3: "test",
        test4: "test",
        test5: "test",
        test6: "test",
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

  const [virtualized] = useState(true);

  // useEffect(() => {
  //   if (virtualized) return;
  //   const callback = () => setVirtualized(true);
  //   const timeoutId = setTimeout(callback, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [virtualized]);

  return (
    <>
      {/* <Button onClick={() => setVirtualized((v) => !v)}>
        {virtualized ? "Disable" : "Enable"} virtualization
      </Button> */}
      <Table
        enableVirtualization={virtualized}
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
    </>
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
