import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import AmiiboDetails from "../AmiiboDetails/AmiiboDetails";

const AmiiboDetailsDataWrapper = () => {
    const params = useParams();
    const amiiboList = useOutletContext();
    const amiibo = amiiboList.find(curAmiibo => "" + curAmiibo.head + curAmiibo.tail == params.amiiboId);

    return <AmiiboDetails amiibo={amiibo} colorArray={JSON.parse(params.colorArray)}/>
}

export default AmiiboDetailsDataWrapper;