'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollTop(){
  const path = usePathname();
  useEffect(()=>{ window.scrollTo(0,0); }, [path]);
  return null;
}
