import useProtectedData from "auth/hooks/use-protected-data";
import { getSets } from "lexica/api/sets-api";
import { Set } from "lexica/models/set";

export default function SetDetails(props: { setPath: string }) {
  const setData = useProtectedData<Set>(getSets, [props.setPath]);

  console.log(setData);

  return (
    <>
      {setData.processing && <p>Loading...</p>}
      <pre>
        {!setData.processing &&
          setData?.data !== null &&
          setData.data.entries.map((entry, index) => (
            <p key={index}>
              {entry.words.join(", ")} - {entry.translations.join(", ")}
            </p>
          ))}
      </pre>
    </>
  );
}
