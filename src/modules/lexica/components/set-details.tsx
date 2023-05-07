import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";
import { useState } from "react";
import useProtectedData from "@app/hooks/use-protected-data";
import { getSetsContent } from "@lexica/api/sets-api";
import { Set } from "@lexica/models/set";
import { decodePaths } from "@lexica/services/paths-encoder";
import "./set-details.css";

interface ISetDetailsProps {
  setPaths: string;
}

export default function SetDetails(props: ISetDetailsProps) {
  const [error, setError] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const setData = useProtectedData<Set[]>(
    getSetsContent,
    {},
    { setPath: decodePaths(props.setPaths) },
    refreshKey,
    () => {
      setError("An unexpected error has occurred in getting sets.");
    }
  );

  const handleRefresh = () => {
    setRefreshKey((x) => x + 1);
    setError("");
  };

  return (
    <>
      <div className="set-details--buttons">
        <Button variant="text" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={setData.processing}>
          Refresh
        </Button>
      </div>
      {setData.processing ? (
        <p>Loading...</p>
      ) : (
        <>
          {error.length > 0 && <p className="set-details--error">{error}</p>}
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
