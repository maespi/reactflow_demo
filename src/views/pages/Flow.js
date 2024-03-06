import React, { useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, MarkerType,
} from 'reactflow';

import 'reactflow/dist/style.css';
import "../CSS/nodesStyles.css";
import ResourceNode from "../../utils/ResourceNode";
const nodeTypes = {
    "resource": ResourceNode
};

const fileData = {
    "name": "health-care-uc",
    "functions": [
        {
            "name": "data-parsing",
            "class_specification_id": "data-parser",
            "class_specification_version": "0.1",
            "output_mapping": {
                "next-step": "ml-preprocessing"
            },
            "annotations": {}
        },
        {
            "name": "ml-preprocessing",
            "class_specification_id": "ml-preprocessor",
            "class_specification_version": "0.1",
            "output_mapping": {
                "next-step": "state-management"
            },
            "annotations": {}
        },
        {
            "name": "state-management",
            "class_specification_id": "state-manager",
            "class_specification_version": "0.1",
            "output_mapping": {
                "next-step": "http-egress"
            },
            "annotations": {}
        }
    ],
    "resources": [
        {
            "name": "http-ingress",
            "class_type": "http-ingress",
            "output_mapping": {
                "new_request": "data-parsing"
            },
            "configurations": {
                "host": "localhost",
                "methods": "POST"
            }
        },
        {
            "name": "http-egress",
            "class_type": "http-egress",
            "output_mapping": {},
            "configurations": {}
        }
    ],
    "annotations": {}
};

const initialNodes = [], initialEdges = [];
let i = 2, e_n = 0,o_n = 0, space = 100;

//Node and edge extraction from main data. Divide between functions(nodes) and resources(EntryPoints )
fileData.functions.forEach(f => {
    let newNode={
        id: f.name,
        position: { x: 2*space, y: i*space },
        data: { label: f.name }
    };

    let newEdge={
        id: "e_"+f.name+"-"+f.output_mapping["next-step"],
        source: f.name,
        target: f.output_mapping["next-step"],
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#000000'
        },
        style: {
            strokeWidth: 2,
            stroke: '#000000',
        }
    };

    initialNodes.push(newNode);
    initialEdges.push(newEdge);
    i++;
});
fileData.resources.forEach(r => {

    let newNode={
        id: r.name,
        position: {},
        data: { label: r.name }
    };

    if (r.output_mapping["new_request"]){
        newNode.position = {x: 0, y: e_n*space};
        e_n++;
    }else{
        newNode.position = {x: 4*space, y: i*space + o_n*space};
        o_n++;
    }

    let newEdge={
        id: "e_"+r.name+"-"+r.output_mapping["new_request"],
        source: r.name,
        target: r.output_mapping["new_request"],
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#ff0000'
        },
        style: {
            strokeWidth: 2,
            stroke: '#ff0000',
        }
    };

    initialNodes.push(newNode);
    initialEdges.push(newEdge);
    i++;
});

const onClickNode = (event, nodeClicked) => console.log(nodeClicked); //Function to execute on node click
function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onClickNode}
                nodeTypes={nodeTypes}
            >
                <Controls/>
                <MiniMap/>
                <Background variant="dots" gap={12} size={1}/>
            </ReactFlow>
        </div>
    );
}

export default Flow;