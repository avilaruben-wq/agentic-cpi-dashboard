import React, { useState, useCallback } from 'react';
import { theme } from '../../theme';

interface RunButtonProps {
  label: string;
  runningLabel: string;
  completedLabel: string;
  isCompleted: boolean;
  onRun: () => void;
  duration?: number;
}

export const RunButton: React.FC<RunButtonProps> = ({
  label, runningLabel, completedLabel, isCompleted, onRun, duration = 2500,
}) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = useCallback(() => {
    if (isRunning || isCompleted) return;
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      onRun();
    }, duration);
  }, [isRunning, isCompleted, onRun, duration]);

  const bg = isRunning ? theme.primary
    : isCompleted ? theme.green
    : theme.primary;

  const text = isRunning ? runningLabel
    : isCompleted ? completedLabel
    : label;

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      style={{
        background: bg,
        border: 'none',
        color: '#fff',
        padding: `${theme.sp(2)} ${theme.sp(4)}`,
        borderRadius: theme.radius,
        fontSize: theme.fontSize.base,
        fontWeight: theme.fontWeight.regular,
        cursor: isRunning ? 'wait' : isCompleted ? 'default' : 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: theme.sp(2),
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        height: '32px',
      }}
    >
      {isRunning && (
        <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>...</span>
      )}
      {isCompleted && <span>✓</span>}
      {text}
    </button>
  );
};
