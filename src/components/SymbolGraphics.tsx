import React from 'react';

export const SymbolSvg = ({
  id,
  className = '',
  width = 60,
  height = 40,
  fill = '#e2e8f0',
  stroke = '#334155',
  strokeWidth = 2,
}: {
  id: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) => {
  const commonProps = {
    fill,
    stroke,
    strokeWidth,
    vectorEffect: 'non-scaling-stroke',
  };

  const getShape = () => {
    switch (id) {
      // FLOWCHART
      case 'start_end':
        return <rect x="5" y="5" width="90" height="90" rx="45" ry="45" {...commonProps} />;
      case 'process':
        return <rect x="5" y="10" width="90" height="80" {...commonProps} />;
      case 'decision':
        return <polygon points="50,5 95,50 50,95 5,50" {...commonProps} />;
      case 'io':
        return <polygon points="20,10 95,10 80,90 5,90" {...commonProps} />;
      case 'connector_in':
        return <circle cx="50" cy="50" r="30" {...commonProps} />;
      case 'connector_out':
        return <polygon points="30,10 70,10 70,60 50,90 30,60" {...commonProps} />;
      case 'document':
        return <path d="M10,10 L90,10 L90,70 Q70,90 50,70 T10,70 Z" {...commonProps} />;
      case 'stored_data':
        return <path d="M15,20 C15,10 85,10 85,20 L85,80 C85,90 15,90 15,80 Z M15,20 C15,30 85,30 85,20" {...commonProps} />;
      case 'preparation':
        return <polygon points="20,50 35,15 65,15 80,50 65,85 35,85" {...commonProps} />;
      case 'subprocess':
        return (
          <g>
            <rect x="5" y="10" width="90" height="80" {...commonProps} />
            <line x1="20" y1="10" x2="20" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="80" y1="10" x2="80" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          </g>
        );
      case 'comment':
        return <path d="M40,10 L10,10 L10,90 L40,90" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeDasharray="4 2" />;
      case 'flow':
        return (
          <g>
            <line x1="10" y1="50" x2="80" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
            <polygon points="80,40 95,50 80,60" fill={stroke} />
          </g>
        );

      // PROCESS
      case 'op':
        return <circle cx="50" cy="50" r="40" {...commonProps} />;
      case 'inspect':
        return <rect x="15" y="15" width="70" height="70" {...commonProps} />;
      case 'transport':
        return (
          <g>
            <line x1="10" y1="50" x2="70" y2="50" stroke={stroke} strokeWidth={strokeWidth * 1.5} />
            <polygon points="70,35 95,50 70,65" fill={stroke} />
          </g>
        );
      case 'delay':
        return <path d="M30,10 L50,10 C75,10 90,30 90,50 C90,70 75,90 50,90 L30,90 Z" {...commonProps} />;
      case 'storage':
        return <polygon points="10,15 90,15 50,85" {...commonProps} />;
      case 'proc_decision':
        return <polygon points="50,10 90,50 50,90 10,50" {...commonProps} />;
      case 'proc_start':
        return <rect x="10" y="25" width="80" height="50" rx="25" ry="25" {...commonProps} />;
      case 'proc_document':
        return <path d="M15,15 L85,15 L85,65 Q65,85 50,70 T15,70 Z" {...commonProps} />;
      case 'combined':
        return (
          <g>
            <rect x="15" y="15" width="70" height="70" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="50" cy="50" r="35" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
          </g>
        );

      default:
        return <rect x="10" y="10" width="80" height="80" {...commonProps} fill="#f87171" />;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {getShape()}
    </svg>
  );
};
