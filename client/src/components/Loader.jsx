import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

const Loader = ({ loading }) => {
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    if (fetching) {
      setTimeout(() => {
        setFetching(false);
      }, [2000]);
    }
  }, [fetching]);
  return (
    loading && (
      <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex flex-col items-center">
          <LoaderCircle className="animate-spin" />
          {fetching ? <p>Fetching Records</p> : <p>Generating Insights</p>}
        </div>
      </div>
    )
  );
};

export default Loader;
