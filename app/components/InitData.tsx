'use client';
import { useEffect } from 'react';
import { initData } from '@/lib/seed';

export default function InitData() {
  useEffect(() => {
    initData();
  }, []);
  return null;
}
