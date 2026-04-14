import React from 'react';
import { theme } from '../../theme';

interface ViewHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const ViewHeader: React.FC<ViewHeaderProps> = ({ title, description, action }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.sp(4),
    marginBottom: theme.sp(4),
  }}>
    <div>
      <h2 style={{
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
        color: theme.text,
        margin: 0,
        lineHeight: 1.3,
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: theme.fontSize.sm,
        color: theme.textMuted,
        margin: `${theme.sp(1)} 0 0`,
        lineHeight: 1.5,
      }}>
        {description}
      </p>
    </div>
    {action && <div>{action}</div>}
  </div>
);
