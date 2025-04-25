import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SummaryContent = ({ summaryContent }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!summaryContent) return null;

  return (
    <div className="mt-4 pb-28">
      <div className="flex items-center justify-between mb-6">
        <div className="text-neutral-400 text-sm">Updated 2m ago</div>
      </div>

      {/* Main Summary */}
      {summaryContent.summary && (
        <div className="mb-8">
          <p className="text-neutral-300 leading-relaxed">
            {summaryContent.summary}
          </p>
        </div>
      )}

      {/* Main Points */}
      {summaryContent.points.length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-4">
            Summarized Main Points:
          </h4>
          <ul className="space-y-3">
            {summaryContent.points.map((point, index) => (
              <li
                key={index}
                className="flex items-start text-neutral-300 leading-relaxed"
              >
                <span className="text-primary mr-3">-</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-tertiary to-transparent pt-20">
        <button
          onClick={() => navigate(`/notes/${id}/graph`)}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Show With Graph
        </button>
      </div>
    </div>
  );
};

export default SummaryContent;
