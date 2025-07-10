'use client';                
import { ReactFlowProvider } from 'reactflow';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './Toast';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReactFlowProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ReactFlowProvider>
    </SessionProvider>
  );
}
