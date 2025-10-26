// server.ts
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

function handleRequest(req: Request): Response {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS headers for React Native
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (path === "/" && req.method === "GET") {
    return new Response(JSON.stringify({ message: "Welcome to Deno API!" }), {
      headers,
    });
  }

  function cpuIntensiveWork(durationMs: number): void {
    const startTime = Date.now();
    let result = 0;

    while (Date.now() - startTime < durationMs) {
      // Perform calculations to consume CPU
      for (let i = 0; i < 100000; i++) {
        result += Math.sqrt(i) * Math.sin(i);
      }
    }
  }

  // Routes
  //random number
  if (path === "/random" && req.method === "GET") {
    // Get delay from query param (in milliseconds)
    const delay = parseInt(url.searchParams.get("delay") || "0");

    const cpuTime = parseInt(url.searchParams.get("cpu") || "0");

    // Do CPU-intensive work
    cpuIntensiveWork(cpuTime);

    return new Promise((resolve) => {
      setTimeout(() => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        resolve(
          new Response(JSON.stringify({ randomNumber: randomNum }), {
            headers,
          }),
        );
      }, delay);
  }

  if (path === "/api/users" && req.method === "GET") {
    // Get delay from query param (in milliseconds)
    const delay = parseInt(url.searchParams.get("delay") || "0");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Response(JSON.stringify(users), { headers }));
      }, delay);
    });
  }

  if (path === "/api/users" && req.method === "GET") {
    return new Response(JSON.stringify(users), { headers });
  }

  if (path.startsWith("/api/users/") && req.method === "GET") {
    const id = parseInt(path.split("/")[3]);
    const user = users.find((u) => u.id === id);

    if (user) {
      return new Response(JSON.stringify(user), { headers });
    }
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers,
    });
  }

  if (path === "/api/users" && req.method === "POST") {
    return req.json().then((body) => {
      const newUser: User = {
        id: users.length + 1,
        name: body.name,
        email: body.email,
      };
      users.push(newUser);
      return new Response(JSON.stringify(newUser), {
        status: 201,
        headers,
      });
    });
  }

  // 404
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers,
  });
}

export function startServer(port: number): Promise<void> {
  return new Promise((resolve) => {
    Deno.serve({ port }, handleRequest);
    resolve();
  });
}
