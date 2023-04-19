import React from "react";
import { resolvePath, useOutletContext, useParams } from "react-router-dom";
import AmiiboDetails from "../AmiiboDetails/AmiiboDetails";

const AmiiboDetailsDataWrapper = () => {
    const params = useParams();
    const context = useOutletContext();
    const amiiboList = context.amiiboList;
    const setAmiiboList = context.setAmiiboList;
    const setSelectedAmiiboIDs = context.setSelectedAmiiboIDs;
    const toggleSelectedAmiiboCollection = context.toggleSelectedAmiiboCollection;
    const user = context.user;
    const amiibo = amiiboList.find(curAmiibo => "" + curAmiibo.head + curAmiibo.tail == params.amiiboId);
    
    const handleCollect = async (isAdding) => {
        let newSet = new Set();

        newSet.add("" + amiibo.head + amiibo.tail);

        setAmiiboList(await toggleSelectedAmiiboCollection(newSet));
    }

    return <AmiiboDetails amiibo={amiibo} colorArray={JSON.parse(params.colorArray)} user={user} handleCollect={handleCollect}/>
}

export default AmiiboDetailsDataWrapper;