import vm from 'vm';

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  status: 'PASSED' | 'FAILED' | 'RUNTIME_ERROR' | 'TIMEOUT';
  testsPassed: number;
  totalTests: number;
  logs: string[];
  testResults: Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    error?: string;
  }>;
  executionTimeMs: number;
}

export function executeUserCode(code: string, testCases: TestCase[]): ExecutionResult {
  const logs: string[] = [];
  const results: ExecutionResult['testResults'] = [];
  let passedCount = 0;
  const startTime = Date.now();

  for (const tc of testCases) {
    let actualOutput = '';
    let isPassed = false;
    let errorMsg: string | undefined = undefined;

    try {
      // Create isolated sandbox context with safe globals
      const sandbox = {
        console: {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
        },
        setTimeout: () => { throw new Error('Async timers disabled in sandbox execution.'); },
        setInterval: () => { throw new Error('Intervals disabled in sandbox execution.'); }
      };

      const context = vm.createContext(sandbox);

      // Wrap code with invocation
      const wrappedScript = `
        ${code}
        
        // Execute harness
        (function() {
          const result = ${tc.input ? `twoSum(${tc.input})` : 'twoSum([])'};
          return JSON.stringify(result);
        })()
      `;

      const script = new vm.Script(wrappedScript);
      const evalResult = script.runInContext(context, { timeout: 2000 }); // 2 sec strict timeout

      actualOutput = String(evalResult);
      
      // Clean quotes/spaces comparison
      const normalize = (str: string) => str.replace(/\s+/g, '').replace(/'/g, '"');
      isPassed = normalize(actualOutput) === normalize(tc.expectedOutput);

      if (isPassed) passedCount++;
    } catch (err: any) {
      if (err.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
        return {
          status: 'TIMEOUT',
          testsPassed: passedCount,
          totalTests: testCases.length,
          logs: [...logs, 'Execution timed out after 2000ms limit.'],
          testResults: results,
          executionTimeMs: Date.now() - startTime
        };
      }
      errorMsg = err.message || String(err);
      actualOutput = `Error: ${errorMsg}`;
    }

    results.push({
      input: tc.input,
      expected: tc.expectedOutput,
      actual: actualOutput,
      passed: isPassed,
      error: errorMsg
    });
  }

  const executionTimeMs = Date.now() - startTime;
  const overallStatus = passedCount === testCases.length ? 'PASSED' : 'FAILED';

  return {
    status: overallStatus,
    testsPassed: passedCount,
    totalTests: testCases.length,
    logs,
    testResults: results,
    executionTimeMs
  };
}
