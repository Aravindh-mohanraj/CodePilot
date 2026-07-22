export type ExecutionStatus = 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded';

export interface TestCaseResult {
  id: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  runtime: string;
  memory: string;
  passedTests: number;
  totalTests: number;
  testCases: TestCaseResult[];
  aiFeedback: string;
  suggestions: string[];
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const FEEDBACK_MAP: Record<ExecutionStatus, string> = {
  'Accepted': 'Excellent work! Your solution passes all test cases with optimal performance. The two-pointer approach is well-implemented.',
  'Wrong Answer': 'Your solution produces incorrect output for some test cases. Check your boundary conditions and edge case handling.',
  'Runtime Error': 'Your code encountered a runtime error. Common causes include null pointer access, array index out of bounds, or stack overflow from infinite recursion.',
  'Time Limit Exceeded': 'Your solution exceeds the time limit. Consider optimizing your approach — look for O(n) or O(n log n) solutions instead of O(n²).',
};

const SUGGESTIONS_MAP: Record<ExecutionStatus, string[]> = {
  'Accepted': [
    'Consider if you can reduce space complexity further',
    'Try solving it with a different approach (stack-based)',
    'Practice similar problems: Container With Most Water, Product of Array Except Self',
  ],
  'Wrong Answer': [
    'Add edge case handling for empty input',
    'Double-check your pointer movement logic',
    'Verify the update order of max values',
    'Test with single-element and two-element arrays',
  ],
  'Runtime Error': [
    'Add null/undefined checks before accessing properties',
    'Verify array bounds before indexing',
    'Check for division by zero scenarios',
  ],
  'Time Limit Exceeded': [
    'Replace nested loops with two-pointer technique',
    'Use prefix/suffix arrays to precompute values',
    'Consider a monotonic stack approach',
  ],
};

export async function runCode(_code: string, _language: string): Promise<ExecutionResult> {
  // Reference parameters to satisfy ESLint
  if (_code && _language) {
    // no-op
  }
  await delay(1000 + Math.random() * 2000);

  const rand = Math.random();
  let status: ExecutionStatus;
  if (rand < 0.6) status = 'Accepted';
  else if (rand < 0.8) status = 'Wrong Answer';
  else if (rand < 0.9) status = 'Runtime Error';
  else status = 'Time Limit Exceeded';

  const isAccepted = status === 'Accepted';
  const totalTests = 48;
  const passedTests = isAccepted ? totalTests : Math.floor(Math.random() * 30) + 5;

  const testCases: TestCaseResult[] = [
    {
      id: 1,
      input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      expected: '6',
      actual: isAccepted ? '6' : String(Math.floor(Math.random() * 10)),
      passed: isAccepted,
    },
    {
      id: 2,
      input: 'height = [4,2,0,3,2,5]',
      expected: '9',
      actual: isAccepted ? '9' : String(Math.floor(Math.random() * 15)),
      passed: isAccepted,
    },
    {
      id: 3,
      input: 'height = []',
      expected: '0',
      actual: '0',
      passed: true,
    },
  ];

  return {
    status,
    runtime: `${Math.floor(Math.random() * 80 + 20)}ms`,
    memory: `${(Math.random() * 5 + 14).toFixed(1)}MB`,
    passedTests,
    totalTests,
    testCases,
    aiFeedback: FEEDBACK_MAP[status],
    suggestions: SUGGESTIONS_MAP[status],
  };
}

export async function submitCode(_code: string, _language: string): Promise<ExecutionResult> {
  // Reference parameters to satisfy ESLint
  if (_code && _language) {
    // no-op
  }
  await delay(2000 + Math.random() * 1000);

  return {
    status: 'Accepted',
    runtime: `${Math.floor(Math.random() * 40 + 30)}ms`,
    memory: `${(Math.random() * 3 + 14).toFixed(1)}MB`,
    passedTests: 48,
    totalTests: 48,
    testCases: [
      { id: 1, input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', actual: '6', passed: true },
      { id: 2, input: 'height = [4,2,0,3,2,5]', expected: '9', actual: '9', passed: true },
      { id: 3, input: 'height = []', expected: '0', actual: '0', passed: true },
    ],
    aiFeedback: 'Congratulations! Your solution is accepted. It demonstrates strong understanding of the two-pointer technique with optimal O(n) time complexity.',
    suggestions: [
      'Great job! Try similar problems like Container With Most Water',
      'Challenge yourself with the stack-based approach',
      'Explore related patterns in sliding window problems',
    ],
  };
}
