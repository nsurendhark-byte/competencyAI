import { NextResponse } from 'next/server';

export interface ApiResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export function jsonSuccess(data: any = {}, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      ...(message ? { message } : {}),
      ...(typeof data === 'object' && data !== null && !Array.isArray(data) ? data : { data })
    },
    { status }
  );
}

export function jsonError(error: string, status: number = 400, extra: any = {}) {
  return NextResponse.json(
    {
      success: false,
      error,
      message: error,
      ...extra
    },
    { status }
  );
}

/**
 * Safe fetch helper for client components that guarantees JSON parsing and prevents HTML syntax errors.
 */
export async function safeFetch(url: string, options?: RequestInit) {
  try {
    let fetchUrl = url;
    if (typeof window !== 'undefined' && url.startsWith('/api/')) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/competencyAI';
      if (window.location.pathname.startsWith(basePath) && !url.startsWith(basePath)) {
        fetchUrl = `${basePath}${url}`;
      }
    }

    let res = await fetch(fetchUrl, options);
    let contentType = res.headers.get('content-type') || '';

    // If initial fetch with basePath failed with 404/405, attempt fallback to un-prefixed URL or vice versa
    if ((!res.ok || !contentType.includes('application/json')) && fetchUrl !== url) {
      try {
        const fallbackRes = await fetch(url, options);
        const fallbackType = fallbackRes.headers.get('content-type') || '';
        if (fallbackRes.ok && fallbackType.includes('application/json')) {
          res = fallbackRes;
          contentType = fallbackType;
        }
      } catch (e) {}
    } else if ((!res.ok || !contentType.includes('application/json')) && fetchUrl === url && url.startsWith('/api/')) {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/competencyAI';
        const prefixedUrl = `${basePath}${url}`;
        const fallbackRes = await fetch(prefixedUrl, options);
        const fallbackType = fallbackRes.headers.get('content-type') || '';
        if (fallbackRes.ok && fallbackType.includes('application/json')) {
          res = fallbackRes;
          contentType = fallbackType;
        }
      } catch (e) {}
    }

    if (!contentType.includes('application/json')) {
      const text = await res.text();
      return {
        ok: false,
        status: res.status,
        data: {
          success: false,
          error: `Server returned non-JSON response (${res.status})`,
          rawResponse: text.substring(0, 100)
        }
      };
    }

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      data
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      data: {
        success: false,
        error: err.message || 'Network fetch failed'
      }
    };
  }
}
