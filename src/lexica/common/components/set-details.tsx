import { Button } from "@mui/material";
import useProtectedData from "app/hooks/use-protected-data";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getSetsContent } from "lexica/common/api/sets-api";
import { Set } from "lexica/common/models/set";
import { useState } from "react";
import "./set-details.scoped.css";

interface ISetDetailsProps {
  setPaths: string;
}

export default function SetDetails(props: ISetDetailsProps) {
  const [error, setError] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const setData = useProtectedData<Set[]>(getSetsContent, { paths: props.setPaths }, refreshKey, () => {
    setError("An unexpected error has occurred in getting sets.");
  });

  const handleRefresh = () => {
    setRefreshKey((x) => x + 1);
    setError("");
  };

  return (
    <>
      <div className="buttons">
        <Button variant="text" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={setData.processing}>
          Refresh
        </Button>
      </div>
      {setData.processing ? (
        <p>Loading...</p>
      ) : (
        <>
          {error.length > 0 && <p className="error">{error}</p>}
          {setData?.data !== null && (
            <pre>
              {setData.data.map((set) =>
                set.entries.map((entry, index) => (
                  <p key={index}>
                    {entry.words.join(", ")} - {entry.translations.join(", ")}
                  </p>
                ))
              )}
            </pre>
          )}
        </>
      )}
    </>
  );
}
