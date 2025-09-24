'use client';

import { useMemo, useState, useCallback } from 'react';

/**
 * SafeImg — <img> tolerante a espaços/acentos em caminhos locais (public/).
 * - Aceita string OU { src, alt }
 * - Tenta variações de codificação (encodeURI, %20, slugificação do arquivo) ao falhar
 * - Nunca passa src=""
 * - NÃO usa next/image (segue sua regra)
 */

function normLeadingSlash(p) {
  if (!p) return '';
  return p.startsWith('/') ? p.replace(/\/{2,}/g, '/') : ('/' + p).replace(/\/{2,}/g, '/');
}

function stripAccents(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function slugifyFilename(name) {
  if (!name) return '';
  const dot = name.lastIndexOf('.');
  const base = dot >= 0 ? name.slice(0, dot) : name;
  const ext  = dot >= 0 ? name.slice(dot) : '';
  const baseSlug = stripAccents(base)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return baseSlug + ext.toLowerCase();
}

function splitDirAndFile(path) {
  const clean = normLeadingSlash(path);
  const idx = clean.lastIndexOf('/');
  if (idx <= 0) return { dir: '/', file: clean.replace(/^\//, '') };
  return { dir: clean.slice(0, idx + 1), file: clean.slice(idx + 1) };
}

function buildCandidates(rawInput) {
  if (!rawInput) return [];

  let raw = typeof rawInput === 'string' ? rawInput : (rawInput?.src || '');
  raw = raw.trim();
  if (!raw) return [];

  if (/^(https?:)?\/\//i.test(raw) || /^data:/i.test(raw)) {
    return [raw];
  }

  const path0 = normLeadingSlash(raw);
  const { dir, file } = splitDirAndFile(path0);

  const encodedAll  = (() => { try { return encodeURI(decodeURI(path0)); } catch { return encodeURI(path0); } })();
  const encodedFile = (() => { try { return dir + encodeURIComponent(decodeURI(file)); } catch { return dir + encodeURIComponent(file); } })();
  const space20     = path0.replace(/ /g, '%20');
  const hyphenFile  = dir + slugifyFilename(file);
  const lowerFile   = dir + file.toLowerCase();
  const lowerHyphen = dir + slugifyFilename(file).toLowerCase();

  const list = [
    path0,
    encodedAll,
    encodedFile,
    space20,
    hyphenFile,
    lowerFile,
    lowerHyphen
  ]
    .map(normLeadingSlash)
    .filter(Boolean);

  return Array.from(new Set(list));
}

export default function SafeImg(props) {
  const { src, alt = '', className = '', title, draggable, style } = props;

  const candidates = useMemo(() => buildCandidates(src), [src]);
  const [idx, setIdx] = useState(0);

  const handleError = useCallback(() => {
    setIdx((i) => {
      const next = i + 1;
      if (next < candidates.length) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[SafeImg] fallback ->', candidates[next]);
        }
        return next;
      }
      return i;
    });
  }, [candidates]);

  if (!candidates.length) return null;

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      className={className}
      title={title}
      draggable={draggable}
      style={style}
      loading="lazy"
      onError={handleError}
    />
  );
}
