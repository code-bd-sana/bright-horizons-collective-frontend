'use client';

import { useEffect } from 'react';

export function ClearInvalidSession() {
  useEffect(() => {
    void fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
  }, []);

  return null;
}
