import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import AmiiboDetails from "../AmiiboDetails";

const AmiiboDetailsDataWrapper = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { amiiboList, setAmiiboList, toggleSelectedAmiiboCollection, user } =
    useOutletContext();
  const amiibo = amiiboList.find(
    (curAmiibo) => "" + curAmiibo.head + curAmiibo.tail == params.amiiboId,
  );

  const handleCollect = async () => {
    const newSet = new Set();

    newSet.add("" + amiibo.head + amiibo.tail);

    setAmiiboList(await toggleSelectedAmiiboCollection(newSet));
  };

  return (
    <AmiiboDetails
      amiibo={amiibo}
      colorArray={JSON.parse(searchParams.get("colorArray"))}
      user={user}
      handleCollect={handleCollect}
    />
  );
};

export default AmiiboDetailsDataWrapper;
