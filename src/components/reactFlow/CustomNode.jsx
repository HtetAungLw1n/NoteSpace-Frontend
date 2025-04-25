import React from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        background: "#3454c3",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        minWidth: "150px",
        textAlign: "center",
        fontWeight: "500",
      }}
    >
      {/* Top handle (for incoming connections) */}
      <Handle type="target" position={Position.Top} id="top" />

      {/* Node content */}
      {data.label}

      {/* Bottom handle (for outgoing connections) */}
      <Handle type="source" position={Position.Bottom} id="bottom" />

      {/* Right handle */}
      <Handle type="source" position={Position.Right} id="right" />

      {/* Left handle */}
      <Handle type="target" position={Position.Left} id="left" />
    </div>
  );
};

export default CustomNode;
