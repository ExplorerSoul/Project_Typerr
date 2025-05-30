const codeSnippets = {
    javascript: {
        easy: [
            "function greet() {\n  console.log('Hello world');\n}",
            "const sum = (a, b) => a + b;",
            "function isEven(num) {\n  return num % 2 === 0;\n}",
            "const colors = ['red', 'green', 'blue'];\ncolors.forEach(color => console.log(color));",
            "const person = {\n  name: 'John',\n  age: 30,\n  greet() {\n    console.log(`Hello, my name is ${this.name}`);\n  }\n};"
        ],
        medium: [
            "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
            "const debounce = (func, delay) => {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), delay);\n  };\n};",
            "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  const copy = Array.isArray(obj) ? [] : {};\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      copy[key] = deepClone(obj[key]);\n    }\n  }\n  return copy;\n}",
            "class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(item) {\n    this.items.push(item);\n  }\n  pop() {\n    return this.items.pop();\n  }\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}",
            "async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error('Network response failed');\n    return await response.json();\n  } catch (error) {\n    console.error('Fetch error:', error);\n  }\n}"
        ],
        hard: [
            "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) {\n      result.push(left[i]);\n      i++;\n    } else {\n      result.push(right[j]);\n      j++;\n    }\n  }\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}",
            "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n    this.cache.set(key, value);\n  }\n}",
            "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return curried.apply(this, args.concat(args2));\n      };\n    }\n  };\n}",
            "const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n};",
            "function throttle(func, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}"
        ],
        expert: [
            "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(listener);\n    return () => this.off(event, listener);\n  }\n  off(event, listener) {\n    if (!this.events[event]) return;\n    this.events[event] = this.events[event].filter(l => l !== listener);\n  }\n  emit(event, ...args) {\n    if (!this.events[event]) return;\n    this.events[event].forEach(listener => listener.apply(this, args));\n  }\n  once(event, listener) {\n    const remove = this.on(event, (...args) => {\n      remove();\n      listener.apply(this, args);\n    });\n  }\n}",
            "async function promiseAllSettled(promises) {\n  return Promise.all(\n    promises.map(promise => \n      promise\n        .then(value => ({ status: 'fulfilled', value }))\n        .catch(reason => ({ status: 'rejected', reason }))\n    )\n  );\n}",
            "function createVirtualDOM(type, props, ...children) {\n  return {\n    type,\n    props: props || {},\n    children: children.flat().filter(child => child != null && child !== false),\n  };\n}\n\nfunction renderDOM(vdom, container) {\n  if (typeof vdom === 'string' || typeof vdom === 'number') {\n    container.appendChild(document.createTextNode(vdom));\n    return;\n  }\n\n  const element = document.createElement(vdom.type);\n  Object.entries(vdom.props).forEach(([name, value]) => {\n    if (name.startsWith('on') && typeof value === 'function') {\n      element.addEventListener(name.toLowerCase().substring(2), value);\n    } else {\n      element.setAttribute(name, value);\n    }\n  });\n\n  vdom.children.forEach(child => renderDOM(child, element));\n  container.appendChild(element);\n}",
            "function composeMiddleware(middlewares) {\n  return function(context, next) {\n    let index = -1;\n    function dispatch(i) {\n      if (i <= index) return Promise.reject(new Error('next() called multiple times'));\n      index = i;\n      let fn = middlewares[i] || next;\n      if (!fn) return Promise.resolve();\n      try {\n        return Promise.resolve(fn(context, function next() {\n          return dispatch(i + 1);\n        }));\n      } catch (err) {\n        return Promise.reject(err);\n      }\n    }\n    return dispatch(0);\n  };\n}",
            "class ObservableSubject {\n  constructor(initialValue) {\n    this.observers = [];\n    this._value = initialValue;\n  }\n\n  get value() {\n    return this._value;\n  }\n\n  set value(val) {\n    this._value = val;\n    this.observers.forEach(observer => observer(val));\n  }\n\n  subscribe(observer) {\n    this.observers.push(observer);\n    observer(this._value);\n    return {\n      unsubscribe: () => {\n        this.observers = this.observers.filter(obs => obs !== observer);\n      }\n    };\n  }\n}"
        ]
    },
    python: {
        easy: [
            "def greet():\n    print('Hello world')",
            "def is_even(num):\n    return num % 2 == 0",
            "def square(x):\n    return x * x",
            "colors = ['red', 'green', 'blue']\nfor color in colors:\n    print(color)",
            "person = {\n    'name': 'John',\n    'age': 30\n}\nfor key, value in person.items():\n    print(f'{key}: {value}')"
        ],
        medium: [
            "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
            "import functools\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper",
            "class Stack:\n    def __init__(self):\n        self.items = []\n    \n    def push(self, item):\n        self.items.append(item)\n    \n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n    \n    def peek(self):\n        if not self.is_empty():\n            return self.items[-1]\n    \n    def is_empty(self):\n        return len(self.items) == 0",
            "import json\nimport requests\n\ndef fetch_data(url):\n    try:\n        response = requests.get(url)\n        response.raise_for_status()\n        return response.json()\n    except requests.exceptions.RequestException as e:\n        print(f'Error fetching data: {e}')\n        return None",
            "def deep_flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(deep_flatten(item))\n        else:\n            result.append(item)\n    return result"
        ],
        hard: [
            "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    \n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
            "class LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = {}\n        self.order = []\n        \n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        \n        self.order.remove(key)\n        self.order.append(key)\n        return self.cache[key]\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self.order.remove(key)\n        elif len(self.cache) >= self.capacity:\n            oldest = self.order.pop(0)\n            del self.cache[oldest]\n        \n        self.cache[key] = value\n        self.order.append(key)",
            "def is_valid_sudoku(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    \n    for i in range(9):\n        for j in range(9):\n            if board[i][j] == '.':\n                continue\n                \n            num = board[i][j]\n            box_idx = (i // 3) * 3 + j // 3\n            \n            if (num in rows[i] or \n                num in cols[j] or \n                num in boxes[box_idx]):\n                return False\n            \n            rows[i].add(num)\n            cols[j].add(num)\n            boxes[box_idx].add(num)\n    \n    return True",
            "import threading\nimport time\n\nclass RateLimiter:\n    def __init__(self, max_calls, time_frame):\n        self.max_calls = max_calls\n        self.time_frame = time_frame\n        self.calls = []\n        self.lock = threading.Lock()\n    \n    def try_acquire(self):\n        with self.lock:\n            now = time.time()\n            # Remove expired timestamps\n            self.calls = [t for t in self.calls if now - t < self.time_frame]\n            \n            if len(self.calls) < self.max_calls:\n                self.calls.append(now)\n                return True\n            return False",
            "import asyncio\n\nasync def gather_with_concurrency(n, *tasks):\n    semaphore = asyncio.Semaphore(n)\n    \n    async def sem_task(task):\n        async with semaphore:\n            return await task\n    \n    return await asyncio.gather(*(sem_task(task) for task in tasks))"
        ],
        expert: [
            "import inspect\nfrom functools import wraps\n\ndef enforce_types(func):\n    sig = inspect.signature(func)\n    parameters = sig.parameters\n    \n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        bound_arguments = sig.bind(*args, **kwargs)\n        for name, value in bound_arguments.arguments.items():\n            if name in parameters:\n                param = parameters[name]\n                if param.annotation != inspect.Parameter.empty:\n                    if not isinstance(value, param.annotation):\n                        raise TypeError(f'Argument {name} must be {param.annotation.__name__}')\n        \n        result = func(*args, **kwargs)\n        if sig.return_annotation != inspect.Signature.empty:\n            if not isinstance(result, sig.return_annotation):\n                raise TypeError(f'Return value must be {sig.return_annotation.__name__}')\n        \n        return result\n    \n    return wrapper",
            "class MetaSingleton(type):\n    _instances = {}\n    \n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super(MetaSingleton, cls).__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=MetaSingleton):\n    def __init__(self, connection_string):\n        self.connection_string = connection_string\n        self.connected = False\n    \n    def connect(self):\n        if not self.connected:\n            print(f'Connecting to database using {self.connection_string}')\n            self.connected = True\n        return self.connected",
            "import asyncio\nimport time\nfrom typing import Dict, List, Set, Callable, Any, Awaitable\n\nclass EventBus:\n    def __init__(self):\n        self.subscribers: Dict[str, List[Callable[[Any], Awaitable[None]]]] = {}\n        self.history: Dict[str, List[Any]] = {}\n        self._active_subscriptions: Set[int] = set()\n        self._subscription_id = 0\n    \n    async def publish(self, event_type: str, data: Any) -> None:\n        if event_type not in self.history:\n            self.history[event_type] = []\n        self.history[event_type].append(data)\n        \n        if event_type in self.subscribers:\n            await asyncio.gather(*[handler(data) for handler in self.subscribers[event_type]])\n    \n    def subscribe(self, event_type: str, handler: Callable[[Any], Awaitable[None]]) -> int:\n        if event_type not in self.subscribers:\n            self.subscribers[event_type] = []\n        \n        self._subscription_id += 1\n        subscription_id = self._subscription_id\n        self._active_subscriptions.add(subscription_id)\n        self.subscribers[event_type].append(handler)\n        \n        return subscription_id\n    \n    def unsubscribe(self, subscription_id: int) -> bool:\n        if subscription_id not in self._active_subscriptions:\n            return False\n        \n        self._active_subscriptions.remove(subscription_id)\n        # Actual cleanup would be more complex\n        return True",
            "import inspect\nfrom typing import Any, Dict, List, Optional, Type, TypeVar\n\nT = TypeVar('T')\n\nclass DependencyInjector:\n    def __init__(self):\n        self._dependencies: Dict[Type, Any] = {}\n    \n    def register(self, interface: Type[T], implementation: T) -> None:\n        self._dependencies[interface] = implementation\n    \n    def resolve(self, cls: Type[T]) -> T:\n        if cls in self._dependencies:\n            return self._dependencies[cls]\n        \n        # Try to create instance\n        init_signature = inspect.signature(cls.__init__)\n        init_params = init_signature.parameters\n        \n        # Skip 'self' parameter\n        dependencies = {}\n        for name, param in list(init_params.items())[1:]:\n            if param.annotation == inspect.Parameter.empty:\n                raise ValueError(f'Missing type annotation for parameter {name} in {cls.__name__}')\n            \n            dependency = self.resolve(param.annotation)\n            dependencies[name] = dependency\n        \n        instance = cls(**dependencies)\n        return instance",
            "from typing import Dict, List, Optional, Set, Tuple\n\nclass Graph:\n    def __init__(self):\n        self.adjacency_list: Dict[str, List[Tuple[str, float]]] = {}\n    \n    def add_node(self, node: str) -> None:\n        if node not in self.adjacency_list:\n            self.adjacency_list[node] = []\n    \n    def add_edge(self, source: str, target: str, weight: float = 1.0) -> None:\n        self.add_node(source)\n        self.add_node(target)\n        self.adjacency_list[source].append((target, weight))\n    \n    def dijkstra(self, start: str) -> Dict[str, float]:\n        if start not in self.adjacency_list:\n            raise ValueError(f'Start node {start} not in graph')\n        \n        distances: Dict[str, float] = {node: float('infinity') for node in self.adjacency_list}\n        distances[start] = 0\n        unvisited: Set[str] = set(self.adjacency_list.keys())\n        \n        while unvisited:\n            current = min(unvisited, key=lambda node: distances[node])\n            \n            if distances[current] == float('infinity'):\n                break\n                \n            for neighbor, weight in self.adjacency_list[current]:\n                distance = distances[current] + weight\n                \n                if distance < distances[neighbor]:\n                    distances[neighbor] = distance\n            \n            unvisited.remove(current)\n        \n        return distances"
        ]
    },
    java: {
        easy: [
            "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
            "public boolean isEven(int number) {\n    return number % 2 == 0;\n}",
            "public int sum(int a, int b) {\n    return a + b;\n}",
            "public class Person {\n    private String name;\n    private int age;\n    \n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public String getName() {\n        return name;\n    }\n    \n    public int getAge() {\n        return age;\n    }\n}",
            "public void printArray(int[] array) {\n    for (int item : array) {\n        System.out.println(item);\n    }\n}"
        ],
        medium: [
            "import java.util.ArrayList;\nimport java.util.List;\n\npublic int fibonacci(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fibonacci(n-1) + fibonacci(n-2);\n}",
            "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Memoization {\n    private Map<Integer, Integer> cache = new HashMap<>();\n    \n    public int fibonacci(int n) {\n        if (n <= 1) {\n            return n;\n        }\n        \n        if (cache.containsKey(n)) {\n            return cache.get(n);\n        }\n        \n        int result = fibonacci(n-1) + fibonacci(n-2);\n        cache.put(n, result);\n        return result;\n    }\n}",
            "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Stack<T> {\n    private List<T> items = new ArrayList<>();\n    \n    public void push(T item) {\n        items.add(item);\n    }\n    \n    public T pop() {\n        if (isEmpty()) {\n            throw new IllegalStateException(\"Stack is empty\");\n        }\n        return items.remove(items.size() - 1);\n    }\n    \n    public T peek() {\n        if (isEmpty()) {\n            throw new IllegalStateException(\"Stack is empty\");\n        }\n        return items.get(items.size() - 1);\n    }\n    \n    public boolean isEmpty() {\n        return items.isEmpty();\n    }\n}",
            "import java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.io.BufferedReader;\nimport java.io.InputStreamReader;\n\npublic String fetchData(String urlString) throws Exception {\n    URL url = new URL(urlString);\n    HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n    connection.setRequestMethod(\"GET\");\n    \n    StringBuilder response = new StringBuilder();\n    try (BufferedReader reader = new BufferedReader(\n            new InputStreamReader(connection.getInputStream()))) {\n        String line;\n        while ((line = reader.readLine()) != null) {\n            response.append(line);\n        }\n    }\n    \n    return response.toString();\n}",
            "import java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.TimeUnit;\n\npublic class ThreadPoolExample {\n    public void processTasks(int numTasks) {\n        ExecutorService executor = Executors.newFixedThreadPool(4);\n        \n        for (int i = 0; i < numTasks; i++) {\n            final int taskId = i;\n            executor.submit(() -> {\n                System.out.println(\"Processing task \" + taskId);\n                // Task processing logic\n            });\n        }\n        \n        executor.shutdown();\n        try {\n            executor.awaitTermination(1, TimeUnit.MINUTES);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n}"
        ],
        hard: [
            "import java.util.Arrays;\n\npublic class MergeSort {\n    public void sort(int[] arr) {\n        if (arr.length <= 1) {\n            return;\n        }\n        \n        int mid = arr.length / 2;\n        int[] left = new int[mid];\n        int[] right = new int[arr.length - mid];\n        \n        System.arraycopy(arr, 0, left, 0, mid);\n        System.arraycopy(arr, mid, right, 0, arr.length - mid);\n        \n        sort(left);\n        sort(right);\n        merge(arr, left, right);\n    }\n    \n    private void merge(int[] arr, int[] left, int[] right) {\n        int i = 0, j = 0, k = 0;\n        \n        while (i < left.length && j < right.length) {\n            if (left[i] <= right[j]) {\n                arr[k++] = left[i++];\n            } else {\n                arr[k++] = right[j++];\n            }\n        }\n        \n        while (i < left.length) {\n            arr[k++] = left[i++];\n        }\n        \n        while (j < right.length) {\n            arr[k++] = right[j++];\n        }\n    }\n}",
            "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n    \n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n    \n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > capacity;\n    }\n}",
            "import java.util.concurrent.locks.ReentrantLock;\nimport java.util.concurrent.locks.Condition;\n\npublic class BoundedBlockingQueue<T> {\n    private final Object[] items;\n    private int putIndex, takeIndex, count;\n    \n    private final ReentrantLock lock = new ReentrantLock();\n    private final Condition notEmpty = lock.newCondition();\n    private final Condition notFull = lock.newCondition();\n    \n    public BoundedBlockingQueue(int capacity) {\n        items = new Object[capacity];\n    }\n    \n    public void put(T item) throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == items.length) {\n                notFull.await();\n            }\n            items[putIndex] = item;\n            putIndex = (putIndex + 1) % items.length;\n            count++;\n            notEmpty.signal();\n        } finally {\n            lock.unlock();\n        }\n    }\n    \n    @SuppressWarnings(\"unchecked\")\n    public T take() throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == 0) {\n                notEmpty.await();\n            }\n            T item = (T) items[takeIndex];\n            items[takeIndex] = null;\n            takeIndex = (takeIndex + 1) % items.length;\n            count--;\n            notFull.signal();\n            return item;\n        } finally {\n            lock.unlock();\n        }\n    }\n}",
            "import java.util.concurrent.CompletableFuture;\nimport java.util.concurrent.ExecutionException;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\npublic class AsyncProcessor {\n    public <T> List<T> processAllAsync(List<CompletableFuture<T>> futures) \n            throws InterruptedException, ExecutionException {\n        CompletableFuture<Void> allDone = CompletableFuture.allOf(\n                futures.toArray(new CompletableFuture[0]));\n        \n        return allDone.thenApply(v -> \n            futures.stream()\n                .map(CompletableFuture::join)\n                .collect(Collectors.toList())\n        ).get();\n    }\n}",
            "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class Permutations {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(result, new ArrayList<>(), nums, new boolean[nums.length]);\n        return result;\n    }\n    \n    private void backtrack(List<List<Integer>> result, List<Integer> tempList, \n                           int[] nums, boolean[] used) {\n        if (tempList.size() == nums.length) {\n            result.add(new ArrayList<>(tempList));\n            return;\n        }\n        \n        for (int i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n            used[i] = true;\n            tempList.add(nums[i]);\n            backtrack(result, tempList, nums, used);\n            used[i] = false;\n            tempList.remove(tempList.size() - 1);\n        }\n    }\n}"
        ],
        expert: [
            "import java.util.concurrent.ConcurrentHashMap;\nimport java.util.concurrent.locks.ReadWriteLock;\nimport java.util.concurrent.locks.ReentrantReadWriteLock;\nimport java.util.function.Function;\n\npublic class ThreadSafeCache<K, V> {\n    private final ConcurrentHashMap<K, V> cache = new ConcurrentHashMap<>();\n    private final ReadWriteLock lock = new ReentrantReadWriteLock();\n    \n    public V get(K key, Function<K, V> valueLoader) {\n        // Fast path - check if value exists\n        V value = cache.get(key);\n        if (value != null) {\n            return value;\n        }\n        \n        // Slow path - acquire write lock and compute if necessary\n        lock.writeLock().lock();\n        try {\n            // Double-check after acquiring lock\n            value = cache.get(key);\n            if (value == null) {\n                value = valueLoader.apply(key);\n                cache.put(key, value);\n            }\n            return value;\n        } finally {\n            lock.writeLock().unlock();\n        }\n    }\n    \n    public void invalidate(K key) {\n        lock.writeLock().lock();\n        try {\n            cache.remove(key);\n        } finally {\n            lock.writeLock().unlock();\n        }\n    }\n    \n    public void invalidateAll() {\n        lock.writeLock().lock();\n        try {\n            cache.clear();\n        } finally {\n            lock.writeLock().unlock();\n        }\n    }\n}",
            "import java.lang.annotation.ElementType;\nimport java.lang.annotation.Retention;\nimport java.lang.annotation.RetentionPolicy;\nimport java.lang.annotation.Target;\nimport java.lang.reflect.Field;\nimport java.util.HashMap;\nimport java.util.Map;\n\npublic class DIContainer {\n    private final Map<Class<?>, Object> instances = new HashMap<>();\n    \n    public void register(Class<?> type, Object instance) {\n        instances.put(type, instance);\n    }\n    \n    public <T> T getInstance(Class<T> type) throws Exception {\n        // Check if we already have an instance\n        @SuppressWarnings(\"unchecked\")\n        T instance = (T) instances.get(type);\n        if (instance != null) {\n            return instance;\n        }\n        \n        // Create new instance\n        instance = type.getDeclaredConstructor().newInstance();\n        instances.put(type, instance);\n        \n        // Perform dependency injection\n        for (Field field : type.getDeclaredFields()) {\n            if (field.isAnnotationPresent(Inject.class)) {\n                field.setAccessible(true);\n                Object dependency = getInstance(field.getType());\n                field.set(instance, dependency);\n            }\n        }\n        \n        return instance;\n    }\n    \n    @Retention(RetentionPolicy.RUNTIME)\n    @Target(ElementType.FIELD)\n    public @interface Inject {}\n}",
            "import java.util.concurrent.Flow.Publisher;\nimport java.util.concurrent.Flow.Subscriber;\nimport java.util.concurrent.Flow.Subscription;\nimport java.util.concurrent.SubmissionPublisher;\nimport java.util.function.Function;\n\npublic class ReactiveProcessor<T, R> extends SubmissionPublisher<R> implements Subscriber<T> {\n    private final Function<T, R> function;\n    private Subscription subscription;\n    \n    public ReactiveProcessor(Function<T, R> function) {\n        super();\n        this.function = function;\n    }\n    \n    @Override\n    public void onSubscribe(Subscription subscription) {\n        this.subscription = subscription;\n        subscription.request(1);\n    }\n    \n    @Override\n    public void onNext(T item) {\n        submit(function.apply(item));\n        subscription.request(1);\n    }\n    \n    @Override\n    public void onError(Throwable throwable) {\n        throwable.printStackTrace();\n        closeExceptionally(throwable);\n    }\n    \n    @Override\n    public void onComplete() {\n        close();\n    }\n    \n    public static <T, R> ReactiveProcessor<T, R> createProcessor(\n            Publisher<T> publisher, Function<T, R> function) {\n        ReactiveProcessor<T, R> processor = new ReactiveProcessor<>(function);\n        publisher.subscribe(processor);\n        return processor;\n    }\n}",
            "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Optional;\nimport java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Predicate;\n\npublic class Monad<T> {\n    private final T value;\n    \n    private Monad(T value) {\n        this.value = value;\n    }\n    \n    public static <T> Monad<T> of(T value) {\n        return new Monad<>(value);\n    }\n    \n    public static <T> Monad<T> empty() {\n        return new Monad<>(null);\n    }\n    \n    public <R> Monad<R> map(Function<T, R> mapper) {\n        if (value == null) {\n            return empty();\n        }\n        return of(mapper.apply(value));\n    }\n    \n    public <R> Monad<R> flatMap(Function<T, Monad<R>> mapper) {\n        if (value == null) {\n            return empty();\n        }\n        return mapper.apply(value);\n    }\n    \n    public Monad<T> filter(Predicate<T> predicate) {\n        if (value == null || !predicate.test(value)) {\n            return empty();\n        }\n        return this;\n    }\n    \n    public void ifPresent(Consumer<T> consumer) {\n        if (value != null) {\n            consumer.accept(value);\n        }\n    }\n    \n    public T orElse(T other) {\n        return value != null ? value : other;\n    }\n    \n    public Optional<T> toOptional() {\n        return Optional.ofNullable(value);\n    }\n}"
        ]
    },
    csharp: {
        easy: [
            "using System;\n\npublic class HelloWorld\n{\n    public static void Main()\n    {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}",
            "public bool IsEven(int number)\n{\n    return number % 2 == 0;\n}",
            "public int Sum(int a, int b)\n{\n    return a + b;\n}",
            "using System;\n\npublic class Person\n{\n    public string Name { get; set; }\n    public int Age { get; set; }\n    \n    public Person(string name, int age)\n    {\n        Name = name;\n        Age = age;\n    }\n    \n    public void Greet()\n    {\n        Console.WriteLine($\"Hello, my name is {Name} and I am {Age} years old.\");\n    }\n}",
            "using System;\nusing System.Collections.Generic;\n\npublic void PrintList<T>(List<T> items)\n{\n    foreach (var item in items)\n    {\n        Console.WriteLine(item);\n    }\n}"
        ],
        medium: [
            "using System;\n\npublic int Fibonacci(int n)\n{\n    if (n <= 1)\n        return n;\n    return Fibonacci(n - 1) + Fibonacci(n - 2);\n}",
            "using System;\nusing System.Collections.Generic;\n\npublic class Memoization\n{\n    private Dictionary<int, int> cache = new Dictionary<int, int>();\n    \n    public int Fibonacci(int n)\n    {\n        if (n <= 1)\n            return n;\n        \n        if (cache.ContainsKey(n))\n            return cache[n];\n        \n        int result = Fibonacci(n - 1) + Fibonacci(n - 2);\n        cache[n] = result;\n        return result;\n    }\n}",
            "using System;\nusing System.Collections.Generic;\n\npublic class Stack<T>\n{\n    private List<T> items = new List<T>();\n    \n    public void Push(T item)\n    {\n        items.Add(item);\n    }\n    \n    public T Pop()\n    {\n        if (IsEmpty())\n            throw new InvalidOperationException(\"Stack is empty\");\n        \n        int lastIndex = items.Count - 1;\n        T item = items[lastIndex];\n        items.RemoveAt(lastIndex);\n        return item;\n    }\n    \n    public T Peek()\n    {\n        if (IsEmpty())\n            throw new InvalidOperationException(\"Stack is empty\");\n        \n        return items[items.Count - 1];\n    }\n    \n    public bool IsEmpty()\n    {\n        return items.Count == 0;\n    }\n}",
            "using System;\nusing System.Net.Http;\nusing System.Threading.Tasks;\n\npublic class ApiClient\n{\n    private readonly HttpClient _httpClient;\n    \n    public ApiClient()\n    {\n        _httpClient = new HttpClient();\n    }\n    \n    public async Task<string> FetchDataAsync(string url)\n    {\n        try\n        {\n            HttpResponseMessage response = await _httpClient.GetAsync(url);\n            response.EnsureSuccessStatusCode();\n            return await response.Content.ReadAsStringAsync();\n        }\n        catch (HttpRequestException e)\n        {\n            Console.WriteLine($\"Error fetching data: {e.Message}\");\n            return null;\n        }\n    }\n}",
            "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class ParallelProcessor\n{\n    public async Task ProcessItemsAsync(int[] items)\n    {\n        // Process up to 4 items concurrently\n        SemaphoreSlim semaphore = new SemaphoreSlim(4);\n        List<Task> tasks = new List<Task>();\n        \n        foreach (int item in items)\n        {\n            await semaphore.WaitAsync();\n            \n            tasks.Add(Task.Run(async () => {\n                try\n                {\n                    await ProcessItemAsync(item);\n                }\n                finally\n                {\n                    semaphore.Release();\n                }\n            }));\n        }\n        \n        await Task.WhenAll(tasks);\n    }\n    \n    private async Task ProcessItemAsync(int item)\n    {\n        Console.WriteLine($\"Processing item {item}\");\n        await Task.Delay(100); // Simulate work\n    }\n}"
        ],
         hard: [
            "using System;\n\npublic class MergeSort\n{\n    public void Sort(int[] arr)\n    {\n        if (arr.Length <= 1)\n            return;\n        \n        int mid = arr.Length / 2;\n        int[] left = new int[mid];\n        int[] right = new int[arr.Length - mid];\n        \n        Array.Copy(arr, 0, left, 0, mid);\n        Array.Copy(arr, mid, right, 0, arr.Length - mid);\n        \n        Sort(left);\n        Sort(right);\n        Merge(arr, left, right);\n    }\n    \n    private void Merge(int[] arr, int[] left, int[] right)\n    {\n        int i = 0, j = 0, k = 0;\n        \n        while (i < left.Length && j < right.Length)\n        {\n            if (left[i] <= right[j])\n                arr[k++] = left[i++];\n            else\n                arr[k++] = right[j++];\n        }\n        \n        while (i < left.Length)\n            arr[k++] = left[i++];\n        \n        while (j < right.Length)\n            arr[k++] = right[j++];\n    }\n}",
            "using System;\nusing System.Collections.Generic;\n\npublic class LRUCache<TKey, TValue>\n{\n    private readonly int _capacity;\n    private readonly Dictionary<TKey, LinkedListNode<CacheItem>> _cache;\n    private readonly LinkedList<CacheItem> _lruList;\n    \n    public LRUCache(int capacity)\n    {\n        _capacity = capacity;\n        _cache = new Dictionary<TKey, LinkedListNode<CacheItem>>(capacity);\n        _lruList = new LinkedList<CacheItem>();\n    }\n    \n    public TValue Get(TKey key)\n    {\n        if (!_cache.TryGetValue(key, out var node))\n            return default;\n        \n        // Move to front (most recently used)\n        _lruList.Remove(node);\n        _lruList.AddFirst(node);\n        \n        return node.Value.Value;\n    }\n    \n    public void Put(TKey key, TValue value)\n    {\n        if (_cache.TryGetValue(key, out var existingNode))\n        {\n            // Update value and move to front\n            _lruList.Remove(existingNode);\n            var newNode = _lruList.AddFirst(new CacheItem(key, value));\n            _cache[key] = newNode;\n            return;\n        }\n        \n        // Check capacity\n        if (_cache.Count >= _capacity)\n        {\n            // Remove least recently used item\n            var last = _lruList.Last;\n            _cache.Remove(last.Value.Key);\n            _lruList.RemoveLast();\n        }\n        \n        // Add new item\n        var node = _lruList.AddFirst(new CacheItem(key, value));\n        _cache.Add(key, node);\n    }\n    \n    private class CacheItem\n    {\n        public TKey Key { get; }\n        public TValue Value { get; }\n        \n        public CacheItem(TKey key, TValue value)\n        {\n            Key = key;\n            Value = value;\n        }\n    }\n}",
            "using System;\nusing System.Collections.Generic;\nusing System.Threading;\nusing System.Threading.Tasks;\n\npublic class TaskThrottler\n{\n    private readonly SemaphoreSlim _semaphore;\n    \n    public TaskThrottler(int maxConcurrency)\n    {\n        _semaphore = new SemaphoreSlim(maxConcurrency);\n    }\n    \n    public async Task<TResult[]> ExecuteAsync<TResult>(\n        IEnumerable<Func<Task<TResult>>> taskFactories)\n    {\n        var allTasks = new List<Task<TResult>>();\n        \n        foreach (var factory in taskFactories)\n        {\n            await _semaphore.WaitAsync();\n            \n            allTasks.Add(Task.Run(async () => {\n                try\n                {\n                    return await factory();\n                }\n                finally\n                {\n                    _semaphore.Release();\n                }\n            }));\n        }\n        \n        return await Task.WhenAll(allTasks);\n    }\n}",
            "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\npublic class Graph<T> where T : IEquatable<T>\n{\n    private Dictionary<T, List<Edge<T>>> _adjacencyList = new Dictionary<T, List<Edge<T>>>();\n    \n    public void AddVertex(T vertex)\n    {\n        if (!_adjacencyList.ContainsKey(vertex))\n            _adjacencyList[vertex] = new List<Edge<T>>();\n    }\n    \n    public void AddEdge(T source, T destination, int weight = 1)\n    {\n        AddVertex(source);\n        AddVertex(destination);\n        \n        _adjacencyList[source].Add(new Edge<T>(destination, weight));\n    }\n    \n    public Dictionary<T, int> Dijkstra(T start)\n    {\n        var distances = new Dictionary<T, int>();\n        var visited = new HashSet<T>();\n        var priorityQueue = new SortedList<int, T>();\n        \n        // Initialize distances\n        foreach (var vertex in _adjacencyList.Keys)\n            distances[vertex] = vertex.Equals(start) ? 0 : int.MaxValue;\n        \n        priorityQueue.Add(0, start);\n        \n        while (priorityQueue.Count > 0)\n        {\n            var current = priorityQueue.Values[0];\n            var currentDistance = priorityQueue.Keys[0];\n            priorityQueue.RemoveAt(0);\n            \n            if (visited.Contains(current))\n                continue;\n            \n            visited.Add(current);\n            \n            foreach (var edge in _adjacencyList[current])\n            {\n                if (visited.Contains(edge.Destination))\n                    continue;\n                \n                var distance = currentDistance + edge.Weight;\n                if (distance < distances[edge.Destination])\n                {\n                    distances[edge.Destination] = distance;\n                    priorityQueue.Add(distance, edge.Destination);\n                }\n            }\n        }\n        \n        return distances;\n    }\n    \n    public class Edge<TVertex>\n    {\n        public TVertex Destination { get; }\n        public int Weight { get; }\n        \n        public Edge(TVertex destination, int weight)\n        {\n            Destination = destination;\n            Weight = weight;\n        }\n    }\n}",
            "using System;\n" + "using System.Collections.Generic;\n" + "using System.Threading;\n" +          "using System.Threading.Tasks;\n" + "\n" +"public class BatchProcessor<T>\n" + "{\n" + "    private readonly Func<IEnumerable<T>, Task> _processBatchAsync;\n" + "    private readonly int _batchSize;\n" + "    private readonly int _maxConcurrentBatches;\n" +
            "    private readonly TimeSpan _maxWaitTime;\n" + "    \n" + "    private List<T> _currentBatch = new List<T>();\n" + "    private SemaphoreSlim _throttler;\n" + "    private readonly object _batchLock = new object();\n" + "    private Timer _batchTimer;\n" + "    \n" + "    public BatchProcessor(\n" + "        Func<IEnumerable<T>, Task> processBatchAsync,\n" +
            "        int batchSize,\n" + "        int maxConcurrentBatches,\n" +
            "        TimeSpan maxWaitTime)\n" + "    {\n" + "        _processBatchAsync = processBatchAsync;\n" + "        _batchSize = batchSize;\n" + "        _maxConcurrentBatches = maxConcurrentBatches;\n" +
            "        _maxWaitTime = maxWaitTime;\n" + "        \n" + "        _throttler = new SemaphoreSlim(maxConcurrentBatches);\n" + "        _batchTimer = new Timer(OnBatchTimerElapsed, null, _maxWaitTime, Timeout.InfiniteTimeSpan);\n" + "    }\n" + "    \n" + "    public async Task AddItemAsync(T item)\n" + "    {\n" + "        List<T> batchToProcess = null;\n" +
            "        \n" + "        lock (_batchLock)\n" + "        {\n" + "            _currentBatch.Add(item);\n" + "            \n" + "            if (_currentBatch.Count >= _batchSize)\n" +
            "            {\n" + "                batchToProcess = _currentBatch;\n" +
            "                _currentBatch = new List<T>();\n" + "                ResetBatchTimer();\n" + "            }\n" + "        }\n" + "        \n" +
            "        if (batchToProcess != null)\n" + "            await ProcessBatchAsync(batchToProcess);\n" +
            "    }\n" + "    \n" + "    private void OnBatchTimerElapsed(object state)\n" +
            "    {\n" + "        List<T> batchToProcess = null;\n" + "        \n" + "        lock (_batchLock)\n" + "        {\n" + "            if (_currentBatch.Count > 0)\n" + "            {\n" +
            "                batchToProcess = _currentBatch;\n" + "                _currentBatch = new List<T>();\n" + "            }\n" + "        }\n" + "        \n" + "        if (batchToProcess != null)\n" + "            ProcessBatchAsync(batchToProcess).ConfigureAwait(false).GetAwaiter().GetResult();\n" +
            "    }\n" +
            "    \n" +
            "    private void ResetBatchTimer()\n" +
            "    {\n" +
            "        _batchTimer.Change(_maxWaitTime, Timeout.InfiniteTimeSpan);\n" +
            "    }\n" +
            "    \n" +
            "    private async Task ProcessBatchAsync(List<T> batch)\n" +
            "    {\n" +
            "        await _throttler.WaitAsync();\n" +
            "        \n" +
            "        try\n" +
            "        {\n" +
            "            await _processBatchAsync(batch);\n" +
            "        }\n" +
            "        finally\n" +
            "        {\n" +
            "            _throttler.Release();\n" +
            "        }\n" +
            "    }\n" +
            "    \n" +
            "    public async Task FlushAsync()\n" +
            "    {\n" +
            "        List<T> batchToProcess = null;\n" +
            "        \n" +
            "        lock (_batchLock)\n" +
            "        {\n" +
            "            if (_currentBatch.Count > 0)\n" +
            "            {\n" +
            "                batchToProcess = _currentBatch;\n" +
            "                _currentBatch = new List<T>();\n" +
            "            }\n" +
            "        }\n" +
            "        \n" +
            "        if (batchToProcess != null)\n" +
            "            await ProcessBatchAsync(batchToProcess);\n" +
            "    }\n" +
            "    \n" +
            "    public void Dispose()\n" +
            "    {\n" +
            "        _batchTimer?.Dispose();\n" +
            "        _throttler?.Dispose();\n" +
            "    }\n" +
            "}\n"
        ],
        expert: [

            "using System;\n" +
            "using System.Collections.Generic;\n" +
            "using System.Threading;\n" +
            "using System.Threading.Tasks;\n" +
            "\n" +
            "public class EventBus\n" +
            "{\n" +
            "    private readonly Dictionary<Type, List<Subscription>> _subscriptions = new Dictionary<Type, List<Subscription>>();\n" +
            "    private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();\n" +
            "    \n" +
            "    public IDisposable Subscribe<TEvent>(Func<TEvent, Task> handler)\n" +
            "    {\n" +
            "        var eventType = typeof(TEvent);\n" +
            "        var subscription = new Subscription<TEvent>(handler, this, eventType);\n" +
            "        \n" +
            "        _lock.EnterWriteLock();\n" +
            "        try\n" +
            "        {\n" +
            "            if (!_subscriptions.TryGetValue(eventType, out var eventSubscriptions))\n" +
            "            {\n" +
            "                eventSubscriptions = new List<Subscription>();\n" +
            "                _subscriptions[eventType] = eventSubscriptions;\n" +
            "            }\n" +
            "            \n" +
            "            eventSubscriptions.Add(subscription);\n" +
            "        }\n" +
            "        finally\n" +
            "        {\n" +
            "            _lock.ExitWriteLock();\n" +
            "        }\n" +
            "        \n" +
            "        return subscription;\n" +
            "    }\n" +
            "    \n" +
            "    internal void Unsubscribe(Type eventType, Subscription subscription)\n" +
            "    {\n" +
            "        _lock.EnterWriteLock();\n" +
            "        try\n" +
            "        {\n" +
            "            if (_subscriptions.TryGetValue(eventType, out var eventSubscriptions))\n" +
            "            {\n" +
            "                eventSubscriptions.Remove(subscription);\n" +
            "                \n" +
            "                if (eventSubscriptions.Count == 0)\n" +
            "                    _subscriptions.Remove(eventType);\n" +
            "            }\n" +
            "        }\n" +
            "        finally\n" +
            "        {\n" +
            "            _lock.ExitWriteLock();\n" +
            "        }\n" +
            "    }\n" +
            "    \n" +
            "    public async Task PublishAsync<TEvent>(TEvent @event, CancellationToken cancellationToken = default)\n" +
            "    {\n" +
            "        var eventType = typeof(TEvent);\n" +
            "        List<Subscription> subscribers;\n" +
            "        \n" +
            "        _lock.EnterReadLock();\n" +
            "        try\n" +
            "        {\n" +
            "            if (!_subscriptions.TryGetValue(eventType, out var eventSubscriptions))\n" +
            "                return;\n" +
            "                \n" +
            "            subscribers = new List<Subscription>(eventSubscriptions);\n" +
            "        }\n" +
            "        finally\n" +
            "        {\n" +
            "            _lock.ExitReadLock();\n" +
            "        }\n" +
            "        \n" +
            "        var tasks = new List<Task>();\n" +
            "        foreach (var subscriber in subscribers)\n" +
            "        {\n" +
            "            if (cancellationToken.IsCancellationRequested)\n" +
            "                break;\n" +
            "                \n" +
            "            // Safe cast since we know the subscription is for TEvent\n" +
            "            var task = ((Subscription<TEvent>)subscriber).InvokeAsync(@event);\n" +
            "            tasks.Add(task);\n" +
            "        }\n" +
            "        \n" +
            "        await Task.WhenAll(tasks);\n" +
            "    }\n" +
            "    \n" +
            "    private abstract class Subscription : IDisposable\n" +
            "    {\n" +
            "        protected readonly EventBus EventBus;\n" +
            "        protected readonly Type EventType;\n" +
            "        \n" +
            "        protected Subscription(EventBus eventBus, Type eventType)\n" +
            "        {\n" +
            "            EventBus = eventBus;\n" +
            "            EventType = eventType;\n" +
            "        }\n" +
            "        \n" +
            "        public void Dispose()\n" +
            "        {\n" +
            "            EventBus.Unsubscribe(EventType, this);\n" +
            "        }\n" +
            "    }\n" +
            "    \n" +
            "    private class Subscription<TEvent> : Subscription\n" +
            "    {\n" +
            "        private readonly Func<TEvent, Task> _handler;\n" +
            "        \n" +
            "        public Subscription(Func<TEvent, Task> handler, EventBus eventBus, Type eventType)\n" +
            "            : base(eventBus, eventType)\n" +
            "        {\n" +
            "            _handler = handler;\n" +
            "        }\n" +
            "        \n" +
            "        public Task InvokeAsync(TEvent @event)\n" +
            "        {\n" +
            "            return _handler(@event);\n" +
            "        }\n" +
            "    }\n" +
            "}\n",
            
            "using System;\n" +
            "using System.Collections.Generic;\n" +
            "using System.Linq;\n" +
            "using System.Reflection;\n" +
            "using System.Threading.Tasks;\n" +
            "\n" +
            "public class DependencyInjectionContainer\n" +
            "{\n" +
            "    private readonly Dictionary<Type, Func<object>> _registrations = new Dictionary<Type, Func<object>>();\n" +
            "    private readonly Dictionary<Type, object> _singletons = new Dictionary<Type, object>();\n" +
            "    \n" +
            "    public void Register<TInterface, TImplementation>() where TImplementation : TInterface\n" +
            "    {\n" +
            "        _registrations[typeof(TInterface)] = () => Resolve(typeof(TImplementation));\n" +
            "    }\n" +
            "    \n" +
            "    public void RegisterSingleton<TInterface, TImplementation>() where TImplementation : TInterface\n" +
            "    {\n" +
            "        _registrations[typeof(TInterface)] = () => {\n" +
            "            Type type = typeof(TImplementation);\n" +
            "            if (!_singletons.TryGetValue(type, out var instance))\n" +
            "            {\n" +
            "                instance = Resolve(type);\n" +
            "                _singletons[type] = instance;\n" +
            "            }\n" +
            "            return instance;\n" +
            "        };\n" +
            "    }\n" +
            "    \n" +
            "    public void RegisterInstance<TInterface>(TInterface instance)\n" +
            "    {\n" +
            "        _registrations[typeof(TInterface)] = () => instance;\n" +
            "    }\n" +
            "    \n" +
            "    public T Resolve<T>()\n" +
            "    {\n" +
            "        return (T)Resolve(typeof(T));\n" +
            "    }\n" +
            "    \n" +
            "    private object Resolve(Type type)\n" +
            "    {\n" +
            "        if (_registrations.TryGetValue(type, out var factory))\n" +
            "        {\n" +
            "            return factory();\n" +
            "        }\n" +
            "        \n" +
            "        if (type.IsInterface || type.IsAbstract)\n" +
            "        {\n" +
            "            throw new InvalidOperationException($\"Cannot instantiate abstract type {type}\");\n" +
            "        }\n" +
            "        \n" +
            "        // Find constructor with most parameters\n" +
            "        var constructor = type.GetConstructors()\n" +
            "            .OrderByDescending(c => c.GetParameters().Length)\n" +
            "            .FirstOrDefault();\n" +
            "            \n" +
            "        if (constructor == null)\n" +
            "        {\n" +
            "            throw new InvalidOperationException($\"No suitable constructor found for {type}\");\n" +
            "        }\n" +
            "        \n" +
            "        // Resolve constructor parameters recursively\n" +
            "        var parameters = constructor.GetParameters()\n" +
            "            .Select(p => Resolve(p.ParameterType))\n" +
            "            .ToArray();\n" +
            "            \n" +
            "        // Create instance\n" +
            "        var instance = constructor.Invoke(parameters);\n" +
            "        \n" +
            "        // Perform property injection\n" +
            "        foreach (var property in type.GetProperties()\n" +
            "            .Where(p => p.CanWrite && p.GetCustomAttribute<InjectAttribute>() != null))\n" +
            "        {\n" +
            "            var value = Resolve(property.PropertyType);\n" +
            "            property.SetValue(instance, value);\n" +
            "        }\n" +
            "        \n" +
            "        return instance;\n" +
            "    }\n" +
            "    \n" +
            "    [AttributeUsage(AttributeTargets.Property)]\n" +
            "    public class InjectAttribute : Attribute {}\n" +
            "}\n"
        ]  
    },
    php: {
        easy: [
            "<?php\n\necho \"Hello, World!\";\n",
            "<?php\n\nfunction isEven($number) {\n    return $number % 2 === 0;\n}\n",
            "<?php\n\nfunction sum($a, $b) {\n    return $a + $b;\n}\n",
            "<?php\n\nclass Person {\n    public $name;\n    public $age;\n\n    public function __construct($name, $age) {\n        $this->name = $name;\n        $this->age = $age;\n    }\n\n    public function greet() {\n        echo \"Hello, my name is {$this->name} and I am {$this->age} years old.\";\n    }\n}\n",
            "<?php\n\nfunction printList(array $items) {\n    foreach ($items as $item) {\n        echo $item . \"\\n\";\n    }\n}\n"
        ],

        medium: [
            "<?php\n\n\$optionalName = \"Alice\";\nif (isset(\$optionalName)) {\n    echo \"Hello, {\$optionalName}!\";\n} else {\n    echo \"No name provided\";\n}\n",
            "<?php\n\nclass Rectangle {\n    public \$width;\n    public \$height;\n\n    public function __construct(\$width, \$height) {\n        \$this->width = \$width;\n        \$this->height = \$height;\n    }\n\n    public function area() {\n        return \$this->width * \$this->height;\n    }\n}\n\n\$rect = new Rectangle(10, 5);\necho \"Area: \" . \$rect->area();\n",
            "<?php\n\n\$numbers = [1, 2, 3, 4, 5];\nforeach (\$numbers as \$number) {\n    echo \$number * \$number . \"\\n\";\n}\n",
            "<?php\n\nenum Direction {\n    case NORTH;\n    case SOUTH;\n    case EAST;\n    case WEST;\n}\n\nfunction move(Direction \$direction) {\n    switch (\$direction) {\n        case Direction::NORTH:\n            echo \"Moving north\";\n            break;\n        case Direction::SOUTH:\n            echo \"Moving south\";\n            break;\n        case Direction::EAST:\n            echo \"Moving east\";\n            break;\n        case Direction::WEST:\n            echo \"Moving west\";\n            break;\n    }\n}\n\nmove(Direction::EAST);\n",
            "<?php\n\nfunction factorial(\$n) {\n    if (\$n <= 1) {\n        return 1;\n    } else {\n        return \$n * factorial(\$n - 1);\n    }\n}\necho factorial(5);\n"
        ],

        hard: [
            "<?php\n\nclass Vehicle {\n    public function description() {\n        return \"A vehicle\";\n    }\n}\n\nclass Car extends Vehicle {\n    public function description() {\n        return \"A car\";\n    }\n}\n\n\$myCar = new Car();\necho \$myCar->description();\n",
            "<?php\n\nclass FileNotFoundException extends Exception {}\n\nfunction readFile(\$filename) {\n    if (\$filename !== \"exists.txt\") {\n        throw new FileNotFoundException(\"File not found\");\n    }\n    return \"File content\";\n}\n\ntry {\n    \$content = readFile(\"missing.txt\");\n    echo \$content;\n} catch (FileNotFoundException \$e) {\n    echo \"Error reading file: \" . \$e->getMessage();\n}\n",
            "<?php\n\n\$names = [\"Anna\", \"John\", \"Zoe\", \"Mark\"];\nrsort(\$names);\necho implode(\", \", \$names);\n",
            "<?php\n\nclass Stack {\n    private array \$items = [];\n\n    public function push(\$item) {\n        array_push(\$this->items, \$item);\n    }\n\n    public function pop() {\n        return array_pop(\$this->items);\n    }\n}\n\n\$stack = new Stack();\n\$stack->push(10);\n\$stack->push(20);\necho \$stack->pop() ?? \"Empty\";\n",
            "<?php\n\nfunction fibonacci(\$n) {\n    if (\$n <= 1) {\n        return \$n;\n    }\n    return fibonacci(\$n - 1) + fibonacci(\$n - 2);\n}\necho fibonacci(7);\n"
        ],

        expert: [
            "<?php\n\ninterface Drawable {\n    public function draw();\n}\n\nclass Circle implements Drawable {\n    public function draw() {\n        echo \"Drawing a circle\";\n    }\n}\n\n\$shape = new Circle();\n\$shape->draw();\n",
            "<?php\n\nfunction swapTwoValues(&\$a, &\$b) {\n    \$temp = \$a;\n    \$a = \$b;\n    \$b = \$temp;\n}\n\n\$x = 5;\n\$y = 10;\nswapTwoValues(\$x, \$y);\necho \"x: {\$x}, y: {\$y}\";\n",
            "<?php\n\n// Async example with promises (using ReactPHP or similar library)\n// This is a placeholder as PHP doesn't have native async/await\n\n// Pseudo-code:\n// $promise = asyncFunction();\n// $promise->then(function(\$result) {\n//     echo \$result;\n// });\n",
            "<?php\n\nclass AsyncOperation {\n    public function perform(callable \$completion) {\n        // Simulate async with sleep in separate thread/process\n        // PHP doesn't have native threads, so this is illustrative\n        sleep(2);\n        \$completion(\"Operation complete\");\n    }\n}\n\n\$op = new AsyncOperation();\n\$op->perform(function(\$result) {\n    echo \$result;\n});\n",
            "<?php\n\nclass Result {\n    public \$value;\n    public \$error;\n\n    public function __construct(\$value = null, \$error = null) {\n        \$this->value = \$value;\n        \$this->error = \$error;\n    }\n}\n"
        ]
    },

    swift: {
        easy: [
            "print(\"Hello, World!\")",
            "func isEven(_ number: Int) -> Bool {\n    return number % 2 == 0\n}",
            "func sum(_ a: Int, _ b: Int) -> Int {\n    return a + b\n}",
            "struct Person {\n    var name: String\n    var age: Int\n\n    func greet() {\n        print(\"Hello, my name is \\(name) and I am \\(age) years old.\")\n    }\n}",
            "func printList<T>(_ items: [T]) {\n    for item in items {\n        print(item)\n    }\n}"
        ],

        medium: [
            "var optionalName: String? = \"Alice\"\nif let name = optionalName {\n    print(\"Hello, \\(name)!\")\n} else {\n    print(\"No name provided\")\n}",
            "struct Rectangle {\n    var width: Double\n    var height: Double\n\n    func area() -> Double {\n        return width * height\n    }\n}\nlet rect = Rectangle(width: 10, height: 5)\nprint(\"Area: \\(rect.area())\")",
            "let numbers = [1, 2, 3, 4, 5]\nfor number in numbers {\n    print(number * number)\n}",
            "enum Direction {\n    case north, south, east, west\n}\nfunc move(_ direction: Direction) {\n    switch direction {\n    case .north: print(\"Moving north\")\n    case .south: print(\"Moving south\")\n    case .east: print(\"Moving east\")\n    case .west: print(\"Moving west\")\n    }\n}\nmove(.east)",
            "func factorial(_ n: Int) -> Int {\n    if n <= 1 {\n        return 1\n    } else {\n        return n * factorial(n - 1)\n    }\n}\nprint(factorial(5))"
        ],

        hard: [
            "class Vehicle {\n    func description() -> String {\n        return \"A vehicle\"\n    }\n}\nclass Car: Vehicle {\n    override func description() -> String {\n        return \"A car\"\n    }\n}\nlet myCar = Car()\nprint(myCar.description())",
            "enum FileError: Error {\n    case fileNotFound\n}\nfunc readFile(filename: String) throws -> String {\n    if filename != \"exists.txt\" {\n        throw FileError.fileNotFound\n    }\n    return \"File content\"\n}\ndo {\n    let content = try readFile(filename: \"missing.txt\")\n    print(content)\n} catch {\n    print(\"Error reading file: \\(error)\")\n}",
            "let names = [\"Anna\", \"John\", \"Zoe\", \"Mark\"]\nlet sortedNames = names.sorted { $0 > $1 }\nprint(sortedNames)",
            "struct Stack<Element> {\n    private var items = [Element]()\n\n    mutating func push(_ item: Element) {\n        items.append(item)\n    }\n\n    mutating func pop() -> Element? {\n        return items.popLast()\n    }\n}\nvar stack = Stack<Int>()\nstack.push(10)\nstack.push(20)\nprint(stack.pop() ?? \"Empty\")",
            "func fibonacci(_ n: Int) -> Int {\n    if n <= 1 {\n        return n\n    }\n    return fibonacci(n - 1) + fibonacci(n - 2)\n}\nprint(fibonacci(7))"
        ],

        expert: [
            "protocol Drawable {\n    func draw()\n}\nextension Drawable {\n    func draw() {\n        print(\"Default drawing\")\n    }\n}\nstruct Circle: Drawable {\n    func draw() {\n        print(\"Drawing a circle\")\n    }\n}\nlet shape: Drawable = Circle()\nshape.draw()",
            "func swapTwoValues<T>(_ a: inout T, _ b: inout T) {\n    let temp = a\n    a = b\n    b = temp\n}\nvar x = 5\nvar y = 10\nswapTwoValues(&x, &y)\nprint(\"x: \\(x), y: \\(y)\")",
            "import Foundation\n\nfunc fetchData() async -> String {\n    await Task.sleep(2 * 1_000_000_000)\n    return \"Data fetched\"\n}\n\nTask {\n    let result = await fetchData()\n    print(result)\n}",
            "class AsyncOperation {\n    func perform(completion: @escaping (String) -> Void) {\n        DispatchQueue.global().async {\n            sleep(2)\n            completion(\"Operation complete\")\n        }\n    }\n}\nlet op = AsyncOperation()\nop.perform { result in\n    print(result)\n}",
            "struct Result<Value, Error: Swift.Error> {\n    let value: Value?\n    let error: Error?\n}"
        ]
    },
    ruby: {
        easy: [
            "puts \"Hello, World!\"",
            "def is_even(number)\n  number % 2 == 0\nend",
            "def sum(a, b)\n  a + b\nend",
            "class Person\n  attr_accessor :name, :age\n\n  def initialize(name, age)\n    @name = name\n    @age = age\n  end\n\n  def greet\n    puts \"Hello, my name is #{@name} and I am #{@age} years old.\"\n  end\nend",
            "def print_list(items)\n  items.each do |item|\n    puts item\n  end\nend"
        ],

        medium: [
            "optional_name = \"Alice\"\nif optional_name\n  puts \"Hello, #{optional_name}!\"\nelse\n  puts \"No name provided\"\nend",
            "class Rectangle\n  attr_accessor :width, :height\n\n  def initialize(width, height)\n    @width = width\n    @height = height\n  end\n\n  def area\n    width * height\n  end\nend\nrect = Rectangle.new(10, 5)\nputs \"Area: #{rect.area}\"",
            "numbers = [1, 2, 3, 4, 5]\nnumbers.each do |number|\n  puts number * number\nend",
            "module Direction\n  NORTH = :north\n  SOUTH = :south\n  EAST = :east\n  WEST = :west\nend\n\ndef move(direction)\n  case direction\n  when Direction::NORTH\n    puts \"Moving north\"\n  when Direction::SOUTH\n    puts \"Moving south\"\n  when Direction::EAST\n    puts \"Moving east\"\n  when Direction::WEST\n    puts \"Moving west\"\n  end\nend\nmove(Direction::EAST)",
            "def factorial(n)\n  return 1 if n <= 1\n  n * factorial(n - 1)\nend\nputs factorial(5)"
        ],

        hard: [
            "class Vehicle\n  def description\n    \"A vehicle\"\n  end\nend\n\nclass Car < Vehicle\n  def description\n    \"A car\"\n  end\nend\n\nmy_car = Car.new\nputs my_car.description",
            "class FileError < StandardError; end\n\ndef read_file(filename)\n  raise FileError, \"File not found\" unless filename == \"exists.txt\"\n  \"File content\"\nend\n\nbegin\n  content = read_file(\"missing.txt\")\n  puts content\nrescue FileError => e\n  puts \"Error reading file: #{e.message}\"\nend",
            "names = [\"Anna\", \"John\", \"Zoe\", \"Mark\"]\nsorted_names = names.sort.reverse\nputs sorted_names",
            "class Stack\n  def initialize\n    @items = []\n  end\n\n  def push(item)\n    @items.push(item)\n  end\n\n  def pop\n    @items.pop\n  end\nend\n\nstack = Stack.new\nstack.push(10)\nstack.push(20)\nputs stack.pop || \"Empty\"",
            "def fibonacci(n)\n  return n if n <= 1\n  fibonacci(n - 1) + fibonacci(n - 2)\nend\nputs fibonacci(7)"
        ],

        expert: [
            "module Drawable\n  def draw\n    puts \"Default drawing\"\n  end\nend\n\nclass Circle\n  include Drawable\n\n  def draw\n    puts \"Drawing a circle\"\n  end\nend\n\nshape = Circle.new\nshape.draw",
            "def swap_two_values(a, b)\n  return b, a\nend\n\nx = 5\n y = 10\nx, y = swap_two_values(x, y)\nputs \"x: #{x}, y: #{y}\"",
            "require 'concurrent-ruby'\n\npromise = Concurrent::Promise.execute do\n  sleep 2\n  \"Data fetched\"\nend\n\npromise.then do |result|\n  puts result\nend\n\npromise.wait",
            "class AsyncOperation\n  def perform(&completion)\n    Thread.new do\n      sleep 2\n      completion.call(\"Operation complete\")\n    end\n  end\nend\n\nop = AsyncOperation.new\nop.perform do |result|\n  puts result\nend",
            "Result = Struct.new(:value, :error)"
        ]
    } 
};