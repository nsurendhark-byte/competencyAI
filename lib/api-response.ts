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
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

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
