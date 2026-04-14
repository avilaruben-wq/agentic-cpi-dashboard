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

  const bg = isRunning ? theme.yellow
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
        color: isRunning ? theme.textInverse : '#fff',
        padding: `${theme.sp(2)} ${theme.sp(5)}`,
        borderRadius: theme.radius,
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.semibold,
        cursor: isRunning ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: theme.sp(2),
        transition: 'all 0.3s',
        whiteSpace: 'nowrap',
        boxShadow: isCompleted ? 'none' : theme.shadow,
      }}
    >
      {isRunning && (
        <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>⟳</span>
      )}
      {isCompleted && <span>✓</span>}
      {text}
    </button>
  );
};
