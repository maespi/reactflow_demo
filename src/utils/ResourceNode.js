import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable, sourcePosition }) => {
    return (
        <>
            <Handle
                type="source"
                position={sourcePosition}
                id="b"
                isConnectable={isConnectable}
            />
            {data.label && <div className="label-wrapper">{data.label}</div>}
        </>
    );
});