import { Button } from "@mui/material";
import useProtectedData from "auth/hooks/use-protected-data";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getSets } from "lexica/api/sets-api";
import { Set } from "lexica/models/set";
import { useState } from "react";
import "./set-details.scoped.css";

export default function SetDetails(props: { setPaths: string }) {
  const [error, setError] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const setData = useProtectedData<Set[]>(getSets, [props.setPaths], refreshKey, () => {
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
