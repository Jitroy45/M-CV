
import React, { useState, useEffect, useRef } from 'react';

interface SectionConnectorProps {
  sectionIds: string[];
  activeSectionId: string | null;
}

interface LineCoordinate {
  x1: number; y1: number;
  x2: number; y2: number;
  key: string;
  isActivePath: boolean; // To determine if this line is part of the active path
  isSourceActive: boolean; // From active section
  isTargetActive: boolean; // To active section
}

const SectionConnector: React.FC<SectionConnectorProps> = ({ sectionIds, activeSectionId }) => {
  const [lines, setLines] = useState<LineCoordinate[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const calculateLines = () => {
      const newLines: LineCoordinate[] = [];
      if (sectionIds.length < 2 || !svgRef.current) return;

      const svgRect = svgRef.current.getBoundingClientRect();

      for (let i = 0; i < sectionIds.length - 1; i++) {
        const elem1Id = sectionIds[i];
        const elem2Id = sectionIds[i + 1];
        const elem1 = document.getElementById(elem1Id);
        const elem2 = document.getElementById(elem2Id);

        if (elem1 && elem2) {
          const rect1 = elem1.getBoundingClientRect();
          const rect2 = elem2.getBoundingClientRect();
          
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

          const x1 = rect1.left + rect1.width / 2 + scrollLeft - svgRect.left;
          const y1 = rect1.bottom + scrollTop - svgRect.top;
          const x2 = rect2.left + rect2.width / 2 + scrollLeft - svgRect.left;
          const y2 = rect2.top + scrollTop - svgRect.top;
          
          const yOffset = 8; // Increased offset for visual clearance

          const isSourceActive = activeSectionId === elem1Id;
          const isTargetActive = activeSectionId === elem2Id;
          // A line is part of active path if it connects to or from the active section
          const isActivePath = isSourceActive || isTargetActive;


          newLines.push({
            x1,
            y1: y1 - yOffset,
            x2,
            y2: y2 + yOffset,
            key: `line-${elem1Id}-${elem2Id}`,
            isActivePath,
            isSourceActive,
            isTargetActive,
          });
        }
      }
      setLines(newLines);
    };

    const updateDimensionsAndLines = () => {
      setSvgHeight(document.documentElement.scrollHeight);
      calculateLines();
    };
    
    let rafId: number;
    const handleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDimensionsAndLines);
    };

    const initialTimeout = setTimeout(handleUpdate, 200); // Slightly longer delay

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    
    // Re-calculate if activeSectionId changes to update line styles
    handleUpdate();


    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds, activeSectionId]); // Rerun effect if activeSectionId changes

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${svgHeight}px`,
        zIndex: 0, // Behind sections (z-10), above background (z--10)
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <defs>
        <marker
          id="arrowhead-active"
          markerWidth="6" markerHeight="4.2" refX="0" refY="2.1" orient="auto"
        >
          <polygon points="0 0, 6 2.1, 0 4.2" fill="rgba(100, 255, 150, 0.9)" />
        </marker>
        <marker
          id="arrowhead-inactive"
          markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto"
        >
          <polygon points="0 0, 5 1.75, 0 3.5" fill="rgba(0, 255, 80, 0.4)" />
        </marker>
      </defs>
      {lines.map(line => {
        const strokeColor = line.isActivePath ? 'rgba(100, 255, 150, 0.7)' : 'rgba(0, 255, 80, 0.3)';
        const strokeWidth = line.isActivePath ? '2' : '1.5';
        const nodeFillActive = 'rgba(100, 255, 150, 0.9)';
        const nodeFillInactive = 'rgba(50, 255, 100, 0.5)';
        const outerNodeFillActive = 'rgba(100, 255, 150, 0.25)';
        const outerNodeFillInactive = 'rgba(0, 255, 80, 0.15)';
        const marker = line.isActivePath ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)";

        return (
          <g key={line.key} className="connector-group">
            <line
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              markerEnd={line.y2 > line.y1 + 20 ? marker : undefined}
              style={{ transition: 'stroke 0.5s ease, stroke-width 0.5s ease' }}
              // Add stroke-dasharray animation here if desired for drawing effect
            />
            {/* Node at start */}
            <circle cx={line.x1} cy={line.y1} r="5" fill={line.isSourceActive ? outerNodeFillActive : outerNodeFillInactive} className={line.isSourceActive ? 'node-pulse' : ''} />
            <circle cx={line.x1} cy={line.y1} r="2.5" fill={line.isSourceActive ? nodeFillActive : nodeFillInactive} stroke={line.isSourceActive ? nodeFillActive : 'rgba(100,255,150,0.6)'} strokeWidth="0.5" />
            
            {/* Node at end */}
            <circle cx={line.x2} cy={line.y2} r="5" fill={line.isTargetActive ? outerNodeFillActive : outerNodeFillInactive} className={line.isTargetActive ? 'node-pulse' : ''}/>
            <circle cx={line.x2} cy={line.y2} r="2.5" fill={line.isTargetActive ? nodeFillActive : nodeFillInactive} stroke={line.isTargetActive ? nodeFillActive : 'rgba(100,255,150,0.6)'} strokeWidth="0.5" />
          </g>
        );
      })}
    </svg>
  );
};

export default SectionConnector;
